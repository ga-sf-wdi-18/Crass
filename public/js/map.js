//  Map.js  //

var searchbox;
var map;

$(function () {

  window.$sidebar = $('#left');
  window.$sidebarButtons = $('.sidebarButtons');
  window.$sidebarWrapper = $('#sidebar-wrapper');
  window.$postForm = $('#post-form');

  //google.maps.event.addDomListener(window, 'load', initialize);

  initialize();

  function initialize () {
   
    var startLat = 37.803220;
    var startLong = -122.370758;

    var mapOptions = {
      center: new google.maps.LatLng(startLat, startLong),
      maxZoom: 16
    };

    var south = 37.732895;
    var west = -122.434014;
    var north = 37.871814;
    var east = -122.273756;

    var markers = [];

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var styles = [
              {
                stylers: [
                  { hue: "#00ffe6" },
                  { saturation: -20 }
                ]
              },{
                featureType: "road",
                elementType: "geometry",
                stylers: [
                  { lightness: 100 },
                  { visibility: "simplified" }
                ]
              },{
                featureType: "road",
                elementType: "labels",
                stylers: [
                  { visibility: "off" }
                ]
              }
    ];

    map.setOptions({styles: styles});

    var defaultBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng(south, west),
     new google.maps.LatLng(north, east)
    );

    map.fitBounds(defaultBounds);

    // Create the search box and link it to the UI element.
    var input = (document.getElementById('pac-input'));
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

    searchBox = new google.maps.places.SearchBox((input));

      ////////////////////////////////////////////////////////////////////////////////////////
      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
    google.maps.event.addListener(searchBox, 'places_changed', function() {
      $sidebarWrapper.html('').hide();
        
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }
      // For each place, get the icon, place name, and location.
      var bounds = new google.maps.LatLngBounds();
      //remove <1 to get full list of matched
      for (var i = 0, place; place = places[i], i < 1; i++) {

          var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
          var marker = new google.maps.Marker({
          map: map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
          placeId: place.place_id,
          formatted_address: place.formatted_address,
          postalCode: place.address_components[7]['short_name'] 
        });

        ///////////////////////////

        //fill markers array with current FINISHED search
        markers.push(marker);

        var $addressBox = $('#addressDiv');
        //fade in Address above button with marker address info
        $addressBox.html(marker.title).fadeIn(1000);
        //fade in modalButton to post about the address
        $modalButton.fadeIn(1000);

        //Limit Modal title to current marker.title only
        $('#myModalLabel').html(marker.formatted_address);
        var addy = $('#myModalLabel').html();

        ///   Fill and hide elements for new post   ///
        var markerPlace = marker.placeId;
        var markerPostalCode = marker.postalCode;
        var markerLat = marker.position.A;
        var markerLon = marker.position.F;

        var $markerLatform = $('#latBox');
        $markerLatform.val(markerLat);
        var $markerLonform = $('#lonBox');
        $markerLonform.val(markerLon);

        var $placeIDform = $('#placeIDbox');
        $placeIDform.val(markerPlace);

        var $addressform = $('#addressBox');
        $addressform.val(addy);

        var $postalCodeform = $('#postalCodebox');
        $postalCodeform.val(markerPostalCode);

   //////////////////////////////////////////////
      //   renderCloseMarkers(marker);

      //   var markerPlaces = [];
      //   var newMarkers = [];
      //   var idArray = [];

      //   function renderCloseMarkers(marker) {

      //       $.getJSON('/posts', {postalCode: marker.postalCode} , function (json) {
 
      //          for (var i = 0; i < json.length; i ++) {
      //              markerPlaces.unshift(json[i]);    
      //          }

      //          console.log(markerPlaces + ' HERES MARKERPLACES');

      //          function grabEach(v,i,arr) {
      //           var miniArray = [v['lat'], v['long']];
      //           newMarkers.push(miniArray);
      //           idArray.push(v['place_id']);
      //          }

      //          markerPlaces.forEach(grabEach);

      //           console.log(idArray);

      //         for (var i = 0; i < newMarkers.length ; i++) {
      //           // console.log('now going through ' + i + ' times')
      //           var dropLat = newMarkers[i][0];
      //           var dropLon = newMarkers[i][1];  

      //           var myLatlng = new google.maps.LatLng(dropLat,dropLon);

      //           var marker = new google.maps.Marker({
      //               position: myLatlng,
      //               icon: image,
      //              // placeId: marker.place_id,
      //               map: map
      //             });

      //           google.maps.event.addListener(marker, 'click', function() {
      //             console.log('CLICKED');
      //             console.log(this);
      //           });

      //         }

      //       }).done();
      //       //END AJAX
      //   }
      //   //End renderCloseMarkers
      //   //empty the arrays to prepare for next search
      // markerPlaces = [];
      // newMarkers=[];

      //////////////////////////////////////////////////////

        renderNewPost(marker);

        // wait for the form to submit
        $postForm.on("submit", function(e){
          // prevent the page from reloading
          e.preventDefault();
          onPostFormSubmit(marker)

        }); 

        bounds.extend(place.geometry.location);

        //MARKER EVENT LISTENER
        google.maps.event.addListener(marker, 'click', function() {
          map.setZoom(mapOptions.maxZoom);
          map.setCenter(marker.getPosition());
          console.log('CLICKED');
        });

    }
    //End Places/Marker Loop

    //AutoZoom the map on search Submit
    map.fitBounds(bounds);

  });
  //End Search EventListener

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    // do something only the first time the map is loaded
    appInit();
  });

  } 
  //END Initialize

}); 
//End JQUERY


