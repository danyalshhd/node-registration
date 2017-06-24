A friend list application using NodeJs, MongoDB, JWT (JSON web tokens)

* sends email when signup
* facebook integration for registration

## Install
To install the dependencies:

    npm install
    populate environment variables "sessionSecret" and "SECRET" with some random alphabetical values
    Environment variables can be exported in the project directory by
       Linux:  export sessionSecret=randomValue
       Windows: enter command 'node' press enter, and then set by process.env.sessionSecret='randomValue'

## Start Server
To start the server:

    npm start

##Example
Run following example commands for each of the questions:<br>

    http://localhost:8080/

##Test
Run following commands for running tests:<br>

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


