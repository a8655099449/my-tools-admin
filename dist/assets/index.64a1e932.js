var fe=Object.defineProperty,ge=Object.defineProperties;var _e=Object.getOwnPropertyDescriptors;var O=Object.getOwnPropertySymbols;var J=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var T=(t,e,r)=>e in t?fe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,f=(t,e)=>{for(var r in e||(e={}))J.call(e,r)&&T(t,r,e[r]);if(O)for(var r of O(e))z.call(e,r)&&T(t,r,e[r]);return t},S=(t,e)=>ge(t,_e(e));var H=(t,e)=>{var r={};for(var o in t)J.call(t,o)&&e.indexOf(o)<0&&(r[o]=t[o]);if(t!=null&&O)for(var o of O(t))e.indexOf(o)<0&&z.call(t,o)&&(r[o]=t[o]);return r};var R=(t,e,r)=>(T(t,typeof e!="symbol"?e+"":e,r),r);import{l as ye,j as n,S as xe,r as u,g as Ee,a as be,u as A,C as Ie,z as W,e as Se,B as G,D as Ce,b as Y,c as l,I as Fe,d as ve,f as ke,h as we,i as Oe,k as Re,m as Le,M as C,n as L,o as je,p as D,q as Be,R as Pe,F as N,s as Q,L as X,t as Te,v as Ae,w as Z,x as F,y as ee,A as De,E as Ne,G as $e,H as Ve,J as Me,K as E,N as te,O as qe,P as Ue,Q as Ke,T as Je}from"./vendor.b52cd847.js";const ze=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerpolicy&&(s.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?s.credentials="include":i.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}};ze();const He="modulepreload",ne={},We="/",d=function(e,r){return!r||r.length===0?e():Promise.all(r.map(o=>{if(o=`${We}${o}`,o in ne)return;ne[o]=!0;const i=o.endsWith(".css"),s=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${s}`))return;const c=document.createElement("link");if(c.rel=i?"stylesheet":He,i||(c.as="script",c.crossOrigin=""),c.href=o,document.head.appendChild(c),i)return new Promise((h,m)=>{c.addEventListener("load",h),c.addEventListener("error",m)})})).then(()=>e())},Ge="_layout_1qrd6_1",Ye="_sider_1qrd6_4",Qe="_content_1qrd6_18";var $={layout:Ge,sider:Ye,"collapsed-btn":"_collapsed-btn_1qrd6_7",content:Qe};const V=[{component:"@/pages/home",key:"home",name:"\u9996\u9875"},{name:"\u56FE\u7247\u538B\u7F29",key:"tiny-image"},{name:"\u6587\u5B57\u8F6C\u8BED\u97F3",key:"text2voice"},{name:"excel\u8F6Cjson",key:"excel2json"},{name:"useRequest",key:"hooks"},{name:"\u5468\u62A5\u586B\u5199",key:"work-report"},{name:"\u62D6\u62FDdemo",key:"low-code"},{name:"\u5176\u4ED6\u5DE5\u5177",key:"rest-tool",children:[{name:"\u7C7B\u578B\u8F6C\u6362",key:"rest-tool/to-type"}]}];function Xe(t,e){const r=ye(t,e);return r.preload=(t==null?void 0:t.requireAsync)||t,r}function Ze(t){return t.error?(console.error(t.error),null):n("div",{children:n(xe,{})})}var M=t=>Xe(t,{fallback:Ze({pastDelay:!0,error:!1,timedOut:!1})});function et(t){const e={"../pages/404/index.tsx":()=>d(()=>import("./index.742f6f99.js"),["assets/index.742f6f99.js","assets/vendor.b52cd847.js"]),"../pages/excel2json/index.tsx":()=>d(()=>import("./index.9fb08a7b.js"),["assets/index.9fb08a7b.js","assets/vendor.b52cd847.js"]),"../pages/home/index.tsx":()=>d(()=>import("./index.5d3d3fa4.js"),["assets/index.5d3d3fa4.js","assets/vendor.b52cd847.js"]),"../pages/hooks/index.tsx":()=>d(()=>import("./index.735519d0.js"),["assets/index.735519d0.js","assets/useRequest.563f7c37.js","assets/vendor.b52cd847.js"]),"../pages/login/index.tsx":()=>d(()=>Promise.resolve().then(function(){return wt}),void 0),"../pages/low-code/index.tsx":()=>d(()=>import("./index.a1ed7ade.js"),["assets/index.a1ed7ade.js","assets/vendor.b52cd847.js","assets/react-beautiful-dnd.esm.08ba696f.js","assets/index.ede4386f.js","assets/index.d3cdb0bc.js"]),"../pages/text2voice/index.tsx":()=>d(()=>import("./index.487cb89e.js"),["assets/index.487cb89e.js","assets/useRequest.563f7c37.js","assets/vendor.b52cd847.js"]),"../pages/tiny-image/index.tsx":()=>d(()=>import("./index.9f5c1998.js"),["assets/index.9f5c1998.js","assets/vendor.b52cd847.js"]),"../pages/work-report/index.tsx":()=>d(()=>import("./index.300a8e7a.js"),["assets/index.300a8e7a.js","assets/vendor.b52cd847.js"]),"../pages/low-code/Demo2Beauyiful1/index.tsx":()=>d(()=>import("./index.ede4386f.js"),["assets/index.ede4386f.js","assets/vendor.b52cd847.js","assets/react-beautiful-dnd.esm.08ba696f.js"]),"../pages/low-code/Demo3/index.tsx":()=>d(()=>import("./index.d3cdb0bc.js"),["assets/index.d3cdb0bc.js","assets/vendor.b52cd847.js","assets/react-beautiful-dnd.esm.08ba696f.js"]),"../pages/rest-tool/to-type/index.tsx":()=>d(()=>import("./index.69cbaf82.js"),["assets/index.69cbaf82.js","assets/vendor.b52cd847.js"])},r=[];function o(i){i.forEach(s=>{s.key&&!s.children?(s.component=M(e[`../pages/${s.key}/index.tsx`]),r.push(s)):Array.isArray(s.children)&&s.children.length&&o(s.children)})}return o(t),r}const tt="SETTING_KEY",nt="USER_INFO",Pt="WORK_REPORT_DB",Tt="TOOL_PROJECT_OPTIONS",At="TOOL_HISTORY_SELECT_PROJECT",re=(t,e)=>{const[r,o]=u.exports.useState(()=>{const s=localStorage.getItem(t);return s?JSON.parse(s):(localStorage.setItem(t,JSON.stringify(e)),e)});return[r,s=>{localStorage.setItem(t,JSON.stringify(s)),o(s)}]},oe=t=>{var o;const e=((o=document.querySelector("body"))==null?void 0:o.getAttribute("arco-theme"))||"light";Ee(t,{list:!0,dark:e==="dark"}).forEach((i,s)=>{const c=be(i);document.body.style.setProperty(`--arcoblue-${s+1}`,c)})},rt={themeColor:"#165DFF",lang:"zh-CN",theme:"dark",collapsed:!1},se=t=>{t==="dark"?document.body.setAttribute("arco-theme","dark"):document.body.removeAttribute("arco-theme")},ot=()=>{const[t,e]=re(tt,rt);return u.exports.useEffect(()=>{oe(t.themeColor),se(t.theme)},[]),{setting:t,setSetting:o=>{const{themeColor:i,theme:s}=o;o.themeColor!==t.themeColor&&oe(i),s!==t.theme&&se(s),e(o)}}},st=()=>{const[t,e]=re(nt,{});return{userInfo:t,setUserInfo:e}},it=()=>{const{pathname:t}=A(),e=(o,i)=>{const s=(c,h)=>{let m;return c=c.replace(/^\//,""),h.forEach(p=>{if(!m){if(p.key===c)return m=p;p.children&&p.children.length>0&&(m=s(c,p.children))}}),m};return s(o,i)};return{currentRoute:u.exports.useMemo(()=>{const o=e(t,V);return document.title=t==="/login"?"\u767B\u5F55":(o==null?void 0:o.name)||"404",o},[t])}},ie=u.exports.createContext({}),b=()=>u.exports.useContext(ie),ct=({children:t})=>{const e=ot(),r=e.setting.lang,o=st(),i=it();function s(){switch(r){case"zh-CN":return W;case"en-US":return Se;default:return W}}return n(ie.Provider,{value:f(f(f({},e),o),i),children:n(Ie,{locale:s(),children:t})})};var at="/assets/logo.34258c32.png";const v=t=>n(G,f({shape:"circle"},t)),lt="_navbar_5f4fu_1",ut="_logo_5f4fu_9",dt="_setting_5f4fu_23";var j={navbar:lt,logo:ut,"right-bar":"_right-bar_5f4fu_20",setting:dt,"color-bar":"_color-bar_5f4fu_23","color-list":"_color-list_5f4fu_35"};const ht=M(()=>d(()=>import("./ColorPicker.97d839ed.js"),["assets/ColorPicker.97d839ed.js","assets/vendor.b52cd847.js"])),mt=e=>{var t=H(e,[]);return n(Ce,S(f({title:"\u9875\u9762\u914D\u7F6E"},t),{width:400,children:n("div",{className:`${j.setting}`,children:n(ht,{})})}))},pt=()=>{const[t,e]=u.exports.useState(!1),{setting:r,setSetting:o,userInfo:i,setUserInfo:s}=b(),{theme:c}=r,h=c!=="dark",{replace:m}=Y(),{pathname:p}=A();return l("div",{className:`${j.navbar}`,children:[n(mt,{visible:t,onCancel:()=>e(!1),onOk:()=>e(!1)}),l("div",{className:`${j.logo}`,children:[n("img",{src:at,alt:""}),"my-tool"]}),l("div",{className:`${j["right-bar"]}`,children:[n(v,{icon:n(Fe,{}),className:"mr-10",href:"https://github.com/a8655099449/react-vite-admin",target:"_block"}),n(v,{icon:h?n(ve,{}):n(ke,{}),onClick:_=>{const g=h?"dark":"light";o(S(f({},r),{theme:g}))},className:"mr-10"}),n(we,{triggerElement:n(v,{icon:n(Oe,{}),style:{marginRight:10}}),options:[{label:"\u4E2D\u6587",value:"zh-CN"},{label:"English",value:"en-US"}],trigger:"hover",triggerProps:{autoAlignPopupWidth:!1,autoAlignPopupMinWidth:!0,position:"br"},value:r.lang,onChange:_=>{o(S(f({},r),{lang:_}))}}),n(v,{icon:n(Re,{}),onClick:()=>e(!0)}),n(Le,{droplist:l(C,{children:[l(C.Item,{children:[n(L,{}),i.acc]},"name"),l(C.Item,{onClick:_=>{je.confirm({title:"\u9000\u51FA\u767B\u5F55\u63D0\u793A",content:"\u662F\u5426\u786E\u8BA4\u9000\u51FA\uFF1F",onOk(){s({}),m(`/login?redirect=${p}`),D.success("\u9000\u51FA\u767B\u5F55\u6210\u529F\uFF01")}})},children:[n(Be,{}),"\u9000\u51FA\u767B\u5F55"]},"logout")]}),position:"br",children:n(v,{icon:n(L,{}),style:{marginLeft:10}})})]})]})},ft=({children:t})=>{const{currentRoute:e,userInfo:r}=b(),{auth:o}=r;return(e==null?void 0:e.auth)&&!e.auth.some(i=>o==null?void 0:o.includes(i))?n(Pe,{status:"500",subTitle:"\u6CA1\u6709\u8BBF\u95EE\u6743\u9650"}):n(N,{children:t})};class gt extends u.exports.Component{constructor(){super(...arguments);R(this,"state",{hasError:!1,errorInfo:"",errorMessage:""})}componentDidCatch(e,r){console.dir(e,r),JSON.stringify(e.stack,null,2),this.setState({hasError:!0,errorInfo:e.stack,errorMessage:e.message})}componentDidMount(){window.addEventListener("error",this.catchError,!0),window.addEventListener("unhandledrejection",this.catchRejectEvent,!0)}catchError(e){console.log("$error>>>>1",e)}catchRejectEvent(e){console.log("$unhandledrejection>>>>2",e)}render(){const{children:e}=this.props,{hasError:r}=this.state;if(r){const{errorInfo:o,errorMessage:i}=this.state;return l("div",{style:{padding:10,color:"#666"},children:[n("h2",{children:"\u51FA\u73B0\u4E86\u4E00\u4E9B\u9519\u8BEF"}),n("h3",{style:{color:"red"},children:i}),n("div",{style:{whiteSpace:"pre",textAlign:"left"},dangerouslySetInnerHTML:{__html:o}}),n("div",{style:{textAlign:"center",paddingTop:20},children:n("button",{children:n("a",{href:"/",style:{color:"inherit",textDecoration:"none"},children:"\u8FD4\u56DE\u9996\u9875"})})})]})}return e}}const{Sider:_t,Content:yt}=X,{Item:ce,SubMenu:ae}=C,q=Array.isArray;function xt(t){switch(t){case"home":return n(Me,{});case"tiny-image":return n(Ve,{});case"text2voice":return n($e,{});case"excel2json":return n(Ne,{});case"work-report":return n(De,{});default:return n(L,{})}}const Et=()=>{const t=u.exports.useMemo(()=>et(V),[]),{pathname:e}=A(),{userInfo:r,currentRoute:o}=b(),i=u.exports.useRef(new Map);u.exports.useState(e);const{setting:s,setSetting:c}=b(),{collapsed:h}=s,[m,p]=u.exports.useState([]),[_,g]=u.exports.useState([]);u.exports.useEffect(()=>{const y=e.replace(/^\//,"");p([y])},[e]);function de(){i.current.clear();const y=[];function x(B,k,he=[]){return B.map(a=>{const{breadcrumb:me=!0,hideInMenu:pe,auth:U}=a;if(pe||U&&!U.some(I=>{var K;return(K=r.auth)==null?void 0:K.includes(I)}))return null;const P=xt(a.key),w=l(N,{children:[P," ",a.name]});if(a.component&&(!q(a.children)||q(a.children)&&!a.children.length)){if(i.current.set(`/${a.key}`,me?[...he,a.name]:[]),k>1)return n(ce,{children:n(ee,{to:`/${a.key}`,children:w})},a.key);y.push(n(ce,{children:n(ee,{to:`/${a.key}`,children:w})},a.key))}if(q(a.children)&&a.children.length){const I=[];if(P.props.isIcon&&I.push(P),k>1)return n(ae,{title:w,children:x(a.children,k+1,[...I,a.name])},a.key);y.push(n(ae,{title:w,children:x(a.children,k+1,[...I,a.name])},a.key))}})}return x(V,1),y}return r.acc?l(N,{children:[n(pt,{}),l(X,{className:`${$.layout}`,children:[l(_t,{collapsed:h,className:`${$.sider}`,children:[n(C,{openKeys:_,collapse:h,onClickSubMenu:(y,x)=>{g(x)},selectedKeys:m,children:de()}),n("div",{className:`${$["collapsed-btn"]}`,onClick:()=>c(S(f({},s),{collapsed:!h})),children:h?n(Te,{}):n(Ae,{})})]}),n(yt,{style:{backgroundColor:"var(--color-bg-3)",padding:10},children:n(gt,{children:n(ft,{children:l(Z,{children:[t.map(({component:y,key:x,path:B})=>n(F,{path:B||`/${x}`,component:y,exact:!0},x)),n(F,{exact:!0,path:"/",children:n(Q,{to:"/home"})}),n(F,{exact:!0,path:"*",component:M(()=>d(()=>import("./index.742f6f99.js"),["assets/index.742f6f99.js","assets/vendor.b52cd847.js"]))})]})})})})]})]}):(D.warning("\u8BF7\u5148\u8FDB\u884C\u767B\u5F55"),n(Q,{to:`/login?redirect=${e}`}))};function bt(t=500){return new Promise((e,r)=>setTimeout(r,t))}function It(t,e){e||(e=t.slice(t.lastIndexOf("/")+1));let r=document.createElement("a");r.download=e,r.style.display="none",r.href=t,document.body.appendChild(r),r.click(),document.body.removeChild(r)}function Dt(t,e){if(typeof t=="undefined")throw new Error("The first parameter name is a must");if(typeof e=="undefined")throw new Error("The second parameter content is a must");e instanceof Blob||(typeof e!="string"&&(e=JSON.stringify(e,null,2)),e=new Blob([e]));const r=URL.createObjectURL(e);It(r,t)}function Nt(t=8,e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"){let r="";for(let o=t;o>0;--o)r+=e[Math.floor(Math.random()*e.length)];return r}function $t(t){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t);{let e=document.createElement("textarea");return e.value=t,e.style.position="absolute",e.style.left="-999999px",e.style.top="-999999px",document.body.appendChild(e),e.focus(),e.select(),new Promise((r,o)=>{document.execCommand("copy")?r():o(),e.remove()})}}function St(t){let e=typeof t;if(e!=="object")return e;const r={array:"any[]",object:"{}"},o=Object.prototype.toString.call(t).replace(/^\[object (\S+)\]$/,"$1").toLowerCase();return r[o]||o}const Vt=t=>{const e=f({},t);return(()=>{Object.keys(e).forEach(o=>{e[o]=St(t[o])})})(),JSON.stringify(e,null,2).replace(/"/g,"").replace(/,/g,";")},Ct=()=>{const t={},e=decodeURI(location.href.split("?")[1]);return e&&e.split("&").forEach(o=>{if(o&&o.includes("=")){let[i,s]=o.split("=");isNaN(+s)||(s=+s),s=="true"&&(s=!0),s=="false"&&(s=!1),t[i]=s}}),t},Ft=t=>{const{setting:e}=b(),{lang:r="zh-CN"}=e||{};return t[r]},vt="_login_4hq9w_1";var le={login:vt,"login-box":"_login-box_4hq9w_7"};const kt={"en-US":{"login.title":"login"},"zh-CN":{"login.title":"\u767B\u5F55"}};function ue(){const[t]=E.useForm(),{replace:e}=Y(),[r,o]=u.exports.useState(!1),{userInfo:i,setUserInfo:s}=b(),c=Ft(kt),{redirect:h="/"}=Ct(),m=async()=>{o(!0);let g=await t.validate();await bt(),g.acc==="admin"&&(g.auth=["admin"]),p(g)},p=g=>{s(f({},g)),o(!1),e(h),D.success("\u767B\u5F55\u6210\u529F")},_=!0;return n("div",{className:`${le.login}`,children:l("div",{className:`${le["login-box"]}`,children:[n("h1",{children:c["login.title"]}),l(E,{wrapperCol:{span:24},form:t,initialValues:i.remember?i:{},children:[n(E.Item,{field:"acc",required:!0,rules:[{required:_,message:"\u8D26\u53F7\u683C\u5F0F\u9519\u8BEF",minLength:5}],children:n(te,{type:"text",placeholder:"\u8BF7\u8F93\u5165\u8D26\u53F7",required:!0,prefix:n(L,{})})}),n(E.Item,{field:"pwd",required:!0,rules:[{required:_,message:"\u5BC6\u7801\u683C\u5F0F\u9519\u8BEF",minLength:6}],style:{marginBottom:10},children:n(te.Password,{type:"password",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",required:!0,prefix:n(qe,{}),onPressEnter:m})}),n(E.Item,{style:{marginBottom:10},field:"remember",itemType:"checkbox",initialValue:!0,children:n(Ue,{defaultChecked:!0,children:" \u8BB0\u4F4F\u5BC6\u7801"})}),n(E.Item,{children:n(G,{type:"primary",long:!0,onClick:m,loading:r,children:c["login.title"]})})]})]})})}var wt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:ue});console.clear();class Ot{constructor(e){R(this,"state","pending");R(this,"result");e(this.reject,this.reject)}initValue(){}resolve(e){this.state="fulfilled",this.result=e}reject(e){}}const Rt=new Ot((t,e)=>{e("\u6210\u529F")});console.log("\u{1F474}2022-02-21 12:01:43 index.ts line:29",Rt);console.log("\u{1F474}2022-04-19 16:31:34 main.tsx line:12","sssss");const Lt=()=>n(Je,{children:n(ct,{children:l(Z,{children:[n(F,{path:"/login",component:ue}),n(F,{path:"/",component:Et})]})})});Ke.render(n(Lt,{}),document.getElementById("root"));export{At as H,Tt as P,Pt as W,It as a,Nt as b,$t as c,Dt as d,b as g,Vt as p,j as s,re as u,bt as w};