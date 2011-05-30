/**
 * @author Zane Yao
 */

/// <reference path="jquery-1.4.2.js" />
(function ($) {
	// This adds 'placeholder' to the items listed in the jQuery .support object. 
   jQuery.support.placeholder = false;
   test = document.createElement('input');
   if('placeholder' in test) jQuery.support.placeholder = true;
	// This adds placeholder support to browsers that wouldn't otherwise support it. 
	
	$(function() {
	   if(!$.support.placeholder) {
	      var active = document.activeElement;
	      
	      var $textboxList=$('[placeholder]:text').add('textarea[placeholder]');
	      $textboxList.each(function(){
	      	$.data(this, 'placeholder', $(this).attr('placeholder'));
	      });
	      
	      $textboxList.focus(function () {
		         if ($.data(this,'placeholder') != '' && $(this).val() == $.data(this,'placeholder')) {
		            $(this).val('').removeClass('hasPlaceholder');
		         }
		     }).blur(function(){
		         if ($.data(this,'placeholder') != '' && ($(this).val() == '' || $(this).val() == $.data(this,'placeholder'))) {
		            $(this).val($.data(this,'placeholder')).addClass('hasPlaceholder');
		         }
		      });
	      $textboxList.blur();
	      $(active).focus();
	      $('[placeholder]').parents('form').submit(function() {
	         $(':text.hasPlaceholder').val('');
	      });
	   }
	});
}(jQuery));