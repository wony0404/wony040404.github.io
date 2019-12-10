var versionUpdate = '0.1.8';

var jsscript = document.createElement('script');
jsscript.src = 'js/javascript.js?v=' + versionUpdate;
document.body.appendChild(jsscript);

var cssscript = document.createElement('link');
cssscript.rel = 'stylesheet';
cssscript.href = 'css/style.css?v=' + versionUpdate;
document.head.appendChild(cssscript);
var iconscript = document.createElement('link');
iconscript.rel = 'shortcut icon';
iconscript.href = 'assets/icons/logo-fill.png?v=' + versionUpdate;
iconscript.type = 'image/x-icon';
document.head.appendChild(iconscript);

applyMenubar();
applyFooter();

function applyMenubar(){
	$('.menubar').html(
		"\
        <div class='left-menu'><a href='index.html'><img src = 'assets/icons/logo.png' style='width:55px;height:55px;position:relative;margin:0;padding:0;z-index:900;margin-top:0px'/></a></div>\
        <div class='right-menu'>\
            <img src='data/rightmenu-button.png' class='right-menu-button'/>\
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
	var last_modified = document.lastModified
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
