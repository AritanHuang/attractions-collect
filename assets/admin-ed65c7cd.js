import{a as s}from"./bootstrap.min-f808e228.js";const r="https://json-auth-test.onrender.com",d=document.querySelector("#views-content"),l=document.querySelector("#btn-backstage"),e=localStorage.getItem("role"),o=localStorage.getItem("token"),u=document.querySelector("#btn-login-main"),i=document.querySelector("#btn-logout"),m=document.querySelector("#btn-signup-main");let a=[],c="";function g(){o!==null&&e==="admin"?(l.classList.remove("d-none"),i.classList.remove("d-none"),u.classList.add("d-none"),m.classList.add("d-none")):(o===null||e!=="admin")&&(alert("很抱歉，您沒有後台管理者的權限"),location.href="index.html")}g();function f(){s.get(`${r}/views`).then(function(t){a=t.data,n()}).catch(function(t){console.log(t)});function n(){a.forEach(function(t){c+=`<tr>
        <th scope="row">${t.id}</th>
        <td>${t.name}</td>
        <td>${t.description}</td>
        <td>
            <a data-num="${t.id}" class="btn btn-primary me-1 btn-view-edit" href="admin-edit.html?id=${t.id}">編輯</a>
            <a class="btn btn-danger" href="">刪除</a>
        </td>
    </tr>`}),d.innerHTML=c}}f();i.addEventListener("click",function(n){localStorage.clear(),location.href="index.html"});
