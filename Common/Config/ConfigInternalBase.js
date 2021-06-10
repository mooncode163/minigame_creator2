
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigInternalBase = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量   
    },
    properties: {

        rootJson: null,
        fileJson: "",
        isCloud: false,


    },
    /* 
      {  
      success: function (p) {
      }.bind(this),
      fail: function () {
      }.bind(this), 
      }
      */
    Load: function (obj) {
        if (this.isCloud) {
            cc.ResManager.main().LoadUrl({
                url: this.fileJson,
                success: function (p, data) {
                    this.rootJson = data.json;
                    this.ParseData();
                    if (obj.success != null) {
                        obj.success(this);
                    }
                }.bind(this),
                fail: function (p, error) {
                    if (obj.fail != null) {
                        obj.fail(this);
                    }
                }.bind(this)
            });
        } else {
            var key = cc.FileUtil.GetFileBeforeExtWithOutDot(this.fileJson);
            cc.ResManager.main().Load({
                filepath: key,
                success: function (p, data) {
                    this.rootJson = data.json;
                    this.ParseData();
                    if (obj.success != null) {
                        obj.success(this);
                    }
                }.bind(this),
                fail: function (p, error) {
                    if (obj.fail != null) {
                        // Debug.Log("ConfigInternalBase fail this");
                        obj.fail(this);
                    }
                }.bind(this)
            });
        }


    },

    GetString(key, def = "") {
        return cc.JsonUtil.GetItem(this.rootJson, key, def);
    },

    IsHaveKey(key) {
        return cc.JsonUtil.ContainsKey(this.rootJson, key);
    },

    ParseData() {
        Debug.Log("ConfigInternalBase ParseData");
    },



});

// Config.main = new Config();


//单例对象 方法二
ConfigInternalBase._main = null;
ConfigInternalBase.main = function () {
    if (!ConfigInternalBase._main) {
        cc.Debug.Log("_main is null");
        ConfigInternalBase._main = new ConfigInternalBase();
        //ConfigInternalBase._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigInternalBase._main;
}

cc.ConfigInternalBase = module.export = ConfigInternalBase;

