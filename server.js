var express = require("express"),
    app = express()
var _ = require("underscore");
var mongoose = require('mongoose');
var uuid = require('uuid');


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

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
});

// _____________________________________________________________________________________________________

app.get("/", function (req, res) {
    res.redirect("/index.html");
});


// get all posts
app.get('/api/myPosts', function (req, res) {
    posts.find(function (err, myPosts) {
        if (err) return console.error(err);
        res.send(myPosts);
    });
});

//get a particular post by ID
app.get('/api/myPosts/:id', function (req, res) {
    posts.findOne({_id: req.params.id}, function (err, selPost) {
        if (err) return res.json(400, err);
        res.send(selPost);
    });
});

// create a new post
app.post('/newPost', function (req, res) {
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
app.put('/editPost/:id', function (req, res) {
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
app.delete('/delete/:id', function (req, res) {
    posts.remove({_id: req.params.id}, function (err) {
        if (err) return handleError(err);
        res.send(true);
    });
});

// _____________________________________________________________________________________________________ 

// Mongoose connection to MongoDB
mongoose.connect('mongodb://localhost/test', function (error) {
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

