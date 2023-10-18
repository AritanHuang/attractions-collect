import"./bootstrap.min-dc38d636.js";import{a as c}from"./axios-21b846bc.js";const r=document.querySelector("#attractions-list");let i=[],a="";function s(){c.get(`${api_url}/views`).then(function(t){i=t.data,n()}).catch(function(t){console.log(t.message)})}function n(){i.forEach(function(t){a+=`<li class="col-4">
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
      </li>`}),r.innerHTML=a}s();
