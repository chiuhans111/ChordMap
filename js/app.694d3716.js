(function(){"use strict";var e={9055:function(e,n,t){var i=t(9242),o=t(3396),r=t(7139);const a={class:"scroll_horizontal"},l={class:"piano_container-note_name"},s={class:"note_octave"},c={class:"piano_container-keyboard"},u=["onClick"],y={class:"piano_container-editor"},f=["onClick"],m=["onClick"];function p(e,n,t,p,d,h){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("section",null,[(0,o._)("button",{onClick:n[0]||(n[0]=e=>h.playEnabledKeys())},"Play Enabled Keys"),(0,o.Uk)(" "+(0,r.zw)(d.pitchClass),1)]),(0,o._)("section",null,[(0,o._)("div",a,[(0,o._)("div",{class:"piano_container",style:(0,r.j5)({width:d.fullWidth+"px"})},[(0,o._)("div",l,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,r.j5)(e.containerStyle),key:e.index},[(0,o._)("span",null,(0,r.zw)(e.name),1),(0,o._)("span",s,(0,r.zw)(e.octave),1)],4)))),128))]),(0,o._)("div",c,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,r.j5)(e.keyStyle),class:(0,r.C_)([e.cssClass,"note_body"]),key:e.index,onClick:(0,i.iM)((n=>h.pianoKeyClick(e)),["prevent"])},null,14,u)))),128))]),(0,o._)("div",y,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,r.j5)(e.containerStyle),class:(0,r.C_)([e.cssClass,"note_box"]),key:e.index,onClick:(0,i.iM)((n=>h.editorKeyClick(e)),["prevent"])},[(0,o._)("div",{class:(0,r.C_)([{note_enable:e.enable},"note_box-tag"])},(0,r.zw)(e.name)+" ",3)],14,f)))),128))])],4),(0,o._)("div",{class:"ratio_hint",style:(0,r.j5)({width:d.fullWidth+"px"})},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.analyzeResult.hints,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)(["ratio_hint-row",{harmonized:e.harmonized}]),key:n,onClick:n=>h.playHint(e)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.nodes,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)(["ratio_hint-node",e.cssClass]),style:(0,r.j5)(e.style),key:n},[e.cssClass["node_is_minimize"]?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,r.zw)(e.ratio),1)],64))],6)))),128))],10,m)))),128))],4)])])])}t(7658);let d=[];const h=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],_=[0,0,1,1,2,3,3,4,4,5,5,6],k=[!1,!0,!1,!0,!1,!1,!0,!1,!0,!1,!0,!1],v=440,b={};let g=35;for(let Z=0;Z<12;Z++){const e=h[Z];b[e]=Z}function w(e,n){return b[e]+12*n}function x(e){return v*2**((e-A)/12)}function C(e){return 12*Math.log2(e/v)+A}function q(e){return(e+.5)%12-.5}function K(e){return h[Math.round(q(e))]}const z=w("C",2),T=w("B",7),j=(T-z+1)*g,A=w("A",4);for(let Z=z;Z<=T;Z++){const e=h[Z%12],n=k[Z%12],t={name:e,index:Z,octave:Math.floor(Z/12),isWhiteKey:!n,isBlackKey:n,frequency:x(Z),enable:!1,containerStyle:{position:"absolute"},keyStyle:{position:"absolute"},cssClass:{note_is_white:!n,note_is_black:n}};d.push(t)}function M(e){return(e-z)*g}function D(){const e=12*g,n=e/7;for(let t of d){let e=M(t.index);if(t.containerStyle.left=e+"px",t.containerStyle.width=g+"px",t.isWhiteKey){const i=_[t.index%12]*n,o=t.index%12*g;t.keyStyle.left=e+i-o+"px",t.keyStyle.width=n+"px"}else t.keyStyle.left=e+"px",t.keyStyle.width=g+"px"}}D();var F={pianoKeys:d,frequency2index:C,wrapToneNumber:q,nearestToneName:K,keyid_start:z,keyid_end:T,index2Xoffset:M,fullWidth:j};const O=new window.AudioContext;function S(e,n,t,i,o,r,a){const l=e.createGain();return l.gain.setValueAtTime(0,e.currentTime),l.gain.linearRampToValueAtTime(n,e.currentTime+t),l.gain.linearRampToValueAtTime(n*o,e.currentTime+t+i),l.gain.linearRampToValueAtTime(n*o,e.currentTime+a-r),l.gain.linearRampToValueAtTime(0,e.currentTime+a),l}let N=[];function H(e,n){N.splice(0,N.length);for(let t of e){const e=O.createOscillator();e.frequency.setValueAtTime(t,O.currentTime);const i=S(O,.2,.001,.1,.5,.1,n);e.connect(i),i.connect(O.destination),e.start(O.currentTime),e.stop(O.currentTime+n),N.push(e)}}var R={playNotes:H};function W(e){let n="😄";return e>2.5&&(n="😀"),e>4.5&&(n="😊"),e>5.5&&(n="😔"),e>8.5&&(n="😞"),e>12.5&&(n="😢"),n}function V(e,n){return Array.isArray(e)?e.length<=1?e[0]:V(e[0],V(e.slice(1))):0===n?e:V(n,e%n)}function Y(e=[],n=[],t=.05){let i=[];if(null!==n&&0!=n.length||(n=e.map((()=>1))),0==e.length)return[];if(1==e.length)i.push({ratio:[1],commonFrequency:e[0],mse:0});else{let o=e.reduce(((e,n)=>Math.min(e,n))),r={},a=null;for(let l=0;l<50;l++){n=e.map((e=>Math.round(e/o)));const l=V(n);let s=n.map((e=>e/l));if(s.some((e=>e>35)))break;const c=s.join(":");if(!r[c]){r[c]=!0;const n=e.map((e=>12*Math.log2(e))),o=s.map((e=>12*Math.log2(e))),l=n.map(((e,n)=>e-o[n])).reduce(((e,n)=>e+n),0)/n.length,u=n.map(((e,n)=>e-l-o[n])),y=Math.sqrt(u.map((e=>e*e)).reduce(((e,n)=>e+n),0));if((null===a||y<a)&&(y<1&&i.push({ratio:s.map((e=>e)),commonFrequency:2**(l/12),mse:y}),a=y),y<t)break}o=e.map(((e,t)=>e/(n[t]+1))).reduce(((e,n)=>Math.max(e,n)))}}i.sort(((e,n)=>{const t=e.mse-n.mse;return Math.abs(t)<.15?-e.commonFrequency+n.commonFrequency:t}));let o=[];for(let r of i){o.push({ratio:r.ratio.map((e=>e)),commonFrequency:r.commonFrequency,mse:r.mse,harmonized:!1});for(let e=2;e<=Math.min(35/r.ratio[r.ratio.length-1],4);e++)o.push({ratio:r.ratio.map((n=>n*e)),commonFrequency:r.commonFrequency/e,mse:r.mse,harmonized:!0})}i=o;for(let r of i)r.key=F.frequency2index(r.commonFrequency),r.keyName=F.nearestToneName(r.key);return i}function E(e=[]){let n=Y(e),t=[];for(let i of n){let e=[];for(let n=1;n<=Math.max(i.ratio[i.ratio.length-1],100);n++){const t=n*i.commonFrequency,o=F.frequency2index(t),r=i.ratio.includes(n);o<F.keyid_start-1||o>F.keyid_end+1||e.push({ratio:n,style:{position:"absolute",left:F.index2Xoffset(o+.5)+"px"},cssClass:{node_is_key:r,node_is_minimize:!r&&n>35||i.harmonized}})}Object.freeze(e),t.push({nodes:e,frequencies:i.ratio.map((e=>e*i.commonFrequency)),harmonized:i.harmonized})}return{frequencies:e,results:n,hints:t}}var B={analyze:E,ratio2emoji:W},G={name:"App",data(){return{pianoKeys:F.pianoKeys,analyzeResult:{},pitchClass:[],fullWidth:F.fullWidth}},components:{},mounted(){},methods:{pianoKeyClick(e){R.playNotes([e.frequency],.5)},editorKeyClick(e){e.enable=!e.enable,R.playNotes([e.frequency],.5),this.updateAnalyze()},playEnabledKeys(){R.playNotes(F.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)),.5)},updateAnalyze(){this.analyzeResult=B.analyze(F.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)));let e=F.pianoKeys.filter((e=>e.enable)).map((e=>e.index));e=e.map((n=>n-e[0])),this.pitchClass=e},playHint(e){R.playNotes(e.frequencies,.5)}},computed:{}},P=t(89);const U=(0,P.Z)(G,[["render",p]]);var X=U;(0,i.ri)(X).mount("#app")}},n={};function t(i){var o=n[i];if(void 0!==o)return o.exports;var r=n[i]={exports:{}};return e[i].call(r.exports,r,r.exports,t),r.exports}t.m=e,function(){var e=[];t.O=function(n,i,o,r){if(!i){var a=1/0;for(u=0;u<e.length;u++){i=e[u][0],o=e[u][1],r=e[u][2];for(var l=!0,s=0;s<i.length;s++)(!1&r||a>=r)&&Object.keys(t.O).every((function(e){return t.O[e](i[s])}))?i.splice(s--,1):(l=!1,r<a&&(a=r));if(l){e.splice(u--,1);var c=o();void 0!==c&&(n=c)}}return n}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[i,o,r]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,i){var o,r,a=i[0],l=i[1],s=i[2],c=0;if(a.some((function(n){return 0!==e[n]}))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(s)var u=s(t)}for(n&&n(i);c<a.length;c++)r=a[c],t.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return t.O(u)},i=self["webpackChunkchordmap"]=self["webpackChunkchordmap"]||[];i.forEach(n.bind(null,0)),i.push=n.bind(null,i.push.bind(i))}();var i=t.O(void 0,[998],(function(){return t(9055)}));i=t.O(i)})();
//# sourceMappingURL=app.694d3716.js.map