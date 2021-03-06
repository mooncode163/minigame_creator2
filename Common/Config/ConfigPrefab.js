var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigPrefab = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
    },
    properties: {
        jsonRoot: null,
        infoPreload: null,
        prefabApp: null,
        prefabAppCommon: null,
        prefabCommon: null,
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
        this.countMax = 3;
        var filepath = "";

        filepath = cc.Common.RES_CONFIG_DATA + "/Prefab/ConfigPrefabApp.json";
        this.prefabApp = new cc.ConfigPrefabInternal();
        this.prefabApp.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });


        filepath = cc.Common.RES_CONFIG_DATA + "/Prefab/ConfigPrefabAppCommon.json";
        this.prefabAppCommon = new cc.ConfigPrefabInternal();
        this.prefabAppCommon.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });

        filepath = "Common/Prefab/ConfigPrefab.json";
        this.prefabCommon = new cc.ConfigPrefabInternal();
        this.prefabCommon.Load(
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
        ret = this.prefabApp.ContainsKey(key);
        if (!ret) {
            ret = this.prefabAppCommon.ContainsKey(key);
        }
        if (!ret) {
            ret = this.prefabCommon.ContainsKey(key);
        }
        return ret;
    },
    GetPrefab(key) {
        var ret = "";
        ret = this.prefabApp.GetPrefabSync(key);
        if (!ret) {
            ret = this.prefabAppCommon.GetPrefabSync(key);
        }
        if (!ret) {
            ret = this.prefabCommon.GetPrefabSync(key);
        }
        return ret;
    },

});

// Config.main = new Config();


//单例对象 方法二
ConfigPrefab._main = null;
ConfigPrefab.main = function () {
    if (!ConfigPrefab._main) {
        cc.Debug.Log("_main is null");
        ConfigPrefab._main = new ConfigPrefab();
        ConfigPrefab._main.Init();

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigPrefab._main;
}

cc.ConfigPrefab = module.export = ConfigPrefab;

