

$(function () {

  var $sidebar = $('#left');
  var $sidebarButtons = $('.sidebarButtons');

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
    for (var i = 0, place; place = places[i]; i++) {
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


      //fill markers array with current successful search
      markers.push(marker);

      //console.log(markers + ' here are the markers');
      for(var i = 0; i < markers.length; i++) {
        console.log(markers[i].placeId)
      }



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



        $.get('/posts')
      });
    }

    //Template the markers Array into the sidebar
    var render = function (items, parentId, templateId) {
    console.log('rendering' + items)
    var template = _.template($('#' + templateId).html());
    $('#' + parentId).prepend(template({collection: items}));
    }
    console.log('checking markers' + markers);
    console.log(markers);
    render(markers, 'sidebar-wrapper', 'sidebar-template');


    //CURRENTLY PUTS ALL MARKER INFO INTO EACH MODAL, MAYBE NOT FOR EACH?  MAYBE LINK DIRECTLY TO DB?
    //Template the MODAL 
    var renderModalTitle = function (items, parentId, templateId) {
    console.log('rendering MODALS' + items)
    var template = _.template($('#' + templateId).html());
    $('#' + parentId).prepend(template({collection: items}));
    }
    console.log('checking markers for MODALS' + markers);
    console.log(markers);

    renderModalTitle(markers, 'myModalLabel', 'modal-title-template');

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

