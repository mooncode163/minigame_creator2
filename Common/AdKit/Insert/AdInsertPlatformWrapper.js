var AdInsertPlatformWrapper = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },

    GetPlatform: function () {
        var p = null; 
        if (cc.Platform.main.isWeiXin) {
            p = new cc.AdInsertWeiXin();
        }
        if (cc.Platform.main.isQQ) {
            p = new cc.AdInsertMooSnow();
        }
        return p;
    },

    InitAd(source) {

    },
    SetObjectInfo(objName) {

    }
    ,
    ShowAd() {

    },
});

cc.AdInsertPlatformWrapper = module.export = AdInsertPlatformWrapper; 
