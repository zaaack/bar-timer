(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{137:function(e,t,a){},140:function(e,t,a){},222:function(e,t,a){"use strict";a.r(t);var n,c=a(1),r=a.n(c),i=a(7),s=a.n(i),l=(a(137),a(138),a(139),a(140),a(117)),o=a(8),u=a(55),d=a(57),j=a(16),m=a.n(j),f=a(9),b=a(29),h=a(130),p=a(132),O=(a(141),a(3)),x=c.forwardRef((function(e,t){e.control;var n=e.displayMode,r=(e.error,e.help,e.maxLength),i=e.name,s=e.onChange,l=e.required,o=e.showHeader,u=void 0!==o&&o,d=e.type,j=void 0===d?"datetime":d,m=e.value,b=e.id,h=void 0===b?i:b,x=e.bulmaCalendarOptions,v=Object(p.a)(e,["control","displayMode","error","help","maxLength","name","onChange","required","showHeader","type","value","id","bulmaCalendarOptions"]),y=c.useRef(),g=c.useRef();return c.useImperativeHandle(t,(function(){return y.current})),c.useEffect((function(){var e=a(143);g.current=new e(y.current,Object(f.a)({showHeader:u,type:j,displayMode:n,validateLabel:"\u786e\u5b9a",cancelLabel:"\u53d6\u6d88",clearLabel:"\u6e05\u9664",todayLabel:"\u4eca\u5929",nowLabel:"\u73b0\u5728",minuteSteps:1},x))}),[n,u,j]),c.useEffect((function(){var e=g.current;return e.on("select",(function(){s({target:y.current},"time"===j?e.startTime:e.startDate)})),function(){g.current.removeListeners("select")}}),[s]),Object(O.jsx)("input",Object(f.a)(Object(f.a)({},v),{},{ref:y,defaultValue:m,id:h,maxLength:r,name:i,required:l}))})),v=a(79),y=a(93),g=a(129),N=Object(v.createTRPCClient)({url:"/api/trpc",transformer:g.a}),w=Object(v.createReactQueryHooks)({client:N,queryClient:new y.a});!function(e){e.once="once",e.repeat="repeat"}(n||(n={}));var k=6e4,C=36e5,M=("undefined"===typeof window?new URL("https://localhost"):new URL(location.href)).searchParams.get("id")||"",L=a(128),Q=a(22),D=a.n(Q);function S(){var e,t=Object(o.f)();window.h=t;var a=new URLSearchParams(t.location.search.slice(1)).get("id");console.log("locId",a,t.location.search);var r=w.useQuery(["alarms.all"],{staleTime:3e3}),i=Object(c.useState)(a&&(null===(e=r.data)||void 0===e?void 0:e.find((function(e){return e.id===a})))||{type:"repeat",ahead:0,title:"",notify:!0,alert:!1,duration:0,disabled:!1}),s=Object(h.a)(i,2),l=s[0],u=s[1],j=w.useMutation("alarms.edit",{onMutate:function(e){return Object(b.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.cancelQuery(["alarms.all"]);case 2:w.setQueryData(["alarms.all"],r.data.map((function(t){return t.id===e.id?Object(f.a)(Object(f.a)({},t),e):t})));case 3:case"end":return t.stop()}}),t)})))()},onSettled:function(){w.invalidateQuery(["alarms.all"])}}),p=w.useMutation("alarms.add",{onMutate:function(e){return Object(b.a)(m.a.mark((function e(){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.cancelQuery(["alarms.all"]);case 2:case"end":return e.stop()}}),e)})))()},onSettled:function(){w.invalidateQuery(["alarms.all"])}});function v(e,t){u(Object(f.a)(Object(f.a)({},l),{},Object(d.a)({},e,t)))}return Object(O.jsxs)("div",{className:"form",children:[Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u6807\u9898:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("input",{className:"input",type:"text",placeholder:l.title,onChange:function(e){return v("title",e.target.value)}})})]}),Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u7c7b\u578b:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("div",{className:"select",children:Object(O.jsxs)("select",{defaultValue:l.type,onChange:function(e){v("type",e.target.value)},children:[Object(O.jsx)("option",{value:n.repeat,children:"\u5faa\u73af"}),Object(O.jsx)("option",{value:n.once,children:"\u5b9a\u65f6"})]})})})]}),l.type===n.once&&Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u5b9a\u65f6:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)(x,{className:"input",type:"time",value:new Date(l.duration+16*C),onChange:function(e,t){var a=new Date(0);a.setHours(t.getHours()+a.getHours()),a.setMinutes(t.getMinutes()+a.getMinutes()),v("timeout",Date.now()+a.getTime())}})})]}),l.type===n.repeat&&Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u5faa\u73af:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)(L.a,{showSecond:!1,defaultValue:D()(l.duration+16*C),className:"xxx",onChange:function(e){v("duration",e.hours()*C+e.minutes()*k)}})})]}),Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u63d0\u524d:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("input",{type:"number",min:0,max:1440,defaultValue:l.ahead,onChange:function(e){v("ahead",Number(e.target.value)||0)}})})]}),Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u901a\u77e5:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("input",{type:"checkbox",defaultChecked:l.notify,onChange:function(e){v("notify",e.target.checked)}})})]}),Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("label",{className:"label",children:"\u5f39\u7a97:"}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("input",{type:"checkbox",defaultChecked:l.alert,onChange:function(e){v("alert",e.target.checked)}})})]}),Object(O.jsxs)("div",{className:"field is-grouped",children:[Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("button",{onClick:function(e){!function(e){"id"in e&&e.id?j.mutate(e):(e.uid=M,p.mutate(e))}(l),console.log("history",t),t.goBack()},className:"button is-primary is-link",children:"\u4fdd\u5b58"})}),Object(O.jsx)("div",{className:"control",children:Object(O.jsx)("button",{onClick:function(e){t.push("/")},className:"button is-link is-light",children:"\u53d6\u6d88"})})]})]})}var T=a(83),H=a.n(T),R=a(124),q=a(131),I=a(125),P=a(126),E=a(127),U=function(){function e(t,a){Object(P.a)(this,e),this.alarms=t,this.save=a,this.timers=new Map,this.updateTimers(),window.alarmManager=this,"granted"!==Notification.permission&&Notification.requestPermission()}return Object(E.a)(e,[{key:"notify",value:function(e){var t="".concat(e.title," | \u6574\u70b9\u62a5\u65f6");e.notify&&new Notification(t,{body:(new Date).toLocaleString(),vibrate:1,requireInteraction:!0}),e.alert&&alert(t),console.log("notify",(new Date).toLocaleString(),e)}},{key:"clearTimers",value:function(e){var t=this.timers.get(e.id)||{current:0};t.current&&(clearTimeout(t.current),clearInterval(t.current)),this.timers.delete(e.id)}},{key:"updateTimers",value:function(){var e,t=this,a=Object(I.a)(this.alarms);try{var c=function(){var a=e.value;if(a.disabled||a.done)return t.clearTimers(a),"continue";var c=t.timers.get(a.id);if(!c){c={current:0},console.log("updateTimers",a);var r=Date.now();if(a.type===n.once)c.current=setTimeout((function(){t.notify(a),t.save(Object(f.a)(Object(f.a)({},a),{},{done:!0}))}),a.timeout-(r+a.ahead*k));else if(a.type===n.repeat){!function e(){var n=a.duration-(Date.now()+a.ahead*k)%a.duration;c.current=setTimeout((function(){t.notify(a),e()}),n),console.log("next repeat ".concat(a.title),new Date(Date.now()+n).toLocaleString(),a)}()}t.timers.set(a.id,c)}};for(a.s();!(e=a.n()).done;)c()}catch(r){a.e(r)}finally{a.f()}}}]),e}();function V(){var e,t=Object(o.f)(),a=w.useQuery(["alarms.all",M],{staleTime:3e3}),n=w.useMutation("alarms.sortAll",{onMutate:function(e){return Object(b.a)(m.a.mark((function t(){var n,c;return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.cancelQuery(["alarms.all"]);case 2:c=new Map(null===(n=a.data)||void 0===n?void 0:n.map((function(e){return[e.id,e]}))),w.setQueryData(["alarms.all"],e.map((function(e){return c.get(e)})).filter(Boolean));case 4:case"end":return t.stop()}}),t)})))()},onSettled:function(){w.invalidateQuery(["alarms.all"])}}),r=function(){var e=Object(b.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.mutate(t.map((function(e){return e.id})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),i=w.useMutation("alarms.delete",{onMutate:function(e){return Object(b.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.cancelQuery(["alarms.all"]);case 2:w.setQueryData(["alarms.all"],a.data.filter((function(t){return t.id!=e})));case 3:case"end":return t.stop()}}),t)})))()},onSettled:function(){w.invalidateQuery(["alarms.all"])}}),s=w.useMutation("alarms.edit",{onMutate:function(e){return Object(b.a)(m.a.mark((function t(){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,w.cancelQuery(["alarms.all"]);case 2:w.setQueryData(["alarms.all"],a.data.map((function(t){return t.id===e.id?Object(f.a)(Object(f.a)({},t),e):t})));case 3:case"end":return t.stop()}}),t)})))()},onSettled:function(){w.invalidateQuery(["alarms.all"])}});return Object(c.useEffect)((function(){a.data&&new U(a.data,(function(e){s.mutate(e)}))}),[a.data]),Object(O.jsxs)("nav",{className:"panel",children:[Object(O.jsxs)("p",{className:"panel-heading",children:[Object(O.jsx)("span",{style:{flex:1},children:"\u6574\u70b9\u62a5\u65f6"}),Object(O.jsx)("button",{className:"button is-link is-small",style:{marginRight:10},title:"\u4fdd\u5b58\u6c38\u4e45\u94fe\u63a5",onClick:function(e){var t=new URL(location.href);t.searchParams.append("id",Object(q.a)()),location.href=t.toString()},children:Object(O.jsx)("i",{className:"fas fa-external-link-alt","aria-hidden":"true"})}),Object(O.jsx)("button",{className:"button is-primary is-small",title:"\u6dfb\u52a0\u65b0\u7684\u63d0\u9192",onClick:function(e){t.push("/form")},children:Object(O.jsx)("i",{className:"fas fa-plus","aria-hidden":"true"})})]}),Object(O.jsx)(R.ReactSortable,{list:a.data||[],setList:r,children:null===(e=a.data)||void 0===e?void 0:e.map((function(e){return Object(O.jsxs)("a",{className:"panel-block",children:[Object(O.jsx)("span",{className:"panel-icon",children:Object(O.jsx)("i",{className:"fas fa-".concat("once"===e.type?"hourglass-half":"sync"),"aria-hidden":"true"})}),Object(O.jsxs)("span",{className:"ca-title",children:[e.title,Object(O.jsx)("div",{className:"ca-subtitle",children:"once"===e.type?H()(Number(e.timeout)).format("YYYY/MM/DD HH:mm"):H()(Number(e.duration)).add(-8,"h").format("HH:mm")})]}),Object(O.jsx)("i",{className:"fas fa-times remove-btn","aria-hidden":"true",onClick:function(t){confirm("\u786e\u5b9a\u8981\u5220\u9664\u300c".concat(e.title,"\u300d\u5417?"))&&i.mutate(e.id)}}),Object(O.jsx)("i",{className:"fas fa-cog config-btn","aria-hidden":"true",onClick:function(a){t.push("/form?id=".concat(e.id))}}),Object(O.jsxs)("div",{className:"field",children:[Object(O.jsx)("input",{id:e.id,type:"checkbox",className:"switch",defaultChecked:!e.disabled,onChange:function(t){s.mutate(Object(f.a)(Object(f.a)({},e),{},{disabled:!t.target.checked}))}}),Object(O.jsx)("label",{htmlFor:e.id})]})]},e.id)}))})]})}var Y=a(227),B=a(17);function J(){Object(o.g)();return Object(O.jsx)(Y.a,{children:Object(O.jsxs)(o.c,{children:[Object(O.jsx)(o.a,{path:"/form",children:Object(O.jsx)(S,{})}),Object(O.jsx)(o.a,{path:"/",children:Object(O.jsx)(V,{})})]})})}function A(){return Object(O.jsx)("div",{className:Object(l.a)("root","container"),children:Object(O.jsx)(B.a,{client:w.queryClient,children:Object(O.jsx)(u.a,{children:Object(O.jsx)(J,{})})})})}var F=function(e){0};s.a.render(Object(O.jsx)(r.a.StrictMode,{children:Object(O.jsx)(A,{})}),document.getElementById("root")),F(console.log)}},[[222,1,2]]]);
//# sourceMappingURL=main.c8435abf.chunk.js.map