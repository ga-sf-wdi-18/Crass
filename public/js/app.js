//APP.JS

var $modalButton = $('#pencilDiv');
      //Hide Onload
      $modalButton.hide();

var hype = function () {

	var $sidebar = $('#left');

	var $postForm = $('#post-form');

	var $postTemp = _.template($("#modal-title-template").html())

	var $placeIDform = $('#placeIDbox')
	//hide onload
	$placeIDform.hide();




	var $modal = $('#basicModal');

	// wait for the form to submit
  	$postForm.on("submit", function (e) {
    // prevent the page from reloading
    e.preventDefault();
    var postData = $postForm.serialize();
    console.log('serializing ' + postData);

    // Post.create(postParams);
    $postForm[0].reset();

    $('.modal').slideUp().fadeOut(300);
    $('div.modal-backdrop').fadeOut(500);

    //POST form data
    //THIS WORKS NO TOUCHIE!
    $.post("/posts", postData).
      done(function (data) {
      	console.log(data);
      });
  	}); // END SUBMIT

  	// function Post() {};

  	// Post.create = function (postParams) {
  	// 	$.post('/posts', postParams).done(function(res) {
  	// 		//once done re-render all posts
  	// 		//STILL NEED TO BUILD THIS  Posts.all();
  	// 	})
  	// }


};//end JQuery

