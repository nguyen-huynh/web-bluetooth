(this["webpackJsonpweb-bluetooth"]=this["webpackJsonpweb-bluetooth"]||[]).push([[0],{12:function(e,t,n){e.exports=n(22)},17:function(e,t,n){},18:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(4),c=n.n(o),l=(n(17),n(5)),i=n.n(l),s=(n(18),n(2)),u=n.n(s),v=n(6),d=n(7),p=n(8),g=n(1),b=n(11),h=n(10),m=n(9),f=n.n(m),k=function(e){Object(b.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(d.a)(this,n),(a=t.call(this,e)).state={},a.onClick=a.onClick.bind(Object(g.a)(a)),a}return Object(p.a)(n,[{key:"onClick",value:function(){var e=Object(v.a)(u.a.mark((function e(t){var n,a,r,o,c,l,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.preventDefault(),console.log("onDiscovery"),e.next=5,navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:["battery_service"]});case 5:if(o=e.sent,!f.a.isNil(o)){e.next=8;break}throw"Error during pairing bluetooth device";case 8:if(console.log("THIS IS DEVICE:",o),!(null===(n=o.gatt)||void 0===n?void 0:n.connected)){e.next=13;break}e.t0=o.gatt,e.next=16;break;case 13:return e.next=15,null===(a=o.gatt)||void 0===a?void 0:a.connect();case 15:e.t0=e.sent;case 16:return c=e.t0,console.log("THIS IS SERVER:",c),e.next=20,null===c||void 0===c?void 0:c.getPrimaryService("battery_service");case 20:return l=e.sent,console.log("Battery Service",l),e.next=24,null===l||void 0===l?void 0:l.getCharacteristic("battery_level");case 24:return i=e.sent,console.log("Battery Level Characteristic",i),e.t1=console,e.next=29,null===i||void 0===i?void 0:i.readValue();case 29:if(e.t3=r=e.sent,e.t2=null===e.t3,e.t2){e.next=33;break}e.t2=void 0===r;case 33:if(!e.t2){e.next=37;break}e.t4=void 0,e.next=38;break;case 37:e.t4=r.getUint8(0);case 38:e.t5=e.t4,e.t1.log.call(e.t1,"Battery percentage is ",e.t5),e.next=45;break;case 42:e.prev=42,e.t6=e.catch(0),console.error(e.t6);case 45:case"end":return e.stop()}}),e,null,[[0,42]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("button",{onClick:this.onClick},"Discovery")}}]),n}(r.a.Component);var E=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:i.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Edit ",r.a.createElement("code",null,"src/App.tsx")," and save to reload."),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React"),r.a.createElement(k,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},5:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"}},[[12,1,2]]]);
//# sourceMappingURL=main.9e490c97.chunk.js.map