function sendEmail(email) {
    return new Promise((resolve, reject) => {
        if(email == undefined || email == ""){
            resolve({});
        } else{
            const nodemailer = require('nodemailer');
            const config = require("../../config/auth");
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport(config.smtpConfig);

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"" <'+ email +'>', // sender address
                to: email, // list of receivers
                subject: 'Registration', // Subject line
                text: email + 'signed up at node-registration app', // plain text body
                html: '<b>' + email + ' signed up at node-registration app</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve('Message %s sent: %s', info.messageId, info.response);
                }
            });
        }
    })
}

module.exports = {
    sendEmail: sendEmail
}