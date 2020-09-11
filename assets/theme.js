KING = {};

/*
 * jQuery.styledSelect - <select> replacement plugin
 * https://github.com/rubenbristian/styled-select/tree/master
 * Copyright (c) 2013 Ruben Bristian
 * version 1.0
 * forked from http://wellstyled.com/en/javascript-styleselect-jquery-plugin/
 */

jQuery.fn.styledSelect = function(options) {

	var prefs = {
		coverClass : 'select-replace-cover',
		innerClass : 'select-replace',
		adjustPosition : { top:0, left:0 },
		selectOpacity : 0
	}

	if (options) jQuery.extend(prefs,options);
	
	return this.each(function(){
	
		var $selElm = jQuery(this);

		$selElm.wrap('<span><'+'/span>');
		$selElm.after('<span><'+'/span>');

		var $selReplace = $selElm.next(),
			$selCover = $selElm.parent();

		$selElm.css({
			'opacity': prefs.selectOpacity,
			'visibility': 'visible',
			'position': 'absolute',
			'top' :0,
			'left': 0,
			'display': 'inline',
			'z-index': 1
		}).attr('tabindex', '-1');

		$selCover.addClass(prefs.coverClass).css({
			'display': 'inline-block',
			'position': 'relative',
			'top' :prefs.adjustPosition.top,
			'left' :prefs.adjustPosition.left,
			'z-index': 0,
			'vertical-align': 'middle',
			'text-align': 'left'
		}).attr('tabindex', '0');

		$selReplace.addClass(prefs.innerClass).css({
			'display': 'block',
			'white-space': 'nowrap'
		});

		$selElm.bind('change',function() {
			jQuery(this).next().html(this.options[this.selectedIndex].text);
		});

		$selReplace.text($selElm.find('option:selected').text());
		$selCover.width($selElm.width()+'px');

	});

}

window.styledSelectUpgraded = function($select, maxHeightCap) {

	if ( ! $select.hasClass('styled') ) {

		$select.styledSelect({
		  coverClass: 'regular-select-cover',
		  innerClass: 'regular-select-inner'
		}).addClass('styled');

		var $selectContainer = $select.parent();

		var listDOM = '<span class="regular-select-content">';
		$select.find('option').each(function(){
			listDOM += '<span class="regular-select-item' + ( $(this).prop('selected') ? ' selected ' : '' ) + '" data-value="' + encodeURIComponent($(this).val()) + '">' + $(this).text() + '</span>';
		});
		listDOM += '</span>';
		$selectContainer.append(listDOM);

		$selectContainer.find('.regular-select-item').on('click', function(){
			$selectContainer.find('.selected').removeClass('selected');
			$(this).addClass('selected');
			$select.val(decodeURIComponent($(this).data('value')));
			$select.change();
		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				$(this).trigger('click');
				var $cover = $(this).parent().parent().parent();
				$cover.find('.regular-select-item').attr('tabindex', '-1');
				$cover.removeClass('content-opened');
				setTimeout(function(){
					$cover.find('.opened-with-tab').removeClass('opened-with-tab');
				}, 90);
			}
		});

		$selectContainer.parent().css('position', 'relative');

		$selectContainer.on('click', function(e){

			e.stopPropagation();
			var _this = $(this)[0];

			$('.regular-select-cover.content-opened').each(function(){
				if ( $(this)[0] != _this ) {
					$(this).removeClass('content-opened');
					$(this).parent().css('zIndex', 9);
				}
			});

			if ( ! $(this).hasClass('content-opened') ) {

				$(this).addClass('content-opened');
				$(this).parent().css('zIndex', 1000); 
				var $selectHandle = $(this);

				var $selectContent = $(this).find('.regular-select-content');
				$selectContent.css('maxHeight', 'none');
				if ( maxHeightCap && $selectContent.outerHeight() > $(window).height() - $selectContent.offset().top - 20 ) {
					$selectContent.css('maxHeight', $(window).height() - $selectContent.offset().top - 20 );
				}

				$(window).on('click.select-helper', function(){
					if ( $selectHandle.hasClass('content-opened') ) {
						$selectHandle.removeClass('content-opened');
						$selectHandle.parent().css('zIndex', 9);
					}
				});

			} else {
				$(this).parent().css('zIndex', 9);
				$(this).removeClass('content-opened');
				$(window).off('click.select-helper');
			}

		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				if ( ! $(this).hasClass('opened-with-tab') ) {
					$(this).addClass('opened-with-tab');
					$(this).trigger('click');
					$(this).find('.regular-select-item').attr('tabindex', '0');
				}
			}
		});

		$selectContainer.find('.regular-select-inner').attr('data-title', $selectContainer.parent().find('label').text());

	 	$selectContainer.append('<svg class="svg symbol symbol--arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M13.828 14.414l4-4L16.414 9l-4 4-4-4L7 10.414l5.414 5.414 1.414-1.414z" fill="#000"/></svg>');

	}

};

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function(d){d.fn.fitVids=function(f){var c={customSelector:null,ignore:null};if(!document.getElementById("fit-vids-style")){var h=document.head||document.getElementsByTagName("head")[0],g=document.createElement("div");g.innerHTML='<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'; h.appendChild(g.childNodes[1])}f&&d.extend(c,f);return this.each(function(){var b='iframe[src*="player.vimeo.com"] iframe[src*="youtube.com"] iframe[src*="youtube-nocookie.com"] iframe[src*="kickstarter.com"][src*="video.html"] object embed'.split(" ");c.customSelector&&b.push(c.customSelector);var e=".fitvidsignore";c.ignore&&(e=e+", "+c.ignore);b=d(this).find(b.join(","));b=b.not("object object");b=b.not(e);b.each(function(){var a=d(this);if(!(0<a.parents(e).length||"embed"===this.tagName.toLowerCase()&& a.parent("object").length||a.parent(".fluid-width-video-wrapper").length)){a.css("height")||a.css("width")||!isNaN(a.attr("height"))&&!isNaN(a.attr("width"))||(a.attr("height",9),a.attr("width",16));var b="object"===this.tagName.toLowerCase()||a.attr("height")&&!isNaN(parseInt(a.attr("height"),10))?parseInt(a.attr("height"),10):a.height(),c=isNaN(parseInt(a.attr("width"),10))?a.width():parseInt(a.attr("width"),10),b=b/c;a.attr("id")||(c="fitvid"+Math.floor(999999*Math.random()),a.attr("id",c));a.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100*b+"%");a.removeAttr("height").removeAttr("width")}})})}})(window.jQuery||window.Zepto);

window.debounce = function(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

// King Product Gallery Mobile Helpers
// for gallery (flickity) resizing

window.KingProductGalleryMobileHelpers = function($product){

	var _spo = $product.data('po'),

			$sProductCarousel = _spo.$productCarousel,
			$sProductGallery = _spo.$productGallery,
			$sProductGalleryItem = _spo.$productGalleryItem,
			sProductFlkty = _spo.productFlkty;

	var KingProductGalleryMobile = false;
	var flktyEventSet = false;

	if ( parseInt($sProductCarousel.data('size')) > 1 ) {

		$(window).on('resize.product-gallery-mobile-switch', function(){

			var triggerSwitch = 'false';
			if ( ! $product.hasClass('featured-product') ) {

				if ( ! KingProductGalleryMobile && $(window).width() < 768 ) {
					triggerSwitch = 'mobile';
					KingProductGalleryMobile = true;
				} else if ( KingProductGalleryMobile && $(window).width() >= 768 ) {
					triggerSwitch = 'desktop';
					KingProductGalleryMobile = false;
				} 

			} else {

				if ( ( ! KingProductGalleryMobile && $(window).width() < 768 ) || ( ! KingProductGalleryMobile && $(window).width() > 948 ) ) {
					triggerSwitch = 'mobile';
					KingProductGalleryMobile = true;
				} else if ( KingProductGalleryMobile && ( $(window).width() >= 768 && $(window).width() <= 948 ) ) {
					triggerSwitch = 'desktop';
					KingProductGalleryMobile = false;
				} 

			}
			
			if ( triggerSwitch != 'false' ) {

				$sProductCarousel
					.removeClass('product-gallery--fit')
					.removeClass('product-gallery--fill')
					.removeClass('product-gallery--fill-mobile');

				if ( triggerSwitch == 'mobile' ) {

					$sProductCarousel.addClass($sProductCarousel.data('mobile-style'));

					if ( $sProductCarousel.data('mobile-style') == 'product-gallery--fill-mobile' && $sProductCarousel.hasClass('product-gallery--mobile-variable') && ! flktyEventSet ) {
						flktyEventSet = true;
						$sProductCarousel.on('change.flickity', function( event, index ) {
							if ( $(window).width() < 768 || ( $product.hasClass('featured-product') && $(window).width() > 948 ) ) {
								$selectedItem = $sProductGalleryItem.eq(index);
								$sProductCarousel.attr('style', 'height:' + ( $selectedItem.width() / $selectedItem.children('.lazy-image').data('ratio') ) + 'px !important; min-height: 0');
							}
						});
						$(window).on('resize.product-gallery-mobile-fill-helper', function(){
							if ( $(window).width() < 768 || ( $product.hasClass('featured-product') && $(window).width() > 948 ) ) {
								$selectedItem = $sProductGalleryItem.eq($sProductCarousel.data('flickity').selectedIndex);
								$sProductCarousel.attr('style', 'height:' + ( $selectedItem.width() / $selectedItem.children('.lazy-image').data('ratio') ) + 'px !important; min-height: 0');
							}
						}).trigger('resize.product-gallery-mobile-fill-helper');
					}

				} else if ( triggerSwitch == 'desktop' ) {
					$sProductCarousel.addClass($sProductCarousel.data('desktop-style'));
					$sProductCarousel.removeAttr('style');
				}

				KING.Product.unmount();

				setTimeout(function(){
					$product.find('.product-gallery__item').attr('style', 'position: absolute');
	    		KING.Product._mountGalleryResizer($product.find('.product-gallery'));

		    	$(window).trigger('resize');
		    	setTimeout(function(){
			    	sProductFlkty.resize();
		    	}, 10)
				}, 10);

			}

		}).trigger('resize.product-gallery-mobile-switch');

	}

}

// Returns image url with size format

window.getSizedImageUrl = function(src, size) {

  if ( size === null || src === null ) {
    return src;
  }

  if (size === 'master') {
    return removeProtocol(src);
  }

  var match = src.match(
    /\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i
  );

  if (match !== null) {
    var prefix = src.split(match[0]);
    var suffix = match[0];
    return removeProtocol(prefix[0] + '_' + size + suffix);
  }

	function removeProtocol(path) {
	  return path.replace(/http(s)?:/, '');
	}

	return src;

}

// Returns readable time from UTC

window.formatTime = function(format, utc) {

	var date = new Date(utc);
  var nDay = date.getDay(),
    nDate = date.getDate(),
    nMonth = date.getMonth(),
    nYear = date.getFullYear(),
    nHour = date.getHours(),
    aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    aMonths = window.month_names,
    aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    isLeapYear = function() {
      return (nYear%4===0 && nYear%100!==0) || nYear%400===0;
    },
    getThursday = function() {
      var target = new Date(date);
      target.setDate(nDate - ((nDay+6)%7) + 3);
      return target;
    },
    zeroPad = function(nNum, nPad) {
      return ((Math.pow(10, nPad) + nNum) + '').slice(1);
    };
  return format.replace(/%[a-z]/gi, function(sMatch) {
    return (({
      '%a': aDays[nDay].slice(0,3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0,3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear/100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0,10),
      '%G': getThursday().getFullYear(),
      '%g': (getThursday().getFullYear() + '').slice(2),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour+11)%12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth>1 && isLeapYear()) ? 1 : 0), 3),
      '%k': nHour,
      '%l': (nHour+11)%12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%n': nMonth + 1,
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour<12) ? 'AM' : 'PM',
      '%P': (nHour<12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime()/1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%V': (function() {
              var target = getThursday(),
                n1stThu = target.valueOf();
              target.setMonth(0, 1);
              var nJan1 = target.getDay();
              if (nJan1!==4) target.setMonth(0, 1 + ((4-nJan1)+7)%7);
              return zeroPad(1 + Math.ceil((n1stThu-target)/604800000), 2);
            })(),
      '%w': nDay,
      '%x': date.toLocaleDateString(),
      '%X': date.toLocaleTimeString(),
      '%y': (nYear + '').slice(2),
      '%Y': nYear,
      '%z': date.toTimeString().replace(/.+GMT([+-]\d+).+/, '$1'),
      '%Z': date.toTimeString().replace(/.+\((.+?)\)$/, '$1')
    }[sMatch] || '') + '') || sMatch;
  });

}

// Returns pseudo content

window.getPseudoContent = function(selector) {
	var element = document.querySelector(selector),
			pseudo = window.getComputedStyle(element, ':after');
	return pseudo.getPropertyValue('content');
}

