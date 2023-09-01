(function(){"use strict";var e={7994:function(e,n,t){var a=t(9242),o=t(3396),i=t(7139);const l={class:"container"},r=(0,o._)("div",null,[(0,o._)("h1",null," Chord Analyzer ")],-1),s={ref:"key selector"},c=["value"],u={ref:"octave selector",value:"4"},m=["value"],d={ref:"chord selector"},h=["value"],p={class:"scroll_horizontal"},y=(0,o._)("div",{class:"scroll_horizontal-sticky"}," ▼ Piano Keys | Click to play ",-1),f={class:"piano_container-keyboard"},v=["onClick"],_=(0,o._)("div",{class:"scroll_horizontal-sticky"}," ▼ Chord Switches | Click to toggle on/off ",-1),g={class:"piano_container-editor"},k=["onClick"],w={class:"note_octave"},M=(0,o._)("div",{class:"scroll_horizontal-sticky"}," ▼ Harmonics | Orange = Overtone, Blue = Undertone | Click to play ",-1),b=["onClick"],C=["onClick"],x=(0,o._)("section",null,[(0,o._)("div",{class:"container"},[(0,o._)("div",null,[(0,o._)("h1",null," How to use? "),(0,o._)("p",null,"1. Click piano key to play sound."),(0,o._)("p",null,"2. Toggle the switchs to make a chord."),(0,o._)("p",null,"3. View and interact with harmonics.")])])],-1),K=(0,o._)("footer",null,null,-1);function j(e,n,t,j,q,H){return(0,o.wg)(),(0,o.iD)("div",null,[(0,o._)("section",null,[(0,o._)("div",l,[r,(0,o._)("div",null,[(0,o._)("button",{onClick:n[0]||(n[0]=e=>H.clearAllKeys())},"Clear All Keys"),(0,o._)("select",s,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(q.toneNames,(e=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:e},(0,i.zw)(e),9,c)))),128))],512),(0,o._)("select",u,[((0,o.wg)(),(0,o.iD)(o.HY,null,(0,o.Ko)([2,3,4,5,6],(e=>(0,o._)("option",{value:e,key:e},(0,i.zw)(e),9,m))),64))],512),(0,o._)("select",d,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(q.chordDatabase.chords,((e,n)=>((0,o.wg)(),(0,o.iD)("option",{value:e.keys,key:n},(0,i.zw)(e.name),9,h)))),128))],512),(0,o._)("button",{onClick:n[1]||(n[1]=e=>H.applyChords())},"Apply Chords")]),(0,o._)("div",null,[(0,o._)("button",{onClick:n[2]||(n[2]=e=>H.playEnabledKeys())},"Play Enabled Keys"),(0,o._)("span",null," Pitch Class and ratio = "+(0,i.zw)(q.pitchClass)+", "+(0,i.zw)(q.ratio),1)])])]),(0,o._)("section",null,[(0,o._)("div",p,[y,(0,o._)("div",{class:"piano_container",style:(0,i.j5)({width:q.fullWidth+"px"})},[(0,o._)("div",f,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(q.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,i.j5)(e.keyStyle),class:(0,i.C_)([Object.assign(e.cssClass,{key_enabled:e.enable}),"note_body"]),key:e.index,onClick:(0,a.iM)((n=>H.pianoKeyClick(e)),["prevent"])},null,14,v)))),128))])],4),_,(0,o._)("div",{class:"piano_container",style:(0,i.j5)({width:q.fullWidth+"px"})},[(0,o._)("div",g,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(q.pianoKeys,(e=>((0,o.wg)(),(0,o.iD)("div",{style:(0,i.j5)(e.containerStyle),class:(0,i.C_)([e.cssClass,"note_box"]),key:e.index,onClick:(0,a.iM)((n=>H.editorKeyClick(e)),["prevent"])},[(0,o._)("div",{class:(0,i.C_)([{note_enable:e.enable},"note_box-tag"])},(0,i.zw)(e.name),3),(0,o._)("span",w,(0,i.zw)(e.octave),1)],14,k)))),128))])],4),M,(0,o._)("div",{class:"ratio_hint",style:(0,i.j5)({width:q.fullWidth+"px"})},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(q.analyzeResult.hints,((e,n)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["ratio_hint-row",{is_higher_harmonics:e.isHigherHarmonics}]),key:n,onClick:(0,a.iM)((n=>H.playHint(e)),["prevent"])},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.nodes,((n,t)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["ratio_hint-node",n.cssClass]),style:(0,i.j5)(n.style),key:t,onClick:(0,a.iM)((t=>H.playHint(e,n)),["prevent"])},[n.cssClass["node_is_minimize"]?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Uk)((0,i.zw)(n.ratio),1)],64))],14,C)))),128))],10,b)))),128))],4)])]),x,K])}t(6229),t(7330),t(2062),t(7658);let q=[];const H=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],z=[0,0,1,1,2,3,3,4,4,5,5,6],O=[!1,!0,!1,!0,!1,!1,!0,!1,!0,!1,!0,!1],A=440,T={};let D=42;for(let he=0;he<12;he++){const e=H[he];T[e]=he}function S(e,n){return T[e]+12*n}function F(e){return A*2**((e-V)/12)}function N(e){return 12*Math.log2(e/A)+V}function U(e){return(e+.5)%12-.5}function R(e){return H[Math.round(U(e))]}const P=S("C",2),W=S("B",7),Y=(W-P+1)*D,V=S("A",4);for(let he=P;he<=W;he++){const e=H[he%12],n=O[he%12],t={name:e,index:he,octave:Math.floor(he/12),isWhiteKey:!n,isBlackKey:n,frequency:F(he),enable:!1,containerStyle:{position:"absolute"},keyStyle:{position:"absolute"},cssClass:{note_is_white:!n,note_is_black:n}};q.push(t)}function $(e){return(e-P)*D}function E(){const e=12*D,n=e/7;for(let t of q){let e=$(t.index);if(t.containerStyle.left=e+"px",t.containerStyle.width=D+"px",t.isWhiteKey){const a=z[t.index%12]*n,o=t.index%12*D;t.keyStyle.left=e+a-o+"px",t.keyStyle.width=n+"px"}else t.keyStyle.left=e+"px",t.keyStyle.width=D+"px"}}E();var B={pianoKeys:q,toneNames:H,frequency2index:N,wrapToneNumber:U,nearestToneName:R,keyid_start:P,keyid_end:W,index2Xoffset:$,fullWidth:Y,name2index:S};const G=new window.AudioContext;function X(e,n,t,a,o,i,l){const r=e.createGain();return r.gain.setValueAtTime(0,e.currentTime),r.gain.linearRampToValueAtTime(n,e.currentTime+t),r.gain.linearRampToValueAtTime(n*o,e.currentTime+t+a),r.gain.linearRampToValueAtTime(n*o,e.currentTime+l-i),r.gain.linearRampToValueAtTime(0,e.currentTime+l),r}let I=[];function J(e,n){I.splice(0,I.length);for(let t of e){const e=G.createOscillator();e.frequency.setValueAtTime(t,G.currentTime);const a=X(G,.2,.001,.1,.5,.1,n);e.connect(a),a.connect(G.destination),e.start(G.currentTime),e.stop(G.currentTime+n),I.push(e)}}var L={playNotes:J};function Z(e){let n="😄";return e>2.5&&(n="😀"),e>4.5&&(n="😊"),e>5.5&&(n="😔"),e>8.5&&(n="😞"),e>12.5&&(n="😢"),n}function Q(e,n){return Array.isArray(e)?0==e.length?1:1==e.length?e[0]:Q(e[0],Q(e.slice(1))):0===n?e:Q(n,e%n)}function ee(e,n){return Array.isArray(e)?0==e.length?0:1==e.length?e[0]:ee(e[0],ee(e.slice(1))):e*n/Q(e,n)}function ne(e){return e.map((e=>{while(e%2==0)e>>=1;return e}))}function te(e,n){const t=ee(n),a=Math.log2(t),o=e.map((e=>12*Math.log2(e))),i=n.map((e=>12*Math.log2(e))),l=o.map(((e,n)=>e-i[n])).reduce(((e,n)=>e+n),0)/o.length,r=2**(l/12),s=o.map(((e,n)=>e-l-i[n])),c=Math.sqrt(s.map((e=>e*e)).reduce(((e,n)=>e+n),0)/s.length),u=12*a,m=Math.min(...i)<=u/2,d=Math.max(...i)>=u/2,h=n.map((e=>t/e)),p=Math.log2(ee(ne(n))),y=Math.log2(Math.min(...n,...h)),f=Math.log2(Math.min(n.reduce(((e,n)=>e+n))/n.length,h.reduce(((e,n)=>e+n))/h.length)),v=c<.15&&a<20&&y<6,_=.0025919*+c+.97270508*a+1*p+.25572689*y+.25703505*f;return{valid:v,merits:{rmse:c,log_complexity:a,log_min_complexity:p,log_r0:y,log_r1:f},lcm:t,isOvertone:m,isUndertone:d,merit:_,commonFrequency:r}}function ae(e=[]){let n=[];if(0==e.length)return[];if(1==e.length)n.push({ratio:[1],lcm:1,commonFrequency:e[0],rmse:0,merit:0,isOvertone:!0,isUndertone:!0});else{let t={};const a=Math.min(...e);let o=e.map((e=>Math.floor(e/a)));for(let l=0;l<50;l++){const a=Math.max(...e.map(((e,n)=>e/(o[n]+1))));o=e.map((e=>Math.round(e/a)));const i=Q(o),l=o.map((e=>e/i)),r=l.join(":");if(!t[r]){t[r]=!0;const a=te(e,l);a.valid&&n.push({ratio:l.map((e=>e)),lcm:a.lcm,commonFrequency:a.commonFrequency,merit:a.merit,isOvertone:a.isOvertone,isUndertone:a.isUndertone,merits:a.merits})}}const i=Math.max(...e);o=e.map((e=>Math.floor(i/e)));for(let l=0;l<40;l++){const a=Math.min(...e.map(((e,n)=>e*(o[n]+1))));o=e.map((e=>Math.round(a/e)));const i=o.reduce(((e,n)=>e*n),1),l=o.map((e=>Math.round(i/e))),r=Q(l),s=l.map((e=>e/r)),c=s.join(":");if(!t[c]){t[c]=!0;const a=te(e,s);a.valid&&n.push({ratio:s.map((e=>e)),lcm:a.lcm,commonFrequency:a.commonFrequency,rmse:a.rmse,merit:a.merit,isOvertone:a.isOvertone,isUndertone:a.isUndertone})}}}return n.sort(((e,n)=>e.merit-n.merit)),Object.freeze(n),n.slice(0,4)}function oe(e=[]){let n=ae(e),t=[];for(let i=0;i<n.length;i++){const e=n[i],a=0==i?4:1;if(e.isOvertone)for(let n=1;n<=a;n++)t.push({ratio:e.ratio.map((e=>e*n)),lcm:e.lcm,commonFrequency:e.commonFrequency/n,isHigherHarmonics:n>1,isOvertone:!0,isUndertone:!1});if(e.isUndertone)for(let n=1;n<=a;n++)t.push({ratio:e.ratio,lcm:e.lcm*n,commonFrequency:e.commonFrequency,isHigherHarmonics:n>1,isOvertone:!1,isUndertone:!0})}let a=[];for(let i of t){if(i.isOvertone){let e=[];const n=Math.max(35,...i.ratio);for(let t=1;t<=n;t++){const n=t*i.commonFrequency,a=B.frequency2index(n),o=i.ratio.includes(t);a<B.keyid_start-1||a>B.keyid_end+1||(o||t<100)&&e.push({ratio:t,frequency:n,index:a,isKey:o,style:{position:"absolute",left:B.index2Xoffset(a+.5)+"px"},cssClass:{node_is_key:o,node_is_minimize:!o&&t>35||i.isHigherHarmonics,node_is_overtone:!0,node_is_factor:i.lcm%t==0}})}a.push({nodes:e,ratio:i.ratio,frequencies:i.ratio.map((e=>e*i.commonFrequency)),isHigherHarmonics:i.isHigherHarmonics})}if(i.isUndertone){let e=[];const n=i.ratio.map((e=>i.lcm/e)),t=Math.max(35,...n);for(let a=1;a<=t;a++){const t=i.lcm/a,o=t*i.commonFrequency,l=B.frequency2index(o),r=n.includes(a);l<B.keyid_start-1||l>B.keyid_end+1||(r||a<100)&&e.push({ratio:a,frequency:o,index:l,isKey:r,style:{position:"absolute",left:B.index2Xoffset(l+.5)+"px"},cssClass:{node_is_key:r,node_is_minimize:!r&&a>35||i.isHigherHarmonics,node_is_undertone:!0,node_is_factor:i.lcm%a==0}})}a.push({nodes:e,ratio:i.ratio,frequencies:i.ratio.map((e=>e*i.commonFrequency)),isHigherHarmonics:i.isHigherHarmonics})}}const o={frequencies:e,results:n,hints:a};return Object.freeze(o),o}var ie={analyze:oe,ratio2emoji:Z},le=JSON.parse('[{"value":[5,8],"name":"Major"},{"value":[4,8],"name":"Minor"},{"value":[8],"name":"5"},{"value":[5,8,11],"name":"Dominant 7th"},{"value":[5,8,12],"name":"Major 7th"},{"value":[4,8,11],"name":"Minor 7th"},{"value":[4,8,12],"name":"Minor Major 7th"},{"value":[6,8],"name":"Sus 4"},{"value":[3,8],"name":"Sus 2"},{"value":[5,8,10],"name":"6"},{"value":[4,8,10],"name":"Minor 6"},{"value":[5,8,11,3],"name":"9"},{"value":[4,8,11,3],"name":"Minor 9"},{"value":[5,8,12,3],"name":"Major 9"},{"value":[4,8,12,3],"name":"Minor Major 9"},{"value":[5,8,11,3,6],"name":"11"},{"value":[4,8,11,3,6],"name":"Minor 11"},{"value":[5,8,12,3,6],"name":"Major 11"},{"value":[4,8,12,3,6],"name":"Minor Major 11"},{"value":[5,8,11,3,10],"name":"13"},{"value":[4,8,11,3,10],"name":"Minor 13"},{"value":[5,8,12,3,10],"name":"Major 13"},{"value":[4,8,12,3,10],"name":"Minor Major 13"},{"value":[5,8,3],"name":"add 9"},{"value":[4,8,3],"name":"Minor add 9"},{"value":[5,8,10,3],"name":"6 add 9"},{"value":[4,8,10,3],"name":"Minor 6 add 9"},{"value":[5,8,11,6],"name":"Dominant 7th add 11"},{"value":[5,8,12,6],"name":"Major 7th add 11"},{"value":[4,8,11,6],"name":"Minor 7th add 11"},{"value":[4,8,12,6],"name":"Minor Major 7th add 11"},{"value":[5,8,11,10],"name":"Dominant 7th add 13"},{"value":[5,8,12,10],"name":"Major 7th add 13"},{"value":[4,8,11,10],"name":"Minor 7th add 13"},{"value":[4,8,12,10],"name":"Minor Major 7th add 13"},{"value":[5,7,11],"name":"7b5"},{"value":[5,9,11],"name":"7#5"},{"value":[5,8,11,2],"name":"7b9"},{"value":[5,8,11,4],"name":"7#9"},{"value":[5,9,11,2],"name":"7#5b9"},{"value":[4,7,11],"name":"m7b5"},{"value":[4,9,11],"name":"m7#5"},{"value":[4,8,11,2],"name":"m7b9"},{"value":[5,8,11,3,7],"name":"9#11"},{"value":[5,8,11,3,9],"name":"9b13"},{"value":[6,8,10],"name":"6sus4"},{"value":[6,8,11],"name":"7sus4"},{"value":[6,8,12],"name":"Major 7th Sus4"},{"value":[6,8,11,3],"name":"9sus4"},{"value":[6,8,12,3],"name":"Major 9 Sus4"}]');let re=[];for(let he of le){let e=[];for(let n of he.value){if(e.length>0)while(n<e[e.length-1])n+=12;e.push(n)}re.push({name:he.name,keys:[0,e.map((e=>e-1))]})}var se={chords:re};console.log(se);var ce={name:"App",data(){return{pianoKeys:B.pianoKeys,toneNames:B.toneNames,fullWidth:B.fullWidth,analyzeResult:{},pitchClass:[],ratio:[],chordDatabase:se}},components:{},mounted(){const e=new URLSearchParams(window.location.search),n=e.get("keys");try{const e=n.split(",").map((e=>parseInt(e)));for(let n of this.pianoKeys)n.enable=e.includes(n.index);this.updateAnalyze()}catch(t){console.log("parameter parsing failed")}console.log("keys:",n)},methods:{clearAllKeys(){for(let e of this.pianoKeys)e.enable=!1;this.updateAnalyze()},applyChords(){const e=this.$refs["key selector"],n=this.$refs["octave selector"],t=this.$refs["chord selector"],a=e.value,o=n.value,i=t.value.split(",").map((e=>parseInt(e))),l=B.name2index(a,o);for(let r of this.pianoKeys)r.enable=i.includes(r.index-l);this.updateAnalyze(),this.playEnabledKeys()},pianoKeyClick(e){L.playNotes([e.frequency],.5)},editorKeyClick(e){e.enable=!e.enable,L.playNotes([e.frequency],.5),this.updateAnalyze()},playEnabledKeys(){L.playNotes(B.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)),.5)},updateAnalyze(){this.updateParams(),this.analyzeResult=ie.analyze(B.pianoKeys.filter((e=>e.enable)).map((e=>e.frequency)));let e=B.pianoKeys.filter((e=>e.enable)).map((e=>e.index));e=e.map((n=>n-e[0])),this.pitchClass=e,this.analyzeResult.hints.length>0?this.ratio=this.analyzeResult.hints[0].ratio:this.ratio=[]},updateParams(){const e=B.pianoKeys.filter((e=>e.enable)).map((e=>e.index)).join(","),n=`${window.location.protocol}//${window.location.host}${window.location.pathname}?keys=${e}`;window.history.pushState({},"",n)},playHint(e,n){void 0===n?L.playNotes(e.frequencies,.5):L.playNotes([n.frequency],.5),this.ratio=e.ratio}},computed:{}},ue=t(89);const me=(0,ue.Z)(ce,[["render",j]]);var de=me;(0,a.ri)(de).mount("#app")}},n={};function t(a){var o=n[a];if(void 0!==o)return o.exports;var i=n[a]={exports:{}};return e[a].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,a,o,i){if(!a){var l=1/0;for(u=0;u<e.length;u++){a=e[u][0],o=e[u][1],i=e[u][2];for(var r=!0,s=0;s<a.length;s++)(!1&i||l>=i)&&Object.keys(t.O).every((function(e){return t.O[e](a[s])}))?a.splice(s--,1):(r=!1,i<l&&(l=i));if(r){e.splice(u--,1);var c=o();void 0!==c&&(n=c)}}return n}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[a,o,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,a){var o,i,l=a[0],r=a[1],s=a[2],c=0;if(l.some((function(n){return 0!==e[n]}))){for(o in r)t.o(r,o)&&(t.m[o]=r[o]);if(s)var u=s(t)}for(n&&n(a);c<l.length;c++)i=l[c],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(u)},a=self["webpackChunkchordmap"]=self["webpackChunkchordmap"]||[];a.forEach(n.bind(null,0)),a.push=n.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(7994)}));a=t.O(a)})();
//# sourceMappingURL=app.2ab65db2.js.map