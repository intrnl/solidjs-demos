import{s as P,a as B,k as I,b as $,r as F,l as R,m as b,c as N,i as c,I as Q,e as T,n as V,t as x}from"./perf-monitor.57fd0f75.js";var d=d||function(){var n=0,t,o;(o=String.prototype).lpad||(o.lpad=function(e,a){return e.repeat((a-this.length)/e.length).concat(this)});function s(e){var a;return e>60?(a=(e%60).toFixed(2).split("."),Math.floor(e/60)+":"+a[0].lpad("0",2)+"."+a[1]):parseFloat(e).toFixed(2)}function i(e){var a="Query elapsed";return e>=10?a+=" warn_long":e>=1?a+=" warn":a+=" short",a}function h(e){var a="label";return e>=20?a+=" label-important":e>=10?a+=" label-warning":a+=" label-success",a}function S(e){e||(e={});var a=Math.random()*15;return e.elapsed=a,e.formatElapsed=s(a),e.elapsedClassName=i(a),e.query="SELECT blah FROM something",e.waiting=Math.random()<.5,Math.random()<.2&&(e.query="<IDLE> in transaction"),Math.random()<.1&&(e.query="vacuum"),e}function u(e){if(e)e.formatElapsed="",e.elapsedClassName="",e.query="",e.elapsed=null,e.waiting=null;else return{query:"***",formatElapsed:"",elapsedClassName:""}}function v(e,a,r){var l=Math.floor(Math.random()*10+1);if(e||(e={}),e.lastMutationId=r,e.nbQueries=l,e.lastSample||(e.lastSample={}),e.lastSample.topFiveQueries||(e.lastSample.topFiveQueries=[]),a){if(!e.lastSample.queries){e.lastSample.queries=[];for(var w=0;w<12;w++)e.lastSample.queries[w]=u()}for(var f in e.lastSample.queries){var E=e.lastSample.queries[f];f<=l?S(E):u(E)}}else{e.lastSample.queries=[];for(var f=0;f<12;f++)if(f<l){var E=S(u());e.lastSample.queries.push(E)}else e.lastSample.queries.push(u())}for(var C=0;C<5;C++){var L=e.lastSample.queries[C];e.lastSample.topFiveQueries[C]=L}return e.lastSample.nbQueries=l,e.lastSample.countClassName=h(l),e}function p(e){var a=t;if(!e){t=[];for(var r=1;r<=d.rows;r++)t.push({dbname:"cluster"+r,query:"",formatElapsed:"",elapsedClassName:""}),t.push({dbname:"cluster"+r+" replica",query:"",formatElapsed:"",elapsedClassName:""})}if(!t){t=[];for(var r=1;r<=d.rows;r++)t.push({dbname:"cluster"+r}),t.push({dbname:"cluster"+r+" replica"});a=t}for(var r in t){var l=t[r];!e&&a&&a[r]&&(l.lastSample=a[r].lastSample),!l.lastSample||Math.random()<d.mutations()?(n=n+1,e||(l.lastSample=null),v(l,e,n)):t[r]=a[r]}return{toArray:function(){return t}}}var m=.5;function q(e){return e&&(m=e),m}var _=document.querySelector("body"),D=_.firstChild,y=document.createElement("div");y.style.cssText="display: flex";var g=document.createElement("input"),M=document.createElement("label");return M.innerHTML="mutations : "+(m*100).toFixed(0)+"%",M.id="ratioval",g.setAttribute("type","range"),g.style.cssText="margin-bottom: 10px; margin-top: 5px",g.addEventListener("change",function(e){d.mutations(e.target.value/100),document.querySelector("#ratioval").innerHTML="mutations : "+(d.mutations()*100).toFixed(0)+"%"}),y.appendChild(M),y.appendChild(g),_.insertBefore(y,D),{generateData:p,rows:50,timeout:0,mutations:q}}();window.ENV=d;const H=x('<table class="table table-striped latest-data"><tbody></tbody></table>'),O=x('<tr><td class="dbname"></td><td class="query-count"><span></span></td></tr>'),z=x('<td><div class="popover left"><div class="popover-content"></div><div class="arrow"></div></div></td>');function A(n){return(()=>{const t=H.cloneNode(!0),o=t.firstChild;return c(o,N(Q,{get each(){return n.dbs},children:s=>(()=>{const i=O.cloneNode(!0),h=i.firstChild,S=h.nextSibling,u=S.firstChild;return c(h,()=>s().dbname),c(u,()=>s().lastSample.nbQueries),c(i,N(Q,{get each(){return s().lastSample.topFiveQueries},children:v=>(()=>{const p=z.cloneNode(!0),m=p.firstChild,q=m.firstChild;return c(p,()=>v().formatElapsed,m),c(q,()=>v().query),T(()=>V(p,v().elapsedClassName)),p})()}),null),T(()=>V(u,s().lastSample.countClassName)),i})()})),t})()}if(/[&?]perfmon=(false|off|0)\b/.test(location.search)){let s=function(){const i=ENV.generateData().toArray();o(i),setTimeout(s,ENV.timeout)};const n=document.getElementById("root"),[t,o]=$([]);s(),F(()=>N(A,{get dbs(){return t()}}),n)}else{let s=function(){const i=ENV.generateData().toArray();R("view update"),o(i),b("view update"),setTimeout(s,ENV.timeout)};P(),B(),I("view update");const n=document.getElementById("root"),[t,o]=$([]);s(),F(()=>N(A,{get dbs(){return t()}}),n)}
