(function(){"use strict";var e={6895:function(e,n,t){var o=t(9242),i=t(3396),a=t(7139);const r={class:"scroll_horizontal"},l={class:"piano_container-note_name"},s={class:"note_octave"},c={class:"piano_container-keyboard"},u=["onClick"],p={class:"piano_container-editor"},y=["onClick"],m=["onClick"];function f(e,n,t,f,d,h){return(0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("section",null,[(0,i._)("button",{onClick:n[0]||(n[0]=e=>h.playEnabledKeys())},"Play Enabled Keys"),(0,i.Uk)(" "+(0,a.zw)(d.pitchClass),1)]),(0,i._)("section",null,[(0,i._)("div",r,[(0,i._)("div",{class:"piano_container",style:(0,a.j5)({width:d.fullWidth+"px"})},[(0,i._)("div",l,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.pianoKeys,(e=>((0,i.wg)(),(0,i.iD)("div",{style:(0,a.j5)(e.containerStyle),key:e.index},[(0,i._)("span",null,(0,a.zw)(e.name),1),(0,i._)("span",s,(0,a.zw)(e.octave),1)],4)))),128))]),(0,i._)("div",c,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.pianoKeys,(e=>((0,i.wg)(),(0,i.iD)("div",{style:(0,a.j5)(e.keyStyle),class:(0,a.C_)([e.cssClass,"note_body"]),key:e.index,onClick:(0,o.iM)((n=>h.pianoKeyClick(e)),["prevent"])},null,14,u)))),128))]),(0,i._)("div",p,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.pianoKeys,(e=>((0,i.wg)(),(0,i.iD)("div",{style:(0,a.j5)(e.containerStyle),class:(0,a.C_)([e.cssClass,"note_box"]),key:e.index,onClick:(0,o.iM)((n=>h.editorKeyClick(e)),["prevent"])},[(0,i._)("div",{class:(0,a.C_)([{note_enable:e.enable},"note_box-tag"])},(0,a.zw)(e.name)+" ",3)],14,y)))),128))])],4),(0,i._)("div",{class:"ratio_hint",style:(0,a.j5)({width:d.fullWidth+"px"})},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.analyzeResult.hints,((e,n)=>((0,i.wg)(),(0,i.iD)("div",{class:(0,a.C_)(["ratio_hint-row",{harmonized:e.harmonized}]),key:n,onClick:n=>h.playHint(e)},[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.nodes,((e,n)=>((0,i.wg)(),(0,i.iD)("div",{class:(0,a.C_)(["ratio_hint-node",e.cssClass]),style:(0,a.j5)(e.style),key:n},[e.cssClass["node_is_minimize"]?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)(i.HY,{key:0},[(0,i.Uk)((0,a.zw)(e.ratio),1)],64))],6)))),128))],10,m)))),128))],4)])])])}t(6229),t(7330),t(2062),t(7658);let d=[];const h=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],k=[0,0,1,1,2,3,3,4,4,5,5,6],w=[!1,!0,!1,!0,!1,!1,!0,!1,!0,!1,!0,!1],_=440,v={};let g=35;for(let X=0;X<12;X++){const e=h[X];v[e]=X}function b(e,n){return v[e]+12*n}function x(e){return _*2**((e-A)/12)}function C(e){return 12*Math.log2(e/_)+A}function K(e){return(e+.5)%12-.5}function q(e){return h[Math.round(K(e))]}const z=b("C",2),T=b("B",7),j=(T-z+1)*g,A=b("A",4);for(let X=z;X<=T;X++){const e=h[X%12],n=w[X%12],t={name:e,index:X,octave:Math.floor(X/12),isWhiteKey:!n,isBlackKey:n,frequency:x(X),enable:!1,containerStyle:{position:"absolute"},keyStyle:{position:"absolute"},cssClass:{note_is_white:!n,note_is_black:n}};d.push(t)}function M(e){return(e-z)*g}function D(){const e=12*g,n=e/7;for(let t of d){let e=M(t.index);if(t.containerStyle.left=e+"px",t.containerStyle.width=g+"px",t.isWhiteKey){const o=k[t.index%12]*n,i=t.index%12*g;t.keyStyle.left=e+o-i+"px",t.keyStyle.width=n+"px"}else t.keyStyle.left=e+"px",t.keyStyle.width=g+"px"}}D();var F={pianoKeys:d,frequency2index:C,wrapToneNumber:K,nearestToneName:q,keyid_start:z,keyid_end:T,index2Xoffset:M,fullWidth:j};const O=new window.AudioContext;function S(e,n,t,o,i,a,r){const l=e.createGain();return l.gain.setValueAtTime(0,e.currentTime),l.gain.linearRampToValueAtTime(n,e.currentTime+t),l.gain.linearRampToValueAtTime(n*i,e.currentTime+t+o),l.gain.linearRampToValueAtTime(n*i,e.currentTime+r-a),l.gain.linearRampToValueAtTime(0,e.currentTime+r),l}let N=[];function H(e,n){N.splice(0,N.length);for(let t of e){const e=O.createOscillator();e.frequency.setValueAtTime(t,O.currentTime);const o=S(O,.2,.001,.1,.5,.1,n);e.connect(o),o.connect(O.destination),e.start(O.currentTime),e.stop(O.currentTime+n),N.push(e)}}var R={playNotes:H};function W(e){let n="😄";return e>2.5&&(n="😀"),e>4.5&&(n="😊"),e>5.5&&(n="😔"),e>8.5&&(n="😞"),e>12.5&&(n="😢"),n}function P(e,n){return Array.isArray(e)?e.length<=1?e[0]:P(e[0],P(e.slice(1))):0===n?e:P(n,e%n)}function V(e=[],n=[],t=.05){let o=[];if(null!==n&&0!=n.length||(n=e.map((()=>1))),0==e.length)return[];if(1==e.length)o.push({ratio:[1],commonFrequency:e[0],mse:0});else{let i=e.reduce(((e,n)=>Math.min(e,n))),a={},r=null;for(let l=0;l<50;l++){n=e.map((e=>Math.round(e/i)));const l=P(n);let s=n.map((e=>e/l));if(s.some((e=>e>35)))break;const c=s.join(":");if(!a[c]){a[c]=!0;const n=e.map((e=>12*Math.log2(e))),i=s.map((e=>12*Math.log2(e))),l=n.map(((e,n)=>e-i[n])).reduce(((e,n)=>e+n),0)/n.length,u=n.map(((e,n)=>e-l-i[n])),p=u.map((e=>Math.abs(e))).reduce(((e,n)=>Math.max(e,n)),0);if((null===r||p<r)&&(p<1&&o.push({ratio:s.map((e=>e)),commonFrequency:2**(l/12),mse:p}),r=p),p<t)break}i=e.map(((e,t)=>e/(n[t]+1))).reduce(((e,n)=>Math.max(e,n)))}}o.sort(((e,n)=>{const t=e.mse-n.mse;return Math.max(e.mse,n.mse)<.22?-e.commonFrequency+n.commonFrequency:t}));let i=[];for(let a of o){i.push({ratio:a.ratio.map((e=>e)),commonFrequency:a.commonFrequency,mse:a.mse,harmonized:!1});for(let e=2;e<=Math.min(35/a.ratio[a.ratio.length-1],4);e++)i.push({ratio:a.ratio.map((n=>n*e)),commonFrequency:a.commonFrequency/e,mse:a.mse,harmonized:!0})}o=i;for(let a of o)a.key=F.frequency2index(a.commonFrequency),a.keyName=F.nearestToneName(a.key);return o}function Y(e=[]){let n=V(e),t=[];for(let o of n){let e=[];for(let n=1;n<=Math.max(o.ratio[o.ratio.length-1],100);n++){const t=n*o.commonFrequency,i=F.frequency2index(t),a=o.ratio.includes(n);i<F.keyid_start-1||i>F.keyid_end+1||e.push({ratio:n,style:{position:"absolute",left:F.index2Xoffset(i+.5)+"px"},cssClass:{node_is_key:a,node_is_minimize:!a&&n>35||o.harmonized}})}Object.freeze(e),t.push({nodes:e,frequencies:o.ratio.map((e=>e*o.commonFrequency)),harmonized:o.harmonized})}return{frequencies:e,results:n,hints:t}}var E={analyze:Y,ratio2emoji:W},$={name:"App",data(){return{pianoKeys:F.pianoKeys,analyzeResult:{},pitchClass:[],fullWidth:F.fullWidth}},components:{},mounted(){const e=new URLSearchParams(window.location.search),n=e.get("keys");try{const e=n.split(",").map((e=>parseInt(e)));for(let n of this.pianoKeys)n.enable=e.includes(n.index);this.updateAnalyze()}catch(t){console.log("parameter parsing failed")}console.log("keys:",n)},methods:{pianoKeyClick(e){R.playNotes([e.frequency],.5)},editorKeyClick(e){e.enable=!e.enable,R.playNotes([e.frequency],.5),this.updateAnalyze()},playEnabledKeys(){R.playNotes(F.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)),.5)},updateAnalyze(){this.updateParams(),this.analyzeResult=E.analyze(F.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)));let e=F.pianoKeys.filter((e=>e.enable)).map((e=>e.index));e=e.map((n=>n-e[0])),this.pitchClass=e},updateParams(){const e=F.pianoKeys.filter((e=>e.enable)).map((e=>e.index)).join(","),n=`${window.location.protocol}//${window.location.host}${window.location.pathname}?keys=${e}`;window.history.pushState({},"",n)},playHint(e){R.playNotes(e.frequencies,.5)}},computed:{}},B=t(89);const G=(0,B.Z)($,[["render",f]]);var U=G;(0,o.ri)(U).mount("#app")}},n={};function t(o){var i=n[o];if(void 0!==i)return i.exports;var a=n[o]={exports:{}};return e[o].call(a.exports,a,a.exports,t),a.exports}t.m=e,function(){var e=[];t.O=function(n,o,i,a){if(!o){var r=1/0;for(u=0;u<e.length;u++){o=e[u][0],i=e[u][1],a=e[u][2];for(var l=!0,s=0;s<o.length;s++)(!1&a||r>=a)&&Object.keys(t.O).every((function(e){return t.O[e](o[s])}))?o.splice(s--,1):(l=!1,a<r&&(r=a));if(l){e.splice(u--,1);var c=i();void 0!==c&&(n=c)}}return n}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[o,i,a]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var i,a,r=o[0],l=o[1],s=o[2],c=0;if(r.some((function(n){return 0!==e[n]}))){for(i in l)t.o(l,i)&&(t.m[i]=l[i]);if(s)var u=s(t)}for(n&&n(o);c<r.length;c++)a=r[c],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(u)},o=self["webpackChunkchordmap"]=self["webpackChunkchordmap"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(6895)}));o=t.O(o)})();
//# sourceMappingURL=app.fe7f2b3d.js.map