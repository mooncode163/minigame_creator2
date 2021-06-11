 

var CloudResVersion = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量

    },
    properties: {
        rootJson: null,
        versionNet:"1.0.0",
        versionLocal:
        {
            get: function () {
                if (this.rootJson != null) {
                    return this.rootJson.version;
                }
                return "0.0.0";
            },
        },


    }, 
   
    
    LoadVersion:function(obj) {
        cc.ResManager.main().LoadUrl({
            url: cc.ConfigCloudRes.main().cloudResVersionUrl,
            success: function (p, data) {
                this.versionNet = data.json["version"]; 
                if (obj.success != null) {
                    obj.success(this);
                }
            }.bind(this),
            fail: function (p, error) {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            }.bind(this),
            finish: function () {
                this.LoadInternal(obj);
            }.bind(this),
        }); 
    } , 

    /*
        {  
          success: (p:any) => {
              
          }, 
          fail: (p:any) => {
              
          },
        }
        */
    LoadInternal:function(obj) { 
        var dirRoot = CloudRes.main.rootPath;
        var filepath = dirRoot + "/version.json"; 

        if (cc.Platform.main.isCloudRes) {
            cc.ResManager.main().LoadUrl(
                {
                    url: filepath,

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
                    }.bind(this), 
                });

        } else {


            cc.ResManager.main().Load(
                {
                    filepath: filepath,
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
                    }.bind(this), 
                 
                });
        }

    }, 

    ParseData:function() {
        // var word = this.rootJson.words;

    }, 


}); 
//单例对象 方法二
CloudResVersion._main = null;
CloudResVersion.main = function () {
    if (!CloudResVersion._main) {
        CloudResVersion._main = new CloudResVersion();
        //CloudResVersion._main.Load();
    }
    return CloudResVersion._main;
}

cc.CloudResVersion = module.export = CloudResVersion;

