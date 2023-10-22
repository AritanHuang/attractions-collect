import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//取出景點編號
let viewId = location.href.split('=')[1];
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

//綁DOM
const viewName = document.querySelector('#view-name');
const viewDescription = document.querySelector('#view-description');
const btnEdit = document.querySelector('#btn-edit');
//取得第n筆的景點詳細資料
axios.get(`${api_url}/views/${viewId}`)
    .then(function (res) {
        // console.log(res.data);
        //將資料寫入欄位中
        const data = res.data;
        // 將數據寫入表單資料中
        viewName.value = data.name;
        viewDescription.value = data.description;
        // 儲存原始字句
        let originalName = data.name;
        let originalDescription = data.description;
        //一偵測到修改就改動
        // viewName.addEventListener('input', handleInput);
        // viewDescription.addEventListener('input', handleInput);
        //按鈕點擊事件註冊
        btnEdit.addEventListener('click', handleInput);
        function handleInput(e) {
            e.preventDefault();
            if (viewName.value !== originalName || viewDescription.value !== originalDescription) {
                sendUpdateRequest();
            }
        }
        function sendUpdateRequest() {
            const newObj = {};
            newObj.name = viewName.value;
            newObj.description = viewDescription.value;
            axios.put(`${api_url}/views/${viewId}`, newObj)
                .then(function (res) {
                    // console.log(res.data);
                    Swal.fire({
                        icon: 'success',
                        title: '成功',
                        text: `成功修改${res.data.name}`,
                        footer: `<a href="admin.html">回後台管理</a>`
                    })
                    // 更新原始字段值
                    originalName = viewName.value;
                    originalDescription = viewDescription.value;
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    })
    .catch(function (err) {
        console.log(err.message);
    })


//登出按鈕事件
btnLogOut.addEventListener('click', function (e) {
    localStorage.clear(); // 清除所有本地儲存的數據
    location.href = 'index.html';
})
