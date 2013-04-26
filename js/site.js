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
			this.primeCache();
			this.attachEvents();

			return this;
		},
		primeCache : function(){},
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
	var _DRAWER_HEIGHT = 162,
	_ANIMATION_DURATION = 200,
	_MAINOFFSET = 112,
	_primaryTabs,
	_tabContent,
	_timer,
	_positioned;

	$.extend(SiteNav.prototype, Module, {
		init : function(){
			this._init("#primary-nav");
			return this;
		},
		primeCache : function(){
			//_primaryTabs = this.$module.find(".header-btn-group a");			
		},
		attachEvents : function(){
			this.$module
				.on("mouseenter", ".header-btn-group a", this.handleEvent(this.showPrimaryFlyout))
				.on("mouseleave", ".header-btn-group a", this.handleEvent(this.hidePrimaryFlyout));	
		},
		showPrimaryNav : function($el, val, ev){
			
			/*
			window.clearTimeout(_timer);

			_tabContent.find("section").addClass("hide");
			_primaryTabs.find(".active").removeClass("active");
			$el.addClass("active");
			var activeSection = _tabContent.find("section." + val);
			activeSection.removeClass("hide");

			this.positionSubNav($el);
			*/
			//_tabContent.animate( { height: _DRAWER_HEIGHT }, _ANIMATION_DURATION);	
		},
		hidePrimaryNav : function($el, val, ev){
			/*
			_timer = window.setTimeout(function(){
					//_tabContent.animate( { height: 0 }, _ANIMATION_DURATION);
					_tabContent.find("section").addClass("hide");
					_primaryTabs.find(".active").removeClass("active");
			}, 500);	
			*/		
		},
		positionSubNav : function($el){
			//if(!_positioned){
				var bb = $el.boundingBox();
				_tabContent.css({
					top: bb.bottom + 2,
					left: bb.left
				});
				_positioned = true;
			//}
		}
	});
}(jQuery));

(function($){
	Site.Instance();
}(jQuery));