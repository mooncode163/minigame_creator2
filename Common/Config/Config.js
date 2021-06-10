var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Config = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量 
    },
    properties: { 
        configApp:null,
        configCommon:null,
        countLoad:0,
        countMax:2,
        osDefault: "",//Source.IOS, 
        appKeyName:
        {
            get: function () {
                return  this.configCommon.GetString("APP_NAME_KEYWORD","");
            },
        },
        appType:
        {
            get: function () {
                return  this.configCommon.GetString("APP_TYPE",""); 
            },
        },

        cloudResUrl:
        {
            get: function () { 
                return  this.configCommon.GetCloudResUrl(); 
            },
        },
        shareUrl:
        {
            get: function () { 
                return  this.configCommon.GetShareUrl(); 
            },
        },
        shareTitle:
        {
            get: function () { 
                return  this.configCommon.GetShareTitle(); 
            },
        },
        version:
        {
            get: function () { 
                return  this.configCommon.GetString("version",""); 
            },
        }, 

        
        appId:
        {
            get: function () {
                cc.Debug.Log("GetAppIdOfStore get=");
                var key_store = cc.Source.APPSTORE;
                if (cc.Common.main().isAndroid) {
                    key_store = this.channel;
                }
                if (cc.Common.main().isWeiXin) {
                    key_store = cc.Source.WEIXIN;
                }
                cc.Debug.Log("GetAppIdOfStore key_store=" + key_store);
                var strid =   this.configApp.GetAppIdOfStore(key_store);
                return strid;
            }
        },

        channel:
        {
            get: function () {
                var ret = cc.Source.XIAOMI;
                if (cc.Common.main().isiOS) {
                    ret = cc.Source.APPSTORE;
                }
                if (cc.Common.main().isAndroid) {
                    //ret = GetStringJson(rootJsonChannel, "channel_android", Source.XIAOMI);
                }
                // if (Common.isWeb) {
                //     ret = cc.Source.FACEBOOK;
                // }
                return ret;
            },
        },
        isHaveRemoveAd:
        {
            get: function () {
                var ret = true;
                if (cc.Common.main().isAndroid) {
                    ret = false;
                    if (cc.Config.main().channel == cc.Source.GP) {
                        //GP市场内购
                        ret = true;
                    }
                }
                if (cc.Common.main().isWin) {
                    ret = false;
                }
                return ret;
            },
        },

        APP_FOR_KIDS:
        {
            get: function () { 
                return  this.configCommon.GetString("APP_FOR_KIDS","");  
            }
        },
    },

     

    OnFinish: function (obj)
    {
        this.countLoad++;
        if(this.countLoad>=this.countMax)
        {
            if(obj.success!=null)
            {
                obj.success(this);
            }
        }
    },

    InitValue: function () {
         
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
        this.countLoad = 0;
        var strDir = cc.Common.RES_CONFIG_DATA + "/config"; 
        var fileName = "config_android"; 
            if (cc.Common.main().isAndroid) {
                fileName = "config_android";
            }
            if (cc.Common.main().isiOS) {
                fileName = "config_ios";
            }

            if (cc.Common.isWin) {
                fileName = "config_" + cc.Source.WIN;
                fileName = "config_android";
            }

            if (cc.Common.main().isWeiXin) {
                fileName = "config_weixin";
            }
            if (cc.Device.main.isLandscape) {
                fileName += "_hd";
            } 
 
        var filepath = strDir + "/" + fileName; 
        this.configApp = new cc.ConfigInternal();
        this.configApp.Load(  
            { 
            filepath:filepath,
            success: function (p) {
                this.OnFinish(obj); 
            }.bind(this),
            fail: function () {
            }, 
            }); 
            
        fileName = "config_common";
        var filepath = strDir + "/" + fileName;
        this.configCommon = new cc.ConfigInternal();
        this.configCommon.Load(  
            { 
            filepath:filepath,
            success: function (p) {
                this.OnFinish(obj); 
            }.bind(this),
            fail: function () {
            }, 
            });
      
    },

  

    IsHaveKey(key) {
        return cc.Common.main().JsonDataContainsKey(this.rootJson, key);
    },

    GetLoadInfoById: function (id) {
        for (let info of Config.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },
    CheckAllLoad: function () {
        var isLoadAll = true;
        for (let info of Config.listLoad) {
            if (info.isLoad == false) {
                isLoadAll = false;
            }
        }
        cc.Debug.Log("config:isLoadAll=" + isLoadAll);
        if (isLoadAll == true) {
            // cc.Debug.Log("isLoadAll= 1 " + isLoadAll);
            if (Config.callbackFinish != null) {
                Config.loadInfo.isLoad = true;
                // cc.Debug.Log("isLoadAll= 2 " + isLoadAll);
                Config.callbackFinish(this);
            } else {
                cc.Debug.Log("Config isLoadAll= callbackFinish is null ");
            }
        }
    },
  


});

// Config.main = new Config();


//单例对象 方法二
Config._main = null; 
Config.main = function () {
    if (!Config._main) {
        cc.Debug.Log("_main is null");
        Config._main = new Config();
        Config._main.InitValue(); 

    } else {
        //cc.Debug.Log("_main is not null");
    }

    cc.Debug.Log("GetAppIdOfStore main=");
    return Config._main;
}

cc.Config = module.export = Config;

