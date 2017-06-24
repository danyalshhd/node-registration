
function getUsers(req, res) {
    try{
        let User = require('../models/user');
        let jwt = require('jsonwebtoken');
        let token = "";
        let queryToken = req.query.token;

        if(queryToken == null) {
            token = jwt.sign(req.user, process.env.SECRET, {
                expiresIn: 60 * 60 * 24
            });
        }else{
            token = queryToken;
        }

        User.find({},{ }, function (err, response) {
            if(err){
                res.render('error.ejs', {
                    error : err.message
                });
            } else{
                 res.render('profile.ejs', {
                    signedUser: req.user,
                    user : response,
                    token: token
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
        let token = req.body.token;

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
                res.redirect('/profile?token=' + token);
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

function userDetailToken(req, res){
    try{
        let jwt = require('jsonwebtoken');
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    res.status(200).json({success: true, user: decoded});
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    } catch(err){
        res.render('error.ejs', {
            error : err.message
        });
    }
}

module.exports = {
    getUsers: getUsers,
    addFriend: addFriend,
    userDetailToken: userDetailToken
}