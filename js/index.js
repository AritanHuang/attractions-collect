import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
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
      openCollectBtn();
    })
    .catch(function (err) {
      console.log(err.message);
    })
}
//渲染景點資料
function renderData() {
  attractionsData.forEach(function (item) {
    attractionsStr += `<li class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100">
          <div class="card-header">
            ${item.name}
          </div>
          <div class="card-body">
            <p class="card-text">${item.description}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
          <a href="attractions-more.html?id=${item.id}" class="btn btn-primary">詳細資料</a>   
          <a id="btn-collect" href="" class="btn btn-success d-none">景點收藏<span class="material-symbols-outlined align-middle ms-1">
          heart_plus
          </span></a>
          </div>
        </div>
      </li>`
  })
  attractions.innerHTML = attractionsStr;
}

init();
//綁定登出登入註冊按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');
//成功登入則開啟景點收藏按鈕&登入登出按鈕替換
function openCollectBtn() {
  const btnCollect = document.querySelectorAll('#btn-collect');
  // console.log(btnCollect);
  let token = localStorage.getItem('token');
  // console.log(token === null);
  if (token !== null) {
    btnCollect.forEach(function (item) {
      item.classList.remove('d-none');
    })
    //開啟登出按鈕
    btnLogOut.classList.remove('d-none');
    //關閉登入按鈕
    btnLogInMain.classList.add('d-none');
    btnSignupMain.classList.add('d-none');
  }
  else if (token === null) {
    Swal.fire({
      icon: 'info',
      title: '提醒',
      text: '記得登入才能收藏景點喔！',
      footer: '<a href="login.html">登入</a>'
    })
  }
}
//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
  const btnCollect = document.querySelectorAll('#btn-collect');
  localStorage.clear(); // 清除所有本地儲存的數據
  Swal.fire({
    icon: 'success',
    title: '成功',
    text: '登出成功',
  })
  // location.href = 'index.html';
  //開啟登入按鈕
  btnLogInMain.classList.remove('d-none');
  //開啟註冊按鈕
  btnSignupMain.classList.remove('d-none');
  //關閉登出按鈕
  btnLogOut.classList.add('d-none');
  btnCollect.forEach(function (item) {
    item.classList.add('d-none');
  })
})




