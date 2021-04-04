var Dictionary = require("Dictionary");
// var Common = require("Common");
var Source = require("Source");
var LTLocalization = require("LTLocalization");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var Language = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量
    
    },
    properties: {
   
        defaultLanId:
        {
            get: function () {
                var ret = cc.sys.LANGUAGE_CHINESE;
                if (cc.sys.platform == cc.sys.MOBILE_BROWSER) {
                    ret = cc.sys.LANGUAGE_ENGLISH;
                }
                return ret;
            },
        },

        countLoad:0,
        countMax:4,
        languageMain: null,
        languageGame: null,
        languageAppCommon: null,
        languageCommon: null,
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
        var filepath = cc.Common.RES_CONFIG_DATA + "/language/language.csv";
        this.languageMain = new cc.LanguageInternal();
   
        this.languageMain.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });
            

            //game
        filepath = cc.Common.GAME_RES_DIR + "/language/language.csv"; 
        this.languageGame = new cc.LanguageInternal();
      
        this.languageGame.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });

 
        filepath =  "AppCommon/language/language.csv";
        this.languageAppCommon = new cc.LanguageInternal();
 
        this.languageAppCommon.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });
 
        filepath = cc.Common.RES_CONFIG_DATA_COMMON + "/language/language.csv";
        this.languageCommon = new cc.LanguageInternal();
        this.languageCommon.Load(
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


    OnFinish: function (obj) {
        this.countLoad++;
        if (this.countLoad >= this.countMax) {
            if (obj.success != null) {
                obj.success(this);
            }
        }
    },
 
 

    GetLoadInfoById: function (id) {
        for (let info of Language.listLoad) {
            if (info.id == id) {
                return info;
            }
        }
        return null;
    },  
    SetLanguage: function (lan) { 
        if (this.languageMain != null) {
            this.languageMain.SetLanguage(lan);
        }
        if (this.languageGame != null) {
            this.languageGame.SetLanguage(lan);
        }
        if (this.languageAppCommon != null) {
            this.languageAppCommon.SetLanguage(lan);
        }
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    },

    GetLanguage: function () { 
        if (this.languageMain != null) {
            return this.languageMain.GetLanguage();
        } 
    },
    GetString: function (key) {
        var str = this.languageMain.GetString(key);
        if(str == "")
        {
            if(this.languageAppCommon!=null)
            {
                str = this.languageAppCommon.GetString(key);
            }
        }

        if(str == "")
        {
            if(this.languageCommon!=null)
            {
                str = this.languageCommon.GetString(key);
            }
        }
         
        return str;

    },


    //
    GetReplaceString: function (key, replace, strnew) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    },

    IsContainsKey: function (key) {
        return this.ltLocalization.IsContainsKey(key);
    },

});




//单例对象 方法二 
Language._main = null;
Language.main = function () {
    if (!Language._main) {
        cc.Debug.Log("Language _main is null"); 
        Language._main = new Language();  
    } else {
        //cc.Debug.Log("Language _main is not null");
    }
    return Language._main;
}
 

cc.Language = module.export = Language;

