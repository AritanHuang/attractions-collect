import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//綁定收藏清單DOM
const memberCollected = document.querySelector('#member-collected');
//綁定登入註冊登出按鈕
const btnLogInMain = document.querySelector('#btn-login-main');
const btnSignupMain = document.querySelector('#btn-signup-main');
const btnLogOut = document.querySelector('#btn-logout');
const memberId = localStorage.getItem('id');
const memberToken = localStorage.getItem('token');
let collectedData = [];
let collectedStr = '';

//切換header按鈕狀態
function changeBtn() {
    btnLogInMain.classList.add('d-none');
    btnSignupMain.classList.add('d-none');
    btnLogOut.classList.remove('d-none');
}
//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
    localStorage.clear(); // 清除所有本地儲存的數據
    Swal.fire({
        icon: 'success',
        title: '成功',
        text: '登出成功',
    })
    location.href = 'index.html';
    //開啟登入按鈕
    btnLogInMain.classList.remove('d-none');
    //開啟註冊按鈕
    btnSignupMain.classList.remove('d-none');
    //關閉登出收藏清單按鈕
    btnLogOut.classList.add('d-none');
    btnCollectList.classList.add('d-none');
})
function getCollected() {
    axios.get(`${api_url}/600/users/${memberId}/collects`, {
        headers: {
            'Authorization': `Bearer ${memberToken}`
        }
    })
        .then(function (res) {
            collectedData = res.data;
            // console.log(collectedData.length === 0);
            changeBtn();
            if (collectedData.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: '提醒',
                    text: `目前還未收藏任何景點`,
                    footer: `<a href='index.html'>去收藏</a>`
                })
            }
            renderCollected();
        })
        .catch(function (err) {
            console.log(err);
        })
}

getCollected();
function renderCollected() {
    collectedData.forEach(function (item) {
        collectedStr += `<li class="col-lg-6 col-12">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between">
            <h3>${item.name}</h3>
            <a class="btn btn-danger" data-num="${item.id}" href="#">刪除</a>
          </div>
          <div class="card-body">
            <p class="card-text">${item.description}</p>
          </div>
      </li>`
    })
    // console.log(collectedStr);
    memberCollected.innerHTML = collectedStr;
}

memberCollected.addEventListener('click', function (e) {
    collectedData.forEach(function (item) {
        if (item.id === e.target.getAttribute('data-num')) {
            axios.delete(`${api_url}/600/collects/${item.id}`, {
                headers: {
                    "Authorization": `Bearer ${memberToken}`
                }
            })
                .then(function (res) {
                    console.log(res.data);
                    getCollected();
                    Swal.fire({
                        icon: 'success',
                        title: '成功',
                        text: `成功刪除`,
                    });

                    // 重新整理頁面
                    location.reload();
                })
                .catch(function (err) {
                    console.log(err.message);
                })
        }
    })
})