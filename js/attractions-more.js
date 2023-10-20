import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//取出埋在網址內的景點id
const attractionsId = location.href.split('=')[1];
const attractionsTitle = document.querySelector('#attractions-title');
const attractionsBody = document.querySelector('#attractions-body');
let AttractionsMoreData = {};
//綁定登出登入註冊按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');

//取得第n筆的景點詳細資料
axios.get(`${api_url}/views/${attractionsId}`)
    .then(function (res) {
        AttractionsMoreData = res.data;
        renderAttractionsMore();
    })
    .catch(function (err) {
        console.log(err);
    })
//渲染第n筆的景點詳細資料
function renderAttractionsMore() {
    // console.log(AttractionsMoreData);
    let token = '';
    token = localStorage.getItem('token');
    if (token !== null) {
        btnLogInMain.classList.add('d-none');
        btnSignupMain.classList.add('d-none');
        btnLogOut.classList.remove('d-none');
    }
    attractionsTitle.textContent = AttractionsMoreData.name;
    attractionsBody.textContent = AttractionsMoreData.description;
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
    //開啟登入按鈕
    btnLogInMain.classList.remove('d-none');
    //開啟註冊按鈕
    btnSignupMain.classList.remove('d-none');
    //關閉登出按鈕
    btnLogOut.classList.add('d-none');
    btnCollect.forEach(function (item) {
        item.classList.add('d-none');
    })
    location.href = 'index.html';
})