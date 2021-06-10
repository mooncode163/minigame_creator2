 

var LanguageCloudRes = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigBase,
    statics: {
        // 声明静态变量

    },
    properties: {
        rootJson: null,
        version:
        {
            get: function () {
                if (this.rootJson != null) {
                    return this.rootJson.version;
                }
                return "0.0.0";
            },
        },


    },

    LoadFinish(err, rootJson) {
        if (err) {
            cc.Debug.Log("LanguageCloudRes:err=" + err);
            // return;
        }
        if (err == null) {
            if (rootJson.json == null) {
                cc.Debug.Log("LoadFinish weixin LanguageCloudRes:ParseData");
                this.ParseData(rootJson);
            } else {
                //resource里的json文件
                cc.Debug.Log("LoadFinish resource LanguageCloudRes:ParseData");
                this.ParseData(rootJson.json);
            }
        }
        if (this.callbackFinish != null) {
            this.callbackFinish();
        }
    },


    Load(cbFinish) {
        this.callbackFinish = cbFinish;
        if (this.rootJson != null) {
            if (this.callbackFinish != null) {
                this.callbackFinish();
            }
            return;
        }
        // var dirRoot = cc.Common.CLOUD_RES_DIR;
        // if (cc.Common.main().isWeiXin) {
        //     dirRoot = cc.FileSystemWeixin.main().GetRootDirPath() + "/" + cc.Common.CLOUD_RES_DIR_NAME;
        // }
        var dirRoot = cc.CloudRes.main().rootPath;
        var filepath = dirRoot + "/version.json";

        if (cc.Common.main().isWeiXin) {
            // 加载json文件 { ext: ".json" },
            cc.assetManager.loadRemote(filepath,  function (err, rootJson) {
                this.LoadFinish(err, rootJson);
            }.bind(this));
        } else {
            //cc.JsonAsset   cc.loader.load
            //去除后缀
            filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
            cc.resources.load(filepath, function (err, rootJson) {
                this.LoadFinish(err, rootJson);
            }.bind(this));
        }



    },

    ParseData: function (json) {
        cc.Debug.Log("LanguageCloudRes:ParseData start");
        this.rootJson = json;
        if (this.rootJson == null) {
            cc.Debug.Log("LanguageCloudRes:ParseData  is null");
        }

        var word = json.words;
        if (word != null) {
            cc.Debug.Log("LanguageCloudRes:word =" + word);
        }
    },



});

// Config.main = new Config();


//单例对象 方法二
LanguageCloudRes._main = null;
LanguageCloudRes.main = function () {
    if (!LanguageCloudRes._main) {
        LanguageCloudRes._main = new LanguageCloudRes();
        
    }
    return LanguageCloudRes._main;
}

cc.LanguageCloudRes = module.export = LanguageCloudRes;

