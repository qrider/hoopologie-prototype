

(function($){
	
	$.fn.boundingBox = function(){
		var $el = $(this);
		var offset = $el.offset();
		var h = $el.outerHeight();
		var w = $el.outerWidth();

		return $.extend({},{
			height: h,
			width: w,
			right: offset.left + w,
			bottom: offset.top + h
		}, offset);
	}

}(jQuery));