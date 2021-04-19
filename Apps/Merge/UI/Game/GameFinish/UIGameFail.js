// var UIViewController = require("UIViewController");
var UIView = require("UIView");
var UIViewPop = require("UIViewPop");
var UIGameFail = cc.Class({
    extends: UIViewPop,
    statics: {
        
    },

    properties: {
        textTitle: cc.Component,
        textMsg: cc.Component,
        textAgain: cc.Component,
       
    },
    onLoad: function () {
        this._super(); 
         this.LayOut();  

        this.textTitle.text = cc.Language.main().GetString("STR_GameFail_TITLE");
        this.textMsg.text = cc.Language.main().GetString("STR_GameFail_Detail");
        this.textAgain.text = cc.Language.main().GetString("Restart");
    },
    start: function () {
        this._super();
        this.LayOut();

        
    },

    LayOut: function () {
        this._super();
        var ratio = 0.8;
        var w = this.node.parent.getContentSize().width*ratio;
        var h = this.node.parent.getContentSize().height*ratio;
        this.node.setContentSize(new cc.size(w,h));
        // this.node.setContentSize(this.node.parent.getContentSize()*ratio);
        this._super();
    },
   
   
    OnClickBtnAgain: function (event, customEventData) {
        this.Close();
        cc.GameManager.main().GotoPlayAgain();
    },
 

});