/*!
 * Flickity PACKAGED v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

!function(e,i){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("jquery")):e.jQueryBridget=i(e,e.jQuery)}(window,function(t,e){"use strict";var i=Array.prototype.slice,n=t.console,d=void 0===n?function(){}:function(t){n.error(t)};function s(h,s,c){(c=c||e||t.jQuery)&&(s.prototype.option||(s.prototype.option=function(t){c.isPlainObject(t)&&(this.options=c.extend(!0,this.options,t))}),c.fn[h]=function(t){return"string"==typeof t?function(t,o,r){var a,l="$()."+h+'("'+o+'")';return t.each(function(t,e){var i=c.data(e,h);if(i){var n=i[o];if(n&&"_"!=o.charAt(0)){var s=n.apply(i,r);a=void 0===a?s:a}else d(l+" is not a valid method")}else d(h+" not initialized. Cannot call methods, i.e. "+l)}),void 0!==a?a:t}(this,t,i.call(arguments,1)):(function(t,n){t.each(function(t,e){var i=c.data(e,h);i?(i.option(n),i._init()):(i=new s(e,n),c.data(e,h,i))})}(this,t),this)},o(c))}function o(t){!t||t&&t.bridget||(t.bridget=s)}return o(e||t.jQuery),s}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],s=0;s<i.length;s++){var o=i[s];n&&n[o]&&(this.off(t,o),delete n[o]),o.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function m(t){var e=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(e)&&e}var i="undefined"==typeof console?function(){}:function(t){console.error(t)},y=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],b=y.length;function E(t){var e=getComputedStyle(t);return e||i("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}var S,C=!1;function x(t){if(function(){if(!C){C=!0;var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(t);var i=E(t);S=200==Math.round(m(i.width)),x.isBoxSizeOuter=S,e.removeChild(t)}}(),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var e=E(t);if("none"==e.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<b;e++){t[y[e]]=0}return t}();var i={};i.width=t.offsetWidth,i.height=t.offsetHeight;for(var n=i.isBorderBox="border-box"==e.boxSizing,s=0;s<b;s++){var o=y[s],r=e[o],a=parseFloat(r);i[o]=isNaN(a)?0:a}var l=i.paddingLeft+i.paddingRight,h=i.paddingTop+i.paddingBottom,c=i.marginLeft+i.marginRight,d=i.marginTop+i.marginBottom,u=i.borderLeftWidth+i.borderRightWidth,f=i.borderTopWidth+i.borderBottomWidth,p=n&&S,g=m(e.width);!1!==g&&(i.width=g+(p?0:l+u));var v=m(e.height);return!1!==v&&(i.height=v+(p?0:h+f)),i.innerWidth=i.width-(l+u),i.innerHeight=i.height-(h+f),i.outerWidth=i.width+c,i.outerHeight=i.height+d,i}}return x}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var i=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i]+"MatchesSelector";if(t[n])return n}}();return function(t,e){return t[i](e)}}),function(e,i){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("desandro-matches-selector")):e.fizzyUIUtils=i(e,e.matchesSelector)}(window,function(h,o){var c={extend:function(t,e){for(var i in e)t[i]=e[i];return t},modulo:function(t,e){return(t%e+e)%e}},e=Array.prototype.slice;c.makeArray=function(t){return Array.isArray(t)?t:null==t?[]:"object"==typeof t&&"number"==typeof t.length?e.call(t):[t]},c.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},c.getParent=function(t,e){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,o(t,e))return t},c.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},c.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},c.filterFindElements=function(t,n){t=c.makeArray(t);var s=[];return t.forEach(function(t){if(t instanceof HTMLElement)if(n){o(t,n)&&s.push(t);for(var e=t.querySelectorAll(n),i=0;i<e.length;i++)s.push(e[i])}else s.push(t)}),s},c.debounceMethod=function(t,e,n){n=n||100;var s=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,i=this;this[o]=setTimeout(function(){s.apply(i,e),delete i[o]},n)}},c.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},c.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var d=h.console;return c.htmlInit=function(a,l){c.docReady(function(){var t=c.toDashed(l),s="data-"+t,e=document.querySelectorAll("["+s+"]"),i=document.querySelectorAll(".js-"+t),n=c.makeArray(e).concat(c.makeArray(i)),o=s+"-options",r=h.jQuery;n.forEach(function(e){var t,i=e.getAttribute(s)||e.getAttribute(o);try{t=i&&JSON.parse(i)}catch(t){return void(d&&d.error("Error parsing "+s+" on "+e.className+": "+t))}var n=new a(e,t);r&&r.data(e,l,n)})})},c}),function(e,i){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("get-size")):(e.Flickity=e.Flickity||{},e.Flickity.Cell=i(e,e.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.element.setAttribute("aria-hidden","true"),this.x=0,this.shift=0},n.destroy=function(){this.unselect(),this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.select=function(){this.element.classList.add("is-selected"),this.element.removeAttribute("aria-hidden")},n.unselect=function(){this.element.classList.remove("is-selected"),this.element.setAttribute("aria-hidden","true")},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.cells.forEach(function(t){t.select()})},e.unselect=function(){this.cells.forEach(function(t){t.unselect()})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(e,i){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("fizzy-ui-utils")):(e.Flickity=e.Flickity||{},e.Flickity.animatePrototype=i(e,e.fizzyUIUtils))}(window,function(t,e){var i={startAnimation:function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},animate:function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;requestAnimationFrame(function(){e.animate()})}},positionSlider:function(){var t=this.x;this.options.wrapAround&&1<this.cells.length&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),this.setTranslateX(t,this.isAnimating),this.dispatchScrollEvent()},setTranslateX:function(t,e){t+=this.cursorPosition,t=this.options.rightToLeft?-t:t;var i=this.getPositionValue(t);this.slider.style.transform=e?"translate3d("+i+",0,0)":"translateX("+i+")"},dispatchScrollEvent:function(){var t=this.slides[0];if(t){var e=-this.x-t.target,i=e/this.slidesWidth;this.dispatchEvent("scroll",null,[i,e])}},positionSliderAtSelected:function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.velocity=0,this.positionSlider())},getPositionValue:function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},settle:function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,2<this.restingFrames&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle",null,[this.selectedIndex]))},shiftWrapCells:function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},_shiftCells:function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n],o=0<e?i:0;s.wrapShift(o),e-=s.size.outerWidth}},_unshiftCells:function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},integratePhysics:function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},applyForce:function(t){this.velocity+=t},getFrictionFactor:function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},getRestingPosition:function(){return this.x+this.velocity/(1-this.getFrictionFactor())},applyDragForce:function(){if(this.isDraggable&&this.isPointerDown){var t=this.dragX-this.x-this.velocity;this.applyForce(t)}},applySelectedAttraction:function(){if(!(this.isDraggable&&this.isPointerDown)&&!this.isFreeScrolling&&this.slides.length){var t=(-1*this.selectedSlide.target-this.x)*this.options.selectedAttraction;this.applyForce(t)}}};return i}),function(r,a){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(t,e,i,n,s,o){return a(r,t,e,i,n,s,o)});else if("object"==typeof module&&module.exports)module.exports=a(r,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var t=r.Flickity;r.Flickity=a(r,r.EvEmitter,r.getSize,r.fizzyUIUtils,t.Cell,t.Slide,t.animatePrototype)}}(window,function(n,t,e,a,i,r,s){var l=n.jQuery,o=n.getComputedStyle,h=n.console;function c(t,e){for(t=a.makeArray(t);t.length;)e.appendChild(t.shift())}var d=0,u={};function f(t,e){var i=a.getQueryElement(t);if(i){if(this.element=i,this.element.flickityGUID){var n=u[this.element.flickityGUID];return n.option(e),n}l&&(this.$element=l(this.element)),this.options=a.extend({},this.constructor.defaults),this.option(e),this._create()}else h&&h.error("Bad element for Flickity: "+(i||t))}f.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},f.createMethods=[];var p=f.prototype;a.extend(p,t.prototype),p._create=function(){var t=this.guid=++d;for(var e in this.element.flickityGUID=t,(u[t]=this).selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&n.addEventListener("resize",this),this.options.on){var i=this.options.on[e];this.on(e,i)}f.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){a.extend(this.options,t)},p.activate=function(){this.isActive||(this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize(),c(this._filterFindCellElements(this.element.children),this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate"),this.selectInitialIndex(),this.isInitActivated=!0,this.dispatchEvent("ready"))},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return a.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){return this._filterFindCellElements(t).map(function(t){return new i(t,this)},this)},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t&&this.maxCellHeight||0;var e=0;if(0<t){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,s=t;s<n;s++){var o=this.cells[s];o.setPosition(e),e+=o.size.outerWidth,this.maxCellHeight=Math.max(o.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var n=new r(this);this.slides.push(n);var s="left"==this.originSide?"marginRight":"marginLeft",o=this._getCanCellFit();this.cells.forEach(function(t,e){if(n.cells.length){var i=n.outerWidth-n.firstMargin+(t.size.outerWidth-t.size[s]);o.call(this,e,i)||(n.updateTarget(),n=new r(this),this.slides.push(n)),n.addCell(t)}else n.addCell(t)},this),n.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!=0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=e(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var g={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=g[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];0<t;){var s=this.cells[e];if(!s)break;n.push(s),e+=i,t-=s.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],s=n<this.size.innerWidth,o=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){s?t.target=n*this.cellAlign:(t.target=Math.max(t.target,o),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),l&&this.$element){var s=t+=this.options.namespaceJQueryEvents?".flickity":"";if(e){var o=l.Event(e);o.type=t,s=o}this.$element.trigger(s,i)}},p.select=function(t,e,i){if(this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=a.modulo(t,this.slides.length)),this.slides[t])){var n=this.selectedIndex;this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select",null,[t]),t!=n&&this.dispatchEvent("change",null,[t]),this.dispatchEvent("cellSelect")}},p._wrapSelect=function(t){var e=this.slides.length;if(!(this.options.wrapAround&&1<e))return t;var i=a.modulo(t,e),n=Math.abs(i-this.selectedIndex),s=Math.abs(i+e-this.selectedIndex),o=Math.abs(i-e-this.selectedIndex);!this.isDragSelect&&s<n?t+=e:!this.isDragSelect&&o<n&&(t-=e),t<0?this.x-=this.slideableWidth:e<=t&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),(this.selectedSlide=t).select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectInitialIndex=function(){var t=this.options.initialIndex;if(this.isInitActivated)this.select(this.selectedIndex,!1,!0);else{if(t&&"string"==typeof t)if(this.queryCell(t))return void this.selectCell(t,!1,!0);var e=0;t&&this.slides[t]&&(e=t),this.select(e,!1,!0)}},p.selectCell=function(t,e,i){var n=this.queryCell(t);if(n){var s=this.getCellSlideIndex(n);this.select(s,e,i)}},p.getCellSlideIndex=function(t){for(var e=0;e<this.slides.length;e++){if(-1!=this.slides[e].cells.indexOf(t))return e}},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=a.makeArray(t);var i=[];return t.forEach(function(t){var e=this.getCell(t);e&&i.push(e)},this),i},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){var e=this.getCell(t);return e||(t=a.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(i<=1+2*t)return this.getCellElements();for(var n=[],s=e-t;s<=e+t;s++){var o=this.options.wrapAround?a.modulo(s,i):s,r=this.slides[o];r&&(n=n.concat(r.getCellElements()))}return n},p.queryCell=function(t){if("number"==typeof t)return this.cells[t];if("string"==typeof t){if(t.match(/^[#\.]?[\d\/]/))return;t=this.element.querySelector(t)}return this.getCell(t)},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){"touchstart"!=t.type&&t.preventDefault(),this.focus()},p.onresize=function(){this.watchCSS(),this.resize()},a.debounceMethod(f,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=a.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){this.options.watchCSS&&(-1!=o(this.element,":after").content.indexOf("flickity")?this.activate():this.deactivate())},p.onkeydown=function(t){var e=document.activeElement&&document.activeElement!=this.element;if(this.options.accessibility&&!e){var i=f.keyboardHandlers[t.keyCode];i&&i.call(this)}},f.keyboardHandlers={37:function(){var t=this.options.rightToLeft?"next":"previous";this.uiChange(),this[t]()},39:function(){var t=this.options.rightToLeft?"previous":"next";this.uiChange(),this[t]()}},p.focus=function(){var t=n.pageYOffset;this.element.focus({preventScroll:!0}),n.pageYOffset!=t&&n.scrollTo(n.pageXOffset,t)},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.unselectSelectedSlide(),this.cells.forEach(function(t){t.destroy()}),this.element.removeChild(this.viewport),c(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),n.removeEventListener("resize",this),this.allOff(),this.emitEvent("destroy"),l&&this.$element&&l.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete u[this.guid]},a.extend(p,s),f.data=function(t){var e=(t=a.getQueryElement(t))&&t.flickityGUID;return e&&u[e]},a.htmlInit(f,"flickity"),l&&l.bridget&&l.bridget("flickity",f),f.setJQuery=function(t){l=t},f.Cell=i,f.Slide=r,f}),function(e,i){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("ev-emitter")):e.Unipointer=i(e,e.EvEmitter)}(window,function(s,t){function e(){}var i=e.prototype=Object.create(t.prototype);i.bindStartEvent=function(t){this._bindStartEvent(t,!0)},i.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},i._bindStartEvent=function(t,e){var i=(e=void 0===e||e)?"addEventListener":"removeEventListener",n="mousedown";s.PointerEvent?n="pointerdown":"ontouchstart"in s&&(n="touchstart"),t[i](n,this)},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},i.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},i.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},i.onpointerdown=function(t){this._pointerDown(t,t)},i._pointerDown=function(t,e){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},i.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var n={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return i._bindPostStartEvents=function(t){if(t){var e=n[t.type];e.forEach(function(t){s.addEventListener(t,this)},this),this._boundPointerEvents=e}},i._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(t){s.removeEventListener(t,this)},this),delete this._boundPointerEvents)},i.onmousemove=function(t){this._pointerMove(t,t)},i.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},i.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},i._pointerMove=function(t,e){this.pointerMove(t,e)},i.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},i.onmouseup=function(t){this._pointerUp(t,t)},i.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},i.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},i._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},i.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},i._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},i._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},i.pointerDone=function(){},i.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},i.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},i._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},i.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},e.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},e}),function(e,i){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("unipointer")):e.Unidragger=i(e,e.Unipointer)}(window,function(o,t){function e(){}var i=e.prototype=Object.create(t.prototype);i.bindHandles=function(){this._bindHandles(!0)},i.unbindHandles=function(){this._bindHandles(!1)},i._bindHandles=function(t){for(var e=(t=void 0===t||t)?"addEventListener":"removeEventListener",i=t?this._touchActionValue:"",n=0;n<this.handles.length;n++){var s=this.handles[n];this._bindStartEvent(s,t),s[e]("click",this),o.PointerEvent&&(s.style.touchAction=i)}},i._touchActionValue="none",i.pointerDown=function(t,e){this.okayPointerDown(t)&&(this.pointerDownPointer=e,t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e]))};var s={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},r={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return i.okayPointerDown=function(t){var e=s[t.target.nodeName],i=r[t.target.type],n=!e||i;return n||this._pointerReset(),n},i.pointerDownBlur=function(){var t=document.activeElement;t&&t.blur&&t!=document.body&&t.blur()},i.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},i._dragPointerMove=function(t,e){var i={x:e.pageX-this.pointerDownPointer.pageX,y:e.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(i)&&this._dragStart(t,e),i},i.hasDragStarted=function(t){return 3<Math.abs(t.x)||3<Math.abs(t.y)},i.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},i._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},i._dragStart=function(t,e){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,e)},i.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},i._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},i.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},i._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},i.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},i.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},i._staticClick=function(t,e){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},i.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},e.getPointerPoint=t.getPointerPoint,e}),function(n,s){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)}):"object"==typeof module&&module.exports?module.exports=s(n,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):n.Flickity=s(n,n.Flickity,n.Unidragger,n.fizzyUIUtils)}(window,function(i,t,e,a){a.extend(t.defaults,{draggable:">1",dragThreshold:3}),t.createMethods.push("_createDrag");var n=t.prototype;a.extend(n,e.prototype),n._touchActionValue="pan-y";var s="createTouch"in document,o=!1;n._createDrag=function(){this.on("activate",this.onActivateDrag),this.on("uiChange",this._uiChangeDrag),this.on("deactivate",this.onDeactivateDrag),this.on("cellChange",this.updateDraggable),s&&!o&&(i.addEventListener("touchmove",function(){}),o=!0)},n.onActivateDrag=function(){this.handles=[this.viewport],this.bindHandles(),this.updateDraggable()},n.onDeactivateDrag=function(){this.unbindHandles(),this.element.classList.remove("is-draggable")},n.updateDraggable=function(){">1"==this.options.draggable?this.isDraggable=1<this.slides.length:this.isDraggable=this.options.draggable,this.isDraggable?this.element.classList.add("is-draggable"):this.element.classList.remove("is-draggable")},n.bindDrag=function(){this.options.draggable=!0,this.updateDraggable()},n.unbindDrag=function(){this.options.draggable=!1,this.updateDraggable()},n._uiChangeDrag=function(){delete this.isFreeScrolling},n.pointerDown=function(t,e){this.isDraggable?this.okayPointerDown(t)&&(this._pointerDownPreventDefault(t),this.pointerDownFocus(t),document.activeElement!=this.element&&this.pointerDownBlur(),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this.pointerDownScroll=l(),i.addEventListener("scroll",this),this._pointerDownDefault(t,e)):this._pointerDownDefault(t,e)},n._pointerDownDefault=function(t,e){this.pointerDownPointer={pageX:e.pageX,pageY:e.pageY},this._bindPostStartEvents(t),this.dispatchEvent("pointerDown",t,[e])};var r={INPUT:!0,TEXTAREA:!0,SELECT:!0};function l(){return{x:i.pageXOffset,y:i.pageYOffset}}return n.pointerDownFocus=function(t){r[t.target.nodeName]||this.focus()},n._pointerDownPreventDefault=function(t){var e="touchstart"==t.type,i="touch"==t.pointerType,n=r[t.target.nodeName];e||i||n||t.preventDefault()},n.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},n.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},n.pointerDone=function(){i.removeEventListener("scroll",this),delete this.pointerDownScroll},n.dragStart=function(t,e){this.isDraggable&&(this.dragStartPosition=this.x,this.startAnimation(),i.removeEventListener("scroll",this),this.dispatchEvent("dragStart",t,[e]))},n.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},n.dragMove=function(t,e,i){if(this.isDraggable){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1;this.options.wrapAround&&(i.x=i.x%this.slideableWidth);var s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var o=Math.max(-this.slides[0].target,this.dragStartPosition);s=o<s?.5*(s+o):s;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<r?.5*(s+r):s}this.dragX=s,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])}},n.dragEnd=function(t,e){if(this.isDraggable){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])}},n.dragEndRestingSelect=function(){var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1);return i.distance<n.distance?i.index:n.index},n._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,s=1/0,o=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};o(e,s)&&(n+=i,s=e,null!==(e=this.getSlideDistance(-t,n)));)e=Math.abs(e);return{distance:s,index:n-i}},n.getSlideDistance=function(t,e){var i=this.slides.length,n=this.options.wrapAround&&1<i,s=n?a.modulo(e,i):e,o=this.slides[s];if(!o)return null;var r=n?this.slideableWidth*Math.floor(e/i):0;return t-(o.target+r)},n.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||100<new Date-this.dragMoveTime)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return 0<t&&0<e?1:t<0&&e<0?-1:0},n.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])},n.onscroll=function(){var t=l(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(3<Math.abs(e)||3<Math.abs(i))&&this._pointerDone()},t}),function(n,s){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)}):"object"==typeof module&&module.exports?module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils")):s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";var s="http://www.w3.org/2000/svg";function o(t,e){this.direction=t,this.parent=e,this._create()}(o.prototype=Object.create(i.prototype))._create=function(){this.isEnabled=!0,this.isPrevious=-1==this.direction;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-button flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"Previous":"Next");var i=this.createSVG();e.appendChild(i),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},o.prototype.activate=function(){this.bindStartEvent(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},o.prototype.deactivate=function(){this.parent.element.removeChild(this.element),this.unbindStartEvent(this.element),this.element.removeEventListener("click",this)},o.prototype.createSVG=function(){var t=document.createElementNS(s,"svg");t.setAttribute("class","flickity-button-icon"),t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(s,"path"),i=function(t){return"string"!=typeof t?"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z":t}(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},o.prototype.handleEvent=n.handleEvent,o.prototype.onclick=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},o.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},o.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},o.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&1<t.length)this.enable();else{var e=t.length?t.length-1:0,i=this.isPrevious?0:e;this[this.parent.selectedIndex==i?"disable":"enable"]()}},o.prototype.destroy=function(){this.deactivate(),this.allOff()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var r=e.prototype;return r._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new o(-1,this),this.nextButton=new o(1,this),this.on("activate",this.activatePrevNextButtons))},r.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},r.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=o,e}),function(n,s){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","unipointer/unipointer","fizzy-ui-utils/utils"],function(t,e,i){return s(n,t,e,i)}):"object"==typeof module&&module.exports?module.exports=s(n,require("./flickity"),require("unipointer"),require("fizzy-ui-utils")):s(n,n.Flickity,n.Unipointer,n.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){this.parent=t,this._create()}(s.prototype=Object.create(i.prototype))._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.handleClick=this.onClick.bind(this),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.setDots(),this.holder.addEventListener("click",this.handleClick),this.bindStartEvent(this.holder),this.parent.element.appendChild(this.holder)},s.prototype.deactivate=function(){this.holder.removeEventListener("click",this.handleClick),this.unbindStartEvent(this.holder),this.parent.element.removeChild(this.holder)},s.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;0<t?this.addDots(t):t<0&&this.removeDots(-t)},s.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[],n=this.dots.length,s=n+t,o=n;o<s;o++){var r=document.createElement("li");r.className="dot",r.setAttribute("aria-label","Page dot "+(o+1)),e.appendChild(r),i.push(r)}this.holder.appendChild(e),this.dots=this.dots.concat(i)},s.prototype.removeDots=function(t){this.dots.splice(this.dots.length-t,t).forEach(function(t){this.holder.removeChild(t)},this)},s.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot",this.selectedDot.removeAttribute("aria-current")),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected",this.selectedDot.setAttribute("aria-current","step"))},s.prototype.onTap=s.prototype.onClick=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},s.prototype.destroy=function(){this.deactivate(),this.allOff()},e.PageDots=s,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var o=e.prototype;return o._createPageDots=function(){this.options.pageDots&&(this.pageDots=new s(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},o.activatePageDots=function(){this.pageDots.activate()},o.updateSelectedPageDots=function(){this.pageDots.updateSelected()},o.updatePageDots=function(){this.pageDots.setDots()},o.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=s,e}),function(t,n){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,e,i){return n(t,e,i)}):"object"==typeof module&&module.exports?module.exports=n(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):n(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",this.onVisibilityChange=this.visibilityChange.bind(this),this.onVisibilityPlay=this.visibilityPlay.bind(this)}(n.prototype=Object.create(t.prototype)).play=function(){"playing"!=this.state&&(document.hidden?document.addEventListener("visibilitychange",this.onVisibilityPlay):(this.state="playing",document.addEventListener("visibilitychange",this.onVisibilityChange),this.tick()))},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),document.removeEventListener("visibilitychange",this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){this[document.hidden?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener("visibilitychange",this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var s=i.prototype;return s._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},s.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},s.playPlayer=function(){this.player.play()},s.stopPlayer=function(){this.player.stop()},s.pausePlayer=function(){this.player.pause()},s.unpausePlayer=function(){this.player.unpause()},s.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},s.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},s.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(i,n){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)}):"object"==typeof module&&module.exports?module.exports=n(i,require("./flickity"),require("fizzy-ui-utils")):n(i,i.Flickity,i.fizzyUIUtils)}(window,function(t,e,n){var i=e.prototype;return i.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var n=this.cells.length;e=void 0===e?n:e;var s=function(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}(i),o=e==n;if(o)this.slider.appendChild(s);else{var r=this.cells[e].element;this.slider.insertBefore(s,r)}if(0===e)this.cells=i.concat(this.cells);else if(o)this.cells=this.cells.concat(i);else{var a=this.cells.splice(e,n-e);this.cells=this.cells.concat(i).concat(a)}this._sizeCells(i),this.cellChange(e,!0)}},i.append=function(t){this.insert(t,this.cells.length)},i.prepend=function(t){this.insert(t,0)},i.remove=function(t){var e=this.getCells(t);if(e&&e.length){var i=this.cells.length-1;e.forEach(function(t){t.remove();var e=this.cells.indexOf(t);i=Math.min(e,i),n.removeFrom(this.cells,t)},this),this.cellChange(i,!0)}},i.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},i.cellChange=function(t,e){var i=this.selectedElement;this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize();var n=this.getCell(i);n&&(this.selectedIndex=this.getCellSlideIndex(n)),this.selectedIndex=Math.min(this.slides.length-1,this.selectedIndex),this.emitEvent("cellChange",[t]),this.select(this.selectedIndex),e&&this.positionSliderAtSelected()},e}),function(i,n){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(t,e){return n(i,t,e)}):"object"==typeof module&&module.exports?module.exports=n(i,require("./flickity"),require("fizzy-ui-utils")):n(i,i.Flickity,i.fizzyUIUtils)}(window,function(t,e,o){"use strict";e.createMethods.push("_createLazyload");var i=e.prototype;function s(t,e){this.img=t,this.flickity=e,this.load()}return i._createLazyload=function(){this.on("select",this.lazyLoad)},i.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),n=[];i.forEach(function(t){var e=function(t){if("IMG"==t.nodeName){var e=t.getAttribute("data-flickity-lazyload"),i=t.getAttribute("data-flickity-lazyload-src"),n=t.getAttribute("data-flickity-lazyload-srcset");if(e||i||n)return[t]}var s=t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");return o.makeArray(s)}(t);n=n.concat(e)}),n.forEach(function(t){new s(t,this)},this)}},s.prototype.handleEvent=o.handleEvent,s.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this);var t=this.img.getAttribute("data-flickity-lazyload")||this.img.getAttribute("data-flickity-lazyload-src"),e=this.img.getAttribute("data-flickity-lazyload-srcset");this.img.src=t,e&&this.img.setAttribute("srcset",e),this.img.removeAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload-src"),this.img.removeAttribute("data-flickity-lazyload-srcset")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(n,s){n.createMethods.push("_createAsNavFor");var t=n.prototype;return t._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},t.setNavCompanion=function(t){t=s.getQueryElement(t);var e=n.data(t);if(e&&e!=this){this.navCompanion=e;var i=this;this.onNavCompanionSelect=function(){i.navCompanionSelect()},e.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},t.navCompanionSelect=function(t){var e=this.navCompanion&&this.navCompanion.selectedCells;if(e){var i=e[0],n=this.navCompanion.cells.indexOf(i),s=n+e.length-1,o=Math.floor(function(t,e,i){return(e-t)*i+t}(n,s,this.navCompanion.cellAlign));if(this.selectCell(o,!1,t),this.removeNavSelectedElements(),!(o>=this.cells.length)){var r=this.cells.slice(n,1+s);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},t.changeNavSelectedClass=function(e){this.navSelectedElements.forEach(function(t){t.classList[e]("is-nav-selected")})},t.activateAsNavFor=function(){this.navCompanionSelect(!0)},t.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},t.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},t.deactivateAsNavFor=function(){this.removeNavSelectedElements()},t.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},n}),function(e,i){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(t){return i(e,t)}):"object"==typeof module&&module.exports?module.exports=i(e,require("ev-emitter")):e.imagesLoaded=i(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){var s=e.jQuery,o=e.console;function r(t,e){for(var i in e)t[i]=e[i];return t}var a=Array.prototype.slice;function l(t,e,i){if(!(this instanceof l))return new l(t,e,i);var n=t;"string"==typeof t&&(n=document.querySelectorAll(t)),n?(this.elements=function(t){return Array.isArray(t)?t:"object"==typeof t&&"number"==typeof t.length?a.call(t):[t]}(n),this.options=r({},this.options),"function"==typeof e?i=e:r(this.options,e),i&&this.on("always",i),this.getImages(),s&&(this.jqDeferred=new s.Deferred),setTimeout(this.check.bind(this))):o.error("Bad element for imagesLoaded "+(n||t))}(l.prototype=Object.create(t.prototype)).options={},l.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},l.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&h[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(n=0;n<o.length;n++){var r=o[n];this.addElementBackgroundImages(r)}}}};var h={1:!0,9:!0,11:!0};function i(t){this.img=t}function n(t,e){this.url=t,this.element=e,this.img=new Image}return l.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var s=n&&n[2];s&&this.addBackground(s,t),n=i.exec(e.backgroundImage)}},l.prototype.addImage=function(t){var e=new i(t);this.images.push(e)},l.prototype.addBackground=function(t,e){var i=new n(t,e);this.images.push(i)},l.prototype.check=function(){var n=this;function e(t,e,i){setTimeout(function(){n.progress(t,e,i)})}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach(function(t){t.once("progress",e),t.check()}):this.complete()},l.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&o&&o.log("progress: "+i,t,e)},l.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},(i.prototype=Object.create(t.prototype)).check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},i.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},i.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},i.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},i.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},i.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},(n.prototype=Object.create(i.prototype)).check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},n.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},n.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},l.makeJQueryPlugin=function(t){(t=t||e.jQuery)&&((s=t).fn.imagesLoaded=function(t,e){return new l(this,t,e).jqDeferred.promise(s(this))})},l.makeJQueryPlugin(),l}),function(i,n){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(t,e){return n(i,t,e)}):"object"==typeof module&&module.exports?module.exports=n(i,require("flickity"),require("imagesloaded")):i.Flickity=n(i,i.Flickity,i.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){if(this.options.imagesLoaded){var n=this;i(this.slider).on("progress",function(t,e){var i=n.getParentCell(e.img);n.cellSizeChange(i&&i.element),n.options.freeScroll||n.positionSliderAtSelected()})}},e});

// ios13 fix 

(function() {
  let touchingCarousel = false,
    touchStartCoords;

  document.body.addEventListener('touchstart', function(e) {
    if (e.target.closest('.flickity-slider')) {
      touchingCarousel = true;
    } else {
      touchingCarousel = false;
      return;
    }

    touchStartCoords = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    }
  });

  document.body.addEventListener('touchmove', function(e) {
    if (!(touchingCarousel && e.cancelable)) {
      return;
    }

    let moveVector = {
      x: e.touches[0].pageX - touchStartCoords.x,
      y: e.touches[0].pageY - touchStartCoords.y
    };

    if (Math.abs(moveVector.x) > Flickity.defaults.dragThreshold)
      e.preventDefault()

  }, {passive: false});
})();

/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,r,a){function h(t,e,n){var o,r="$()."+i+'("'+e+'")';return t.each(function(t,h){var u=a.data(h,i);if(!u)return void s(i+" not initialized. Cannot call methods, i.e. "+r);var d=u[e];if(!d||"_"==e.charAt(0))return void s(r+" is not a valid method");var l=d.apply(u,n);o=void 0===o?l:o}),void 0!==o?o:t}function u(t,e){t.each(function(t,n){var o=a.data(n,i);o?(o.option(e),o._init()):(o=new r(n,e),a.data(n,i,o))})}a=a||e||t.jQuery,a&&(r.prototype.option||(r.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=o.call(arguments,1);return h(this,t,e)}return u(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var o=Array.prototype.slice,r=t.console,s="undefined"==typeof r?function(){}:function(t){r.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),e=e||[];for(var n=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(t,r),delete n[r]),r.apply(this,e)}return this}},e.allOff=function(){delete this._events,delete this._onceEvents},t}),function(t,e){"function"==typeof define&&define.amd?define("get-size/get-size",e):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=-1==t.indexOf("%")&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;u>e;e++){var i=h[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),e}function o(){if(!d){d=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var o=n(e);s=200==Math.round(t(o.width)),r.isBoxSizeOuter=s,i.removeChild(e)}}function r(e){if(o(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var r=n(e);if("none"==r.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var d=a.isBorderBox="border-box"==r.boxSizing,l=0;u>l;l++){var c=h[l],f=r[c],m=parseFloat(f);a[c]=isNaN(m)?0:m}var p=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,y=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,_=a.borderLeftWidth+a.borderRightWidth,z=a.borderTopWidth+a.borderBottomWidth,E=d&&s,b=t(r.width);b!==!1&&(a.width=b+(E?0:p+_));var x=t(r.height);return x!==!1&&(a.height=x+(E?0:g+z)),a.innerWidth=a.width-(p+_),a.innerHeight=a.height-(g+z),a.outerWidth=a.width+y,a.outerHeight=a.height+v,a}}var s,a="undefined"==typeof console?e:function(t){console.error(t)},h=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],u=h.length,d=!1;return r}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=window.Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],o=n+"MatchesSelector";if(t[o])return o}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e};var n=Array.prototype.slice;i.makeArray=function(t){if(Array.isArray(t))return t;if(null===t||void 0===t)return[];var e="object"==typeof t&&"number"==typeof t.length;return e?n.call(t):[t]},i.removeFrom=function(t,e){var i=t.indexOf(e);-1!=i&&t.splice(i,1)},i.getParent=function(t,i){for(;t.parentNode&&t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var o=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void o.push(t);e(t,n)&&o.push(t);for(var i=t.querySelectorAll(n),r=0;r<i.length;r++)o.push(i[r])}}),o},i.debounceMethod=function(t,e,i){i=i||100;var n=t.prototype[e],o=e+"Timeout";t.prototype[e]=function(){var t=this[o];clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var o=t.console;return i.htmlInit=function(e,n){i.docReady(function(){var r=i.toDashed(n),s="data-"+r,a=document.querySelectorAll("["+s+"]"),h=document.querySelectorAll(".js-"+r),u=i.makeArray(a).concat(i.makeArray(h)),d=s+"-options",l=t.jQuery;u.forEach(function(t){var i,r=t.getAttribute(s)||t.getAttribute(d);try{i=r&&JSON.parse(r)}catch(a){return void(o&&o.error("Error parsing "+s+" on "+t.className+": "+a))}var h=new e(t,i);l&&l.data(t,n,h)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("outlayer/item",["ev-emitter/ev-emitter","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("get-size")):(t.Outlayer={},t.Outlayer.Item=e(t.EvEmitter,t.getSize))}(window,function(t,e){"use strict";function i(t){for(var e in t)return!1;return e=null,!0}function n(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}var r=document.documentElement.style,s="string"==typeof r.transition?"transition":"WebkitTransition",a="string"==typeof r.transform?"transform":"WebkitTransform",h={WebkitTransition:"webkitTransitionEnd",transition:"transitionend"}[s],u={transform:a,transition:s,transitionDuration:s+"Duration",transitionProperty:s+"Property",transitionDelay:s+"Delay"},d=n.prototype=Object.create(t.prototype);d.constructor=n,d._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},d.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.getSize=function(){this.size=e(this.element)},d.css=function(t){var e=this.element.style;for(var i in t){var n=u[i]||i;e[n]=t[i]}},d.getPosition=function(){var t=getComputedStyle(this.element),e=this.layout._getOption("originLeft"),i=this.layout._getOption("originTop"),n=t[e?"left":"right"],o=t[i?"top":"bottom"],r=parseFloat(n),s=parseFloat(o),a=this.layout.size;-1!=n.indexOf("%")&&(r=r/100*a.width),-1!=o.indexOf("%")&&(s=s/100*a.height),r=isNaN(r)?0:r,s=isNaN(s)?0:s,r-=e?a.paddingLeft:a.paddingRight,s-=i?a.paddingTop:a.paddingBottom,this.position.x=r,this.position.y=s},d.layoutPosition=function(){var t=this.layout.size,e={},i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop"),o=i?"paddingLeft":"paddingRight",r=i?"left":"right",s=i?"right":"left",a=this.position.x+t[o];e[r]=this.getXValue(a),e[s]="";var h=n?"paddingTop":"paddingBottom",u=n?"top":"bottom",d=n?"bottom":"top",l=this.position.y+t[h];e[u]=this.getYValue(l),e[d]="",this.css(e),this.emitEvent("layout",[this])},d.getXValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&!e?t/this.layout.size.width*100+"%":t+"px"},d.getYValue=function(t){var e=this.layout._getOption("horizontal");return this.layout.options.percentPosition&&e?t/this.layout.size.height*100+"%":t+"px"},d._transitionTo=function(t,e){this.getPosition();var i=this.position.x,n=this.position.y,o=t==this.position.x&&e==this.position.y;if(this.setPosition(t,e),o&&!this.isTransitioning)return void this.layoutPosition();var r=t-i,s=e-n,a={};a.transform=this.getTranslate(r,s),this.transition({to:a,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},d.getTranslate=function(t,e){var i=this.layout._getOption("originLeft"),n=this.layout._getOption("originTop");return t=i?t:-t,e=n?e:-e,"translate3d("+t+"px, "+e+"px, 0)"},d.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},d.moveTo=d._transitionTo,d.setPosition=function(t,e){this.position.x=parseFloat(t),this.position.y=parseFloat(e)},d._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},d.transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var n=this.element.offsetHeight;n=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var l="opacity,"+o(a);d.enableTransition=function(){if(!this.isTransitioning){var t=this.layout.options.transitionDuration;t="number"==typeof t?t+"ms":t,this.css({transitionProperty:l,transitionDuration:t,transitionDelay:this.staggerDelay||0}),this.element.addEventListener(h,this,!1)}},d.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},d.onotransitionend=function(t){this.ontransitionend(t)};var c={"-webkit-transform":"transform"};d.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,n=c[t.propertyName]||t.propertyName;if(delete e.ingProperties[n],i(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd){var o=e.onEnd[n];o.call(this),delete e.onEnd[n]}this.emitEvent("transitionEnd",[this])}},d.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(h,this,!1),this.isTransitioning=!1},d._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var f={transitionProperty:"",transitionDuration:"",transitionDelay:""};return d.removeTransitionStyles=function(){this.css(f)},d.stagger=function(t){t=isNaN(t)?0:t,this.staggerDelay=t+"ms"},d.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},d.remove=function(){return s&&parseFloat(this.layout.options.transitionDuration)?(this.once("transitionEnd",function(){this.removeElem()}),void this.hide()):void this.removeElem()},d.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("visibleStyle");e[i]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},d.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},d.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var i in e)return i},d.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={},i=this.getHideRevealTransitionEndProperty("hiddenStyle");e[i]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},d.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},d.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},n}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("outlayer/outlayer",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(i,n,o,r){return e(t,i,n,o,r)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):t.Outlayer=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,t.Outlayer.Item)}(window,function(t,e,i,n,o){"use strict";function r(t,e){var i=n.getQueryElement(t);if(!i)return void(h&&h.error("Bad element for "+this.constructor.namespace+": "+(i||t)));this.element=i,u&&(this.$element=u(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e);var o=++l;this.element.outlayerGUID=o,c[o]=this,this._create();var r=this._getOption("initLayout");r&&this.layout()}function s(t){function e(){t.apply(this,arguments)}return e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e}function a(t){if("number"==typeof t)return t;var e=t.match(/(^\d*\.?\d*)(\w*)/),i=e&&e[1],n=e&&e[2];if(!i.length)return 0;i=parseFloat(i);var o=m[n]||1;return i*o}var h=t.console,u=t.jQuery,d=function(){},l=0,c={};r.namespace="outlayer",r.Item=o,r.defaults={containerStyle:{position:"relative"},initLayout:!0,originLeft:!0,originTop:!0,resize:!0,resizeContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}};var f=r.prototype;n.extend(f,e.prototype),f.option=function(t){n.extend(this.options,t)},f._getOption=function(t){var e=this.constructor.compatOptions[t];return e&&void 0!==this.options[e]?this.options[e]:this.options[t]},r.compatOptions={initLayout:"isInitLayout",horizontal:"isHorizontal",layoutInstant:"isLayoutInstant",originLeft:"isOriginLeft",originTop:"isOriginTop",resize:"isResizeBound",resizeContainer:"isResizingContainer"},f._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),n.extend(this.element.style,this.options.containerStyle);var t=this._getOption("resize");t&&this.bindResize()},f.reloadItems=function(){this.items=this._itemize(this.element.children)},f._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,n=[],o=0;o<e.length;o++){var r=e[o],s=new i(r,this);n.push(s)}return n},f._filterFindItemElements=function(t){return n.filterFindElements(t,this.options.itemSelector)},f.getItemElements=function(){return this.items.map(function(t){return t.element})},f.layout=function(){this._resetLayout(),this._manageStamps();var t=this._getOption("layoutInstant"),e=void 0!==t?t:!this._isLayoutInited;this.layoutItems(this.items,e),this._isLayoutInited=!0},f._init=f.layout,f._resetLayout=function(){this.getSize()},f.getSize=function(){this.size=i(this.element)},f._getMeasurement=function(t,e){var n,o=this.options[t];o?("string"==typeof o?n=this.element.querySelector(o):o instanceof HTMLElement&&(n=o),this[t]=n?i(n)[e]:o):this[t]=0},f.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},f._getItemsForLayout=function(t){return t.filter(function(t){return!t.isIgnored})},f._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){var i=[];t.forEach(function(t){var n=this._getItemLayoutPosition(t);n.item=t,n.isInstant=e||t.isLayoutInstant,i.push(n)},this),this._processLayoutQueue(i)}},f._getItemLayoutPosition=function(){return{x:0,y:0}},f._processLayoutQueue=function(t){this.updateStagger(),t.forEach(function(t,e){this._positionItem(t.item,t.x,t.y,t.isInstant,e)},this)},f.updateStagger=function(){var t=this.options.stagger;return null===t||void 0===t?void(this.stagger=0):(this.stagger=a(t),this.stagger)},f._positionItem=function(t,e,i,n,o){n?t.goTo(e,i):(t.stagger(o*this.stagger),t.moveTo(e,i))},f._postLayout=function(){this.resizeContainer()},f.resizeContainer=function(){var t=this._getOption("resizeContainer");if(t){var e=this._getContainerSize();e&&(this._setContainerMeasure(e.width,!0),this._setContainerMeasure(e.height,!1))}},f._getContainerSize=d,f._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},f._emitCompleteOnItems=function(t,e){function i(){o.dispatchEvent(t+"Complete",null,[e])}function n(){s++,s==r&&i()}var o=this,r=e.length;if(!e||!r)return void i();var s=0;e.forEach(function(e){e.once(t,n)})},f.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),u)if(this.$element=this.$element||u(this.element),e){var o=u.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},f.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},f.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},f.stamp=function(t){t=this._find(t),t&&(this.stamps=this.stamps.concat(t),t.forEach(this.ignore,this))},f.unstamp=function(t){t=this._find(t),t&&t.forEach(function(t){n.removeFrom(this.stamps,t),this.unignore(t)},this)},f._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=n.makeArray(t)):void 0},f._manageStamps=function(){this.stamps&&this.stamps.length&&(this._getBoundingRect(),this.stamps.forEach(this._manageStamp,this))},f._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},f._manageStamp=d,f._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,o=i(t),r={left:e.left-n.left-o.marginLeft,top:e.top-n.top-o.marginTop,right:n.right-e.right-o.marginRight,bottom:n.bottom-e.bottom-o.marginBottom};return r},f.handleEvent=n.handleEvent,f.bindResize=function(){t.addEventListener("resize",this),this.isResizeBound=!0},f.unbindResize=function(){t.removeEventListener("resize",this),this.isResizeBound=!1},f.onresize=function(){this.resize()},n.debounceMethod(r,"onresize",100),f.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},f.needsResizeLayout=function(){var t=i(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},f.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},f.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},f.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},f.reveal=function(t){if(this._emitCompleteOnItems("reveal",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.reveal()})}},f.hide=function(t){if(this._emitCompleteOnItems("hide",t),t&&t.length){var e=this.updateStagger();t.forEach(function(t,i){t.stagger(i*e),t.hide()})}},f.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},f.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},f.getItem=function(t){for(var e=0;e<this.items.length;e++){var i=this.items[e];if(i.element==t)return i}},f.getItems=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getItem(t);i&&e.push(i)},this),e},f.remove=function(t){var e=this.getItems(t);this._emitCompleteOnItems("remove",e),e&&e.length&&e.forEach(function(t){t.remove(),n.removeFrom(this.items,t)},this)},f.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="",this.items.forEach(function(t){t.destroy()}),this.unbindResize();var e=this.element.outlayerGUID;delete c[e],delete this.element.outlayerGUID,u&&u.removeData(this.element,this.constructor.namespace)},r.data=function(t){t=n.getQueryElement(t);var e=t&&t.outlayerGUID;return e&&c[e]},r.create=function(t,e){var i=s(r);return i.defaults=n.extend({},r.defaults),n.extend(i.defaults,e),i.compatOptions=n.extend({},r.compatOptions),i.namespace=t,i.data=r.data,i.Item=s(o),n.htmlInit(i,t),u&&u.bridget&&u.bridget(t,i),i};var m={ms:1,s:1e3};return r.Item=o,r}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("get-size")):t.Masonry=e(t.Outlayer,t.getSize)}(window,function(t,e){var i=t.create("masonry");i.compatOptions.fitWidth="isFitWidth";var n=i.prototype;return n._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns(),this.colYs=[];for(var t=0;t<this.cols;t++)this.colYs.push(0);this.maxY=0,this.horizontalColIndex=0},n.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}var n=this.columnWidth+=this.gutter,o=this.containerWidth+this.gutter,r=o/n,s=n-o%n,a=s&&1>s?"round":"floor";r=Math[a](r),this.cols=Math.max(r,1)},n.getContainerWidth=function(){var t=this._getOption("fitWidth"),i=t?this.element.parentNode:this.element,n=e(i);this.containerWidth=n&&n.innerWidth},n._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,i=e&&1>e?"round":"ceil",n=Math[i](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var o=this.options.horizontalOrder?"_getHorizontalColPosition":"_getTopColPosition",r=this[o](n,t),s={x:this.columnWidth*r.col,y:r.y},a=r.y+t.size.outerHeight,h=n+r.col,u=r.col;h>u;u++)this.colYs[u]=a;return s},n._getTopColPosition=function(t){var e=this._getTopColGroup(t),i=Math.min.apply(Math,e);return{col:e.indexOf(i),y:i}},n._getTopColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,n=0;i>n;n++)e[n]=this._getColGroupY(n,t);return e},n._getColGroupY=function(t,e){if(2>e)return this.colYs[t];var i=this.colYs.slice(t,t+e);return Math.max.apply(Math,i)},n._getHorizontalColPosition=function(t,e){var i=this.horizontalColIndex%this.cols,n=t>1&&i+t>this.cols;i=n?0:i;var o=e.size.outerWidth&&e.size.outerHeight;return this.horizontalColIndex=o?i+t:this.horizontalColIndex,{col:i,y:this._getColGroupY(i,t)}},n._manageStamp=function(t){var i=e(t),n=this._getElementOffset(t),o=this._getOption("originLeft"),r=o?n.left:n.right,s=r+i.outerWidth,a=Math.floor(r/this.columnWidth);a=Math.max(0,a);var h=Math.floor(s/this.columnWidth);h-=s%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var u=this._getOption("originTop"),d=(u?n.top:n.bottom)+i.outerHeight,l=a;h>=l;l++)this.colYs[l]=Math.max(d,this.colYs[l])},n._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this._getOption("fitWidth")&&(t.width=this._getContainerFitWidth()),t},n._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},n.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!=this.containerWidth},i});

/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/respimg/ls.respimg.min.js */
/*! lazysizes - v5.1.2 */
!function(a,b){if(a){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}}("undefined"!=typeof window?window:0,function(a,b,c){"use strict";var d,e=c.cfg,f=b.createElement("img"),g="sizes"in f&&"srcset"in f,h=/\s+\d+h/g,i=function(){var a=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,d=Array.prototype.forEach;return function(){var f=b.createElement("img"),g=function(b){var c,d,f=b.getAttribute(e.srcsetAttr);f&&(d=f.match(a))&&(c="w"==d[2]?d[1]/d[3]:d[3]/d[1],c&&b.setAttribute("data-aspectratio",c),b.setAttribute(e.srcsetAttr,f.replace(h,"")))},i=function(a){if(a.detail.instance==c){var b=a.target.parentNode;b&&"PICTURE"==b.nodeName&&d.call(b.getElementsByTagName("source"),g),g(a.target)}},j=function(){f.currentSrc&&b.removeEventListener("lazybeforeunveil",i)};b.addEventListener("lazybeforeunveil",i),f.onload=j,f.onerror=j,f.srcset="data:,a 1w 1h",f.complete&&j()}}();if(e.supportsType||(e.supportsType=function(a){return!a}),a.HTMLPictureElement&&g)return void(!c.hasHDescriptorFix&&b.msElementsFromPoint&&(c.hasHDescriptorFix=!0,i()));a.picturefill||e.pf||(e.pf=function(b){var c,e;if(!a.picturefill)for(c=0,e=b.elements.length;c<e;c++)d(b.elements[c])},d=function(){var f=function(a,b){return a.w-b.w},i=/^\s*\d+\.*\d*px\s*$/,j=function(a){var b,c,d=a.length,e=a[d-1],f=0;for(f;f<d;f++)if(e=a[f],e.d=e.w/a.w,e.d>=a.d){!e.cached&&(b=a[f-1])&&b.d>a.d-.13*Math.pow(a.d,2.2)&&(c=Math.pow(b.d-.6,1.6),b.cached&&(b.d+=.15*c),b.d+(e.d-a.d)*c>a.d&&(e=b));break}return e},k=function(){var a,b=/(([^,\s].[^\s]+)\s+(\d+)w)/g,c=/\s/,d=function(b,c,d,e){a.push({c:c,u:d,w:1*e})};return function(e){return a=[],e=e.trim(),e.replace(h,"").replace(b,d),a.length||!e||c.test(e)||a.push({c:e,u:e,w:99}),a}}(),l=function(){l.init||(l.init=!0,addEventListener("resize",function(){var a,c=b.getElementsByClassName("lazymatchmedia"),e=function(){var a,b;for(a=0,b=c.length;a<b;a++)d(c[a])};return function(){clearTimeout(a),a=setTimeout(e,66)}}()))},m=function(b,d){var f,g=b.getAttribute("srcset")||b.getAttribute(e.srcsetAttr);!g&&d&&(g=b._lazypolyfill?b._lazypolyfill._set:b.getAttribute(e.srcAttr)||b.getAttribute("src")),b._lazypolyfill&&b._lazypolyfill._set==g||(f=k(g||""),d&&b.parentNode&&(f.isPicture="PICTURE"==b.parentNode.nodeName.toUpperCase(),f.isPicture&&a.matchMedia&&(c.aC(b,"lazymatchmedia"),l())),f._set=g,Object.defineProperty(b,"_lazypolyfill",{value:f,writable:!0}))},n=function(b){var d=a.devicePixelRatio||1,e=c.getX&&c.getX(b);return Math.min(e||d,2.5,d)},o=function(b){return a.matchMedia?(o=function(a){return!a||(matchMedia(a)||{}).matches})(b):!b},p=function(a){var b,d,g,h,k,l,p;if(h=a,m(h,!0),k=h._lazypolyfill,k.isPicture)for(d=0,b=a.parentNode.getElementsByTagName("source"),g=b.length;d<g;d++)if(e.supportsType(b[d].getAttribute("type"),a)&&o(b[d].getAttribute("media"))){h=b[d],m(h),k=h._lazypolyfill;break}return k.length>1?(p=h.getAttribute("sizes")||"",p=i.test(p)&&parseInt(p,10)||c.gW(a,a.parentNode),k.d=n(a),!k.src||!k.w||k.w<p?(k.w=p,l=j(k.sort(f)),k.src=l):l=k.src):l=k[0],l},q=function(a){if(!g||!a.parentNode||"PICTURE"==a.parentNode.nodeName.toUpperCase()){var b=p(a);b&&b.u&&a._lazypolyfill.cur!=b.u&&(a._lazypolyfill.cur=b.u,b.cached=!0,a.setAttribute(e.srcAttr,b.u),a.setAttribute("src",b.u))}};return q.parse=k,q}(),e.loadedClass&&e.loadingClass&&function(){var a=[];['img[sizes$="px"][srcset].',"picture > img:not([srcset])."].forEach(function(b){a.push(b+e.loadedClass),a.push(b+e.loadingClass)}),e.pf({elements:b.querySelectorAll(a.join(", "))})}())});

