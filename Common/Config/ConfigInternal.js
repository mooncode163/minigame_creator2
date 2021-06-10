var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigInternal = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量 
     
 
    },
    properties: { 
        rootJson: null, 
        
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
        //cc.JsonAsset
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("ConfigInternal:err=" + err);
                // return;
            } 
            if (err == null) {
                // this.ParseData(rootJson.json);
                this.rootJson = rootJson.json;
                if(obj.success!=null)
                {
                    obj.success(this);
                }
            } 
        }.bind(this));
 
    }, 
    GetString: function (key, def) { 
        return cc.JsonUtil.GetItem(this.rootJson, key, def); 
    },

    GetCloudResUrl: function () { 
        var key = "url";
        if(cc.Device.main.isLandscape)
        {
            key = "url_hd";
        }
        return cc.JsonUtil.GetItem(this.rootJson.CloudRes, key, ""); 
    }, 


    GetShareUrl: function () { 
        var key = "url"; 
        return cc.JsonUtil.GetItem(this.rootJson.Share, key, ""); 
    }, 

    GetShareTitle: function () { 
        var key = "title"; 
        return cc.JsonUtil.GetItem(this.rootJson.Share, key, ""); 
    }, 


    GetAppIdOfStore(store) {
        cc.Debug.Log("GetAppIdOfStore store=" + store);
        var appid = this.rootJson.APPID;
        var strid = "0";
        if (appid.store != null) {
            strid = appid.store;
        }
        cc.Debug.Log("GetAppIdOfStore appid= " + strid + "store=" + store);
        return strid;
    },

    IsHaveKey(key) {
        return cc.JsonUtil.ContainsKey(this.rootJson, key); 
    },
  
    ParseData: function (json) {
        if (json == null) {
            cc.Debug.Log("ConfigInternal:ParseData=null");
        }
        this.rootJson = json;

        // if (this == ConfigInternal._main) {
        //     this.rootJson = json;
        //     var appid = json.APPID.huawei;
        //     cc.Debug.Log("ConfigInternal:appid=" + appid);
        // }

        // if (this == ConfigInternal._common) {
        //     this.rootJsonCommon = json;
        //     ConfigInternal._main.rootJsonCommon = json;
        //     var app_name_keyword = json.APP_NAME_KEYWORD;
        //     var app_type = json.APP_TYPE;
        //     cc.Debug.Log("ConfigInternal:app_name_keyword=" + app_name_keyword + " app_type=" + app_type);
        // }


    },



});
 
cc.ConfigInternal = module.export = ConfigInternal;

