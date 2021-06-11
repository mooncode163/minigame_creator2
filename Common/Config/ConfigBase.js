
//var Source = require("Source");
//var LoadItemInfo = require("LoadItemInfo");
//creator 解析json： https://blog.csdn.net/foupwang/article/details/79660524
var ConfigBase = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {
        // 声明静态变量   
    },
    properties: { 
        countLoad: 0,
        listItem: {
            default: [],
            type: cc.Object
        },
        rootJson: null,
        fileJson: "",

    }, 
 
    /*
        {  
        success: function (p) {
        },
        fail: function (p) {
        }, 
        }
        */
    Load: function (obj) {
        this.countLoad = 0;
        if (this.listItem.length == 0) {
            if (obj.success != null) {
                obj.success(this);
            }
            return;
        }


        this.listItem.forEach(function (item, index) {
            item.Load(
                {
                    success: function (p) {
                        this.OnFinish(obj, false);
                    }.bind(this),
                    fail: function () {
                        this.OnFinish(obj, true);
                    }.bind(this),
                });
        }.bind(this));


       

    },
    OnFinish: function (obj, isFail) {
        this.countLoad++;
        if (this.countLoad >= this.listItem.length) {

            if (isFail) {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            } else {
                if (obj.success != null) {
                    obj.success(this);
                }
            }
        }
    },


});

// Config.main = new Config();


//单例对象 方法二
ConfigBase._main = null;
ConfigBase.main = function () {
    if (!ConfigBase._main) {
        cc.Debug.Log("_main is null");
        ConfigBase._main = new ConfigBase();
        //ConfigBase._main.Load(null);

    } else {
        //cc.Debug.Log("_main is not null");
    }
    return ConfigBase._main;
}

cc.ConfigBase = module.export = ConfigBase;

