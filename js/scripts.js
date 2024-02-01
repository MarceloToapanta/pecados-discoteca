include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/forms.js");
include("js/MathUtils.js");
include("js/jquery.cycle.all.min.js");
include("js/gallery.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = true, content, mh, h;

function addAllListeners() {
    $('.list1>li>a, .list5>li>a').hover(
        function(){
        	$('span',this).stop().animate({'width':'100%'},800,'easeOutElastic');  
        },
        function(){
            $('span',this).stop().animate({'width':'0'},600,'easeOutCubic');  
        }
    ); 
    var val2 = $('.readMore').css('color')
    $('.readMore').hover(
        function(){
        	$(this).stop().animate({'color':'#23160b'},300,'easeOutExpo');  
        },
        function(){
            $(this).stop().animate({'color':val2},600,'easeOutCubic');  
        }
    ); 
	$('.list2>li>a, .list3>li>a')
    .find('strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},700,'easeOutElastic');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('strong').stop().hide();
            }            
        }
    );
    $('.prev').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
    $('.next').hover(
        function(){
            $(this).stop().animate({'backgroundPosition':'left center'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );  
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);

function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
}

function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    $('.spinner').fadeOut();
    
    if (MSIE) {
        $('#menu').addClass('ie');
    }
    
    $("#galleryHolder").gallerySplash();
    
	$('.list2>li>a, .list3>li>a').prepend('<span class="sitem_over"><strong></strong></span>')
    $('.list2>li>a, .list3>li>a').fancybox({
        'transitionIn': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    });
    
    if ($(".slider").length) {
        $('.slider').cycle({
            fx: 'scrollHorz',
            speed: 800,
    		timeout: 0,
            next: '.next',
    		prev: '.prev',                
    		easing: 'easeOutExpo',
    		cleartypeNoBg: true ,
            rev:0,
            startingSlide: 0,
            wrap: true
  		})
    };
    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'display':'none'});		
        },
        actFu:function(_){            
            if(_.curr){
                
                h = parseInt( _.curr.outerHeight(true));
                content.children('ul').css({'height':h});
                $(window).trigger('resize');
                
                _.curr
                    .css({'top':'-1500px','display':'block'}).stop(true).delay(400).show().animate({'top':'0'},{duration:1200,easing:'easeOutElastic'});
            }   
    		if(_.prev){
  		        _.prev
                    .show().stop(true).animate({'top':'-1500px'},{duration:400,easing:'easeInOutExpo',complete:function(h){
                            if (_.prev){
                                _.prev.css({'display':'none'});
                            }
                        }
		              });
            }            
  		}
    });
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
            $('>a>strong',li).css('left','0').stop().animate({'width':'100%','left':'0'},800,'easeOutElastic');
        },
        hoverOut:function(li){
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('>a>strong',li).stop().animate({'width':'0','left':'100%'},600,'easeOutCubic');
            }
        }
    })
    .navs(function(n,_){
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
        
    setTimeout(function(){
        $('body').css({'overflow':'visible'});
        $(window).trigger('resize');    
    },300); 
    
    addAllListeners();
    
    mh = parseInt($('body').css('minHeight'));
}

$(window).resize(function (){
    if (content) {
        var newMh = mh*h/527;
        if (newMh < mh) {newMh = mh;}
        $('body').css({'minHeight': newMh})
        content
            .stop().animate({'top':(windowH()-h)*.5,'height':h},500,'easeOutCubic')
            .css('overflow','visible')
    }
});