var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 
const jwt = require('express-jwt');

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

var session = require('express-session');
var db = require('./models/db.js');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({
  extended: false
}));// Body parser use JSON data

// authentication middleware
const auth = jwt({secret: 'somesuperdupersecret'})

//if(GLOBAL.SQLpool === undefined){
//	GLOBAL.SQLpool = db.createPool(); //create a global sql pool connection
//} 

app.use(require('./controllers'));


app.post('/login', (req, res) => {
    const user = await User.findOne({ where: { req.body.email } })

	if (!user) {
		throw new Error('No user with that email')
	}

	const valid = await bcrypt.compare(req.body.password, user.password)

	if (!valid) {
		throw new Error('Incorrect password')
	}

	// signin user and generate a jwt
	const token = jsonwebtoken.sign({
		id: user.id,
		email: user.email
	}, 'somesuperdupersecret', { expiresIn: '1y' })

	// return json web token
	res.json({
		message: 'Authentication successful!',
		data: token
	})
})

//Unsecured endpoint
app.get('/comments', (req, res) => {
	res.json('All comments')
});

    // secured endpoint
app.post('/comments/create', auth, (req, res) => {
	  // return error if user is not authenticated
	  if (!req.user){
		return res.status(401).send('You are not authorized')
	  };

	  // create comment
	  // const comment = {...}

	  //res.json({
		//message: 'Comment created!',
		//data: comment
	  //})
});
//app.listen('3000', function(){
//	console.log("Connected on port 3000.");
//});

