//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var Platform = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量 


    },
    properties: {
        //get 和 set 函数不能放在statics里
        isAndroid: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_ANDROID) ? true : false;
            },
        },

        isiOS: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_IOS) ? true : false;
            },
        },

        isWin: {
            get: function () {
                return (cc.sys.platform == cc.sys.OS_WINDOWS) ? true : false;
            },
        },

        isWeiXin: {
            get: function () {
                return (cc.sys.platform == cc.sys.WECHAT_GAME) ? true : false;
            },
        },
        isFacebook: {
            get: function () {
                return (cc.sys.platform == cc.sys.FB_PLAYABLE_ADS) ? true : false;
            },
        },
        isByte: {
            get: function () {
                return (cc.sys.platform == cc.sys.BYTEDANCE_MINI_GAME) ? true : false;
            },
        },
        isCloudRes: {
            get: function () {
                if (this.isWeiXin || this.isByte) {
                    return true;
                }
                return false;
            },
        }, 

    },


});

Platform.main = new Platform();
cc.Platform = module.export = Platform;