/* https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/parent-fit/ls.parent-fit.min.js */
/*! lazysizes - v5.1.2 */
!function(a,b){if(a){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}}("undefined"!=typeof window?window:0,function(a,b,c){"use strict";if(a.addEventListener){var d=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,e=/parent-fit["']*\s*:\s*["']*(contain|cover|width)/,f=/parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,g=/^picture$/i,h=c.cfg,i=function(a){return getComputedStyle(a,null)||{}},j={getParent:function(b,c){var d=b,e=b.parentNode;return c&&"prev"!=c||!e||!g.test(e.nodeName||"")||(e=e.parentNode),"self"!=c&&(d="prev"==c?b.previousElementSibling:c&&(e.closest||a.jQuery)?(e.closest?e.closest(c):jQuery(e).closest(c)[0])||e:e),d},getFit:function(a){var b,c,d=i(a),g=d.content||d.fontFamily,h={fit:a._lazysizesParentFit||a.getAttribute("data-parent-fit")};return!h.fit&&g&&(b=g.match(e))&&(h.fit=b[1]),h.fit?(c=a._lazysizesParentContainer||a.getAttribute("data-parent-container"),!c&&g&&(b=g.match(f))&&(c=b[1]),h.parent=j.getParent(a,c)):h.fit=d.objectFit,h},getImageRatio:function(b){var c,e,f,i,j,k,l,m=b.parentNode,n=m&&g.test(m.nodeName||"")?m.querySelectorAll("source, img"):[b];for(c=0;c<n.length;c++)if(b=n[c],e=b.getAttribute(h.srcsetAttr)||b.getAttribute("srcset")||b.getAttribute("data-pfsrcset")||b.getAttribute("data-risrcset")||"",f=b._lsMedia||b.getAttribute("media"),f=h.customMedia[b.getAttribute("data-media")||f]||f,e&&(!f||(a.matchMedia&&matchMedia(f)||{}).matches)){i=parseFloat(b.getAttribute("data-aspectratio")),i||(j=e.match(d),j?"w"==j[2]?(k=j[1],l=j[3]):(k=j[3],l=j[1]):(k=b.getAttribute("width"),l=b.getAttribute("height")),i=k/l);break}return i},calculateSize:function(a,b){var c,d,e,f,g=this.getFit(a),h=g.fit,i=g.parent;return"width"==h||("contain"==h||"cover"==h)&&(e=this.getImageRatio(a))?(i?b=i.clientWidth:i=a,f=b,"width"==h?f=b:(d=i.clientHeight,(c=b/d)&&("cover"==h&&c<e||"contain"==h&&c>e)&&(f=b*(e/c))),f):b}};c.parentFit=j,b.addEventListener("lazybeforesizes",function(a){if(!a.defaultPrevented&&a.detail.instance==c){var b=a.target;a.detail.width=j.calculateSize(b,a.detail.width)}})}});

/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/bgset/ls.bgset.min.js */
/*! lazysizes - v5.1.2 */
!function(a,b){var c=function(){b(a.lazySizes),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}(window,function(a,b,c){"use strict";if(a.addEventListener){var d=c.cfg,e=/\s+/g,f=/\s*\|\s+|\s+\|\s*/g,g=/^(.+?)(?:\s+\[\s*(.+?)\s*\])(?:\s+\[\s*(.+?)\s*\])?$/,h=/^\s*\(*\s*type\s*:\s*(.+?)\s*\)*\s*$/,i=/\(|\)|'/,j={contain:1,cover:1},k=function(a){var b=c.gW(a,a.parentNode);return(!a._lazysizesWidth||b>a._lazysizesWidth)&&(a._lazysizesWidth=b),a._lazysizesWidth},l=function(a){var b;return b=(getComputedStyle(a)||{getPropertyValue:function(){}}).getPropertyValue("background-size"),!j[b]&&j[a.style.backgroundSize]&&(b=a.style.backgroundSize),b},m=function(a,b){if(b){var c=b.match(h);c&&c[1]?a.setAttribute("type",c[1]):a.setAttribute("media",d.customMedia[b]||b)}},n=function(a,c,h){var i=b.createElement("picture"),j=c.getAttribute(d.sizesAttr),k=c.getAttribute("data-ratio"),l=c.getAttribute("data-optimumx");c._lazybgset&&c._lazybgset.parentNode==c&&c.removeChild(c._lazybgset),Object.defineProperty(h,"_lazybgset",{value:c,writable:!0}),Object.defineProperty(c,"_lazybgset",{value:i,writable:!0}),a=a.replace(e," ").split(f),i.style.display="none",h.className=d.lazyClass,1!=a.length||j||(j="auto"),a.forEach(function(a){var c,e=b.createElement("source");j&&"auto"!=j&&e.setAttribute("sizes",j),(c=a.match(g))?(e.setAttribute(d.srcsetAttr,c[1]),m(e,c[2]),m(e,c[3])):e.setAttribute(d.srcsetAttr,a),i.appendChild(e)}),j&&(h.setAttribute(d.sizesAttr,j),c.removeAttribute(d.sizesAttr),c.removeAttribute("sizes")),l&&h.setAttribute("data-optimumx",l),k&&h.setAttribute("data-ratio",k),i.appendChild(h),c.appendChild(i)},o=function(a){if(a.target._lazybgset){var b=a.target,d=b._lazybgset,e=b.currentSrc||b.src;if(e){var f=c.fire(d,"bgsetproxy",{src:e,useSrc:i.test(e)?JSON.stringify(e):e});f.defaultPrevented||(d.style.backgroundImage="url("+f.detail.useSrc+")")}b._lazybgsetLoading&&(c.fire(d,"_lazyloaded",{},!1,!0),delete b._lazybgsetLoading)}};addEventListener("lazybeforeunveil",function(a){var d,e,f;!a.defaultPrevented&&(d=a.target.getAttribute("data-bgset"))&&(f=a.target,e=b.createElement("img"),e.alt="",e._lazybgsetLoading=!0,a.detail.firesLoad=!0,n(d,f,e),setTimeout(function(){c.loader.unveil(e),c.rAF(function(){c.fire(e,"_lazyloaded",{},!0,!0),e.complete&&o({target:e})})}))}),b.addEventListener("load",o,!0),a.addEventListener("lazybeforesizes",function(a){if(a.detail.instance==c&&a.target._lazybgset&&a.detail.dataAttr){var b=a.target._lazybgset,d=l(b);j[d]&&(a.target._lazysizesParentFit=d,c.rAF(function(){a.target.setAttribute("data-parent-fit",d),a.target._lazysizesParentFit&&delete a.target._lazysizesParentFit}))}},!0),b.documentElement.addEventListener("lazybeforesizes",function(a){!a.defaultPrevented&&a.target._lazybgset&&a.detail.instance==c&&(a.detail.width=k(a.target._lazybgset))})}});

/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/plugins/object-fit/ls.object-fit.min.js */
/*! lazysizes - v5.1.2 */
!function(a,b){if(a){var c=function(d){b(a.lazySizes,d),a.removeEventListener("lazyunveilread",c,!0)};b=b.bind(null,a,a.document),"object"==typeof module&&module.exports?b(require("lazysizes")):a.lazySizes?c():a.addEventListener("lazyunveilread",c,!0)}}("undefined"!=typeof window?window:0,function(a,b,c,d){"use strict";function e(a){var b=getComputedStyle(a,null)||{},c=b.fontFamily||"",d=c.match(m)||"",e=d&&c.match(n)||"";return e&&(e=e[1]),{fit:d&&d[1]||"",position:q[e]||e||"center"}}function f(){if(!i){var a=b.createElement("style");i=c.cfg.objectFitClass||"lazysizes-display-clone",b.querySelector("head").appendChild(a)}}function g(a){var b=a.previousElementSibling;b&&c.hC(b,i)&&(b.parentNode.removeChild(b),a.style.position=b.getAttribute("data-position")||"",a.style.visibility=b.getAttribute("data-visibility")||"")}function h(a,b){var d,e,h,j,k=c.cfg,l=function(){var b=a.currentSrc||a.src;b&&e!==b&&(e=b,j.backgroundImage="url("+(p.test(b)?JSON.stringify(b):b)+")",d||(d=!0,c.rC(h,k.loadingClass),c.aC(h,k.loadedClass)))},m=function(){c.rAF(l)};a._lazysizesParentFit=b.fit,a.addEventListener("lazyloaded",m,!0),a.addEventListener("load",m,!0),c.rAF(function(){var d=a,e=a.parentNode;"PICTURE"==e.nodeName.toUpperCase()&&(d=e,e=e.parentNode),g(d),i||f(),h=a.cloneNode(!1),j=h.style,h.addEventListener("load",function(){var a=h.currentSrc||h.src;a&&a!=o&&(h.src=o,h.srcset="")}),c.rC(h,k.loadedClass),c.rC(h,k.lazyClass),c.rC(h,k.autosizesClass),c.aC(h,k.loadingClass),c.aC(h,i),["data-parent-fit","data-parent-container","data-object-fit-polyfilled",k.srcsetAttr,k.srcAttr].forEach(function(a){h.removeAttribute(a)}),h.src=o,h.srcset="",j.backgroundRepeat="no-repeat",j.backgroundPosition=b.position,j.backgroundSize=b.fit,h.setAttribute("data-position",d.style.position),h.setAttribute("data-visibility",d.style.visibility),d.style.visibility="hidden",d.style.position="absolute",a.setAttribute("data-parent-fit",b.fit),a.setAttribute("data-parent-container","prev"),a.setAttribute("data-object-fit-polyfilled",""),a._objectFitPolyfilledDisplay=h,e.insertBefore(h,d),a._lazysizesParentFit&&delete a._lazysizesParentFit,a.complete&&l()})}var i,j=b.createElement("a").style,k="objectFit"in j,l=k&&"objectPosition"in j,m=/object-fit["']*\s*:\s*["']*(contain|cover)/,n=/object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,o="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",p=/\(|\)|'/,q={center:"center","50% 50%":"center"};if(!k||!l){var r=function(a){if(a.detail.instance==c){var b=a.target,d=e(b);return!(!d.fit||k&&"center"==d.position)&&(h(b,d),!0)}};a.addEventListener("lazybeforesizes",function(a){if(a.detail.instance==c){var b=a.target;null==b.getAttribute("data-object-fit-polyfilled")||b._objectFitPolyfilledDisplay||r(a)||c.rAF(function(){b.removeAttribute("data-object-fit-polyfilled")})}}),a.addEventListener("lazyunveilread",r,!0),d&&d.detail&&r(d)}});

/*! https://raw.githubusercontent.com/aFarkas/lazysizes/gh-pages/lazysizes.min.js */
/*! lazysizes - v5.1.2 */
!function(a,b){var c=b(a,a.document);a.lazySizes=c,"object"==typeof module&&module.exports&&(module.exports=c)}("undefined"!=typeof window?window:{},function(a,b){"use strict";var c,d;if(function(){var b,c={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};d=a.lazySizesConfig||a.lazysizesConfig||{};for(b in c)b in d||(d[b]=c[b])}(),!b||!b.getElementsByClassName)return{init:function(){},cfg:d,noSupport:!0};var e=b.documentElement,f=a.Date,g=a.HTMLPictureElement,h="addEventListener",i="getAttribute",j=a[h],k=a.setTimeout,l=a.requestAnimationFrame||k,m=a.requestIdleCallback,n=/^picture$/i,o=["load","error","lazyincluded","_lazyloaded"],p={},q=Array.prototype.forEach,r=function(a,b){return p[b]||(p[b]=new RegExp("(\\s|^)"+b+"(\\s|$)")),p[b].test(a[i]("class")||"")&&p[b]},s=function(a,b){r(a,b)||a.setAttribute("class",(a[i]("class")||"").trim()+" "+b)},t=function(a,b){var c;(c=r(a,b))&&a.setAttribute("class",(a[i]("class")||"").replace(c," "))},u=function(a,b,c){var d=c?h:"removeEventListener";c&&u(a,b),o.forEach(function(c){a[d](c,b)})},v=function(a,d,e,f,g){var h=b.createEvent("Event");return e||(e={}),e.instance=c,h.initEvent(d,!f,!g),h.detail=e,a.dispatchEvent(h),h},w=function(b,c){var e;!g&&(e=a.picturefill||d.pf)?(c&&c.src&&!b[i]("srcset")&&b.setAttribute("srcset",c.src),e({reevaluate:!0,elements:[b]})):c&&c.src&&(b.src=c.src)},x=function(a,b){return(getComputedStyle(a,null)||{})[b]},y=function(a,b,c){for(c=c||a.offsetWidth;c<d.minSize&&b&&!a._lazysizesWidth;)c=b.offsetWidth,b=b.parentNode;return c},z=function(){var a,c,d=[],e=[],f=d,g=function(){var b=f;for(f=d.length?e:d,a=!0,c=!1;b.length;)b.shift()();a=!1},h=function(d,e){a&&!e?d.apply(this,arguments):(f.push(d),c||(c=!0,(b.hidden?k:l)(g)))};return h._lsFlush=g,h}(),A=function(a,b){return b?function(){z(a)}:function(){var b=this,c=arguments;z(function(){a.apply(b,c)})}},B=function(a){var b,c=0,e=d.throttleDelay,g=d.ricTimeout,h=function(){b=!1,c=f.now(),a()},i=m&&g>49?function(){m(h,{timeout:g}),g!==d.ricTimeout&&(g=d.ricTimeout)}:A(function(){k(h)},!0);return function(a){var d;(a=!0===a)&&(g=33),b||(b=!0,d=e-(f.now()-c),d<0&&(d=0),a||d<9?i():k(i,d))}},C=function(a){var b,c,d=99,e=function(){b=null,a()},g=function(){var a=f.now()-c;a<d?k(g,d-a):(m||e)(e)};return function(){c=f.now(),b||(b=k(g,d))}},D=function(){var g,l,m,o,p,y,D,F,G,H,I,J,K=/^img$/i,L=/^iframe$/i,M="onscroll"in a&&!/(gle|ing)bot/.test(navigator.userAgent),N=0,O=0,P=0,Q=-1,R=function(a){P--,(!a||P<0||!a.target)&&(P=0)},S=function(a){return null==J&&(J="hidden"==x(b.body,"visibility")),J||!("hidden"==x(a.parentNode,"visibility")&&"hidden"==x(a,"visibility"))},T=function(a,c){var d,f=a,g=S(a);for(F-=c,I+=c,G-=c,H+=c;g&&(f=f.offsetParent)&&f!=b.body&&f!=e;)(g=(x(f,"opacity")||1)>0)&&"visible"!=x(f,"overflow")&&(d=f.getBoundingClientRect(),g=H>d.left&&G<d.right&&I>d.top-1&&F<d.bottom+1);return g},U=function(){var a,f,h,j,k,m,n,p,q,r,s,t,u=c.elements;if((o=d.loadMode)&&P<8&&(a=u.length)){for(f=0,Q++;f<a;f++)if(u[f]&&!u[f]._lazyRace)if(!M||c.prematureUnveil&&c.prematureUnveil(u[f]))aa(u[f]);else if((p=u[f][i]("data-expand"))&&(m=1*p)||(m=O),r||(r=!d.expand||d.expand<1?e.clientHeight>500&&e.clientWidth>500?500:370:d.expand,c._defEx=r,s=r*d.expFactor,t=d.hFac,J=null,O<s&&P<1&&Q>2&&o>2&&!b.hidden?(O=s,Q=0):O=o>1&&Q>1&&P<6?r:N),q!==m&&(y=innerWidth+m*t,D=innerHeight+m,n=-1*m,q=m),h=u[f].getBoundingClientRect(),(I=h.bottom)>=n&&(F=h.top)<=D&&(H=h.right)>=n*t&&(G=h.left)<=y&&(I||H||G||F)&&(d.loadHidden||S(u[f]))&&(l&&P<3&&!p&&(o<3||Q<4)||T(u[f],m))){if(aa(u[f]),k=!0,P>9)break}else!k&&l&&!j&&P<4&&Q<4&&o>2&&(g[0]||d.preloadAfterLoad)&&(g[0]||!p&&(I||H||G||F||"auto"!=u[f][i](d.sizesAttr)))&&(j=g[0]||u[f]);j&&!k&&aa(j)}},V=B(U),W=function(a){var b=a.target;if(b._lazyCache)return void delete b._lazyCache;R(a),s(b,d.loadedClass),t(b,d.loadingClass),u(b,Y),v(b,"lazyloaded")},X=A(W),Y=function(a){X({target:a.target})},Z=function(a,b){try{a.contentWindow.location.replace(b)}catch(c){a.src=b}},$=function(a){var b,c=a[i](d.srcsetAttr);(b=d.customMedia[a[i]("data-media")||a[i]("media")])&&a.setAttribute("media",b),c&&a.setAttribute("srcset",c)},_=A(function(a,b,c,e,f){var g,h,j,l,o,p;(o=v(a,"lazybeforeunveil",b)).defaultPrevented||(e&&(c?s(a,d.autosizesClass):a.setAttribute("sizes",e)),h=a[i](d.srcsetAttr),g=a[i](d.srcAttr),f&&(j=a.parentNode,l=j&&n.test(j.nodeName||"")),p=b.firesLoad||"src"in a&&(h||g||l),o={target:a},s(a,d.loadingClass),p&&(clearTimeout(m),m=k(R,2500),u(a,Y,!0)),l&&q.call(j.getElementsByTagName("source"),$),h?a.setAttribute("srcset",h):g&&!l&&(L.test(a.nodeName)?Z(a,g):a.src=g),f&&(h||l)&&w(a,{src:g})),a._lazyRace&&delete a._lazyRace,t(a,d.lazyClass),z(function(){var b=a.complete&&a.naturalWidth>1;p&&!b||(b&&s(a,"ls-is-cached"),W(o),a._lazyCache=!0,k(function(){"_lazyCache"in a&&delete a._lazyCache},9)),"lazy"==a.loading&&P--},!0)}),aa=function(a){if(!a._lazyRace){var b,c=K.test(a.nodeName),e=c&&(a[i](d.sizesAttr)||a[i]("sizes")),f="auto"==e;(!f&&l||!c||!a[i]("src")&&!a.srcset||a.complete||r(a,d.errorClass)||!r(a,d.lazyClass))&&(b=v(a,"lazyunveilread").detail,f&&E.updateElem(a,!0,a.offsetWidth),a._lazyRace=!0,P++,_(a,b,f,e,c))}},ba=C(function(){d.loadMode=3,V()}),ca=function(){3==d.loadMode&&(d.loadMode=2),ba()},da=function(){if(!l){if(f.now()-p<999)return void k(da,999);l=!0,d.loadMode=3,V(),j("scroll",ca,!0)}};return{_:function(){p=f.now(),c.elements=b.getElementsByClassName(d.lazyClass),g=b.getElementsByClassName(d.lazyClass+" "+d.preloadClass),j("scroll",V,!0),j("resize",V,!0),a.MutationObserver?new MutationObserver(V).observe(e,{childList:!0,subtree:!0,attributes:!0}):(e[h]("DOMNodeInserted",V,!0),e[h]("DOMAttrModified",V,!0),setInterval(V,999)),j("hashchange",V,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(a){b[h](a,V,!0)}),/d$|^c/.test(b.readyState)?da():(j("load",da),b[h]("DOMContentLoaded",V),k(da,2e4)),c.elements.length?(U(),z._lsFlush()):V()},checkElems:V,unveil:aa,_aLSL:ca}}(),E=function(){var a,c=A(function(a,b,c,d){var e,f,g;if(a._lazysizesWidth=d,d+="px",a.setAttribute("sizes",d),n.test(b.nodeName||""))for(e=b.getElementsByTagName("source"),f=0,g=e.length;f<g;f++)e[f].setAttribute("sizes",d);c.detail.dataAttr||w(a,c.detail)}),e=function(a,b,d){var e,f=a.parentNode;f&&(d=y(a,f,d),e=v(a,"lazybeforesizes",{width:d,dataAttr:!!b}),e.defaultPrevented||(d=e.detail.width)&&d!==a._lazysizesWidth&&c(a,f,e,d))},f=function(){var b,c=a.length;if(c)for(b=0;b<c;b++)e(a[b])},g=C(f);return{_:function(){a=b.getElementsByClassName(d.autosizesClass),j("resize",g)},checkElems:g,updateElem:e}}(),F=function(){!F.i&&b.getElementsByClassName&&(F.i=!0,E._(),D._())};return k(function(){d.init&&F()}),c={cfg:d,autoSizer:E,loader:D,init:F,uP:w,aC:s,rC:t,hC:r,fire:v,gW:y,rAF:z}});

// Magnific Popup v1.1.0 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom
(function(a){typeof define=="function"&&define.amd?define(["jquery"],a):typeof exports=="object"?a(require("jquery")):a(window.jQuery||window.Zepto)})(function(a){var b="Close",c="BeforeClose",d="AfterClose",e="BeforeAppend",f="MarkupParse",g="Open",h="Change",i="mfp",j="."+i,k="mfp-ready",l="mfp-removing",m="mfp-prevent-close",n,o=function(){},p=!!window.jQuery,q,r=a(window),s,t,u,v,w=function(a,b){n.ev.on(i+a+j,b)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(b,c){n.ev.triggerHandler(i+b,c),n.st.callbacks&&(b=b.charAt(0).toLowerCase()+b.slice(1),n.st.callbacks[b]&&n.st.callbacks[b].apply(n,a.isArray(c)?c:[c]))},z=function(b){if(b!==v||!n.currTemplate.closeBtn)n.currTemplate.closeBtn=a(n.st.closeMarkup.replace("%title%",n.st.tClose)),v=b;return n.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(n=new o,n.init(),a.magnificPopup.instance=n)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(a.transition!==undefined)return!0;while(b.length)if(b.pop()+"Transition"in a)return!0;return!1};o.prototype={constructor:o,init:function(){var b=navigator.appVersion;n.isLowIE=n.isIE8=document.all&&!document.addEventListener,n.isAndroid=/android/gi.test(b),n.isIOS=/iphone|ipad|ipod/gi.test(b),n.supportsTransition=B(),n.probablyMobile=n.isAndroid||n.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),s=a(document),n.popupsCache={}},open:function(b){var c;if(b.isObj===!1){n.items=b.items.toArray(),n.index=0;var d=b.items,e;for(c=0;c<d.length;c++){e=d[c],e.parsed&&(e=e.el[0]);if(e===b.el[0]){n.index=c;break}}}else n.items=a.isArray(b.items)?b.items:[b.items],n.index=b.index||0;if(n.isOpen){n.updateItemHTML();return}n.types=[],u="",b.mainEl&&b.mainEl.length?n.ev=b.mainEl.eq(0):n.ev=s,b.key?(n.popupsCache[b.key]||(n.popupsCache[b.key]={}),n.currTemplate=n.popupsCache[b.key]):n.currTemplate={},n.st=a.extend(!0,{},a.magnificPopup.defaults,b),n.fixedContentPos=n.st.fixedContentPos==="auto"?!n.probablyMobile:n.st.fixedContentPos,n.st.modal&&(n.st.closeOnContentClick=!1,n.st.closeOnBgClick=!1,n.st.showCloseBtn=!1,n.st.enableEscapeKey=!1),n.bgOverlay||(n.bgOverlay=x("bg").on("click"+j,function(){n.close()}),n.wrap=x("wrap").attr("tabindex",-1).on("click"+j,function(a){n._checkIfClose(a.target)&&n.close()}),n.container=x("container",n.wrap)),n.contentContainer=x("content"),n.st.preloader&&(n.preloader=x("preloader",n.container,n.st.tLoading));var h=a.magnificPopup.modules;for(c=0;c<h.length;c++){var i=h[c];i=i.charAt(0).toUpperCase()+i.slice(1),n["init"+i].call(n)}y("BeforeOpen"),n.st.showCloseBtn&&(n.st.closeBtnInside?(w(f,function(a,b,c,d){c.close_replaceWith=z(d.type)}),u+=" mfp-close-btn-in"):n.wrap.append(z())),n.st.alignTop&&(u+=" mfp-align-top"),n.fixedContentPos?n.wrap.css({overflow:n.st.overflowY,overflowX:"hidden",overflowY:n.st.overflowY}):n.wrap.css({top:r.scrollTop(),position:"absolute"}),(n.st.fixedBgPos===!1||n.st.fixedBgPos==="auto"&&!n.fixedContentPos)&&n.bgOverlay.css({height:s.height(),position:"absolute"}),n.st.enableEscapeKey&&s.on("keyup"+j,function(a){a.keyCode===27&&n.close()}),r.on("resize"+j,function(){n.updateSize()}),n.st.closeOnContentClick||(u+=" mfp-auto-cursor"),u&&n.wrap.addClass(u);var l=n.wH=r.height(),m={};if(n.fixedContentPos&&n._hasScrollBar(l)){var o=n._getScrollbarSize();o&&(m.marginRight=o)}n.fixedContentPos&&(n.isIE7?a("body, html").css("overflow","hidden"):m.overflow="hidden");var p=n.st.mainClass;return n.isIE7&&(p+=" mfp-ie7"),p&&n._addClassToMFP(p),n.updateItemHTML(),y("BuildControls"),a("html").css(m),n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo||a(document.body)),n._lastFocusedEl=document.activeElement,setTimeout(function(){n.content?(n._addClassToMFP(k),n._setFocus()):n.bgOverlay.addClass(k),s.on("focusin"+j,n._onFocusIn)},16),n.isOpen=!0,n.updateSize(l),y(g),b},close:function(){if(!n.isOpen)return;y(c),n.isOpen=!1,n.st.removalDelay&&!n.isLowIE&&n.supportsTransition?(n._addClassToMFP(l),setTimeout(function(){n._close()},n.st.removalDelay)):n._close()},_close:function(){y(b);var c=l+" "+k+" ";n.bgOverlay.detach(),n.wrap.detach(),n.container.empty(),n.st.mainClass&&(c+=n.st.mainClass+" "),n._removeClassFromMFP(c);if(n.fixedContentPos){var e={marginRight:""};n.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}s.off("keyup"+j+" focusin"+j),n.ev.off(j),n.wrap.attr("class","mfp-wrap").removeAttr("style"),n.bgOverlay.attr("class","mfp-bg"),n.container.attr("class","mfp-container"),n.st.showCloseBtn&&(!n.st.closeBtnInside||n.currTemplate[n.currItem.type]===!0)&&n.currTemplate.closeBtn&&n.currTemplate.closeBtn.detach(),n.st.autoFocusLast&&n._lastFocusedEl&&a(n._lastFocusedEl).focus(),n.currItem=null,n.content=null,n.currTemplate=null,n.prevHeight=0,y(d)},updateSize:function(a){if(n.isIOS){var b=document.documentElement.clientWidth/window.innerWidth,c=window.innerHeight*b;n.wrap.css("height",c),n.wH=c}else n.wH=a||r.height();n.fixedContentPos||n.wrap.css("height",n.wH),y("Resize")},updateItemHTML:function(){var b=n.items[n.index];n.contentContainer.detach(),n.content&&n.content.detach(),b.parsed||(b=n.parseEl(n.index));var c=b.type;y("BeforeChange",[n.currItem?n.currItem.type:"",c]),n.currItem=b;if(!n.currTemplate[c]){var d=n.st[c]?n.st[c].markup:!1;y("FirstMarkupParse",d),d?n.currTemplate[c]=a(d):n.currTemplate[c]=!0}t&&t!==b.type&&n.container.removeClass("mfp-"+t+"-holder");var e=n["get"+c.charAt(0).toUpperCase()+c.slice(1)](b,n.currTemplate[c]);n.appendContent(e,c),b.preloaded=!0,y(h,b),t=b.type,n.container.prepend(n.contentContainer),y("AfterChange")},appendContent:function(a,b){n.content=a,a?n.st.showCloseBtn&&n.st.closeBtnInside&&n.currTemplate[b]===!0?n.content.find(".mfp-close").length||n.content.append(z()):n.content=a:n.content="",y(e),n.container.addClass("mfp-"+b+"-holder"),n.contentContainer.append(n.content)},parseEl:function(b){var c=n.items[b],d;c.tagName?c={el:a(c)}:(d=c.type,c={data:c,src:c.src});if(c.el){var e=n.types;for(var f=0;f<e.length;f++)if(c.el.hasClass("mfp-"+e[f])){d=e[f];break}c.src=c.el.attr("data-mfp-src"),c.src||(c.src=c.el.attr("href"))}return c.type=d||n.st.type||"inline",c.index=b,c.parsed=!0,n.items[b]=c,y("ElementParse",c),n.items[b]},addGroup:function(a,b){var c=function(c){c.mfpEl=this,n._openClick(c,a,b)};b||(b={});var d="click.magnificPopup";b.mainEl=a,b.items?(b.isObj=!0,a.off(d).on(d,c)):(b.isObj=!1,b.delegate?a.off(d).on(d,b.delegate,c):(b.items=a,a.off(d).on(d,c)))},_openClick:function(b,c,d){var e=d.midClick!==undefined?d.midClick:a.magnificPopup.defaults.midClick;if(!e&&(b.which===2||b.ctrlKey||b.metaKey||b.altKey||b.shiftKey))return;var f=d.disableOn!==undefined?d.disableOn:a.magnificPopup.defaults.disableOn;if(f)if(a.isFunction(f)){if(!f.call(n))return!0}else if(r.width()<f)return!0;b.type&&(b.preventDefault(),n.isOpen&&b.stopPropagation()),d.el=a(b.mfpEl),d.delegate&&(d.items=c.find(d.delegate)),n.open(d)},updateStatus:function(a,b){if(n.preloader){q!==a&&n.container.removeClass("mfp-s-"+q),!b&&a==="loading"&&(b=n.st.tLoading);var c={status:a,text:b};y("UpdateStatus",c),a=c.status,b=c.text,n.preloader.html(b),n.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),n.container.addClass("mfp-s-"+a),q=a}},_checkIfClose:function(b){if(a(b).hasClass(m))return;var c=n.st.closeOnContentClick,d=n.st.closeOnBgClick;if(c&&d)return!0;if(!n.content||a(b).hasClass("mfp-close")||n.preloader&&b===n.preloader[0])return!0;if(b!==n.content[0]&&!a.contains(n.content[0],b)){if(d&&a.contains(document,b))return!0}else if(c)return!0;return!1},_addClassToMFP:function(a){n.bgOverlay.addClass(a),n.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),n.wrap.removeClass(a)},_hasScrollBar:function(a){return(n.isIE7?s.height():document.body.scrollHeight)>(a||r.height())},_setFocus:function(){(n.st.focus?n.content.find(n.st.focus).eq(0):n.wrap).focus()},_onFocusIn:function(b){if(b.target!==n.wrap[0]&&!a.contains(n.wrap[0],b.target))return n._setFocus(),!1},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(f,[b,c,d]),a.each(c,function(c,d){if(d===undefined||d===!1)return!0;e=c.split("_");if(e.length>1){var f=b.find(j+"-"+e[0]);if(f.length>0){var g=e[1];g==="replaceWith"?f[0]!==d[0]&&f.replaceWith(d):g==="img"?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(j+"-"+c).html(d)})},_getScrollbarSize:function(){if(n.scrollbarSize===undefined){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),n.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return n.scrollbarSize}},a.magnificPopup={instance:null,proto:o.prototype,modules:[],open:function(b,c){return A(),b?b=a.extend(!0,{},b):b={},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(b){A();var c=a(this);if(typeof b=="string")if(b==="open"){var d,e=p?c.data("magnificPopup"):c[0].magnificPopup,f=parseInt(arguments[1],10)||0;e.items?d=e.items[f]:(d=c,e.delegate&&(d=d.find(e.delegate)),d=d.eq(f)),n._openClick({mfpEl:d},c,e)}else n.isOpen&&n[b].apply(n,Array.prototype.slice.call(arguments,1));else b=a.extend(!0,{},b),p?c.data("magnificPopup",b):c[0].magnificPopup=b,n.addGroup(c,b);return c};var C="inline",D,E,F,G=function(){F&&(E.after(F.addClass(D)).detach(),F=null)};a.magnificPopup.registerModule(C,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){n.types.push(C),w(b+"."+C,function(){G()})},getInline:function(b,c){G();if(b.src){var d=n.st.inline,e=a(b.src);if(e.length){var f=e[0].parentNode;f&&f.tagName&&(E||(D=d.hiddenClass,E=x(D),D="mfp-"+D),F=e.after(E).detach().removeClass(D)),n.updateStatus("ready")}else n.updateStatus("error",d.tNotFound),e=a("<div>");return b.inlineElement=e,e}return n.updateStatus("ready"),n._parseMarkup(c,{},b),c}}});var H="ajax",I,J=function(){I&&a(document.body).removeClass(I)},K=function(){J(),n.req&&n.req.abort()};a.magnificPopup.registerModule(H,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){n.types.push(H),I=n.st.ajax.cursor,w(b+"."+H,K),w("BeforeChange."+H,K)},getAjax:function(b){I&&a(document.body).addClass(I),n.updateStatus("loading");var c=a.extend({url:b.src,success:function(c,d,e){var f={data:c,xhr:e};y("ParseAjax",f),n.appendContent(a(f.data),H),b.finished=!0,J(),n._setFocus(),setTimeout(function(){n.wrap.addClass(k)},16),n.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),b.finished=b.loadError=!0,n.updateStatus("error",n.st.ajax.tError.replace("%url%",b.src))}},n.st.ajax.settings);return n.req=a.ajax(c),""}}});var L,M=function(b){if(b.data&&b.data.title!==undefined)return b.data.title;var c=n.st.image.titleSrc;if(c){if(a.isFunction(c))return c.call(n,b);if(b.el)return b.el.attr(c)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=n.st.image,d=".image";n.types.push("image"),w(g+d,function(){n.currItem.type==="image"&&c.cursor&&a(document.body).addClass(c.cursor)}),w(b+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),r.off("resize"+j)}),w("Resize"+d,n.resizeImage),n.isLowIE&&w("AfterChange",n.resizeImage)},resizeImage:function(){var a=n.currItem;if(!a||!a.img)return;if(n.st.image.verticalFit){var b=0;n.isLowIE&&(b=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",n.wH-b)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(n.content&&n.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var b=0,c=a.img[0],d=function(e){L&&clearInterval(L),L=setInterval(function(){if(c.naturalWidth>0){n._onImageHasSize(a);return}b>200&&clearInterval(L),b++,b===3?d(10):b===40?d(50):b===100&&d(500)},e)};d(1)},getImage:function(b,c){var d=0,e=function(){b&&(b.img[0].complete?(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("ready")),b.hasSize=!0,b.loaded=!0,y("ImageLoadComplete")):(d++,d<200?setTimeout(e,100):f()))},f=function(){b&&(b.img.off(".mfploader"),b===n.currItem&&(n._onImageHasSize(b),n.updateStatus("error",g.tError.replace("%url%",b.src))),b.hasSize=!0,b.loaded=!0,b.loadError=!0)},g=n.st.image,h=c.find(".mfp-img");if(h.length){var i=document.createElement("img");i.className="mfp-img",b.el&&b.el.find("img").length&&(i.alt=b.el.find("img").attr("alt")),b.img=a(i).on("load.mfploader",e).on("error.mfploader",f),i.src=b.src,h.is("img")&&(b.img=b.img.clone()),i=b.img[0],i.naturalWidth>0?b.hasSize=!0:i.width||(b.hasSize=!1)}return n._parseMarkup(c,{title:M(b),img_replaceWith:b.img},b),n.resizeImage(),b.hasSize?(L&&clearInterval(L),b.loadError?(c.addClass("mfp-loading"),n.updateStatus("error",g.tError.replace("%url%",b.src))):(c.removeClass("mfp-loading"),n.updateStatus("ready")),c):(n.updateStatus("loading"),b.loading=!0,b.hasSize||(b.imgHidden=!0,c.addClass("mfp-loading"),n.findImageSize(b)),c)}}});var N,O=function(){return N===undefined&&(N=document.createElement("p").style.MozTransform!==undefined),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a=n.st.zoom,d=".zoom",e;if(!a.enabled||!n.supportsTransition)return;var f=a.duration,g=function(b){var c=b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+a.duration/1e3+"s "+a.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,c.css(e),c},h=function(){n.content.css("visibility","visible")},i,j;w("BuildControls"+d,function(){if(n._allowZoom()){clearTimeout(i),n.content.css("visibility","hidden"),e=n._getItemToZoom();if(!e){h();return}j=g(e),j.css(n._getOffset()),n.wrap.append(j),i=setTimeout(function(){j.css(n._getOffset(!0)),i=setTimeout(function(){h(),setTimeout(function(){j.remove(),e=j=null,y("ZoomAnimationEnded")},16)},f)},16)}}),w(c+d,function(){if(n._allowZoom()){clearTimeout(i),n.st.removalDelay=f;if(!e){e=n._getItemToZoom();if(!e)return;j=g(e)}j.css(n._getOffset(!0)),n.wrap.append(j),n.content.css("visibility","hidden"),setTimeout(function(){j.css(n._getOffset())},16)}}),w(b+d,function(){n._allowZoom()&&(h(),j&&j.remove(),e=null)})},_allowZoom:function(){return n.currItem.type==="image"},_getItemToZoom:function(){return n.currItem.hasSize?n.currItem.img:!1},_getOffset:function(b){var c;b?c=n.currItem.img:c=n.st.zoom.opener(n.currItem.el||n.currItem);var d=c.offset(),e=parseInt(c.css("padding-top"),10),f=parseInt(c.css("padding-bottom"),10);d.top-=a(window).scrollTop()-e;var g={width:c.width(),height:(p?c.innerHeight():c[0].offsetHeight)-f-e};return O()?g["-moz-transform"]=g.transform="translate("+d.left+"px,"+d.top+"px)":(g.left=d.left,g.top=d.top),g}}});var P="iframe",Q="//about:blank",R=function(a){if(n.currTemplate[P]){var b=n.currTemplate[P].find("iframe");b.length&&(a||(b[0].src=Q),n.isIE8&&b.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){n.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(b+"."+P,function(){R()})},getIframe:function(b,c){var d=b.src,e=n.st.iframe;a.each(e.patterns,function(){if(d.indexOf(this.index)>-1)return this.id&&(typeof this.id=="string"?d=d.substr(d.lastIndexOf(this.id)+this.id.length,d.length):d=this.id.call(this,d)),d=this.src.replace("%id%",d),!1});var f={};return e.srcAction&&(f[e.srcAction]=d),n._parseMarkup(c,f,b),n.updateStatus("ready"),c}}});var S=function(a){var b=n.items.length;return a>b-1?a-b:a<0?b+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=n.st.gallery,d=".mfp-gallery";n.direction=!0;if(!c||!c.enabled)return!1;u+=" mfp-gallery",w(g+d,function(){c.navigateByImgClick&&n.wrap.on("click"+d,".mfp-img",function(){if(n.items.length>1)return n.next(),!1}),s.on("keydown"+d,function(a){a.keyCode===37?n.prev():a.keyCode===39&&n.next()})}),w("UpdateStatus"+d,function(a,b){b.text&&(b.text=T(b.text,n.currItem.index,n.items.length))}),w(f+d,function(a,b,d,e){var f=n.items.length;d.counter=f>1?T(c.tCounter,e.index,f):""}),w("BuildControls"+d,function(){if(n.items.length>1&&c.arrows&&!n.arrowLeft){var b=c.arrowMarkup,d=n.arrowLeft=a(b.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(m),e=n.arrowRight=a(b.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(m);d.click(function(){n.prev()}),e.click(function(){n.next()}),n.container.append(d.add(e))}}),w(h+d,function(){n._preloadTimeout&&clearTimeout(n._preloadTimeout),n._preloadTimeout=setTimeout(function(){n.preloadNearbyImages(),n._preloadTimeout=null},16)}),w(b+d,function(){s.off(d),n.wrap.off("click"+d),n.arrowRight=n.arrowLeft=null})},next:function(){n.direction=!0,n.index=S(n.index+1),n.updateItemHTML()},prev:function(){n.direction=!1,n.index=S(n.index-1),n.updateItemHTML()},goTo:function(a){n.direction=a>=n.index,n.index=a,n.updateItemHTML()},preloadNearbyImages:function(){var a=n.st.gallery.preload,b=Math.min(a[0],n.items.length),c=Math.min(a[1],n.items.length),d;for(d=1;d<=(n.direction?c:b);d++)n._preloadItem(n.index+d);for(d=1;d<=(n.direction?b:c);d++)n._preloadItem(n.index-d)},_preloadItem:function(b){b=S(b);if(n.items[b].preloaded)return;var c=n.items[b];c.parsed||(c=n.parseEl(b)),y("LazyLoad",c),c.type==="image"&&(c.img=a('<img class="mfp-img" />').on("load.mfploader",function(){c.hasSize=!0}).on("error.mfploader",function(){c.hasSize=!0,c.loadError=!0,y("LazyLoadError",c)}).attr("src",c.src)),c.preloaded=!0}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=n.st.retina,b=a.ratio;b=isNaN(b)?b():b,b>1&&(w("ImageHasSize."+U,function(a,c){c.img.css({"max-width":c.img[0].naturalWidth/b,width:"100%"})}),w("ElementParse."+U,function(c,d){d.src=a.replaceSrc(d,b)}))}}}}),A()});

KING.Shortcodes = {};

// Toggles

KING.Shortcodes.Toggles = {
 
  mount: function() {

    $('.toggles:not(.init)').each(function(){

      $(this).addClass('init');

      var $titles = $(this).find('.toggle__title'),
          $contents = $(this).find('.toggle__content'),
          i = 0;

      $titles.each(function(){

        $(this)
          .append('<span class="low-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 13H6v-2h12v2z" fill="#000"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--minus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M18 12.5H6V11h12v1.5z" fill="#000"/></svg></span>')
          .append('<span class="low-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 13V18H13V13H18V11H13V6H11V11H6V13H11Z" fill="black"/></svg></span><span class="high-dpi"><svg class="svg symbol symbol--plus" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"><path fill-rule="evenodd" d="M10.75 12.25V17h1.5v-4.75H17v-1.5h-4.75V6h-1.5v4.75H6v1.5h4.75z" fill="#000"/></svg></span>');
      
        $(this).on('click', function(){

          var $toggle = $(this).next('.toggle__content');

          if ( ! $(this).hasClass('opened') ) {
            $(this).addClass('opened');
            $toggle.stop().slideDown(200);
          } else {
            $(this).removeClass('opened');
            $toggle.stop().slideUp(200);
          }

          if ( $('body').hasClass('template-product') ) {
            KING.Product._fixProductScroll();
          }

        });

      });

      $(this).find('.contents').remove();

    });

  }

}

// Mount in page

$(document).ready(function(){
  if ( $('.toggles').length > 0 ) {
    KING.Shortcodes.Toggles.mount();
  }
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-toggles') ) {
    KING.Shortcodes.Toggles.mount();
  }

}).on('shopify:block:select', function(e){

  var $block = $(e.target); 

  if ( $block.hasClass('toggle') ) {
    if ( ! $block.find('.toggle__title').hasClass('opened') ) {
      $block.find('.toggle__title').addClass('opened');
      $block.find('.toggle__content').stop().slideDown(200);
    }
  }

}).on('shopify:block:deselect', function(e){

  var $block = $(e.target);

  if ( $block.hasClass('toggle') ) {
    if ( $block.find('.toggle__title').hasClass('opened') ) {
      $block.find('.toggle__title').removeClass('opened');
      $block.find('.toggle__content').stop().slideUp(200);
    }
  }

});

// Content slider

KING.Shortcodes.ContentSlider = {

  mount: function($section) {

    var $slider = $section.find('.content-slider');

    if ( $slider.find('.content-slider__item').length > 1 ) {

      $slider.flickity({
        cellSelector: '.content-slider__item',
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        adaptiveHeight: true,
        autoPlay: $slider.data('autoplay'),
        pauseAutoPlayOnHover: false
      });

      $slider.append('<div class="flickity-custom-nav"><span class="prev">' + window.symbol_arrow + '</span><span class="current">1</span><span>/</span><span class="total">' + $slider.find('.content-slider__item').length + '</span><span class="next">' + window.symbol_arrow + '</span></div>');

      $slider.on('select.flickity', function(){
        $slider.find('.current').html($slider.data('flickity').selectedIndex+1);
      });

      $slider.find('.next').on('click', function(){
        $slider.data('flickity').next();
      });

      $slider.find('.prev').on('click', function(){
        $slider.data('flickity').previous();
      });

    }

  }

}

// Tabs

KING.Shortcodes.Tabs = {

  mount: function($section) {

    var $titles = $section.children('.titles').children('h5'),
        $contents = $section.children('.contents').children('div'),
        $openedT = $titles.eq(0),
        $openedC = $contents.eq(0);

    $openedT.addClass('opened');
    $openedC.stop().slideDown(0);

    $titles.find('a').prop('href', '#').off('click');

    $titles.click(function(e){

      $openedT.removeClass('opened');
      $openedT = $(this);
      $openedT.addClass('opened');

      $openedC.stop().slideUp(200);
      $openedC = $contents.eq($(this).index());
      $openedC.stop().delay(200).slideDown(200);

      e.preventDefault();

    });

  }

}

// Mount in page

$(document).ready(function(){
  if ( $('.krown-tabs').length > 0 ) {
    $('.krown-tabs').each(function(){
      KING.Shortcodes.Tabs.mount($(this));
    });
  }
});


KING.AnnouncementBar = {

	mount: function() {

		var $announcement = $('.announcement');

		if ( $('.announcement__exit').length > 0 ) {
			$('.announcement__exit').on('click', function(){
				$('body').addClass('no-transitions');
				setTimeout(function(){
					$('body').removeClass('show-announcement-bar');
						localStorage.setItem('announcement-dismissed', 'true');
						setTimeout(function(){
							$(window).trigger('resize');
							$('body').removeClass('no-transitions');
					}, 100);
				}, 10);
			});
		}

	}

}

// Mount in page

if ( $('.mount-announcement').length > 0 ) {
	KING.AnnouncementBar.mount();
} 

// Shopify events

$(document).on('shopify:section:load, shopify:section:select', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-announcement') ) {
		if ( $('.announcement').length > 0 ) {
			$('body').addClass('show-announcement-bar');
		} else {
			$('body').removeClass('show-announcement-bar');
		}
	}

})

KING.Sidebar = {

	mount: function() {

		// Sticky try out

	 	var $body = $('body');

	 	var $sidebar = $('.sidebar'),
	 			$sidebarSubmenuFirst = $('.sidebar__submenu--first'),
	 			$sidebarSubmenuSecond = $('.sidebar__submenu--second');

	 	$(window).on('scroll.sticky-sidebar', function() {

	 		var scrollTop = $(window).scrollTop(),
					screenHeight = $(window).height(),
					sidebarHeight = $sidebar.outerHeight();

			if ( sidebarHeight > screenHeight ) {

				if ( scrollTop < sidebarHeight - screenHeight ) {
					$sidebar.css('transform', 'translate3d(0,' + ( scrollTop * -1 ) + 'px, 0)');
				} else {
					$sidebar.css('transform', 'translate3d(0,' + ( ( sidebarHeight - screenHeight ) * -1 ) + 'px, 0)');
				}

			}

	 	});

	 	$(window).on('resize.sticky-sidebar', window.debounce(function(){

			var screenHeight = $(window).height(),
					sidebarHeight = $sidebar.outerHeight();

			if ( sidebarHeight > screenHeight ) {
				$(window).trigger('scroll.sticky-sidebar');
			} else {
				$sidebar.css('transform', 'translate3d(0, 0, 0)');
			}

			$('.sidebar__submenu').each(function(){

				var topOffset = $(this).parent().children('a').position().top;
				if ( $(this).hasClass('sidebar__submenu--second') ) {
					$(this).children('.sidebar__container').children('.sub-menu').css('paddingTop', topOffset);
				} else {
					$(this).children('.sidebar__container').children('.sub-menu').css('paddingTop', topOffset);
				}

			});

	 	}, 300)).trigger('resize.sticky-sidebar');
	 	setTimeout(function(){
	 		$(window).trigger('resize.sticky-sidebar');
	 	}, 310);

	 	$('.primary-menu > .sidebar__menu > .has-submenu, .secondary-menu > .sidebar__menu > .has-submenu').on('mouseenter', function(){
	 		$body.addClass('show-overlay');
	 	}).on('mouseleave', function(){
	 		$body.removeClass('show-overlay');
	 	});

	 	if ( ! $('body').hasClass('template-cart') && window.cart_action == 'overlay' ) {
		 	$('.sidebar__cart-handle, .sidebar__cart-close').on('click', function(e){
		 		e.preventDefault();
		 		if ( ! $('.sidebar__cart').hasClass('opened') ) {
		 			$('.sidebar__cart').addClass('opened');
		 			$('.cart-overlay-background').addClass('show');
		 			$('body').addClass('overflow-hidden');
		 		} else {
		 			$('.sidebar__cart').removeClass('opened');
		 			$('.cart-overlay-background').removeClass('show');
		 			$('body').removeClass('overflow-hidden');
		 		}
		 	});
		}

		$('.sidebar__menu-handle, .sidebar__menus-close').on('click', function(e){
			e.preventDefault();
	 		if ( ! $('.sidebar__menus').hasClass('opened') ) {
	 			$('.sidebar__menus').addClass('opened');
	 			$('.cart-overlay-background').addClass('show');
		 			$('body').addClass('overflow-hidden');
	 		} else {
	 			$('.sidebar__menus').removeClass('opened');
	 			$('.cart-overlay-background').removeClass('show');
	 			$('body').removeClass('overflow-hidden');
	 		}
		});

		if ( window.predictive_search_enabled == "false" ) {
			$('.sidebar__search-handle, .sidebar__search-close').on('click', function(e){
				e.preventDefault();
		 		if ( ! $('.sidebar__search').hasClass('opened') ) {
		 			$('.sidebar__search').addClass('opened');
		 			$('.sidebar__search input[type="search"]').attr('placeholder', $('.sidebar__search input[type="search"]').data('responsive-placeholder'));
		 			setTimeout(function(){
		 				$('.sidebar__search input[type="search"]').focus();
		 			}, 100);
		 		} else {
		 			$('.sidebar__search').removeClass('opened');
		 		}
			});
		} else {
			$('.sidebar__search-handle, .sidebar__search-close').on('click', function(e){
				if ( window.getPseudoContent('.sidebar__search').indexOf('predictive-mobile') >= 0 ) {
					e.preventDefault();
			 		if ( ! $('.sidebar__search').hasClass('opened') ) {
			 			$('.sidebar__search').addClass('opened');
		 				$('.cart-overlay-background').addClass('show');
			 			$('body').addClass('overflow-hidden');
			 			setTimeout(function(){
			 				$('.sidebar__search input[type="search"]').focus();
			 			}, 100);
			 		} else {
			 			$('.sidebar__search').removeClass('opened');
			 			$('.cart-overlay-background').removeClass('show');
			 			$('body').removeClass('overflow-hidden');
			 		}
			 	}
			});
		}

	 	$('.cart-overlay-background').on('click', function(){
	 		if ( $('.sidebar__cart').hasClass('opened') ) {
	 			$('.sidebar__cart').removeClass('opened');
	 			$('.cart-overlay-background').removeClass('show');
	 		} else if ( $('.sidebar__menus').hasClass('opened') ) {
	 			$('.sidebar__menus').removeClass('opened');
	 			$('.cart-overlay-background').removeClass('show');
	 		} else if ( $('.sidebar__search').hasClass('opened') ) {
	 			$('.sidebar__search').removeClass('opened');
	 			$('.cart-overlay-background').removeClass('show');
	 		} 
			$('body').removeClass('overflow-hidden');
	 	});

	 	var submenuLevel = 0;

	 	$('.sidebar__menu .has-submenu > a').on('touchstart', function(e){
	 		e.preventDefault();
	 		e.stopPropagation();
	 		if ( $(this).parent().hasClass('has-second-submenu') ) {
	 			submenuLevel = 2;
	 		} else {
	 			submenuLevel = 1;
	 		}
	 		$(this).parent().addClass('open-submenu');
	 		$(this).parent().parent().addClass('opened-submenu');
	 		$(this).closest('.sidebar__menus').addClass('opened-submenus');
	 		$(this).parent().parent().parent().siblings('nav').addClass('opened-other-submenu');
	 	});

	 	$('.sidebar__menus-back').on('touchstart', function(e){
	 		if ( submenuLevel == 1 ) {
	 			submenuLevel = 0;
	 			$('.sidebar__menus').removeClass('opened-submenus');
	 			$('.sidebar__menus').find('nav.opened-other-submenu').removeClass('opened-other-submenu');
	 			$('.sidebar__menus').find('.opened-submenu').removeClass('opened-submenu');
	 			$('.sidebar__menus').find('.open-submenu').removeClass('open-submenu');
	 		} else if ( submenuLevel == 2 ) {
	 			submenuLevel = 1;
	 			$('.has-second-submenu.open-submenu').parent().removeClass('opened-submenu');
	 			$('.has-second-submenu.open-submenu').removeClass('open-submenu');
	 		}

	 	});
	},

	unmount: function() {
		$(window).off('scroll.sticky-sidebar');
		$(window).off('resize.sticky-sidebar');
	}

}

// Mount in page

$(document).ready(function(){
  KING.Sidebar.mount();
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-sidebar') ) {
    KING.Sidebar.mount();
    if ( $section.find('.localization-form__item').length > 0 ) {
	    KING.Localization.mount();
	  }
  }

}).on('shopify:section:unload', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-sidebar') ) {
    KING.Sidebar.unmount();
  }

}); 

