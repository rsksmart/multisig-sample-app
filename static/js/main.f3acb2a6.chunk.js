(this["webpackJsonpmultisig-sample-app"]=this["webpackJsonpmultisig-sample-app"]||[]).push([[0],{122:function(e){e.exports=JSON.parse('{"safeSingletonAddress":"0x23003449AA41D71978bF3e826e52dF2Ad9C72582","proxyFactoryAddress":"0xCd85F5f514e5fa091e40303E902bcaDF57687ebf"}')},123:function(e){e.exports=JSON.parse('{"safeSingletonAddress":"0xffd41b816f2821e579b4da85c7352bf4f17e4fa5","proxyFactoryAddress":"0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a"}')},131:function(e,t,n){},140:function(e,t,n){},141:function(e,t){},163:function(e,t){},168:function(e,t){},173:function(e,t){},174:function(e,t){},194:function(e,t){},196:function(e,t){},208:function(e,t){},210:function(e,t){},234:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n(6),s=n.n(r),a=n(116),l=n.n(a),i=(n(131),n(8)),o=n(60),d=n.n(o),j=(n(140),n.p+"static/media/rif-safe.6d74aa93.svg"),u=n.p+"static/media/powered-by-iov.a0397e40.svg",h=function(e){var t=e.rLogin,n=e.setRLoginResponse,r=e.handleError;return Object(c.jsxs)("section",{className:"login",children:[Object(c.jsx)("img",{src:j,alt:"RIF Safe"}),Object(c.jsx)("h2",{children:"Login with your wallet"}),Object(c.jsx)("p",{children:Object(c.jsx)(o.RLoginButton,{onClick:function(){return t.connect().then((function(e){Promise.all([e.provider.request({method:"eth_accounts"}),e.provider.request({method:"eth_chainId"})]).then((function(t){n(e,t[0][0],parseInt(t[1]))}))})).catch(r)},children:"Connect with rLogin!"})}),Object(c.jsx)("img",{src:u,alt:"Powered by IOV Labs"}),Object(c.jsx)("p",{className:"legal",children:"Copyright \xa9 2021 IOV Labs. All rights reserved."})]})},b=n.p+"static/media/rif-safe-header.ac579ff7.svg",O=function(e){var t=e.walletAddress,n=e.chainId;return Object(c.jsx)("section",{className:"header",children:Object(c.jsxs)("ul",{className:"inline",children:[Object(c.jsx)("li",{children:Object(c.jsx)("img",{src:b,alt:"RIF Safe"})}),t&&Object(c.jsx)("li",{className:"address",children:"".concat(t.slice(0,8),"...").concat(t.slice(t.length-6))}),Object(c.jsx)("li",{className:"chainId",children:Object(c.jsx)("span",{children:n&&function(e){switch(e){case 31:return"RSK Testnet";case 30:return"RSK Mainnet";default:return"Local"}}(n)})})]})})},x=n(33),f=function(e){var t=e.changeActive,n=e.handleLogout,r=e.selected;return Object(c.jsxs)("ul",{className:"navigation",children:[Object(c.jsx)("li",{children:Object(c.jsx)("button",{id:"dashboard",className:"dashboard"===r?"selected":"",onClick:t,children:"Dashboard"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{id:"transactions",className:"transactions"===r?"selected":"",onClick:t,children:"Transactions"})}),Object(c.jsx)("li",{children:Object(c.jsx)("button",{id:"policy",className:"policy"===r?"selected":"",onClick:t,children:"Policies"})}),Object(c.jsx)("li",{className:"logout",children:Object(c.jsx)("button",{onClick:n,children:"Disconnect Wallet"})})]})},p=n(61),v=n(80),g=function(e){var t=e.handleClose,n=e.children;return Object(c.jsx)("div",{className:"modal",children:Object(c.jsxs)("div",{className:"modalBody",children:[Object(c.jsx)("div",{className:"modalHeader",children:t&&Object(c.jsx)("button",{className:"close",onClick:t,children:"x"})}),Object(c.jsx)("div",{className:"modalContent",children:n})]})})},m=function(e){var t=e.address;return Object(c.jsx)("a",{href:"http://explorer.testnet.rsk.co/address/".concat(t.toLowerCase()),target:"_blank",rel:"noreferrer",className:"explorerLink",children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",children:Object(c.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[Object(c.jsx)("path",{d:"M0 0H16V16H0z"}),Object(c.jsx)("path",{className:"icon-color",fillRule:"nonzero",d:"M13 13v-2c0-.552.448-1 1-1s1 .448 1 1v2c0 1.105-.895 2-2 2H3c-1.105 0-2-.895-2-2V3c0-1.105.895-2 2-2h2c.552 0 1 .448 1 1s-.448 1-1 1H3v10h10z"}),Object(c.jsx)("path",{className:"icon-color",d:"M11.586 3H9c-.552 0-1-.448-1-1s.448-1 1-1h5c.276 0 .526.112.707.293.181.18.293.43.293.707v5c0 .552-.448 1-1 1s-1-.448-1-1V4.414l-6.243 6.243c-.39.39-1.023.39-1.414 0-.39-.39-.39-1.024 0-1.414L11.586 3z"})]})})})},C=function(e){var t=e.hash,n=e.handleClose;return Object(c.jsxs)(g,{handleClose:n,children:[Object(c.jsx)("h2",{children:"Transaction Approved"}),Object(c.jsx)("p",{children:"Your signature has been added to this transaction! This is the hash of the transaction:"}),Object(c.jsxs)("p",{children:[Object(c.jsx)("input",{type:"text",defaultValue:t}),Object(c.jsx)(m,{address:t})]}),Object(c.jsx)("p",{children:"Once it has been confirmed on the blockchain, you will see it under approvals."}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:n,children:"Close modal"})})]})},w=function(e){var t=e.handleClose,n=e.hash;return Object(c.jsxs)(g,{handleClose:t,children:[Object(c.jsx)("h2",{children:"Transaction executed"}),Object(c.jsx)("p",{children:"This is the hash of the transaction:"}),Object(c.jsxs)("p",{children:[Object(c.jsx)("input",{type:"text",defaultValue:n}),Object(c.jsx)(m,{address:n})]}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:t,children:"Close modal"})})]})},S=function(e){var t=e.value,n=Object(r.useRef)(null);return Object(c.jsxs)("span",{className:"copyButton",children:[Object(c.jsx)("button",{type:"button",className:"icon",onClick:function(){n.current&&n.current.select(),document.execCommand("copy")},children:Object(c.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16",children:Object(c.jsxs)("g",{fill:"none",fillRule:"evenodd",children:[Object(c.jsx)("path",{d:"M0 0H16V16H0z"}),Object(c.jsx)("path",{className:"icon-color",fillRule:"nonzero",d:"M10 10h3V3H8v1c1.105 0 2 .895 2 2v4zM6 4V3c0-1.105.895-2 2-2h5c1.105 0 2 .895 2 2v7c0 1.105-.895 2-2 2h-3v1c0 1.105-.895 2-2 2H3c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2h3zM3 6v7h5V6H3z"})]})})}),Object(c.jsx)("input",{type:"text",className:"copyText",defaultValue:t,ref:n,style:{position:"absolute",left:"-10000px"}})]})},N=function(e){var t=e.value;return Object(c.jsxs)(c.Fragment,{children:[t,Object(c.jsx)(S,{value:t}),Object(c.jsx)(m,{address:t})]})},A=function(e){var t=e.safe,n=e.transaction,s=e.walletAddress,a=e.handleError,l=e.approveTransactionHash,o=e.executeTransaction,d=Object(r.useState)(!1),j=Object(i.a)(d,2),u=j[0],h=j[1],b=Object(r.useState)(""),O=Object(i.a)(b,2),x=O[0],f=O[1],p=Object(r.useState)([]),v=Object(i.a)(p,2),g=v[0],m=v[1],C=Object(r.useState)(0),w=Object(i.a)(C,2),S=w[0],A=w[1];Object(r.useEffect)((function(){t.getTransactionHash(n).then((function(e){f(e),y(e)})),t.getThreshold().then((function(e){return A(e)}))}),[n]);var y=function(e){return t.getOwnersWhoApprovedTx(e).then((function(e){return m(e)})).catch(a)};return Object(c.jsxs)("div",{className:"transaction",children:[Object(c.jsxs)("div",{className:"summary",children:[Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"to: "}),Object(c.jsx)(N,{value:n.data.to})]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"value: "}),n.data.value]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("strong",{children:"approvals: "}),g.length," out of ",S,Object(c.jsx)("button",{onClick:function(){return y(x)},children:"refresh"})]})]}),Object(c.jsxs)("div",{className:"buttons",children:[Object(c.jsxs)("button",{onClick:function(){return h(!u)},children:[u?"hide ":"show ","details"]}),Object(c.jsx)("button",{disabled:1===g.filter((function(e){return e===s})).length,onClick:function(){return l(n)},children:"approve"}),Object(c.jsx)("button",{disabled:S>g.length,onClick:function(){return o(n)},children:"execute"})]}),u&&Object(c.jsxs)("table",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Transaction Hash"}),Object(c.jsx)("td",{children:Object(c.jsx)(N,{value:x})})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Nonce"}),Object(c.jsx)("td",{children:Object(c.jsx)("p",{children:n.data.nonce})})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Data"}),Object(c.jsx)("td",{children:Object(c.jsx)("p",{className:"data",children:n.data.data})})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Approvals:"}),Object(c.jsx)("td",{children:0===g.length?Object(c.jsx)("p",{children:Object(c.jsx)("em",{children:"No signatures"})}):Object(c.jsx)("ol",{children:g.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(N,{value:e})},e)}))})})]})]})]})},y=function(e){var t=e.safe,n=e.handleError,s=e.addTransaction,a=e.walletAddress,l=e.transactions,o=Object(r.useState)({to:"0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a",value:"10000",nonce:"1"}),d=Object(i.a)(o,2),j=d[0],u=d[1],h=Object(r.useState)(null),b=Object(i.a)(h,2),O=b[0],x=b[1],f=Object(r.useState)(null),g=Object(i.a)(f,2),m=g[0],S=g[1],N=function(e){return u(Object(v.a)(Object(v.a)({},j),{},Object(p.a)({},e.currentTarget.id,e.currentTarget.value)))},y=function(e){return t.getTransactionHash(e).then((function(e){return t.approveTransactionHash(e).then((function(e){return x(e.hash)})).catch(n)}))},T=function(e){return t.executeTransaction(e).then((function(e){S(e.hash)})).catch(n)};return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)("section",{className:"panel",children:[Object(c.jsx)("h3",{children:"Pending Transactions"}),l.map((function(e,r){return Object(c.jsx)(A,{safe:t,transaction:e,handleError:n,approveTransactionHash:y,executeTransaction:T,walletAddress:a},r)}))]}),Object(c.jsxs)("section",{className:"panel",children:[Object(c.jsx)("h3",{children:"Create Transaction"}),Object(c.jsxs)("p",{children:[Object(c.jsx)("label",{children:"Recepient:"}),Object(c.jsx)("input",{type:"text",id:"to",value:j.to,onChange:N})]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("label",{children:"Value:"}),Object(c.jsx)("input",{type:"number",id:"value",value:j.value,onChange:N})]}),Object(c.jsxs)("p",{children:[Object(c.jsx)("label",{children:"Nonce:"}),Object(c.jsx)("input",{type:"number",id:"nonce",value:j.nonce,onChange:N})]}),Object(c.jsx)("button",{onClick:function(){return t.createTransaction({to:j.to.toLowerCase(),value:j.value,nonce:parseInt(j.nonce),data:"0x"}).then((function(e){return s(e)})).catch(n)},children:"Create Transaction"})]}),O&&Object(c.jsx)(C,{hash:O,handleClose:function(){return x(null)}}),m&&Object(c.jsx)(w,{hash:m,handleClose:function(){return S(null)}})]})},T=function(e){var t=e.safe,n=Object(r.useState)(0),s=Object(i.a)(n,2),a=s[0],l=s[1];return Object(r.useEffect)((function(){t.getBalance().then((function(e){return l(e)}))}),[t]),Object(c.jsxs)("section",{className:"panel",children:[Object(c.jsx)("h3",{children:"Safe Dashboard"}),Object(c.jsx)("table",{children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Safe Address"}),Object(c.jsx)("td",{children:Object(c.jsx)(N,{value:t.getAddress()})})]}),Object(c.jsxs)("tr",{className:"text",children:[Object(c.jsx)("th",{children:"Balance"}),Object(c.jsx)("td",{children:(a/1e18).toString()})]})]})})]})},k=function(e){for(var t=e.value,n=e.onChange,r=e.numberOfOwners,s=[],a=1;a<=r;a++)s.push(a);return Object(c.jsx)("select",{value:t,onChange:function(e){return n(parseInt(e.target.value))},children:s.map((function(e){return Object(c.jsx)("option",{value:e,children:e},e)}))})},E=function(e){for(var t=e.numberOfOwners,n=e.currentThreshold,s=e.handleSubmit,a=Object(r.useState)(n),l=Object(i.a)(a,2),o=l[0],d=l[1],j=[],u=1;u<=t;u++)j.push(u);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:"Change threshold"}),Object(c.jsx)("p",{children:"Change the number of approvers for a transaction to be executed"}),Object(c.jsx)("label",{children:"New threshold:"}),Object(c.jsx)(k,{numberOfOwners:t,value:o,onChange:function(e){return d(e)}}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:function(){return s(o)},children:"Change threshold"})})]})},L=n(7),H=function(e){var t=e.handleSubmit,n=e.handleError,s=e.numberOfOwners,a=Object(r.useState)(""),l=Object(i.a)(a,2),o=l[0],d=l[1],j=Object(r.useState)(s),u=Object(i.a)(j,2),h=u[0],b=u[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:"Add new owner"}),Object(c.jsx)("label",{children:"Address"}),Object(c.jsx)("input",{type:"text",className:"newOwner",value:o,onChange:function(e){return d(e.target.value)}}),Object(c.jsx)("label",{children:"New Threshold"}),Object(c.jsx)(k,{numberOfOwners:s+1,value:h,onChange:function(e){return b(e)}}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:function(){Object(L.e)(o.toLowerCase())?t(o.toLowerCase(),h):n(new Error("Value is not an address."))},children:"Update"})})]})},R=function(e){var t=e.numberOfOwners,n=e.handleSubmit,s=e.removeAddress,a=Object(r.useState)(t-1),l=Object(i.a)(a,2),o=l[0],d=l[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:"Are you sure"}),Object(c.jsx)("p",{children:"Are you sure you want to remove this owner?"}),Object(c.jsx)("input",{type:"text",defaultValue:s}),Object(c.jsxs)("p",{children:[Object(c.jsx)("label",{children:"New threshold:"}),Object(c.jsx)(k,{numberOfOwners:t-1,value:o,onChange:function(e){return d(e)}})]}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:function(){return n(s.toLowerCase(),o)},children:"Remove"})})]})},V=function(e){var t=e.oldAddress,n=e.handleError,s=e.handleSubmit,a=Object(r.useState)(""),l=Object(i.a)(a,2),o=l[0],d=l[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Swap Address"}),Object(c.jsx)("p",{children:"Swap address for a new one."}),Object(c.jsx)("label",{children:"Old Address:"}),Object(c.jsx)("input",{type:"text",defaultValue:t}),Object(c.jsx)("label",{children:"New Owner"}),Object(c.jsx)("input",{type:"text",className:"newAddress",value:o,onChange:function(e){return d(e.target.value)}}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:function(){return Object(L.e)(o)?s(t,o.toLowerCase()):n(new Error("Address is not valid"))},children:"Swap Address"})})]})},F=function(e){var t=e.safe,n=e.addTransaction,s=e.handleError,a=Object(r.useState)([]),l=Object(i.a)(a,2),o=l[0],d=l[1],j=Object(r.useState)(0),u=Object(i.a)(j,2),h=u[0],b=u[1],O=Object(r.useState)(!1),x=Object(i.a)(O,2),f=x[0],p=x[1],v=Object(r.useState)(!1),m=Object(i.a)(v,2),C=m[0],w=m[1],S=Object(r.useState)(null),A=Object(i.a)(S,2),y=A[0],T=A[1],k=Object(r.useState)(null),L=Object(i.a)(k,2),F=L[0],I=L[1],P=Object(r.useState)(!1),D=Object(i.a)(P,2),z=D[0],B=D[1];Object(r.useEffect)((function(){t.getOwners().then((function(e){return d(e)})),t.getThreshold().then((function(e){return b(e)}))}),[t]);var M=function(){p(!1),w(!1),T(null),I(null),B(!0)};return Object(c.jsxs)("section",{className:"section panel",children:[Object(c.jsx)("h2",{children:"Safe Policy"}),Object(c.jsx)("table",{children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Owners"}),Object(c.jsxs)("td",{children:[Object(c.jsx)("ul",{children:o.map((function(e){return Object(c.jsxs)("li",{children:[Object(c.jsx)(N,{value:e}),Object(c.jsx)("button",{onClick:function(){return T(e)},children:"delete"}),Object(c.jsx)("button",{onClick:function(){return I(e)},children:"swap"})]},e)}))}),Object(c.jsx)("button",{onClick:function(){return p(!0)},children:"Add Owner"})]})]}),Object(c.jsxs)("tr",{className:"text",children:[Object(c.jsx)("th",{children:"Threshold"}),Object(c.jsxs)("td",{children:[h,Object(c.jsx)("button",{onClick:function(){return w(!0)},children:"Change"})]})]})]})}),C&&Object(c.jsx)(g,{handleClose:function(){return w(!1)},children:Object(c.jsx)(E,{numberOfOwners:o.length,currentThreshold:h,handleSubmit:function(e){return t.getChangeThresholdTx(e).then((function(e){n(e),M()})).catch(s)}})}),f&&Object(c.jsx)(g,{handleClose:function(){return p(!1)},children:Object(c.jsx)(H,{numberOfOwners:o.length,handleSubmit:function(e,c){return t.getAddOwnerTx(e,c).then((function(e){n(e),M()})).catch(s)},handleError:s})}),y&&Object(c.jsx)(g,{handleClose:function(){return T(null)},children:Object(c.jsx)(R,{removeAddress:y,numberOfOwners:o.length,handleSubmit:function(e,c){return t.getRemoveOwnerTx(e,c).then((function(e){n(e),M()})).catch(s)}})}),F&&Object(c.jsx)(g,{handleClose:function(){return I(null)},children:Object(c.jsx)(V,{oldAddress:F,handleSubmit:function(e,c){return t.getSwapOwnerTx(e,c).then((function(e){n(e),M()})).catch(s)},handleError:s})}),z&&Object(c.jsxs)(g,{handleClose:function(){return B(!1)},children:[Object(c.jsx)("h2",{children:"Transaction Created"}),Object(c.jsx)("p",{children:"A transaction has been created and added to the transaction panel. You can sign the transaction there, and when enough signatures are collected, execute it."}),Object(c.jsx)("p",{children:Object(c.jsx)("button",{onClick:function(){return B(!1)},children:"Close"})})]})]})},I=function(e){var t=e.safe,n=e.walletAddress,s=e.handleError,a=e.handleLogout,l=Object(r.useState)("dashboard"),o=Object(i.a)(l,2),d=o[0],j=o[1],u=Object(r.useState)([]),h=Object(i.a)(u,2),b=h[0],O=h[1],p=function(e){return O([].concat(Object(x.a)(b),[e]))};return Object(c.jsxs)("section",{className:"selectedSafe",children:[Object(c.jsx)(f,{handleLogout:a,changeActive:function(e){return j(e.currentTarget.id)},selected:d}),"dashboard"===d&&Object(c.jsx)(T,{safe:t}),"transactions"===d&&Object(c.jsx)(y,{transactions:b,addTransaction:p,safe:t,handleError:s,walletAddress:n}),"policy"===d&&Object(c.jsx)(F,{safe:t,addTransaction:p,handleError:s})]})},P=n(118),D=n.n(P),z=n(121),B=n(38),M=function(e){var t=e.connectAddress,n=e.createSafe,s=e.handleError,a=Object(r.useState)([t?t.toLowerCase():""]),l=Object(i.a)(a,2),o=l[0],d=l[1],j=Object(r.useState)(1),u=Object(i.a)(j,2),h=u[0],b=u[1],O=function(e){var t=parseInt(e.target.id.replace("address","")),n=o.map((function(n,c){return c===t?e.target.value.toLowerCase():n}));d(n)};return Object(c.jsxs)("div",{children:[Object(c.jsx)("h4",{children:"Create a new safe"}),Object(c.jsxs)("p",{children:["A safe can have any number of owners associated with it. Your connected address has been added as the first account.",Object(c.jsx)("br",{}),"Click the ",Object(c.jsx)("em",{children:"Add address"})," button to add additional addresses, and the ",Object(c.jsx)("em",{children:"delete button"})," to remove addresses."]}),Object(c.jsx)("ul",{children:o.map((function(e,t){return Object(c.jsxs)("li",{children:[Object(c.jsxs)("label",{children:["Address ",t+1,": "]}),Object(c.jsx)("input",{type:"text",id:"address".concat(t),value:e,onChange:O,className:"address".concat(t)}),Object(c.jsx)("button",{className:"removeAddress".concat(t),onClick:function(){return function(e){var t=o.filter((function(t,n){return n!==e}));d(t)}(t)},children:"delete"})]},t)}))}),Object(c.jsx)("button",{className:"addAddress",onClick:function(){return d([].concat(Object(x.a)(o),[""]))},children:"Add address"}),Object(c.jsxs)("p",{children:["Transactions require the confirmation of at least",Object(c.jsx)("select",{className:"threshold",value:h.toString(),onChange:function(e){return b(parseInt(e.target.value))},children:function(e){for(var t=[],n=0;n<e;n++)t.push(Object(c.jsx)("option",{value:n+1,children:n+1},n));return t}(o.length)}),"signatures."]}),Object(c.jsx)("button",{className:"submit",disabled:0===o.length,onClick:function(){var e=[];if(o.forEach((function(t,n){Object(L.e)(t)||e.push(n+1)})),0!==e.length)return s(new Error("Incorrect Addresses for: ".concat(e.toString()))),!1;n(o,h)},children:"Create Safe"})]})},J=function(e){var t=e.connectToSafe,n=Object(r.useState)("0x3820D3b1382622732dfeb675640dbEd12C12DDEE".toLowerCase()),s=Object(i.a)(n,2),a=s[0],l=s[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)("h3",{children:"Connect to an existing safe"}),Object(c.jsx)("label",{children:"Safe address"}),Object(c.jsx)("input",{className:"safeAddress",type:"text",value:a,onChange:function(e){return l(e.target.value)}}),Object(c.jsx)("button",{className:"connect",onClick:function(){return t(a)},children:"Connect"})]})},W=n(122),q=n(123),Y=function(e){var t=e.web3Provider,n=e.handleSetSafe,s=e.handleError,a=e.address,l=Object(r.useState)(!1),o=Object(i.a)(l,2),d=o[0],j=o[1],u=Object(r.useState)(!1),h=Object(i.a)(u,2),b=h[0],O=h[1];return b?Object(c.jsx)("div",{style:{textAlign:"center"},children:"Loading..."}):Object(c.jsxs)("section",{className:"connect panel",children:[Object(c.jsxs)("h2",{children:["Create a safe, or connect to an existing one",Object(c.jsx)("button",{onClick:function(){return j(!d)},children:d?"Connect to Safe":"Create Safe"})]}),d?Object(c.jsx)(M,{createSafe:function(e,c){O(!0);var r=function(e){switch(e){case 31:return W;default:return q}}(1337),a=new B.ethers.providers.Web3Provider(t).getSigner();new z.EthersSafeFactory(a,r.proxyFactoryAddress.toLowerCase(),r.safeSingletonAddress.toLowerCase()).createSafe({owners:e,threshold:c}).then(n).catch(s).finally((function(){return O(!1)}))},handleError:s,connectAddress:a}):Object(c.jsx)(J,{connectToSafe:function(e){O(!0);var c=new B.ethers.providers.Web3Provider(t).getSigner();D.a.create(B.ethers,e.toLowerCase(),c).then((function(e){return n(e)})).catch(s).finally((function(){return O(!1)}))}})]})},_=new d.a({cacheProvider:!1,supportedChains:[31,1337]});var K=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],s=t[1],a=Object(r.useState)(null),l=Object(i.a)(a,2),o=l[0],d=l[1],j=Object(r.useState)(null),u=Object(i.a)(j,2),b=u[0],x=u[1],f=Object(r.useState)(null),p=Object(i.a)(f,2),v=p[0],g=p[1],m=Object(r.useState)(null),C=Object(i.a)(m,2),w=C[0],S=C[1],N=function(e){return s(e.message)},A=function(){return s(null)};return Object(c.jsxs)("div",{className:o?"App":"App signin",children:[o?Object(c.jsx)(O,{chainId:w,walletAddress:v}):Object(c.jsx)(h,{rLogin:_,setRLoginResponse:function(e,t,n){d(e),g(t),S(n),e.provider.on("accountsChanged",(function(e){return g(e[0])}))},handleError:N}),n&&Object(c.jsxs)("section",{className:"error",children:[Object(c.jsx)("p",{children:n}),Object(c.jsx)("button",{onClick:A,children:"x"})]}),o&&!b&&Object(c.jsx)(Y,{web3Provider:o.provider,handleSetSafe:function(e){x(e),A()},handleError:N,address:v}),v&&b&&Object(c.jsx)(I,{safe:b,walletAddress:v,handleLogout:function(){null===o||void 0===o||o.disconnect(),d(null),x(null),s(null),g(null),S(null)},handleError:N})]})},U=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,236)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),s(e),a(e)}))};l.a.render(Object(c.jsx)(s.a.StrictMode,{children:Object(c.jsx)(K,{})}),document.getElementById("root")),U()}},[[234,1,2]]]);
//# sourceMappingURL=main.f3acb2a6.chunk.js.map