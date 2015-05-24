//MODELS INDEX

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rent_app');
var Schema = mongoose.Schema;

module.exports.User = require('./user');


//POST MODEL
var postSchema = new Schema({

					place_id: {
						type: String,
						required: false
					},
					moveInYear: {
						type: Number,
						required: true
					},
					monthlyRent: {
						type: Number,
						required: true
					},
					bedrooms: {
						type: Number,
						required: true
					},
					shared: {
						type: Boolean,
						required: false
					},
					allowsDogs: {
						type: Boolean,
						required: false,
						default: null
					},
					allowsCats: {
						type: Boolean,
						required: false,
						default: null
					}
				});

//BUILDING MODEL
var buildingSchema =  new Schema({
							place_id: {
								type: Number,
								required: true,
								index: {
							       unique: true
								}
							},
							address: {
								type: String,
								required: true
							},
							posts: [postSchema]

});

var Post = mongoose.model('Post', postSchema);
var Building = mongoose.model('Building', buildingSchema);


module.exports.Building = Building;
module.exports.Post = Post;


// Close connection on close
process.on('SIGINT', function() {
  console.log('About to exit...');
  mongoose.disconnect(function(){
    console.log("Disconnected DB")
    process.exit(); // now exit the node app
  });
});