KING.Popup = {

	$popup: null,

	mount: function() {

		this.$popup = $('#shopify-section-popup');

		var show = this.$popup.find('.popup-content').data('show'),
				freq = this.$popup.find('.popup-content').data('freq'),
				enable = this.$popup.find('.popup-content').data('enable');

		if ( show > 0 && enable ) {
			setTimeout((function(){
				this._trigger(show, freq);
			}).bind(this), parseInt(show*1000));
		}

		this.$popup.find('.popup-close').on('click', (function(e){
			this._hide();
		}).bind(this));

		this.$popup.find('.popup-background').on('click', (function(e){
			this._hide();
		}).bind(this));

	},

	_show: function() {
		this.$popup.addClass('active');
	},

	_hide: function() {
		this.$popup.removeClass('active');
	},

	_trigger: function(show, freq) {

		var popupKey = 'popup-' + document.location.hostname,
				popupStorage = localStorage.getItem(popupKey) != null ? JSON.parse(localStorage.getItem(popupKey)) : null;

		if ( popupStorage != null ) {
			
			if ( popupStorage['show'] != show || popupStorage['freq'] != freq ) {

				this._refreshStorage(popupKey, show, freq);;

				// user saw the ad but settings are different - show it!
				this._show();

			} else {

				// user saw the ad so we need to check if he should see it again

				if ( freq == 'every' ) { 

					if ( sessionStorage[popupKey] == null || sessionStorage[popupKey] != 'shown' ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					}

				} else {

					var shownAt = popupStorage['shown'],
							nowAt = new Date().getTime(),
							inBetween = Math.round((nowAt - shownAt) / 1000);

					if ( freq == 'day' && inBetween > 129600 ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					} else if ( freq == 'week' && inBetween > 907200 ) {
						this._show();
						this._refreshStorage(popupKey, show, freq);;
					}

				}

			}

		} else {

			this._refreshStorage(popupKey, show, freq);

			// user never saw the ad - show it!

			this._show();

		}

	},

	_refreshStorage: function(popupKey, show, freq) {

		localStorage.setItem(popupKey, JSON.stringify({
			'show': show,
			'freq': freq,
			'shown': new Date().getTime()
		}));

		sessionStorage[popupKey] = 'shown';

	}

}


