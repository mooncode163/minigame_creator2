


var ConfigCloudRes = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigBase,
    statics: {
        // 声明静态变量

    },
    properties: {
        // ConfigCloudResInternal
        configCloudResCommon: null,
        cloudResUrl:
        {
            get: function () {
                return this.configCloudResCommon.GetCloudResUrl();
            },
        },

        cloudResVersionUrl:
        {
            get: function () {
                return this.configCloudResCommon.GetCloudResVersionUrl();
            },
        },
    },



    Init: function () {
        {
            var strDir = cc.Common.RES_CONFIG_DATA + "/config";
            var fileName = "config_cloudres.json";

            this.configCloudResCommon = new cc.ConfigCloudResInternal();
            this.configCloudResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.configCloudResCommon);
        }


    },



});


//单例对象 方法二
ConfigCloudRes._main = null;
ConfigCloudRes.main = function () {
    if (!ConfigCloudRes._main) {
        ConfigCloudRes._main = new ConfigCloudRes();
        ConfigCloudRes._main.Init();
    }
    return ConfigCloudRes._main;
}

cc.ConfigCloudRes = module.export = ConfigCloudRes;

