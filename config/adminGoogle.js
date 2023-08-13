const admin = require('firebase-admin');

var serviceAccount = require("../google/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = {
  admin
}