 

var LanguageCloudRes = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigBase,
    statics: {
        // 声明静态变量

    },
    properties: {
        languageCommon: null, 
    },

    Init:function() { 
        {
            var strDir = Common.RES_CONFIG_DATA_COMMON + "/language";
            var fileName = "language_cloudres.csv";
            {
                this.languageCommon = new cc.LanguageInternal();
                this.languageCommon.fileJson = strDir + "/" + fileName;
                this.listItem.push(this.languageCommon);
            }
        }
 
    },


    SetLanguage:function(lan) {
        
        if (this.languageCommon != null) {
            this.languageCommon.SetLanguage(lan);
        }
    },

    GetLanguage:function() {
        if (this.languageCommon != null) {
            return this.languageCommon.GetLanguage();
        }
    },
    GetString:function(key) { 
        var str = "";
       
        if (str == "") {
            if (this.languageCommon != null) {
                str = this.languageCommon.GetString(key);
            }
        }

        return str;

    },


    //
    GetReplaceString:function(key, replace, strnew) {
        // string str = GetString(key);
        // str = str.Replace(replace, strnew);
        // return str;
    },

    IsContainsKey:function(key) { 
        var ret = true; 

        if (!ret) {
            if (this.languageCommon != null) {
                ret = this.languageCommon.IsContainsKey(key);
            }
        }
        return ret;
    },
 


}); 

//单例对象 方法二
LanguageCloudRes._main = null;
LanguageCloudRes.main = function () {
    if (!LanguageCloudRes._main) {
        LanguageCloudRes._main = new LanguageCloudRes();
        LanguageCloudRes._main.Init();
    }
    return LanguageCloudRes._main;
}

cc.LanguageCloudRes = module.export = LanguageCloudRes;

