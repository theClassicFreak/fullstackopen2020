(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{13:function(e,n,t){},15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),o=t.n(u),c=t(2),l=function(e){var n=e.results,t=e.delPerson;return n.map((function(e){return r.a.createElement("p",{key:e.id},e.name,":",e.number," ",r.a.createElement("button",{name:"delete",value:e.id,onClick:t}," Delete "))}))},i=function(e){return r.a.createElement("form",{onSubmit:e.addOrUpdatePerson},r.a.createElement("div",null,r.a.createElement("p",null,"Name : "),r.a.createElement("input",{name:"personName",value:e.newName,onChange:e.handleFormInput})),r.a.createElement("div",null,r.a.createElement("p",null,"Number : "),r.a.createElement("input",{name:"personNumber",value:e.newNumber,onChange:e.handleFormInput})),r.a.createElement("p",null),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"Add")))},m=function(e){return r.a.createElement("div",null,r.a.createElement("p",null,"Filter names with : "),r.a.createElement("input",{name:"search",value:e.searchKey,onChange:e.handleFormInput}))},s=function(e){var n=e.message,t=e.errorClass;return null===n?null:r.a.createElement("div",{className:t},n)},d=t(3),f=t.n(d),b="/api/persons",h=function(){return f.a.get(b).then((function(e){return e.data}))},p=function(e){return f.a.post(b,e).then((function(e){return e.data}))},v=function(e,n){return f.a.put("".concat(b,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return f.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},g=(t(13),function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),d=Object(c.a)(o,2),f=d[0],b=d[1],g=Object(a.useState)(""),w=Object(c.a)(g,2),O=w[0],j=w[1],k=Object(a.useState)(""),N=Object(c.a)(k,2),y=N[0],S=N[1],C=Object(a.useState)(null),T=Object(c.a)(C,2),F=T[0],I=T[1],P=Object(a.useState)("success"),D=Object(c.a)(P,2),A=D[0],J=D[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var K=function(e){switch(e.target.name){case"personName":b(e.target.value);break;case"personNumber":j(e.target.value);break;case"search":S(e.target.value)}},L=function(e){var n=[];return""!==e&&(n=t.reduce((function(n,t){return t.name.toLowerCase().includes(e.toLowerCase())&&n.push(t),n}),[])),n}(y);return r.a.createElement("div",null,r.a.createElement("h2",null," Phonebook "),r.a.createElement(s,{message:F,errorClass:A}),r.a.createElement(m,{searchKey:y,handleFormInput:K}),r.a.createElement("h3",null," Add New "),r.a.createElement(i,{addOrUpdatePerson:function(e){e.preventDefault();var n={};n.name=f,n.number=O;var a=t.find((function(e){return e.name===f})),r=t.find((function(e){return e.number===O}));void 0!==a&&void 0!==r?(I("".concat(a.name,", ").concat(r.number," is already added to phonebook")),J("error"),setTimeout((function(){I(null)}),5e3)):void 0===a&&void 0!==r?(I("".concat(r.number," is already added to phonebook under ").concat(r.name)),J("error"),setTimeout((function(){I(null)}),5e3)):void 0!==a&&void 0===r?window.confirm("".concat(a.name," is already added to phonebook, would you like to update the phone number?"))&&v(a.id,n).then((function(e){u(t.filter((function(e){return e.id!==a.id})).concat(e)),b(""),j(""),I("".concat(a.name," has been updated")),J("success"),setTimeout((function(){I(null)}),5e3)})).catch((function(e){console.log(e),I("could not update ".concat(a.name)),J("failure"),setTimeout((function(){I(null)}),5e3)})):p(n).then((function(e){u(t.concat(e)),b(""),j(""),I(f+" has been added"),J("success"),setTimeout((function(){I(null)}),5e3)}))},newName:f,newNumber:O,handleFormInput:K}),r.a.createElement("h3",null," Numbers "),r.a.createElement(l,{results:L,delPerson:function(e){e.preventDefault();var n=e.target.value,a=t.find((function(e){return e.id.toString()===n}));window.confirm("Delete "+a.name+" ? ")&&E(n).then((function(e){u(t.filter((function(e){return e.id.toString()!==n}))),I("".concat(a.name," has been deleted")),J("success"),setTimeout((function(){I(null)}),5e3)})).catch((function(e){I("".concat(a.name," has already been deleted")),console.log(e),J("failure"),setTimeout((function(){I(null)}),5e3)}))}}))});o.a.render(r.a.createElement(g,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.1b99427c.chunk.js.map