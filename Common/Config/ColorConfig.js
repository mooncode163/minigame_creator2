var Dictionary = require("Dictionary");
// var Common = require("Common");
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ColorConfig = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量   
    },
    properties: {
        colorApp: null, 
        countLoad:0,
        countMax:1,
    },
    OnFinish: function (obj)
    {
        this.countLoad++;
        if(this.countLoad>=this.countMax)
        {
            if(obj.success!=null)
            {
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
        var filepath = cc.Common.RES_CONFIG_DATA + "/Color/Color.json";//.json 
        this.colorApp = new cc.ColorConfigInternal(); 
        this.colorApp.Load(  
            { 
            filepath:filepath,
            success: function (p) {
                this.OnFinish(obj); 
            }.bind(this),
            fail: function () {
                this.OnFinish(obj); 
            }, 
            });
    },
 
 
    GetColor(key) {
       return this.colorApp.GetColorSync(key);
    },

    

});

// Config.main = new Config();


//单例对象 方法二
ColorConfig._main = null;
ColorConfig.main = function () {
    if (!ColorConfig._main) {
        cc.Debug.Log("_main is null");
        ColorConfig._main = new ColorConfig();
        //ColorConfig._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ColorConfig._main;
}

cc.ColorConfig = module.export = ColorConfig;

