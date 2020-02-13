$(window).on('load', function(){
	// ********** HEADER ***********
	$('#gnb .gnb-main > li > a:not(.none-after)').on('click',function(e){
		e.preventDefault();//링크 기능 막기
	});

	//드롭다운 메뉴 
	var $depth = $('#gnb .gnb-main > li, #gnb .gnb-sub-nav > li');
	var $dropBtn = $('#gnb .gnb-drop-menu button');
	var $utilLi = $('#gnb .gnb-sub .gnb-util > li');
	$depth.mouseenter(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	$depth.mouseleave(function(){
		$(this).removeClass('active');
		$(this).siblings().removeClass('active');
	});
	$dropBtn.on('click',function(){
		$(this).parents('li').removeClass('active');
	});

	$utilLi.mouseenter(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	$utilLi.mouseleave(function(){
		$(this).removeClass('active');
		$(this).siblings().removeClass('active');
	});


	// ********** HEADER MOBILE ***********
	var btnCommon = $('.mo-gnb-btn, .mo-close-btn');
	$(btnCommon).on('click', function(){
		if(!$('html').hasClass('mo-view')){
			$(btnCommon).addClass('view-active');
			$(btnCommon).removeClass('return-active');
		}else{
			$(btnCommon).removeClass('view-active');
			$(btnCommon).addClass('return-active');
		};
	});
	$('#gnb .mo-gnb-btn, .mo-gnb-shodow, .mo-close-btn').on('click', function(){
		$('html').toggleClass('mo-view');
		$('.mo-depth2').removeClass('active');
		$('.mo-depth2 > ul > li').removeClass('active');
		$('.mo-depth3').hide();
	});
	//mo-gnb-main, mo-gnb-sub 공통
	$('.mo-depth1 > li:has(.mo-depth2)').addClass('arrow');//mo-depth2가 있는 mo-depth1에 arrow 클래스 추가(css적용 용도)
	$('.mo-depth3').hide();//mo-depth3 감추기

	$('.mo-depth1 > li:has(.mo-depth2) > a').on('click', function(e){
		e.preventDefault(); //링크 기능 막기
		$(this).siblings('.mo-depth2').addClass('active');//depth2 보이기
		$(this).siblings('.mo-depth2').children('ul').children('li:has(.mo-depth3)').eq(0).children('.mo-depth3').delay(300).slideDown(300);//depth2안에 첫번째 .mo-depth3 펼치기
		$(this).siblings('.mo-depth2').children('ul').children('li:has(.mo-depth3)').eq(0).delay(300).addClass('active');//mo-depth3를 포함한 mo-depth2 첫번째 li이에 active클래스 추가
		$(this).parents('li').siblings().children('.mo-depth2').removeClass('active');//나머지 depth2에 있던 active클래스 삭제
		$(this).parents('li').siblings().children('.mo-depth2').children('ul').children('li').removeClass('active');//상위부모 li이의 형제 li 안에 mo-depth2 > ul > li에 있는 active 클래스 삭제
		$(this).parents('li').siblings().children('.mo-depth2').children('ul').children('li').children('.mo-depth3').hide();//본인을 제외한 나머지 mo-depth3 감추기
	});

	$('.mo-depth2 > ul > li:has(.mo-depth3)').prepend('<button type="button" class="arrow"></button');//mo-depth3를 포함한 상위 li에 버튼 소스코드 추가
	$('.mo-depth2 > ul > li .arrow').on('click',function(){
		$(this).siblings('.mo-depth3').slideToggle(300);//mo-depth3 보이기
		$(this).parents('li').siblings().children('.mo-depth3').slideUp(300);//본인을 제외한 나머지 상위 li의 자식 mo-depth3 감추기 
		$(this).parents('li').toggleClass('active');//상위 li에 active 클래스 추가
		$(this).parents('li').siblings().children('.arrow').parents('li').removeClass('active');//본인을 제외한 나머지 상위 li의 자식 arrow에 있던 active클래스 삭제
	});

	//mo-gnb-main
	$('.mo-gnb-main.mo-depth1 > li:has(.mo-depth2) > a').on('click', function(e){//mo-gnb-main에서 동작 시
		$('.mo-gnb-sub .mo-depth2').removeClass('active');//mo-gnb-sub에 있는 mo-depth2에 active클래스 삭제
		$('.mo-gnb-sub .mo-depth3').hide();//mo-gnb-sub에 있는 mo-depth3 감추기
	});

	//mo-gnb-sub
	$('.mo-gnb-sub.mo-depth1 > li:has(.mo-depth2) > a').on('click', function(e){//mo-gnb-sub에서 동작 시
		$('.mo-gnb-main .mo-depth2').removeClass('active');//mo-gnb-main에 있는 mo-depth2에 active클래스 삭제
		$('.mo-gnb-main .mo-depth3').hide();//mo-gnb-main에 있는 mo-depth3 감추기
	});


	// ********** FOTTER ***********
	$('.footer-top-btn, .go-top-btn').on('click', function(){
		$("html, body").animate({
            scrollTop:0
        },300);
        return false;
	});
	var selectMB = $('.select-menu > button');
	selectMB.on('click', function(){
		$(this).parents('.select-menu').toggleClass('view');//클릭 시 select-menu에 view클래스 추가/제거
		$(this).parents('.select-menu').siblings().removeClass('view');//본인 제외한 부모select-menu 의 형제에 있던 view클래스 제거
	});
	$(document).on('mouseup', function(e){
		if(!selectMB.has(e.target).lenght){//select-menu영역을 제외한 도큐먼트를 클릭했을 때
			$('.select-menu').removeClass('view');//view클래스 지우기
		};
	});


	// ********** FOOTER MOBILE ***********
	$('.mo-sitemap-btn').on('click', function(){
		$(this).parents('.sitemap-group').toggleClass('active');
		$(this).parents('.sitemap-group').siblings().removeClass('active');
		$(this).siblings('.sitemap-group-lst').slideToggle(300);
		$(this).parents('.sitemap-group').siblings().children('.sitemap-group-lst').slideUp(300)
	});


	// ********** COUNSELING FIXED ***********
	$('.counseling-view-btn').on('click', function(){
		$('#counseling-fixed').toggleClass('active');
	});
	$('.counseling-lst.chatbot a').on('mouseenter', function(){
		$(this).children('img').attr('src','images/icon/chatbot_message.gif');
	});
	$('.counseling-lst.chatbot a').on('mouseleave', function(){
		$(this).children('img').attr('src','images/icon/chatbot_normal.gif');
	});
	$('.counseling-lst.e-promoter a').on('mouseenter', function(){
		$(this).children('img').attr('src','images/icon/e-promoter_m_message.gif');
	});
	$('.counseling-lst.e-promoter a').on('mouseleave', function(){
		$(this).children('img').attr('src','images/icon/e-promoter_m_normal.gif');
	});
});


$(window).on('load resize', function(){
	//도큐먼트 사이즈가 768이하 일 때
	var $winW = $(window).width();
	if($winW <= 768){
		// ********** HEADER MOBILE ***********
		$('.mo-depth1 > li:has(.mo-depth2) > a').on('click',function(){
			$('.mo-back-btn').addClass('view');
		});
		$('.mo-back-btn').on('click', function(){
			$('.mo-back-btn').removeClass('view');
			$('.mo-depth2').removeClass('active');
			$('.mo-depth2 > ul > li').removeClass('active');
			$('.mo-depth3').hide();
		});

		// ********** FOOTER MOBILE ***********
		$('.sitemap-group-lst').hide();//sitemap-group-lst 감추기
	}else{
		// ********** FOOTER MOBILE ***********
		$('.sitemap-group').removeClass('active');//sitemap-group에 있던 active클래스 제거
		$('.sitemap-group-lst').show();//sitemap-group-lst 보이기
	};
});

$(window).on('resize', function(){//리사이즈 시
	var $winW = $(window).width();
	if($winW > 1280){
		// ********** HEADER MOBILE ***********
		$('.mo-gnb-btn-com').removeClass('view-active');
		$('.mo-gnb-btn-com').removeClass('return-active');
	};

	if($winW <= 768){//도큐먼트 사이즈가 768이하 일 때
		// window.location.reload(false);//새로고침(자연스러운 작동을 위해)
	};
});

$(window).on('load scroll', function(){
	var $scrollTop = $(window).scrollTop();
    var $wrapTop = $(".wrap").offset().top;
    var $doH = $(document).height();
    var $winH = $(window).height();
    var $fotH = $('#footer').height();
    var $gotopEnd = $doH-$winH-$fotH;
    // ********** GO TOP ***********
    if($scrollTop - 63 >= $wrapTop){
        $('#go-top').css('display','block');
    }else{
        $('#go-top').css('display','none');
    };
    if($scrollTop >= $gotopEnd){
		$('#go-top').css('display','none');
    };
});
