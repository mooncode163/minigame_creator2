var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigAudioInternal = cc.Class({ 
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null, 
    },
    properties: {
        jsonRoot: null, 
    },
 
          /*
    {  
    filepath:"",
    success: function (p) {
    },
    fail: function () {
    }, 
    }
    */
    Load: function (obj) {   
        var filepath = obj.filepath;    

        cc.Debug.Log("ConfigAudioInternal:filepath =" + filepath);
        //去除后缀
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        //cc.JsonAsset
        cc.resources.load(key, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("ConfigAudioInternal:err=" + err);
                // return;
            }
            // cc.Debug.Log("ConfigAudioInternal:rootJson=" + rootJson);
            if (err == null) {
                this.ParseData(rootJson.json);
            }

            if(obj.success!=null)
            {
                obj.success(this);
            } 
        }.bind(this));
    },


    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("config:ParseData=null");
        }
        this.jsonRoot = json;

    },
 
 
    ContainsKey(key)
    { 
        return cc.JsonUtil.ContainsKey(this.jsonRoot, key);
    },
    //同步 synchronization
   
    GetAudioSync(key) {
        return cc.JsonUtil.GetItem(this.jsonRoot, key, ""); 
    },

});

// Config.main = new Config();


//单例对象 方法二
ConfigAudioInternal._main = null;
ConfigAudioInternal.main = function () {
    if (!ConfigAudioInternal._main) {
        cc.Debug.Log("_main is null");
        ConfigAudioInternal._main = new ConfigAudioInternal();
        //ConfigAudioInternal._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigAudioInternal._main;
}

cc.ConfigAudioInternal = module.export = ConfigAudioInternal;

