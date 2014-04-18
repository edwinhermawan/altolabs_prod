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
   $('#shippingForm').bootstrapValidator();

  // Hide Shipping information and show credit card inputs
  $('#customButton').on('click', function(e){
    e.preventDefault();
    $('#shippingForm').hide();
    $('#creditCardForm').show();
  })
  
  // Credit Card Input Begins

  // Formats the credit card input in with spaces every 4 digits an fires off the getCardNumber function
  $("#newCardNumber").mask("9999 9999 9999 9999", {placeholder: " ", completed: getCardNumber
  });

  // Puts user inputed card number into "Card Number" field below, adds slide effect, and clears out the field
  function getCardNumber() {
      var valid = $.payment.validateCardNumber($(this).val());
      if (valid) {
          var cardArray = {};
          cardArray["visa"] = 'data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2017.1.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http%3A//www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20viewBox%3D%220.4%2043.8%2060%2040%22%20enable-background%3D%22new%200.4%2043.8%2060%2040%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpath%20fill%3D%22%23F3F4F4%22%20d%3D%22M60.4%2C78.8c0%2C2.8-2.2%2C5-5%2C5h-50c-2.8%2C0-5-2.2-5-5v-30c0-2.8%2C2.2-5%2C5-5h50c2.8%2C0%2C5%2C2.2%2C5%2C5V78.8z%22/%3E%0D%0A%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M1.4%2C53.8v-5c0-2.8%2C2.2-5%2C5-5h48c2.8%2C0%2C5%2C2.2%2C5%2C5v5%22/%3E%0D%0A%09%3Cpath%20fill%3D%22%23E6A124%22%20d%3D%22M59.4%2C73.8v5c0%2C2.8-2.2%2C4-5%2C4h-48c-2.8%2C0-5-1.2-5-4v-5%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M17.8%2C67.2c0.4-1.1%2C0.7-1.9%2C0.9-2.2l3.4-6.9h2.5l-5.8%2C11.4H16l-1-11.4h2.3l0.4%2C6.9c0%2C0.2%2C0%2C0.6%2C0%2C1%0D%0A%09%09%09C17.7%2C66.5%2C17.7%2C66.9%2C17.8%2C67.2L17.8%2C67.2z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M23.4%2C69.5l2.4-11.4h2.4l-2.4%2C11.4H23.4z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M35.6%2C66.1c0%2C1.1-0.4%2C1.9-1.2%2C2.6c-0.8%2C0.6-1.8%2C0.9-3.1%2C0.9c-1.2%2C0-2.1-0.2-2.8-0.7v-2.1%0D%0A%09%09%09c1%2C0.6%2C1.9%2C0.8%2C2.8%2C0.8c0.6%2C0%2C1-0.1%2C1.4-0.3c0.3-0.2%2C0.5-0.5%2C0.5-0.9c0-0.2%2C0-0.4-0.1-0.6c-0.1-0.2-0.2-0.3-0.3-0.5%0D%0A%09%09%09c-0.1-0.1-0.5-0.4-1-0.8c-0.7-0.5-1.2-1-1.5-1.5c-0.3-0.5-0.4-1-0.4-1.6c0-0.7%2C0.2-1.3%2C0.5-1.8c0.3-0.5%2C0.8-0.9%2C1.4-1.2%0D%0A%09%09%09c0.6-0.3%2C1.3-0.4%2C2.1-0.4c1.1%2C0%2C2.2%2C0.3%2C3.1%2C0.8L36%2C60.5c-0.8-0.4-1.6-0.6-2.2-0.6c-0.4%2C0-0.8%2C0.1-1.1%2C0.4%0D%0A%09%09%09c-0.3%2C0.2-0.4%2C0.5-0.4%2C0.9c0%2C0.3%2C0.1%2C0.6%2C0.3%2C0.8c0.2%2C0.2%2C0.6%2C0.6%2C1.2%2C0.9c0.6%2C0.4%2C1.1%2C0.9%2C1.4%2C1.4C35.4%2C64.9%2C35.6%2C65.5%2C35.6%2C66.1%0D%0A%09%09%09z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M43.2%2C66.8h-3.7l-1.3%2C2.7h-2.5l6-11.5h2.9l1.1%2C11.5h-2.3L43.2%2C66.8z%20M43.1%2C64.8L42.9%2C62%0D%0A%09%09%09c-0.1-0.7-0.1-1.3-0.1-2v-0.3c-0.2%2C0.6-0.5%2C1.3-0.9%2C2l-1.5%2C3H43.1z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M30.4%2C43.8%22/%3E%0D%0A%09%3Cpath%20opacity%3D%224.000000e-02%22%20fill%3D%22%23FFFFFF%22%20enable-background%3D%22new%20%20%20%20%22%20d%3D%22M58.9%2C45.3c0.9%2C0.9%2C1.5%2C2.2%2C1.5%2C3.5v15v15%0D%0A%09%09c0%2C1.4-0.6%2C2.6-1.5%2C3.5s-2.2%2C1.5-3.5%2C1.5h-25h-25c-1.4%2C0-2.6-0.6-3.5-1.5L58.9%2C45.3z%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23F8F8F9%22%20d%3D%22M55.4%2C44.8c2.2%2C0%2C4%2C1.8%2C4%2C4v30c0%2C2.2-1.8%2C4-4%2C4h-50c-2.2%2C0-4-1.8-4-4v-30c0-2.2%2C1.8-4%2C4-4H55.4%20M55.4%2C43.8%0D%0A%09%09%09h-50c-2.8%2C0-5%2C2.2-5%2C5v30c0%2C2.8%2C2.2%2C5%2C5%2C5h50c2.8%2C0%2C5-2.2%2C5-5v-30C60.4%2C46%2C58.1%2C43.8%2C55.4%2C43.8L55.4%2C43.8z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%3C/g%3E%0D%0A%3C/svg%3E%0D%0A';
          cardArray["mastercard"] = 'data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2017.1.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http%3A//www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20viewBox%3D%220.4%2088%2060%2040%22%20enable-background%3D%22new%200.4%2088%2060%2040%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpath%20fill%3D%22%235565AF%22%20d%3D%22M60.4%2C123c0%2C2.8-2.2%2C5-5%2C5h-50c-2.8%2C0-5-2.2-5-5V93c0-2.8%2C2.2-5%2C5-5h50c2.8%2C0%2C5%2C2.2%2C5%2C5V123z%22/%3E%0D%0A%09%3Cpath%20opacity%3D%224.000000e-02%22%20fill%3D%22%23FFFFFF%22%20enable-background%3D%22new%20%20%20%20%22%20d%3D%22M58.9%2C89.5c0.9%2C0.9%2C1.5%2C2.2%2C1.5%2C3.5v15v15%0D%0A%09%09c0%2C1.4-0.6%2C2.6-1.5%2C3.5c-0.9%2C0.9-2.2%2C1.5-3.5%2C1.5h-25h-25c-1.4%2C0-2.6-0.6-3.5-1.5L58.9%2C89.5z%22/%3E%0D%0A%09%3Cpath%20fill%3D%22%2356B1D9%22%20d%3D%22M30.4%2C88%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23EA564B%22%20d%3D%22M30.4%2C101.4c-1.8-2.1-4.5-3.4-7.5-3.4c-5.5%2C0-10%2C4.5-10%2C10c0%2C5.5%2C4.5%2C10%2C10%2C10c3%2C0%2C5.7-1.3%2C7.5-3.4%0D%0A%09%09%09c-1.6-1.8-2.5-4.1-2.5-6.6S28.8%2C103.2%2C30.4%2C101.4z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23EA564B%22%20d%3D%22M30.4%2C101.4c-1.6%2C1.8-2.5%2C4.1-2.5%2C6.6s0.9%2C4.8%2C2.5%2C6.6c1.6-1.8%2C2.5-4.1%2C2.5-6.6S31.9%2C103.2%2C30.4%2C101.4z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%09%3Cpath%20fill%3D%22%23E9D419%22%20d%3D%22M37.9%2C98c-3%2C0-5.7%2C1.3-7.5%2C3.4c-0.4%2C0.5-0.8%2C1-1.1%2C1.6h2.3c0.4%2C0.6%2C0.6%2C1.3%2C0.9%2C2h-4%0D%0A%09%09c-0.2%2C0.6-0.4%2C1.3-0.4%2C2h4.9c0%2C0.3%2C0.1%2C0.7%2C0.1%2C1c0%2C0.3%2C0%2C0.7-0.1%2C1h-4.9c0.1%2C0.7%2C0.2%2C1.4%2C0.4%2C2h4.1c-0.2%2C0.7-0.5%2C1.4-0.9%2C2h-2.3%0D%0A%09%09c0.3%2C0.6%2C0.7%2C1.1%2C1.1%2C1.6c1.8%2C2.1%2C4.5%2C3.4%2C7.5%2C3.4c5.5%2C0%2C10-4.5%2C10-10C47.9%2C102.5%2C43.4%2C98%2C37.9%2C98z%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%237684B7%22%20d%3D%22M55.4%2C89c2.2%2C0%2C4%2C1.8%2C4%2C4v30c0%2C2.2-1.8%2C4-4%2C4h-50c-2.2%2C0-4-1.8-4-4V93c0-2.2%2C1.8-4%2C4-4H55.4%20M55.4%2C88h-50%0D%0A%09%09%09c-2.8%2C0-5%2C2.2-5%2C5v30c0%2C2.8%2C2.2%2C5%2C5%2C5h50c2.8%2C0%2C5-2.2%2C5-5V93C60.4%2C90.2%2C58.1%2C88%2C55.4%2C88L55.4%2C88z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%3C/g%3E%0D%0A%3C/svg%3E%0D%0A';
          cardArray["americanexpress"] = "data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2017.1.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http%3A//www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20viewBox%3D%220.1%20131.8%2060%2040%22%20enable-background%3D%22new%200.1%20131.8%2060%2040%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235EC1EC%22%20d%3D%22M60.1%2C166.8c0%2C2.8-2.2%2C5-5%2C5h-50c-2.8%2C0-5-2.2-5-5v-30c0-2.8%2C2.2-5%2C5-5h50c2.8%2C0%2C5%2C2.2%2C5%2C5V166.8z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%235BBBE6%22%20d%3D%22M58.6%2C133.3c0.9%2C0.9%2C1.5%2C2.2%2C1.5%2C3.5v15v15c0%2C1.4-0.6%2C2.6-1.5%2C3.5c-0.9%2C0.9-2.2%2C1.5-3.5%2C1.5h-25h-25%0D%0A%09%09%09c-1.4%2C0-2.6-0.6-3.5-1.5L58.6%2C133.3z%22/%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M17.7%2C156.7l-0.5-1.7h-3l-0.5%2C1.7H11l3-9.3h3.3l3.1%2C9.3H17.7z%20M16.7%2C152.9l-0.4-1.5%0D%0A%09%09%09%09c-0.1-0.3-0.2-0.8-0.3-1.3c-0.1-0.5-0.2-0.9-0.3-1.2c0%2C0.2-0.1%2C0.6-0.2%2C1.1s-0.4%2C1.5-0.7%2C2.9L16.7%2C152.9L16.7%2C152.9z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M25.5%2C156.7l-1.9-6.7h-0.1c0.1%2C1.1%2C0.1%2C2%2C0.1%2C2.7v4h-2.2v-9.3h3.3l1.9%2C6.6h0.1l1.9-6.6H32v9.3h-2.3v-4.1%0D%0A%09%09%09%09c0-0.2%2C0-0.4%2C0-0.7s0-0.9%2C0.1-1.9h-0.1l-1.9%2C6.7L25.5%2C156.7L25.5%2C156.7z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M39.2%2C156.7h-5.5v-9.3h5.5v2h-3v1.5H39v2h-2.8v1.8h3V156.7z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M49.2%2C156.7h-2.9l-1.8-2.9l-1.8%2C2.9h-2.8L43%2C152l-2.9-4.5h2.8l1.7%2C2.9l1.6-2.9H49l-2.9%2C4.7L49.2%2C156.7z%22%0D%0A%09%09%09%09/%3E%0D%0A%09%09%3C/g%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M17.7%2C156.7l-0.5-1.7h-3l-0.5%2C1.7H11l3-9.3h3.3l3.1%2C9.3H17.7z%20M16.7%2C152.9l-0.4-1.5%0D%0A%09%09%09%09c-0.1-0.3-0.2-0.8-0.3-1.3c-0.1-0.5-0.2-0.9-0.3-1.2c0%2C0.2-0.1%2C0.6-0.2%2C1.1s-0.4%2C1.5-0.7%2C2.9L16.7%2C152.9L16.7%2C152.9z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M25.5%2C156.7l-1.9-6.7h-0.1c0.1%2C1.1%2C0.1%2C2%2C0.1%2C2.7v4h-2.2v-9.3h3.3l1.9%2C6.6h0.1l1.9-6.6H32v9.3h-2.3v-4.1%0D%0A%09%09%09%09c0-0.2%2C0-0.4%2C0-0.7s0-0.9%2C0.1-1.9h-0.1l-1.9%2C6.7L25.5%2C156.7L25.5%2C156.7z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M39.2%2C156.7h-5.5v-9.3h5.5v2h-3v1.5H39v2h-2.8v1.8h3V156.7z%22/%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M49.2%2C156.7h-2.9l-1.8-2.9l-1.8%2C2.9h-2.8L43%2C152l-2.9-4.5h2.8l1.7%2C2.9l1.6-2.9H49l-2.9%2C4.7L49.2%2C156.7z%22%0D%0A%09%09%09%09/%3E%0D%0A%09%09%3C/g%3E%0D%0A%09%09%3Cpath%20fill%3D%22%2356B1D9%22%20d%3D%22M30.1%2C131.8%22/%3E%0D%0A%09%3C/g%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%239BCEE0%22%20d%3D%22M55.1%2C132.8c2.2%2C0%2C4%2C1.8%2C4%2C4v30c0%2C2.2-1.8%2C4-4%2C4h-50c-2.2%2C0-4-1.8-4-4v-30c0-2.2%2C1.8-4%2C4-4H55.1%0D%0A%09%09%09%20M55.1%2C131.8h-50c-2.8%2C0-5%2C2.2-5%2C5v30c0%2C2.8%2C2.2%2C5%2C5%2C5h50c2.8%2C0%2C5-2.2%2C5-5v-30C60.1%2C134%2C57.9%2C131.8%2C55.1%2C131.8L55.1%2C131.8z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%3C/g%3E%0D%0A%3C/svg%3E%0D%0A";
          cardArray["discover"] = 'data:image/svg+xml;charset=US-ASCII,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2017.1.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-//W3C//DTD%20SVG%201.1//EN%22%20%22http%3A//www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20viewBox%3D%220.1%20175.7%2060%2040%22%20enable-background%3D%22new%200.1%20175.7%2060%2040%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpath%20fill%3D%22%23FFF9F0%22%20d%3D%22M60.1%2C210.7c0%2C2.8-2.2%2C5-5%2C5h-50c-2.8%2C0-5-2.2-5-5v-30c0-2.8%2C2.2-5%2C5-5h50c2.8%2C0%2C5%2C2.2%2C5%2C5V210.7z%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M15.2%2C195.7c0%2C1-0.3%2C1.8-0.9%2C2.3c-0.6%2C0.5-1.4%2C0.8-2.5%2C0.8h-1.7v-6.1h1.9c1%2C0%2C1.8%2C0.3%2C2.3%2C0.8%0D%0A%09%09%09C15%2C194%2C15.2%2C194.7%2C15.2%2C195.7z%20M13.9%2C195.7c0-1.3-0.6-2-1.7-2h-0.7v4H12C13.3%2C197.7%2C13.9%2C197%2C13.9%2C195.7z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M16.3%2C198.8v-6.1h1.3v6.1H16.3z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M22.8%2C197.1c0%2C0.6-0.2%2C1-0.6%2C1.3c-0.4%2C0.3-0.9%2C0.5-1.6%2C0.5c-0.6%2C0-1.2-0.1-1.7-0.4v-1.2%0D%0A%09%09%09c0.4%2C0.2%2C0.8%2C0.3%2C1%2C0.4c0.3%2C0.1%2C0.5%2C0.1%2C0.8%2C0.1c0.3%2C0%2C0.5-0.1%2C0.7-0.2c0.1-0.1%2C0.2-0.3%2C0.2-0.5c0-0.1%2C0-0.2-0.1-0.3%0D%0A%09%09%09c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.4-0.2-0.8-0.4c-0.4-0.2-0.6-0.3-0.8-0.5c-0.2-0.2-0.3-0.3-0.4-0.6s-0.2-0.5-0.2-0.8%0D%0A%09%09%09c0-0.5%2C0.2-1%2C0.5-1.3c0.4-0.3%2C0.9-0.5%2C1.5-0.5c0.3%2C0%2C0.6%2C0%2C0.9%2C0.1c0.3%2C0.1%2C0.6%2C0.2%2C0.9%2C0.3l-0.4%2C1c-0.3-0.1-0.6-0.2-0.8-0.3%0D%0A%09%09%09c-0.2-0.1-0.4-0.1-0.6-0.1c-0.2%2C0-0.4%2C0.1-0.6%2C0.2c-0.1%2C0.1-0.2%2C0.3-0.2%2C0.4c0%2C0.1%2C0%2C0.2%2C0.1%2C0.3c0.1%2C0.1%2C0.1%2C0.2%2C0.3%2C0.2%0D%0A%09%09%09s0.4%2C0.2%2C0.8%2C0.4c0.6%2C0.3%2C1%2C0.5%2C1.2%2C0.8C22.6%2C196.3%2C22.8%2C196.7%2C22.8%2C197.1z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M26.4%2C193.7c-0.5%2C0-0.9%2C0.2-1.1%2C0.5c-0.3%2C0.4-0.4%2C0.9-0.4%2C1.5c0%2C1.4%2C0.5%2C2%2C1.5%2C2c0.4%2C0%2C0.9-0.1%2C1.6-0.3%0D%0A%09%09%09v1.1c-0.5%2C0.2-1.1%2C0.3-1.7%2C0.3c-0.9%2C0-1.6-0.3-2-0.8c-0.5-0.5-0.7-1.3-0.7-2.3c0-0.6%2C0.1-1.2%2C0.3-1.7c0.2-0.5%2C0.6-0.8%2C1-1.1%0D%0A%09%09%09c0.4-0.3%2C0.9-0.4%2C1.5-0.4c0.6%2C0%2C1.2%2C0.1%2C1.8%2C0.4l-0.4%2C1c-0.2-0.1-0.5-0.2-0.7-0.3C26.9%2C193.7%2C26.7%2C193.7%2C26.4%2C193.7z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M38.3%2C192.7h1.3l-2.1%2C6.1h-1.4l-2.1-6.1h1.3l1.1%2C3.6c0.1%2C0.2%2C0.1%2C0.5%2C0.2%2C0.7c0.1%2C0.3%2C0.1%2C0.5%2C0.1%2C0.6%0D%0A%09%09%09c0-0.3%2C0.1-0.7%2C0.3-1.3L38.3%2C192.7z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M43.9%2C198.8h-3.5v-6.1h3.5v1.1h-2.2v1.3h2.1v1.1h-2.1v1.6h2.2V198.8z%22/%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23414042%22%20d%3D%22M46.5%2C196.4v2.3h-1.3v-6.1h1.8c0.8%2C0%2C1.4%2C0.1%2C1.8%2C0.5c0.4%2C0.3%2C0.6%2C0.8%2C0.6%2C1.4c0%2C0.4-0.1%2C0.7-0.3%2C1%0D%0A%09%09%09c-0.2%2C0.3-0.5%2C0.5-0.8%2C0.7c0.9%2C1.4%2C1.5%2C2.3%2C1.8%2C2.6h-1.4l-1.5-2.3L46.5%2C196.4L46.5%2C196.4z%20M46.5%2C195.4h0.4c0.4%2C0%2C0.7-0.1%2C0.9-0.2%0D%0A%09%09%09c0.2-0.1%2C0.3-0.4%2C0.3-0.6c0-0.3-0.1-0.5-0.3-0.6s-0.5-0.2-0.9-0.2h-0.4L46.5%2C195.4L46.5%2C195.4z%22/%3E%0D%0A%09%09%3Ccircle%20fill%3D%22%23E6A124%22%20cx%3D%2231.2%22%20cy%3D%22195.7%22%20r%3D%223%22/%3E%0D%0A%09%3C/g%3E%0D%0A%09%3Cpath%20fill%3D%22%23E6A124%22%20d%3D%22M60.1%2C203.2v7.5c0%2C0.7-0.1%2C1.3-0.4%2C1.9c-0.3%2C0.6-0.6%2C1.1-1.1%2C1.6s-1%2C0.8-1.6%2C1.1c-0.6%2C0.3-1.3%2C0.4-1.9%2C0.4%0D%0A%09%09H32.7H10.2L60.1%2C203.2z%22/%3E%0D%0A%09%3Cpath%20opacity%3D%228.000000e-02%22%20fill%3D%22%23FFFFFF%22%20enable-background%3D%22new%20%20%20%20%22%20d%3D%22M58.6%2C177.2c0.9%2C0.9%2C1.5%2C2.2%2C1.5%2C3.5v15v15%0D%0A%09%09c0%2C1.4-0.6%2C2.6-1.5%2C3.5c-0.9%2C0.9-2.2%2C1.5-3.5%2C1.5h-25h-25c-1.4%2C0-2.6-0.6-3.5-1.5L58.6%2C177.2z%22/%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cpath%20fill%3D%22%23F7F5F2%22%20d%3D%22M55.1%2C176.7c2.2%2C0%2C4%2C1.8%2C4%2C4v30c0%2C2.2-1.8%2C4-4%2C4h-50c-2.2%2C0-4-1.8-4-4v-30c0-2.2%2C1.8-4%2C4-4H55.1%0D%0A%09%09%09%20M55.1%2C175.7h-50c-2.8%2C0-5%2C2.2-5%2C5v30c0%2C2.8%2C2.2%2C5%2C5%2C5h50c2.8%2C0%2C5-2.2%2C5-5v-30C60.1%2C178%2C57.9%2C175.7%2C55.1%2C175.7L55.1%2C175.7z%22/%3E%0D%0A%09%3C/g%3E%0D%0A%3C/g%3E%0D%0A%3C/svg%3E%0D%0A';

          var cardType = $.payment.cardType($(this).val());
          console.log(cardType);

          $("#dmitrysCardNumberIcon").css('background-image', "url("+cardArray[cardType]+")");
          // Show card number below the input field
          $('.dmitrysCardNumberContainer').removeClass('hidden');
          // Puts card number from input field into '.dmitrysCardNumber' div
          $('.dmitrysCardNumber').text($(this).val());
          // Clear out card number and put in clean expiration date
          // $(this).css('width', '100%');
          $(this).parent('div').removeClass('has-error shake');
          $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
              $(this).val('');
              $(this).css('margin-left', '0px');
              $(this).css('width', '83.33%');
              // Replace input field with new placeholder and fires off getExpDate function
              $(this).closest('div').siblings('label').text("Expiration Date");
              $(this).mask("99/99", {placeholder: " ", completed: getExpDate
              });
              $(this).attr('placeholder', 'MM/YY');
          });
      } else {
          $(this).parent('div').addClass('has-error shake');

      }
  }

  // Puts user inputed expiration date into "Expiration Date" field and has slide effect
  function getExpDate() {
      // Show Expiration Date field and expiration date below the input field
      var cardExpObj = $.payment.cardExpiryVal($(this).val());
      var valid = $.payment.validateCardExpiry(cardExpObj.month, cardExpObj.year);
      if (valid) {
          $('.dmitrysExpDateContainer').removeClass('hidden');
          // Puts Expiratoin Date from input field into '.dmitrysExpDate' div
          $('.dmitrysExpDate').text($(this).val());
          // $(this).css('width', '150%');
          $(this).siblings('span').css('background', 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDMwOC43IDYwIDQwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMzA4LjcgNjAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNDRENEQ0QiIGQ9Ik02MCwzNDMuN2MwLDIuOC0yLjIsNS01LDVINWMtMi44LDAtNS0yLjItNS01di0zMGMwLTIuOCwyLjItNSw1LTVoNTBjMi44LDAsNSwyLjIsNSw1VjM0My43eiIvPg0KCTwvZz4NCgk8cmVjdCB4PSIxLjgiIHk9IjMxNSIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjU4LjIiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjcuOCIgeT0iMzI3IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMzYiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjEwLjgiIHk9IjMzMCIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjI5IiBoZWlnaHQ9IjIiLz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjREZERUREIiBkPSJNNTUsMzA5LjdjMi4yLDAsNCwxLjgsNCw0djMwYzAsMi4yLTEuOCw0LTQsNEg1Yy0yLjIsMC00LTEuOC00LTR2LTMwYzAtMi4yLDEuOC00LDQtNEg1NSBNNTUsMzA4LjdINQ0KCQkJCWMtMi44LDAtNSwyLjItNSw1djMwYzAsMi44LDIuMiw1LDUsNWg1MGMyLjgsMCw1LTIuMiw1LTV2LTMwQzYwLDMxMSw1Ny44LDMwOC43LDU1LDMwOC43TDU1LDMwOC43eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxyZWN0IHg9IjQ2LjgiIHk9IjMyNyIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjgiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjQ3LjgiIHk9IjMzMCIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjYiIGhlaWdodD0iMiIvPg0KCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRTk1NjRCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjUwLjIiIGN5PSIzMzAuOSIgcj0iNy44Ii8+DQo8L2c+DQo8L3N2Zz4NCg==)');
          // Clear out exp date and put in clean cvc field
          $(this).parent('div').removeClass('has-error shake');
          $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
              $(this).val('');
              $(this).css('margin-left', '0px');
              $(this).css('width', '83.33%');
              // Clear out expDate and put in clean cvc
              $(this).closest('div').siblings('label').text("CVC");
              $(this).closest('div').siblings('.card-type').css('background-image', 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDMwOC43IDYwIDQwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMzA4LjcgNjAgNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGZpbGw9IiNDRENEQ0QiIGQ9Ik02MCwzNDMuN2MwLDIuOC0yLjIsNS01LDVINWMtMi44LDAtNS0yLjItNS01di0zMGMwLTIuOCwyLjItNSw1LTVoNTBjMi44LDAsNSwyLjIsNSw1VjM0My43eiIvPg0KCTwvZz4NCgk8cmVjdCB4PSIxLjgiIHk9IjMxNSIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjU4LjIiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjcuOCIgeT0iMzI3IiBmaWxsPSIjRkZGRkZGIiB3aWR0aD0iMzYiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjEwLjgiIHk9IjMzMCIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjI5IiBoZWlnaHQ9IjIiLz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjREZERUREIiBkPSJNNTUsMzA5LjdjMi4yLDAsNCwxLjgsNCw0djMwYzAsMi4yLTEuOCw0LTQsNEg1Yy0yLjIsMC00LTEuOC00LTR2LTMwYzAtMi4yLDEuOC00LDQtNEg1NSBNNTUsMzA4LjdINQ0KCQkJCWMtMi44LDAtNSwyLjItNSw1djMwYzAsMi44LDIuMiw1LDUsNWg1MGMyLjgsMCw1LTIuMiw1LTV2LTMwQzYwLDMxMSw1Ny44LDMwOC43LDU1LDMwOC43TDU1LDMwOC43eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxyZWN0IHg9IjQ2LjgiIHk9IjMyNyIgZmlsbD0iI0ZGRkZGRiIgd2lkdGg9IjgiIGhlaWdodD0iOCIvPg0KCTxyZWN0IHg9IjQ3LjgiIHk9IjMzMCIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjYiIGhlaWdodD0iMiIvPg0KCTxjaXJjbGUgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRTk1NjRCIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgY3g9IjUwLjIiIGN5PSIzMzAuOSIgcj0iNy44Ii8+DQo8L2c+DQo8L3N2Zz4NCg==)');
              $(this).mask("999", {placeholder: " ", completed: getCvc});
              $(this).attr('placeholder', 'CVC');
          });
      } else {
          $(this).parent('div').addClass('has-error shake');
      }
  }

  function getCvc() {
      $('.dmitrysCvcContainer').removeClass('hidden');
      $('.dmitrysCvc').text($(this).val());      
      $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
          $(this).val('');
          $(this).css('margin-left', '0px');
          $(this).css('width', '83.33%');
          // Clear out cvc and put in clean billing zip
          $(this).closest('div').siblings('label').text("Billing Zip Code");
          // To-do put in image for generic credit card
          $(this).closest('div').siblings('.card-type').css('background-image', 'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIxIDAgNjAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMSAwIDYwIDQwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjQzREQUIwIiBkPSJNNjEsMzVjMCwyLjgtMi4yLDUtNSw1SDZjLTIuOCwwLTUtMi4yLTUtNVY1YzAtMi44LDIuMi01LDUtNWg1MGMyLjgsMCw1LDIuMiw1LDVWMzV6Ii8+DQoJPC9nPg0KCTxyZWN0IHg9IjIiIHk9IjYuMyIgZmlsbD0iIzQyNDE0MyIgd2lkdGg9IjU5IiBoZWlnaHQ9IjgiLz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjN0Q5NzY5IiBkPSJNNTYsMWMyLjIsMCw0LDEuOCw0LDR2MzBjMCwyLjItMS44LDQtNCw0SDZjLTIuMiwwLTQtMS44LTQtNFY1YzAtMi4yLDEuOC00LDQtNEg1NiBNNTYsMEg2DQoJCQkJQzMuMiwwLDEsMi4yLDEsNXYzMGMwLDIuOCwyLjIsNSw1LDVoNTBjMi44LDAsNS0yLjIsNS01VjVDNjEsMi4yLDU4LjcsMCw1NiwwTDU2LDB6Ii8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==)');
          $(this).mask("99999", {placeholder: " ", completed: getZipCode});
          $(this).attr('placeholder', 'Billing Zip Code');
      });
  }
// 
function getZipCode() {
      // To-do Zip Code Validation
      // var cardExpObj = $.payment.cardExpiryVal($(this).val());
      // var valid = $.payment.validateCardExpiry(cardExpObj.month, cardExpObj.year);
      // if (valid) {
        $(this).animate({'marginLeft': '-=25%'}, 200, 'swing', function () {
          $(this).css('margin-left', '0px');
          $('.dmitrysBillingZipCodeContainer').removeClass('hidden');
          $('.dmitrysBillingZipCode').text($(this).val()); 
          $('#cardNumberContainer').html('<button class=" btn btn-primary btn-lg text-center col-xs-10 col-xs-offset-1" id="customButton">Pay With Card</button>');
        });
      // } else {
      //     $(this).parent('div').addClass('has-error shake');
      // }
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
