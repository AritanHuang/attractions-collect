import axios from "axios";
//url
const api_url = 'https://json-auth-test.onrender.com';
const attractions = document.querySelector('#attractions-list')

let attractionsData = [];
let attractionsStr = '';

// 初始化頁面
function init() {
  //取得景點
  axios.get(`${api_url}/views`)
    .then(function (res) {
      // console.log(res.data);
      attractionsData = res.data;
      renderData();
    })
    .catch(function (err) {
      console.log(err.message);
    })
}
//渲染景點資料
function renderData() {
  attractionsData.forEach(function (item) {
    attractionsStr += `<li class="col-4">
        <div class="card h-100">
          <div class="card-header">
            ${item.name}
          </div>
          <div class="card-body">
            <p class="card-text">${item.description}</p>
          </div>
          <div class="card-footer">
          <a href="attractions-more.html?id=${item.id}" class="btn btn-primary">詳細資料</a>
          </div>
        </div>
      </li>`
  })
  attractions.innerHTML = attractionsStr;
}

init();



