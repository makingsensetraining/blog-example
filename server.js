var express = require('express');
var uuid = require('uuid');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose   = require('mongoose');
var app = express();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//===========================PASSPORT===============================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === "admin" && password === "admin") // stupid example
            return done(null, {name: "admin"});

        return done(null, false, { message: 'Incorrect username.' });
    }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};



var postSchema = new mongoose.Schema({
    _id: String,
    title: {type: String},
    text: {type: String}
}).pre('save', function (next) {
    if (this._id === undefined) {
        this._id = uuid.v1();
    }
    next();
});

var posts = mongoose.model('singlePost', postSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// _____________________________________________________________________________________________________

app.get("/", function (req, res) {
    res.redirect("/index.html");
});


// get all posts
app.get('/api/myPosts', auth, function (req, res) {
    posts.find(function (err, myPosts) {
        if (err) return console.error(err);
        res.send(myPosts);
    });
});

//get a particular post by ID
app.get('/api/myPosts/:id', auth, function (req, res) {
    posts.findOne({_id: req.params.id}, function (err, selPost) {
        if (err) return res.json(400, err);
        res.send(selPost);
    });
});

// create a new post
app.post('/newPost', auth, function (req, res) {
    var newPost = new posts({
        title: req.body.title,
        text: req.body.text
    });
    newPost.save( function(err, result){
        if (err) return res.send(400, err);
        res.send(result);
    });
});

// update a created post
app.put('/editPost/:id', auth, function (req, res) {

    posts.findOne({_id: req.params.id}, function (err, selPost) {
        selPost.title = req.body.title;
        selPost.text = req.body.text;

        selPost.save( function(err, result){
            if (err) return res.send(400, err);
            res.send(result);
        });
    });
});

// delete a particular post
app.delete('/delete/:id', auth, function (req, res) {
    posts.remove({_id: req.params.id}, function (err) {
        if (err) return res.send(400, err);
        res.send(true);
    });
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){
    req.logOut();
    res.send(200);
});

// _____________________________________________________________________________________________________ 

// Mongoose connection to MongoDB
mongoose.connect('mongodb://blog:1qaz2wsx@ds043082.mongolab.com:43082/blog', function (error) {
    if (error)return console.log(error);

    var server = app.listen(process.env.PORT || 3000, function () {
        console.log('Express: listening port: ', server.address().port);
    });

});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

