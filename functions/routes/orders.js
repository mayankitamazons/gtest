var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({
  dest: "public/images/"
});

var selectedType = '';

// Firebase
var admin = require("firebase-admin");
const db = admin.firestore();
const uuid = require("uuid");
var uploadImageToStorage = require("../firebase/uploadImageToStorage");

// 1
// Get all Orders
router.get("/new", function (req, res) {

  let query = db.collection('Order');

  let ordersAry = [];

  query.get().then(querySnapashot => {
    let docs = querySnapashot.docs;

    for (let doc of docs) {
      let data = doc.data();

      const selectedItem = {
        document_id: doc.id,
        order_id: data.order_id,
        order_title: data.order_title,
        payment_type: data.payment_type,
        order_status: data.order_status,
        sub_total: data.sub_total,
        total_fare: data.total_fare,
        delivery_fee: data.delivery_fee,
        total_quantity: data.total_quantity,
        user_name: data.user_name,
        deliver_to: data.deliver_to,
        created_at: data.created_at,
        updated_at: data.updated_at
      };
      ordersAry.push(selectedItem);
    }

    res.render("orders/new", {
      data: ordersAry,
      success: selectedType
    });

    selectedType = '';
  });
});

// 2
// Delete Specific Order
router.get("/delete/:id", function (req, res) {
 let id = req.params.id;
  let document = db.collection('Order').doc(id);
  document.delete();

  res.redirect("/orders/new");

});

// 3
// Update Specific Order
router.post("/update_submit/:id", function (req, res) {
  let id = req.params.id;

  db.collection('Order').doc(id).update({
    order_status: parseInt(req.body.status_code),
    updated_at: admin.firestore.FieldValue.serverTimestamp()
  })
  res.redirect("/orders/new");
});

module.exports = router;