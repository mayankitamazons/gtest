// // FIREBASE & GOOGLE CLOUD
var admin = require("firebase-admin");
const db = admin.firestore();
const uuid = require("uuid");

var bucket = admin.storage().bucket("groceryweb-5941d.appspot.com");

const uploadImageToStorage = (file, fromClass, productName) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }

        const downloadToken = uuid.v1();
        bucket.upload(
            file.path, {
                destination: fromClass == 'Category' ? 'Category/' + file.filename : 'Product/' + productName + '/' + file.filename,
                metadata: {
                    contentType: file.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: downloadToken
                    }
                }
            },
            function (err, data) {
                if (err) {
                } else {
                    let img = data[0];
                    let fileName = fromClass == 'Category' ? 'Category/' + file.filename : 'Product/' + productName + '/' + file.filename;
                    img = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(fileName) + "?alt=media&token=" + downloadToken;
                    resolve(img);
                }
            }
        );
    });
};

module.exports = uploadImageToStorage;