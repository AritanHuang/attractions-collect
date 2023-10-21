import axios from "axios";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
//url
const api_url = 'https://json-auth-test.onrender.com';
//取出埋在網址內的景點id
const attractionsId = location.href.split('=')[1];
const attractionsDetail = document.querySelector('#attractions-detail');
let detailStr = '';
let AttractionsMoreData = {};

//綁定登出登入註冊收藏清單按鈕DOM
const btnLogInMain = document.querySelector('#btn-login-main');
const btnLogOut = document.querySelector('#btn-logout');
const btnSignupMain = document.querySelector('#btn-signup-main');
const btnCollectList = document.querySelector('#btn-collect-list');

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
    detailStr = `<h2>${AttractionsMoreData.name}</h2> <p>${AttractionsMoreData.description}</p>  <a class="btn btn-primary d-none" id=btn-add-collect-${attractionsId} href="">收藏景點</a>`
    attractionsDetail.innerHTML = detailStr;
    checkAndSetCollectStatus();
    let token = '';
    token = localStorage.getItem('token');
    let userId = localStorage.getItem('id');
    const btnAddCollect = document.getElementById(`btn-add-collect-${attractionsId}`);
    //檢查是否有登入
    if (token !== null) {
        btnLogInMain.classList.add('d-none');
        btnSignupMain.classList.add('d-none');
        btnLogOut.classList.remove('d-none');
        btnCollectList.classList.remove('d-none');
        btnAddCollect.classList.remove('d-none');
        btnAddCollect.addEventListener('click', function (e) {
            e.preventDefault();
            // console.log(e.target.textContent === '刪除收藏');
            if (e.target.textContent === '刪除收藏') {
                e.target.textContent = '收藏景點';
                axios.delete(`${api_url}/600/collects/${attractionsId}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
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
            else if (e.target.textContent === '收藏景點') {
                let collectObj = {};
                collectObj.name = AttractionsMoreData.name;
                collectObj.description = AttractionsMoreData.description;
                collectObj.id = attractionsId;
                collectObj.isCollected = 'true';
                e.target.textContent = '刪除收藏';
                axios.post(`${api_url}/600/users/${userId}/collects`, collectObj, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(function (res) {
                        // console.log(res.data);
                        Swal.fire({
                            icon: 'success',
                            title: '成功',
                            text: `成功收藏[${res.data.name}]`,
                        })
                    })
                    .catch(function (err) {
                        console.log(err.message);
                    })
            }
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
                // 找到對應景点的按钮
                const btnAddCollect = document.getElementById(`btn-add-collect-${attractionsId}`);
                // console.log(btnAddCollect);
                collectData.forEach(function (item) {
                    // console.log(item);
                    const viewId = item.id;
                    if (viewId === attractionsId) {
                        // console.log(item.isCollected);
                        if (item.isCollected) {
                            btnAddCollect.textContent = '刪除收藏';
                        } else {
                            btnAddCollect.textContent = '收藏景點';
                        }
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
    //關閉登出收藏清單按鈕
    btnLogOut.classList.add('d-none');
    btnCollectList.classList.add('d-none');
    btnCollect.forEach(function (item) {
        item.classList.add('d-none');
    })
    location.href = 'index.html';
})