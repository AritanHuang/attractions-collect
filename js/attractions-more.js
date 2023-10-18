import axios from "axios";
//取出埋在網址內的景點id
const attractionsId = location.href.split('=')[1];
const attractionsTitle = document.querySelector('#attractions-title');
const attractionsBody = document.querySelector('#attractions-body');
let AttractionsMoreData = {};

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
    attractionsTitle.textContent = AttractionsMoreData.name;
    attractionsBody.textContent = AttractionsMoreData.description;
}