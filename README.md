A friend list application using NodeJs, MongoDB, JWT (JSON web tokens)

* sends email when signup
* facebook integration for registration
* JWT token verification with the loggedIn user can be checked by loging in the system and hit
  the button User Detail which will open an alert box giving email and name of user currently logged in
  by giving the token

## Install
To install the dependencies:

    npm install
    populate environment variables "sessionSecret" and "SECRET" with some random alphabetical values
    Environment variables can be exported in the project directory by
       Linux:  export sessionSecret=randomValue
       Windows: set sessionSecret=helloworld

## Start Server
To start the server:

    npm start

#Run following on the browser

    http://localhost:8080/

##Run following for tests:<br>

    npm test


## Directory Structure
The code structure is as follows:

    /app
        /controller
            email.js
            user.js
        /models
            user.js
    	routes       ---routes to link with controllers
	/config
		auth.js      ---authentication for smtp and facebook
		database.js  ---database url
		passport.js  ---passport strategies
    /views
    	error.ejs    ---incase if there is eroor
         index.ejs
         login.ejs
         profile.ejs
         signup.ejs
     /test
        UserTest     ---mocha tests
    .gitignore
    package.json
    README.md
    server.sj


