var admin = require("firebase-admin");

var serviceAccount = require("../capstonedesign-7b8c8-firebase-adminsdk-uyobr-a6f6472017.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
