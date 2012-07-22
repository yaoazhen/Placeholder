;(function(name, factory){
	var hasDefine = typeof define === 'function' && define.amd,
	hasExports = typeof moudule !== 'undefined' && moudule.exports,

	i = document.createElement('input'),
	placeholderIsSupport = 'placeholder' in i;
	
	if(hasDefine){/*AMD Module*/
		define('placeholderBrowserTest', function(){
			return placeholderIsSupport;
		});
		define(['jquery', 'placeholderBrowserTest'], factory);
	}
	else if(hasExports){
		/*Node.js Module*/
		// Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
		moudule.exports = factory(jQuery, placeholderIsSupport);
	}
	else{
		/*Assign to common namespaces or simply the global object (window)*/
		(this.jQuery && this)[name] = factory(this.jQuery, placeholderIsSupport);
	} 
})('placeholder',function($, placeholderIsSupport){
	"use strict";

	var className = {
		focus: 'r-placeholder-focus',
		label: 'r-placeholder-label',
		container: 'r-placeholder-c'
	};

	return {
		init: function (){
			/* placeholderTest will know whether the browser support placeholder */
			if(!placeholderIsSupport){
				$(function(){
					$('input[placeholder]').add('textarea[placeholder]').each(function(){
						var inputElem = $(this),
						container = inputElem.parent();
						container.addClass(className.container);

						var hint = inputElem.attr('placeholder');
						var caption = $('<span class="' + className.label + '">' + hint + '</span>');

						inputElem.bind('focus', function(){
							container.addClass(className.focus);
						});

						caption.click(function(){
							inputElem.trigger('focus');
						});

						inputElem.bind('keyup', function () {
		                    if (!inputElem.val()) {
		                        caption.show();
		                    }
		                }).bind('keypress', function () {
		                    /* hide the caption */
		                    caption.hide();
		                });

						inputElem.before(caption);

						/* hide the caption when input have the text*/
						if(!!inputElem.val()){
							caption.hide();
						}

					});
				});
			}
		}

	};
});