//menu_object: 菜单#id或.class
//menu_top: 菜单到顶部的偏移量
//menu_anchors: 锚点#id数组集
//menu_anchor_offset: 区域识别偏移量
//menu_class_active: 链接激活class
function unicorns_menu(menu_object,menu_top,menu_anchors,menu_anchor_offset,menu_class_active){
	//获取菜单对象
	var obj_menu = $(menu_object);
	var menu_top_offset = menu_top;
	//菜单到顶部的原始距离
	var menu_origin_top = obj_menu.offset().top;
	//菜单的高度
	var menu_height = obj_menu.outerHeight();
	//滚动高度
	var scroll_top = 0;
	//菜单实时滚动高度
	var menu_top = 0;
	//页面初始滚动高度
	var begin_scroll_top = $(document).scrollTop();
	//传入的锚点数组
	var anchors = menu_anchors;
	//传入的锚点偏移余度
	var anchor_offset = menu_anchor_offset;
	//传入的菜单激活状态class
	var class_active = menu_class_active;
	//创建锚点数据存储数组
	var parts = [];

	//初始化菜单
	init();
	//锚点位置对应激活菜单
	anchors_active();
	//滚动事件
	menu_scroll();

	$(window).resize(function(){
		var menu_origin_top = obj_menu.offset().top;
		//菜单的高度
		var menu_height = obj_menu.outerHeight();
		//页面初始滚动高度
		var begin_scroll_top = $(document).scrollTop();

		//初始化菜单
		init();
		//锚点位置对应激活菜单
		anchors_active();
		//滚动事件
		menu_scroll();
	});

	//平滑滚动
	smooth_scroll();

	//初始化菜单
	function init(){
		//如果菜单没有被div.unicorns-menu-wrap包裹，则添加
		if(!obj_menu.parent().hasClass('unicorns-menu-wrap')){
			obj_menu.wrap('<div class=\"unicorns-menu-wrap\" style=\"height:'+menu_height+'px;position:relative;z-index:999;\"></div>');
		}
		//防止刷新后失去焦点
		if(begin_scroll_top > menu_origin_top){
			obj_menu.attr('style','position:fixed;top:'+menu_top_offset+'px;');
		}
	}
	//锚点位置对应激活菜单
	function anchors_active(){
		for(var i =  0; i < anchors.length; i++){
			part_obj = $("#"+anchors[i])
			part_top = part_obj.offset().top;
			part_height = part_obj.outerHeight();
			parts.push([part_top,part_height]);
		};
		//防止刷新后失去焦点
		for(var i =  0; i < parts.length; i++){
			if(begin_scroll_top  >= (parts[i][0]-anchor_offset) && begin_scroll_top  <= (parts[i][0]+parts[i][1]-anchor_offset)){
				obj_menu.children("a:eq("+i+")").addClass(class_active);
			}
		};
	}
	//滚动事件
	function menu_scroll(){
		$(window.document).scroll(function(){
			//菜单状态
			scroll_top = $(this).scrollTop();
			menu_top = obj_menu.offset().top;
			if(scroll_top > menu_origin_top){
				obj_menu.attr('style','position:fixed;top:'+menu_top_offset+'px;');
			}else{
				obj_menu.removeAttr("style");
			}
			//锚点激活菜单
			for(var i =  0; i < parts.length; i++){
				if(scroll_top  >= (parts[i][0]-anchor_offset) && scroll_top  <= (parts[i][0]+parts[i][1]-anchor_offset)){
					obj_menu.children('a:eq('+i+')').addClass(class_active);
				}else{
					obj_menu.children('a:eq('+i+')').removeClass(class_active);
				}
			};
		});
	}
	//平滑滚动
	function smooth_scroll(){
		$('a[href*=#],area[href*=#]').click(function() {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var $target = $(this.hash);
				$target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
				if ($target.length) {
					//偏移减去菜单高度
					var targetOffset = $target.offset().top-menu_height;
					$('html,body').animate(
						{
							scrollTop: targetOffset
						},
						1000
					);
					return false;
				}
			}
		});
	}
}