'use strict';
var link = document.createElement("link");
link.href = chrome.extension.getURL('styles/bss.css');
link.type = "text/css";
link.rel = "stylesheet";
(document.head||document.documentElement).appendChild(link);

var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/custom.js');
(document.head||document.documentElement).appendChild(s);
var detail = $('.bc-wrap-taskdetail >.bc-view-pp-left .bc-title-inner');
var html ='<div class="header-sticky">';
html += '<div class="detail">';
html += '<p class="bc-title-inner name">' + $(detail[0]).parent().html() + '</p>';
html += '<p class="bc-title-inner key">' + $(detail[1]).parent().html() + '</p>';




html += '</div>'; //detail
html += '</div>'; //header-sticky
$('body').prepend(html);
$(window).scroll(function(){
    if($(window).scrollTop() > 200) {
        addSticky();
    }
    else {
        removeSticky();
    }
});

function addSticky() {
    $('.header-sticky').addClass('active');
}

function removeSticky() {
    $('.header-sticky').removeClass('active');
}