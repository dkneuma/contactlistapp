var express = require("express");
var app = express();

app.use(express.static('public'));

app.get('/contactlist', function (req, res) {
    console.log("I received a GET request");

    var person1 = {
        name: "Tim",
        email: "tim@email1.com",
        number: "(111) 111-1111"
    };
    var person2 = {
        name: "Emily",
        email: "emily@email2.com",
        number: "(222) 222-2222"
    };
    var person3 = {
        name: "John",
        email: "john@email3.com",
        number: "(333) 333-3333"
    };

    var contactlist = [person1,person2, person3];
    res.json(contactlist);
});

app.listen(3000);
console.log("Server listening on 3000");
