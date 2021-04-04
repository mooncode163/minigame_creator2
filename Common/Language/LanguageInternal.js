var Dictionary = require("Dictionary");
// var Common = require("Common");
var Source = require("Source");
var LTLocalization = require("LTLocalization");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var LanguageInternal = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量


    },
    properties: {
        // ltLocalization: LTLocalization,
        ltLocalization: {
            default: null,
            type: LTLocalization,
        },

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
    },
    InitValue: function () {

    },

    OnFinish: function (obj) {
        if (obj.success != null) {
            obj.success(this);
        }
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
        var filepath = obj.filepath
        this.ltLocalization = new LTLocalization();
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        cc.resources.load(key, function (err, file) {
            cc.Debug.Log("LanguageInit::err =" + err + " key=" + key);
            if (err == null) {
                cc.Debug.Log("LanguageInit::ReadData no err");
                this.ltLocalization.ReadData(file.text);
            }
            this.OnFinish(obj);
        }.bind(this));

        //cc.Debug.Log("isLoadAll=loadRes end");
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
        this.ltLocalization.SetLanguage(lan);
    },

    GetLanguage: function () {
        return this.ltLocalization.GetLanguage();

    },
    GetString: function (key) {
        var str = "";
        if (this.IsContainsKey(key)) {
            // cc.Debug.Log("GetString: IsContainsKey key=" + key);
            str = this.ltLocalization.GetText(key);
        }
        return str;

    },



    IsContainsKey: function (key) {
        return this.ltLocalization.IsContainsKey(key);
    },

});




//单例对象 方法二 
LanguageInternal._main = null;
LanguageInternal.main = function () {
    if (!LanguageInternal._main) {
        cc.Debug.Log("Language _main is null");
        LanguageInternal._main = new LanguageInternal();
        LanguageInternal._main.InitValue();

    } else {
        //cc.Debug.Log("Language _main is not null");
    }
    return LanguageInternal._main;
}



cc.LanguageInternal = module.export = LanguageInternal;

