


var ConfigCloudResInternal = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigInternalBase,
    statics: {
        // 声明静态变量

    },
    properties: {

    },
    GetCloudResUrl: function () {
        var key = "url";
        if (cc.Device.main.isLandscape) {
            key = "url_hd";
        }
        return cc.JsonUtil.GetItem(this.rootJson.zip, key, "");
    },

    GetCloudResVersionUrl: function () {
        var key = "url";
        // if(Device.main.isLandscape)
        // {
        //     key = "url_version_hd";
        // }
        return cc.JsonUtil.GetItem(this.rootJson.version, key, "");
    },



});


//单例对象 方法二
ConfigCloudResInternal._main = null;
ConfigCloudResInternal.main = function () {
    if (!ConfigCloudResInternal._main) {
        ConfigCloudResInternal._main = new ConfigCloudResInternal();
        ConfigCloudResInternal._main.Init();
    }
    return ConfigCloudResInternal._main;
}

cc.ConfigCloudResInternal = module.export = ConfigCloudResInternal;

