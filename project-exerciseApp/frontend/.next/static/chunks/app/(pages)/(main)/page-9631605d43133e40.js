(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[492],{24435:function(e,t,r){Promise.resolve().then(r.bind(r,72809))},72809:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return h}});var a=r(3827),l=r(64090),n=r(47907),s=r(24930),i=r.n(s);r(11262);let u=i()(()=>Promise.all([r.e(946),r.e(365)]).then(r.bind(r,76724)),{loadableGenerated:{webpack:()=>[76724]}}),c=i()(()=>Promise.all([r.e(792),r.e(720)]).then(r.bind(r,3720)),{loadableGenerated:{webpack:()=>[3720]}}),o=i()(()=>r.e(351).then(r.bind(r,56351)),{loadableGenerated:{webpack:()=>[56351]}}),d=i()(()=>r.e(74).then(r.bind(r,15074)),{loadableGenerated:{webpack:()=>[15074]}}),f=i()(()=>r.e(473).then(r.bind(r,34473)),{loadableGenerated:{webpack:()=>[34473]}});var h=()=>{let[e,t]=(0,l.useState)(!1),[r,s]=(0,l.useState)("exerciseGuide"),[i,h]=(0,l.useState)([]),[x,m]=(0,l.useState)([]),y=(0,n.useSearchParams)(),[b,j]=(0,l.useState)([]),[p,w]=(0,l.useState)(null),[v,P]=(0,l.useState)([]),g=e=>{w(e)};return(0,l.useEffect)(()=>{t(!!localStorage.getItem("token"))},[e]),(0,l.useEffect)(()=>{(async()=>{try{let e=await fetch("http://localhost:3560/exercisedata"),t=await e.json();if(!Array.isArray(t))throw Error("데이터 형식 오류: 배열이 아닙니다.");m(t),h(t),P(t);let r=Array.from(new Set(t.flatMap(e=>e.category.split(","))));j(r)}catch(e){console.error("데이터를 불러오는 동안 에러발생:",e)}})()},[]),(0,l.useEffect)(()=>{(async()=>{try{let e=y.get("query");if(e){let t=await fetch("http://localhost:3560/searchexercisedata?query=".concat(e)),r=await t.json();if(!Array.isArray(r))throw Error("데이터 형식 오류: 배열이 아닙니다.");h(r)}else{let e=await fetch("http://localhost:3560/exercisedata"),t=await e.json();if(!Array.isArray(t))throw Error("데이터 형식 오류: 배열이 아닙니다.");h(t)}}catch(e){console.error("데이터를 불러오는 동안 에러발생:",e)}})()},[y]),(0,l.useEffect)(()=>{P(i.filter(e=>null===p||e.category.includes(p)))},[p,i]),(0,a.jsxs)("div",{className:"w-screen h-full",children:[(0,a.jsx)("nav",{className:"w-full border-b-2 border-wine p-4",children:(0,a.jsxs)("ul",{className:"w-full flex flex-row justify-around",children:[(0,a.jsx)("li",{className:"exerciseGuide"===r?"active":"",onClick:()=>s("exerciseGuide"),children:"Exercise Guide"}),(0,a.jsx)("li",{className:"timer"===r?"active":"",onClick:()=>s("timer"),children:"Breaktime Timer & record my Workout"}),(0,a.jsx)("li",{className:"exerciseDiary"===r?"active":"",onClick:()=>{e?s("exerciseDiary"):window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")&&(window.location.href="/login")},children:"Workout history"})]})}),(()=>{switch(r){case"exerciseGuide":return(0,a.jsxs)("div",{className:"w-full h-full",children:[(0,a.jsx)("div",{className:"flex justify-center",children:"Exercise Guide"}),(0,a.jsx)(l.Suspense,{fallback:(0,a.jsx)("div",{className:"text-white",children:"Loading..."}),children:(0,a.jsx)(d,{placeholder:"Search..."})}),(0,a.jsx)(f,{categories:b,selectedCategory:p,filterExercisesByCategory:g}),(0,a.jsx)(l.Suspense,{fallback:(0,a.jsx)("div",{className:"text-white",children:"Loading..."}),children:(0,a.jsx)(c,{filteredExerciseData:v})})]});case"timer":return(0,a.jsx)(o,{initialExerciseData:x});case"exerciseDiary":return(0,a.jsx)(u,{});default:return null}})()]})}},47907:function(e,t,r){"use strict";var a=r(15313);r.o(a,"useParams")&&r.d(t,{useParams:function(){return a.useParams}}),r.o(a,"usePathname")&&r.d(t,{usePathname:function(){return a.usePathname}}),r.o(a,"useRouter")&&r.d(t,{useRouter:function(){return a.useRouter}}),r.o(a,"useSearchParams")&&r.d(t,{useSearchParams:function(){return a.useSearchParams}})},24930:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}});let a=r(86921);r(3827),r(64090);let l=a._(r(84795));function n(e,t){let r={loading:e=>{let{error:t,isLoading:r,pastDelay:a}=e;return null}};return"function"==typeof e&&(r.loader=e),(0,l.default)({...r,...t})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},19721:function(e,t,r){"use strict";function a(e){let{reason:t,children:r}=e;return r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return a}}),r(99775)},84795:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let a=r(3827),l=r(64090),n=r(19721);function s(e){var t;return{default:null!=(t=null==e?void 0:e.default)?t:e}}let i={loader:()=>Promise.resolve(s(()=>null)),loading:null,ssr:!0},u=function(e){let t={...i,...e},r=(0,l.lazy)(()=>t.loader().then(s)),u=t.loading;function c(e){let s=u?(0,a.jsx)(u,{isLoading:!0,pastDelay:!0,error:null}):null,i=t.ssr?(0,a.jsx)(r,{...e}):(0,a.jsx)(n.BailoutToCSR,{reason:"next/dynamic",children:(0,a.jsx)(r,{...e})});return(0,a.jsx)(l.Suspense,{fallback:s,children:i})}return c.displayName="LoadableComponent",c}},11262:function(){}},function(e){e.O(0,[971,69,744],function(){return e(e.s=24435)}),_N_E=e.O()}]);