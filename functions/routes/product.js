var express = require("express");
var path = require("path");
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
let categoryAry = [];

var selectedType = '';


///////////  Firestore  ////////////////
// 1
// Get All Products
router.get("/register", function (req, res) {
  let query = db.collection('Categories');
  let response = [];
  categoryAry = [];

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
      response.push(selectedItem);
      categoryAry.push(selectedItem);
    }

    res.render("product/register", {
      data: response
    });
  });
});

// 2
// Add Product
router.post("/submit", upload.single("image"), function (req, res) {

  let file = req.file;
  let product_id = req.body.product_id;
  let product_name = req.body.product_name;
  let category_id = req.body.category_id;
  let product_price = req.body.product_price;
  let product_quantity = req.body.product_quantity;
  let product_description = req.body.product_description;
  let product_status = req.body.product_status;
  console.log(req.body.category_id);

  // 1
  // Upload Image to storage
  uploadImageToStorage(file, 'Product', category_id).then(downloadUrl => {

    // 2
    // Upload data to firestore
    db.collection('Product').doc().create({
      product_img_url: downloadUrl,
      product_id: product_id,
      product_name: product_name,
      ref_category_id: category_id,
      product_price:  parsefloat(product_price),
      product_quantity: product_quantity,
      product_description: product_description,
      product_status: product_status,
      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    })

    res.redirect("/product/all");
  }).catch(error => {
    console.log(error);
  });

});

// 3
// Get all Products
router.get("/all", function (req, res) {
  let query = db.collection('Product');
  let response = [];

  query.get().then(querySnapashot => {
    let docs = querySnapashot.docs;

    for (let doc of docs) {
      let data = doc.data();

      const selectedItem = {
        document_id: doc.id,
        product_img_url: data.product_img_url,
        product_id: data.product_id,
        product_name: data.product_name,
        ref_category_id: data.ref_category_id,
        product_price: data.product_price,
        product_quantity: data.product_quantity,
        product_description: data.product_description,
        product_status: data.product_status,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      response.push(selectedItem);
    }

    res.render("product/all", {
      data: response,
      success: selectedType
    });

    selectedType = '';
  });
});

// 4
// Delete Specific Product
router.get("/delete/:id", function (req, res) {
  let id = req.params.id;
  let document = db.collection('Product').doc(id);
  document.delete();
});

// 4
// Get Specific Product
router.get("/update/:id", function (req, res) {

  // 1
  // Fetch All Category

  let query = db.collection('Categories');
  let categoryAry = [];

  query.get().then(querySnapashot => {
    let docs = querySnapashot.docs;

    for (let doc of docs) {
      let data = doc.data();

      const selectedItem = {
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

    // 2
    // Fetch Product Detail for specific id

    let id = req.params.id;

    let ref = db.collection('Product').doc(id).get();
    ref.then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        res.render("product/update", {
          document_id: doc.id,
          data: doc.data(),
          categoryAry: categoryAry
        });
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  });
});

// 5
// Update Specific Product
router.post("/update_submit/:id", upload.single("image"), function (req, res) {

  let id = req.params.id;
  let file = req.file;
  let product_id = req.body.product_id;
  let product_name = req.body.product_name;
  let category_id = req.body.category_id;
  let product_price = req.body.product_price;
  let product_quantity = req.body.product_quantity;
  let product_description = req.body.product_description;
  let product_status = req.body.product_status;

  // 1
  // Upload Image to storage
  uploadImageToStorage(file).then(downloadUrl => {

    // 2
    // Upload data to firestore
    db.collection('Product').doc(id).create({
      product_img_url: downloadUrl,
      product_id: product_id,
      product_name: product_name,
      ref_category_id: category_id,
      product_price:  parseFloat(product_price),
      product_quantity: product_quantity,
      product_description: product_description,
      product_status: product_status,
      updated_at: admin.firestore.FieldValue.serverTimestamp()
    })

    res.redirect("/product/all");
  }).catch(error => {
    console.log(error);
  });

});

function addZeroes(num) {
  const dec = num.split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2
  return Number(num).toFixed(len)
}

module.exports = router;