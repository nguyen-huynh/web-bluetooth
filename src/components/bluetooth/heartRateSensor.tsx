import React from "react";
import _ from "lodash";

export default class HeartRateSensor extends React.Component<IHeartRateSensorProps, IHeartRateSensorStates> {
  constructor(props: IHeartRateSensorProps) {
    super(props);
    this.state = {
      device: undefined,
      server: undefined,
      batteryInfo: undefined,
      isBluetoothAvailable: false,
      characteristics: {},
      hrmId: undefined,
      heartRateHistory: []
    };
    this.onClick = this.onClick.bind(this);
    this.onTracking = this.onTracking.bind(this);
  }

  componentDidMount() {
    this.onInitialized();
  }

  async onInitialized() {
    const isBluetoothAvailable = await navigator.bluetooth?.getAvailability();
    this.setState({ isBluetoothAvailable });

    if ('onavailabilitychanged' in navigator.bluetooth) {
      navigator.bluetooth.addEventListener('availabilitychanged', event => {
        this.setState({ isBluetoothAvailable: (event as any)?.value === true });
      });
    }
  }

  async onClick(event: React.MouseEvent) {
    try {
      event.preventDefault();
      console.log(`Button onClicked`);

      if (_.isNil(navigator.bluetooth))
        throw new Error("Browser doesn't support intergrating bluetooth");

      let connection = await this.connect();
      this.setState(prev => ({
        device: connection?.device,
        server: connection?.server,
        characteristics: { ...prev.characteristics, ...connection?.characteristics }
      }));
    } catch (error) {
      console.error(error);
    }
  }
  async onTracking(event: React.MouseEvent) {
    try {
      event.preventDefault();

      let chars = await this.startNotificationHR();
      console.log(`Trying to start notification for HeartRateMeasurement`, chars);
      if (_.isNil(chars)) throw new Error("Failed to tracking HR");
      await this.handleHeartRateMeasurement(chars);

      // Optional
      if (!_.isNil(this.state.characteristics['battery_level'])) {
        let batteryChar = await this.startNotification('battery_level');
        console.log(`Trying to start notification for BatteryLevel`, batteryChar);
        this.setState({
          batteryInfo: { level: (await batteryChar?.readValue())?.getInt8(0), levelState: undefined, powerState: undefined }
        })
        batteryChar?.addEventListener('characteristicvaluechanged', event => {
          let e = event as BluetoothEventData;
          let battery_level = e.target.value.getUint8(0);
          this.setState(prev => ({
            batteryInfo: { level: battery_level, levelState: undefined, powerState: undefined }
          }))
        })
      }


    } catch (error) {
      console.log(error);
    }
  }

  async handleHeartRateMeasurement(characteristic: BluetoothRemoteGATTCharacteristic) {
    characteristic.addEventListener('characteristicvaluechanged', (event) => {
      let e = event as BluetoothEventData;
      let hr = this.parseHR(e.target.value);
      this.setState(prev => ({
        heartRate: hr.heartRate,
        heartRateHistory: [...prev.heartRateHistory, hr.heartRate || 0]
      }))
    })
  }

  //#region Services
  async connect() {
    try {
      let device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        optionalServices: ['battery_service', 'device_information']
      });
      let server = await device.gatt!.connect();
      console.log(`Connected successfully with  services: `, await server.getPrimaryServices());

      let service = await server.getPrimaryService('heart_rate');
      let characteristics: { [prop in KnownCharacteristic]?: BluetoothRemoteGATTCharacteristic } = {};
      const heartRateCharacteristics: KnownCharacteristic[] = ['body_sensor_location', 'heart_rate_measurement'];
      characteristics = (await Promise.all(heartRateCharacteristics.map(async x => ({ [x]: await service.getCharacteristic(x) }))))
        .reduce((prev, value) => { return { ...prev, ...value } }, characteristics);

      const batteryCharacteristics: KnownCharacteristic[] = ['battery_level'];
      let batteryService = await server.getPrimaryService('battery_service');
      if (!_.isNil(batteryService)) {
        characteristics = (await Promise.all(batteryCharacteristics.map(async x => ({ [x]: await batteryService.getCharacteristic(x) }))))
          .reduce((prev, value) => { return { ...prev, ...value } }, characteristics);
      }

