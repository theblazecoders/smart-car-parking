module.exports = (firebaseData) => {
  var admin = require("firebase-admin");
  const numberOfTowers = 6;
  const numberOfParkingSlots = 6;

  admin.initializeApp({
    credential: admin.credential.cert(firebaseData.serviceAccountKey),
    databaseURL: firebaseData.dbURL
  });
  var db = admin.firestore();

  var towersInfo = db.collection("towersInfo");

  var users = db.collection("parkingSlotsPassword");

  users.doc("user").set({
    password: "@nvlksdnvklsdnvlksdnv"
  });

  towersInfo.doc("mainInfo").set({
    occupancy: 0,
    numberOfTowers: numberOfTowers,
    occupancy: numberOfTowers * numberOfParkingSlots,
    numberOfParkingSlots: numberOfParkingSlots
  });

  for(var i =1 ; i<= numberOfTowers;i++){
    var tower = {};
    tower['availableSlots'] = 0;
    tower['occupied'] = numberOfParkingSlots;
    tower['size'] = numberOfParkingSlots;
    for(var j=1;j<=numberOfParkingSlots;j++){
      tower['parkingSlot'+j] = {
        isOccupied : false,
        occupiedTimeStamp: null,
        ownerID: "",
      }
    }
    towersInfo.doc("tower"+i).set(tower);
  }
}
