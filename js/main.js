;(function($){

    $(window).bind('scroll',function(){
        var scrollTop = parseInt($(window).scrollTop());
        //改变头部
        scrollTop >= 80 ? 
        $(".nav-wrap").addClass('active') : $(".nav-wrap").removeClass('active');
    })

    //导航
    $(".nav a").on("click", function(){
        $(this).addClass("active").siblings().removeClass("active")
        var router =  $(this).attr("data-router"),
            targer = $("." + router).offset().top;
        document.title = $(this).html() + ' --- 容点设计';
        $("html,body").animate({
            scrollTop: targer - 60 + "px"
        }, 500);
    })


    var zeroize = function(num) {
        return num < 10 ? '0' + num : num;
    }

    var render = function(ele, catalog, data, showText, callback){
        var html = '';
        for(var i = 0; i < data.length; i++) {
            html += i % 3 === 0 ? (i === 0 ? '' : '</ul>') + '<ul>' : '';
            html += '<li class="pic-wrap" data-bigimages="' + data[i].pics + '" data-direct="' + (i+1) + '">';
            html +=    '<div class="pic-body">';
            html +=        '<img src="./case/' + catalog +'/' + (i+1) + '.jpg" alt="">';
            html +=        showText ? '<div class="description">' : '<div class="description" style="display: none">';
            html +=            '<h3>' + data[i].title + '</h3>';
            html +=            '<p>' + data[i].desc + '</p>';
            html +=         '</div>';
            html +=     '</div>';
            html += '</li>';
        }
        html += '</ul>';
        ele.html(html);
        callback();
    }
    render($('.showing') ,'1', showingData, true, function(){
        var show1 = new Zoom({
            direct: "./case/1/",
            element: ".showing"
        })
    })
    render($('.other') ,'2', otherData, false, function(){
        var show2 = new Zoom({
            direct: "./case/2/",
            element: ".other"
        })
    })
})(jQuery)