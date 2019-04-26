const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!")
})

exports.getData = functions.https.onRequest((req, res) => {
  const db = admin.firestore()
  return db.collection('towersInfo').doc('mainInfo').get()
    .then(snap => res.send(snap.data()))
})