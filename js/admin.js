import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//綁定景點內容DOM
const viewsContent = document.querySelector('#views-content');
//綁定管理人員按鈕DOM
const btnBackstage = document.querySelector('#btn-backstage');
const role = localStorage.getItem('role');
//綁定登出登入註冊收藏清單按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');
let viewsData = [];
let viewStr = ''
//檢查身份
if (role === 'admin') {
    btnBackstage.classList.remove('d-none');
    //開啟登出收藏清單按鈕
    btnLogOut.classList.remove('d-none');
    //關閉登入註冊按鈕
    btnLogInMain.classList.add('d-none');
    btnSignupMain.classList.add('d-none');
}
//後台初始化頁面
function adminInit() {
    //取得後台景點頁面
    axios.get(`${api_url}/views`)
        .then(function (res) {
            viewsData = res.data;
            // console.log(viewsData);
            renderViews();
        })
        .catch(function (err) {
            console.log(err);
        })
    //渲染後台景點頁面
    function renderViews() {
        viewsData.forEach(function (item) {
            // console.log(item);
            viewStr += `<tr>
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>
            <a data-num="${item.id}" class="btn btn-primary me-1 btn-view-edit" href="admin-edit.html?id=${item.id}">編輯</a>
            <a class="btn btn-danger" href="">刪除</a>
        </td>
    </tr>`
        })
        // console.log(viewStr);
        viewsContent.innerHTML = viewStr;
    }
}
adminInit();

//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
    localStorage.clear(); // 清除所有本地儲存的數據
    location.href = 'index.html';
})