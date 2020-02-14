$(window).on('load', function(){
	// ********** PROMOTION BANNER ***********
	$('#promotion-banner button').on('click', function(){
		$('#promotion-banner').hide();//버튼 클릭하면 배너 사라짐
	});


	// ********** MAIN VISUAL SLIDER ***********
	//슬라이더
	var $sw = true;
  $('#m-v-slide .container').slick({
  	arrows: true,
  	dots: true,
  	autoplay: true,
  	autoplaySpeed: 4000,
  	swipe: true,
  	slide: '.slider',
    fade: true,
    pauseOnHover: false,
    pauseOnFocus: false
  });
    
  //슬라이더 컨트롤러
  $('#m-v-slide .slick-dots li').each(function(index) {
      var progress = '<div class="slick-progress"></div>';
      $(this).children('button').append().html(progress);//#m-v-slide .slick-dots li button안에 progress내용 추가
  });
 
  //slick pause, play
  $('#m-v-slide .play_stop_btn').click(function(){
  	if($sw == true){
      $(this).addClass('on');
   		$('#m-v-slide .container').slick('slickPause');//플레이 중에 버튼 누르면 정지
      $('#m-v-slide .slick-active .slick-progress').animate().stop(true);//.slick-progress에 진행중이던 애니메이트 중지
    }else{
   		$(this).removeClass('on');
   		$('#m-v-slide .container').slick('slickPlay');
      $('#m-v-slide .slick-active .slick-progress').animate({//.slick-progress에 중지되었던 애니메이트 다시 시작
        width: '100%'
      }, 4300);
  	};
  	$sw = !$sw;
  });

  $('#slick-slide-control00').children('.slick-progress').stop().animate({//로드된 후 #slick-slide-control00 .slick-progress에 애니메이션 시작
      width: '100%'
    }, 4300);
  //starwars 슬라이더 페이지 css 변화, slick-dots 애니메이트
  $('#m-v-slide .container').on('beforeChange', function(event, slick, currentSlide, i){
    // if(i == 2){//인덱스가 2인 슬라이드가 active되었을 때
    //   $('#m-v-slide').addClass('white');
    // }else{
    //   $('#m-v-slide').removeClass('white');
    // };

    var $bar = $('.slick-progress');
    if($('#m-v-slide .play_stop_btn').hasClass('on') == true){//.play_stop_btn에 on클래스가 있으면
      $('#slick-slide-control0'+i).parents('li').siblings().children('button').children($bar).stop().css({//선택된 컨트롤러를 제외한 형제들안에 있는 slick-progress의 width:0
        width: '0'
      });
    }else{
      $('#slick-slide-control0'+i).children($bar).stop().animate({//active된 슬라이더와 인덱스가 같은 컨트롤러의 자식 slick-progress 애니메이트 실행
        width: '100%'
      }, 4300);
      $('#slick-slide-control0'+i).parents('li').siblings().children('button').children($bar).stop().css({//선택된 컨트롤러를 제외한 형제들안에 있는 slick-progress의 width:0
        width: '0'
      });
    };
  });



  // ********** MAIN EXPLORE ***********
  var $team_slider = $('#m-explore ul')
  var team_slider_settings = {
    arrows: false,
    dots: true,
    autoplay: false,
    swipe: true,
    slide: 'li',
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 99999,
        settings: "unslick"
      },{
        breakpoint: 768,//윈도우 폭이 768이하일 때 부터 슬랙 적용
        settings: {
          slidesToShow: 1,
        }
      }
    ]          
  };

  $team_slider.slick(team_slider_settings);

  $(window).on('resize', function() {
    if(!$team_slider.hasClass('slick-initialized')) {
      return $team_slider.slick(team_slider_settings);
    }
  });



  // ********** MAIN RECOMMENDATION ***********
  $('#m-recommendation .container').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: false,
    swipe: false,
    slide: '.slider',
    speed: 800,
    pauseOnHover:false,
    adaptiveHeight: true,
    infinite: false,
    customPaging:function(slider, i){
      switch(i){
        case 0: i = '새로운 갤럭시';break;
        case 1: i = '특별한 혜택';break;
        case 2: i = '추천 제품';break;
        case 3: i = '가족과 함께';break;
        case 4: i = '특별한 한 해';
      }
      return '<span class="dot">'+i+'</span>';
    },
  });

  $('#m-recommendation .slick-dots').wrap('<div class="slick-dots-wrap"></div>');//모바일에서 스크롤 메뉴 구현을 위해 추가
  $('#m-recommendation .slider .grid .grid-inner .prod').wrap('<div class="prod-mo-wrap"></div>');//PC와 다른 모바일 레이아웃 구성을 위해 추가

  $("#m-recommendation .slick-dots li").on("click", function(){
    $("#m-recommendation .slick-dots li").removeClass("active");
    $(this).addClass("active");
    //scrollCenter plugin
    $("#m-recommendation .slick-dots-wrap").scrollCenter(".active", 300);
  });

  jQuery.fn.scrollCenter = function(elem, speed) {
    var active = jQuery(this).find(elem);
    var activeWidth = active.width() / 2;
    var pos = active.position().left + activeWidth;
    var elpos = jQuery(this).scrollLeft();
    var elW = jQuery(this).width(); 

    pos = pos + elpos - elW / 2;

    jQuery(this).animate({
      scrollLeft: pos
    }, speed == undefined ? 1000 : speed);
    return this;
  };
  


  // ********** MAIN STORY ***********
  $('.slick-show-img').slick({
    slide: '.slider',
    speed: 800,
    centerMode: true,
    swipe: false,
    variableWidth: true,
    centerPadding: '60px',
    slidesToShow: 3,
    adaptiveHeight: true,
    asNavFor: '.slick-show-txt',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          variableWidth: false,
          centerMode: false,
          slidesToShow: 1,
          centerPadding: '0',
        }
      }
    ]
  });
  $('.slick-show-txt').slick({
    slide: '.slider',
    speed: 800,
    centerMode: true,
    swipe: false,
    slidesToShow: 1,
    adaptiveHeight: true,
    fade: true,
    dots: true,
    arrows: false,
    asNavFor: '.slick-show-img'
  });

  $('.slick-show-txt').addClass('fixed-animate');//로드 후 fixed-animate클래스를 넣고 
  $('#m-story .slick-show-txt .slick-dots li button, #m-story .slick-arrow').on('click', function(){//클릭 시 
    $('.slick-show-txt').removeClass('fixed-animate');//클래스 제거
  });


  //********** MAIN SEARCH **********//
  $('#m-search form input, #m-search .srch-history').on('click', function(){//input에 포커스되면
    $('#m-search').addClass('show');
  });

  $('#m-search .srch-history .history-delete-btn').on('click', function(){//히스토리 삭제
    $('#m-search .srch-history .history-lst ul li a').remove();
  });

  $(document).on('mouseup', function(e){
    if(!$('#m-search form input, #m-search .srch-history').has(e.target).lenght){//#m-search form input, #m-search .srch-history영역을 제외한 도큐먼트를 클릭했을 때
      $('#m-search').removeClass('show');
    };
  });
});



