var AdBannerPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null;
        if (cc.Platform.main.isWeiXin) {
            p = new cc.AdBannerWeiXin();
        }
        if (cc.Platform.main.isQQ) {
            p = new cc.AdBannerMooSnow();
        }
        return p;
    },

    InitAd(source) {
 
    },

    ShowAd(isShow) {
       
    }, 
    SetScreenSize(w, h) {
     
    },
    //y 基于屏幕底部
    SetScreenOffset(x, y) {
    
    },
});

cc.AdBannerPlatformWrapper = module.export = AdBannerPlatformWrapper; 
