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

  // Credit Card Slide Left

  // // Once you enter 16 characters, it should slide left and show ExpDate
  // $("#cardNumber").on('keypress', function(){
  // 	var vallength = $(this).val().length;

  // 	if (vallength == 15){
  //       // $('#expDate').css('display','block').trigger("focus");
  //       $('#expDate').css('display','block').focus().select();
  //       console.log("Reached 16")
  //   }
  // })

  // // Once you enter 4 characters, it shoudl slide right and show CVC
  // $("#expDate").on('keypress', function(){
  // 	var vallength = $(this).val().length;

  // 	if (vallength == 3){
  //       $('#cvc').css('display','block').trigger("focus");
  //       console.log("Reached cvc")
  //   }
  // })

  // // If you backspace to length=0 in CVC then it should hide CVC and go back to expDate
  // $('#cvc').keyup(function(e){
  // 	var vallength = $(this).val().length;

  // 	if(e.keyCode == 8 && vallength == 0){
  // 		$(this).css('display', 'none');
  // 		// $("#expDate").trigger("focus").select();
  // 		$("#expDate").focus().select();
  // 	}
  // })

  // // If you backspace to length=0 in expDate then it should hide expDate and go back to cardNumber
  // $('#expDate').keyup(function(e){
  // 	var vallength = $(this).val().length;

  // 	if(e.keyCode == 8 && vallength == 0){
  // 		$(this).css('display', 'none');
  // 		// $("#cardNumber").trigger("focus").select();
  // 		$("#cardNumber").focus().select();
  // 	}
  // })

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
  $("#shippingForm").validate({
    errorPlacement: function(error, element) {
      // error.appendTo( element.parent("td").next("td") );
    },
    errorClass: "invalidInput", 
    submitHandler: function(form) {
          alert( "Valid: " + form.valid() );  }
  });


  // Credit Card Input Begins

  // Formats the credit card input in with spaces every 4 digits an fires off the getCardNumber function
  $("#newCardNumber").mask("9999 9999 9999 9999", {placeholder: " ", completed: getCardNumber
  });

  // Puts user inputed card number into "Card Number" field below, adds slide effect, and clears out the field
  function getCardNumber() {
      var valid = $.payment.validateCardNumber($(this).val());
      if (valid) {
          var cardType = $.payment.cardType($(this).val());
          $(".card-type").text(cardType);
          // Show card number below the input field
          $('.dmitrysCardNumberContainer').removeClass('hidden');
          // Puts card number from input field into '.dmitrysCardNumber' div
          $('.dmitrysCardNumber').text($(this).val());
          // Clear out card number and put in clean expiration date
          $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
              $(this).val('');
              $(this).css('margin-left', '0px');
              // Replace input field with new placeholder and fires off getExpDate function
              $(this).siblings('label').text("Expiration Date");
              $(this).mask("99/99", {placeholder: " ", completed: getExpDate
              });
              $(this).attr('placeholder', 'MM/YY');
          });
      } else {
          // todo replace with actual warning like you want it to be. tooltip or what
           alert('Your card is not valid!');

      }
  }

  // Puts user inputed expiration date into "Expiration Date" field and has slide effect
  function getExpDate() {
      // Show Expiration Date field and expiration date below the input field
      $('.dmitrysExpDateContainer').removeClass('hidden');
      // Puts Expiratoin Date from input field into '.dmitrysExpDate' div
      $('.dmitrysExpDate').text($(this).val());
      // Clear out exp date and put in clean cvc field
      $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
          $(this).val('');
          $(this).css('margin-left', '0px');
          // Clear out expDate and put in clean cvc
          $(this).siblings('label').text("CVC");
          $(this).mask("999", {placeholder: " ", completed: getCvc});
          $(this).attr('placeholder', 'CVC');
      });
  }

  function getCvc() {
      $('.dmitrysCvcContainer').removeClass('hidden');
      $('.dmitrysCvc').text($(this).val());
  }

  // User can edit Card Number, ExpDate, and CVC numbers inline after they input them
  var replaceWith = $('<input name="temp" type="text" />');

  $('.dmitrysCardNumber').inlineEdit(replaceWith, "9999 9999 9999 9999");
  $('.dmitrysExpDate').inlineEdit(replaceWith, "99/99");
  $('.dmitrysCvc').inlineEdit(replaceWith, "999");

  // Allow user to edit inline when they click pencil icon as well as when they click on the input field
  $('.fa-pencil').on('click', function () {
      $(this).siblings("div").click()
  });

  // Credit Card Validation

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

  // isMobile checks if the device is a mobile device
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

  if (isMobile) {
      // Change the size of the modal window if user agent if mobile
      // $('#myModal').removeClass('tiny').addClass('medium');
  }
});
