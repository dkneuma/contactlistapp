var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//var db = mongojs('contactlist',['contactlist']);
//var db = mongojs("mongodb://admin:nimda~1@ds043329.mongolab.com:43329/contactlist",['contactlist']);
//var contactlist = db.collection("contactlist");

mongoose.connect('mongodb://localhost/contactlistapp', function(err) {
   if(err) {
       console.log('connection error', err);
   } else {
       console.log('connection successful');
   }
});

var ContactListSchema = new mongoose.Schema({
   Name: String,
    Email: String,
    Number: String
});

var ContactList = mongoose.model('ContactList', ContactListSchema);

var app = express();

app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

app.get('/contactlist', function (req, res) {
    console.log("I received a GET request");

    ContactList.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
    });
});

app.post('/contactlist', function (req, res) {
    console.log("I received a POST request");
    console.log(req.body);
    ContactList.create(req.body, function(err, post){
       if (err) return err;
        res.json(post);
    });
});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
     });
});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log('Called edit:' + id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);

    });
});

app.put('/contactlist/:id', function (req, res) {
   var id = req.params.id;
    console.log('Called put:' + req.body.Name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {Name: req.body.Name, Email: req.body.Email, Number: req.body.Number}} ,
        new: true }, function (err, doc) {
            res.json(doc);
        });
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
