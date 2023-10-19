import{a as s}from"./bootstrap.min-a95462f6.js";const o="https://json-auth-test.onrender.com",i=document.querySelector("#attractions-list");let c=[],a="";function n(){s.get(`${o}/views`).then(function(t){c=t.data,r()}).catch(function(t){console.log(t.message)})}function r(){c.forEach(function(t){a+=`<li class="col-12 col-sm-6 col-lg-4">
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
      </li>`}),i.innerHTML=a}n();
