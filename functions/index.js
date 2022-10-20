// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.getEmployeeInfo = functions.https.onRequest(async (req, res) => {
  let id = req.params[0];
  let stuff = ['no data found'];

  await admin
    .firestore()
    .collection('messages')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.id === id) {
          var newelement = {
            id: doc.id,
            uppercase: doc._fieldsProto.uppercase.stringValue,
            original: doc._fieldsProto.original.stringValue,
          };
          console.log(newelement);
          stuff = [];
          stuff.push(newelement);
        }
      });
      res.send(stuff);
    })
    .catch((err) => {
      console.log(err);
    });
});
exports.getEmployeesInfo = functions.https.onRequest(async (req, res) => {
  let stuff = [];

  await admin
    .firestore()
    .collection('messages')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        var newelement = {
          id: doc.id,
          uppercase: doc._fieldsProto.uppercase.stringValue,
          original: doc._fieldsProto.original.stringValue,
        };
        console.log(newelement);
        stuff.push(newelement);
      });
      res.send(stuff);
    })
    .catch((err) => {
      console.log(err);
    });
});