// Mount in page

if ( $('.mount-popup').length > 0 ) {
	KING.Popup.mount($(this));
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup.mount();
	}

}).on('shopify:section:select', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup._show();
	}

}).on('shopify:section:deselect', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-popup') ) {
		window.KING.Popup._hide();
	}

});

window.cartFormAjax = function(){

	var $form = $('.cart__form');

	$('#cart').find('.cart-item:not(.ajax-init)').each(function(){

		var $item = $(this);
		$item.addClass('ajax-init');

		var $remove = $(this).find('.remove');
		$remove.data('href', $remove.attr('href'));
		$remove.removeAttr('href');

		var $qty = $(this).find('.qty');
		$qty.data('href', $qty.attr('data-href'));
		$qty.removeAttr('data-href');

		// Remove items 

		$remove.on('click', function(e){

			e.preventDefault();
			$form.addClass('processing');
			$form.find('.alert').remove();

			$.ajax({
				url: $remove.data('href'),
				success: function(data) {
					updateCart(data);
					$item.slideUp(150, function(){
						$(this).remove();
					});
				},
				error: function(data) {
					$form.prepend('<span class="alert alert--error">' + window.cart_general_error + '</span>');	
					$form.removeClass('processing');
				}
			});

		});

		// Update quantities

		$qty.on('change', function(e){

			e.preventDefault();
			$form.addClass('processing');
			$form.find('.alert').remove();

			$.ajax({
				url: $qty.data('href').replace('$qty', $qty.val()),
				success: function(data) {
					updateCart(data);
					var $updatedItem = $(data).find('#' + $item.attr('id'));
					if ( $qty.val() == 0 ) {
						$item.slideUp(150, function(){
							$(this).remove();
						});
					} else {
						$item.find('.price').html($updatedItem.find('.price').html());
						if ( $updatedItem.find('.qty').val() != $item.find('.qty').val() ) {
							$form.prepend('<span class="alert alert--error">' + window.cart_add_error.replace('{{ title }}', $item.data('title')) + '</span>');	
							$item.find('.qty').val($updatedItem.find('.qty').val());
						}
					}
				},
				error: function(data) {
					$form.prepend('<span class="alert alert--error">' + window.cart_general_error + '</span>');	
					$form.removeClass('processing');
				}
			})


		})

	});

	// Details update

	function updateCart(data) {

		if ( $(data).find('.sidebar__cart-handle .count').html() == '0' ) {

			$('.cart__title').html($('.cart__title').data('cart-empty'));
			$('.cart__form').addClass('cart--empty');

		} else {

			$('.cart__title').html($(data).find('.cart__title').html());
			$('.cart__form').html($(data).find('.cart__form').html());
			window.cartFormAjax();

		}

		$('.sidebar__cart-handle .count').html($(data).find('.sidebar__cart-handle .count').html());
		$form.removeClass('processing');
	}

}

window.cartFormAjax();

KING.Localization = {

	mount: function() {

		$('.localization-form__item .regular-select-cover').each(function(){

			if ( ! $(this).hasClass('init') ) {

				$(this).addClass('init');

				var widthBasedOnLocation = $(this).data('location') == 'footer' ? 120 : 100;
				var selectContentWidth = Math.ceil($(this).find('.regular-select-content').outerWidth(true)),
						selectInnerWidth = Math.ceil($(this).find('.regular-select-inner').outerWidth(true));
				$(this).attr('style', 'width: ' + ( Math.max(widthBasedOnLocation, Math.max(selectInnerWidth, selectContentWidth)) + 1 ) + 'px !important');

				$(this).on('click', function(e){

					e.stopPropagation();
					var _this = $(this)[0];

					$('.regular-select-cover.content-opened').each(function(){
						if ( $(this)[0] != _this ) {
							$(this).removeClass('content-opened');
							$(this).parent().css('zIndex', 9);
						}
					});

					if ( ! $(this).hasClass('content-opened') ) {

						$(this).addClass('content-opened');
						$(this).attr('aria-expanded', 'true');
						$(this).parent().css('zIndex', 1000);
						var $selectHandle = $(this);

						if ( $(this).hasClass('invert-with-fixed') ) {
							if ( $(this)[0].getBoundingClientRect().y + $(this).find('.regular-select-content').height() + 55 > window.innerHeight ) {
								$(this).addClass('invert');
							}
						} else {
							if ( $(this).offset().top + $(this).find('.regular-select-content').height() + 55 > $('html').height() ) {
								$(this).addClass('invert');
							}
						}

						$(window).on('click.select-helper', function(){
							if ( $selectHandle.hasClass('content-opened') ) {
								$selectHandle.removeClass('content-opened').removeClass('invert');
								$selectHandle.parent().css('zIndex', 9);
							}
						});

					} else {
						$(this).attr('aria-expanded', 'false');
						$(this).parent().css('zIndex', 9);
						$(this).removeClass('content-opened').removeClass('invert');
						$(window).off('click.select-helper');
					}

				}).on('keypress', function(e){
					if ( e.which == 13 ) {
						if ( ! $(this).hasClass('opened-with-tab') ) {
							$(this).addClass('opened-with-tab');
							$(this).trigger('click');
							$(this).find('.regular-select-item').attr('tabindex', '0');
						}
					}
				});

			}

		});

	}

}


