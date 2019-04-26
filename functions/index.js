const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.getData = functions.https.onRequest((req, res) => {
  const db = admin.firestore()
  return db.collection('towersInfo').doc('mainInfo').get()
    .then(snap => res.send(snap.data()))
})