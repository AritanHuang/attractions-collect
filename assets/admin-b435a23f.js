import{a as c}from"./bootstrap.min-f808e228.js";const i="https://json-auth-test.onrender.com",s=document.querySelector("#views-content"),r=document.querySelector("#btn-backstage"),d=localStorage.getItem("role"),l=document.querySelector("#btn-login-main"),a=document.querySelector("#btn-logout"),u=document.querySelector("#btn-signup-main");let e=[],o="";d==="admin"&&(r.classList.remove("d-none"),a.classList.remove("d-none"),l.classList.add("d-none"),u.classList.add("d-none"));function m(){c.get(`${i}/views`).then(function(t){e=t.data,n()}).catch(function(t){console.log(t)});function n(){e.forEach(function(t){o+=`<tr>
        <th scope="row">${t.id}</th>
        <td>${t.name}</td>
        <td>${t.description}</td>
        <td>
            <a data-num="${t.id}" class="btn btn-primary me-1 btn-view-edit" href="admin-edit.html?id=${t.id}">編輯</a>
            <a class="btn btn-danger" href="">刪除</a>
        </td>
    </tr>`}),s.innerHTML=o}}m();a.addEventListener("click",function(n){localStorage.clear(),location.href="index.html"});
