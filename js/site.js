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
			this.postInit();
			this.attachEvents();

			return this;
		},
		postInit : function(){},
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
			this.initialAnimation();

			return this;
		},
		postInit : function(){
			_primaryTabs = this.$module.find(".primary-tabs");
			_tabContent = this.$module.find(".tabcontent");
		},
		initialAnimation : function(){
			var navItems = _primaryTabs.find("a");
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
			_primaryTabs.on(
				"mouseenter", "li a", this.handleEvent(this.showPrimaryNav)
			).on("mouseleave", this.handleEvent(this.hidePrimaryNav));
			
			_tabContent.on("mouseenter", function(){window.clearTimeout(_timer);}
			).on("mouseleave", this.handleEvent(this.hidePrimaryNav));
	
		},
		showPrimaryNav : function($el, val, ev){
			
			window.clearTimeout(_timer);

			_tabContent.find("section").addClass("hide");
			_primaryTabs.find(".active").removeClass("active");
			$el.addClass("active");
			var activeSection = _tabContent.find("section." + val);
			activeSection.removeClass("hide");

			this.positionSubNav($el);
			//_tabContent.animate( { height: _DRAWER_HEIGHT }, _ANIMATION_DURATION);	
		},
		hidePrimaryNav : function($el, val, ev){
			
			_timer = window.setTimeout(function(){
					//_tabContent.animate( { height: 0 }, _ANIMATION_DURATION);
					_tabContent.find("section").addClass("hide");
					_primaryTabs.find(".active").removeClass("active");
			}, 500);			
		},
		positionSubNav : function($el){
			//if(!_positioned){
				var bb = $el.boundingBox();
				_tabContent.css({
					top: bb.bottom + 2,
					left: _primaryTabs.offset().left,
					width: _primaryTabs.width()
				});
				_positioned = true;
			//}
		}
	});
}(jQuery));

(function($){
	Site.Instance();
}(jQuery));