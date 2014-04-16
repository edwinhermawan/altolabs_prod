$(function() {
  var geoSuccessHandler = function (position) {
      console.log(position.coords.accuracy)
      console.log("Please be accurate")
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;

      geocoder = new google.maps.Geocoder();

      var latlng = new google.maps.LatLng(lat, lng);

      geocoder.geocode({'latLng': latlng}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {

                  $('.fa-crosshairs').removeClass('fa-spin');
                  console.log("remove spinning");
                  // Give me address in multiple objects
                  var addressComponents = results[0].address_components;

                  // Give me street address. I.e. 20 Orchard Street
                  var address = addressComponents[0].long_name + " " + addressComponents[1].long_name;
                  $(".address").val(address);

                  // Give me city. I.e. New York
                  var city = addressComponents[3].long_name;
                  $(".city").val(city);

                  // Give me Zip Code. I.e. 10002
                  var zipCode = addressComponents[7].long_name;
                  $(".zipCode").val(zipCode);

                  // Give me the Country. I.e. United States
                  var country = addressComponents[6].long_name;
                  $(".country").val(country);
              } else {
                  alert("Geocoder failed due to: " + status);
              }
          }
      });
  };

  $('.geoLocator').on("click", function () {
      navigator.geolocation.getCurrentPosition(geoSuccessHandler, null, {enableHighAccuracy: true});
      $(this).find('i').toggleClass('fa-spin');
  });


  // Checkbox Click
  $(".addOn").click(function () {
      if ($(this).find('i').hasClass('fa-square-o')) {
          $(this).find('i').removeClass('fa-square-o').addClass('fa-check-square-o');
      }
      else {
          $(this).find('i').removeClass('fa-check-square-o').addClass('fa-square-o');
      }
  });

  // Country Selector
  (function ($) {
      $(function () {
          $('select').selectToAutocomplete();
          // $('form').submit(function () {
          //     alert($(this).serialize());
          //     return false;
          // });
      });
  })(jQuery);

  // Shipping form validation
  
  // JS for aptNumber font-icon placeholder
  $('#aptNumber').on('keyup', function () {
      var input = $(this);
      if (input.val().length === 0) {
          input.addClass('empty');
      } else {
          input.removeClass('empty');
      }
  });

  // Clear input fields when you click 'x'
  function tog(v) {
      return v ? 'addClass' : 'removeClass';
  }
  $(document).on('input', '.clearable',function () {
      $(this)[tog(this.value)]('x');
  }).on('mousemove', '.x',function (e) {
      $(this)[tog(this.offsetWidth - 18 < e.clientX - this.getBoundingClientRect().left)]('onX');
  }).on('click', '.onX', function () {
      $(this).removeClass('x onX').val('');
  });

  // Hide Shipping information and show credit card inputs
  $('#customButton').on('click', function(){
    $('#shippingForm').hide();
    $('#creditCardForm').show();
  })

  // isMobile checks if the device is a mobile device
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

  if (isMobile) {
      // Change the size of the modal window if user agent if mobile
      // $('#myModal').removeClass('tiny').addClass('medium');
  }
});
