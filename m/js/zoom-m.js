/** 
 * 图片浏览f
 * V 1.1
 * By: Jeff Guo
 */

;(function($){

    function Zoom(opction){

        this.images = [];
        this.zoomWrap = $(".zoom");
        this.imgWrap = $(".zoom-show-wrap > img");
        this.imagesDirect = opction.direct || "./case/1/"; //目录
        this.eventElement = opction.element || "#zoom";
        this.direct = "";
        this.loading = $(".zoom-loading")
        this.now = 0;
        this.onload()

    }

    Zoom.prototype.onload = function(){

        var _this = this;

        //添加事件
        $(this.eventElement+ " > div").click(function(){
            _this.now = 0;
            _this.images = $(this).attr("data-bigimages").split(",");
            _this.direct = $(this).attr("data-direct");
                // console.log(images)
            if(_this.images && _this.direct){
                _this.zoomWrap.fadeIn();
                _this.changeImg(_this.direct, _this.now)
            }
        })

        //关闭
        $(".zoom-close,.zoom-mask").click(function(){
            _this.zoomWrap.hide();
            _this.imgWrap.attr('src', ""); 
        })

        //上一张
        $(".zoom-prev").click(function(){
            if(_this.now > 0){
                _this.now--;
                _this.changeImg(_this.direct)
            }
        })

        //下一张
        $(".zoom-next").click(function(){
            if(_this.now < _this.images.length-1) {
                _this.now++
                _this.changeImg(_this.direct);
            }
        })
    }

    /**
     * 切换图片
     */
    Zoom.prototype.changeImg = function(direct){
        if(direct){
            console.log(this.now,this.images.length)
            $('.zoom-navigation').html(this.now + 1 + '/' + this.images.length);
            var imgUrl = this.imagesDirect + direct + "/" + this.images[this.now], 
            _this = this;
            this.loading.fadeIn();
            setTimeout(function(){
                _this.imgWrap.attr('src', imgUrl); 
                _this.loading.fadeOut();
            },500)
            
        }
    }

    window.Zoom = Zoom;
    

})(jQuery)