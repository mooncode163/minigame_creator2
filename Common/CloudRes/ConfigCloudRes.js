 

var ConfigCloudRes = cc.Class({
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
            cc.Debug.Log("ConfigCloudRes:err=" + err);
            // return;
        }
        if (err == null) {
            if (rootJson.json == null) {
                cc.Debug.Log("LoadFinish weixin ConfigCloudRes:ParseData");
                this.ParseData(rootJson);
            } else {
                //resource里的json文件
                cc.Debug.Log("LoadFinish resource ConfigCloudRes:ParseData");
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
        cc.Debug.Log("ConfigCloudRes:ParseData start");
        this.rootJson = json;
        if (this.rootJson == null) {
            cc.Debug.Log("ConfigCloudRes:ParseData  is null");
        }

        var word = json.words;
        if (word != null) {
            cc.Debug.Log("ConfigCloudRes:word =" + word);
        }
    },



});

// Config.main = new Config();


//单例对象 方法二
ConfigCloudRes._main = null;
ConfigCloudRes.main = function () {
    if (!ConfigCloudRes._main) {
        ConfigCloudRes._main = new ConfigCloudRes();
        //ConfigCloudRes._main.Load();
    }
    return ConfigCloudRes._main;
}

cc.ConfigCloudRes = module.export = ConfigCloudRes;

