var AdInsertWeiXin = cc.Class({
    extends: cc.AdInsertPlatformWrapper,// cc.ItemInfo,
    properties: {
        interstitialAd:null,
    },
    statics: {




    },


    InitAd(source) {
        // 在页面中定义插屏广告 
        // 在页面onLoad回调事件中创建插屏广告实例
        if (wx.createInterstitialAd) {
            this.interstitialAd = wx.createInterstitialAd({
                adUnitId: cc.AdInfo.ID_Insert
            })
 
            this.interstitialAd.onError(res => {
        
            }) 
            this.interstitialAd.onClose(res => {
        
            }) 
           
            
        }

    },
    SetObjectInfo(objName) {

    }
    ,
    ShowAd() {
        // 在适合的场景显示插屏广告
        if (this.interstitialAd) {
            this.interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
    },
});

cc.AdInsertWeiXin = module.export = AdInsertWeiXin;
