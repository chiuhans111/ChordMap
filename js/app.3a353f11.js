(function(){"use strict";var e={5585:function(e,n,t){var a=t(9242),o=t(3396),i=t(7139);const r={ref:"key selector"},l=["value"],s={ref:"octave selector",value:"4"},c=["value"],u={ref:"chord selector"},m=["value"],d={class:"scroll_horizontal"},h={class:"piano_container-note_name"},p={class:"note_octave"},y={class:"piano_container-keyboard"},f=["onClick"],v={class:"piano_container-editor"},_=["onClick"],g=["onClick"];function M(e,n,t,M,w,k){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("section",null,[(0,o._)("button",{onClick:n[0]||(n[0]=e=>k.playEnabledKeys())},"Play Enabled Keys"),(0,o._)("div",null,[(0,o._)("button",{onClick:n[1]||(n[1]=e=>k.clearAllKeys())},"Clear All Keys"),(0,o._)("select",r,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.toneNames,(e=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:e},(0,i.zw)(e),9,l)))),128))],512),(0,o._)("select",s,[((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)([2,3,4,5,6],(e=>(0,o._)("option",{value:e,key:e},(0,i.zw)(e),9,c))),64))],512),(0,o._)("select",u,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.chordDatabase.chords,((e,n)=>((0,o.wg)(),(0,o.iD)("option",{value:e.keys,key:n},(0,i.zw)(e.name),9,m)))),128))],512),(0,o._)("button",{onClick:n[2]||(n[2]=e=>k.applyChords())},"Apply Chords")]),(0,o._)("p",null," Pitch Class and ratio = "+(0,i.zw)(w.pitchClass)+", "+(0,i.zw)(w.ratio),1)]),(0,o._)("section",null,[(0,o._)("div",d,[(0,o._)("div",{class:"piano_container",style:(0,i.j5)({width:w.fullWidth+"px"})},[(0,o._)("div",h,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,i.j5)(e.containerStyle),key:e.index},[(0,o._)("span",null,(0,i.zw)(e.name),1),(0,o._)("span",p,(0,i.zw)(e.octave),1)],4)))),128))]),(0,o._)("div",y,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,i.j5)(e.keyStyle),class:(0,i.C_)([e.cssClass,"note_body"]),key:e.index,onClick:(0,a.iM)((n=>k.pianoKeyClick(e)),["prevent"])},null,14,f)))),128))]),(0,o._)("div",v,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,i.j5)(e.containerStyle),class:(0,i.C_)([e.cssClass,"note_box"]),key:e.index,onClick:(0,a.iM)((n=>k.editorKeyClick(e)),["prevent"])},[(0,o._)("div",{class:(0,i.C_)([{note_enable:e.enable},"note_box-tag"])},(0,i.zw)(e.name)+" ",3)],14,_)))),128))])],4),(0,o._)("div",{class:"ratio_hint",style:(0,i.j5)({width:w.fullWidth+"px"})},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.analyzeResult.hints,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["ratio_hint-row",{is_higher_harmonics:e.isHigherHarmonics}]),key:n,onClick:n=>k.playHint(e)},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.nodes,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["ratio_hint-node",e.cssClass]),style:(0,i.j5)(e.style),key:n},[e.cssClass["node_is_minimize"]?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,i.zw)(e.ratio),1)],64))],6)))),128))],10,g)))),128))],4)])])])}t(6229),t(7330),t(2062),t(7658);let w=[];const k=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],b=[0,0,1,1,2,3,3,4,4,5,5,6],x=[!1,!0,!1,!0,!1,!1,!0,!1,!0,!1,!0,!1],C=440,K={};let j=49;for(let re=0;re<12;re++){const e=k[re];K[e]=re}function q(e,n){return K[e]+12*n}function H(e){return C*2**((e-F)/12)}function z(e){return 12*Math.log2(e/C)+F}function O(e){return(e+.5)%12-.5}function A(e){return k[Math.round(O(e))]}const D=q("C",2),T=q("B",7),S=(T-D+1)*j,F=q("A",4);for(let re=D;re<=T;re++){const e=k[re%12],n=x[re%12],t={name:e,index:re,octave:Math.floor(re/12),isWhiteKey:!n,isBlackKey:n,frequency:H(re),enable:!1,containerStyle:{position:"absolute"},keyStyle:{position:"absolute"},cssClass:{note_is_white:!n,note_is_black:n}};w.push(t)}function N(e){return(e-D)*j}function U(){const e=12*j,n=e/7;for(let t of w){let e=N(t.index);if(t.containerStyle.left=e+"px",t.containerStyle.width=j+"px",t.isWhiteKey){const a=b[t.index%12]*n,o=t.index%12*j;t.keyStyle.left=e+a-o+"px",t.keyStyle.width=n+"px"}else t.keyStyle.left=e+"px",t.keyStyle.width=j+"px"}}U();var R={pianoKeys:w,toneNames:k,frequency2index:z,wrapToneNumber:O,nearestToneName:A,keyid_start:D,keyid_end:T,index2Xoffset:N,fullWidth:S,name2index:q};const Y=new window.AudioContext;function P(e,n,t,a,o,i,r){const l=e.createGain();return l.gain.setValueAtTime(0,e.currentTime),l.gain.linearRampToValueAtTime(n,e.currentTime+t),l.gain.linearRampToValueAtTime(n*o,e.currentTime+t+a),l.gain.linearRampToValueAtTime(n*o,e.currentTime+r-i),l.gain.linearRampToValueAtTime(0,e.currentTime+r),l}let W=[];function $(e,n){W.splice(0,W.length);for(let t of e){const e=Y.createOscillator();e.frequency.setValueAtTime(t,Y.currentTime);const a=P(Y,.2,.001,.1,.5,.1,n);e.connect(a),a.connect(Y.destination),e.start(Y.currentTime),e.stop(Y.currentTime+n),W.push(e)}}var E={playNotes:$};function V(e){let n="😄";return e>2.5&&(n="😀"),e>4.5&&(n="😊"),e>5.5&&(n="😔"),e>8.5&&(n="😞"),e>12.5&&(n="😢"),n}function B(e,n){return Array.isArray(e)?0==e.length?1:1==e.length?e[0]:B(e[0],B(e.slice(1))):0===n?e:B(n,e%n)}function G(e,n){return Array.isArray(e)?0==e.length?0:1==e.length?e[0]:G(e[0],G(e.slice(1))):e*n/B(e,n)}function X(e){return e.map((e=>{while(e%2==0)e>>=1;return e}))}function I(e,n){const t=G(n),a=Math.log2(t),o=e.map((e=>12*Math.log2(e))),i=n.map((e=>12*Math.log2(e))),r=o.map(((e,n)=>e-i[n])).reduce(((e,n)=>e+n),0)/o.length,l=2**(r/12),s=o.map(((e,n)=>e-r-i[n])),c=Math.sqrt(s.map((e=>e*e)).reduce(((e,n)=>e+n),0)/s.length),u=12*a,m=Math.min(...i)<=u/2,d=Math.max(...i)>=u/2,h=n.map((e=>t/e)),p=Math.log2(G(X(n))),y=Math.log2(Math.min(...n,...h)),f=Math.log2(Math.min(n.reduce(((e,n)=>e+n))/n.length,h.reduce(((e,n)=>e+n))/h.length)),v=c<.15&&a<20&&y<6,_=.0025919*+c+.97270508*a+1*p+.25572689*y+.25703505*f;return{valid:v,merits:{rmse:c,log_complexity:a,log_min_complexity:p,log_r0:y,log_r1:f},lcm:t,isOvertone:m,isUndertone:d,merit:_,commonFrequency:l}}function J(e=[]){let n=[];if(0==e.length)return[];if(1==e.length)n.push({ratio:[1],lcm:1,commonFrequency:e[0],rmse:0,merit:0,isOvertone:!0,isUndertone:!0});else{let t={};const a=Math.min(...e);let o=e.map((e=>Math.floor(e/a)));for(let r=0;r<50;r++){const a=Math.max(...e.map(((e,n)=>e/(o[n]+1))));o=e.map((e=>Math.round(e/a)));const i=B(o),r=o.map((e=>e/i)),l=r.join(":");if(!t[l]){t[l]=!0;const a=I(e,r);a.valid&&n.push({ratio:r.map((e=>e)),lcm:a.lcm,commonFrequency:a.commonFrequency,merit:a.merit,isOvertone:a.isOvertone,isUndertone:a.isUndertone,merits:a.merits})}}const i=Math.max(...e);o=e.map((e=>Math.floor(i/e)));for(let r=0;r<40;r++){const a=Math.min(...e.map(((e,n)=>e*(o[n]+1))));o=e.map((e=>Math.round(a/e)));const i=o.reduce(((e,n)=>e*n),1),r=o.map((e=>Math.round(i/e))),l=B(r),s=r.map((e=>e/l)),c=s.join(":");if(!t[c]){t[c]=!0;const a=I(e,s);a.valid&&n.push({ratio:s.map((e=>e)),lcm:a.lcm,commonFrequency:a.commonFrequency,rmse:a.rmse,merit:a.merit,isOvertone:a.isOvertone,isUndertone:a.isUndertone})}}}return n.sort(((e,n)=>e.merit-n.merit)),Object.freeze(n),n.slice(0,4)}function L(e=[]){let n=J(e),t=[];for(let i=0;i<n.length;i++){const e=n[i],a=0==i?4:1;if(e.isOvertone)for(let n=1;n<=a;n++)t.push({ratio:e.ratio.map((e=>e*n)),lcm:e.lcm,commonFrequency:e.commonFrequency/n,isHigherHarmonics:n>1,isOvertone:!0,isUndertone:!1});if(e.isUndertone)for(let n=1;n<=a;n++)t.push({ratio:e.ratio,lcm:e.lcm*n,commonFrequency:e.commonFrequency,isHigherHarmonics:n>1,isOvertone:!1,isUndertone:!0})}let a=[];for(let i of t){if(i.isOvertone){let e=[];const n=Math.max(35,...i.ratio);for(let t=1;t<=n;t++){const n=t*i.commonFrequency,a=R.frequency2index(n),o=i.ratio.includes(t);a<R.keyid_start-1||a>R.keyid_end+1||(o||t<100)&&e.push({ratio:t,frequency:n,index:a,isKey:o,style:{position:"absolute",left:R.index2Xoffset(a+.5)+"px"},cssClass:{node_is_key:o,node_is_minimize:!o&&t>35||i.isHigherHarmonics,node_is_overtone:!0,node_is_factor:i.lcm%t==0}})}a.push({nodes:e,ratio:i.ratio,frequencies:i.ratio.map((e=>e*i.commonFrequency)),isHigherHarmonics:i.isHigherHarmonics})}if(i.isUndertone){let e=[];const n=i.ratio.map((e=>i.lcm/e)),t=Math.max(35,...n);for(let a=1;a<=t;a++){const t=i.lcm/a,o=t*i.commonFrequency,r=R.frequency2index(o),l=n.includes(a);r<R.keyid_start-1||r>R.keyid_end+1||(l||a<100)&&e.push({ratio:a,frequency:o,index:r,isKey:l,style:{position:"absolute",left:R.index2Xoffset(r+.5)+"px"},cssClass:{node_is_key:l,node_is_minimize:!l&&a>35||i.isHigherHarmonics,node_is_undertone:!0,node_is_factor:i.lcm%a==0}})}a.push({nodes:e,ratio:i.ratio,frequencies:i.ratio.map((e=>e*i.commonFrequency)),isHigherHarmonics:i.isHigherHarmonics})}}const o={frequencies:e,results:n,hints:a};return Object.freeze(o),o}var Z={analyze:L,ratio2emoji:V},Q=JSON.parse('[{"value":[5,8],"name":"Major"},{"value":[4,8],"name":"Minor"},{"value":[8],"name":"5"},{"value":[5,8,11],"name":"Dominant 7th"},{"value":[5,8,12],"name":"Major 7th"},{"value":[4,8,11],"name":"Minor 7th"},{"value":[4,8,12],"name":"Minor Major 7th"},{"value":[6,8],"name":"Sus 4"},{"value":[3,8],"name":"Sus 2"},{"value":[5,8,10],"name":"6"},{"value":[4,8,10],"name":"Minor 6"},{"value":[5,8,11,3],"name":"9"},{"value":[4,8,11,3],"name":"Minor 9"},{"value":[5,8,12,3],"name":"Major 9"},{"value":[4,8,12,3],"name":"Minor Major 9"},{"value":[5,8,11,3,6],"name":"11"},{"value":[4,8,11,3,6],"name":"Minor 11"},{"value":[5,8,12,3,6],"name":"Major 11"},{"value":[4,8,12,3,6],"name":"Minor Major 11"},{"value":[5,8,11,3,10],"name":"13"},{"value":[4,8,11,3,10],"name":"Minor 13"},{"value":[5,8,12,3,10],"name":"Major 13"},{"value":[4,8,12,3,10],"name":"Minor Major 13"},{"value":[5,8,3],"name":"add 9"},{"value":[4,8,3],"name":"Minor add 9"},{"value":[5,8,10,3],"name":"6 add 9"},{"value":[4,8,10,3],"name":"Minor 6 add 9"},{"value":[5,8,11,6],"name":"Dominant 7th add 11"},{"value":[5,8,12,6],"name":"Major 7th add 11"},{"value":[4,8,11,6],"name":"Minor 7th add 11"},{"value":[4,8,12,6],"name":"Minor Major 7th add 11"},{"value":[5,8,11,10],"name":"Dominant 7th add 13"},{"value":[5,8,12,10],"name":"Major 7th add 13"},{"value":[4,8,11,10],"name":"Minor 7th add 13"},{"value":[4,8,12,10],"name":"Minor Major 7th add 13"},{"value":[5,7,11],"name":"7b5"},{"value":[5,9,11],"name":"7#5"},{"value":[5,8,11,2],"name":"7b9"},{"value":[5,8,11,4],"name":"7#9"},{"value":[5,9,11,2],"name":"7#5b9"},{"value":[4,7,11],"name":"m7b5"},{"value":[4,9,11],"name":"m7#5"},{"value":[4,8,11,2],"name":"m7b9"},{"value":[5,8,11,3,7],"name":"9#11"},{"value":[5,8,11,3,9],"name":"9b13"},{"value":[6,8,10],"name":"6sus4"},{"value":[6,8,11],"name":"7sus4"},{"value":[6,8,12],"name":"Major 7th Sus4"},{"value":[6,8,11,3],"name":"9sus4"},{"value":[6,8,12,3],"name":"Major 9 Sus4"}]');let ee=[];for(let re of Q){let e=[];for(let n of re.value){if(e.length>0)while(n<e[e.length-1])n+=12;e.push(n)}ee.push({name:re.name,keys:[0,e.map((e=>e-1))]})}var ne={chords:ee};console.log(ne);var te={name:"App",data(){return{pianoKeys:R.pianoKeys,toneNames:R.toneNames,fullWidth:R.fullWidth,analyzeResult:{},pitchClass:[],ratio:[],chordDatabase:ne}},components:{},mounted(){const e=new URLSearchParams(window.location.search),n=e.get("keys");try{const e=n.split(",").map((e=>parseInt(e)));for(let n of this.pianoKeys)n.enable=e.includes(n.index);this.updateAnalyze()}catch(t){console.log("parameter parsing failed")}console.log("keys:",n)},methods:{clearAllKeys(){for(let e of this.pianoKeys)e.enable=!1;this.updateAnalyze()},applyChords(){const e=this.$refs["key selector"],n=this.$refs["octave selector"],t=this.$refs["chord selector"],a=e.value,o=n.value,i=t.value.split(",").map((e=>parseInt(e))),r=R.name2index(a,o);for(let l of this.pianoKeys)l.enable=i.includes(l.index-r);this.updateAnalyze(),this.playEnabledKeys()},pianoKeyClick(e){E.playNotes([e.frequency],.5)},editorKeyClick(e){e.enable=!e.enable,E.playNotes([e.frequency],.5),this.updateAnalyze()},playEnabledKeys(){E.playNotes(R.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)),.5)},updateAnalyze(){this.updateParams(),this.analyzeResult=Z.analyze(R.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)));let e=R.pianoKeys.filter((e=>e.enable)).map((e=>e.index));e=e.map((n=>n-e[0])),this.pitchClass=e,this.analyzeResult.hints.length>0?this.ratio=this.analyzeResult.hints[0].ratio:this.ratio=[]},updateParams(){const e=R.pianoKeys.filter((e=>e.enable)).map((e=>e.index)).join(","),n=`${window.location.protocol}//${window.location.host}${window.location.pathname}?keys=${e}`;window.history.pushState({},"",n)},playHint(e){E.playNotes(e.frequencies,.5),this.ratio=e.ratio}},computed:{}},ae=t(89);const oe=(0,ae.Z)(te,[["render",M]]);var ie=oe;(0,a.ri)(ie).mount("#app")}},n={};function t(a){var o=n[a];if(void 0!==o)return o.exports;var i=n[a]={exports:{}};return e[a].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,a,o,i){if(!a){var r=1/0;for(u=0;u<e.length;u++){a=e[u][0],o=e[u][1],i=e[u][2];for(var l=!0,s=0;s<a.length;s++)(!1&i||r>=i)&&Object.keys(t.O).every((function(e){return t.O[e](a[s])}))?a.splice(s--,1):(l=!1,i<r&&(r=i));if(l){e.splice(u--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[a,o,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,a){var o,i,r=a[0],l=a[1],s=a[2],c=0;if(r.some((function(n){return 0!==e[n]}))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(s)var u=s(t)}for(n&&n(a);c<r.length;c++)i=r[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(u)},a=self["webpackChunkchordmap"]=self["webpackChunkchordmap"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(5585)}));a=t.O(a)})();
//# sourceMappingURL=app.3a353f11.js.map