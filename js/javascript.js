var num_rows = 3;
var activeSection;

function loadMenubar() {
	$('.load-menubar').load('default.html #menubar', function(){
		//Color menu item of current page
		var paths = document.URL.split('/');
		paths = paths[paths.length - 1];
		$('.right-menu-menu a').each(function(){
			if($(this).attr('href') === paths)
				$(this).addClass('this-page');
		});
		$('.right-menu-dropmenu a').each(function(){
			if($(this).attr('href') === paths)
				$(this).addClass('this-page');
		});
	
		//Click Event: dropmenu-down
		$('.right-menu-button').on('click', function(e){
			e.preventDefault();
			$('.right-menu-dropmenu').slideToggle(300);
			return false;
		});
	});
}
function loadPostFooter() {
	//Click Event: go-to-top
	$('.load-post-footer').load('default.html #post-footer');
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

	that.find('.load-post-title').load(postPath +' #post-title');
	that.find('.load-post-publish').load(postPath +' #post-publish');
	that.find('.load-post-keywords').load(postPath +' #post-keywords');
	that.find('.load-post-abstract').load(postPath +' #post-abstract');
	that.find('.post-link').attr('href', postPath);

	that.find('.show-post-body').show();
	that.find('.load-post-body').hide();
	that.find('.load-post-body-after').hide();
	that.find('.load-post-body-after').find('.hide-post-body').on('click',function(){
		$(this).parent().parent().find('.load-post-body').hide();
		$(this).parent().parent().find('.show-post-body').show();
		$(this).parent().hide();
	});
	that.find('.show-post-body').on('click',function(){
		$(this).parent().find('.load-post-body').load(postPath + ' #post-body',function(){
			$(this).css({
				'border': '1px solid rgb(170,170,170)',				
				'padding': '20px',
				'border-radius': '10px',
				'margin-bottom': '30px'
			});
			$(this).find('*').each(function(){
				$(this).css({
					'font-size':'10pt',
					'margin-bottom':'0px',
					'margin-top':'0px',
					'padding-bottom':'0px',
					'padding-top':'0px'
				})
			});
			$(this).find('.post-subsection').each(function(){
				$(this).css({'margin-bottom':'30px'})
			});
			$(this).find('.post-section').children('h1').each(function(){
				$(this).css({'font-size':'12pt'})
			})
			$(this).find('._track').each(function(){
				$(this).removeClass('_track');
			})
			$(this).show();
		});
		$(this).parent().find('.load-post-body-after').show();
		$(this).hide();
	});
	// <p class='show-post-body'>..More</p>
	// <div class='load-post-body'></div>
	// <div class='show-post-body-after'>
	// 	<p class='hide-post-body'>Hide</p>
	// 	<a class='post-link'>Go to the post</a>
	// </div>

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


	$(window).load(function(){
		$('html').css('display', 'block');
		scrollSpy();
		lastUpdated();
	});

});



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
		if($('._nav-bar ._nav-menu').is(":visible")) {
			$('._nav-bar ._toggle').text($('._nav-bar ._nav-menu ._active').text());
			$('._nav-bar ._toggle').css("opacity", "1");
			$('._nav-bar ._toggle2').css("opacity", "1");
		} else {
			$('._nav-bar ._toggle').css("opacity", "0");
			$('._nav-bar ._toggle2').css("opacity", "0");
		}
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
		if($('._nav-bar ._toggle').length){
			$('._nav-bar ._toggle').text($('._nav-bar ._nav-menu ._active').text());
		}
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
	if($(window).width() < 1000 && $('._nav-bar ._nav-menu').length) {
		$('._nav-bar ._toggle').text($('._nav-bar ._nav-menu ._active').text());
		$('._nav-bar ._toggle').css("opacity", "1");
		$('._nav-bar ._toggle2').css("opacity", "1");
		$('._nav-bar ._nav-menu').hide();
	} else if ($('._nav-bar ._nav-menu').length) {
		activeSection = $('._contents ._track').attr('id');
		$('._nav-bar ._nav-menu .' + activeSection).addClass('_active');
	}
}

function resizeHeightNavigation()
{
	var count = 0;
	$('._nav-bar ._nav-menu li').each(function(){
		count ++;
	});
	var preferredHeight = (($(window).height() - 130) / count);
	$('._nav-bar ._nav-menu li').each(function(){
		$(this).css ({
			height: (preferredHeight) + 'px',
			'line-height': (preferredHeight) + 'px'
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
		$(this).each(function(){
			$(this).children('li').each(function(){
				loadPost($(this));
			})
		});
		refreshPostsList($(this),0,Math.floor(($(this).children('ul').children('li').length - 1) / num_rows) + 1);
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
