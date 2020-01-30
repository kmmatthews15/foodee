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
      db.User.findOne({
         where: {
            email: req.user.email
         }
      }).then(function(dbUser) {
         const hbsObj = {
            user: dbUser
         };
         res.render("userProfile", hbsObj);
      });
   });

   // update user profile 
   app.put("/userProfileUpdate", function(req, res) {
      db.User.update(
         {
            name: req.body.name, 
            email: req.body.email
         },
         {
            where: {
               id: req.user.id
            }
         }
      );
   });

   app.get("/api/user_data", function(req, res) {
      if(!req.user) {
         res.join({});
      } else {
         res.json({
            email: req.user.email, 
            id: req.user.id, 
            name: req.user.name
         });
      }
   });
};