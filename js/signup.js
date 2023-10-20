import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//DOM綁定
const btnSignUp = document.querySelector('#btn-signup');
const signEmail = document.querySelector('#signEmail');
const signPassword = document.querySelector('#signPassword');
let userObj = {};
//註冊功能
function signUp() {
    if (signEmail.value === '' || signPassword.value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '帳號密碼欄位皆為必填',
        })
        signEmail.value = '';
        signPassword.value = '';
    }
    else {
        userObj.email = signEmail.value;
        userObj.password = signPassword.value;
        // console.log(userObj);
        axios.post(`${api_url}/users`, userObj)
            .then(function (res) {
                // console.log(res);n
                Swal.fire({
                    icon: 'success',
                    title: '成功',
                    text: '帳號註冊成功',
                })
                signEmail.value = '';
                signPassword.value = '';
                // window.location.href = 'login.html';
            })
            .catch(function (err) {
                console.log(err.message);
            })
    }
}
//註冊按鈕點擊事件
btnSignUp.addEventListener('click', function (e) {
    signUp();
})
