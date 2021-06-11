var AdVideoMooSnow = cc.Class({
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
        moosnow.platform.showVideo(res => {
            switch (res) {
                case moosnow.VIDEO_STATUS.NOTEND:
                    console.log('视频未观看完成 ')
                    break;
                case moosnow.VIDEO_STATUS.ERR:
                    console.log('获取视频错误 ')
                    break;
                case moosnow.VIDEO_STATUS.END:
                    console.log('观看视频结束 ')
                default:
                    break;
            }
        })
   
    },
    OnClickAd() {

    },
});

cc.AdVideoMooSnow = module.export = AdVideoMooSnow;
