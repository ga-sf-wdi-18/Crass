//APP.JS

var hype = function () {

	var $sidebar = $('#left');
	var $postForm = $('#post-form');
	var $postTemp = _.template($("#modal-title-template").html())

	//initialize();

	// $sidebar.on('click', function (event) {
	// 	console.log('clicked' + event.target);
	// })

	  // wait for the form to submit
  	$postForm.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();
    $postForm[0].reset();
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
	
	 // $.post('/buildings', placeId).
  //               done(function (data) {
  //                 console.log(data);




  //               });



    




};//end JQuery

