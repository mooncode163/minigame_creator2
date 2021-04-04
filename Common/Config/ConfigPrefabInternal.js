var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigPrefabInternal = cc.Class({ 
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
    },
    properties: {
        jsonRoot: null, 
    },
 
  
    Load: function (obj) {
        var filepath = cc.Common.RES_CONFIG_DATA + "/Color/Color";//.json
        // filepath = cc.Common.RES_CONFIG_DATA + "/config/config_android";

        cc.Debug.Log("ConfigPrefabInternal:filepath =" + filepath);
        //去除后缀
        // filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        //cc.JsonAsset
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("ConfigPrefabInternal:err=" + err);
                // return;
            }
            cc.Debug.Log("ConfigPrefabInternal:rootJson=" + rootJson);
            if (err == null) {
                this.ParseData(rootJson.json);
            }

            if(obj.success!=null)
            {
                obj.success(this);
            }
            this.GetColorInternal(obj);
        }.bind(this));
    },


    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("config:ParseData=null");
        }
        this.jsonRoot = json;

    },
 
 
    ContainsKey(  key)
    { 
        return cc.JsonUtil.ContainsKey(this.jsonRoot, key);
    },
    //同步 synchronization
    GetPrefabSync(key) {
        return cc.JsonUtil.GetItem(this.jsonRoot, key, ""); 
    },

});

// Config.main = new Config();


//单例对象 方法二
ConfigPrefabInternal._main = null;
ConfigPrefabInternal.main = function () {
    if (!ConfigPrefabInternal._main) {
        cc.Debug.Log("_main is null");
        ConfigPrefabInternal._main = new ConfigPrefabInternal();
        //ConfigPrefabInternal._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigPrefabInternal._main;
}

cc.ConfigPrefabInternal = module.export = ConfigPrefabInternal;

