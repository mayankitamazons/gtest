const functions = require('firebase-functions');
var admin = require("firebase-admin");

const firestore = admin.firestore();
const settings = {
    timestampInSnapshots: true
};
firestore.settings(settings);

const stripe = require('stripe')("STRIPE_PUBLISH_KEY"); 

// 1
// [CREATE CUSTOMER]
exports.createCustomer = () => functions.firestore.document('User/{userId}/Tokens/{tokenid}').onCreate(async (snap, context) => {
    var customer;
    const val = snap.data()
    const token = val.tokenId;
    if (val === null) {
        return null
    }

    try {
        const snapshot = await firestore.collection('User').doc(context.params.userId).get();
        const customerId = snapshot.data().custId;
        const customerEmail = snapshot.data().email;

        // [NEW CUSTOMER]
        if (customerId == 'new') {
            customer = await stripe.customers.create({
                email: customerEmail,
                source: token
            });

            firestore.collection('User').doc(context.params.userId).update({
                custId: customer.id
            });

            const customerSource = customer.sources.data[0];

            return firestore.collection('User').doc(context.params.userId).collection('sources').doc(customerSource.fingerprint).set(customerSource, {
                merge: true
            })
        } else {
            // [ADD CARD FOR EXISTING CUSTOMER]

            await stripe.customers.createSource(
                customerId, {
                    source: token
                },
                function (err, customerSource) {
                    if (err) {
                        // Error adding card to customer
                        console.log(err)
                    } else {
                        // Success
                        console.log(customerSource)

                        return firestore.collection('User').doc(context.params.userId).collection('sources').doc(customerSource.fingerprint).set(customerSource, {
                            merge: true
                        })
                    }
                }
            );
        }
    } catch (error) {
        // We want to capture errors and render them in a user-friendly way, while
        // still logging an exception with StackDriver

        console.log(error);

        return reportError(error, {
            user: context.params.userId
        });
    }
});

// 2
// [CHARGE CUSTOMER]
// Charge the Stripe customer whenever an amount is created in Cloud Firestore
exports.createCharge = () => functions.firestore.document('User/{userId}/Charges/{chargeId}').onCreate(async (snap, context) => {

    try {
        const snapshot = await firestore.collection('User').doc(context.params.userId).get();
        const customer = snapshot.data().custId;

        const val = snap.data();
        const amount = parseInt(val.amount * 100);
        const currency = val.currency;
        const description = val.description;
        const card = val.card_id; // Charge from specific card
        const orderId = val.order_id;

        const idempotentKey = context.params.chargeId;

        const charge = {
            amount,
            currency,
            customer,
            description,
            card,
        };

        if (val.source == null) {
            const response = await stripe.charges.create(charge, {
                idempotencyKey: idempotentKey
            });
            console.log("Payment Success");
            console.log(response);
            const paymentSuccessResponse = { 'order_id': orderId, 'payment_status': 'success' };
            firestore.collection('User').doc(context.params.userId).collection('PaymentStatus').doc().set(paymentSuccessResponse, {
                merge: true
            })
            // If the result is successful, write it back to the database
            return snap.ref.set(response, {
                merge: true
            });
        }
    } catch (error) {
        // We want to capture errors and render them in a user-friendly way, while
        // still logging an exception with StackDriver
        console.log(error);

        return reportError(error, {
            user: context.params.userId
        });
    }
});