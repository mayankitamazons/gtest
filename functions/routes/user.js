var express = require("express");
var router = express.Router();
const fetch = require("node-fetch");

// Firebase
var admin = require("firebase-admin");
const db = admin.firestore();
const uuid = require("uuid");
var uploadImageToStorage = require("../firebase/uploadImageToStorage");

var selectedType = '';

///////////  Firestore  ////////////////
// 1
// Get All Users
router.get("/all", function (req, res) {
  let query = db.collection('User');

  let userAry = [];

  query.get().then(querySnapashot => {
    let docs = querySnapashot.docs;

    for (let doc of docs) {
      let data = doc.data();

      const selectedItem = {
        document_id: doc.id,
        email: data.email,
        id: data.id,
        name: data.name,
        phone: data.phone,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      userAry.push(selectedItem);
    }

    res.render("user/all", {
      data: userAry,
      success: selectedType
    });

    selectedType = '';
  });
});

// 2
// Delete Specific User
router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  let document = db.collection('User').doc(id);
  document.delete();

  res.redirect("/user/all");
});

module.exports = router;
