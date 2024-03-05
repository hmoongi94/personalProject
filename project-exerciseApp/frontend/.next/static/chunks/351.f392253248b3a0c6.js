"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[351],{56351:function(e,t,l){l.r(t);var a=l(3827),r=l(64090);t.default=e=>{let{initialExerciseData:t}=e,l=t.map(e=>e.name),[s,n]=(0,r.useState)(null),[c,o]=(0,r.useState)(0),[i,d]=(0,r.useState)(!1),[u,x]=(0,r.useState)(0),[h,m]=(0,r.useState)(null),[p,b]=(0,r.useState)(0);(0,r.useEffect)(()=>{let e;return i&&null!==s&&s>0&&(e=setInterval(()=>{n(e=>null!==e&&e>0?e-1:e)},1e3)),()=>{clearInterval(e)}},[i,s]),(0,r.useEffect)(()=>{0===s&&(d(!1),n(c),window.alert("휴식 끝! 운동을 다시 시작하세요~"))},[s,c]);let[f,j]=(0,r.useState)([]),[g,N]=(0,r.useState)(0),S=(e,t)=>{let l="".concat(e,"세트: ").concat(t," reps");return(0,a.jsx)("p",{className:"mb-2",children:l},"set-".concat(e))};return(0,a.jsxs)("div",{className:"w-full h-[80vh] flex justify-evenly items-center",children:[(0,a.jsx)("div",{className:"h-full flex justify-center items-center",children:(0,a.jsx)("button",{className:"bg-blue-500 text-white px-4 py-2 rounded",onClick:()=>{n(null),o(0),d(!1),x(0),m(null),b(0),j([]),N(0)},children:"Refresh"})}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{className:"flex items-center mb-4",children:["Select Exercise:",(0,a.jsxs)("select",{className:"ml-2 p-2 border border-gray-300 rounded text-slate-950",value:h||"",onChange:e=>{m(e.target.value)},children:[(0,a.jsx)("option",{value:"",disabled:!0,children:"Select an exercise"}),l.map(e=>(0,a.jsx)("option",{value:e,children:e},e))]})]}),(0,a.jsxs)("label",{className:"flex items-center mb-4",children:["Enter Reps:",(0,a.jsx)("input",{className:"ml-2 p-2 border border-gray-300 rounded text-slate-950",type:"number",value:p,onChange:e=>{b(Math.max(Number(e.target.value),0))}})]}),f.map((e,t)=>(0,a.jsx)(r.Fragment,{children:e},t)),(0,a.jsxs)("p",{children:["Total Reps: ",g]}),(0,a.jsxs)("div",{className:"flex space-x-4 ml-20",children:[(0,a.jsx)("button",{className:"bg-purple-500 text-white px-4 py-2 rounded",onClick:()=>{let e=localStorage.getItem("token");if(0===g){alert("아직 진행한 세트가 없습니다.");return}if(!e){window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")&&(window.location.href="/login");return}fetch("http://localhost:3560/recordData",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(e)},body:JSON.stringify({totalReps:g,selectedExercise:h,executionCount:u})}).then(async e=>{e.ok?(console.log("Recorded successfully:",await e.json()),b(0),x(0),m(null),j([]),N(0)):console.error("Error recording data:",await e.json())}).catch(e=>{console.error("Error recording data:",e)})},children:"Record"}),(0,a.jsx)("button",{className:"bg-red-500 text-white px-4 py-2 rounded",onClick:()=>{b(0),x(0),N(0),m(null),j([])},children:"Reset"})]})]}),(0,a.jsxs)("div",{children:[(0,a.jsxs)("h1",{className:"text-2xl font-bold mb-4",children:["BreakTime: ",null===s?"00:00:00":"".concat(Math.floor(s/3600).toString().padStart(2,"0"),":").concat(Math.floor(s%3600/60).toString().padStart(2,"0"),":").concat((s%60).toString().padStart(2,"0"))]}),(0,a.jsxs)("label",{className:"flex items-center mb-4",children:["Countdown:",(0,a.jsx)("input",{className:"ml-2 p-2 border border-gray-300 rounded text-slate-950",type:"number",value:c,onChange:e=>{let t=Number(e.target.value);o(Math.max(t,0)),n(Math.max(t,0))}})]}),(0,a.jsxs)("div",{className:"flex space-x-4",children:[(0,a.jsx)("button",{className:"".concat(i?"bg-blue-500":"bg-green-500"," text-white px-4 py-2 rounded"),onClick:()=>{if(!1===i&&s===c&&0!==c&&(!h||0===p)){alert("진행할 운동을 선택하시고 Reps를 정해주세요.");return}if(!1===i&&s===c&&0!==c){x(e=>e+1);let e=S(u+1,p);j(t=>[...t,e]),N(e=>e+p)}!1===i&&0===c&&d(e=>!e),d(e=>!e)},children:i?"Pause":c===s?"SetDone-BreaktimeStart":"Resume"}),(0,a.jsx)("button",{className:"bg-red-500 text-white px-4 py-2 rounded",onClick:()=>{n(0),o(0),d(!1)},children:"Reset"})]})]})]})}}}]);