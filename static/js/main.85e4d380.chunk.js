(this["webpackJsonpweb-bluetooth"]=this["webpackJsonpweb-bluetooth"]||[]).push([[0],{12:function(e,t,n){e.exports=n(22)},17:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),c=n.n(o),i=n(6),s=n.n(i),l=(n(17),n(3)),u=n.n(l),v=n(7),p=n(8),h=n(9),d=n(1),m=n(11),b=n(10),f=n(2),g=n.n(f),w=function(e){Object(m.a)(n,e);var t=Object(b.a)(n);function n(e){var r;return Object(p.a)(this,n),(r=t.call(this,e)).state={},r.onClick=r.onClick.bind(Object(d.a)(r)),r}return Object(h.a)(n,[{key:"onClick",value:function(){var e=Object(v.a)(u.a.mark((function e(t){var n,r,a,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),console.log("Button onClicked"),!g.a.isNil(navigator.bluetooth)){e.next=5;break}throw new Error("Browser doesn't support intergrating bluetooth");case 5:return e.next=7,navigator.bluetooth.requestDevice({filters:[{services:["battery_service","heart_rate"]},{namePrefix:"OT"}],optionalServices:["battery_service","heart_rate"]});case 7:if(r=e.sent,!g.a.isNil(r)){e.next=10;break}throw new Error("Failed to get device");case 10:return console.log("Devices: ",r.id,r.name,r.uuids),e.next=13,null===(n=r.gatt)||void 0===n?void 0:n.connect();case 13:if(a=e.sent,!g.a.isNil(a)){e.next=16;break}throw new Error("Could not connect to GATT Server");case 16:return e.next=18,a.getPrimaryServices();case 18:o=e.sent,console.log("Services: ",o),window.bleServices=o,e.next=26;break;case 23:e.prev=23,e.t0=e.catch(0),console.error(e.t0);case 26:case"end":return e.stop()}}),e,null,[[0,23]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return a.a.createElement("button",{className:"btn btn-primary",onClick:this.onClick},"Discover")}}]),n}(a.a.Component);var k=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("header",{className:"App-header"},a.a.createElement("img",{src:s.a,className:"App-logo",alt:"logo"}),a.a.createElement("label",null,"Build date: ","8/12/2020, 3:28:57 PM"),a.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},a.a.createElement(w,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(21);c.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,n){e.exports=n.p+"static/media/logo.ee7cd8ed.svg"}},[[12,1,2]]]);
//# sourceMappingURL=main.85e4d380.chunk.js.map