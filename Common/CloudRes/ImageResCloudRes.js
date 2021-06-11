  
var ImageResCloudRes = cc.Class({
    //cc.js.getClassName
    extends: cc.ConfigBase,
    statics: {
        // 声明静态变量

    },
    properties: {
        // ImageResInternal
        imageResCommon: null, 

    },
    Init:function() { 
       var strDir = "/Common/UI"  
       var fileName = "ImageRes.json";
       this.listItem = [];
        {
            this.imageResCommon = new cc.ImageResInternal();
            this.imageResCommon.fileJson = strDir + "/" + fileName;
            this.listItem.push(this.imageResCommon);
        } 
    }, 
    
    GetImageBoardString:function(path) {
        var ret = "";
        this.listItem.forEach((item) => {
            var p = item;// as ImageResInternal;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    var key = p.FindKeyByPath(path);
                    if (!Common.BlankString(key)) {
                        ret = p.GetImageBoardString(key);
                    }
                }
            } else {
                return ret;
            }

        });

 
        return ret;
    },

    IsHasBoard:function(key) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item;// as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasBoard(key);
                }
            } else {
                return ret;
            }
        });
 


        return ret;
    },


    IsContainsKey:function(key) {
        var ret = false;
        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item;// as ImageResInternal;
            if (ret == false) {
                if (p != null) {
                    ret = p.IsHasKey(key);
                }
            } else {
                return ret;
            }
        });

        
        return ret;
    },

    GetImage:function(key) {
        var ret = "";

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item;
            if (Common.BlankString(ret)) {
                if (p != null) {
                    ret = p.GetImage(key); 
                }
            } else {
                return;
            }
        });
 

        return ret;
    },



    GetImageBoard:function(key) {
        var ret = Vec4.ZERO;

        if (Common.BlankString(key)) {
            return ret;
        }
        this.listItem.forEach((item) => {
            var p = item;// as cc.ImageResInternal;
            // Debug.Log("GetImageBoard ScoreBg 0 ret="+ret);
            if ((ret.x == 0)&&(ret.y == 0)&&(ret.z == 0)&&(ret.w == 0)) {
                if (p != null) {
                    ret = p.GetImageBoard(key);
                    // Debug.Log("GetImageBoard ScoreBg 2 ret="+ret);
                }
            } else {
                // Debug.Log("GetImageBoard ScoreBg 1 ret="+ret);
                return;
            }
        });
 

        return ret;
    },



}); 

//单例对象 方法二
ImageResCloudRes._main = null;
ImageResCloudRes.main = function () {
    if (!ImageResCloudRes._main) {
        ImageResCloudRes._main = new ImageResCloudRes();
        ImageResCloudRes._main.Init();
    }
    return ImageResCloudRes._main;
}

cc.ImageResCloudRes = module.export = ImageResCloudRes;

