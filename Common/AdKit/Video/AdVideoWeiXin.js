var AdVideoWeiXin = cc.Class({
    extends: cc.AdVideoPlatformWrapper,// cc.ItemInfo,
    properties: {
        videoAd:null,
    },
    statics: {




    },
    InitAd(source) {
    },
    SetObjectInfo(objName, objMethod) {

    },
    SetType(type) {

    },
    InitAd(source) {
        // 在页面中定义激励视频广告 
        // 在页面onLoad回调事件中创建激励视频广告实例
        if (wx.createRewardedVideoAd) {
            this.videoAd = wx.createRewardedVideoAd({
                adUnitId: cc.AdInfo.ID_Video
            })
        }

    },
    PreLoad(source) {

    },

    ShowAd() {

        // 用户触发广告后，显示激励视频广告
        if (this.videoAd) {
            this.videoAd.show().catch(() => {
                // 失败重试
                this.videoAd.load()
                    .then(() => this.videoAd.show())
                    .catch(err => {
                        console.log('激励视频 广告显示失败')
                    })
            })
        }
    },
    OnClickAd() {

    },
});

cc.AdVideoWeiXin = module.export = AdVideoWeiXin;