// Mount in page

$(document).ready(function(){
  if ( $('.localization-form__item').length > 0 ) {
    KING.Localization.mount();
  }
});

// Shopify events

$(document).on('shopify:section:load', function(e){

  var $section = $(e.target);
  if ( $section.hasClass('mount-footer') && $section.find('.localization-form__item').length > 0 ) {
    KING.Localization.mount();
  }

});

KING.Collection = {

	mount: function($collection) {

  	var _this = {};
		$collection.data('go', _this);

		_this.$collection = $collection;

		if ( _this.$collection.hasClass('collection--slider') ) {

	  	_this.$collection.flickity({
	  		cellSelector: '.product-item',
	  		cellAlign: 'left',
	  		groupCells: true,
	  		prevNextButtons: false,
	  		pageDots: true
	  	});

	  }

	  if ( _this.$collection.hasClass('collection--masonry') ) {
	  	_this.$collection.masonry({
	  		itemSelector: '.product-item',
	  		columnWidth: '.grid-sizer',
  			percentPosition: true
	  	});
	  }

	  _this.$collection.find('.product-item a').on('click', function(e){
	  	$(this).addClass('hover');
	  });

	}

}

// Mount in page

if ( $('.mount-collection').length > 0 ) {
	$('.mount-collection').each(function(){
		KING.Collection.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.mount-collection').length > 0 ) {
		KING.Collection.mount($section.find('.mount-collection'));
	}

});

KING.ProductMedia = {

	_productHostedVideos: [],
	_productYouTubeVideos: [],
	_productModels: [],

	_plyrStylesLoaded: false,
	_modelStylesLoaded: false,
	_videoLooping: false,

	mount: function($product) {

		var productData = $product.data('po');

		this._videoLooping = productData.$productCarousel.data('video-looping');

		productData.$productGalleryItem.each((function(i, item){

			// init $item variables

			$(item).data('carousel', productData.$productCarousel);
			$(item).data('init', false);

			// push to proper array

			switch ( $(item).data('product-media-type') ) {
				case 'video': 
					this._productHostedVideos.push($(item));
					break;
				case 'external_video': 
					this._productYouTubeVideos.push($(item));
					break;
				case 'model': 
					this._productModels.push($(item));
			}

		}).bind(this));

		// check video array

		if ( this._productHostedVideos.length > 0 ) {
			if ( ! Shopify.Plyr ) {
				window.Shopify.loadFeatures([
	        {
	          name: 'video-ui',
	          version: '1.0',
	          onLoad: (function(){
	          	this._mountSelfHostedVideos();
	          }).bind(this)
	        }
	      ]);
        this.LibraryLoader.load('plyrShopifyStyles', (function(){
        	this._plyrStylesLoaded = true;
        	$('.plyr').addClass('lazyloaded');
					$('.plyr').find('video').addClass('loaded');
					setTimeout(function(){
						$('.plyr').addClass('reset-transitions');
					}, 50);
        }).bind(this));
			} else {
      	this._mountSelfHostedVideos();
			}
		}

		// check YouTube array

		if ( this._productYouTubeVideos.length > 0 ) {
			if ( ! window.YT ) {
        this.LibraryLoader.load('youtubeSdk');
			} else {
				KING.ProductMedia._mountYouTubeVideos();
			}
		}

		// check models array

		var $xrButton = $product.find('.product-gallery__view-in-space');

		if ( this._productModels.length > 0 ) {

			if ( ! Shopify.ModelViewerUI ) {
				window.Shopify.loadFeatures([
	        {
	          name: 'model-viewer-ui',
	          version: '1.0',
	          onLoad: (function(){
	          	this._mountModels();
	          }).bind(this)
	        }
	      ]);
				this.LibraryLoader.load('modelViewerUiStyles', (function(){
					this._modelStylesLoaded = true;
					$('.shopify-model-viewer-ui').addClass('lazyloaded');
				}).bind(this));
			} else {
				this._mountModels();
			}

			if ( ! Shopify.ShopifyXR ) {
				window.Shopify.loadFeatures([
		      {
		        name: 'shopify-xr',
		        version: '1.0',
		        onLoad: (function(){

		        	document.addEventListener('shopify_xr_initialized', (function(){
	          		this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
		        	}).bind(this));

		        	document.addEventListener('shopify_xr_launch', (function(){
		        		this._triggerAutoPlayOFF(productData.$productCarousel);
		        	}).bind(this));

	          }).bind(this)
		      }
	      ]);
			} else {
      	this._setupShopifyXr(JSON.parse($product.find('.model-json')[0].innerHTML));
			}

			// bind flickity events for models

			if ( $xrButton.length > 0 ) {
				productData.$productCarousel.on('change.flickity', (function(e, i){
					if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
						$xrButton.attr('data-shopify-model3d-id', productData.$productGalleryItem.eq(i).data('media-id'));
					} else {
						$xrButton.attr('data-shopify-model3d-id', $xrButton.data('shopify-first-model3d-id'));
					}
				}).bind(this));
			}

			productData.$productCarousel.on('settle.flickity', (function(e, i){
				if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'model' ) {
					this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
				}
			}).bind(this));

			productData.$productCarousel.on('staticClick.flickity', (function(e, p, elm, i){
				if ( $(elm).data('product-media-type') == 'model' ) {
					if ( $(elm).find('model-viewer').hasClass('shopify-model-viewer-ui__disabled') ) {
						this._triggerAutoPlayON($(elm));
					}
				}
			}).bind(this));

		}

		// bind flickity events for all media

		if ( parseInt(productData.$productCarousel.data('size')) > 1 ) {

			var oldIndex = productData.$productCarousel.data('flickity').selectedIndex;
			productData.$productCarousel.on('change.flickity', (function(e, i){

				if ( productData.$productGalleryItem.eq(oldIndex).data('product-media-type') == 'external_video' ) {
					productData.$productGalleryItem.eq(i).find('iframe').attr('tabindex', '-1');
				}
				this._triggerAutoPlayOFF(productData.$productCarousel);
				oldIndex = i;

				if ( productData.$productGalleryItem.eq(i).data('product-media-type') != 'model' ) {
					this._triggerAutoPlayON(productData.$productGalleryItem.eq(i));
				}
				if ( productData.$productGalleryItem.eq(i).data('product-media-type') == 'external_video' ) {
					productData.$productGalleryItem.eq(i).find('iframe').attr('tabindex', '0');
				}

			}).bind(this));

			productData.$productCarousel.on('dragStart.flickity', function(e){
				$(e.currentTarget).addClass('dragging');
			});
			productData.$productCarousel.on('dragEnd.flickity', function(e){
				$(e.currentTarget).removeClass('dragging');
			});

		}

	},

	_triggerAutoPlayON: function($slide) {

		if ( $slide.hasClass('init-js-actions') ) {
			if ( $('body').hasClass('no-touch') && $(window).width() > 640 )  {
				switch ( $slide.data('product-media-type') ) {
					case 'video':
						$slide.data('player')['obj'].play();
						break;
					case 'external_video':
						$slide.data('player')['obj'].playVideo();
						break;
					case 'model':
						$slide.data('player')['obj'].play();
						break;
				}
			}
		}

	},

	_triggerAutoPlayOFF: function($slider) {

		$slider.find('.product-gallery__item').each(function(){
			if ( $(this).hasClass('init-js-actions') ) {
				switch ( $(this).data('product-media-type') ) {
					case 'video':
						$(this).data('player')['obj'].pause();
						break;
					case 'external_video':
						if ( $(this).data('player') != 'undefined' ) {
							$(this).data('player')['obj'].pauseVideo();
						}
						break;
					case 'model':
						$(this).data('player')['obj'].pause();
						break;
					}
			}
		});
		
	},

	_mountModels: function() {

		this._productModels.forEach((function($item){

			if ( ! $item.data('init') ) {

				$item.data('init', true);
				var $model = $($item.find('model-viewer')[0]),
						model = new Shopify.ModelViewerUI($model);

				$item.data('player', {
					'type': 'model',
					'obj': model
				});
				$model.data('carousel', $item.data('carousel'));

				if ( parseInt($item.data('carousel').data('size')) > 1 ) {

					$model.on('shopify_model_viewer_ui_toggle_play', (function(e){
						this._updateFlickityDraggable($(e.target).data('carousel'), false);
					}).bind(this));

					$model.on('shopify_model_viewer_ui_toggle_pause', (function(e) {
						this._updateFlickityDraggable($(e.target).data('carousel'), true);
					}).bind(this));

				}

				if ( this._modelStylesLoaded ) {
					$item.find('.shopify-model-viewer-ui').addClass('lazyloaded');
				}
				$item.addClass('init-js-actions');

			}

		}).bind(this));

	},

	_setupShopifyXr: function(modelsJson) {

		window.ShopifyXR.addModels(modelsJson);
    window.ShopifyXR.setupXRElements();

	},

	_updateFlickityDraggable: function($carousel, draggable) {
		var flkty = $carousel.data('flickity');
		flkty.options.draggable = draggable;
  	flkty.updateDraggable();
	},

	_mountSelfHostedVideos: function() {

		this._productHostedVideos.forEach((function($item){

			if ( ! $item.data('init') ) {

				$item.data('init', true);

				var player = new Shopify.Plyr($item.find('video')[0], {
					loop: {
						active: this._videoLooping
					}
				});
				$item.find('.plyr').data({
					'parent': $item,
					'carousel': $item.data('carousel')
				});

				player.on('ready', (function($item, e){
					if ( this._plyrStylesLoaded ) {
						$item.addClass('init-js-actions');
						$(e.target).addClass('lazyloaded');
						$(e.target).find('video').addClass('loaded');
						setTimeout((function($player){
							$player.addClass('reset-transitions');
						}).bind(this, $(e.target)), 50);
					} 
				}).bind(this, $item));

				if ( parseInt($item.data('carousel').data('size')) > 1 ) {

					player.on('play', (function(e){
						if ( $(e.target).data('parent').index() == $(e.target).data('carousel').data('flickity').selectedIndex ) {
							this._updateFlickityDraggable($(e.target).data('carousel'), false);
						}
					}).bind(this));

					player.on('pause', (function(e){
						if ( $(e.target).data('parent').index() == $(e.target).data('carousel').data('flickity').selectedIndex ) {
							this._updateFlickityDraggable($(e.target).data('carousel'), true);
						}
					}).bind(this));

				}

				$item.data('player', {
					'type': 'html',
					'obj': player
				});

			}

		}).bind(this));


	},

	_mountYouTubeVideos: function() {

		this._productYouTubeVideos.forEach((function($item){

			if ( ! $item.data('init') ) {

				$item.data('init', true);

				var player = new YT.Player($item.find('iframe')[0], {
					events: {
						'onStateChange': (function(e){
							if ( e.data === 0 && this._videoLooping ) {
								e.target.seekTo(0);
							}
						}).bind(this),
						'onReady': (function($item, $iframe){
							$item.addClass('init-js-actions');
							$iframe.parent().addClass('lazyloaded');
							$iframe.attr('tabindex', '-1');
						}).bind(this, $item, $item.find('iframe'))
					}
				});
				$item.data('player', {
					'type': 'youtube',
					'obj': player
				});

			}

		}).bind(this));

	},

	unmount: function($gallery) {

		$gallery.find('.product-gallery__item').each((function(i, item){

			this._productYouTubeVideos.forEach((function($arrayItem){
				if ( $arrayItem.attr('id') == $(item).attr('id') ) {
					this._productYouTubeVideos = $.grep(this._productYouTubeVideos, function(v){
						return v != $arrayItem;
					});
				}
			}).bind(this));

			this._productModels.forEach((function($arrayItem){
				if ( $arrayItem.attr('id') == $(item).attr('id') ) {
					this._productModels = $.grep(this._productModels, function(v){
						return v != $arrayItem;
					});
				}
			}).bind(this));

			this._productHostedVideos.forEach((function($arrayItem){
				if ( $arrayItem.attr('id') == $(item).attr('id') ) {
					this._productHostedVideos = $.grep(this._productHostedVideos, function(v){
						return v != $arrayItem;
					});
				}
			}).bind(this));

		}).bind(this));

	},

	LibraryLoader: (function() {

		var types = {
	    link: 'link',
	    script: 'script'
	  };

	  var status = {
	    requested: 'requested',
	    loaded: 'loaded'
	  };

	  var cloudCdn = 'https://cdn.shopify.com/shopifycloud/';

	  var libraries = {
	    youtubeSdk: {
	      tagId: 'youtube-sdk',
	      src: 'https://www.youtube.com/iframe_api',
	      type: types.script
	    },
	    plyrShopifyStyles: {
	      tagId: 'plyr-shopify-styles',
	      src: cloudCdn + 'shopify-plyr/v1.0/shopify-plyr.css',
	      type: types.link
	    },
	    modelViewerUiStyles: {
	      tagId: 'shopify-model-viewer-ui-styles',
	      src: cloudCdn + 'model-viewer-ui/assets/v1.0/model-viewer-ui.css',
	      type: types.link
	    }
	  };

	  function load(libraryName, callback) {
	    var library = libraries[libraryName];

	    if (!library) return;
	    if (library.status === status.requested) return;

	    callback = callback || function() {};
	    if (library.status === status.loaded) {
	      callback();
	      return;
	    }

	    library.status = status.requested;

	    var tag;

	    switch (library.type) {
	      case types.script:
	        tag = createScriptTag(library, callback);
	        break;
	      case types.link:
	        tag = createLinkTag(library, callback);
	        break;
	    }

	    tag.id = library.tagId;
	    library.element = tag;

	    var firstScriptTag = document.getElementsByTagName(library.type)[0];
	    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	  }

	  function createScriptTag(library, callback) {
	    var tag = document.createElement('script');
	    tag.src = library.src;
	    tag.addEventListener('load', function() {
	      library.status = status.loaded;
	      callback();
	    });
	    return tag;
	  }

	  function createLinkTag(library, callback) {
	    var tag = document.createElement('link');
	    tag.href = library.src;
	    tag.rel = 'stylesheet';
	    tag.type = 'text/css';
	    tag.addEventListener('load', function() {
	      library.status = status.loaded;
	      callback();
	    });
	    return tag;
	  }

	  return {
	    load: load
	  };
	})()

}

function onYouTubeIframeAPIReady(){
	KING.ProductMedia._mountYouTubeVideos();
}

KING.Search = {

	$searchForm: null,
	$searchInput: null,
	$searchResults: null,
	$searchMore: null,

	$sidebarOverlay: null,

	mount: function(){

		this.$searchForm = $('.sidebar__search');
		this.$searchInput = this.$searchForm.find('input[type="search"]');
		this.$searchResults = $('.sidebar__search-results');
		this.$searchMore = $('.sidebar__search-link');

		this.$sidebarOverlay = $('.cart-overlay-background');

		$(window).on('resize.search', (function(){
			this.$searchResults.css('maxHeight', document.documentElement.clientHeight - 170);
		}).bind(this));

		// form animation

		this.$searchInput.on('click', (function(e){

			if ( ! this.$searchForm.hasClass('open-search') ) {

				$('.sidebar').addClass('no-transforms');
				this.$searchForm.addClass('open-search');
				this.$searchResults.addClass('show');
				this.$searchMore.addClass('show');
 				$('body').addClass('overflow-hidden');

				this.$sidebarOverlay.addClass('show').on('click.search-close', (function(){
					this._closeSearch();
				}).bind(this));

			}

		}).bind(this));	

		this.$searchForm.find('.sidebar__search-close').on('click', (function(){
			if ( window.getPseudoContent('.sidebar__search').indexOf('predictive-mobile') < 0 ) {
				this._closeSearch();
			}
		}).bind(this));

		// form function

		var searchInputValue = this.$searchInput.val();
		this.$searchInput.on('keyup', (function(e){

			if ( searchInputValue != this.$searchInput.val() ) {
				searchInputValue = this.$searchInput.val();

				var query = this.$searchForm.find('input[type="search"]').val();

				if ( query != '' ) {

					if ( ! this.$searchResults.find('.search-item.blank').length > 0 ) {

						this.$searchResults.html('<a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a><a class="search-item blank"><div class="thumbnail"></div><div class="content"><h3 class="title"></h3><span class="caption"></span></div></a>');
					}

					this.$searchMore.html('<a class="search-more button button--solid" href="' + window.search_url + '?q=' + query + '&options[prefix]=last">' + decodeURI(encodeURI(window.search_words_search_for_html.replace('{{ terms }}', query))) + '</a>');

				} else {
					this.$searchResults.html('');
					this.$searchMore.html('');
			  	this.$searchMore.removeClass('push-me');
				}

				var searchDOM = '';

				jQuery.getJSON(window.search_url + "/suggest.json", {
				  "q": query,
				  "resources": {
				    "type": "product,collection" + ( window.predictive_search_include_pages == "true" ? ",page" : "" ) + ( window.predictive_search_include_articles == "true" ? ",article" : "" ),
				    "limit": 4
				  }
				}).done((function(response) {

				  var productSuggestions = response.resources.results.products,
				  		articleSuggestions = response.resources.results.articles,
				  		pageSuggestions = response.resources.results.pages,
				  		collectionSuggestions = response.resources.results.collections;

				  if (productSuggestions.length > 0) {

				  	productSuggestions.forEach(function(item, i){

							searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + '" href="' + item.url + '" title="' + item.title + '"><div class="thumbnail">' + ( item.featured_image.url != null ? '<img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" />' : '<span class="onboarding-svg">' + window.search_placeholder_image + '</span>' ) + '</div><div class="content"><h3 class="title">' + item.title + '</h3><span class="caption">';

						  if ( window.predictive_search_show_vendor == "true" ) {
						  	searchDOM += '<span class="vendor">' + window.search_words_prefix_by + ' ' + item.vendor + '</span>';
						  }

						  if ( window.predictive_search_show_price == "true" ) {
						  	searchDOM += '<span class="price">' + theme.Currency.formatMoney(item.price, window.shop_money_format);
						  	if ( parseInt(item.compare_at_price_max) > parseInt(item.price_min) ) {
						  		searchDOM += '<span class="st">' + theme.Currency.formatMoney(item.compare_at_price_max, window.shop_money_format) + '</span>';
						  	}
						  	searchDOM += '</span>';
						  }

						  searchDOM += '</span></div></a>';

				  	});

					} 

					if ( collectionSuggestions.length > 0 ) {
						searchDOM += '<span class="search-title">' + window.search_words_collection_results_title + '</span>';
				  	collectionSuggestions.forEach(function(item, i){
				  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + '" href="' + item.url + '" title="' + item.title + '"><div class="thumbnail">' + ( item.featured_image.url != null ? '<img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" />' : '<span class="onboarding-svg">' + window.search_placeholder_image + '</span>' ) + '</div><div class="content"><h3 class="title">' + item.title + '</h3></div></a>';
				  	});
					}

				  if ( articleSuggestions.length > 0 ) {
				  	searchDOM += '<span class="search-title">' + window.search_words_article_results_title + '</span>';
				  	articleSuggestions.forEach(function(item, i){
				  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first ' : '' ) + ( item.featured_image.url != null ? '' : 'article' ) + '" href="' + item.url +'">' + ( item.featured_image.url != null ? '<div class="thumbnail"><img class="lazyload" src="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + '" data-srcset="' + window.getSizedImageUrl(item.featured_image.url, '80x90_crop_center') + ' 80w, ' + window.getSizedImageUrl(item.featured_image.url, '160x180_crop_center') + ' 160w" data-sizes="80px" srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="' + item.title + '" /></div>' : '' ) + '<div class="content"><h3 class="title">' + item.title + '</h3>' + '<span class="caption"><span class="vendor" style="opacity: .66">' + window.formatTime('%b %d, %Y', item.published_at) + '</span></span>' + '</div></a>';
				  	});
				  }

				  if ( pageSuggestions.length > 0 ) {
				  	searchDOM += '<span class="search-title">' + window.search_words_page_results_title + '</span>';
				  	pageSuggestions.forEach(function(item, i){
				  		searchDOM += '<a class="search-item ' + ( i == 0 ? 'first' : '' ) + ' article" href="' + item.url +'"><div class="content"><h3 class="title">' + item.title + '</h3>' + ( item.body != '' ? '<span class="caption"><span class="vendor">' + item.body.replace( /(<([^>]+)>)/ig, '').trim().replace('&nbsp;', '').slice(0, 100) + '...' + '</span></span>' : '' ) + '</div></a>';
				  	});
				  }

				  this.$searchResults.html(searchDOM);
				  if ( searchDOM == '' ) {
				  	this.$searchMore.addClass('push-top');
				  } else {
				  	this.$searchMore.removeClass('push-top');
				  }

				}).bind(this));

			}

		}).bind(this));

	},

	_closeSearch: function(){
		this.$searchForm.removeClass('open-search');
		this.$searchResults.removeClass('show');
		this.$searchMore.removeClass('show');
		$('.sidebar').removeClass('no-transforms');
		$('body').removeClass('overflow-hidden');
		this.$sidebarOverlay.removeClass('show').off('click.search-close');
	}


}

// Mount in page

if ( window.predictive_search_enabled == "true" && $('.sidebar .search-form').length > 0 ) {
	KING.Search.mount();
}

KING.SharePopup = {
	mount: function(){
		$('.share-link').magnificPopup({
			type: 'inline',
			midClick: true
		});
	}
}

// Mount in page

$(document).ready(function(){
	if ( $('.share-link').length > 0 ) {
		KING.SharePopup.mount();
	}
});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.share-link').length > 0 ) {
		KING.SharePopup.mount();
	}

});

KING.BlogPosts = {

	mount: function($blog) {

		if ( $blog.find('.blog--slider').length > 0 ) {

	  	var _this = {};
			$blog.data('go', _this);

			_this.$slider = $blog.find('.blog--slider');

			this._initSlider(_this.$slider);

	  	$(window).on('resize.blog-slider', window.debounce((function(){
	  		var cellsWidth = 0;
	  		_this.$slider.find('.blog-item').each(function(){
	  			cellsWidth += $(this).outerWidth(true);
	  		})

	  		if ( cellsWidth > _this.$slider.width() && ! _this.$slider.hasClass('is-draggable') ) {
	  			this._initSlider(_this.$slider);
	  		} else if ( cellsWidth <= _this.$slider.width() && _this.$slider.hasClass('is-draggable') ) {
	  			this._initSlider(_this.$slider);
	  		}

	  	}).bind(this), 300));

		}

	},

	_initSlider: function($slider) {
		if ( $slider.hasClass('flickity-enabled') ) {
			$slider.flickity('destroy');
		}
		setTimeout(function(){
			$slider.flickity({
	  		cellSelector: '.blog-item',
	  		cellAlign: 'left',
	  		groupCells: true,
	  		prevNextButtons: false,
	  		pageDots: true
	  	});
		}, 1);
	}

}

// Mount in page

if ( $('.mount-blog-posts').length > 0 ) {
	$('.mount-blog-posts').each(function(){
		KING.BlogPosts.mount($(this));;
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-blog-posts') ) {
		KING.BlogPosts.mount($section);
	}

});



KING.Gallery = {

	mount: function($gallery) {

  	var _this = {};
		$gallery.data('go', _this);

		_this.$gallery = $gallery.find('.gallery__content');
		_this.$galleryParent = _this.$gallery.parent();
		_this.$galleryItems = _this.$gallery.find('.gallery__item');

		if ( _this.$galleryParent.hasClass('gallery--mobile-slider-true') ) {
			_this.$gallery.flickity({
	  		cellSelector: '.gallery__item',
	  		prevNextButtons: false,
	  		cellAlign: 'left',
	  		wrapAround: true,
	  		watchCSS: true
	  	});

	  }	

	  if ( _this.$gallery.attr('data-lightbox') == 'true' ) {
	  	$gallery.find('.gallery__image > div[data-mfp-src]').magnificPopup({
	  		type: 'image',
	  		closeMarkup: '<button title="Close (Esc)" type="button" class="mfp-close"><svg version="1.1" class="svg close" xmlns="//www.w3.org/2000/svg" xmlns:xlink="//www.w3.org  /1999/xlink" x="0px" y="0px" width="60px" height="60px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve"><polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812 "/></svg></button>',
	  		gallery: {
	  			enabled: true,
	  			arrowMarkup: '<button title="%title%" class="mfp-arrow mfp-arrow-%dir%"><svg class="svg symbol symbol--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.4 6.6L17 8.1l3.2 3.2H.2v2h20L17 16.6l1.4 1.4 5.6-5.7z"/></svg></button>'
	  		}
	  	});
	  }

	}

}

// Mount in page

