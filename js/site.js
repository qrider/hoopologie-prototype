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

				var $el = $(event.currentTarget);
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
	_MAINOFFSET = 200,
	_primaryTabs,
	_flyout,
	_tabContent,
	_timer,
	_positioned;

	$.extend(SiteNav.prototype, Module, {
		init : function(){
			this._init("#primary-nav");
			return this;
		},
		primeCache : function(){
			_primaryTabs = this.$module.find(".header-btn-group > .btn-group a");		
			_flyout = this.$module.find(".primary-flyout");
		},
		attachEvents : function(){
			this.$module
				.on("mouseenter", ".header-btn-group > .btn-group a", this.handleEvent(this.showPrimaryFlyout))
				.on("mouseleave", ".header-btn-group > .btn-group a", this.handleEvent(this.hidePrimaryFlyout))
				.on("mouseenter", ".primary-flyout", this.handleEvent(this.clearTimeout))
				.on("mouseleave", ".primary-flyout", this.handleEvent(this.hidePrimaryFlyout))
				.on("mouseenter", ".catalog-content a", this.handleEvent(this.showCatalogPane))				
		},
		showPrimaryFlyout : function($el, val, ev){			
			//console.log($el);
			this.clearTimeout();

			//reset
			_flyout.find(".nav-content").hide();
			_flyout.find(".section-content").hide();
			_flyout.width("auto");
			_primaryTabs.filter(".hover").removeClass("hover");

			$el.addClass("hover");
			_flyout.show();
			_flyout.find("." + val + "-content").show();
			var bb = $el.boundingBox();

			if(bb.left + _flyout.outerWidth() > $(window).width() - _MAINOFFSET){
				_flyout.css({
					left: bb.right - _flyout.outerWidth(),
					top: bb.bottom
				});

			}else{
				//console.log(bb);
				_flyout.css({
					left: bb.left,
					top: bb.bottom
				});
			}
			//debugger;

			

			/*
			_tabContent.find("section").addClass("hide");
			$el.addClass("active");
			var activeSection = _tabContent.find("section." + val);
			activeSection.removeClass("hide");

			this.positionSubNav($el);
			*/
			//_tabContent.animate( { height: _DRAWER_HEIGHT }, _ANIMATION_DURATION);	
		},
		clearTimeout : function(){
			window.clearTimeout(_timer);
		},
		hidePrimaryFlyout : function($el, val, ev){
			
			_timer = window.setTimeout(function(){
					_flyout.find(".nav-content").hide();
					_flyout.find(".section-content").hide();
					_flyout.hide();
					_flyout.width("auto");
					//_tabContent.animate( { height: 0 }, _ANIMATION_DURATION);
					//_tabContent.find("section").addClass("hide");
					_primaryTabs.filter(".hover").removeClass("hover");
			}, 400);	
					
		},
		showCatalogPane : function($el, val, e){

			var _currentWidth = _flyout.width();
			var _targetWidth = $el.data("width");
			_flyout.find(".nav-content").hide();
			_flyout.find("." + val + "_nav-content").show();
			debugger;
			if(_currentWidth != _targetWidth){
				_flyout.animate({
					width: _targetWidth
				}, 200);
			}

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