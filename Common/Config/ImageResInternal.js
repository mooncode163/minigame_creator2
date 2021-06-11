var Dictionary = require("Dictionary");  
var ImageResInternal = cc.Class({ 
    extends: cc.ConfigInternalBase,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
        KEY_BOARD: "board", 
        KEY_PATH: "path",  
    },
    properties: { 
        infoPreload:null,
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
    // Load: function (obj) {
    //     var filepath = obj.filepath;
    //     if(filepath=="undefined")
    //     {
    //         filepath = this.fileJson;
    //     }
    //     cc.Debug.Log("ImageRes:filepath =" + filepath);
    //     // /*
    //     // if (cc.Common.main().isWeiXin) {
    //     //     // 加载json文件
    //     //     cc.assetManager.loadRemote({ url: filepath, type: "json" }, function (err, rootJson) {
    //     //         this.ParseData(rootJson);
    //     //         // this.GetImageInternal(obj);
    //     //         if(obj.success!=null)
    //     //         {
    //     //             obj.success(this);
    //     //         }
    //     //     }.bind(this));
    //     // } else 
    //     {
    //         //cc.JsonAsset   cc.loader.load
    //         //去除后缀
    //         filepath = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
    //         cc.resources.load(filepath, function (err, rootJson) {
    //             this.ParseData(rootJson.json);
    //             // this.GetImageInternal(obj);
    //             if(obj.success!=null)
    //             {
    //                 obj.success(this);
    //             }
    //         }.bind(this));
 
    //     }
    //     // */
    // },

 


    // 255,100,200,255 to color return cc.Vec4  47,47,47,255
    //cc.Vec4 (left,right,top,bottom)
    String2Vec4: function (str) {
        var x, y, z, w;
        var strsplit = ",";
        var list = str.split(strsplit);
        var index = 0;
        for (let value of list) {
            if (index == 0) {
                x = parseInt(value);
            }
            if (index == 1) {
                y = parseInt(value);
            }
            if (index == 2) {
                z = parseInt(value);
            }
            if (index == 3) {
                w = parseInt(value);
            }
            index++;
        }
        var ret = new cc.Vec4(x, y, z, w);
        return ret;
    },

    //同步 synchronization
    GetImage(key) {
        return cc.JsonUtil.GetItem(this.rootJson[key], ImageResInternal.KEY_PATH, ""); 
    },

    IsHasBoard(key) { 
        if (!this.ContainsKey(key))
        {
            return false;
        }
        return cc.JsonUtil.ContainsKey(this.rootJson[key], ImageResInternal.KEY_BOARD);
    },

    //9宫格图片边框参数 (left,right,top,bottom)
    //cc.Vec4 (left,right,top,bottom)
    GetImageBoard(key) {
        var str = cc.JsonUtil.GetItem(this.rootJson[key], ImageResInternal.KEY_BOARD, "");
        return this.String2Vec4(str);
    },
    ContainsKey(key)
    { 
        return cc.JsonUtil.ContainsKey(this.rootJson, key);
    },
  
 

});

// Config.main = new Config();


//单例对象 方法二
ImageResInternal._main = null;
ImageResInternal.main = function () {
    if (!ImageResInternal._main) {
        cc.Debug.Log("_main is null");
        ImageResInternal._main = new ImageResInternal();
        //ImageResInternal._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ImageResInternal._main;
}

cc.ImageResInternal = module.export = ImageResInternal;

