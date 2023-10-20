import{S as s,a as r}from"./bootstrap.min-f808e228.js";const d="https://json-auth-test.onrender.com",u=document.querySelector("#attractions-list");let a=[],c="";function f(){r.get(`${d}/views`).then(function(t){a=t.data,m(),b()}).catch(function(t){console.log(t.message)})}function m(){a.forEach(function(t){c+=`<li class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <div class="card-header">
            ${t.name}
          </div>
          <div class="card-body">
            <p class="card-text">${t.description}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
          <a href="attractions-more.html?id=${t.id}" class="btn btn-primary">詳細資料</a>   
          <a id="btn-collect" href="" class="btn btn-success d-none">景點收藏<span class="material-symbols-outlined align-middle ms-1">
          heart_plus
          </span></a>
          </div>
        </div>
      </li>`}),u.innerHTML=c}f();const l=document.querySelector("#btn-login-main"),o=document.querySelector("#btn-logout"),i=document.querySelector("#btn-signup-main");function b(){const t=document.querySelectorAll("#btn-collect");let n=localStorage.getItem("token");n!==null?(t.forEach(function(e){e.classList.remove("d-none")}),o.classList.remove("d-none"),l.classList.add("d-none"),i.classList.add("d-none")):n===null&&s.fire({icon:"info",title:"提醒",text:"記得登入才能收藏景點喔！",footer:'<a href="login.html">登入</a>'})}o.addEventListener("click",function(t){const n=document.querySelectorAll("#btn-collect");localStorage.clear(),s.fire({icon:"success",title:"成功",text:"登出成功"}),l.classList.remove("d-none"),i.classList.remove("d-none"),o.classList.add("d-none"),n.forEach(function(e){e.classList.add("d-none")})});