      const deviceInformationCharacteristics: KnownCharacteristic[] = [] /*['serial_number_string']*/;
      let deviceInformationService = await server.getPrimaryService('device_information');
      if (!_.isNil(deviceInformationService)) {
        characteristics = (await Promise.all(deviceInformationCharacteristics.map(async x => ({ [x]: await deviceInformationService.getCharacteristic(x) }))))
          .reduce((prev, value) => { return { ...prev, ...value } }, characteristics);
      }


      let result = {
        device,
        server,

        characteristics: characteristics,
      } as IHeartRateSensorStates;
      console.log(`Connection result: `, result);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async getBodySensorLocation() {
    let value = await await this.state.characteristics?.body_sensor_location?.readValue();
    let sensorLocation = await value?.getUint8(0);
    switch (sensorLocation) {
      case 0: return 'Other';
      case 1: return 'Chest';
      case 2: return 'Wrist';
      case 3: return 'Finger';
      case 4: return 'Hand';
      case 5: return 'Ear Lobe';
      case 6: return 'Foot';
      default: return 'Unknown';
    }
  }

  startNotificationHR = async () => await this.startNotification("heart_rate_measurement");

  stopNotificationHR = async () => await this.stopNotification("heart_rate_measurement");

  parseHR(value: DataView) {
    let flags = value.getUint8(0);
    let rate16Bits = flags & 0x1;
    let result: { heartRate?: number, contactDetected?: boolean, energyExpended?: number, rrIntervals?: number[] } = {};
    let index = 1;

    if (rate16Bits) {
      result.heartRate = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heartRate = value.getUint8(index);
      index += 1;
    }

    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }

    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, /*littleEndian=*/true));
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }

  //#endregion

  //#region Utils
  async readValue(characteristicUUId: KnownCharacteristic) {
    return await this.state.characteristics[characteristicUUId]?.readValue();
  }

  async writeValue(characteristicUUId: KnownCharacteristic, value: any) {
    return await this.state.characteristics[characteristicUUId]?.writeValue(value);
  }

  async startNotification(characteristicUUId: KnownCharacteristic) {
    return this.state.characteristics[characteristicUUId]?.startNotifications();
  }

  async stopNotification(characteristicUUId: KnownCharacteristic) {
    return this.state.characteristics[characteristicUUId]?.stopNotifications();
  }
  //#endregion

  render() {
    const { device, server } = this.state;
    return (
      <div className="container text-left">
        <div className="row">
          <h3>Bluetooth status: {this.state.isBluetoothAvailable ? 'available' : 'unavailable'}</h3>
        </div>
        <div className="row">
          <h3>Devices:</h3>
        </div>
        <div className="row">
          <label htmlFor="" className="col-md-4">Name: {device?.name}</label>
          <label htmlFor="" className="col-md-4">HRM ID: {this.state.hrmId}</label>
          <label htmlFor="" className="col-md-4">Connected: {server?.connected ? 'yes' : 'no'}</label>
        </div>

        <div className="row">
          <label htmlFor="" className="col-md-3">Battery information</label>
          <label htmlFor="" className="col-md-3">Level: {this.state.batteryInfo?.level}</label>
          <label htmlFor="" className="col-md-3">Level state: {this.state.batteryInfo?.levelState}</label>
          <label htmlFor="" className="col-md-3">Power state: {this.state.batteryInfo?.powerState}</label>
        </div>
        <div className="row">
          <h3>HeartRate: {this.state.heartRate}</h3>
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={this.onClick}>Discover</button>
          <button className="btn btn-success" disabled={_.isNil(this.state.device) || _.isNil(this.state.server) || !this.state.server.connected} onClick={this.onTracking}>Tracking</button>
        </div>
        <div className="row">
          <h3>HeartRate History: </h3>{this.state.heartRateHistory.join(', ')}
        </div>
      </div>
    );
  }
}

type KnownCharacteristic = 'body_sensor_location' | 'heart_rate_measurement' | 'battery_level' | 'serial_number_string';
type Diff<T extends keyof any, U extends keyof any> =
  ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U;

interface BluetoothEventData extends Event {
  target: Overwrite<EventTarget, { value: DataView }>
}
interface IHeartRateSensorProps { }
interface IHeartRateSensorStates {
  device?: BluetoothDevice,
  server?: BluetoothRemoteGATTServer,
  batteryInfo?: { level: any, levelState: any, powerState: any },
  isBluetoothAvailable: boolean,
  hrmId?: string,
  characteristics: { [name in KnownCharacteristic]?: BluetoothRemoteGATTCharacteristic },
  heartRate?: number,
  heartRateHistory: number[],
  battery_level?: number
}
