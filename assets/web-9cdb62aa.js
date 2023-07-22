const e=Symbol("solid-track"),t={equals:(e,t)=>e===t};let n=T;const r=1,o=2,l={owned:null,cleanups:null,context:null,owner:null};var s=null;let u=null,i=null,c=null,f=null,a=0;function d(e,t){const n=i,r=s,o=0===e.length,u=o?l:{owned:null,cleanups:null,context:null,owner:void 0===t?r:t},c=o?e:()=>e((()=>y((()=>j(u)))));s=u,i=null;try{return N(c,!0)}finally{i=n,s=r}}function h(e,n){const r={value:e,observers:null,observerSlots:null,comparator:(n=n?Object.assign({},t,n):t).equals||void 0};return[m.bind(r),e=>("function"==typeof e&&(e=e(r.value)),S(r,e))]}function p(e,t,n){k(x(e,t,!1,r))}function g(e,t,o){n=E;const l=x(e,t,!1,r);o&&o.render||(l.user=!0),f?f.push(l):k(l)}function b(e,n,r){r=r?Object.assign({},t,r):t;const o=x(e,n,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=r.equals||void 0,k(o),m.bind(o)}function v(e){return N(e,!1)}function y(e){if(null===i)return e();const t=i;i=null;try{return e()}finally{i=t}}function w(e){g((()=>y(e)))}function A(e){return null===s||(null===s.cleanups?s.cleanups=[e]:s.cleanups.push(e)),e}function m(){if(this.sources&&this.state)if(this.state===r)k(this);else{const e=c;c=null,N((()=>B(this)),!1),c=e}if(i){const e=this.observers?this.observers.length:0;i.sources?(i.sources.push(this),i.sourceSlots.push(e)):(i.sources=[this],i.sourceSlots=[e]),this.observers?(this.observers.push(i),this.observerSlots.push(i.sources.length-1)):(this.observers=[i],this.observerSlots=[i.sources.length-1])}return this.value}function S(e,t,n){let o=e.value;return e.comparator&&e.comparator(o,t)||(e.value=t,e.observers&&e.observers.length&&N((()=>{for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t],o=u&&u.running;o&&u.disposed.has(n),(o?n.tState:n.state)||(n.pure?c.push(n):f.push(n),n.observers&&$(n)),o||(n.state=r)}if(c.length>1e6)throw c=[],new Error}),!1)),t}function k(e){if(!e.fn)return;j(e);const t=s,n=i,o=a;i=s=e,function(e,t,n){let o;try{o=e.fn(t)}catch(l){return e.pure&&(e.state=r,e.owned&&e.owned.forEach(j),e.owned=null),e.updatedAt=n+1,q(l)}(!e.updatedAt||e.updatedAt<=n)&&(null!=e.updatedAt&&"observers"in e?S(e,o):e.value=o,e.updatedAt=n)}(e,e.value,o),i=n,s=t}function x(e,t,n,o=r,u){const i={fn:e,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:s,context:null,pure:n};return null===s||s!==l&&(s.owned?s.owned.push(i):s.owned=[i]),i}function C(e){if(0===e.state)return;if(e.state===o)return B(e);if(e.suspense&&y(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<a);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if((e=t[n]).state===r)k(e);else if(e.state===o){const n=c;c=null,N((()=>B(e,t[0])),!1),c=n}}function N(e,t){if(c)return e();let r=!1;t||(c=[]),f?r=!0:f=[],a++;try{const t=e();return function(e){c&&(T(c),c=null);if(e)return;const t=f;f=null,t.length&&N((()=>n(t)),!1)}(r),t}catch(o){r||(f=null),c=null,q(o)}}function T(e){for(let t=0;t<e.length;t++)C(e[t])}function E(e){let t,n=0;for(t=0;t<e.length;t++){const r=e[t];r.user?e[n++]=r:C(r)}for(t=0;t<n;t++)C(e[t])}function B(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const l=e.sources[n];if(l.sources){const e=l.state;e===r?l!==t&&(!l.updatedAt||l.updatedAt<a)&&C(l):e===o&&B(l,t)}}}function $(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=o,n.pure?c.push(n):f.push(n),n.observers&&$(n))}}function j(e){let t;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),r=t.observers;if(r&&r.length){const e=r.pop(),o=t.observerSlots.pop();n<r.length&&(e.sourceSlots[o]=n,r[n]=e,t.observerSlots[n]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)j(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function q(e,t=s){const n=function(e){return e instanceof Error?e:new Error("string"==typeof e?e:"Unknown error",{cause:e})}(e);throw n}const M=Symbol("fallback");function O(e){for(let t=0;t<e.length;t++)e[t]()}function P(e,t){return y((()=>e(t||{})))}function D(t){const n="fallback"in t&&{fallback:()=>t.fallback};return b(function(t,n,r={}){let o=[],l=[],s=[],u=0,i=n.length>1?[]:null;return A((()=>O(s))),()=>{let c,f,a=t()||[];return a[e],y((()=>{let e,t,n,h,g,b,v,y,w,A=a.length;if(0===A)0!==u&&(O(s),s=[],o=[],l=[],u=0,i&&(i=[])),r.fallback&&(o=[M],l[0]=d((e=>(s[0]=e,r.fallback()))),u=1);else if(0===u){for(l=new Array(A),f=0;f<A;f++)o[f]=a[f],l[f]=d(p);u=A}else{for(n=new Array(A),h=new Array(A),i&&(g=new Array(A)),b=0,v=Math.min(u,A);b<v&&o[b]===a[b];b++);for(v=u-1,y=A-1;v>=b&&y>=b&&o[v]===a[y];v--,y--)n[y]=l[v],h[y]=s[v],i&&(g[y]=i[v]);for(e=new Map,t=new Array(y+1),f=y;f>=b;f--)w=a[f],c=e.get(w),t[f]=void 0===c?-1:c,e.set(w,f);for(c=b;c<=v;c++)w=o[c],f=e.get(w),void 0!==f&&-1!==f?(n[f]=l[c],h[f]=s[c],i&&(g[f]=i[c]),f=t[f],e.set(w,f)):s[c]();for(f=b;f<A;f++)f in n?(l[f]=n[f],s[f]=h[f],i&&(i[f]=g[f],i[f](f))):l[f]=d(p);l=l.slice(0,u=A),o=a.slice(0)}return l}));function p(e){if(s[f]=e,i){const[e,t]=h(f);return i[f]=t,n(a[f],e)}return n(a[f])}}}((()=>t.each),t.children,n||void 0))}function L(t){const n="fallback"in t&&{fallback:()=>t.fallback};return b(function(t,n,r={}){let o,l=[],s=[],u=[],i=[],c=0;return A((()=>O(u))),()=>{const f=t()||[];return f[e],y((()=>{if(0===f.length)return 0!==c&&(O(u),u=[],l=[],s=[],c=0,i=[]),r.fallback&&(l=[M],s[0]=d((e=>(u[0]=e,r.fallback()))),c=1),s;for(l[0]===M&&(u[0](),u=[],l=[],s=[],c=0),o=0;o<f.length;o++)o<l.length&&l[o]!==f[o]?i[o]((()=>f[o])):o>=l.length&&(s[o]=d(a));for(;o<l.length;o++)u[o]();return c=i.length=u.length=f.length,l=f.slice(0),s=s.slice(0,c)}));function a(e){u[o]=e;const[t,r]=h(f[o]);return i[o]=r,n(t,o)}}}((()=>t.each),t.children,n||void 0))}function _(e){const t=e.keyed,n=b((()=>e.when),void 0,{equals:(e,n)=>t?e===n:!e==!n});return b((()=>{const r=n();if(r){const o=e.children;return"function"==typeof o&&o.length>0?y((()=>o(t?r:()=>{if(!y(n))throw`Stale read from <${"Show"}>.`;return e.when}))):o}return e.fallback}),void 0,void 0)}const F="_$DX_DELEGATE";function U(e,t,n,r={}){let o;return d((r=>{o=r,t===document?e():J(t,e(),t.firstChild?null:void 0,n)}),r.owner),()=>{o(),t.textContent=""}}function z(e,t,n){let r;const o=()=>{const t=document.createElement("template");return t.innerHTML=e,n?t.content.firstChild.firstChild:t.content.firstChild},l=t?()=>y((()=>document.importNode(r||(r=o()),!0))):()=>(r||(r=o())).cloneNode(!0);return l.cloneNode=l,l}function G(e,t=window.document){const n=t[F]||(t[F]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];n.has(o)||(n.add(o),t.addEventListener(o,K))}}function H(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function I(e,t){null==t?e.removeAttribute("class"):e.className=t}function X(e,t,n){return y((()=>e(t,n)))}function J(e,t,n,r){if(void 0===n||r||(r=[]),"function"!=typeof t)return Q(e,t,r,n);p((r=>Q(e,t(),r,n)),r)}function K(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get:()=>n||document});n;){const r=n[t];if(r&&!n.disabled){const o=n[`${t}Data`];if(void 0!==o?r.call(n,o,e):r.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function Q(e,t,n,r,o){for(;"function"==typeof n;)n=n();if(t===n)return n;const l=typeof t,s=void 0!==r;if(e=s&&n[0]&&n[0].parentNode||e,"string"===l||"number"===l)if("number"===l&&(t=t.toString()),s){let o=n[0];o&&3===o.nodeType?o.data=t:o=document.createTextNode(t),n=W(e,n,r,o)}else n=""!==n&&"string"==typeof n?e.firstChild.data=t:e.textContent=t;else if(null==t||"boolean"===l)n=W(e,n,r);else{if("function"===l)return p((()=>{let o=t();for(;"function"==typeof o;)o=o();n=Q(e,o,n,r)})),()=>n;if(Array.isArray(t)){const l=[],u=n&&Array.isArray(n);if(R(l,t,n,o))return p((()=>n=Q(e,l,n,r,!0))),()=>n;if(0===l.length){if(n=W(e,n,r),s)return n}else u?0===n.length?V(e,l,r):function(e,t,n){let r=n.length,o=t.length,l=r,s=0,u=0,i=t[o-1].nextSibling,c=null;for(;s<o||u<l;)if(t[s]!==n[u]){for(;t[o-1]===n[l-1];)o--,l--;if(o===s){const t=l<r?u?n[u-1].nextSibling:n[l-u]:i;for(;u<l;)e.insertBefore(n[u++],t)}else if(l===u)for(;s<o;)c&&c.has(t[s])||t[s].remove(),s++;else if(t[s]===n[l-1]&&n[u]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[u++],t[s++].nextSibling),e.insertBefore(n[--l],r),t[o]=n[l]}else{if(!c){c=new Map;let e=u;for(;e<l;)c.set(n[e],e++)}const r=c.get(t[s]);if(null!=r)if(u<r&&r<l){let i,f=s,a=1;for(;++f<o&&f<l&&null!=(i=c.get(t[f]))&&i===r+a;)a++;if(a>r-u){const o=t[s];for(;u<r;)e.insertBefore(n[u++],o)}else e.replaceChild(n[u++],t[s++])}else s++;else t[s++].remove()}}else s++,u++}(e,n,l):(n&&W(e),V(e,l));n=l}else if(t.nodeType){if(Array.isArray(n)){if(s)return n=W(e,n,r,t);W(e,n,null,t)}else null!=n&&""!==n&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function R(e,t,n,r){let o=!1;for(let l=0,s=t.length;l<s;l++){let s,u=t[l],i=n&&n[l];if(null==u||!0===u||!1===u);else if("object"==(s=typeof u)&&u.nodeType)e.push(u);else if(Array.isArray(u))o=R(e,u,i)||o;else if("function"===s)if(r){for(;"function"==typeof u;)u=u();o=R(e,Array.isArray(u)?u:[u],Array.isArray(i)?i:[i])||o}else e.push(u),o=!0;else{const t=String(u);i&&3===i.nodeType&&i.data===t?e.push(i):e.push(document.createTextNode(t))}}return o}function V(e,t,n=null){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function W(e,t,n,r){if(void 0===n)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const s=t[l];if(o!==s){const t=s.parentNode===e;r||l?t&&s.remove():t?e.replaceChild(o,s):e.insertBefore(o,n)}else r=!0}}else e.insertBefore(o,n);return[o]}export{D as F,L as I,_ as S,h as a,b,P as c,p as d,v as e,G as f,g,A as h,J as i,I as j,w as o,U as r,H as s,z as t,X as u};
//# sourceMappingURL=web-9cdb62aa.js.map
