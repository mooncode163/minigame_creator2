var Dictionary = require("Dictionary");
var AdConfigInternal = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        SOURCE_TYPE_BANNER:"banner",
        SOURCE_TYPE_INSERT:"insert",
        SOURCE_TYPE_VIDEO:"video", 
        callbackFinish: null, 
    },
    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
        rootJson: null,
        rootJsonCommon: null,
        osDefault: "",//Source.IOS, 
    },

    SetLoadFinishCallBack: function (callback, info) {
        AdConfigInternal.callbackFinish = callback;
        AdConfigInternal.loadInfo = info;
    },

    InitValue: function () {
    
    },

    Init: function () {
        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();
    },

    Load: function (filepath) {
        //cc.JsonAsset
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        cc.resources.load(key, function (err, rootJson) {

            if (err) {
                cc.Debug.Log("AdConfigInternal:err=" + err);
                // return;
            }

            // cc.Debug.Log("AdConfigInternal:rootJson.text=" + rootJson.text);
            if (err == null) {
                this.ParseData(rootJson.json);
            }
 
        }.bind(this)); 
    },
 
    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("AdConfigInternal:ParseData=null");
        }
        var appid = json.APPID.huawei;
        cc.Debug.Log("AdConfigInternal:appid=" + appid);

    }, 

});

// AdConfigInternal.main = new AdConfigInternal();


//单例对象 方法二
AdConfigInternal._main = null;
AdConfigInternal.main = function () {
    if (!AdConfigInternal._main) {
        AdConfigInternal._main = new AdConfigInternal();
        AdConfigInternal._main.InitValue();
        AdConfigInternal._main.Init();
    }
    return AdConfigInternal._main;
}

cc.AdConfigInternal = module.export = AdConfigInternal;


