var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigAudio = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
    },
    properties: {
        jsonRoot: null,
        infoPreload: null,
        audioApp: null,
        audioAppCommon: null, 
        countLoad: 0,
        countMax: 0,

    },
    Init: function () {
    },

    OnFinish: function (obj) {
        this.countLoad++;
        if (this.countLoad >= this.countMax) {
            if (obj.success != null) {
                obj.success(this);
            }
        }
    },

    /*
     {  
     success: function (p) {
     },
     fail: function () {
     }, 
     }
     */
    Load: function (obj) {
        this.countMax = 2;
        var filepath = "";

        filepath = cc.Common.RES_CONFIG_DATA + "/Audio/ConfigAudioApp.json";
        this.audioApp = new cc.ConfigAudioInternal();
        this.audioApp.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });


        filepath = cc.Common.RES_CONFIG_DATA + "/Audio/ConfigAudioAppCommon.json";
        this.audioAppCommon = new cc.ConfigAudioInternal();
        this.audioAppCommon.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });
 
    },


    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("config:ParseData=null");
        }
        this.jsonRoot = json;

    },

    IsContainsKey(key) {
        var ret = false;
        ret = this.audioApp.ContainsKey(key);
        if (!ret) {
            ret = this.audioAppCommon.ContainsKey(key);
        } 
        return ret;
    },
    GetAudio(key) {
        var ret = "";
        ret = this.audioApp.GetAudioSync(key);
        if (!ret) {
            ret = this.audioAppCommon.GetAudioSync(key);
        } 
        return ret;
    },

});

// Config.main = new Config();


//单例对象 方法二
ConfigAudio._main = null;
ConfigAudio.main = function () {
    if (!ConfigAudio._main) {
        cc.Debug.Log("_main is null");
        ConfigAudio._main = new ConfigAudio();
        ConfigAudio._main.Init();

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigAudio._main;
}

cc.ConfigAudio = module.export = ConfigAudio;

