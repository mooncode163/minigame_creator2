var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes"); 
var GameViewController = require("GameViewController"); 
var UIHomeCenterBar = require("UIHomeCenterBar");

cc.Class({
    extends: UIHomeBase,
    properties: { 
        imageLogo: cc.UIImage, 
        uiCenterBar: UIHomeCenterBar,
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;

        //物理系统默认是关闭的，手动开启物理系统 
        cc.Common.EnablePhysic(true, false);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
      
        // var info = cc.GameLevelParse.main().GetLastItemInfo();
        // var pic = cc.GameLevelParse.main().GetImagePath(info.id);
     

        // this.imageLogo.UpdateImage2(pic);
        
        this.LayOut();  



    },

    start: function () {
        this._super();
    },

    LayOut: function () {
        this._super();
       
    },

      

});

