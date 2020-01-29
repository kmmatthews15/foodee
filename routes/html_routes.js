const isAuth = require("../config/middleware/isAuth");

module.exports = function (app) {
   // homepage (index)
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

   app.get('/userProfile', function (req, res) {
      res.render('userProfile');
   });

   // renders the login page 
   app.get('/login', function (req, res) {
      if (!req.user) 
         res.render('login');
      else res.redirect('/profile');
   });

   app.get('/about', function (req, res) {
      res.render('about');
   });

   app.get('/userProfileUpdate', function (req, res) {
      res.render('userProfileUpdate');
   });

   // logout 
   app.get('/logout', isAuth.destroySession);
};