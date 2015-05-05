var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");
var db = mongojs('contactlist',['contactlist']);
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
    console.log("I received a GET request");


    db.contactlist.find(function (err, docs) {
        console.log(docs);
        res.json(docs);

    });
});

app.post('/contactlist', function (req, res) {
    console.log("I received a POST request");
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
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


app.listen(3000);
console.log("Server listening on 3000");
