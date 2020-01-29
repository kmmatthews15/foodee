// Dependencies 
const passport = require("../config/passport");
const isAuth = require("../config/middleware/isAuth");

// DB
const db = require("../models");

module.exports = function(app) {
   // checks if the user is authenticated 
   app.get("/auth", isAuth.isAuthenticated, function(req, res) {
      if (!req.user) res.redirect("/login");
      else res.json(true);
   });

   // authenticate user and redirect according to user type 
   app.post("/login", passport.authenticate("local"), function(req, res) {
      if (!req.user) {
         res.redirect("/login");
      }
   });
   
   // add new user 
   app.post("/signup", function (req, res) {
      db.User.create(req.body)
      .then(function(dbUser) {
         res.redirect(307, "/login");
      })
      .catch(function(err) {
         res.status(500).json(err);
      });
   });

   // returns the user profile dashboard 
   app.get("/profile", isAuth.isAuthenticated, function(req, res) {
      if 
   });
}