function onPostFormSubmit(marker){
    var postData = $postForm.serialize();
    $postForm[0].reset();

    $('.modal').slideUp().fadeOut(300);
    $('div.modal-backdrop').fadeOut(500);

    $sidebarWrapper.html('');

    //POST form data
    $.post("/posts", postData);
    renderNewPost(marker);
    $sidebarWrapper.hide().fadeIn(1800);
   
}

// function clearForm() {
//    $postForm[0].reset();
// }

function renderNewPost(marker) {

  $.get('/posts', {place_id: marker.placeId} , function (json) {

    var matchedPlaces = [];
          
    for (var i = 0; i < json.length; i ++) {
      if (json[i].place_id === marker.placeId) {
        matchedPlaces.unshift(json[i]);
      }
    }

    var matchedPlacesLength = matchedPlaces.length;

    //Template the matches from the markers Array into the sidebar
    var render = function (items, parentId, templateId) {
      var template = _.template($('#' + templateId).html());
      $('#' + parentId).prepend(template({collection: items}));
    }
    
    var postArray = [];

    function logEach(v,i, arr) {
      //VISIBLE PLACE ID BELOW, can also push address
      //postArray.push(v['place_id']);
      postArray.push( 'Move-in Year : ' + v['moveInYear']);
      postArray.push( 'Monthly Rent : ' + '$' + v['monthlyRent']);
      postArray.push( 'Bedrooms : ' + v['bedrooms']);

      //Check to see the value of unrequired form fields and push if not null, otherwise, update HTML
            
      if (v['shared'] === true) {
        postArray.push( 'Shared : ' + 'Yes');
      } else {
        postArray.push( 'Shared : ' + 'No');
      }
      
      if (v['allowsDogs'] !== null) {
        if (v['allowsDogs'] === true) {
          postArray.push( 'Allowed Dogs : ' + 'Yes');
        } else {
          postArray.push( 'Allowed Dogs : ' + 'No');
        }
      }

      if (v['allowsCats'] !== null) {
        if (v['allowsCats'] === true) {
          postArray.push( 'Allowed Cats : ' + 'Yes');
        } else {
          postArray.push( 'Allowed Cats : ' + 'No');
        }
      }
      var linebreak = '<hr>';
      postArray.push(linebreak);
    }
    //END logEach function

    matchedPlaces.forEach(logEach)

    render(postArray, 'sidebar-wrapper', 'sidebar-template');

    $sidebarWrapper.fadeIn(1000);

    var emptyMessage = "<hr> There's no data regarding this address, how about posting yours anonymously?"

    if (postArray.length === 0) {
      $sidebarWrapper.html(emptyMessage).hide().fadeIn(600);
    }

    });
    //END AJAX Request

  }
  //END renderNewPost
