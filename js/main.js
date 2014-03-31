var geoSuccessHandler = function (position) { 
	console.log(position.coords.accuracy)
	console.log("Please be accurate")
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;

  geocoder = new google.maps.Geocoder();

	var latlng = new google.maps.LatLng(lat, lng);

	geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {

      	// Give me address in multiple objects
        var addressComponents = results[0].address_components;

        // Give me street address. I.e. 20 Orchard Street
				var address = addressComponents[0].long_name + " " + addressComponents[1].long_name;
				$(".address").text(address);

				// Give me city. I.e. New York
				var city = addressComponents[3].long_name;
				$(".city").text(city);

				// Give me Zip Code. I.e. 10002
				var zipCode = addressComponents[7].long_name;
				$(".zipCode").text(zipCode);
				console.log("I've been updated on server!")
	    } else {
		      alert("Geocoder failed due to: " + status);
	    }
	  }
	});
};

navigator.geolocation.getCurrentPosition(geoSuccessHandler, null, {enableHighAccuracy: true});
