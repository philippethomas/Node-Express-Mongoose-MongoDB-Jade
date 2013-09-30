
/*
 * GET home page.
 */
var mongoose = require('mongoose');

db = mongoose.connection;

var contactSchema = mongoose.Schema({
    name: String,
    age: Number,
    address: String
})

var Contact = mongoose.model('contacts', contactSchema);

mongoose.connect('mongodb://localhost/sampleDB');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Your connection is open, punk!');
});

exports.index = function(req, res){
  res.render('index', { title: 'Having fun with Node, Express, MongoDB, Jade and Monk' });
};

exports.newuser = function(req, res){
    res.render('newuser', { title: 'New User' });
};

exports.adduser = function(req, res) {

    var name = req.body.name;
    var address = req.body.address;
    var age = req.body.age;

    console.log('name is: ' + name)
    console.log('address is: ' + address)
    console.log('age is: ' + age)

    var newContact = new Contact({name: name, address: address, age: age})

    newContact.save(function(err){
        if(err){
            console.log('Error saving doc');
        } else {
            res.redirect('allusers');
        }
    })

}

exports.allusers = function(req, res){
    Contact.find({}, function (error, docs) {
        res.render('allusers', { title: 'All User', docs: docs });
        console.log(docs)
    });
};

exports.edituser = function(req, res){
    var nameToBeChanged = req.body.name;
    console.log('nameToBeChanged: ' + nameToBeChanged);

    var newName = req.body.newName,
        newAddress = req.body.newAddress,
        newAge = req.body.newAge;


    Contact.update({name: nameToBeChanged}, {$set: {name: newName, address: newAddress, age: newAge}}, function(err, docs){
        res.redirect('allusers');
    });

}

