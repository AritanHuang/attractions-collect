import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//綁定DOM
const loginEmail = document.querySelector('#loginEmail');
const loginPassword = document.querySelector('#loginPassword');
const btnLogin = document.querySelector('#btn-login');


let loginObj = {};

function logIn() {
    loginObj.email = loginEmail.value;
    loginObj.password = loginPassword.value;
    // console.log(loginObj);
    axios.post(`${api_url}/login`, loginObj)
        .then(function (res) {
            console.log(res.data);
            Swal.fire({
                icon: 'success',
                title: '成功',
                text: '登入成功',
            })
            loginEmail.value = '';
            loginPassword.value = '';
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('id', res.data.user.id);
            window.location.href = 'index.html';//成功登入跳轉回首頁
        })
        .catch(function (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '登入失敗',
                footer: '<a href="signup.html">尚未註冊?</a>'
            })
            loginEmail.value = '';
            loginPassword.value = '';
            console.log(err);
        })
}
//登入按鈕點擊事件
btnLogin.addEventListener('click', function (e) {
    logIn();
})