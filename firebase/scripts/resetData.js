
var admin = require("firebase-admin");

var serviceAccount = require("../api-key.json");

const numberOfTowers = 6;

const numberOfParkingSlots = 6;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://smart-car-parking-5dfda.firebaseio.com"
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
            "index": j,
            "isOccupied":false,
            "occupiedTimeStamp":null,
            "ownerName":"",
            "ownerEmailID": "",
            "password":"",
        })
    }
    towers.push({
        "location" : 0,
        "occupied":0,
        "size":numberOfParkingSlots,
        "parkingSlots": parkingSlots,
    })
}
towersInfo.doc("towers").set({"towers":towers});

