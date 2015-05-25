var markerPlace = "";

$(function () {

  var $sidebar = $('#left');
  var $sidebarButtons = $('.sidebarButtons');
  var $modalButton = $('#modalActivateButton');
  //Hide Onload
  $modalButton.hide();
  var $addressBox = $('#left h3')
  //Hide Onload
  $addressBox.hide();

   $sidebar.click(function () {
    console.log('assigned');
  })

  //google.maps.event.addDomListener(window, 'load', initialize);

  initialize();

 function initialize () {
  console.log('hit initialize');

  var mapOptions = {
    center: new google.maps.LatLng(37.803220, -122.370758),
    maxZoom: 16
  };

  var startLat = 37.803220;
  var startLong = -122.370758;

  var south = 37.732895;
  var west = -122.434014;
  var north = 37.871814;
  var east = -122.273756;

  var markers = [];

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

   var defaultBounds = new google.maps.LatLngBounds(
       new google.maps.LatLng(south, west),
       new google.maps.LatLng(north, east));
   map.fitBounds(defaultBounds);

   // var point = new google.maps.LatLng(41.3, -96);
   // var marker = new google.maps.Marker({

   //                                      position: point,
   //                                      map: map

   //                                      })

  // Create the search box and link it to the UI element.
  var input = (document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  var searchBox = new google.maps.places.SearchBox((input));

  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
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
        placeId: place.place_id
      });

      markerPlace = marker.placeId;
      console.log('TRYING BELOW');
      console.log(markerPlace);

      //fill markers array with current FINISHED search
      markers.push(marker);

      // if (markers.length > 1) {
      //   markers.splice(1, markers.length-1);
      // }

      //fade in Address above button with marker address info
      $addressBox.html(marker.title).fadeIn(1000);
      //fade in modalButton to post about the address
      $modalButton.fadeIn(1000);

      //Limit Modal title to current marker.title only
      $('#myModalLabel').html(marker.title);


      var $placeIDform = $('#placeIDbox')
      $placeIDform.val(markerPlace);

      

      //console.log(markers + ' here are the markers');
      for(var i = 0; i < markers.length; i++) {
        console.log(markers[i].placeId)
      }


      //////////////////////////////////////////////////////

      $.get('/posts', {place_id: marker.placeId} , function (json) {
              console.log(json + 'dataaaaa');

              var matchedPlaces = [];
              
              for (var i = 0; i < json.length; i ++) {
                if (json[i].place_id === marker.placeId) {
                  console.log ('Success!');
                  matchedPlaces.push(json[i]);
                }
              }

              //Template the matches from the markers Array into the sidebar
              var render = function (items, parentId, templateId) {
              console.log('rendering' + items)

              var template = _.template($('#' + templateId).html());
              $('#' + parentId).prepend(template({collection: items}));
              }

              console.log('checking markers' + markers);
              
              var postArray = [];
              console.log(postArray)

              function logEach(v,i, arr) {
                console.log(v);
                //VISIBLE PLACE ID BELOW
                //postArray.push(v['place_id']);
                //postArray.push( 'Address : ' + marker.title)
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
              }//END logEach function

              matchedPlaces.forEach(logEach)

              console.log(postArray,  ' the post array');

              render(postArray, 'sidebar-wrapper', 'sidebar-template');

              //console.log(matchedPlaces[0]['place_id'], 'individual');
        })

      bounds.extend(place.geometry.location);

      //MARKER EVENT LISTENER
      google.maps.event.addListener(marker, 'click', function() {
        console.log('event' + event.target);
        console.log(marker.title);
        console.log(marker.position);
        console.log(marker.placeId + 'place IDDDD') 
        console.log(marker.id);
        console.log('clicked marker')
        map.setZoom(mapOptions.maxZoom);
        map.setCenter(marker.getPosition());

        // $.get('/posts', {place_id: marker.placeId} , function (json) {
        //       console.log(json + 'dataaaaa');

        //       var matchedPlaces = [];
              
        //       for (var i = 0; i < json.length; i ++) {
        //         if (json[i].place_id === marker.placeId) {
        //           console.log ('Success!');
        //           matchedPlaces.push(json[i]);
        //         }
        //       }

        //       //Template the markers Array into the sidebar
        //       var render = function (items, parentId, templateId) {
        //       console.log('rendering' + items)

        //       var template = _.template($('#' + templateId).html());
        //       $('#' + parentId).prepend(template({collection: items}));
        //       }

        //       console.log('checking markers' + markers);
        //       console.log(markers);

        //       //TURNED OFF TEMPLATING OF ADDRESS TO SIDEBAR
        //       //render(markers, 'sidebar-wrapper', 'sidebar-template');
              
        //       var postArray = [];
        //       console.log(postArray)

        //       matchedPlaces.forEach(logEach)

        //       function logEach(v,i, arr) {
        //         console.log(v);
        //         //postArray.push(v['place_id']);
        //         postArray.push( 'Move-in Year : ' + v['moveInYear']);
        //         postArray.push( 'Monthly Rent : ' + v['monthlyRent']);
        //         postArray.push( 'Bedrooms : ' + v['bedrooms']);
        //       }

        //       console.log(postArray);

        //       render(postArray, 'sidebar-wrapper', 'sidebar-template');

        //       //console.log(matchedPlaces[0]['place_id'], 'individual');
        // })


      });


    }

    // //Template the markers Array into the sidebar
    // var render = function (items, parentId, templateId) {
    // console.log('rendering' + items)
    // var template = _.template($('#' + templateId).html());
    // $('#' + parentId).prepend(template({collection: items}));
    // }
    // console.log('checking markers' + markers);
    // console.log(markers);
    // render(markers, 'sidebar-wrapper', 'sidebar-template');


    //CURRENTLY PUTS ALL MARKER INFO INTO EACH MODAL, MAYBE NOT FOR EACH?  MAYBE LINK DIRECTLY TO DB?
    //Template the MODAL 
  

    var renderModalPlaceID = function (items, parentId, templateId) {
    console.log('rendering MODALS' + items)
    var template = _.template($('#' + templateId).html());
    $('#' + parentId).prepend(template({collection: items}));
    }
    console.log('checking markers for MODALS' + markers);
    console.log(markers);

    renderModalTitle(markers, 'placeID', 'modal-placeID-template');


    map.fitBounds(bounds);
  });
  //End Search EventListener



  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    console.log('bounds changed');
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });

}

setTimeout(hype, 1000);


}); //End JQUERY

