const express = require('express');
const app = express();

var path = require("path");
app.use(express.static( __dirname + '/public/dist/public' ));

var session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

var bodyParser  = require('body-parser');
app.use(bodyParser.json()); 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors', { useNewUrlParser: true });

const flash = require('express-flash');
app.use(flash());

app.use(express.static( __dirname + '/public/dist/public' ));

var AuthorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: 3, 
        required: true,
        errorMessage: 'Name must be 3 or more characters' 
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});
var Author = mongoose.model('authors', AuthorSchema);

app.get('/authors', function(req, res) {
    Author.find({}, function (err, authors) {
        if (err){
            console.log(err);
            res.json({msg: "Couldn't get authors!"});
        } else {
            res.json({authors: authors});
        }
    });
});

app.get('/authors/:id', function(req, res) {
    Author.find({_id: req.params.id}, function (err, author) {
        if (err){
            console.log(err);
            res.json({msg: "Couldn't find author!"});
        } else {
            res.json({author: author});
        }
    });
});

app.post('/authors', function(req, res) {
    var author = new Author();
    author.name = req.body.author_name;
    author.save(function(err) {
        if(err) {
            res.json({msg: "Couldn't create new author!"});
            console.log(err);
        } else { 
            res.json({msg: "Success!"});
        }
    })
});

app.put('/authors/:id', function(req, res) {
    Author.findOneAndUpdate({_id: req.body.updatedAuthor._id}, {name: req.body.updatedAuthor.name, updated_at: new Date()}, function (err, author) {
        if (err){
            res.json({msg: "Couldn't update author!"});
            console.log(err);
        } else {
            res.json({msg: "Success!"});
        }
    })
});


app.delete('/authors/:id', function(req, res) {
    Author.deleteOne({_id: req.params.id}, function (err) {
        if (err){
            console.log(err);
            res.json({msg: "Couldn't delete author!"});
        } else {
            res.json({msg: "Success!"});
        }
    });
});

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
});