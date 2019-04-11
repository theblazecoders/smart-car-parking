
var admin = require("firebase-admin");

var serviceAccount = require("../service_key.json");

const numberOfTowers = 6;

const numberOfParkingSlots = 6;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL,
});


var db = admin.firestore();

var towersInfo = db.collection("towersInfo");

towersInfo.doc("occupancy").set({
    "occupancy":0
});

towersInfo.doc("numberOfTowers").set({
    "numberOfTowers":numberOfTowers
});

towersInfo.doc("totalSize").set({
    "occupancy": numberOfTowers * numberOfParkingSlots
});

var towers = [];

for(var i=0;i<numberOfTowers;i++){

    var parkingSlots = [];
    for(var j =0 ;j < numberOfParkingSlots;j++){
        parkingSlots.push({
            "index": j+1,
            "isOccupied":false,
            "occupiedTimeStamp":null,
            "ownerEmailID": "",
            "password":"",
        })
    }
    towers.push({
        "location" : i+1,
        "occupied":0,
        "availableSlots":numberOfParkingSlots,
        "size":numberOfParkingSlots,
        "parkingSlots": parkingSlots,
    })
}
towersInfo.doc("towers").set({"towers":towers});

