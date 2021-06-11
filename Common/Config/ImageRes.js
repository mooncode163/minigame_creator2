var Dictionary = require("Dictionary");
var ConfigBase = require("ConfigBase");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ImageRes = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigBase,
    statics: {
        // 声明静态变量   

    },
    properties: {
        jsonRoot: null,
        imageResApp: null,
        imageResAppCommon: null,
        imageResCommon: null,
        countLoad: 0,
        countMax: 3,

    },
    Init: function () { 
        var strDir = cc.Common.RES_CONFIG_DATA + "/Image";
        var fileName = "ImageResApp.json";
        {
            this.imageResApp = new cc.ImageResInternal();
            this.imageResApp.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResApp);
        }

        strDir =  cc.Common.RES_CONFIG_DATA + "/Image";
        fileName = "ImageResAppCommon.json";
        {
            this.imageResAppCommon = new cc.ImageResInternal();
            this.imageResAppCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResAppCommon);
        }

        // strDir = Common.RES_CONFIG_DATA_COMMON + "/Image";
        strDir = "Common/UI"  
        fileName = "ImageRes.json";
        {
            this.imageResCommon = new cc.ImageResInternal();
            this.imageResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResCommon);
        }


        // if (!Platform.isCloudRes) 
        {

            // strDir = Common.CLOUD_RES_DIR;
            strDir = cc.CloudRes.main().rootPath;
            fileName = "ImageResCloudRes.json";
            {
                this.imageResCloudRes = new cc.ImageResInternal();
                this.imageResCloudRes.fileJson = strDir + "/" + fileName;
                this.imageResCloudRes.isCloud = cc.Platform.main.isCloudRes;
                this.listItem.push(this.imageResCloudRes);
            }

        }
    },


    OnFinish: function (obj) {
        this.countLoad++;
        // if(this.countLoad>=this.countMax)
        {
            if (obj.success != null) {
                obj.success(this);
            }
        }
    },
  
    //bool
    IsHasBoard(key) {
      

        var ret = false;
        if (cc.Common.BlankString(key)) {
            return ret;
        } 

        this.listItem.forEach(function (item, index) {
            var p = item  
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasBoard(key);
                }
            } else {
                return ret;
            }
        }.bind(this)); 

    },

    IsContainsKey(key) { 
        var ret = false;
        if (cc.Common.BlankString(key)) {
            return ret;
        } 
        this.listItem.forEach(function (item, index) {
            var p = item  
            if (ret == false) {
                if (p != null) {
                    ret = p.ContainsKey(key);
                }
            } else {
                return ret;
            }
        }.bind(this)); 
    },
    //异步
    /*
    {
        key: "", F
        success: function (color) {
        },
        fail: function () {
        }, 
    }
*/ 

    GetImage(key) {
        var ret = "";

        if (cc.Common.BlankString(key)) {
            return ret;
        }

         this.listItem.forEach(function (item, index) {
            var p = item;
            if (cc.Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetImage(key);
                    if (p == this.imageResCloudRes) {
                        if (cc.Platform.main.isCloudRes) {
                            // 从CloudRes缓存目录读取
                            ret = cc.CloudRes.main().rootPath+"/" + ret;
                        }else{
                            // 在resoureces目录
                            ret = cc.Common.CLOUD_RES_DIR + "/" + ret;
                        }
                    }

                }
            } else {
                return;
            }
        }.bind(this)); 

      

        return ret;
    },


    GetImageBoard(key) {


        var ret = "";
        if (cc.Common.BlankString(key)) {
            return ret;
        } 
        this.listItem.forEach(function (item, index) {
            var p = item  
            if (ret == false) {
                if (p != null) {
                    ret = p.GetImageBoard(key);
                }
            } else {
                return ret;
            }
        }.bind(this)); 
    },


});

//单例对象 方法二
ImageRes._main = null;
ImageRes.main = function () {
    if (!ImageRes._main) {
        ImageRes._main = new ImageRes();
        ImageRes._main.Init();
    } else {
    }
    return ImageRes._main;
}

cc.ImageRes = module.export = ImageRes;

