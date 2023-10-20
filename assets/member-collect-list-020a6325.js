import{S as c,a as s}from"./bootstrap.min-f808e228.js";const i="https://json-auth-test.onrender.com",d=document.querySelector("#member-collected"),r=document.querySelector("#btn-login-main"),u=document.querySelector("#btn-signup-main"),o=document.querySelector("#btn-logout"),g=localStorage.getItem("id"),f=localStorage.getItem("token");let t=[],l="";function h(){r.classList.add("d-none"),u.classList.add("d-none"),o.classList.remove("d-none")}o.addEventListener("click",function(e){localStorage.clear(),c.fire({icon:"success",title:"成功",text:"登出成功"}),location.href="index.html",r.classList.remove("d-none"),u.classList.remove("d-none"),o.classList.add("d-none"),btnCollectList.classList.add("d-none")});function m(){s.get(`${i}/600/users/${g}/collects`,{headers:{Authorization:`Bearer ${f}`}}).then(function(e){t=e.data,h(),t.length===0&&c.fire({icon:"info",title:"提醒",text:"目前還未收藏任何景點",footer:"<a href='index.html'>去收藏</a>"}),b()}).catch(function(e){console.log(e)})}m();function b(){t.forEach(function(e){l+=`<li class="col-lg-6 col-12">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between">
            <h3>${e.name}</h3>
            <a class="btn btn-danger" data-num="${e.id}" href="#">刪除</a>
          </div>
          <div class="card-body">
            <p class="card-text">${e.description}</p>
          </div>
      </li>`}),d.innerHTML=l}d.addEventListener("click",function(e){t.forEach(function(a){a.id===e.target.getAttribute("data-num")&&s.delete(`${i}/600/collects/${a.id}`,{headers:{Authorization:`Bearer ${f}`}}).then(function(n){console.log(n.data),m(),c.fire({icon:"success",title:"成功",text:"成功刪除"}),location.reload()}).catch(function(n){console.log(n.message)})})});
