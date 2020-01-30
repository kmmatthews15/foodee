//Dependencies 
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("./config/passport");
const sequilize_fixtures = require("sequelize-fixtures");
const models = require("./models");

// Port
const PORT = process.env.PORT || 8080;

// DB
const db = require("./models");

const app = express();

// Sets up the express app to handle data parsing 
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

// Static serve the public folder to the express app
app.use(express.static("public"));

// init and config the express session
app.use(session({
   secret: "big koya", 
   resave: true,
   saveUninitialized: true
}));

// passport init 
app.use(passport.initialize());
app.use(passport.session());

// handlebars view engine init 
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
   defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// router 
require("./controllers/user_controller")(app);
require("./controllers/foodie_controller")(app);
require("./routes/html_routes")(app);

// sequelize db sync + app listen
db.sequelize.sync({
   force: true
}).then(function () {
   sequilize_fixtures.loadFile("./db/test_data.json", models);
   app.listen(PORT, () => console.log(` | Server listening on port ${PORT} |` + '\n ---------------------------------'));
});