if ( $('.mount-gallery').length > 0 ) {
	$('.mount-gallery').each(function(){
		KING.Gallery.mount($(this).find('.gallery'));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

	if ( $section.hasClass('mount-gallery') ) {
		KING.Gallery.mount($section.find('.gallery'));
	}

}).on('shopify:block:select', function(e){

	var $block = $(e.target);
	if ( $block.parent().hasClass('flickity-enabled') ) {
		$block.parent().parent().parent().flickity('select', $block.index());
	}

});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-color-button') ) {
		if ( $section.find('a.button--solid[data-color]').length > 0 ) {
			$section.find('a.button--solid[data-color]').css('color', lightOrDark($section.find('a.button--solid[data-color]').data('color')));
		}
	}

});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

}).on('shopify:section:unload', function(e){
	
	var $section = $(e.target);

}).on('shopify:block:select', function(e){

	var $block = $(e.target);

}).on('shopify:block:deselect', function(e){

	var $block = $(e.target);

});

KING.Slider = {

	mount: function($slider) {

		var _this = {}
		$slider.data('go', _this);

		_this.$slider = $slider.find('.slider');
		_this.$slides = $slider.find('.slide');
		_this.$images = _this.$slider.find('.img');
		_this.$overlays = _this.$slider.find('.slide__overlay');
		_this.$texts = _this.$slider.find('.slide__text');

		if ( _this.$slider.hasClass('slider--scroll') ) {

			// Vertical slider

			var previous = -1,
					currentOld = -1;

			// Add pagination

			_this.$slider.append('<div class="slider__dots" />');

			for (var i = 0; i < _this.$images.length; i++) {
				_this.$slider.find('.slider__dots').append('<span class="dot" />');
			}
			_this.$sliderNavigation = _this.$slider.find('.slider__dots .dot');
			_this.$sliderNavigation.eq(0).addClass('is-selected');

			_this.$sliderNavigation.on('click', function(){
				$('html, body').animate({'scrollTop': _this.$slides.eq($(this).index()).offset().top}, 500);
			});

			// Scroll effects

			$(window).on('scroll.slider-helper', (function(){

				var sliderOffset = _this.$slider.offset().top,
						scrollTop = $(window).scrollTop(),
						screenHeight = $(window).height();

				if ( scrollTop >= sliderOffset && scrollTop + screenHeight <= sliderOffset + _this.$slider.height() ) {

					for (var i = 0; i < _this.$images.length; i++) {

						// animate each slide based on scrolling and it's offset
						var transformValue = ( scrollTop - sliderOffset - ( screenHeight * i ) ) / 2;
						if ( Math.abs(transformValue) <= screenHeight / 2 ) {
							this._scrollTransform(transformValue, _this.$images.eq(i), _this.$overlays.eq(i), _this.$texts.eq(i))
						} 

						if ( scrollTop >= ( screenHeight * i ) + sliderOffset - ( screenHeight / 2 ) && ! _this.$sliderNavigation.eq(i).hasClass('is-selected') ) {
							_this.$sliderNavigation.removeClass('is-selected');
							_this.$sliderNavigation.eq(i).addClass('is-selected');
						} 

					}

				} else if ( scrollTop < sliderOffset ) {

					// fix first slide

					var transformValue = 0;
					this._scrollTransform(0, _this.$images.eq(0), _this.$overlays.eq(0), _this.$texts.eq(0));

				} else if ( scrollTop + screenHeight > sliderOffset + _this.$slider.height() ) {

					// fix last slide

					var transformValue = 0;
					this._scrollTransform(0, _this.$images.eq(-1), _this.$overlays.eq(-1), _this.$texts.eq(-1));

				}

				// Toggle slider navigation

				if ( _this.$sliderNavigation.parent().hasClass('in-view') && ( scrollTop + screenHeight > sliderOffset + _this.$slider.height() || scrollTop < sliderOffset ) ) {
					_this.$sliderNavigation.parent().removeClass('in-view');
					if ( scrollTop < sliderOffset ) {
						_this.$sliderNavigation.parent().removeClass('in-bottom');
					} else if ( scrollTop + screenHeight > sliderOffset ) {
						_this.$sliderNavigation.parent().addClass('in-bottom');
					}
				} else if ( ! _this.$sliderNavigation.parent().hasClass('in-view') && ( scrollTop >= sliderOffset && scrollTop + screenHeight <= sliderOffset + _this.$slider.height() ) ) {
					_this.$sliderNavigation.parent().addClass('in-view');
				}

			}).bind(this)).trigger('scroll.slider-helper');

		}

		// Fix slider size (100vh) on mobile devices

		$(window).on('resize.slider-helper', function(){
			if ( $(window).width() < 948 ) {
				//_this.$slides.height(document.documentElement.clientHeight);
				if ( _this.$slider.hasClass('slider--mobile-js-height') && ( _this.$slider.hasClass('slider--horizontal') || _this.$slider.hasClass('slider--horizontal-mobile-true') ) ) {
					_this.$slider.height(document.documentElement.clientHeight - 120);
				}
			}
		}).trigger('resize.slider-helper');

		if ( _this.$slider.hasClass('slider--horizontal') || _this.$slider.hasClass('slider--horizontal-mobile-true') ) {

			// Horizontal slider (flickity powered) 

			_this.$slider.flickity({
	  		cellSelector: '.slide',
	  		prevNextButtons: false,
	  		cellAlign: 'left',
	  		wrapAround: false,
	  		autoPlay: _this.$slider.data('autorotate'),
	  		watchCSS: true
	  	});

	  	_this.flkty = _this.$slider.data('flickity');

			_this.$slider.on( 'scroll.flickity', function( e, progress ) {

			  _this.flkty.slides.forEach( function( slide, i ) {

			    var img = _this.$images[i];
			    var x = ( slide.target + _this.flkty.x ) * -1/3;
		    	img.style.transform = 'translateX( ' + x  + 'px)';

			    var text = _this.$texts[i];
			    var y = ( slide.target + _this.flkty.x ) / 8;
		    	text.style.transform = 'translateX( ' + y  + 'px)';

			    var overlay = _this.$overlays[i];
			    var z = ( ( slide.target + _this.flkty.x ) * -1/10 ) / 100;
		    	overlay.style.opacity = z;

		    });

			});/*U

			_this.$slider.on('settle.flickity', function( e, index ) {
				_this.index = index;
				_this.$images.css('transform', 'none');
				_this.$texts.css('transform', 'none');
				_this.$overlays.css('opacity', '0');
			});*/

		}

	},

	_scrollTransform: function(transformValue, $image, $overlay, $text) {
		if ( $('body').hasClass('no-touch') ) {
			$image.css('transform', 'translate3d(0, ' + transformValue + 'px, 0)');
			if ( transformValue >= 0 ) {
				$overlay.css('opacity', transformValue / ( $(window).height() / 2 ) );
			}
			$text.css('transform', 'translate3d(0, ' + transformValue / 10 + 'px, 0)');
		}
	},

	unmount: function($slider) {
		$(window).off('scroll.slider-helper');
		$(window).off('resize.slider-helper');
		if ( $slider.hasClass('flickity-enabled') ) {
			$slider.flickity('destroy');
		}
	}


}


// Mount in page

if ( $('.mount-slider').length > 0 ) {
	$('.mount-slider').each(function(){
		KING.Slider.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-slider') ) {
		KING.Slider.mount($section);
	}

}).on('shopify:section:unload', function(e){
	
	var $section = $(e.target);
	if ( $section.hasClass('mount-slider') ) {
		KING.Slider.unmount($section);
	}

}).on('shopify:block:select', function(e){

	var $block = $(e.target);

	if ( $block.parent().hasClass('flickity-slider') ) {
		$block.parent().parent().parent().flickity('select', $block.index());
	}

	if ( $block.hasClass('slide') && $block.find('a.button--solid[data-color]').length > 0 ) {
		$block.find('a.button--solid[data-color]').css('color', lightOrDark($block.find('a.button--solid[data-color]').data('color')));
		$block.find('a.button--solid[data-color] path').css('fill', lightOrDark($block.find('a.button--solid[data-color]').data('color')));
	}

});

KING.Testimonials = {
	mount: function($section) {
		KING.Shortcodes.ContentSlider.mount($section);
	}
}

// Mount in page

if ( $('.mount-testimonials').length > 0 ) {
	$('.mount-testimonials').each(function(){
		KING.Testimonials.mount($(this));
	});
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-testimonials') ) {
		KING.Testimonials.mount($section);
	}

}).on('shopify:block:select', function(e){

	var $block = $(e.target);
	if ( $block.hasClass('testimonial') && $block.closest('.testimonials__container').hasClass('flickity-enabled') ) {
		$block.closest('.flickity-enabled').data('flickity').select($block.index());
	}

});

(function ($) {
   $.extend({
      'canVideoautoplay' : function ( callback ) {
         
         var testStarted = false;
         try {
         
            var playsinline = navigator.userAgent.match(/(iPhone|iPod)/g) ? ('playsInline' in document.createElement('video')) : true;
            if (!playsinline) {
               return callback(false);
            }
            
            var src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA7RtZGF0AAACrAYF//+o3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMTkgYmEyNDg5OSAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTcgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0xIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDM6MHgxMTMgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTEgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz0zIGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MyBiX3B5cmFtaWQ9MiBiX2FkYXB0PTEgYl9iaWFzPTAgZGlyZWN0PTEgd2VpZ2h0Yj0xIG9wZW5fZ29wPTAgd2VpZ2h0cD0yIGtleWludD0yNTAga2V5aW50X21pbj0yNSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmNfbG9va2FoZWFkPTQwIHJjPWNyZiBtYnRyZWU9MSBjcmY9MjguMCBxY29tcD0wLjYwIHFwbWluPTAgcXBtYXg9NjkgcXBzdGVwPTQgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAACpliIQAJ//+8dzwKZrlxoFv6nFTjrH/8I5IvpuR7wM+8DluLAAQcGNdwkEAAAAKQZokbEJ/8yAHLAAAAAhBnkJ4jf8JeQAAAAgBnmF0Rf8KSAAAAAgBnmNqRf8KSQAAABBBmmhJqEFomUwIR//kQBXxAAAACUGehkURLG8JeQAAAAgBnqV0Rf8KSQAAAAgBnqdqRf8KSAAAAA9BmqxJqEFsmUwI/4cAU8AAAAAJQZ7KRRUsbwl5AAAACAGe6XRF/wpIAAAACAGe62pF/wpIAAAADkGa70moQWyZTAi/AAJPAAAACUGfDUUVLG8JeQAAAAgBny5qRf8KSQAAA8ptb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAACFwABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAC9HRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAACFwAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAoAAAAFoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAhcAAAMAAAEAAAAAAmxtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAACzgAAAYAFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAIXbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAB13N0YmwAAACXc3RzZAAAAAAAAAABAAAAh2F2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAoABaAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwFkAAv/4QAYZ2QAC6zZQo35IQAAAwAMAAADAs4PFCmWAQAGaOviSyLAAAAAGHN0dHMAAAAAAAAAAQAAABAAAAGAAAAAFHN0c3MAAAAAAAAAAQAAAAEAAACIY3R0cwAAAAAAAAAPAAAAAQAAAwAAAAABAAAHgAAAAAEAAAMAAAAAAQAAAAAAAAABAAABgAAAAAEAAAeAAAAAAQAAAwAAAAABAAAAAAAAAAEAAAGAAAAAAQAAB4AAAAABAAADAAAAAAEAAAAAAAAAAQAAAYAAAAABAAAGAAAAAAIAAAGAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAAQAAAAAQAAAFRzdHN6AAAAAAAAAAAAAAAQAAAC3gAAAA4AAAAMAAAADAAAAAwAAAAUAAAADQAAAAwAAAAMAAAAEwAAAA0AAAAMAAAADAAAABIAAAANAAAADAAAABRzdGNvAAAAAAAAAAEAAAAwAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ny43Ny4xMDA=';
            var $video = $('<video src="'+src+'" controls playsinline muted width="20" height="20" style="position:fixed;z-index:997;top:0;left:0"></video>');
            $('body').prepend($video);
            
            testStarted = true;
            $video[0].play();
         
            $video[0].onplay = function() {
               this.playing = true;
            };

            $video[0].oncanplay = function() {
               if ($video[0].playing) {
                  callback(true);
               } else {
                  callback(false);
               }
               $video[0].pause();
               $video.remove();
            };
         } catch(e) {}
         
         if (!testStarted) {
            callback(false);
         }
      }
   });
})(jQuery);

$(function () {
   $.canVideoautoplay(function ( canAutoplay ) {
      if ( canAutoplay ) {
         $('.video-text__background video').css('opacity', 1);
      } else {
         $('.video-text__background .video-text__image').css('display', 'block');
      }
   });
});

// Shopify events

$(document).on('shopify:section:load', function(e){
   var $section = $(e.target);
   if ( $section.hasClass('mount-video-background') ) {
      $('.video-text__background video').css('opacity', 1);
   }
});

KING.VideoPopup = {

	mount: function($videoPopup){

		$videoPopup.find('.video-popup__link').on('click', function(e){

			e.preventDefault();

			$(this).append('<div class="video-popup__blackout" />');
			setTimeout((function(){
				$(this).find('.video-popup__blackout').css('opacity', 1);
			}).bind(this), 10);

			setTimeout((function(){
				if ( $(this).data('video-source') == 'youtube' ) {
					$(this).append('<iframe class="video-popup__iframe" src="https://youtube.com/embed/' + $(this).data('video-id') + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />');
				} else if ( $(this).data('video-source') == 'vimeo') { 
					$(this).append('<iframe class="video-popup__iframe" src="https://player.vimeo.com/video/' + $(this).data('video-id') + '?autoplay=1&rel=0" allow="autoplay; fullscreen" allowfullscreen />');
				}
			}).bind(this), 50);

		});

	}

};

// Mount in page

if ( $('.mount-video-popup').length > 0 ) {
	$('.mount-video-popup').each(function(){
		KING.VideoPopup.mount($(this));
	});
};

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.hasClass('mount-video-popup') ) {
		KING.VideoPopup.mount($section);
	}

});

/* ---- 
	Product Page Helpers
	---- */

if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

/* ---- 
	Money currency format
	---- */

