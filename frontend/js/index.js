let towersInfo;
const updatePage = require('./updatePage');

function updateData() {
  $.get('http://127.0.0.1:3000/trackTowers', data => {
    towersInfo = data;
    updatePage(towersInfo);
    console.log('data updated');
  })
}

setInterval(updateData, 2000);
