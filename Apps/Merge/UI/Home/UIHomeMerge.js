var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes"); 
var GameViewController = require("GameViewController"); 

cc.Class({
    extends: UIHomeBase,
    properties: { 
        imageLogo: cc.UIImage, 

        
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;
    // this.node.setContentSize(cc.Common.appSceneMain.sizeCanvas); 
        //物理系统默认是关闭的，手动开启物理系统 
        cc.Common.EnablePhysic(true, false);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
      
        // var info = cc.GameLevelParse.main().GetLastItemInfo();
        // var pic = cc.GameLevelParse.main().GetImagePath(info.id);
     

        // this.imageLogo.UpdateImage2(pic);
        cc.Debug.Log("UIHomeMerge onLoad");
        this.LayOut();  
        // this.LoadCenterBar();
        this.LoadSideBar();

    },

    start: function () {
        this._super();
    },

    LayOut: function () {
        this._super();
       
    },



});