window.theme = window.theme || {};
theme.Currency = (function() {
  var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {

    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {

    	if ( precision != undefined ) {
    		precision = precision;
    	} else {
    		precision = 2;
    	}

      thousands = thousands || ',';
      decimal = decimal || '.';


      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

/* ---- 
	Product 
	---- */

KING.Product = {

	$product: null,
	$productText: null,

	$productGallery: null,
	$productGalleryItem: null,
	productGalleryNavigation: null,
	$productGalleryNavigationItem: null,

	$productCarousel: null,
	$productCarouselImgs: null,
	productFlkty: null,

	mount: function( $productParent ) {

		$product = $productParent.find('.product');

		// Truncated description

		if ( $product.find('.product__description').hasClass('truncated') ) {

		setTimeout((function($product){

			var $productDescription = $product.find('.product__description')
					$productDescriptionInner = $productDescription.children('div'),
					$productDescriptionTrigger = null;

				if ( $productDescriptionInner.height() - 10 >  $productDescription.height() ) {

					$productDescription.after('<a class="truncated__trigger">' + window.products_page_more_description_label + '</a>');
					$productDescriptionTrigger = $product.find('.truncated__trigger');

					$productDescriptionTrigger.on('click', (function(e){

						e.preventDefault();

						if ( ! $productDescription.hasClass('truncated--show') ) {
							$productDescription.addClass('truncated--show');
							$productDescription.css('maxHeight', $productDescriptionInner.height());
	    				$productDescriptionTrigger.text(window.products_page_less_description_label);
						} else {
							$productDescription.removeClass('truncated--show');
							$productDescription.attr('style', '');
	    				$productDescriptionTrigger.text(window.products_page_more_description_label);
						}

						this._fixProductScroll();

					}).bind(this));

				} else {
					$productDescription.removeClass('truncated');
				}

			}).bind(this, $product), 100);

    }

    // Quantity buttons

    if ( $product.find('.product__quantity').length > 0 ) {

			var $productQty = $product.find('.quantity__selector');
			if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
				$product.find('.quantity__minus').addClass('disabled');
			}
			if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
				$product.find('.quantity__plus').addClass('disabled');
			}

			$product.find('.quantity__minus').on('click', (function($productQty, $productQtyPlus, e){
				e.preventDefault();
				e.stopImmediatePropagation();
				if ( ! $(e.currentTarget).hasClass('disabled') ) {
					var currentQty = parseInt($productQty.val());
					if ( currentQty - 1 >= parseInt( $productQty.attr('min') ) ) {
						$productQty.val(currentQty - 1);
						$productQtyPlus.removeClass('disabled');
					} 
					if ( currentQty - 1 <= parseInt( $productQty.attr('min') ) ) {
						$(e.currentTarget).addClass('disabled');
					}
				}
			}).bind(this, $productQty, $product.find('.quantity__plus')));

			$product.find('.quantity__plus').on('click', (function($productQty, $productQtyMinus, e){
				e.preventDefault();
				e.stopImmediatePropagation();
				if ( ! $(e.currentTarget).hasClass('disabled') ) {
					var currentQty = parseInt($productQty.val());
					if ( currentQty + 1 <= parseInt( $productQty.attr('max') ) ) {
						$productQty.val(currentQty + 1);
						$productQtyMinus.removeClass('disabled');
					}
					if ( currentQty + 1 >= parseInt( $productQty.attr('max') ) ) {
						$(e.currentTarget).addClass('disabled');
					}
				}
			}).bind(this, $productQty, $product.find('.quantity__minus')));

		}

		// Init product form

		window.cartFormAjax();

		var productIsDisabled = false;
		if ( $product.data('settings-hv') && $product.data('availability') ) {
			this._advancedOptionsSelector($product, JSON.parse($product.find('.product-json')[0].innerHTML));
		} else if ( $product.data('settings-hv') && ! $product.data('availability') ) {
			productIsDisabled = true;
		} 				

		if ( ! $product.hasClass('onboarding--true' ) ) {
			this.initProductForm($product, productIsDisabled);
		}

		if ( $product.find('.product__form').length > 0 && $product.find('.product__form').data('type') == 'overlay' ) {

    	var $form = $product.find('.product__form form'),
			  	$submitSymbol = $product.find('.add-to-cart__symbol'),
			  	$submitButton = $product.find('.product__add-to-cart'),
			  	$cartCount = $('.sidebar__cart-handle .count'),
			  	$cartTitle = $('.cart__title'),
			  	$cartQty = $product.find('.quantity__selector');

	  		if ( $form.attr('action').indexOf('.js') < 0 ) {
	  			$form.attr('action', $form.attr('action') + '.js');
	  		}

	  	$form.submit(function(e){

	  		var oldText = $submitSymbol.html();
	  		$submitSymbol.html('<span class="preloader" />');
	  		$submitButton.addClass('working');

	  		var itemName = $product.find('.product__title').text(),
	  				itemPrice = $product.find('.product__price--original').attr('data-price'),
	  				itemCurrency = Shopify.currency.active,
	  				itemId = $product.data('id');

	  		$.ajax({
	  			type: $form.prop('method'),
	  			url: $form.prop('action'),
	  			data: $form.serialize(),
	  			dataType: 'json',
	  			success: function(data){

	  				$.ajax({
	  					url: window.cart_url,
	  					success: function(data) {

								// facebook pixel

								if ( typeof fbq !== 'undefined' ) {
									fbq('track', 'AddToCart', {
							      content_name: itemName, 
							      content_ids: [itemId],
							      content_type: 'product_group',
							      value: parseFloat(itemPrice),
							      currency: itemCurrency
									});
								}

								// google pixel

								if ( typeof ga !== 'undefined' ) {
									ga('ec:addProduct', {
									  'id': itemId,
									  'name': itemName,
									  'price': parseFloat(itemPrice),
									  'quantity': $cartQty.length > 0 ? parseInt($cartQty.val()) : 1
									});
									ga('ec:setAction', 'add');
									ga('send', 'event', 'UX', 'click', 'add to cart');     
								}

								// totals update

								$('#cart .cart__items').html($(data).find('#cart .cart__items .cart-item'));
								$('#CartDetails').html($(data).find('#CartDetails').html());

								if ( $('.cart__form').hasClass('cart--empty') ) {
									$('.cart__form').removeClass('cart--empty');
								}

								// button animation

			  				setTimeout(function(){
			  					$submitButton.addClass('done');
	  							$submitSymbol.html(oldText);
			  					setTimeout(function(){
			  						$submitButton.addClass('clear');
			  						setTimeout(function(){
			  							$submitButton.removeClass('working').removeClass('done');
			  							setTimeout(function(){
			  								$submitButton.removeClass('clear');
			  							}, 1000);
			  						}, 10);
			  					}, 500);
			  				}, 1000);

			  				// count changing

			  				if ( $cartQty.length > 0 ) {

			  					var qty = parseInt($cartQty.val());
			  					if ( qty == 1 ) {
										$cartTitle.html($cartTitle.data('added-singular').replace(/{{ count }}|count|{{count}}/g, qty));
		  						} else {
										$cartTitle.html($cartTitle.data('added-plural').replace(/{{ count }}|count|{{count}}/g, qty));
		  						}

			  					$cartCount.text(parseInt($cartCount.text()) + parseInt($cartQty.val()));

			  				} else {

			  					$cartCount.text(parseInt($cartCount.text()) + 1);
			  					$cartTitle.html($cartTitle.data('added-singular').replace(/{{ count }}|count|{{count}}/, 1));

			  				}

			  				// open cart sidebar
			  				
								$('.sidebar__cart-handle').trigger('click');
								window.cartFormAjax();

	  					}

	  				});

	  			},

	  			error: function(data) {

	  				alert(data.responseJSON.description);

	  				setTimeout(function(){
	  					$submitButton.addClass('done');
							$submitSymbol.html('');
	  					setTimeout(function(){
	  						$submitButton.addClass('clear');
	  						setTimeout(function(){
	  							$submitSymbol.html(oldText);
	  							$submitButton.removeClass('working').removeClass('done');
	  							setTimeout(function(){
	  								$submitButton.removeClass('clear');
	  							}, 1000);
	  						}, 10);
	  					}, 500);
	  				}, 100);

	  			}
	  		});

	  		e.preventDefault();

	  	});

	  }

	  // Product gallery

  	var _this = {};
		$product.data('po', _this);

		_this.$productGallery = $product.find('.product__gallery');
		_this.$productGalleryItem = $product.find('.product-gallery__item');

		_this.$productCarousel = _this.$productGallery.children('.product-gallery');

		_this.$productGalleryNavigation = $product.find('.product-gallery__thumbnails');
		_this.$productGalleryNavigationItem = $product.find('.product-gallery__thumbnails .thumbnail');
		_this.$productGalleryNavigationItem.eq( $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0 ).addClass('active');

		// Resize all first

	  this._mountGalleryResizer(_this.$productCarousel);

		var $productThumbnails = $('.product-gallery__thumbnails .thumbnails-holder');
		var gutter = _this.$productCarousel.hasClass('product-gallery--gutter') ? 25 : 0;

		$product.find('.product-gallery__thumbnails .thumbnail').on('click', function(){

			$product.find('.product-gallery__thumbnails .thumbnail.active').removeClass('active');
			$(this).addClass('active');

			if ( _this.$productCarousel.hasClass('flickity-enabled') ) {

				_this.$productCarousel.flickity('select', $(this).index());
				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails.scrollLeft(Math.max( $(this).index() - 2, 0 ) * $(this).width());
				}

			} else {

				$('html, body').stop().animate({
					scrollTop: _this.$productGalleryItem.eq($(this).index()).offset().top - gutter
				}, 350);

				KING.ProductMedia._triggerAutoPlayOFF(_this.$productCarousel);
				KING.ProductMedia._triggerAutoPlayON(_this.$productGalleryItem.eq($(this).index()));

				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails.scrollTop(Math.max( $(this).index() - 1, 0 ) * $(this).height());
				}

			}

		}).on('keypress', function(e){
			if ( e.which == 13 ) {
				$(this).trigger('click');
				_this.$productCarousel.find('.product-gallery__item.is-selected').focus();
			}
		});

		if ( _this.$productCarousel.hasClass('product-gallery--scroll') ) {

			$(window).on('scroll.product-gallery', (function() {

				if ( ! _this.$productCarousel.hasClass('flickity-enabled') && $(window).width() > 1023 ) {

					_this.$productGalleryItem.each((function(key, elm){

						if ( $(window).scrollTop() + $(window).height() > $(elm).offset().top + $(window).height() / 2 && ! $(elm).hasClass('active') ) {

							$(elm).addClass('active');
							_this.$productGalleryNavigationItem.removeClass('active');
							_this.$productGalleryNavigationItem.eq($(elm).index()).addClass('active');

						} else if ( $(window).scrollTop() + $(window).height() < $(elm).offset().top + $(window).height() / 2 && $(elm).hasClass('active') ) {

							$(elm).removeClass('active');
							_this.$productGalleryNavigationItem.removeClass('active');
							_this.$productGalleryNavigationItem.eq($(elm).index()-1).addClass('active');

						}

						if ( $(window).scrollTop() + $(window).height() > _this.$productGallery.height() && ! _this.$productGalleryNavigation.hasClass('scroll') ) {
							_this.$productGalleryNavigation.addClass('scroll');
						} else if ( $(window).scrollTop() + $(window).height() < _this.$productGallery.height() && _this.$productGalleryNavigation.hasClass('scroll') ) {
							_this.$productGalleryNavigation.removeClass('scroll');
						}

					}).bind(_this));

				}

			}).bind(_this)).trigger('scroll.product-gallery');

		}

		// init sliding gallery (always, because it turns into this at responsive)

		if ( parseInt(_this.$productCarousel.data('size')) > 1 ) {

			_this.$productCarousel.on('ready.flickity', function(){
				if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
					if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
						var selectedThumbnail = $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0;
						$productThumbnails.scrollLeft(Math.max( selectedThumbnail - 2, 0 ) * 58);
					}
				}
			});

			_this.$productCarousel.flickity({
				cellSelector: '.product-gallery__item:not(.remove-from-flick)',
				initialIndex: $product.data('KingProductImageIndex') != undefined ? $product.data('KingProductImageIndex') : 0,
				wrapAround: false,
				prevNextButtons: _this.$productCarousel.hasClass('product-gallery--dots') ? true : false,
				arrowShape: 'M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z',
				pageDots: false,
				cellAlign: 'left',
				accessibility: false,
				setGallerySize: false,
				watchCSS: _this.$productCarousel.hasClass('product-gallery--scroll') ? true : false,
				resize: true
			});

			_this.productFlkty = _this.$productCarousel.data('flickity');
			_this.productFlkty.resize();

			var $cells = _this.$productCarousel.find('.product-gallery__item');

			// scroll animation
			_this.$productCarousel.on('scroll.flickity', function(event, progress) {

				if ( $(window).width() < 768 || ( $product.hasClass('featured-product' ) && $(window).width() > 948 ) ) {

				  _this.productFlkty.slides.forEach( function( slide, i ) {

				    var img = _this.$productGalleryItem.eq(i).children('*').eq(0);
				    var x = ( slide.target + _this.productFlkty.x ) * -1/3;
			    	img.css('transform', 'translateX( ' + x  + 'px)'); 

			    });

			  } else {

					$cells.removeClass('before-selected after-selected');

					var index = _this.productFlkty.selectedIndex;

					$cells.each(function(){
						if ( $(this).index() < index ) {
							$(this).addClass('before-selected');
						} else if ( $(this).index() > index ) {
							$(this).addClass('after-selected');
						}
					});

			  }

			});

			// change navigation items when slide change
			var $productThumbnails = $product.find('.product-gallery__thumbnails .thumbnails-holder'),
					productThumbnailWidth = _this.$productGalleryNavigationItem.width();

			_this.$productCarousel.on('change.flickity', function(e, i) {

				_this.$productGalleryNavigationItem.removeClass('active');
				_this.$productGalleryNavigationItem.eq(i).addClass('active');

				if ( _this.$productCarousel.hasClass('product-gallery--thumbnails') ) {
					$productThumbnails.scrollLeft(Math.max( i - 2, 0 ) * productThumbnailWidth);
				}

			});

			// add an extra set of arrows
			if ( _this.$productCarousel.hasClass('product-gallery--dots') ) {

				_this.$productGalleryNavigation.prepend('<button class="flickity-button flickity-prev-next-button previous" type="button" disabled="" aria-label="Previous"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow"></path></svg></button>');
				_this.$productGalleryNavigation.append('<button class="flickity-button flickity-prev-next-button next" type="button" aria-label="Next"><svg class="flickity-button-icon" viewBox="0 0 100 100"><path d="M66.3964 39L63.7456 41.8947L69.8047 48.0702H23V51.9298H69.8047L63.7456 58.2982L66.3964 61L77 50L66.3964 39Z" class="arrow" transform="translate(100, 100) rotate(180) "></path></svg></button>');

				var $productGalleryNavigationPrevious = _this.$productGalleryNavigation.find('.flickity-button.previous'),
						$productGalleryNavigationNext = _this.$productGalleryNavigation.find('.flickity-button.next');

				$productGalleryNavigationPrevious.on('click', function(){
					if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
						var flkty = _this.$productCarousel.data('flickity');
						_this.$productCarousel.flickity('select', Math.max(flkty.selectedIndex - 1, 0));
					}
				});

				$productGalleryNavigationNext.on('click', function(){
					if ( _this.$productCarousel.hasClass('flickity-enabled') ) {
						var flkty = _this.$productCarousel.data('flickity');
						_this.$productCarousel.flickity('select', Math.min(flkty.selectedIndex + 1, flkty.slides.length));
					}
				});

				_this.$productCarousel.on('change.flickity', function(e, i) {
					$productGalleryNavigationPrevious.prop('disabled', false);
					$productGalleryNavigationNext.prop('disabled', false);
					if ( i == 0 ) {
						$productGalleryNavigationPrevious.prop('disabled', true);
					} else if ( i == _this.$productCarousel.data('flickity').slides.length - 1 ) {
						$productGalleryNavigationNext.prop('disabled', true);
					}
				});

			}

		}

		// a11y helper

		if ( parseInt(_this.$productCarousel.data('size')) > 1 ) {
			_this.$productGalleryItem.on('focus, focusin', function(){
				if ( ! $(this).hasClass('is-selected') ) {
					_this.$productCarousel.find('.flickity-viewport').scrollLeft(0);
					_this.$productCarousel.flickity('select', $(this).index());
				}
			});
		}

		// Product Zoom

		if ( $('.product__image-zoom').length > 0 ) {

			$('body').append('<div id="zoom"><img /><span class="zoom__exit"><svg class="svg symbol symbol--zoom-out" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.2,19.2c-5,0-9-4-9-9s4-9,9-9s9,4,9,9S15.2,19.2,10.2,19.2z M10.2,3.2c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7 C17.2,6.4,14.1,3.2,10.2,3.2z"/><path d="M15.637 17.078l1.414-1.414 5.657 5.657-1.414 1.414zM6.3 9.3h8v2h-8z"/></svg></span><div class="zoom__overlay"></div></div>');

			$('.product__image-zoom').on('click', (function(e){

				$('#zoom').stop().fadeIn(250);

				var $image = $('#zoom img');
				$image.attr('src', $(e.currentTarget).data('image'));

				setTimeout((function(){
					if ( $image[0].naturalWidth > 0 ) {
							this._productZoomMount($image);
					} else {
						$image.on('load', (function(){
							this._productZoomMount($image);
						}).bind(this))
					}
				}).bind(this), 200);

			}).bind(this));

			$('.zoom__exit').on('click', (function(e){
				this._productZoomUnmount();
			}).bind(this));

		}

		// Other shortcodes

		if ( $('.toggles').length > 0 ) {
			KING.Shortcodes.Toggles.mount();
		}

		// Mobile hidden content fix (hack)

		if ( $(window).width() < 948 ) {
			setTimeout(function(){
				$(window).trigger('scroll');
			}, 500);
		}

	},

	_mountGalleryResizer: function( $gallery ) {
 		if ( $gallery.hasClass('product-gallery--fit') && ( $gallery.hasClass('product-gallery--slider') || $(window).width() < 1024 ) ) {
      $(window).on('resize.lazy-fit-height', function(){
        $gallery.find('.lazy-image').each(function(){
          var $parent = $(this).parent();
          var gutter = "image"==$parent.attr("data-product-media-type")||1024>$(window).width()?0:$gallery.hasClass("product-gallery--thumbnails")?$gallery.hasClass("product-gallery--gutter")?110:100:$gallery.hasClass("product-gallery--gutter")?70:50;
          $parent.css('width', ( $gallery.height() - gutter ) * $(this).data('ratio'));
        });
      }).trigger('resize.lazy-fit-height');
      if ( $gallery.hasClass('flickity-enabled') ) {
        $gallery.flickity('resize');
      }
    }

	},

	_productZoomMount: function( $image ) {

		$image.css({'left': 0, 'top': 0});

		$(window).on('mousemove.zoom', function(e) {
			e.preventDefault();
			window.clientX = e.clientX;
			window.clientY = e.clientY;
			var x = e.clientX * ( $(window).width() - $image.width() ) / $(window).width();
			var y = e.clientY * ( $(window).height() - $image.height() ) / $(window).height();
			$image.css({'left': x, 'top': y});
		});

		$image.data('ratio', $image[0].naturalWidth / $image[0].naturalHeight);

		$(window).on('resize.zoom', function(){	

			var rf = $(window).width() > 768 ? 1 : 2;

			if ( $image.hasClass('portrait') ) {
				$image.css('width', $(window).width()*rf);
				$image.css('height', $(window).width()*rf / $image.data('ratio'));
			} else {

				$image.css('height', $(window).height()*rf);
				$image.css('width', $(window).height()*rf * $image.data('ratio'));

				if ( $image.width() < $(window).width() ) {
					$image.css('width', $(window).width()*rf);
					$image.css('height', $(window).width()*rf / $image.data('ratio'));
				}

			}

			var x = window.clientX * ( $(window).width() - $image.width() ) / $(window).width();
			var y = window.clientY * ( $(window).height() - $image.height() ) / $(window).height();

		}).trigger('resize.zoom');

		setTimeout(function(){
			if ( $('body').hasClass('touch') ) {
				$('#zoom').scrollTop( ( $(window).height() - $image.height() ) / -2 );
				$('#zoom').scrollLeft( ( $(window).width() - $image.width() ) / -2 );
			}
			$('#zoom').addClass('loaded');
		}, 50);

	}, 

	_productZoomUnmount: function() {

		$('#zoom').stop().fadeOut(250);

		setTimeout(function(){
			$(window).off('resize.zoom');
			$(window).off('mousemove.zoom');
			$('#zoom img').attr('src', '').removeClass('portrait').removeClass('landscape');
			$('#zoom').removeClass('loaded');
		}, 300);

	},

	_fixProductScroll: function(){
		if ( scrollI >= 0 ) {
			clearInterval(scrollI);
		}
		var scrollI = setInterval(function(){
			$(window).trigger('scroll.sticky-product');
		}, 10);
		setTimeout(function(){
			clearInterval(scrollI);
		}, 200);
	},

	initProductForm : function( $product, pdisabled ) {

		var firstVariantEver = true;

		var productSingleObject = JSON.parse($product.find('.product-json')[0].innerHTML),
				productVariants = productSingleObject.variants;

		$product.find('form select.product__variant').on('change', (function(e){
			this._initProductVariantChange(false, productSingleObject, $product);
		}).bind(this));

		this._initProductVariantChange(true, productSingleObject, $product);

		$product.find('select.product__variant').each(function(){
			window.styledSelectUpgraded($(this), false);
		});

		$product.find('.product__variant-holder').removeClass('hidden');

		if ( pdisabled ) {
			$product.find('.product__variant-holder').css('display', 'none');
		} 

	},

	_getProductVariant : function( $product ) {

		/* ---- 
			Get current variant
			---- */

		var optionArray = [];

		$product.find('form select.product__variant').each(function(){
			optionArray.push($(this).find(':selected').val())
		});

		return optionArray;

	},

	_initProductVariantChange : function(firstTime, productSingleObject, $product) {	

		var variant = null,
			options = this._getProductVariant( $product );

		productSingleObject.variants.forEach(function(el){

			if ( $(el)[0].options.equals(options) ) {
				variant = $(el)[0];
			}

		});

		this._productSelectCallback(variant, $product, productSingleObject);
		if ( ! firstTime && $product.find('#productSelect option').length > 1 && ! $('body').hasClass('template-index') ) {
			this._updateProductVariantState(variant);
		}

	},

	_updateProductVariantState : function(variant) {

	   if (!history.pushState || !variant) {
	    return;
	  }

	  var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
	  window.history.replaceState({path: newurl}, '', newurl);

	},

	_productSelectCallback : function(variant, $product, productSingleObject) {

		var _po = $product.data('po');

		var $addToCart = $product.find('.product__form'),
				$addToCartButton = $product.find('.product__add-to-cart'),
	      $productPrice = $product.find('.product__price--original'),
	      $comparePrice = $product.find('.product__price--compare'),
	      $quantityElements = $product.find('.quantity__selector'),
	      $quantityElementsHolder = $product.find('.product__quantity'),
	      $addToCartText = $product.find('.add-to-cart__text'),
	      $productCarousel = $product.find('.product__gallery .product-gallery'),
	      $productGalleryItem = $product.find('.product__gallery .product-gallery__item');

		if (variant) {

			// Set cart value id

			$product.find('#productSelect').find('option[value="' + variant.id + '"]').prop('selected', true);

			// Swipe to variant slide

			if ( variant.featured_media != null ) {

				var variantImg = $productCarousel.find('.product-gallery__item[data-media-id="' + variant.featured_media.id + '"]');

				if ( variantImg.length > 0 ) {

					if ( $productCarousel.hasClass('product-gallery--slider') || ( $productCarousel.hasClass('product-gallery--scroll') && $(window).width() < 1024 ) ) {
						if ( variantImg.length > 0 ) {
							if ( _po != undefined && _po.productFlkty != undefined && variantImg.data('index') != _po.productFlkty.selectedElement ) {
								_po.productFlkty.select(variantImg.data('index'));
							} else {
								$product.data('KingProductImageIndex', variantImg.data('index'));
							}
						}

					} else {
						$product.data('KingProductImageIndex', variantImg.data('index'));
						$('html, body').stop().animate({'scrollTop': variantImg.offset().top}, 350);
					}	

				}

			}

			// Display info about variants quantity

			var $variantQuantity = $product.find('.variant-quantity');
			$variantQuantity.text('');

			var DOMVariant = $product.find('#productSelect').find('option[value="' + variant.id + '"]');
			if ( DOMVariant.attr('data-quantity') == '0' ) {
				if ( DOMVariant.attr('data-inventory') == 'continue' ) {
					$variantQuantity.html(window.product_words_preorder);
				} else if ( DOMVariant.attr('data-inventory') == 'deny' ) {
					$variantQuantity.html(window.product_words_no_products);
				}
			} else if ( DOMVariant.attr('data-quantity') == '1' ) {
				$variantQuantity.html(window.product_words_one_product);
			} else if ( parseInt( DOMVariant.attr('data-quantity') ) <= 5 ) {
				$variantQuantity.html(window.product_words_few_products.replace('{{ count }}', DOMVariant.attr('data-quantity')));
			} else if ( ! variant.available ) {
				$variantQuantity.html(window.product_words_no_products);
			}

			// Edit cart buttons based on stock 
				
			if ( variant.available ) {

				$quantityElements.prop('max', 999);
				$addToCartButton.removeClass('disabled').prop('disabled', false);
				$addToCartText.text($addToCartText.attr('data-add-to-cart-text'));
				$quantityElements.show();
				if ( $quantityElementsHolder != null ) {
					$quantityElementsHolder.show();
				}

			} else {
				$addToCartButton.addClass('disabled').prop('disabled', true);
				$addToCartText.text(window.product_words_sold_out_variant);
				$quantityElements.hide();
				if ( $quantityElementsHolder != null ) {
					$quantityElementsHolder.hide();
				}

			}

			// Update price

			$productPrice.html( theme.Currency.formatMoney(variant.price, window.shop_money_format) );
			$productPrice.attr( 'data-price', variant.price / 100 );
			if ( variant.compare_at_price > variant.price ) {
				$comparePrice.html(theme.Currency.formatMoney(variant.compare_at_price, window.shop_money_format)).show();
			} else {
				$comparePrice.hide();
			}
			
			if ( $product.find('.unit-price').length > 0 ) {
				if ( variant.unit_price_measurement ) {
					$product.find('.unit-price').html(theme.Currency.formatMoney(variant.unit_price, window.shop_money_format) + " / " + ( variant.unit_price_measurement.reference_value != 1 ? variant.unit_price_measurement.reference_value + " " : "" ) + variant.unit_price_measurement.reference_unit);
				} else {
					$product.find('.unit-price').empty();
				}
			}

			// Update sku

			if ( $product.find('.product__sku').length > 0 ) {
				if ( variant ) {
					$product.find('.product__sku').text(variant.sku);
				} else {
					$product.find('.product__sku').empty();
				}
			}

		} else {

			// Disable variant completely 

			$addToCartButton.addClass('disabled').prop('disabled', true);
			$addToCartText.text(window.product_words_unavailable_variant);
			$quantityElements.hide();
			if ( $quantityElementsHolder != null ) {
				$quantityElementsHolder.hide();
			}

		}

		if ( $product.find('.quantity__selector').length > 0 ) {

			var $productQty = $product.find('.quantity-selector');
			$product.find('.quantity__minus').removeClass('disabled');
			$product.find('.quantity__plus').removeClass('disabled');

			if ( parseInt($productQty.val()) - 1 < parseInt($productQty.attr('min')) ) {
				$product.find('.quantity__minus').addClass('disabled');
			}
			if ( parseInt($productQty.val()) + 1 > parseInt($productQty.attr('max')) ) {
				$product.find('.quantity__plus').addClass('disabled');
			}

		}

	},

	_advancedOptionsSelector: function($product, productJson) {
	  var om = {};
	  $product.data('om', om);
	  var forceMutation = false;
	  var $addToCartForm = $product.find('.product__form');
	  if (window.MutationObserver && $addToCartForm.length) {
	    if (typeof observer === 'object' && typeof observer.disconnect === 'function') {
	      observer.disconnect();
	    }
	    var config = { childList: true, subtree: true };
	    var observer = new MutationObserver(function() {    
	      Shopify.linkOptionSelectors(productJson, $product);
	      observer.disconnect();
	    });  
	    if ( forceMutation ) {
	      Shopify.linkOptionSelectors(productJson, $product);
	    }
	    observer.observe($addToCartForm[0], config);
	  }
	},

	unmount: function() {
		$(window).off('scroll.product-gallery');
		$(window).off('resize.lazy-fit-height');
	}

}

// Mount in page

if ( $('.mount-product-page').length > 0 ) {
	$('.mount-product-page').each(function(){
		KING.Product.mount($(this));
		KING.ProductMedia.mount($(this).find('.product'));
		window.KingProductGalleryMobileHelpers($(this).find('.product'));
	});
} 

// Mount portfolio page

if ( $('.mount-project-page').length > 0 ) {
	$('.project').data('po', {
		$productCarousel: $('<span data-video-looping="false" />'),
		$productGalleryItem: $('.product-gallery__item')
	})
	KING.ProductMedia.mount($('.project'));
}

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);

	setTimeout(function(){

 		if ( $section.hasClass('mount-product-page') ) {
			KING.Product.mount($section);
	  	KING.Product._mountGalleryResizer($section.find('.product-gallery'));
			KING.ProductMedia.mount($section.find('.product'));
			window.KingProductGalleryMobileHelpers($section.find('.product'));
 		} else if ( $section.hasClass('mount-project-page') ) {
			$('.project').data('po', {
				$productCarousel: $('<span data-video-looping="false" />'),
				$productGalleryItem: $('.product-gallery__item')
			})
			KING.ProductMedia.mount($('.project'));
 		}

 	}, 100);

}).on('shopify:section:unload', function(e){

 		var $section = $(e.target);

		if ( $section.hasClass('mount-product-page') ) {
			KING.Product.unmount();
			KING.ProductMedia.unmount($section.find('.product-gallery'));
 		}

});

// quick hack

if ( $('body').hasClass('template-product') ) {
	if ( $('#shopify-section-product-story').children().length <= 0 ) {
		$('#shopify-section-product-story').addClass('blank');
	}
}

// Init Product Review

if ( $('#shopify-product-reviews').length > 0 ) {

	if ( $('#shopify-product-reviews').find('.spr-starrating').length > 0 ) {
		
		var checkI = setInterval(function(){

			if ( $('.spr-reviews').children().length > 0 ) {

				clearInterval(checkI);

			  $('.product-page-reviews').css('display', 'block');

			  turnReviewsFormIntoPopup();

				$('.spr-reviews').on('ready.flickity', function(){

					if ( $('.spr-reviews').hasClass('is-draggable') ) {

			 			$('.spr-reviews').append('<div class="flickity-custom-nav"><span class="prev">' + window.symbol_arrow + '</span><span class="next">' + window.symbol_arrow + '</span></div>');

			      $('.spr-reviews').find('.next').on('click', function(){
			        $('.spr-reviews').data('flickity').next();
			      });

			      $('.spr-reviews').find('.prev').on('click', function(){
			        $('.spr-reviews').data('flickity').previous();
			      });

					}

				});

				$('.spr-reviews').attr('data-no', $('.spr-review').length)
					.flickity({
						cellSelector: '.spr-review, .spr-pagination',
						cellAlign: 'left',
						groupCells: true,
						prevNextButtons: false,
						pageDots: false,
						adaptiveHeight: true
					});
	     
				var ra = $('.spr-summary-starrating').find('.spr-icon-star').length,
						rb = $('.spr-summary-starrating').find('.spr-icon-star-half-alt').length > 0 ? '5' : '0';

				$('.spr-summary-starrating').attr('data-rating', ra + '.' + rb);

				$('.spr-reviews').on('change.flickity', function( event, index ) {
				  $('.spr-reviews').find('.is-selected').each(function(){
				  	if ( $(this).hasClass('spr-pagination') && $(this).find('.spr-pagination-next').length > 0 ) {

				  		var $paginationObject = $(this),
				  				page = $(this).find('.spr-pagination-next a').data('page'),
									product_id = $(this).find('.spr-pagination-next a').data('product-id');

							$.get({
								url: SPR.api_url + '/reviews',
								data: {
									page: page,
									product_id: product_id,
									shop: window.location.hostname
								},
								success: function(data){
									var $reviews = $(data.reviews).find('.spr-review, .spr-pagination').prevObject;
									$paginationObject.remove();
									$('.spr-reviews').flickity( 'reposition' );
									$('.spr-reviews').flickity( 'append', $reviews);
								},
								dataType: 'jsonp'
							});

				  	}
				  })
				});

			}

		}, 30);

	} else {

	  $('.product-page-reviews').css('display', 'block');

		var checkI = setInterval(function(){
			if ( $('.spr-form').length > 0 && ! $('.spr-form').hasClass('init') ) {
				clearInterval(checkI);
				turnReviewsFormIntoPopup();
			}
		}, 30);

	}

}

function turnReviewsFormIntoPopup() {
	$('.spr-form').addClass('init').attr('style', '').wrap('<div id="spr-form" class="spr-form-holder" />');
	$('.spr-form-holder').addClass('address-popup').addClass('mfp-hide');
	$('.spr-summary-actions-newreview').attr('onclick', '').magnificPopup({
		items: {
			src: '#spr-form',
			type: 'inline'
		}
	});
}



// filtering tasks

KING.Collection.mountFilters = function(){

	if ( $('.filters-overlay-background').length <= 0 ) {
		$('body').append('<div class="filters-overlay-background" />');
	}

	$('.option select').each(function(){
		window.styledSelectUpgraded($(this), true);
	});

	$('.collection__filters-close').on('click', function(e){
		e.preventDefault();
		if ( $('.collection__filters').hasClass('opened') ) {
			$('.collection__filters').removeClass('opened');
			$('.filters-overlay-background').removeClass('show');
			$('body').removeClass('overflow-hidden');
		}
	});

	$('#collection-filters-handle').on('click', function(e){
		e.preventDefault()
		if ( ! $('.collection__filters').hasClass('opened') ) {
			$('.collection__filters').addClass('opened');
			$('.filters-overlay-background').addClass('show');
			$('body').addClass('overflow-hidden');
		}
	});

	$('.filters-overlay-background').on('click', function(e){
		$('.collection__filters-close').trigger('click');
	});

}

// Mount in page

$(document).ready(function(){
	if ( $('body').hasClass('template-collection') ) {
		KING.Collection.mountFilters();
	}
});

// Shopify events

$(document).on('shopify:section:load', function(e){

	var $section = $(e.target);
	if ( $section.find('.mount-collection-filters').length > 0 ) {
		KING.Collection.mountFilters();
	}

});

// Shopify events

$(document).on('shopify:section:load', function(e){
	window.reorderSections();
}).on('shopify:section:unload', function(e){
	window.reorderSections();
}).on('shopify:section:reorder', function(e){
	window.reorderSections();
});

$(document).ready(function(){

	var $body = $('body');
	
	$('.page-content, .page-section').fitVids({ ignore: '.product-gallery__item iframe' });

	// Input placeholder helpers
	
	$('input').each(function(){
		$(this).on('change', function(){
			if ( $(this).val() != '' ) {
				$(this).addClass('filled');
			} else {
				$(this).removeClass('filled');
			}
		})
	});

	// a11y tab helper

	 $body.keyup(function(e) {
	    var code = e.keyCode || e.which;
	    if (code == '9') {
	    	$body.addClass('tab-navigation');
	    }
	 }).on('click', function(e){
	 	if ( $body.hasClass('tab-navigation') ) {
	 		$body.removeClass('tab-navigation');
	 	}
	 });

});

$('input[type="search"]').attr('value', '');
$('form#contact_form').attr('autocomplete', 'off');

if ( !!window.MSInputMethodContext && !!document.documentMode ) {
	$('body').addClass('ie11');
	setTimeout(function(){
		$('.sidebar__cart-handle').off('click');
	}, 50);
} 