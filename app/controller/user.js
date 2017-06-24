function authenticateViaJWT(req, res) {

    let User = require('../models/user');
    let jwt = require('jsonwebtoken');
    let app = req.app;

    User.findOne({
        "local.email": req.body.email
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (!user.validPassword(req.body.password)) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, process.env.SECRET, {
                    expiresIn : 60*60*24
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
}

function getUsers(req, res) {
    try{
        let User = require('../models/user');
        User.find({},{ }, function (err, response) {
            if(err){
                res.render('error.ejs', {
                    error : err.message
                });
            } else{
                res.render('profile.ejs', {
                    signedUser: req.user,
                    user : response,
                });
            }
        })
    } catch(err){
        res.render('error.ejs', {
            error : err.message
        });
    }
}

function addFriend(req, res) {
    try{
        let ObjectID = require('mongodb').ObjectID;
        let userId = req.params.userId;
        let User = require('../models/user');

        function addFriendId(){
            return new Promise((resolve, reject)=>{
                User.update({
                        _id: ObjectID(req.user._id + "")
                    },
                    {
                        $push: {
                            friendIds: userId
                        }
                    },{}, (err, response)=>{
                        if(err){
                            reject(err);
                        } else{
                            resolve({});
                        }
                    })
            })
        }

        function updateFriendsId(){
            return new Promise((resolve, reject)=>{
                User.update({
                        _id: ObjectID(userId)
                    },
                    {
                        $push: {
                            friendIds: req.user._id + ""
                        }
                    },{}, (err, response)=>{
                        if(err){
                            reject(err);
                        } else{
                            resolve({});
                        }
                    })
            })
        }

        addFriendId()
            .then(updateFriendsId)
            .then(()=>{
                res.redirect('/profile');
            })
            .catch((error)=>{
                res.render('error.ejs', {
                    error : err.message // get the user out of session and pass to template
                });
            })

    } catch(error){
        res.render('error.ejs', {
            error : err.message
        });
    }
}

module.exports = {
    authenticateViaJWT: authenticateViaJWT,
    getUsers: getUsers,
    addFriend: addFriend
}