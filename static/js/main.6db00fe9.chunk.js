(this["webpackJsonpweb-bluetooth"]=this["webpackJsonpweb-bluetooth"]||[]).push([[0],{14:function(t,e,a){t.exports=a(24)},19:function(t,e,a){},23:function(t,e,a){},24:function(t,e,a){"use strict";a.r(e);var r=a(0),n=a.n(r),c=a(8),i=a.n(c),s=(a(19),a(5)),o=a(11),u=a(3),l=a(1),v=a.n(l),h=a(2),d=a(9),f=a(10),p=a(6),b=a(13),m=a(12),y=a(4),w=a.n(y),k=function(t){Object(b.a)(a,t);var e=Object(m.a)(a);function a(t){var r;return Object(d.a)(this,a),(r=e.call(this,t)).startNotificationHR=Object(h.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.startNotification("heart_rate_measurement");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),r.stopNotificationHR=Object(h.a)(v.a.mark((function t(){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.stopNotification("heart_rate_measurement");case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)}))),r.state={device:void 0,server:void 0,batteryInfo:void 0,isBluetoothAvailable:!1,characteristics:{},hrmId:void 0,heartRateHistory:[]},r.onClick=r.onClick.bind(Object(p.a)(r)),r.onTracking=r.onTracking.bind(Object(p.a)(r)),r}return Object(f.a)(a,[{key:"componentDidMount",value:function(){this.onInitialized()}},{key:"onInitialized",value:function(){var t=Object(h.a)(v.a.mark((function t(){var e,a,r=this;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(e=navigator.bluetooth)||void 0===e?void 0:e.getAvailability();case 2:a=t.sent,this.setState({isBluetoothAvailable:a}),"onavailabilitychanged"in navigator.bluetooth&&navigator.bluetooth.addEventListener("availabilitychanged",(function(t){var e;r.setState({isBluetoothAvailable:!0===(null===(e=t)||void 0===e?void 0:e.value)})}));case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"onClick",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.preventDefault(),console.log("Button onClicked"),!w.a.isNil(navigator.bluetooth)){t.next=5;break}throw new Error("Browser doesn't support intergrating bluetooth");case 5:return t.next=7,this.connect();case 7:a=t.sent,this.setState((function(t){return{device:null===a||void 0===a?void 0:a.device,server:null===a||void 0===a?void 0:a.server,characteristics:Object(u.a)(Object(u.a)({},t.characteristics),null===a||void 0===a?void 0:a.characteristics)}})),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),console.error(t.t0);case 14:case"end":return t.stop()}}),t,this,[[0,11]])})));return function(e){return t.apply(this,arguments)}}()},{key:"onTracking",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a,r,n,c=this;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.preventDefault(),t.next=4,this.startNotificationHR();case 4:if(a=t.sent,console.log("Trying to start notification for HeartRateMeasurement",a),!w.a.isNil(a)){t.next=8;break}throw new Error("Failed to tracking HR");case 8:return t.next=10,this.handleHeartRateMeasurement(a);case 10:if(w.a.isNil(this.state.characteristics.battery_level)){t.next=34;break}return t.next=13,this.startNotification("battery_level");case 13:return n=t.sent,console.log("Trying to start notification for BatteryLevel",n),t.t0=this,t.next=18,null===n||void 0===n?void 0:n.readValue();case 18:if(t.t2=r=t.sent,t.t1=null===t.t2,t.t1){t.next=22;break}t.t1=void 0===r;case 22:if(!t.t1){t.next=26;break}t.t3=void 0,t.next=27;break;case 26:t.t3=r.getInt8(0);case 27:t.t4=t.t3,t.t5=void 0,t.t6=void 0,t.t7={level:t.t4,levelState:t.t5,powerState:t.t6},t.t8={batteryInfo:t.t7},t.t0.setState.call(t.t0,t.t8),null===n||void 0===n||n.addEventListener("characteristicvaluechanged",(function(t){var e=t.target.value.getUint8(0);c.setState((function(t){return{batteryInfo:{level:e,levelState:void 0,powerState:void 0}}}))}));case 34:t.next=39;break;case 36:t.prev=36,t.t9=t.catch(0),console.log(t.t9);case 39:case"end":return t.stop()}}),t,this,[[0,36]])})));return function(e){return t.apply(this,arguments)}}()},{key:"handleHeartRateMeasurement",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a=this;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.addEventListener("characteristicvaluechanged",(function(t){var e=t,r=a.parseHR(e.target.value);a.setState((function(t){return{heartRate:r.heartRate,heartRateHistory:[].concat(Object(o.a)(t.heartRateHistory),[r.heartRate||0])}}))}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},{key:"connect",value:function(){var t=Object(h.a)(v.a.mark((function t(){var e,a,r,n,c,i,o,l,d,f;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["battery_service","device_information","heart_rate"]});case 3:return e=t.sent,t.next=6,e.gatt.connect();case 6:return a=t.sent,t.t0=console,t.next=10,a.getPrimaryServices();case 10:return t.t1=t.sent,t.t0.log.call(t.t0,"Connected successfully with  services: ",t.t1),t.next=14,a.getPrimaryService("heart_rate");case 14:return r=t.sent,n={},c=["body_sensor_location","heart_rate_measurement"],t.next=19,Promise.all(c.map(function(){var t=Object(h.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=s.a,t.t1={},t.t2=e,t.next=5,r.getCharacteristic(e);case 5:return t.t3=t.sent,t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 19:return n=t.sent.reduce((function(t,e){return Object(u.a)(Object(u.a)({},t),e)}),n),i=["battery_level"],t.next=23,a.getPrimaryService("battery_service");case 23:if(o=t.sent,w.a.isNil(o)){t.next=28;break}return t.next=27,Promise.all(i.map(function(){var t=Object(h.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=s.a,t.t1={},t.t2=e,t.next=5,o.getCharacteristic(e);case 5:return t.t3=t.sent,t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 27:n=t.sent.reduce((function(t,e){return Object(u.a)(Object(u.a)({},t),e)}),n);case 28:return l=[],t.next=31,a.getPrimaryService("device_information");case 31:if(d=t.sent,w.a.isNil(d)){t.next=36;break}return t.next=35,Promise.all(l.map(function(){var t=Object(h.a)(v.a.mark((function t(e){return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=s.a,t.t1={},t.t2=e,t.next=5,d.getCharacteristic(e);case 5:return t.t3=t.sent,t.abrupt("return",(0,t.t0)(t.t1,t.t2,t.t3));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()));case 35:n=t.sent.reduce((function(t,e){return Object(u.a)(Object(u.a)({},t),e)}),n);case 36:return f={device:e,server:a,characteristics:n},console.log("Connection result: ",f),t.abrupt("return",f);case 41:t.prev=41,t.t2=t.catch(0),console.error(t.t2);case 44:case"end":return t.stop()}}),t,null,[[0,41]])})));return function(){return t.apply(this,arguments)}}()},{key:"getBodySensorLocation",value:function(){var t=Object(h.a)(v.a.mark((function t(){var e,a,r,n;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(e=this.state.characteristics)||void 0===e||null===(a=e.body_sensor_location)||void 0===a?void 0:a.readValue();case 2:return r=t.sent,t.next=5,null===r||void 0===r?void 0:r.getUint8(0);case 5:n=t.sent,t.t0=n,t.next=0===t.t0?9:1===t.t0?10:2===t.t0?11:3===t.t0?12:4===t.t0?13:5===t.t0?14:6===t.t0?15:16;break;case 9:return t.abrupt("return","Other");case 10:return t.abrupt("return","Chest");case 11:return t.abrupt("return","Wrist");case 12:return t.abrupt("return","Finger");case 13:return t.abrupt("return","Hand");case 14:return t.abrupt("return","Ear Lobe");case 15:return t.abrupt("return","Foot");case 16:return t.abrupt("return","Unknown");case 17:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"parseHR",value:function(t){var e=t.getUint8(0),a={},r=1;1&e?(a.heartRate=t.getUint16(r,!0),r+=2):(a.heartRate=t.getUint8(r),r+=1);var n=2&e;if(4&e&&(a.contactDetected=!!n),8&e&&(a.energyExpended=t.getUint16(r,!0),r+=2),16&e){for(var c=[];r+1<t.byteLength;r+=2)c.push(t.getUint16(r,!0));a.rrIntervals=c}return a}},{key:"readValue",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(a=this.state.characteristics[e])||void 0===a?void 0:a.readValue();case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"writeValue",value:function(){var t=Object(h.a)(v.a.mark((function t(e,a){var r;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(r=this.state.characteristics[e])||void 0===r?void 0:r.writeValue(a);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t,this)})));return function(e,a){return t.apply(this,arguments)}}()},{key:"startNotification",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",null===(a=this.state.characteristics[e])||void 0===a?void 0:a.startNotifications());case 1:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"stopNotification",value:function(){var t=Object(h.a)(v.a.mark((function t(e){var a;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",null===(a=this.state.characteristics[e])||void 0===a?void 0:a.stopNotifications());case 1:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t,e,a,r=this.state,c=r.device,i=r.server;return n.a.createElement("div",{className:"container text-left"},n.a.createElement("div",{className:"row"},n.a.createElement("h3",null,"Bluetooth status: ",this.state.isBluetoothAvailable?"available":"unavailable")),n.a.createElement("div",{className:"row"},n.a.createElement("h3",null,"Devices:")),n.a.createElement("div",{className:"row"},n.a.createElement("label",{htmlFor:"",className:"col-md-4"},"Name: ",null===c||void 0===c?void 0:c.name),n.a.createElement("label",{htmlFor:"",className:"col-md-4"},"HRM ID: ",this.state.hrmId),n.a.createElement("label",{htmlFor:"",className:"col-md-4"},"Connected: ",(null===i||void 0===i?void 0:i.connected)?"yes":"no")),n.a.createElement("div",{className:"row"},n.a.createElement("label",{htmlFor:"",className:"col-md-3"},"Battery information"),n.a.createElement("label",{htmlFor:"",className:"col-md-3"},"Level: ",null===(t=this.state.batteryInfo)||void 0===t?void 0:t.level),n.a.createElement("label",{htmlFor:"",className:"col-md-3"},"Level state: ",null===(e=this.state.batteryInfo)||void 0===e?void 0:e.levelState),n.a.createElement("label",{htmlFor:"",className:"col-md-3"},"Power state: ",null===(a=this.state.batteryInfo)||void 0===a?void 0:a.powerState)),n.a.createElement("div",{className:"row"},n.a.createElement("h3",null,"HeartRate: ",this.state.heartRate)),n.a.createElement("div",{className:"row"},n.a.createElement("button",{className:"btn btn-primary",onClick:this.onClick},"Discover"),n.a.createElement("button",{className:"btn btn-success",disabled:w.a.isNil(this.state.device)||w.a.isNil(this.state.server)||!this.state.server.connected,onClick:this.onTracking},"Tracking")),n.a.createElement("div",{className:"row"},n.a.createElement("h3",null,"HeartRate History: "),this.state.heartRateHistory.join(", ")))}}]),a}(n.a.Component);var g=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},n.a.createElement("label",null,"Build date: ","8/19/2020, 5:45:45 PM"),n.a.createElement(k,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(23);i.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.6db00fe9.chunk.js.map