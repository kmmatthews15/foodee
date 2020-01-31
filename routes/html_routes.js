const isAuth = require("../config/middleware/isAuth");

module.exports = function (app) {
   // homepage (index)...this will have the initial page where you can either signin or take the quiz 
   app.get('/', function (req, res) {
      res.render('index');
   });

   // renders the quiz page after clicking the get started button on the landing page
   app.get('/quiz', function (req, res) {
      res.render('quiz');
   });

   // renders the signup page for users 
   app.get('/signup', function (req, res) {
      if (!req.user)
         res.render('signup');
      else res.redirect('/UserProfile');
   });

   // renders the user profile page...or the dashboard
   app.get('/userProfile', function (req, res) {
      res.render('userProfile');
   });

   // renders the login page 
   app.get('/login', function (req, res) {
      if (!req.user)
         res.render('login');
      else res.redirect('/profile');
   });

   // renders the about page 
   app.get('/about', function (req, res) {
      res.render('about');
   });

   // renders the main dashboard 
   app.get('/account', function (req, res) {
      res.render('account');
   })

   // renders the recipe book page
   app.get('./recipebook', function (req, res) {
      res.render('recipebook');
   });

   // renders  the search recipe page 
   app.get('./searchrecipe', function (req, res) {
      res.render('searchrecipe');
   })

   app.get('/userProfileUpdate', function (req, res) {
      res.render('userProfileUpdate');
   });

   // logout 
   app.get('/logout', isAuth.destroySession);
};