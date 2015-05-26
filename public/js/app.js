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

	var $postalCodeform = $('#postalCodebox');
	//hide onload
    $postalCodeform.hide();

	var $addressBox = $('#addressDiv')
    //Hide Onload
    $addressBox.hide();

    
    $loginModal = $('#loginModal');
    $loginModal.click( function () {
      console.log('CLICKED DA MODAL');
    })
    var modaloptions = {
          backdrop : "static",
          show : true
            }


    //IF NOT USER RUN THIS, MUST CHECK FOR SESSION/COOKIE
    window.setTimeout(function () {
    	$loginModal.modal(modaloptions);

    }, 1000);

    ///////////////LOGIN/SIGNUP--FORM////////////////////

    $loginForm = $('#login-form');
    
    $loginForm.on('submit', function (e) {
    	e.preventDefault();

    	var loginData = $loginForm.serialize();
    	console.log('serializing login data' + loginData);

    	//$loginForm[0].reset();

    	//POST THE LOGIN DATA
    	$.post('/login', loginData, console.log('CHECKING LOGIN')).
    		done(function (data) {
    			console.log('LOGIN SUCCESS');
    			$('.modal').slideUp().fadeOut(300);
    			$('div.modal-backdrop').fadeOut(500);
    		}).fail(function () {
    			alert('DIDNT WORK');
    		});
    	});
    

    $signupForm = $('#register-form');
    $signupPassword = $('#signupPassword');
    $confirmPassword = $('#confirmSignupPassword');
    
    $signupForm.on('submit', function (e) {
    	e.preventDefault();

    	if ($signupPassword.val() !== $confirmPassword.val()) {
    		alert('SHIT DONT MATCH');
    		return;
    	}

    	var signupData = $signupForm.serialize();
    	console.log('serializing signup data' + signupData);

    	//$signupForm[0].reset();

    	//POST THE SIGNUP DATA
    	$.post('/users', signupData, console.log('CHECKING SIGNUP')).
    		done(function (data) {
    			console.log( ' SIGNED UP');
    			$('.modal').slideUp().fadeOut(300);
    			$('div.modal-backdrop').fadeOut(500);
    		}).fail(function () {
    			console.log('ILLEGAL SIGNUP');
    			//put div error here
    		});
    	});


    ////////////////////////////////////////////////////

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

  	//Begin Login Modal


  	$('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});



  	// function Post() {};

  	// Post.create = function (postParams) {
  	// 	$.post('/posts', postParams).done(function(res) {
  	// 		//once done re-render all posts
  	// 		//STILL NEED TO BUILD THIS  Posts.all();
  	// 	})
  	// }


};//end JQuery

