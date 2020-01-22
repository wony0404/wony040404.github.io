var versionUpdate='0.1.21';
var num_rows = 5;
var activeSection;
var lang = 'eng';
var langs = ['eng','kor']
function loadMenubar() {
	$('.load-menubar').load('default.html #menubar', function(){
		//Color menu item of current page
		var paths = location.href.split('/');
		paths = paths[paths.length - 1].split('?')[0];
		$(this).find('.right-menu-menu a').each(function(){
			if($(this).attr('href') !== undefined)
				if($(this).attr('href').split('?')[0] === paths)
					$(this).addClass('this-page');
		});
		$(this).find('.right-menu-dropmenu a').each(function(){
			if($(this).attr('href') !== undefined)
				if($(this).attr('href').split('?')[0] === paths)
					$(this).addClass('this-page');
		});
		$(this).find('.lang-kor').each(function(){
			$(this).attr('href', location.href.split('?')[0] + '?lang=kor');
		});
		$(this).find('.lang-eng').each(function(){
			$(this).attr('href', location.href.split('?')[0] + '?lang=eng');
		});
		//Click Event: dropmenu-down
		$('.right-menu-button').on('click', function(e){
			e.preventDefault();
			$(this).parent().children('.right-menu-dropmenu').slideToggle(300);
			return false;
		});
		$(this).find('.logo-link').attr('href','.'+'?lang='+lang);
		show_lang($(this),lang);
	});
}
function loadPostFooter() {
	//Click Event: go-to-top
	$('.load-post-footer').load('default.html #post-footer',function(){show_lang($(this),lang)});
}
function loadFooter() {
	//Click Event: go-to-top
	$('.load-footer').load('default.html #footer', function(){
		lastUpdated();
		$('._goto-top').on('click', function(e){
			e.preventDefault();
			$('html, body').stop().animate({
				scrollTop: 0
			}, 600);
			return false;
		});
	});
}
function loadPost(that) {
	var postPath = that.attr('src');
	if(postPath === undefined)
		postPath = that.attr('id');

	that.find('.load-post-title').load(postPath +' #post-title', function(){show_lang($(this),lang)});
	that.find('.load-post-publish').load(postPath +' #post-publish');
	that.find('.load-post-keywords').load(postPath +' #post-keywords');
	that.find('.post-link').attr('href', postPath+'?lang='+lang);

	that.find('.show-post-abstract').show();
	that.find('.load-post-abstract').hide();
	that.find('.load-post-abstract-after').hide();
	that.find('.load-post-abstract-after').find('.hide-post-abstract').on('click',function(){
		$(this).parent().parent().find('.load-post-abstract').hide();
		$(this).parent().parent().find('.show-post-abstract').show();
		$(this).parent().hide();
	});
	that.find('.show-post-abstract').on('click',function(){
		$(this).parent().find('.load-post-abstract').load(postPath+' #post-abstract',function(){
			$(this).show();
			show_lang($(this),lang);
		});
		$(this).parent().find('.load-post-abstract-after').show();
		$(this).hide();
	});

	that.show();
}

