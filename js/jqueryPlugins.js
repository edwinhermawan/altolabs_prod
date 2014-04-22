// Edit Card Number, ExpDate, and CVC
// $.fn.inlineEdit = function(replaceWith) {
$.fn.inlineEdit = function(replaceWith, masked) {
  $(this).click(function() {
    var elem = $(this);

    elem.hide();
    replaceWith.val(elem.text());

    if (masked!=="null"){
      replaceWith.inputmask(masked, {placeholder:" "});
    }
    elem.after(replaceWith);
    replaceWith.focus();

    replaceWith.blur(function() {

      if ($(this).val() != "") {
          elem.data("val", $(this).val());
          elem.text($(this).val());
      }

      $(this).remove();
      elem.show();
    });
  });
};