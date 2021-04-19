var UIViewController = require("UIViewController");
var UIView = require("UIView"); 
var UIMergeItem = require("UIMergeItem");

var UIDeadLine = cc.Class({
    extends: UIView,
    statics: {
        
    },

    properties: { 
        //  public UISprite uiLine; 
        t:0,
        isGameFail:false,
    },
    onLoad: function () {
        this._super(); 
        this.node.name = cc.GameData.NameDeadLine;
        this.t = 0;
        this.isGameFail = false;
    },
    start: function () {
        this._super();
    }, 
  
    onCollisionEnter: function(other, self) {
        // console.log(other, self);
        this.t = 0; 
        console.log('UIDeadLine onCollisionEnter enter')
    },
    onCollisionStay: function(other, self) {
       
    },
    onCollisionExit: function(other, self) {
        console.log('UIDeadLine 现在刚离开')
    },

 

     // 只在两个碰撞体开始接触时被调用一次
     onBeginContact: function (contact, selfCollider, otherCollider) {
        this.t = 0; 
        
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        
    },

    // 每次将要处理碰撞体接触逻辑时被调用 碰撞持续,接触时被调用;
    onPreSolve: function (contact, selfCollider, other) {

        console.log('UIDeadLine onPreSolve');
        // this.t += cc.director.getDeltaTime();

        // if (other.node.name != cc.GameData.main().NameBoardLine)
        // {
        //     cc.Debug.Log("OnTriggerStay2D t=" + this.t + " name=" + other.node.name);
        //     var ui = other.node.getComponent(UIMergeItem);
        //     if (ui != null)
        //     {
        //         if (ui.isNew)
        //         {
        //             this.t = 0;
        //         }
        //         if (this.t >= 2.0)
        //         {
             
        //             this.t = 0;
        //             if (!this.isGameFail)
        //             {
        //                 this.isGameFail = true;
        //                 // cc.UIGameMerge.main().OnGameFinish(true);
        //             }
        //         }
        //     }


        // }
    },

    // 每次处理完碰撞体接触逻辑时被调用 碰撞接触更新完后调用,可以获得冲量信息
    onPostSolve: function (contact, selfCollider, otherCollider) {
    }
});
