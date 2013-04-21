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
	var _DRAWER_HEIGHT = 162;
	var _ANIMATION_DURATION = 200;
	var _MAINOFFSET = 112;
	var _drawer = $("section.drawer .drawer-container");	
	var _main = $("div.main");
	var _header = $("section.header");
	var _timer;

	$.extend(SiteNav.prototype, Module, {
		init : function(){
			this._init("#site-nav");
			this.initialAnimation();
			return this;
		},
		initialAnimation : function(){
			var navItems = this.$module.find("a");
			var end = navItems.length - 1;
			var count = 0;
			var timer = window.setInterval(function(){
				var item = $(navItems[count]);
				item.addClass("active");


				if(count == end){
					window.clearTimeout(timer);
					//handle last item
					timer = window.setTimeout(function(){
						navItems.removeClass("active");
					}, _ANIMATION_DURATION)
				}
				count++;
			}, _ANIMATION_DURATION)
		},
		attachEvents : function(){
			this.$module.find("> ul").on(
				"mouseenter", "li a", this.handleEvent(this.showPrimaryNav)
			).on("mouseleave", this.handleEvent(this.hidePrimaryNav));

			_drawer.on("mouseenter", function(){window.clearTimeout(_timer);}
			).on("mouseleave", this.handleEvent(this.hidePrimaryNav));
		},
		showPrimaryNav : function($el, val, ev){
			/*
			window.clearTimeout(_timer);

			_drawer.find("section").addClass("hide");
			var activeSection = _drawer.find("section." + val);
			activeSection.removeClass("hide");

			if(_drawer.height() == _DRAWER_HEIGHT)
				return;
			_drawer.animate( { height: _DRAWER_HEIGHT }, _ANIMATION_DURATION);	
			_main.animate({top: _DRAWER_HEIGHT + _MAINOFFSET}, _ANIMATION_DURATION);

			*/
		},
		hidePrimaryNav : function($el, val, ev){
			/*
			_timer = window.setTimeout(function(){
				if(_drawer.height() == _DRAWER_HEIGHT){
					_drawer.animate( { height: 0 }, _ANIMATION_DURATION);
					_main.animate({top:_MAINOFFSET}, _ANIMATION_DURATION);
					_drawer.find("section").addClass("hide");
				}
			}, 500);
			*/
		}
	});
}(jQuery));

(function($){
	Site.Instance();
}(jQuery));