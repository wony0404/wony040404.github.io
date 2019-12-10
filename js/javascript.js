$(document).ready(function()
{	    
	applyMenubar();
	applyFooter();
	lastUpdated();

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

	if( $('#birth').length > 0 ){
		var myAge;
		var birth = new Date(Date.parse('1994 Sep 21 0:0:0 UTC')).getTime();
		setInterval(function(){
			myAge = new Number(new Date(new Date().getTime() - birth) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(10);
			$('#birth p').text(myAge);
		}, 100);
	}
});

$(window).load(function(){
	$('html').css('display', 'block');
	scrollSpy();
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
    y + " at " + h + ":" + (mm<10?"0"+mm:mm);
}

function lastUpdated(){
	if($('.current-time').length){
		var s  = "Unknown";
		var d1;
		if(0 != (d1=Date.parse(document.lastModified))) {
			s = "" + date_mmmddyyHHMM(new Date(d1));
		}
	  
		$('.current-time').text('Last updated on ' + s);
	}
}
function applyMenubar(){
	$('.menubar').html(
		"\
        <div class='left-menu'><a href='index.html'><img src = 'assets/icons/logo.png' style='width:55px;height:55px;position:relative;margin:0;padding:0;z-index:900;margin-top:0px'/></a></div>\
        <div class='right-menu'>\
            <img src='assets/icons/rightmenu-button.png' class='right-menu-button'/>\
            <div class='right-menu-dropmenu'>\
                <div><a href='about.html'>ABOUT</a></div>\
                <div><a href='resume.html'>RESUME</a></div>\
                <div><a href='posts.html'>POSTS</a></div>\
                <div><a href='contact.html'>CONTACT</a></div>\
            </div>\
            <div class='right-menu-menu'>\
                <div><a href='about.html'>ABOUT</a></div>\
                <div><a href='resume.html'>RESUME</a></div>\
                <div><a href='posts.html'>POSTS</a></div>\
                <div><a href='contact.html'>CONTACT</a></div>\
            </div>\
        </div>\
		"
    );
	$('.right-menu a').each(function(){
		if($(this).text() === section_name)
			$(this).addClass('this-page');
	});
}
function applyFooter(){
	$('footer').html(
		"\
        <div class='_overlay' style='background-color: rgba(24,24,30, 0.8)'></div>\
        <div class='_footer-line'>\
            <a href='mailto:jhyunp@snu.ac.kr'>jhyunp@snu.ac.kr</a>\
            <p>This is the beta version of my resume page.</p>\
            <p>You can see the codes on my github.</p>\
            <p>Version:"+versionUpdate+"</p>\
			<p>Last modified:"+document.lastModified+"</p>\
        </div>\
        <div class='_goto-top'><img src='assets/icons/arrow-up.png'/></div>\
		"
	);
}


function applyClickEvent()
{
	//Rightmenu button
	$('.right-menu-button').on('click', function(e){
		e.preventDefault();
		$('.right-menu-dropmenu').slideToggle(300);
		return false;
	});

	//Seemore in the header
	$('._see-more').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $('._contents').offset().top
		}, 600);
		return false;
	});

	//Gototop in the footer
	$('._goto-top').on('click', function(e){
		e.preventDefault();
		$('html, body').stop().animate({
			scrollTop: $('header').offset().top
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
			tmpActiveSection=nextActiveSection;
			nextActiveSection=$(this).attr('id')
			if(tmpActiveSection === activeSection)
				return false;
		});
		$('html, body').stop().animate({
			scrollTop: $('._track[id="' + nextActiveSection +'"]').offset().top
		}, 600);
	});

}

var prevActiveSection;
var activeSection;
var nextActiveSection;
var tmpActiveSection;
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
		activeSection = tmpActiveSection;
	}

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
		$('._nav-bar ._nav-menu .' + $('._contents ._track').attr('id')).addClass('_active');
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
	$('._thumbnail').each(function(){
		$(this).css({
			'min-height': (windowHeight) + 'px'
		});
	});
}


// function randomSentence(){
// 	if($('#random-sentence').length){
// 		var phrases = [
// 			"I have a pen, I have an apple.",
// 			"Hi, I am Jai Hyun Park.",
// 			"I am a student in Seoul-National-University",
// 			"I live in Seoul, Korea",
// 			"I love spending time on programming and playing piano",
// 			"My research interest is cryptography: HE and VC"
// 		];
// 		var fontSizes = [13, 13, 13, 15, 15, 15, 20, 20, 25, 25, 30, 30, 35, 35];
// 		phrases = phrases[Math.floor(Math.random() * phrases.length)].split(" ");
// 		for(var i in phrases){
// 			if(Math.random() > 0.5){
// 				phrases[i] = "<b style='font-size:" + fontSizes[Math.floor(Math.random() * fontSizes.length)] + "pt'>"+ phrases[i] + "</b>"
// 			}
// 		}
// 		phrases = phrases.join(" ");
// 		$('#random-sentence').html(phrases);
// 	}
// }

