
require('dotenv').config();

var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")
    
var app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret:"Rusty is the best og in the worldpassport ",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine','ejs');
//
app.use(passport.initialize());
app.use(passport.session());
// 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",function(req,res){
    res.render("homepage");
});

app.get("/kids",function(req,res){
    res.render("indexKIDS");
});
// app.get("/home",function(req,res){
//     res.render("index");
// });

app.get("/adults",function(req,res){
    res.render("indexADULTS");
});

app.get("/midaged",function(req,res){
    res.render("indexMIDAGED");
});

app.get("/old",function(req,res){
    res.render("indexOLD");
});

function isLoggedIn(req, res, next){
    // console.log(req);
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/api/users/login");
}

app.get("/courses"  , function(req, res){
    res.render("courses.ejs");
});

app.get("/resources", function(req, res){
    res.render("resources.ejs");
});


app.get("/games", function(req, res){
    res.render("games.ejs");
});

app.get("/gamesmid", function(req, res){
    res.render("gamesmid.ejs");
});

app.get("/silk", function(req, res){
    res.render("games/weavesilk.ejs");
});

app.get("/noisless", function(req, res){
    res.render("games/noisless.ejs");
});

app.get("/arrange", function(req, res){
    res.render("games/arrange.ejs");
});

app.get("/memory", function(req, res){
    res.render("games/memory.ejs");
});



app.get("/leftright", function(req, res){
    res.render("games/leftright.ejs");
});

app.get("/quiz", function(req, res){
    res.render("games/quiz.ejs");
});

app.get("/sinuous", function(req, res){
    res.render("games/sinuous.ejs");
});

app.get("/colors", function(req, res){
    res.render("games/colors.ejs");
});

app.get("/chess", function(req, res){
    res.render("games/chess.ejs");
});

app.get("/gamesAdults", function(req, res){
    res.render("gamesAdults.ejs");
});

app.get("/mood", function(req, res){
    res.render("moodTracker");
});

app.get("/therapyKids", function(req, res){
    res.render("therapists/kidstherapy.ejs");
});
app.get("/therapyAdults", function(req, res){
    res.render("therapists/therapyadults.ejs");
});
app.get("/therapymid", function(req, res){
    res.render("therapists/therapymid.ejs");
});
app.get("/therapyold", function(req, res){
    res.render("therapists/therapyold.ejs");
});

// app.get("/meditation", function(req, res){
//     res.render("meditation.ejs");
// });

app.get("/readadults", function(req, res){
    res.render("adultsreadmore.ejs");
});
app.get("/readkids", function(req, res){
    res.render("kidsreadmore.ejs");
});

app.get("/readold", function(req, res){
    res.render("oldreadmore.ejs");
});    

app.get("/readmidaged", function(req, res){
    res.render("midagedreadmore.ejs");
});   


app.get("/meditation", function(req, res){
    res.render("meditation/index");
});

/// Auth Routes
app.use('/api/users', require('./routes/users'));


app.listen(3000, function(){
    console.log("connect!");
});