//********** SCROLL EFFECT **********//
$(window).on('load scroll', function(){
  var $scrollTop = $(window).scrollTop();
  var $wrapTop = $(".wrap").offset().top;
  var $doH = $(document).height();
  var $winH = $(window).height();
  var $fotH = $('#footer').height();
  var $notifyH = $('#m-notify').height();
  var $srchH = $('#m-search').height();
  var $storyH = $('#m-story').height();
  var $recomH = $('#m-recommendation').height();
  var $exploreH = $('#m-explore').height();
  var $slideH = $('#m-v-slide').height();

  var $noEffectSec = $doH-$winH-$fotH-$notifyH-$srchH;
  var $storyEnd = $noEffectSec-$storyH;
  var $recomEnd = $storyEnd-$recomH;
  var $explorEnd = $recomEnd-$exploreH;
  console.log($recomH/2);

  if($scrollTop >= $storyEnd){
    $('#m-story').addClass('effect');
  }else{
    $('#m-story').removeClass('effect');
  };

  if($scrollTop >= $recomEnd){
    $('#m-recommendation').addClass('effect');
  }else{
    $('#m-recommendation').removeClass('effect');
  };

  if($scrollTop >= $explorEnd){
    $('#m-explore').addClass('effect');
  }else{
    $('#m-explore').removeClass('effect');
  };
});
