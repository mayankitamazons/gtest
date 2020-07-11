const functions = require('firebase-functions');

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cookieSession = require("cookie-session");
var admin = require("firebase-admin");

var serviceAccount = require("./permission.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://groapp123.firebaseio.com",
});

// Initialize firebase admin
// admin.initializeApp(functions.config().firebase);

var indexRouter = require("./routes/index");
var productRouter = require("./routes/product");
var categoryRouter = require("./routes/category");
var userRouter = require("./routes/user");
var adminRouter = require("./routes/admin");
var ordersRouter = require("./routes/orders");
var stripeRouter = require("./stripe/payment_service");

var app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["Reactnative@2018", "123"]
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/orders", ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.get('/hello', (request, response) => {
  response.send("Hello");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// const PORT = process.env.PORT || 3000;
const PORT = 297;
app.listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});

exports.app = functions.https.onRequest(app)
exports.createCustomer = stripeRouter.createCustomer();
exports.createCharge = stripeRouter.createCharge();
