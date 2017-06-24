let events = require('events');
let eventEmitter = new events.EventEmitter();

eventEmitter.on("sendEmail", (email, done, newUser) => {
    try{
        if (email == undefined || email == "") {
            return done(null, newUser);
        } else {
            const nodemailer = require('nodemailer');
            const config = require("../../config/auth");
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(config.smtpConfig);

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"" <' + email + '>', // sender address
                to: email, // list of receivers
                subject: 'Registration', // Subject line
                text: email + 'signed up at node-registration app', // plain text body
                html: '<b>' + email + ' signed up at node-registration app</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return done(error);
                } else {
                    return done(null, newUser);
                }
            });
        }
    } catch(error){
        return done(error);
    }
});

module.exports = eventEmitter;