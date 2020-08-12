import React from "react";
import _ from "lodash";

export default class DiscoveryButton extends React.Component<IDiscoveryButtonProps> {
  constructor(props: IDiscoveryButtonProps) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }

  async onClick(event: React.MouseEvent) {
    try {
      event.preventDefault();
      console.log(`Button onClicked`);

      if (_.isNil(navigator.bluetooth))
        throw new Error("Browser doesn't support intergrating bluetooth");

      let device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: ['battery_service', 'heart_rate'] },
          { namePrefix: 'OT' }
        ],
        optionalServices: ['battery_service', 'heart_rate']
      });

      if(_.isNil(device)) throw new Error('Failed to get device');
      console.log(`Devices: `,device.id, device.name, device.uuids);

      // Attempts to connect to remote GATT Server.
      let server = await device.gatt?.connect();
      if(_.isNil(server)) throw new Error(`Could not connect to GATT Server`);

      let services = await server.getPrimaryServices();
      console.log(`Services: `,services);

      (window as any).bleServices = services;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <button className="btn btn-primary" onClick={this.onClick}>
        Discover
      </button>
    );
  }
}

interface IDiscoveryButtonProps { }
