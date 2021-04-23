
//https://blog.csdn.net/pikefish/article/details/88895851
var AdBannerWeiXin = cc.Class({
    extends: cc.AdBannerPlatformWrapper,// cc.ItemInfo,
    properties: {
        bannerAd:null,
        width:0,
        height:0,
        objAd:null,
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
                left: (winSize.windowWidth-bannerWidth)/2,
                top: winSize.windowHeight - bannerHeight,
                width: bannerWidth,
            }
        });

        this.bannerAd.onError((res) => {
        
         }) 
           
    },

    ShowAd(isShow) {
        let winSize = wx.getSystemInfoSync(); 
        this.bannerAd.show(); //banner 默认隐藏(hide) 要打开
        //微信缩放后得到banner的真实高度，从新设置banner的top 属性
        this.bannerAd.onResize((res) => {
            this.bannerAd.style.top = winSize.windowHeight - this.bannerAd.style.realHeight;

            // 屏幕单位
            this.width = this.bannerAd.style.realWidth*winSize.pixelRatio;
            this.height = this.bannerAd.style.realHeight*winSize.pixelRatio;
            
            if(this.objAd.success!=null)
            {
                this.objAd.success(this,this.width,this.height);
            }
         }) 
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

cc.AdBannerWeiXin = module.export = AdBannerWeiXin; 
