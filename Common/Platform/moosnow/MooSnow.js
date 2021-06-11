var MooSnow = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {

    },
    Init() {
        if (cc.Platform.main.isCloudRes) {
            moosnow.platform.login(() => {
                console.log('moosnow 登录成功 ')

            })

            moosnow.ad.getAd((res) => {
                console.log('moosnow 广告数据 ', res)
            })
        }
    },

});

//单例对象 方法二
MooSnow._main = null;
MooSnow.main = function () {
    if (!MooSnow._main) {
        MooSnow._main = new MooSnow();
    } else {
        //cc.Debug.Log("_main is not null");
    }
    return MooSnow._main;
}

cc.MooSnow = module.export = MooSnow;
