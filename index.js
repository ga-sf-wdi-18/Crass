//INDEX.JS

var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	bcrypt = require('bcrypt'),
	db = require('./models'),
	session = require('express-session'),
	_ = require('underscore');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
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
		console.log('in login session id');
		req.session.userId = user._id;
		console.log(user._id);
		console.log(req.session.userId, 'SESSION ID');
		req.user = user;
		return user;
	};

	req.logout = function () {
		req.session.userId = null;
		req.user = null;
	}

	req.currentUser = function (cb) {
		var userId = req.session.userId;
		console.log('in current user session id')
		console.log('here it is the id from req.current ' + userId);
		db.User.
			findOne({
				_id: userId
			}, function (err, user) {
				req.user = user;
				cb(null, user);
			})
	};
	// VERY IMPORTANT TO CONTINUE
	next();
};

app.use(loginHelpers);

app.get('/', function (req, res) {
	console.log(req.cookies);
	var homePath = path.join(views, 'index.html');
	req.currentUser(function() {
		res.sendFile(homePath);
	});
});

app.get('/posts', function (req, res) {
	db.Post.find({},
		function (err, posts) {
			console.log('getting posts ' + posts);
			res.send(posts);
		});
});

app.post('/posts', function (req, res) {
	var newPost = req.body.post;
	db.Post.create(newPost);
	console.log('creating ' + newPost);
	//option to view individual post upon successful
	//res.send(JSON.stringify(newPost));
});

app.get('/api/posts/place_id/', function (req, res) {
	//access:   http://localhost:3000/api/posts/place_id/?place_id=ChIJq0_vfZuAhYARfc1D_0lxmEw
	var place_id = req.query.place_id;
	
	if (place_id !== undefined) {
		db.Post.find({ place_id:  place_id},
		function (err, posts) {
			res.send(posts);
			return;
		});
	} 
});

app.get('/api/posts/zip/', function (req, res) {
	//access:   http://localhost:3000/api/posts/zip/?zip=94103
	var postalCode = req.query.zip;

 	if (postalCode !== undefined) {
		db.Post.find({ postalCode: postalCode},
		function (err, posts) {
			res.send(posts);
		});
	}
});

app.get('/api/posts/rent/', function (req, res) {
	//access:   http://localhost:3000/api/posts/zip/?rent=3200
	var monthlyRent = req.query.rent;

 	if (monthlyRent !== undefined) {
		db.Post.find({ monthlyRent: monthlyRent},
		function (err, posts) {
			res.send(posts);
		});
	}
});

app.get('/api/posts/year/', function (req, res) {
	//access:   http://localhost:3000/api/posts/zip/?rent=3200
	var moveInYear = req.query.year;

 	if (moveInYear !== undefined) {
		db.Post.find({ moveInYear: moveInYear},
		function (err, posts) {
			res.send(posts);
		});
	}
});

////////////////////////////////////////////////

app.get('/users', function (req, res) {
	db.User.find({},
		function (err, users) {
			// console.log('here are YO USERS ' + users);
			res.send('BAHAHA YEA RITE');
		});
});

app.post('/users', function (req, res) {
	var newUser = req.body.user;
	console.log(newUser + ' this is the newUser');
	db.User.
	//newUser is first param, anon function is the callback to execute once createSecure finishes
	createSecure(newUser, function (err, user) {
		if (user) {
			req.login(user);
			res.send('CONGRATS' + user + ' you SIGNED UP');
		} else {
			res.send('NOPE SIGNUP DIDNT WORK');
		}
	});
});

app.get('/login', function (req, res) {
	//NOT SURE IF WE NEED THIS?
});

app.post('/login', function (req, res) {
	var user = req.body.user;
	console.log(user + '  THIS is the user for LOGIN POST');

	db.User.authenticate(user, function (err, user) {
		console.log('made it to authenticate');
		if (!err) {
			req.login(user);
			req.currentUser(function () {
				console.log('HERE');
			})
			res.redirect('/');
		} else {
			res.send('ERROR LOGIN NO GO');
		}
	});
});


app.listen(3000, function () {
	console.log('RENT APP 3000');
})
