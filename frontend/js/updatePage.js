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

module.exports = updatePage;