// function loadPostsList() {
// 	$('.load-posts > .load-all-posts > li').each(function(){
// 		loadPost($(this));
// 	});
// }
function updateAge(){
	if( $('.update-birth').length > 0 ){
		var myAge;
		var birth = new Date(Date.parse('1994 Sep 21 0:0:0 UTC')).getTime();
		setInterval(function(){
			myAge = new Number(new Date(new Date().getTime() - birth) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(10);
			$('.update-birth p').text(myAge);
		}, 100);
	}
}
$(document).ready(function()
{	
	update_lang();

	loadMenubar();
	loadFooter();
	// loadHeader();
	loadPostFooter();
	updateAge();

	initializePostLists();
	listPostsClickEvents();



	applyClickEvent(); 

	mobile();
	heightNavigation();
	resizeHeightNavigation();
	
	$(window).on('scroll', function(){
		scrollSpy();
    });

	$(window).on('resize', function(){
		resizeHeightNavigation();
		scrollSpy();
		$('.right-menu-dropmenu').hide();
	});

	show_lang($(this),lang);

	$(window).load(function(){
		$('html').css('display', 'block');
		scrollSpy();
		lastUpdated();
	});

});

function update_lang(){
	temp = location.href.split(/[?&#]+/);
	for(var t in temp){
		if(t > 0) {
			data = temp[t].split('=');
			if(data[0] === 'lang')
				lang = data[1];
		}
	}
}

function show_lang(that,language){
	for(var l in langs){
		if(langs[l] === language){
			$(that).find('.'+langs[l]).each(function(){$(this).show()});
		} else {
			$(that).find('.'+langs[l]).each(function(){$(this).hide()});
		}
	};
	
}

function date_mmmddyyHHMM(date)
{
	var d = date.getDate();
	var m = date.getMonth() + 1;
	var y = date.getFullYear();
	var h = date.getHours();
	var mm = date.getMinutes();
	var mmm = 
		( 1==m)?'Jan':( 2==m)?'Feb':(3==m)?'Mar':
		( 4==m)?'Apr':( 5==m)?'May':(6==m)?'Jun':
		( 7==m)?'Jul':( 8==m)?'Aug':(9==m)?'Sep':
		(10==m)?'Oct':(11==m)?'Nov':'Dec';

	return "" +
    mmm + " " + (d<10?"0"+d:d) + ", " +
    y + " at " + (h<10?"0"+h:h) + ":" + (mm<10?"0"+mm:mm);
}

function lastUpdated(){
	if($('.update-time').length){
		var s  = "Unknown";
		var d1;
		if(0 != (d1=Date.parse(document.lastModified))) {
			s = "" + date_mmmddyyHHMM(new Date(d1));
		}
	  
		$('.update-time').text('Last updated on ' + s);
	}
	if($('.current-version').length){
		$('.current-version').text('Ver.' + versionUpdate);
	}
}


function applyClickEvent()
{
	
	//Seemore in the header
	$('._see-more').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $('._contents').offset().top
		}, 600);
		return false;
	});
	//Items in the navigation
	$('._nav-bar ._toggle').on('click', function(e){
		e.preventDefault();
		$('._nav-bar').each(function(){
			if($(this).children('._nav-menu').is(":visible")) {
				$(this).children('._toggle').text($(this).children('._nav-menu').find('._active').text());
				$(this).children('._toggle').css("opacity","1");
				$(this).children('._toggle2').css("opacity","1");
			} else {
				$(this).children('._toggle').css("opacity","0");
				$(this).children('._toggle2').css("opacity","0");
			}
		});
		$('._nav-bar ._nav-menu').slideToggle(400);
		return false;
	});
	$('._nav-bar ._nav-menu li').on('click', function(e) {
		e.preventDefault();
		if( $.attr(this, 'class').split(" ")[0].length > 0 ) {
			$('html, body').stop().animate({
				scrollTop: $('._track[id="' + $.attr(this, 'class').split(" ")[0] +'"]').offset().top
			}, 600);
		}
		return false;
	});

	//section up and down
	$('.section-up').on('click', function(e) {
		if($('._track[id="'+tmpActiveSection+'"]').offset().top - $(window).scrollTop() > -50){
			prevActiveSection=$('._track').attr('id');
			tmpActiveSection=$('._track').attr('id');
			$('._track').each(function(){
				prevActiveSection=tmpActiveSection;
				tmpActiveSection=$(this).attr('id');
				if(tmpActiveSection === activeSection)
					return false;
			});
		} else {
			prevActiveSection=activeSection;
		}
		
		$('html, body').stop().animate({
			scrollTop: $('._track[id="' + prevActiveSection +'"]').offset().top
		}, 600);
	});
	$('.section-down').on('click', function(e) {
		tmpActiveSection=$('._track').attr('id');
		nextActiveSection=$('._track').attr('id');
		$('._track').each(function(){
			if($(this).attr('id') === 'header')
				return true;
			tmpActiveSection=nextActiveSection;
			nextActiveSection=$(this).attr('id');
			if(tmpActiveSection === activeSection)
				return false;
		});
		$('html, body').stop().animate({
			scrollTop: $('._track[id="' + nextActiveSection +'"]').offset().top
		}, 600);
	});
	$('.section-top').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: 0
		}, 600);
		return false;
	});

}

function updateTmpActiveSection(){
	tmpActiveSection=$('._track').attr('id');
    $('._track').each(function(){
        if( ($(this).offset().top - $(window).scrollTop() ) < 120)
			tmpActiveSection=$(this).attr('id');
	});
}
function scrollSpy() 
{
	updateTmpActiveSection();
	if((activeSection !== tmpActiveSection) && (tmpActiveSection !== 'header') && (tmpActiveSection !== 'footer')){
		if($('._nav-bar ._nav-menu').length){
			$('._nav-bar ._nav-menu .' + activeSection).removeClass('_active');
			$('._nav-bar ._nav-menu .' + tmpActiveSection).addClass('_active');
		}
		$('._nav-bar').each(function(){
			$(this).find('._toggle').text($(this).find('._active').text());
		});
	}
	activeSection = tmpActiveSection;

	//Stick navigation
	if($(window).scrollTop() + 65 < $('header').height()) { //85=(5+45)+40
		$("._nav-bar").addClass('_nav-bar-collapse');
		$("._nav-bar").removeClass('_nav-bar-fix');
		$("._nav-bar").removeClass('_nav-bar-collapse2');
	
	} else if($(window).scrollTop() + 15 + $('._nav-bar').height() - 10 > $(document).height() - $('footer').height()) {
		$("._nav-bar").addClass('_nav-bar-collapse2');
		$("._nav-bar").removeClass('_nav-bar-fix');
		$("._nav-bar").removeClass('_nav-bar-collapse');
	} else {
		$("._nav-bar").addClass('_nav-bar-fix');
		$("._nav-bar").removeClass('_nav-bar-collapse');
		$("._nav-bar").removeClass('_nav-bar-collapse2');
	}

}

