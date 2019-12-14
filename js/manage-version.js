
var versionUpdate = '0.1.13';

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