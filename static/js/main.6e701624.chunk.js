(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{45:function(t,e,a){t.exports={AddFormStyle:"AddItemFormStyle_AddFormStyle__3IAY9",filterButtonsBlock:"AddItemFormStyle_filterButtonsBlock__iG9O0"}},93:function(t,e,a){},94:function(t,e,a){},99:function(t,e,a){"use strict";a.r(e);var i,c=a(0),n=a.n(c),l=a(24),o=a.n(l),r=(a(93),a(94),a(150)),d=a(151),s=a(152),j=a(149),u=a(148),O=a(80),b=a.n(O),p=a(156),f=a(147),m=a(15),h=a(14),y=a(145),x=Object(y.a)(),v=Object(y.a)(),D=[],T=function(t,e){return{type:"FILTER-TODOLIST",payload:{value:t,todolistId:e}}},I=a(22),S=a(153),A=a(13),k=a(2),g=n.a.memo((function(t){var e=Object(c.useState)(!1),a=Object(A.a)(e,2),i=a[0],n=a[1],l=Object(c.useState)(t.title),o=Object(A.a)(l,2),r=o[0],d=o[1];return i?Object(k.jsx)("input",{value:r,autoFocus:!0,onBlur:function(){n(!1),t.changeTitle(r)},onChange:function(t){d(t.currentTarget.value)}}):Object(k.jsx)("span",{onDoubleClick:function(){return n(!0)},children:r})})),C=a(45),E=a.n(C),N=a(53),L=a.n(N),w=a(155),M=a(4),B=(i={},Object(M.a)(i,x,[{id:Object(y.a)(),title:"HTML&CSS",isDone:!0},{id:Object(y.a)(),title:"JS",isDone:!0},{id:Object(y.a)(),title:"REACT",isDone:!1}]),Object(M.a)(i,v,[{id:Object(y.a)(),title:"Milk",isDone:!0},{id:Object(y.a)(),title:"React Book",isDone:!0},{id:Object(y.a)(),title:"Native JS",isDone:!1}]),i),F=a(142),K=a(154),R=n.a.memo((function(t){var e=Object(c.useState)(""),a=Object(A.a)(e,2),i=a[0],n=a[1],l=Object(c.useState)(null),o=Object(A.a)(l,2),r=o[0],d=o[1],s=function(){""!==i.trim()?(t.addItem(i),n("")):d("Title is required")};return Object(k.jsxs)("div",{className:E.a.AddFormStyle,children:[Object(k.jsx)(F.a,{size:"small",id:"standard-basic",label:r?"Title is required":t.addLabel,variant:"standard",value:i,onChange:function(t){n(t.currentTarget.value)},onKeyPress:function(t){r&&d(null),13===t.charCode&&s()},error:!!r}),Object(k.jsx)(K.a,{onClick:s,style:{marginLeft:"10px",fontSize:30,cursor:"pointer"},color:"primary",children:"add_circle"})]})})),G=a(144),H=n.a.memo((function(t){var e=t.todolistID,a=t.task;console.log("Task");var i=Object(I.b)(),n=Object(c.useCallback)((function(t){i({type:"REMOVE-TASK",payload:{id:t,todolistID:e}})}),[e,i]),l=Object(c.useCallback)((function(t){var c=t.currentTarget.checked;i(function(t,e,a){return{type:"CHANGE-TASK-STATUS",payload:{taskId:t,isDone:e,todolistID:a}}}(a.id,c,e))}),[a.id,e,i]),o=Object(c.useCallback)((function(t){return i(function(t,e,a){return{type:"CHANGE-TASK-NAME",payload:{id:t,taskID:e,title:a}}}(e,a.id,t))}),[i,a.id,e]);return Object(k.jsxs)("li",{className:a.isDone?"is-done":"",children:[Object(k.jsx)(G.a,{size:"small",onChange:l,checked:a.isDone}),Object(k.jsx)(g,{title:a.title,changeTitle:o}),Object(k.jsx)(u.a,{onClick:function(){return n(a.id)},children:Object(k.jsx)(L.a,{})})]},a.id)})),_=n.a.memo((function(t){var e=Object(c.useState)(""),a=Object(A.a)(e,2),i=(a[0],a[1]),n=Object(c.useState)(null),l=Object(A.a)(n,2),o=(l[0],l[1]),r=Object(I.c)((function(e){return e.tasks[t.tl.id]})),d=Object(I.b)(),s=Object(c.useCallback)((function(e){var a=e.trim();""!==a?(d(function(t,e){return{type:"ADD-TASK",payload:{title:t,todolistID:e}}}(a,t.tl.id)),i("")):o("Title is required")}),[d,t.tl.id]),O=Object(c.useCallback)((function(){return d(T("all",t.tl.id))}),[d,t.tl.id]),b=Object(c.useCallback)((function(){return d(T("active",t.tl.id))}),[d,t.tl.id]),p=Object(c.useCallback)((function(){return d(T("completed",t.tl.id))}),[d,t.tl.id]),f=r;"active"===t.tl.filter&&(f=r.filter((function(t){return!t.isDone}))),"completed"===t.tl.filter&&(f=r.filter((function(t){return t.isDone})));var m=0===r.length?E.a.filterButtonsBlock:"";return Object(k.jsxs)("div",{children:[Object(k.jsxs)("h3",{children:[Object(k.jsx)(g,{title:t.tl.title,changeTitle:function(e){d(function(t,e){return{type:"CHANGE-TODOLIST-NAME",payload:{todolistId:t,title:e}}}(t.tl.id,e))}}),Object(k.jsx)(u.a,{onClick:function(){return d({type:"REMOVE-TODOLIST",payload:{todolistId:t.tl.id}})},children:Object(k.jsx)(L.a,{})})]}),Object(k.jsx)(R,{addItem:s,addLabel:"Task name"}),Object(k.jsx)("div",{className:E.a.AddFormStyle}),Object(k.jsx)("ul",{children:f.map((function(e){return Object(k.jsx)(H,{task:e,todolistID:t.tl.id},e.id)}))}),Object(k.jsx)("div",{children:Object(k.jsxs)(w.a,{className:m,size:"small",color:"primary",children:[Object(k.jsx)(j.a,{className:"all"===t.tl.filter?"active-filter":"",onClick:O,children:"All"}),Object(k.jsx)(j.a,{className:"active"===t.tl.filter?"active-filter":"",onClick:b,children:"Active"}),Object(k.jsx)(j.a,{className:"completed"===t.tl.filter?"active-filter":"",onClick:p,children:"Completed"})]})})]})})),z=function(){var t=Object(I.c)((function(t){return t.todolist}));return Object(k.jsx)(k.Fragment,{children:t.map((function(t){return Object(k.jsx)(f.a,{item:!0,children:Object(k.jsx)(S.a,{elevation:5,style:{padding:"10px"},children:Object(k.jsx)(_,{tl:t})})},t.id)}))})};var V=function(){var t=Object(I.b)();return Object(k.jsxs)("div",{className:"App",children:[Object(k.jsx)(r.a,{position:"static",children:Object(k.jsxs)(d.a,{children:[Object(k.jsx)(u.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(k.jsx)(b.a,{})}),Object(k.jsx)(s.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"News"}),Object(k.jsx)(j.a,{color:"inherit",children:"Login"})]})}),Object(k.jsxs)(p.a,{fixed:!0,children:[Object(k.jsx)(f.a,{container:!0,style:{padding:"10px 10px 30px 10px"},children:Object(k.jsx)(R,{addItem:function(e){var a;t((a=e,{type:"ADD-TODOLIST",payload:{todolistId:Object(y.a)(),title:a}}))},addLabel:"Todolist name"})}),Object(k.jsx)(f.a,{container:!0,spacing:5,children:Object(k.jsx)(z,{})})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=a(65),q=Object(J.a)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(m.a)(Object(m.a)({},t),{},Object(M.a)({},e.payload.todolistID,t[e.payload.todolistID].filter((function(t){return t.id!==e.payload.id}))));case"ADD-TASK":return Object(m.a)(Object(m.a)({},t),{},Object(M.a)({},e.payload.todolistID,[{id:Object(y.a)(),title:e.payload.title,isDone:!1}].concat(Object(h.a)(t[e.payload.todolistID]))));case"ADD-TODOLIST":return Object(m.a)(Object(m.a)({},t),{},Object(M.a)({},e.payload.todolistId,[]));case"REMOVE-TODOLIST":var a=Object(m.a)({},t);return delete a[e.payload.todolistId],a;case"CHANGE-TASK-STATUS":return Object(m.a)(Object(m.a)({},t),{},Object(M.a)({},e.payload.todolistID,t[e.payload.todolistID].map((function(t){return t.id===e.payload.taskId?Object(m.a)(Object(m.a)({},t),{},{isDone:e.payload.isDone}):t}))));case"CHANGE-TASK-NAME":return Object(m.a)(Object(m.a)({},t),{},Object(M.a)({},e.payload.id,t[e.payload.id].map((function(t){return t.id===e.payload.taskID?Object(m.a)(Object(m.a)({},t),{},{title:e.payload.title}):t}))));default:return t}},todolist:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.payload.todolistId}));case"ADD-TODOLIST":return[].concat(Object(h.a)(t),[{id:e.payload.todolistId,title:e.payload.title,filter:"all"}]);case"FILTER-TODOLIST":return t.map((function(t){return t.id===e.payload.todolistId?Object(m.a)(Object(m.a)({},t),{},{filter:e.payload.value}):t}));case"CHANGE-TODOLIST-NAME":return t.map((function(t){return t.id===e.payload.todolistId?Object(m.a)(Object(m.a)({},t),{},{title:e.payload.title}):t}));default:return t}}}),U=Object(J.b)(q);o.a.render(Object(k.jsx)(I.a,{store:U,children:Object(k.jsx)(V,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[99,1,2]]]);
//# sourceMappingURL=main.6e701624.chunk.js.map