import{a as l,S as g}from"./bootstrap.min-f808e228.js";const r="https://json-auth-test.onrender.com";let u=location.href.split("=")[1];const f=document.querySelector("#btn-backstage"),p=localStorage.getItem("role"),b=document.querySelector("#btn-login-main"),d=document.querySelector("#btn-logout"),h=document.querySelector("#btn-signup-main");p==="admin"&&(f.classList.remove("d-none"),d.classList.remove("d-none"),b.classList.add("d-none"),h.classList.add("d-none"));const o=document.querySelector("#view-name"),a=document.querySelector("#view-description"),S=document.querySelector("#btn-edit");l.get(`${r}/views/${u}`).then(function(t){const n=t.data;o.value=n.name,a.value=n.description;let i=n.name,s=n.description;S.addEventListener("click",m);function m(e){e.preventDefault(),(o.value!==i||a.value!==s)&&v()}function v(){const e={};e.name=o.value,e.description=a.value,l.put(`${r}/views/${u}`,e).then(function(c){g.fire({icon:"success",title:"成功",text:`成功修改${c.data.name}`,footer:'<a href="admin.html">回後台管理</a>'}),i=o.value,s=a.value}).catch(function(c){console.log(c)})}}).catch(function(t){console.log(t.message)});d.addEventListener("click",function(t){localStorage.clear(),location.href="index.html"});
