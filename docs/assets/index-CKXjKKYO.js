import{d as h,u as v,r as s,o as a,c as _,w as n,a as e,b as d,e as k,F as x,f as g,t as y,p as w,g as I,h as i,_ as u,T as V,K as C,i as $}from"./index-CdN_kEvI.js";const R=t=>(w("data-v-76e584ab"),t=t(),I(),t),B=R(()=>i("div",{class:"logo",style:{width:"80px",height:"30px",borderRadius:"2px",background:"var(--color-fill-3)",cursor:"text"}},"logo ",-1)),S=h({__name:"index",setup(t){const l=[{label:"首页",link:"/"},{label:"关于",link:"/about"},{label:"Vite 官方中文文档",link:"https://cn.vitejs.dev/"},{label:"Arco Design",link:"https://arco.design/"},{label:"Vue.js",link:"https://arco.design/"},{label:"Vue Router",link:"https://router.vuejs.org/zh/"}],o=v(),c=r=>{r.startsWith("http")?window.open(r,"_blank"):o.push({path:r})};return(r,E)=>{const p=s("a-menu-item"),f=s("a-menu"),b=s("a-layout-header");return a(),_(b,null,{default:n(()=>[e(f,{mode:"horizontal","default-selected-keys":["/"],onMenuItemClick:c},{default:n(()=>[e(p,{key:"0",style:{padding:0,marginRight:"38px"},disabled:""},{default:n(()=>[B]),_:1}),(a(),d(x,null,k(l,m=>e(p,{key:m.link},{default:n(()=>[g(y(m.label),1)]),_:2},1024)),64))]),_:1})]),_:1})}}}),T=u(S,[["__scopeId","data-v-76e584ab"]]),j={},z={class:"arco-main"};function A(t,l){const o=s("router-view");return a(),d("div",z,[e(o,null,{default:n(({Component:c})=>[e(V,{name:"fade"},{default:n(()=>[(a(),_(C,null,[(a(),_($(c),{class:"w100"}))],1024))]),_:2},1024)]),_:1})])}const D=u(j,[["render",A],["__scopeId","data-v-ddb0c2fd"]]),F={},L={style:{background:"#fff","z-index":"3"}},M=i("p",null,"Released under the MIT License. (dev)",-1),N=i("p",null,"本中文文档内容版权为 Vite 官方中文翻译团队所有，保留所有权利。",-1);function H(t,l){const o=s("a-divider");return a(),d("footer",L,[e(o),M,N])}const K=u(F,[["render",H]]),q=h({name:"App",__name:"index",setup(t){return(l,o)=>{const c=s("a-layout");return a(),_(c,null,{default:n(()=>[e(T),e(D),e(K)]),_:1})}}});export{q as default};