import{a,S as s}from"./bootstrap.min-f808e228.js";const d="https://json-auth-test.onrender.com",r=document.querySelector("#views-content"),m=document.querySelector("#btn-backstage"),o=localStorage.getItem("role"),c=localStorage.getItem("token"),f=document.querySelector("#btn-login-main"),l=document.querySelector("#btn-logout"),g=document.querySelector("#btn-signup-main"),h=document.querySelector("#hide-admin");let i=[];function b(){c!==null&&o==="admin"?(m.classList.remove("d-none"),l.classList.remove("d-none"),f.classList.add("d-none"),g.classList.add("d-none"),u()):(c===null||o!=="admin")&&(h.classList.add("d-none"),s.fire({icon:"error",title:"很抱歉",text:"您沒有後台管理者的權限"}).then(()=>{location.href="index.html"}))}b();function u(){let e="";a.get(`${d}/views`).then(function(t){i=t.data,n()}).catch(function(t){console.log(t)});function n(){i.forEach(function(t){e+=`<tr>
        <th scope="row">${t.id}</th>
        <td>${t.name}</td>
        <td>${t.description}</td>
        <td>
            <a data-num="${t.id}" class="btn btn-primary me-1 btn-view-edit" href="admin-edit.html?id=${t.id}">編輯</a>
            <a data-num="${t.id}" class="btn btn-danger btn-delete" href="">刪除</a>
        </td>
    </tr>`}),r.innerHTML=e}}r.addEventListener("click",function(e){if(e.target.classList.contains("btn-delete")){e.preventDefault();const n=e.target.getAttribute("data-num");a.delete(`${d}/views/${n}`).then(function(t){s.fire({icon:"success",title:"成功",text:"刪除成功"}),u()}).catch(function(t){console.log(t)})}});l.addEventListener("click",function(e){localStorage.clear(),location.href="index.html"});
