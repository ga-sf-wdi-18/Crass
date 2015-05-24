//APP.JS

var hype = function () {

	var $sidebar = $('#left');

	var $postForm = $('#post-form');

	var $postTemp = _.template($("#modal-title-template").html())

	//initialize();

	// $sidebar.on('click', function (event) {
	// 	console.log('clicked' + event.target);
	// })

  //   $postForm.click( function () {
  //   	console.log('clicked');
  //   })

	  // wait for the form to submit
  	$postForm.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();
    var postData = $postForm.serialize();
    console.log('serializing ' + postData);

    // Post.create(postParams);
    $postForm[0].reset();

    //POST form data
    //THIS WORKS BUT DOESNT RESET FORM ON DONE
    $.post("/posts", postData).
      done(function (data) {
      	console.log(data);
      	 });
        // reset the form
        // using brackets separates the raw DOM object from the jquery magic
        //$postForm[0].reset();

    //     //  var $post = $($postTemp(data));

    //     // console.log($post + 'is post');

    //     // add id to $phrase
    //      //$post.data("place_id", data._id);  // <---- change to _id
     
  }); // END SUBMIT

  	// function Post() {};

  	// Post.create = function (postParams) {
  	// 	$.post('/posts', postParams).done(function(res) {
  	// 		//once done re-render all posts
  	// 		//STILL NEED TO BUILD THIS  Posts.all();
  	// 	})
  	// }




  	// $.get('/posts').
  	// 		done(function (data) {
  	// 			console.log(data);
  	// 			console.log(data.bedrooms);

  	// 			$(data).each(function (index, post) {
  	// 				console.log(post.bedrooms)
  	// 				$sidebar.append('<div'> + post.bedrooms + '</div>');
  	// 			});
  	// 		});




    




};//end JQuery

