let towersInfo;

function updateData() {
  $.get('http://127.0.0.1:3000/trackTowers', data => {
    towersInfo = data;
    updatePage(towersInfo);
    console.log('data updated');
  })
}

const updatePage = (towersInfo) => {
  towersInfo.towersInfo.forEach((tower, i) => {
    tower.occupiedIndexes.forEach((index) => {
      console.log(`div#${i}.tower .lots div#${index}.lot`)
      $(`div#${i}.tower .lots div#${index}.lot`).css({backgroundColor: 'rgba(255, 0, 0, 0.6)'})
    })

    tower.unoccupiedIndexes.forEach((index) => {
      $(`div#${i}.tower .lots div#${index}.lot`).css({backgroundColor: 'rgba(0, 255, 0, 0.6)'})
    })
  })

  if ($('.parksize').text() != towersInfo.totalSize){
    $('.parksize').fadeOut(400, function() {
      $(this).text(towersInfo.totalSize).fadeIn();
    });
  }

  if ($('.occupiednumber').text() != towersInfo.occupancy){
    $('.occupiednumber').fadeOut(400, function() {
      $(this).text(towersInfo.occupancy).fadeIn();
    });
  }

  if ($('.availablenumber').text() != towersInfo.lotsLeft){
    $('.availablenumber').fadeOut(400, function() {
      $(this).text(towersInfo.lotsLeft).fadeIn();
    });
  }
}

setInterval(updateData, 2000);