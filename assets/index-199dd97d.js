import{S as i,a as r}from"./bootstrap.min-f808e228.js";const d="https://json-auth-test.onrender.com",S=document.querySelector("#attractions-list");let m=[],g="";function L(){r.get(`${d}/views`).then(function(t){m=t.data,$(),x()}).catch(function(t){console.log(t.message)})}function $(){m.forEach(function(t){g+=`<li class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <div class="card-header">
            ${t.name}
          </div>
          <div class="card-body">
            <p class="card-text">${t.description}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
          <a href="attractions-more.html?id=${t.id}" class="btn btn-primary">詳細資料</a>   
          <a id="btn-collect-${t.id}" href="" data-num="${t.id}" class="btn btn-success d-none">收藏景點</a>
          </div>
        </div>
      </li>`}),S.innerHTML=g,p()}L();const h=document.querySelector("#btn-login-main"),f=document.querySelector("#btn-logout"),b=document.querySelector("#btn-signup-main"),v=document.querySelector("#btn-collect-list");function p(){const t=document.querySelectorAll(".btn-success");let n=localStorage.getItem("token");n!==null?(t.forEach(function(e){e.classList.remove("d-none"),e.addEventListener("click",function(o){o.preventDefault();let c=o.target.getAttribute("data-num"),u=localStorage.getItem("id"),l=m[c-1],a={};a.name=l.name,a.description=l.description,a.id=c,o.target.textContent==="收藏景點"?(a.isCollected="true",o.target.textContent="刪除收藏",r.post(`${d}/600/users/${u}/collects`,a,{headers:{Authorization:`Bearer ${n}`}}).then(function(s){i.fire({icon:"success",title:"成功",text:`成功收藏[${s.data.name}]`})}).catch(function(s){console.log(s.message)})):(o.target.textContent="收藏景點",r.delete(`${d}/collects/${c}`).then(function(s){i.fire({icon:"success",title:"成功",text:"成功刪除"})}).catch(function(s){console.log(s.message)}))})}),f.classList.remove("d-none"),v.classList.remove("d-none"),h.classList.add("d-none"),b.classList.add("d-none")):n===null&&i.fire({icon:"info",title:"提醒",text:"記得登入才能收藏景點喔！",footer:'<a href="login.html">登入</a>'})}function x(){let t=localStorage.getItem("token"),n=localStorage.getItem("id");t!==null&&r.get(`${d}/600/users/${n}/collects`,{headers:{Authorization:`Bearer ${t}`}}).then(function(e){e.data.forEach(function(c){const u=c.id,l=document.querySelector(`#btn-collect-${u}`);c.isCollected?l.textContent="刪除收藏":l.textContent="收藏景點"})}).catch(function(e){console.log(e.message)})}f.addEventListener("click",function(t){const n=document.querySelectorAll(".btn-success");localStorage.clear(),i.fire({icon:"success",title:"成功",text:"登出成功"}),h.classList.remove("d-none"),b.classList.remove("d-none"),f.classList.add("d-none"),v.classList.add("d-none"),n.forEach(function(e){e.classList.add("d-none")})});
