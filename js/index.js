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
      checkAndSetCollectStatus();
      // openCollectBtn();
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
          <a id="btn-collect-${item.id}" href="" data-num="${item.id}" class="btn btn-success d-none">收藏景點</a>
          </div>
        </div>
      </li>`
  })
  // console.log(attractionsStr);
  attractions.innerHTML = attractionsStr;
  openCollectBtn();
}

init();
//綁定登出登入註冊收藏清單按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');
const btnCollectList = document.querySelector('#btn-collect-list');
//成功登入則開啟景點收藏按鈕&登入登出按鈕替換
function openCollectBtn() {
  const collectButtons = document.querySelectorAll('.btn-success');
  let token = localStorage.getItem('token');
  if (token !== null) {
    collectButtons.forEach(function (item) {
      item.classList.remove('d-none');
      // 點擊收藏功能事件
      item.addEventListener('click', function (e) {
        e.preventDefault();
        //取出景點編號＆會員編號
        let viewId = e.target.getAttribute('data-num');
        let userId = localStorage.getItem('id');
        let collectData = attractionsData[viewId - 1];
        let collectObj = {};
        collectObj.name = collectData.name;
        collectObj.description = collectData.description;
        if (e.target.textContent === '收藏景點') {
          collectObj.isCollected = 'true';
          // console.log(collectObj);
          e.target.textContent = '刪除收藏';
          axios.post(`${api_url}/600/users/${userId}/collects`, collectObj, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
            .then(function (res) {
              // console.log(res.data);
              Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: '成功',
                text: `成功收藏[${res.data.name}]`,
              })
            })
            .catch(function (err) {
              console.log(err.message);
            })
        }
        else {
          e.target.textContent = '收藏景點';
          axios.delete(`${api_url}/collects/${viewId}`)
            .then(function (res) {
              // console.log(res.data);
              Swal.fire({
                icon: 'success',
                title: '成功',
                text: `成功刪除`,
              })
            })
            .catch(function (err) {
              console.log(err.message);
            })
        }
      })
    })
    //開啟登出收藏清單按鈕
    btnLogOut.classList.remove('d-none');
    btnCollectList.classList.remove('d-none');
    //關閉登入註冊按鈕
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

//重新整理或登出後取得用戶的收藏狀態並更新按鈕狀態
function checkAndSetCollectStatus() {
  let memberToken = localStorage.getItem('token');
  let memberId = localStorage.getItem('id');
  if (memberToken !== null) {
    axios.get(`${api_url}/600/users/${memberId}/collects`, {
      headers: {
        'Authorization': `Bearer ${memberToken}`
      }
    })
      .then(function (res) {
        const collectData = res.data;
        // console.log(collectData);
        collectData.forEach(function (item) {
          const viewId = item.id;
          // 找到對應景点的按钮
          const collectBtn = document.querySelector(`#btn-collect-${viewId}`);
          // console.log(collectBtn);
          if (item.isCollected) {
            collectBtn.textContent = '刪除收藏';
          } else {
            collectBtn.textContent = '收藏景點';
          }
        })
      })
      .catch(function (err) {
        console.log(err.message);
      })
  }
}

//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
  const collectButtons = document.querySelectorAll('.btn-success');
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
  //關閉登出收藏清單按鈕
  btnLogOut.classList.add('d-none');
  btnCollectList.classList.add('d-none');
  collectButtons.forEach(function (item) {
    item.classList.add('d-none');
  })
})




