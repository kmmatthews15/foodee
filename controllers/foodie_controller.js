// Dependencies 
const isAuth = require("../config/middleware/isAuth");

// DB 
const db = require("../models");

module.exports = function (app) {
   // add a new recipe to the dashboard 
   app.post("/recipe", function (req, res) {
      req.body.recipebook = true;
      db.User.create(req.body).then(function (dbUser) {
         req.body.UserId = dbUser.id;
         db.Recipe.create(req.body)
            .then(function (dbRecipe) {
               req.body.RecipeId = dbRecipe.id;
               db.Description.create(req.body).then(function () {
                  db.Instruction.create(req.body).then(function () {
                     res.redirect(307, "index");
                  });
               });
            })
            .catch(function (err) {
               res.status(500).json(err);
            });
      });
   });

   // returns all of the recipes 
   app.get("/api/recipes", isAuth.isAuthenticated, function (req, res) {
      db.Recipe.findAll({
         attributes: {
            exclude: ["ingredients", "UserId"]
         },
         include: [db.Description]
      }).then(function (dbRecipe) {
         res.json(dbRecipe);
      });
   });

   // returns the recipes on the recipebook page
   app.get("/profile/recipe/:id", isAuth.isAuthenticated, function (req, res) {
      db.Recipe.findOne({
         where: {
            id: req.params.id
         }
      }).then(function (dbRecipe) {
         let hbsObj = {
            recipe: dbRecipe
         };
         res.render("recipebook", hbsObj);
      });
   });
};