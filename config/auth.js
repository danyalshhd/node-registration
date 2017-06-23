module.exports = {

    'facebookAuth': {
        'clientID': '272249696514441', // your App ID
        'clientSecret': 'ba8a5f838bdbdfca00e793b3ab530561', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    },
    smtpConfig: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'nodetest6@gmail.com',
            pass: 'Nodetest^'
        }
    }
}