function mobile() {
	if($(window).width() < 1000) {
		$('._nav-bar').each(function(){
			$(this).children('._toggle').text($(this).find('._active').text());
			$(this).children('._toggle').css("opacity","1");
			$(this).children('._toggle2').css("opacity","1");
			$(this).children('._nav-menu').hide();
		});
	} else if ($('._nav-bar ._nav-menu').length) {
		activeSection = $('._contents ._track').attr('id');
		$('._nav-bar ._nav-menu .' + activeSection).addClass('_active');
	}
}

function resizeHeightNavigation()
{
	var preferedHeight = 0;
	$('._nav-bar ._nav-menu').each(function(){
		preferedHeight = (($(window).height() - 130) / $(this).find('li').length);
		$(this).find('li').each(function(){
			$(this).css ({
				height: (preferedHeight) + 'px',
				'line-height': (preferedHeight) + 'px'
			});
		});
	});
}
function heightNavigation()
{
	var windowHeight = $(window).height();
	$('.tall-header').each(function(){
		$(this).css({
			'min-height': (windowHeight) + 'px'
		});
	});
}


function initializePostLists() {
	$('.load-slice-posts').each(function(){
		refreshPostsList($(this),0,Math.floor(($(this).children('ul').children('li').length - 1) / num_rows) + 1);
	});

	$('.load-all-posts').each(function(){
		$(this).children('li').each(function(){
			loadPost($(this));
		})
	});

	// $('.load-recent-posts').each(function(){
	// 	$(this).load('/posts.html #all-posts > ul > li:lt(3)', function(){
	// 		$(this).find('li').each(function(){
	// 			loadPost($(this));
	// 		})
	// 	})
	// });
}

function listPostsClickEvents() {
	$('.load-slice-posts').each(function(){
		var pageCount = $(this).children('div').children('.number').text().split('/')[0] - 1;
		var numPages = $(this).children('div').children('.number').text().split('/')[1] - 0;
		$(this).children('div').children('.first').on('click',function(){
			pageCount=0;
			refreshPostsList($(this).parent().parent(), pageCount, numPages);
		});
		$(this).children('div').children('.last').on('click',function(){
			pageCount = numPages - 1;
			refreshPostsList($(this).parent().parent(), pageCount, numPages);
		});
		$(this).children('div').children('.prev').on('click',function(){
			if(pageCount === 0)
				return false;
			pageCount --;
			refreshPostsList($(this).parent().parent(), pageCount, numPages);
		});
		$(this).children('div').children('.next').on('click',function(){
			if(pageCount === numPages - 1)
				return false;
			pageCount ++;
			refreshPostsList($(this).parent().parent(), pageCount, numPages);
		});
	});
}

function refreshPostsList(that, pageCount, numPages) {
	var count = 0;
	that.children('ul').children('li').each(function(){
		if((count < (pageCount + 1) * num_rows) && (count >= pageCount * num_rows)){
			$(this).css('border-top', '1pt dashed rgba(200,200,200,0.8)');
			if((count === pageCount * num_rows) && (!$(this).parents().hasClass('grid-3-1-ul'))){
				$(this).css('border-top', 'none');
			}
			loadPost($(this));
			$(this).show();
		}else{
			$(this).hide();
		}
		count ++;
	});
	that.children('div').children('.number').text((pageCount + 1) + '/' + numPages);
}

// function loadHeader(){
// 	$('.load-header').each(function(){
// 		$(this).load($(this).attr('src') + ' #header', function(){
// 			$(this).find('.tall-header').css({
// 				'height':'150px',
// 				'position':'absolute',
// 				'bottom':'0'
// 			});
// 			$(this).find('._profile').children('p').hide();
// 			$(this).find('._profile').css({'position':'absolute','bottom':'30px','padding-bottom':'0px'});
// 		});
// 	});
// }
