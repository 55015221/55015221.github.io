import{d as g,u as b,r as t,o,c as u,a as e,w as n,b as c,e as x,f as v,F as k,g as w,t as V,h as i,T as C,K as $,i as B}from"./index-fmlMUPpI.js";import{l as I}from"./logo-with-shadow-DMPVz8Dn.js";import{_ as m}from"./_plugin-vue_export-helper-DlAUqK2U.js";const T={class:"container"},R={class:"logo"},j=g({__name:"index",setup(_){const r=[{label:"首页",link:"/"},{label:"关于",link:"/about"},{label:"Vite 官方中文文档",link:"https://cn.vitejs.dev/"},{label:"Arco Design",link:"https://arco.design/"},{label:"Vue.js",link:"https://arco.design/"},{label:"Vue Router",link:"https://router.vuejs.org/zh/"}],a=b(),l=s=>{s.startsWith("http")?window.open(s,"_blank"):a.push({path:s})};return(s,p)=>{const d=t("a-image"),f=t("a-menu-item"),y=t("a-menu");return o(),u("div",T,[e(y,{mode:"horizontal","default-selected-keys":["/"],onMenuItemClick:l},{default:n(()=>[e(f,{key:"0",style:{padding:0,marginRight:"38px"},disabled:""},{default:n(()=>[c("div",R,[e(d,{src:x(I),width:"40"},null,8,["src"]),v("GITHUB.IO ")])]),_:1}),(o(),u(k,null,w(r,h=>e(f,{key:h.link},{default:n(()=>[v(V(h.label),1)]),_:2},1024)),64))]),_:1})])}}}),A=m(j,[["__scopeId","data-v-a37ecf57"]]),D={};function F(_,r){const a=t("router-view");return o(),i(a,null,{default:n(({Component:l})=>[e(C,{name:"fade",mode:"out-in"},{default:n(()=>[(o(),i($,null,[(o(),u("div",{key:_.$route.path},[(o(),i(B(l)))]))],1024))]),_:2},1024)]),_:1})}const H=m(D,[["render",F]]),L={},M=c("div",{class:"container"},[c("div",{style:{"text-align":"center"}},[c("p",null,"Released under the MIT License. (dev)"),c("p",null,"本中文文档内容版权为 Vite 官方中文翻译团队所有，保留所有权利。")])],-1);function N(_,r){const a=t("a-divider");return o(),u(k,null,[e(a),M],64)}const z=m(L,[["render",N]]),E=g({name:"App",__name:"index",setup(_){return(r,a)=>{const l=t("a-layout-header"),s=t("a-layout-content"),p=t("a-layout-footer"),d=t("a-layout");return o(),i(d,null,{default:n(()=>[e(l,null,{default:n(()=>[e(A)]),_:1}),e(s,null,{default:n(()=>[e(H)]),_:1}),e(p,null,{default:n(()=>[e(z)]),_:1})]),_:1})}}});export{E as default};
