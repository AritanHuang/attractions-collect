import{S as d,a as s}from"./bootstrap.min-f808e228.js";const r="https://json-auth-test.onrender.com",l=document.querySelector("#views-content"),u=document.querySelector("#btn-backstage"),e=localStorage.getItem("role"),o=localStorage.getItem("token"),m=document.querySelector("#btn-login-main"),a=document.querySelector("#btn-logout"),h=document.querySelector("#btn-signup-main"),f=document.querySelector("#hide-admin");let c=[],i="";function g(){o!==null&&e==="admin"?(u.classList.remove("d-none"),a.classList.remove("d-none"),m.classList.add("d-none"),h.classList.add("d-none"),b()):(o===null||e!=="admin")&&(f.classList.add("d-none"),d.fire({icon:"error",title:"很抱歉",text:"您沒有後台管理者的權限"}).then(()=>{location.href="index.html"}))}g();function b(){s.get(`${r}/views`).then(function(t){c=t.data,n()}).catch(function(t){console.log(t)});function n(){c.forEach(function(t){i+=`<tr>
        <th scope="row">${t.id}</th>
        <td>${t.name}</td>
        <td>${t.description}</td>
        <td>
            <a data-num="${t.id}" class="btn btn-primary me-1 btn-view-edit" href="admin-edit.html?id=${t.id}">編輯</a>
            <a class="btn btn-danger" href="">刪除</a>
        </td>
    </tr>`}),l.innerHTML=i}}a.addEventListener("click",function(n){localStorage.clear(),location.href="index.html"});
