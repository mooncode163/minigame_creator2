var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ImageRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
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

    /*
    {  
    success: function (p) {
    },
    fail: function () {
    }, 
    }
    */
    Load: function (obj) {
        var filepath = "";
        this.countLoad = 0;
        this.imageResApp = new cc.ImageResInternal();
        filepath = cc.Common.RES_CONFIG_DATA + "/Image/ImageResApp.json";
        this.imageResApp.Load(
            {
                filepath: filepath,
                success: function (p) {
                    this.OnFinish(obj);
                }.bind(this),
                fail: function () {
                    this.OnFinish(obj);
                },
            });

        /*

    filepath = cc.Common.RES_CONFIG_DATA + "/Image/ImageResAppCommon.json";
    this.imageResAppCommon = new cc.ImageResInternal();
    this.imageResAppCommon.Load(  
        { 
        filepath:filepath,
        success: function (p) {
            this.OnFinish(obj); 
        }.bind(this),
        fail: function () {
        }, 
        });
      
    filepath = cc.Common.RES_CONFIG_DATA_COMMON + "/Image/ImageRes.json";
    this.imageResCommon = new cc.ImageResInternal();
    this.imageResCommon.Load(  
        { 
        filepath:filepath,
        success: function (p) {
            this.OnFinish(obj); 
        }.bind(this),
        fail: function () {
        }, 
        });
*/

    },



    //bool
    IsHasBoard(key) {
        var ret = false;
        ret = this.imageResApp.IsHasBoard(key);
        if (!ret) {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.IsHasBoard(key);
            }
        }
        if (!ret) {
            if (this.imageResCommon != null) {
                ret = this.imageResCommon.IsHasBoard(key);
            }
        }
    },

    IsContainsKey(key) {
        var ret = false;
        ret = this.imageResApp.ContainsKey(key);
        if (!ret) {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.ContainsKey(key);
            }

        }
        if (!ret) {
            if (this.imageResCommon != null) {
                ret = this.imageResCommon.ContainsKey(key);
            }
        }

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
        ret = this.imageResApp.GetImageSync(key);
        if (!ret) {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.GetImageSync(key);
            }
        }
        if (!ret) {
            if (this.imageResCommon != null) {
                ret = this.imageResCommon.GetImageSync(key);
            }
        }
        return ret;
    },
    GetImageBoard(key) {

        var ret = "";
        ret = this.imageResApp.GetImageBoardSync(key);
        if (!ret) {
            if (this.imageResAppCommon != null) {
                ret = this.imageResAppCommon.GetImageBoardSync(key);
            }
        }
        if (!ret) {
            if (this.imageResCommon != null) {
                ret = this.imageResCommon.GetImageBoardSync(key);
            }
        }
        return ret;
    },
    // GetImageInternal(obj) {
    //     var key = "key";
    //     var ret = "";
    //     if (obj != null) {
    //         key = obj.key;
    //     }
    //     ret = this.GetImageSync(key);
    //     if (obj != null) {
    //         if (obj.success != null) {
    //             obj.success(ret);
    //         }
    //     }
    // },


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

