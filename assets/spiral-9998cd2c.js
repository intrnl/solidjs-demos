import{s as S,a as N,r as I,c,b as v,g as F,h as U,i as u,I as q,S as A,e as T,t as g,j as B}from"./perf-monitor-07ca9b0e.js";const j=g('<div class="main"></div>',2),p=g('<span class="label"> </span>',2),D=g('<div class="cursor"></div>',2);function R(){const[e,s]=v(0),[i,d]=v(0),[l,h]=v(!1),[f,E]=v(0);let $=!1,o={x:0,y:0,timeout:!1};const C=F(()=>{const n=500+Math.round(Math.sin(f()/90*2*Math.PI)*500*.5),a=[];for(let m=n;m--;){let _=m/n*6,M=_*2*Math.PI,L=20+m*2,O=(_*255+f()*10)%255;a[m]={color:`hsl(${O}, 100%, 50%)`,x:e()+Math.sin(M)*L|0,y:i()+Math.cos(M)*L|0}}return a}),w=n=>{o.x=n.x,o.y=n.y,o.timeout||(o.timeout=!0,requestAnimationFrame(()=>{B(()=>{o.timeout=!1,s(o.x),d(o.y)})}))},y=()=>{h(!0)},x=()=>{h(!1)},b=()=>{$||(E(f()+1),requestAnimationFrame(b))};return U(()=>(window.addEventListener("pointermove",w),window.addEventListener("pointerdown",y),window.addEventListener("pointerup",x),requestAnimationFrame(b),()=>{window.removeEventListener("pointermove",w),window.removeEventListener("pointerdown",y),window.removeEventListener("pointerup",x),$=!0})),(()=>{const n=j.cloneNode(!0);return u(n,c(P,{label:!0,get x(){return e()},get y(){return i()},get big(){return l()}}),null),u(n,c(q,{get each(){return C()},children:a=>c(P,{get color(){return a().color},get x(){return a().x},get y(){return a().y},get big(){return l()}})}),null),n})()}function P(t){return(()=>{const r=D.cloneNode(!0);return u(r,c(A,{get when(){return t.label},get children(){const e=p.cloneNode(!0),s=e.firstChild;return u(e,()=>t.x,s),u(e,()=>t.y,null),e}})),T(e=>{const s=!!t.big,i=!!t.label,d=t.color,l=`translate(${t.x}px, ${t.y}px) scale(${t.big?2:1})`;return s!==e._v$&&r.classList.toggle("big",e._v$=s),i!==e._v$2&&r.classList.toggle("label",e._v$2=i),d!==e._v$3&&r.style.setProperty("border-color",e._v$3=d),l!==e._v$4&&r.style.setProperty("transform",e._v$4=l),e},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),r})()}/[&?]perfmon=(false|off|0)\b/.test(location.search)||(S(),N());I(()=>c(R,{}),document.getElementById("root"));
