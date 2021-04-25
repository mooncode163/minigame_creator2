var Dictionary = require("Dictionary");
var ResManager = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量 

    },
    properties: {
    },


    /*
  {
      filepath:"", 
      success: function (p,data) {
      }.bind(this),
      fail: function (p,error) {
      }.bind(this), 
  }
  */
    Load: function (obj) {
        //去除后缀
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(obj.filepath);
        cc.resources.load(key, function (err, data) {
            if (data == null) {
                // Bundle resources doesn't contain 1
                console.log("ResManager Load err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(this, err);
                }
            } else {
                // console.log("ResManager Load is not null");
                if (obj.success != null) {
                    obj.success(this, data);
                }
            }
        }.bind(this));

    },

      /*
  {
      url:"", 
      success: function (p,data) {
      }.bind(this),
      fail: function (p,error) {
      }.bind(this), 
  }
  */
//  http://docs.cocos.com/creator/manual/zh/scripting/dynamic-load-resources.html
    LoadUrl: function (obj) { 
        cc.assetManager.loadRemote(obj.url, function (err, data) {
            if (data == null) {
                // Bundle resources doesn't contain 1
                console.log("ResManager LoadUrl err:" + err.message || err);
                if (obj.fail != null) {
                    obj.fail(this, err);
                }
            } else {
                console.log("ResManager LoadUrl success");
                if (obj.success != null) {
                    obj.success(this, data);
                }
            }
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

