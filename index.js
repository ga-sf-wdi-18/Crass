//INDEX.JS

var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	bcrypt = require('bcrypt'),
	db = require('./models'),
	session = require('express-session');

app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.use(session({
	secret: 'SUPER STUFF',
	resave: false,
	saveUninitialized: true
}));

var views = path.join(__dirname, 'views');
app.use(express.static("public"));
app.use(express.static("bower_components"));

var loginHelpers = function (req, res, next) {

	req.login = function (user) {
		req.session.userId = user._id;
		req.user = user;
		return user;
	};

	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	}

	req.currentUser = function (cb) {
		var userId = req.session.userId;
		db.User.
			findOne({
				_id: userId
			}, cb);
	}

	// VERY IMPORTANT TO CONTINUE
	next();
};

app.use(loginHelpers);

app.get('/', function (req, res) {
	var homePath = path.join(views, 'index.html');
	res.sendFile(homePath);
})

app.listen(3000, function () {
	console.log('RENT APP 3000');
})
