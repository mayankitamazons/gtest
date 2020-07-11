var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({
  dest: "public/images/"
});

// Firebase
var admin = require("firebase-admin");
const db = admin.firestore();
const uuid = require("uuid");
var uploadImageToStorage = require("../firebase/uploadImageToStorage");

var selectedType = '';

///////////  Firestore  ////////////////
// 1
router.get("/register", function (req, res) {
  res.render("category/register", {
    message: ""
  });
});

// 2
// Add category
router.post("/submit", upload.single("image"), function (req, res) {
  let file = req.file;
  let category_id = req.body.category_id;
  let category_name = req.body.category_name;
  let category_description = req.body.category_description;
  let category_status = req.body.category_status;

  // 1
  // Upload Image to storage
  uploadImageToStorage(file, 'Category').then(downloadUrl => {

    // 2
    // Upload data to firestore
    db.collection('Categories').doc().create({
      category_id: category_id,
      category_name: category_name,
      category_description: category_description,
      category_img_url: downloadUrl,
      category_status: category_status,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    })

    res.redirect("/category/all");
  }).catch(error => {
    console.log("Firestore error");
  });
});

// 3
// Get All category
router.get("/all", function (req, res) {

  console.log('Category all method called');

  let query = db.collection('Categories');

  let categoryAry = [];

  query.get().then(querySnapashot => {
    let docs = querySnapashot.docs;

    for (let doc of docs) {
      let data = doc.data();

      const selectedItem = {
        document_id: doc.id,
        category_id: data.category_id,
        category_name: data.category_name,
        category_description: data.category_description,
        category_img_url: data.category_img_url,
        category_status: data.category_status,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      categoryAry.push(selectedItem);
    }

    console.log(categoryAry.length);

    res.render("category/all", {
      data: categoryAry,
      'success':selectedType
    });

    selectedType = '';
  });
});

// 4
// Delete specific category
router.get("/delete/:id", function (req, res) {
 
  let id = req.params.id;
  let document = db.collection('Categories').doc(id);
  document.delete();
});

// 5
// Get specific category
router.get("/update/:id", function (req, res) {
  let id = req.params.id;

  let ref = db.collection('Categories').doc(id).get();
  ref.then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());

      res.render("category/update", {
        document_id: doc.id,
        data: doc.data()
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
});

// 6
// Update specific category
router.post("/update_submit/:id", upload.single("image"), function (req, res) {

  let id = req.params.id;
  let file = req.file;
  let category_id = req.body.category_id;
  let category_name = req.body.category_name;
  let category_description = req.body.category_description;
  let category_status = req.body.category_status;

  // 1
  // Upload Image to storage
  uploadImageToStorage(file).then(downloadUrl => {

    // 2
    // Upload data to firestore
    db.collection('Categories').doc(id).update({
      category_id: category_id,
      category_name: category_name,
      category_description: category_description,
      category_img_url: downloadUrl,
      category_status: category_status,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    })
    res.redirect("/category/all");
    
  }).catch(error => {
    console.log(error);
  });
});

module.exports = router;