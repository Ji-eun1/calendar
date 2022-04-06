const calendar = document.querySelector(".calendar table tbody");
const year = document.querySelector(".year");
const month = document.querySelector(".month");

let today = new Date();
let date = new Date();

// 공공데이터 url https://www.data.go.kr/index.do
// cors 에러 해결 진행중 
// url 앞에 붙이기(안됨) - https://cors-anywhere.herokuapp.com/

const getHoliday = () => {
    let xhr = new XMLHttpRequest();
    let url = 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo'; /*URL*/
    let api_key = 'apikey입력하기';
    let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + api_key; /*Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
    queryParams += '&' + encodeURIComponent('solYear') + '=' + encodeURIComponent('2019'); /**/
    queryParams += '&' + encodeURIComponent('solMonth') + '=' + encodeURIComponent('02'); /**/
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            //var XMLParser = require('react-xml-parser')
            //var xml = new XMLParser().parseFromString(xhr.response); 
            console.log(xhr.response);
            
            //alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody:'+this.responseText);
        }
    };

    xhr.send('');
}

const prevCalendar = () => {
    today = new Date(today.getFullYear(), today.getMonth()-1, today.getDate());
    buildCalendar(); 
}

const nextCalendar = () => {
    today = new Date(today.getFullYear(), today.getMonth()+1, today.getDate());
    buildCalendar(); 
}

const buildCalendar = () => {
    const firstDate = new Date(today.getFullYear(),today.getMonth(),1);
    const lastDate = new Date(today.getFullYear(),today.getMonth()+1,0);

    year.innerText = today.getFullYear();
    month.innerText = ('0' + (today.getMonth() + 1)).slice(-2); 

    while(calendar.rows.length > 0) {
        calendar.deleteRow(calendar.rows.length-1);
    }
  
    let row = null;
    let count = 0;
    row = calendar.insertRow();
 
    for (let i=0; i<firstDate.getDay(); i++) {
        cell = row.insertCell();
        count++;
    }
  
    for (let i=1; i<=lastDate.getDate(); i++) { 
            const span = document.createElement('span');
            cell = row.insertCell();
            span.innerHTML = i;
            cell.appendChild(span);
            count++;
        if (count % 7 === 1) {
            cell.innerHTML = "<font color=#F79DC2>" + i
        }    
        if (count % 7 === 0){
            cell.innerHTML = "<font color=#673AB7>" + i
            row = calendar.insertRow();
        }
        if (today.getFullYear() == date.getFullYear()
            && today.getMonth() == date.getMonth()
            && i == date.getDate()) {
            cell.childNodes.item(0).classList.add('today');
        }
    }
}

buildCalendar();
getHoliday();