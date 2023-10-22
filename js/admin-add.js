import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//綁定管理人員按鈕DOM
const btnBackstage = document.querySelector('#btn-backstage');
const role = localStorage.getItem('role');

//綁定登出登入註冊收藏清單按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');

//檢查身份
if (role === 'admin') {
    btnBackstage.classList.remove('d-none');
    //開啟登出收藏清單按鈕
    btnLogOut.classList.remove('d-none');
    //關閉登入註冊按鈕
    btnLogInMain.classList.add('d-none');
    btnSignupMain.classList.add('d-none');
}
//綁定景點名稱描述DOM
const addViewName = document.querySelector('#add-view-name');
const addViewDescription = document.querySelector('#add-view-description');
//新增景點DOM
const btnAdd = document.querySelector('#btn-add');
function addView() {
    const addObj = {};
    addObj.name = addViewName.value;
    addObj.description = addViewDescription.value;
    // console.log(addObj);
    axios.post(`${api_url}/views`, addObj)
        .then(function (res) {
            // console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: `成功新增${res.data.name}`,
            })
            addViewName.value = '';
            addViewDescription.value = '';
        })
        .catch(function (err) {
            console.log(err.message);
        })
}
//新增景點按鈕點擊事件
btnAdd.addEventListener('click', function (e) {
    e.preventDefault();
    addView();
})

//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
    localStorage.clear(); // 清除所有本地儲存的數據
    location.href = 'index.html';
})