var Module = {};
var Site = function(){};
Site.Instance = function(){
	if(Site._Instance == null){
		Site._Instance = new Site().init();
	}
	return Site._Instance;
};
var SiteNav = function(){};

(function($){
	$.extend(Module, {
		_init:function($mod){

			this.$module = $mod && $($mod);
			this.attachEvents();

			return this;
		},
		attachEvents : function(){},
		handleEvent : function(callback, prevDefault){
			var _this = this;
			var proxy = function(event){

				if(prevDefault != false){
					event.preventDefault();
				}

				var $el = $(event.target);
				var val = $el.data("val");

				callback.apply(_this, [$el, val, event]);
			};

			return proxy;
		}
	});
}(jQuery));


(function($){
	$.extend(Site.prototype, Module, {
		init : function(){
			this._siteNav = new SiteNav().init();

			return this._init();
		}
	});
}(jQuery));



(function($){
	var _FLYOUT_HEIGHT = 150;	
	var _ANIMATION_DURATION = 400;

	$.extend(SiteNav.prototype, Module, {
		init : function(){
			return this._init("#site-nav");
		},
		attachEvents : function(){
			this.$module.find("> ul").on("mouseenter", "li a", this.handleEvent(this.showPrimaryNav));
			this.$module.on("mouseleave", this.handleEvent(this.hidePrimaryNav))
		},
		showPrimaryNav : function($el, val, ev){

			var flyout = this.$module.find("div.flyout-box");
			flyout.find("section").addClass("hide");
			var activeSection = flyout.find("section." + val);
			activeSection.removeClass("hide");

			if(flyout.height() == _FLYOUT_HEIGHT)
				return;
			flyout.animate( { height: _FLYOUT_HEIGHT }, _ANIMATION_DURATION);	
		},
		hidePrimaryNav : function($el, val, ev){
			var flyout = this.$module.find("div.flyout-box");
			if(flyout.height() == _FLYOUT_HEIGHT)
				flyout.animate( { height: 0 }, _ANIMATION_DURATION);
		}
	});
}(jQuery));

(function($){
	Site.Instance();
}(jQuery));