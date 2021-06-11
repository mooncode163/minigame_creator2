
//https://blog.csdn.net/pikefish/article/details/88895851
var AdBannerMooSnow = cc.Class({
    extends: cc.AdBannerPlatformWrapper,// cc.ItemInfo,
    properties: {
        bannerAd: null,
        width: 0,
        height: 0,
        objAd: null,
    },
    statics: {




    },

    /*
    {  
    source:"source"
    success: function (p,w,h) {
    },
    fail: function () {
    }, 
    }
    */
    InitAd(obj) {
        let winSize = wx.getSystemInfoSync();
        this.objAd = obj;
        console.log(winSize);
        let bannerHeight = 80;
        let bannerWidth = 300;
        this.height = bannerHeight;
        this.bannerAd = wx.createBannerAd({
            adUnitId: cc.AdInfo.ID_Banner, //填写广告id
            style: {
                left: (winSize.windowWidth - bannerWidth) / 2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth,
            }
        });

        this.bannerAd.onError((res) => {

        })

    },

    ShowAd(isShow) {
        // let winSize = wx.getSystemInfoSync(); 
        // this.bannerAd.show(); //banner 默认隐藏(hide) 要打开
        // //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        // this.bannerAd.onResize((res) => {
        //     this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight;

        //     // 屏幕单位
        //     this.width = this.bannerAd.style.realWidth*winSize.pixelRatio;
        //     this.height = this.bannerAd.style.realHeight*winSize.pixelRatio;

        //     if(this.objAd.success!=null)
        //     {
        //         this.objAd.success(this,this.width,this.height);
        //     }
        //  }) 


        console.log('moosnow ShowAd ')
        /**
 * 显示平台的banner广告
 * @param remoteOn 是否被后台开关控制 默认 true，误触的地方传 true  普通的地方传 false
 * @param callback 点击回调
 * @param horizontal banner的位置，默认底部
 * @param vertical banner的位置，默认底部
 * @param idIndex id顺序 -1 会随机
 * @param style 自定义样式
 */
        moosnow.platform.showBanner(false, (isOpend) => {
            //目前仅支持微信平台
            console.log('moosnow 用户是否点击了banner ', isOpend)
        }, moosnow.BANNER_HORIZONTAL.CENTER, moosnow.BANNER_VERTICAL.BOTTOM);

    },

    GetHeight() {
        return this.height;
    },
    SetScreenSize(w, h) {

    },
    //y 基于屏幕底部
    SetScreenOffset(x, y) {

    },
});

cc.AdBannerMooSnow = module.export = AdBannerMooSnow;
