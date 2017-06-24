module.exports = function(app, passport) {

    //region Login
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //endregion

    //region Signup
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //endregion

    //region Facebook Registration
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    //endregion

    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    //region LandingPage,Add Friend
    app.get('/profile', isLoggedIn, require("./controller/user").getUsers);
    app.post('/user/:userId/addFriend', isLoggedIn, require("./controller/user").addFriend);

    //endregion

    //region LogOut
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    //endregion

    //region JWT

    app.post('/user/detail', require("./controller/user").userDetailToken);

    //endregion


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

