import"./bootstrap.min-dc38d636.js";import{a as i}from"./axios-21b846bc.js";const s="https://json-auth-test.onrender.com",n=document.querySelector("#attractions-list");let c=[],a="";function o(){i.get(`${s}/views`).then(function(t){c=t.data,r()}).catch(function(t){console.log(t.message)})}function r(){c.forEach(function(t){a+=`<li class="col-4">
        <div class="card h-100">
          <div class="card-header">
            ${t.name}
          </div>
          <div class="card-body">
            <p class="card-text">${t.description}</p>
          </div>
          <div class="card-footer">
          <a href="attractions-more.html?id=${t.id}" class="btn btn-primary">詳細資料</a>
          </div>
        </div>
      </li>`}),n.innerHTML=a}o();
