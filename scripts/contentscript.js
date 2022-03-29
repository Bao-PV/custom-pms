'use strict';

var link = document.createElement("link");
link.href = chrome.extension.getURL('styles/bss.css');
link.type = "text/css";
link.rel = "stylesheet";
(document.head || document.documentElement).appendChild(link);

var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/custom.js');
(document.head || document.documentElement).appendChild(s);
var detail = $('.bc-wrap-taskdetail >.bc-view-pp-left .bc-title-inner');


if (detail.length) {
    var status_task = '';
    detail.each(
        function (i, e) {
            if ($(e).parent().find('#update_status_task').length == 1) {
                status_task = $(e).parent()[0].innerHTML;
            
            }
        }
    );
    var
    html ='<div class="header-sticky"></div>'; //header-sticky
    var btnLogTime = '<div class="log_time"><button class="active btn-update-log-time"><span class="">Log Time</span></button></div>',
        detail  = '<div class="detail">'
            +'<input type="hidden" id="task-name">'
            +'<input type="hidden" id="task-key">'
            +'<div class="bc-bc-title name left"><p class="bc-title-inner name">' + $(detail[0]).parent().html() + '</p></div>'
            +'<div class="bc-bc-title key right"><p class="bc-title-inner key">' + $(detail[1]).parent().html() + '</p></div>'
            +'</div>'; //detail
    var btnDashBoard = '<a class="navbar-brand" href="http://pms.bssgroup.vn"><span>Bss PMS</span></a>';
    $('body').prepend(html);
    $('.header-sticky').prepend(btnLogTime);
    $('.header-sticky').prepend('<div class="status_task">' + status_task + '</div>');
    $('.header-sticky').prepend(detail);
    $('.header-sticky').prepend(btnDashBoard);
    $('.header-sticky .btn-update-log-time').click(
        function () {
            $('.btn.btn-update.log-time').trigger('click');
        }
    );
    $(".header-sticky .status_task #update_status_task").removeAttr('id').attr('id', 'header_status_task');

    //copy text
    var taskName = $('.header-sticky .bc-title-inner.name').text().replace('Name:  ', ''),
        taskKey  = $('.header-sticky .bc-title-inner.key').text().replace('Key:  ', '');
    $('.header-sticky .detail #task-name').text(taskName);
    $('.header-sticky .detail #task-key').text(taskKey);

    $('.header-sticky').append('<div class="notification"><span class="message"></span><button class="close"></div>');
    $('.header-sticky .detail .bc-bc-title.name').click(
        function () {
            copyToClipboard(".header-sticky .detail #task-name");
        }
    );
    $('.header-sticky .detail .bc-bc-title.key').click(
        function () {
            copyToClipboard(".header-sticky .detail #task-key");
        }
    );
    

    // function Update status task
    jQuery('#header_status_task').change(
        function () {
            var idtask = $('#submit_form_logtime [name="id_task"]').val();
            var status = jQuery(this).val();
            var ajaxurl= '/myproject/updatetaskboard/id/' + idtask + '/status/'+status;
            jQuery('body').append('<div id="wrapperfull_not_hide"></div>');
            jQuery('#wrapperfull_not_hide').fadeIn(300);
            jQuery('.loader').show();
            jQuery.ajax(
                {
                    type: "GET",
                    url: ajaxurl,
                    data: jQuery(this).serialize(),
                    success: function (data) {
                        if (data !="true") {
                            location.reload();
                        } else {
                            jQuery('.loader').hide();
                            if (status != '1' && status != '2' && status != '4' && status != '5' && status != '25') {
                                jQuery('.cancel').remove();
                                jQuery('.log-time-popup').fadeIn(100);
                            } else {
                                jQuery('#wrapperfull_not_hide').remove();
                                jQuery('.flash-message-success').slideDown(
                                    function () {
                                        setTimeout(
                                            function () {
                                                jQuery('.flash-message-success').slideUp();
                                            },
                                            2000
                                        );
                                    }
                                );
                                $('#update_status_task').attr("class",jQuery('#header_status_task').find('option:selected').attr("class"));
                                $('#header_status_task').attr("class",jQuery('#header_status_task').find('option:selected').attr("class"));
                            }
                        }
                    }
                }
            );
        }
    );
    //
    //

    //function coppy text
    function copyToClipboard(element)
    {
        var text = $(element).text().trim();
        if (text) {
            $('.header-sticky .notification .message').html('').html('Copied: <span>' + text + '</span>');
            $('.header-sticky .notification').addClass('active');
        }
        var temp = $("<input class='temp-input'>");
        $("body").append(temp);
        temp.val(text).select();
        document.execCommand("copy");
        temp.remove();
        setInterval(
            function () {
                $('.header-sticky .notification .message').html('');
                $('.header-sticky .notification').removeClass('active');
            },
            3000
        );
    }



    $(window).scroll(
        function () {
            if ($(window).scrollTop() > 200) {
                addSticky();
            } else {
                removeSticky();
            }
        }
    );

    function addSticky()
    {
        $('.header-sticky').addClass('active');
    }

    function removeSticky()
    {
        $('.header-sticky').removeClass('active');
    }
}
