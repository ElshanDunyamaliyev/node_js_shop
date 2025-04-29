const express = require("express");
const bodyParser = require("body-parser");
const rootFileName = require("./util/path");
const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const errorController = require("./controllers/errorController");
const path = require("path");
// const exphbs = require("express-handlebars");

const app = express();

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to our page</h1>");
// });

// If we sent response e.g res.send("smt") we dont use next because if you remember in node js if we sent response and after that if try to modify response it will throw an error
// Second case if we throw error in that case we dont use next too.

// If we have authentication, parser logic we have to use next

// app.use((req, res, next) => {
//   // For example in here lets say we authentication logic and user signed in. If we dont call next we cant pass to next endpoint
//   console.log("first");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("second");
//   next();
// });

// We have to call / in the end because all the request start with it
// app.use("/users", (req, res, next) => {
//   res.send({
//     usersName: ["John", "Max", "Jonas", "Stephen"],
//   });
// });

// app.use("/", (req, res, next) => {
//   res.send("<h1>Default Page</h1>");
// });

// // Tell express to use pug
// app.set("view engine", "pug");
// // Tell express where to find pug
// app.set("views", "views/pug");

// Set Handlebars as the templating engine
// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");
// app.set("views", "views/handlebars");

// Set Ejs as the templating engine
app.set("view engine", "ejs");
app.set("views", "views/ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRouter);
app.use(shopRouter);

app.use("/", errorController.notFoundHandler);

app.listen(3000);
