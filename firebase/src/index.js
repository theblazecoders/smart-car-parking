const 
  express = require('express'),
  bodyParser = require('body-parser'),
  {
    getTowersInfo,
    getQrUrl,
    createQrImgFromDataUrl,
    deleteQrImg,
    getRandPass,
    encrypt,
    getOccupancyInfo,
    updateTowersInfoJson 
  } = require('./helperMethods');

let
  towersInfo = getTowersInfo(),
  { towers, password } = towersInfo;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/trackTowers', (req, res) => {
  res.json(getOccupancyInfo(towersInfo));
  console.log(`GET /trackTowers from ${req.ip}`);
})

app.get('/test', (req, res) => {
  console.log(`GET /test from ${req.ip}`);
  res.send("hello tester");
})

app.post('/test', (req, res) => {
  console.log(`POST /test from ${req.ip}`);
  console.log('body', req.body);
  res.json({str: 'hello tester'});
})

app.post('/addCar', async (req, res) => {
  console.log(`POST /addCar from ${req.ip}`);
  const { ownerName, towerLocation, parkIndex } = req.body;
  let carPark = towers[towerLocation].indexes[parkIndex];
  const {isOccupied} = carPark;
  
  if (!isOccupied){
    const passkey = getRandPass();

    carPark.passkey = encrypt(passkey, password);
    carPark.ownerName = ownerName;
    carPark.isOccupied = true;
    carPark.occupiedTimeStamp = new Date().getTime();

    towers[towerLocation].indexes[parkIndex] = carPark;
    towers[towerLocation].occupied += 1;
    towersInfo.occupancy += 1;

    const
      qrUrl = await getQrUrl(passkey),
      qrLocation = createQrImgFromDataUrl(qrUrl, towerLocation, parkIndex);
    
    updateTowersInfoJson(towersInfo);

    res.json({
      success: 'success',
      passkey: passkey,
      QrUrl: qrLocation
    })
  }
  else {
    res.json({
      success: 'failed',
      error: 'Already Occupied'
    })
  }
  
})

app.post('/removeCar', (req, res) => {
  console.log(`POST /removeCar from ${req.ip}`);

  const { towerLocation, parkIndex, passkey } = req.body;
  let carPark = towers[towerLocation].indexes[parkIndex];
  const
    {isOccupied} = carPark,
    correct_passkey = carPark.passkey;

  if (isOccupied) {
    if (encrypt(passkey, password) === correct_passkey){
      carPark.passkey = null;
      carPark.ownerName = null;
      carPark.isOccupied = null;
      carPark.occupiedTimeStamp = null;

      towers[towerLocation].indexes[parkIndex] = carPark;
      towers[towerLocation].occupied -= 1;
      towersInfo.occupancy -= 1;
      deleteQrImg(towerLocation, parkIndex);

      updateTowersInfoJson(towersInfo);

      res.json({
        success: 'success',
      })
    }
    else {
      res.json({
        success: 'failed',
        error: 'Wrong Passkey'
      })
    }
  }
  else {
    res.json({
      success: 'failed',
      error: 'Not Occupied'
    })
  }
})

app.listen(3000, () => {
  console.log('server started on port 3000');
})
