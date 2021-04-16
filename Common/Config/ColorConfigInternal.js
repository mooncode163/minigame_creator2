var Dictionary = require("Dictionary");
var ColorConfigInternal = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量  
        callbackFinish: null,
    },
    properties: {
        jsonRoot: null,
        infoPreload: null,
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
        cc.Debug.Log("ColorConfig:filepath =" + filepath);
        //去除后缀
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        //cc.JsonAsset
        cc.resources.load(key, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("ColorConfig:err=" + err);
                // return;
            }
            cc.Debug.Log("ColorConfig:rootJson=" + rootJson);
            if (err == null) {
                this.jsonRoot = rootJson.json;
            }
            this.OnFinish(obj);
        }.bind(this));
    },


    RGBString2ColorA: function (strrgba) {
        var r, g, b, a;
        var strsplit = ",";
        var list = strrgba.split(strsplit);
        var index = 0;
        //cc.Debug.Log("RGBString2Color:list="+list.length);

        for (let value of list) {
            if (index == 0) {
                r = parseInt(value);
            }
            if (index == 1) {
                g = parseInt(value);
            }
            if (index == 2) {
                b = parseInt(value);
            }
            if (index == 3) {
                a = parseInt(value);
            }
            index++;
        }

        var color = new cc.Color(r, g, b, a);
        return color;
    },

    //同步 synchronization
    GetColorSync(key) {
        var cr = cc.Color.BLACK;
        // key = "PlaceItemTitle";
        // key = "APP_TYPE";
        /*
        js中的变量作为json的key 的语法：https://blog.csdn.net/xiaomanonyo/article/details/78642148
        */
        if (this.jsonRoot != null) {
            if (this.jsonRoot[key] != null) {
                var str = this.jsonRoot[key];
                cr = this.RGBString2ColorA(str);
            }
            else {
                cc.Debug.Log("ColorConfig ContainsKey no key =" + key);
            }
        }
        return cr;
    },

});

// Config.main = new Config();


//单例对象 方法二
ColorConfigInternal._main = null;
ColorConfigInternal.main = function () {
    if (!ColorConfigInternal._main) {
        cc.Debug.Log("_main is null");
        ColorConfigInternal._main = new ColorConfigInternal();
        //ColorConfig._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ColorConfigInternal._main;
}

cc.ColorConfigInternal = module.export = ColorConfigInternal;

