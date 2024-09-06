

const express                 = require("express"),
mongoose                = require("mongoose"),
passport                = require("passport"),
bodyParser              = require("body-parser"),
User                    = require("../models/user"),
LocalStrategy           = require("passport-local"),
passportLocalMongoose   = require("passport-local-mongoose");

var app = express();
const router = express.Router();


//handling user sign up
router.post("/register", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
   if(err){
        console.log(err);
        return res.render('signup');
    } //user stragety
    passport.authenticate("local")(req, res, function(){
        res.redirect("/courses"); //once the user sign up
   }); 
});
});

// Login Routes

router.get("/login", function(req, res){
res.render("login");

});

router.get("/register", function(req, res){
    res.render("signup");
    
});

// middleware
router.post("/login", passport.authenticate("local",{
successRedirect:"/courses",
failureRedirect:"/login"
}),function(req, res){
res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
req.logout();
res.redirect("/");
});


// function isLoggedIn(req, res, next){
// if(req.isAuthenticated()){
//     return next();
// }
// res.redirect("/api/users/login");
// }



module.exports = router; 