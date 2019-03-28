const
  fs = require('fs'),
  path = require('path'),
  beautify = require("json-beautify");

const makePass = (wordMap, size) => {
  const
    passMap = wordMap.toString(),
    passSize = size || 16;
  let text = '';
  for (var i = 0; i < passSize; i++){
    text += passMap.charAt(Math.floor(Math.random() * passMap.length));
  }
  return text;
}

const passwordMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%^&*';

const towersInfo = {
  occupancy: 0,
  password: makePass(passwordMap),
  numberOfTowers: 6,
  totalSize: 36,
  towers: [
    {
      location: 0,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    },
    {
      location: 1,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    },
    {
      location: 2,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    },
    {
      location: 3,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    },
    {
      location: 4,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    },
    {
      location: 5,
      occupied: 0,
      size: 6,
      indexes: [
        {"index":0,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":1,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":2,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":3,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":4,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null},
        {"index":5,"isOccupied":false,"occupiedTimeStamp":null,"ownerName":null,"passkey":null}
      ]
    }
  ]
}

fs.writeFileSync(path.join(__dirname, '../userData/towersInfo.json'), beautify(towersInfo, null, 2, 100));

for (var i = 0; i < 6; i++){
  for (var j = 0; j < 6; j++){
    if (fs.existsSync(path.join(__dirname, `../userData/userQR/${i}/${j}/qr.png`))){
      fs.unlinkSync(path.join(__dirname, `../userData/userQR/${i}/${j}/qr.png`));
    }
  }
}