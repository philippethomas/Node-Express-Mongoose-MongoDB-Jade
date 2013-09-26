
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Having fun with Node, Express, MongoDB, Jade and Monk' });
};

exports.allusers = function(db){
  return function(req, res){
      var collection = db.get('books');
      collection.find({}, {}, function(e, docs){
          res.render('allusers', {
              entries: docs,
              title: 'My Contacts'
          });
      });
  }
};

exports.newuser = function(req, res){
    res.render('newuser', { title: 'New User' });
};

exports.adduser = function(db) {
    return function(req, res){
        var collection = db.get('books');
        var name = req.body.name;
        var address = req.body.address;
        var age = req.body.age;

        collection.insert({name: name, address: address, age: age}, function(e, docs){
            if (e) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, forward to success page
                res.redirect('/allusers');
            }
        });
    }
}