// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
// one way to implement middleware for authenticating users w/ login
// /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-
var authenticate = require('../app/Authenticate.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

// any route that requires a login authentication
module.exports = function(app, models) {
    console.log('login controller loaded.');

    app.post('/signin', function(req, res) {
        models.userID.findOne({ where: { username: req.body.userName } })
            .then(function(loginUser) {
                console.log(JSON.stringify(loginUser, null, 2));
                if (loginUser !== null) {
                    // var auth = authenticate(req.body.password, loginUser.password);
                    // console.log('auth is: ' + auth);
                    bcrypt.compare(req.body.password, loginUser.password, function(err, result) {
                        console.log(result);
                        if (result === true) {
                            console.log('login successful');
                            res.redirect('/squad');
                        } else {
                            console.log('login failed');
                        }
                    });
                } else {
                    console.log('no user found');
                }
            })
    });
    // res.send('login successful');
    // checkAuth(data);

    app.post('/signup', function(req, res) {
        models.userID.findOne({ where: { username: req.body.userName } })
            .then(function(duplicateUser) {
                console.log("Duplicate user: " + JSON.stringify(duplicateUser));
                if (duplicateUser) {
                    // window.alert('Please select a different user name!');
                    res.redirect('/signup');
                } else {


                    console.log('signing up!');
                    var hashedPassword = bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        if (err) {
                            throw err;
                        } else {
                            var hashedPassword = hash;
                        };
                        console.log(hashedPassword);

                        models.userID.create({
                            // name: req.body.name,
                            username: req.body.userName,
                            password: hashedPassword
                        })
                    });
                    res.end('{"done" : "Updated Successfully", "status" : 200}');
                }
            })

    })
};

// login route
// app.post('/login', function(req, res) {
//     var post = req.body;
//     if (post.user === 'john' && post.password === 'password') {
//         req.session.user_id = johns_user_id_here;
//         res.redirect('/my_secret_page');
//     } else {
//         res.send('Bad user/pass');
//     }
// });

// logout route
// app.get('/logout', function(req, res) {
//     delete req.session.user_id;
//     res.redirect('/login');
// });
