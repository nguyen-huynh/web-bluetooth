import React from "react";
import _ from "lodash";

export default class DiscoveryButton extends React.Component<IDiscoveryButtonProps, IDiscoveryButtonStates> {

  constructor(props: IDiscoveryButtonProps) {
    super(props);
    this.state = {
      device: undefined,
      server: undefined,
      batteryInfo: undefined,
      isBluetoothAvailable: false
    };
    this.onClick = this.onClick.bind(this);
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

      let device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['heart_rate'] }
        ],
        // acceptAllDevices: true,
        // optionalServices: ['battery_service', 'heart_rate', 'device_information']
      });

      if (_.isNil(device)) throw new Error('Failed to get device');
      console.log(`Devices: `, device.id, device.name, device.uuids);

      // Attempts to connect to remote GATT Server.
      let server = await device.gatt?.connect();
      if (_.isNil(server)) throw new Error(`Could not connect to GATT Server`);

      let services = await server.getPrimaryServices();

      let chars = await services[0].getCharacteristics();
      console.log(`Chars: `,chars)

      let firstV = await chars[0].readValue()
      let descriptions = await chars[0].getDescriptors();
      let abc = descriptions[0].readValue();
      console.log(`FirstD`, descriptions[0].uuid, descriptions[0].value, abc );

      this.setState({
        device: device,
        server: server,
      })
    } catch (error) {
      console.error(error);
    }
  }

  // async getBatteryInfos(event: React.MouseEvent) {
  //   event?.preventDefault();
  //   const { server } = this.state;
  //   let service = await server!.getPrimaryService('battery_service');
  //   let battery_level = await service.getCharacteristic('battery_level');
  //   let battery_level_state = await service.getCharacteristic('battery_level_state');
  //   let battery_power_state = await service.getCharacteristic('battery_power_state');

  // }

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
          <label htmlFor="" className="col-md-4">ID: {device?.id}</label>
          <label htmlFor="" className="col-md-4">Connected: {server?.connected ? 'yes' : 'no'}</label>
        </div>

        <div className="row">
          <label htmlFor="" className="col-md-3">Battery information</label>
          <label htmlFor="" className="col-md-3">Level: {this.state.batteryInfo?.level}</label>
          <label htmlFor="" className="col-md-3">Level state: {this.state.batteryInfo?.levelState}</label>
          <label htmlFor="" className="col-md-3">Power state: {this.state.batteryInfo?.powerState}</label>
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={this.onClick}>Discover</button>
        </div>
      </div>
    );
  }
}

interface IDiscoveryButtonProps { }
interface IDiscoveryButtonStates {
  device?: BluetoothDevice,
  server?: BluetoothRemoteGATTServer
  batteryInfo?: { level: any, levelState: any, powerState: any },
  isBluetoothAvailable: boolean
}
