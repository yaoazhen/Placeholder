/**
 * @author Zane Yao
 */

// This adds 'placeholder' to the items listed in the jQuery .support object. 
jQuery(function() {
   jQuery.support.placeholder = false;
   test = document.createElement('input');
   if('placeholder' in test) jQuery.support.placeholder = true;
});
// This adds placeholder support to browsers that wouldn't otherwise support it. 
jQuery(function() {
   if(!$.support.placeholder) { 
      var active = document.activeElement;
      $('[placeholder]:text').add('textarea[placeholder]').focus(function () {
         if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
            $(this).val('').removeClass('hasPlaceholder');
         }
      }).blur(function () {
         if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
            $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
         }
      });
      $('[placeholder]:text').add('textarea[placeholder]').blur();
      $(active).focus();
      $('[placeholder]').parents('form').submit(function() {
         $(':text.hasPlaceholder').val('');
      });
   }
});