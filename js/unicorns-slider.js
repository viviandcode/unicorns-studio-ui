function unicrons_slider(slider_object,slider_time){
	//获取对象
	obj_slider = $(slider_object);
	//初始化变量
	var intervalObj = n = index_active = 0;
	//获取滚动数量
	var count = obj_slider.children('nav').children('.container').children('a').length;
	//slider到页面顶端距离
	var slider_offset_top = obj_slider.offset().top;
	//滚动内容高度	
	var slider_item_height = obj_slider.children('.slider').children('figure:first-child').outerHeight();

	//隐藏除第一个滚动项外的所有元素并添加状态class
	obj_slider.find('.slider figure:not(:first-child)').hide();
	obj_slider.find('nav a:first').addClass('selected');
	obj_slider.find('.slider figure:first').addClass('active').show();

	obj_slider.find('nav a').click(function(){
		//如果已经被选择则禁止点击
		if($(this).hasClass('selected')){
			return false;
		}else{
			obj_slider.find('nav a.selected').removeClass('selected');
			$(this).addClass('selected');
			//加"position:absolute;"，防止第一个figure闪动
			obj_slider.find('.slider figure.active').fadeOut().removeClass('active').css('position','absolute');
			obj_slider.find('.slider figure').eq($(this).index()).addClass('active').fadeIn();	
		}
	});

	//手势左右划
	obj_slider.swipe({
		swipeLeft:function(){
	    	index_active = obj_slider.children('nav').children('.container').children('a').index($('.selected'));
	    	n = index_active>=(count -1) ? 0 : ++index_active;
	    	obj_slider.find('nav a').eq(n).trigger('click');
		},
		swipeRight:function(){
	    	index_active = obj_slider.children('nav').children('.container').children('a').index($('.selected'));
	    	n = index_active<=0 ? 3 : --index_active;
	    	obj_slider.find('nav a').eq(n).trigger('click');
		},
		//手势上下划动防止上下划动不滚动
		swipeUp:function(event, direction, distance, duration, fingerCount) {
			$('html,body').animate(
				{
					scrollTop: slider_offset_top+distance
				},
				1000
			);
		},
		swipeDown:function(event, direction, distance, duration, fingerCount) {
			$('html,body').animate(
				{
					scrollTop: slider_offset_top-distance
				},
				1000
			);
		}
	});

	intervalObj = setInterval(showAuto,slider_time);

	//鼠标放上则停止循环
	obj_slider.hover(
		function(){
			clearInterval(intervalObj)
		},
		function(){
			intervalObj = setInterval(showAuto,slider_time);
		}
	);

	function showAuto(){
		index_active = obj_slider.children('nav').children('.container').children('a').index($('.selected'));
		n = index_active>=(count -1) ? 0 : ++index_active;
		obj_slider.find('nav a').eq(n).trigger('click');
	}
}