import{S as n,a as i}from"./bootstrap.min-f808e228.js";const r="https://json-auth-test.onrender.com",a=document.querySelector("#btn-signup"),e=document.querySelector("#signEmail"),t=document.querySelector("#signPassword");let s={};function l(){e.value===""||t.value===""?(n.fire({icon:"error",title:"Oops...",text:"帳號密碼欄位皆為必填"}),e.value="",t.value=""):(s.email=e.value,s.password=t.value,s.role="user",i.post(`${r}/users`,s).then(function(o){n.fire({icon:"success",title:"成功",text:"帳號註冊成功",footer:'<a href="login.html">登入</a>'}),e.value="",t.value=""}).catch(function(o){console.log(o.message)}))}a.addEventListener("click",function(o){l()});
