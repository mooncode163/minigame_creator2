var Dictionary = require("Dictionary"); 
var ResManager = cc.Class({ 
    extends: cc.Object,
    statics: {
        // 声明静态变量 
     
    },
    properties: { 
    }, 
    Load: function (filepath) {
        //去除后缀
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        cc.resources.load(key, function (err, data) {
            
        }.bind(this));
 
    },
    LoadUrl: function (url) { 
        cc.assetManager.loadRemote({ url: url, type: "json" }, function (err, data) {
            
        }.bind(this));
    },

}); 
//单例对象 方法二
ResManager._main = null; 
ResManager.main = function () {
    if (!ResManager._main) { 
        ResManager._main = new ResManager();  
    } else { 
    } 
    return ResManager._main;
}

cc.ResManager = module.export = ResManager;

