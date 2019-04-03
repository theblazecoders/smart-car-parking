module.exports = {
  getQrUrl: async (passkey) => {
    const qrCode = require('qrcode');

    return await qrCode.toDataURL(passkey.toString())
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
        return;
      })
  },
  createQrImgFromDataUrl: (dataUrl, towerLocation, parkIndex) => {
    const 
      base64Img = require('base64-img'),
      path = require('path');
      destination = path.join(__dirname, `../userData/userQR/${towerLocation}/${parkIndex}`);

    base64Img.imgSync(dataUrl, destination, 'qr');
    return `file://${destination}/qr.png`;
  },
  deleteQrImg: (towerLocation, parkIndex) => {
    const
      fs = require('fs'),
      path = require('path');

    fs.unlinkSync(path.join(__dirname, `../userData/userQR/${towerLocation}/${parkIndex}/qr.png`));
    return;
  },
  getRandPass: (size = 4, max = Math.random(), min = Math.random()) => {
    let pass = Math.random() * (max - min) + min;
    pass *= (Math.pow(10, size));
    pass = Math.floor(pass).length != size ? Math.floor(pass * Math.pow(10, (Math.floor(pass).length - size))) : Math.floor(pass);
    return pass;
  },
  encrypt: (pass, password) => {
    const
      crypto = require('crypto'),
      algorithm = 'aes-256-ctr',
      cipher = crypto.createCipher(algorithm, password);
    
    let encryptedPassword = cipher.update(pass.toString(),'utf8','hex');
    encryptedPassword += cipher.final('hex');
    return encryptedPassword;
  },
  getTowersInfo: () => {
    const
    path = require('path'),
    fs = require('fs');

    return JSON.parse(fs.readFileSync(path.join(__dirname, '../userData/towersInfo.json')));
  },
  getOccupancyInfo: (info) => {
    const { occupancy, towers, numberOfTowers, totalSize } = info;
    let fullyOccupied = false,
      fullyOccupiedTowers = 0,
      occupiedLots = 0,
      lotsLeft = 0,
      towersInfo = [
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false},
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false},
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false},
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false},
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false},
        {size: 0,occupied: 0,occupiedIndexes: [],unoccupiedIndexes: [],fullyOccupied: false}
      ];

    towers.forEach(tower => {
      towersInfo[tower.location].occupied = tower.occupied;
      towersInfo[tower.location].size = tower.size;

      tower.indexes.forEach(index => {
        if (!index.isOccupied){
          towersInfo[tower.location].unoccupiedIndexes.push(index.index);
        }
        else {
          occupiedLots += 1;
          towersInfo[tower.location].occupiedIndexes.push(index.index);
        }
      })
    })

    towersInfo.forEach(tower => {
      if (tower.occupiedIndexes.length === tower.size) {
        tower.fullyOccupied = true;
        fullyOccupiedTowers += 1;
      }
    })

    if (fullyOccupiedTowers == numberOfTowers) fullyOccupied = true;
    lotsLeft = totalSize - occupancy;

    return {
      occupancy,
      lotsLeft,
      numberOfTowers,
      totalSize,
      fullyOccupied,
      fullyOccupiedTowers,
      towersInfo
    }
  },
  updateTowersInfoJson: (towersInfo) => {
    const
      fs = require('fs'),
      path = require('path'),
      beautify = require('json-beautify');

    fs.writeFileSync(
      path.join(__dirname, '../userData/towersInfo.json'),
      beautify(towersInfo,
      null,
      2,
      100
      )
    )
    return;
  }
}
