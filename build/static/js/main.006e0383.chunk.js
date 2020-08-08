(this.webpackJsonpreact=this.webpackJsonpreact||[]).push([[0],{28:function(e,t,a){e.exports=a(49)},48:function(e,t,a){},49:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(20),l=a.n(c),s=a(3),u=a(9),o=a(1),i=a(21),d=a.n(i),m=(a(43),a(7)),p=a.n(m),v=a(12),f=a(22),E=a.n(f),b=a(23),O=a.n(b),h=a(24),j=a.n(h),S=a(25),g=a.n(S),k=a(11),w=a(26);let y=Object(k.d)([0,100],[0,1]),x=Object(k.a)(w.a,y),C=Object(k.c)([1,1,1],y),R=Object(k.b)(x,C);const N=new Array(256).fill(0).map((e,t)=>R(t));function T({url:e}){const t=Object(n.useRef)(),a=Object(n.useRef)(),c=Object(n.useRef)(),l=Object(n.useRef)(null),u=Object(n.useState)(!1),o=Object(s.a)(u,2),i=o[0],d=o[1],m=Object(n.useState)(1),p=Object(s.a)(m,2),v=p[0],f=p[1];Object(n.useEffect)(()=>{d(!1);const n=(r=t.current,s=a.current,u=c.current,{container:r,plugins:[O.a.create({color:"white",opacity:1}),g.a.create({container:s,colorMap:N}),j.a.create({container:u})],waveColor:"#F1FA22",progressColor:"OrangeRed",cursorColor:"OrangeRed",barWidth:3,responsive:!0,height:150,normalize:!0,partialRender:!0});var r,s,u;return l.current=E.a.create(n),l.current.load(e),l.current.on("ready",(function(){l.current.setVolume(v),f(v)})),()=>l.current.destroy()},[e,v]);return r.a.createElement("div",null,r.a.createElement("div",{id:"waveform",ref:t}),r.a.createElement("div",{className:"controls"},r.a.createElement("button",{onClick:()=>{d(!i),l.current.playPause()}},i?"Pause":"Play"),r.a.createElement("input",{type:"range",id:"volume",name:"volume",min:"0.01",max:"1",step:".025",onChange:e=>{const t=+e.target.value;t&&(f(t),l.current.setVolume(t||1))},defaultValue:v}),r.a.createElement("label",{htmlFor:"volume"},"Volume"),r.a.createElement("div",{id:"wave-timeline",ref:c}),r.a.createElement("div",{id:"wave-spectrogram",ref:a}),r.a.createElement("div",{id:"annotations"})))}var V=({tracks:e,header:t,selectedTrack:a,setSelectedTrack:n})=>r.a.createElement("div",{className:"playlist"},t&&r.a.createElement("h1",null,t),e.map(e=>r.a.createElement(u.b,{key:e.id,to:"/sound/".concat(e.id)},r.a.createElement("div",{className:e.id===(null===a||void 0===a?void 0:a.id)?"playlist-item selected":"playlist-item"},e.name))));function B(e){var t,a;const c=Object(n.useState)({}),l=Object(s.a)(c,2),i=l[0],d=l[1],m=Object(n.useState)([]),f=Object(s.a)(m,2),E=f[0],b=f[1],O=Object(o.f)().id;return Object(n.useEffect)(()=>{const t=e.freeSound;(function(){var e=Object(v.a)(p.a.mark((function e(){var a,n,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getSound(O);case 2:return a=e.sent,d(a),e.next=6,a.getSimilar();case 6:n=e.sent,r=n.results,console.log(r),r&&b(r);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()},[O,e]),r.a.createElement("div",null,r.a.createElement(u.b,{to:"/"},"Back"),r.a.createElement("h1",null,i.name),r.a.createElement("p",null,i.description),null===(t=i.tags)||void 0===t?void 0:t.map(e=>r.a.createElement("div",{key:e,className:"Tag"},e)),i.previews&&r.a.createElement(T,{url:i.previews["preview-lq-mp3"]}),r.a.createElement(V,{header:"Similar",tracks:E,selectedTrack:(null===i||void 0===i?void 0:i.id)||(null===(a=E[0])||void 0===a?void 0:a.id)||0,setSelectedTrack:()=>{}}))}function F({freeSound:e,searchValue:t}){const a=Object(n.useState)([]),c=Object(s.a)(a,2),l=c[0],u=c[1];return Object(n.useEffect)(()=>{if(t){(function(){var a=Object(v.a)(p.a.mark((function a(){var n,r;return p.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.textSearch(t);case 2:n=a.sent,(r=n.results)&&u(r);case 5:case"end":return a.stop()}}),a)})));return function(){return a.apply(this,arguments)}})()()}}),r.a.createElement(V,{tracks:l})}const q=new d.a;q.setToken("scxd6vqqUvfCieE3mGnrZbdBFRQc0DB4M7C5Jrbp");var A=()=>{const e=Object(n.useState)(),t=Object(s.a)(e,2),a=t[0],c=t[1];return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"Search"},r.a.createElement("input",{name:"search",type:"text",placeholder:"Search sound...",onChange:e=>c(e.target.value)})),r.a.createElement(u.a,null,r.a.createElement(o.c,null,r.a.createElement(o.a,{path:"/sound/:id",render:()=>r.a.createElement(B,{freeSound:q})}),r.a.createElement(o.a,{path:"/",render:()=>r.a.createElement(F,{searchValue:a,freeSound:q})}))))};a(48);const J=document.getElementById("root");l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),J)}},[[28,1,2]]]);
//# sourceMappingURL=main.006e0383.chunk.js.map