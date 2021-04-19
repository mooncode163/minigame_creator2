var UIView = require("UIView");

var UIViewPop = cc.Class({
    extends: UIView,
    editor: CC_EDITOR && {
        menu: "UIKit/PopUp/UIViewPop",
        help: " ",
        // inspector: ' ',
    },

    properties: {

    },

    onLoad: function () {
        this._super();
        this.LayOut();
    },
    start: function () {
        this._super();
        this.LayOut();
        this.node.active = false;
        this.scheduleOnce(this.ShowInitAnimate, 0.1); 
    },
    update: function () { 
        // this.LayOut();
    },

    ShowInitAnimate: function () { 
        var nodePop = this.node;
        this.node.active = true;
        nodePop.scaleX = 0;
        nodePop.scaleY = 0;
           //delay延时
        // var time = cc.delayTime(2);
        var duration = cc.PopUpManager.ANIMATE_DURATION;
        var actionTo1 = cc.scaleTo(duration / 2, 1.2);
        var actionTo2 = cc.scaleTo(duration / 2, 1); 
        var seq = cc.sequence([actionTo1, actionTo2, cc.callFunc(function () {
            // this.DoClickItem(event, customEventData);
            this.LayOut();
        }.bind(this))]);
        nodePop.runAction(seq);
    },

    Close() {
        // AudioPlay.main.PlayFile(AppRes.Audio_PopupClose);
        // if (onClose != null) {
        //     onClose.Invoke();
        // } 
        // PopUpManager.main.ClosePopup();
        // if (animator != null) {
        //     animator.Play("Close");
        //     StartCoroutine(DestroyPopup());
        // }
        // else {
        //     DoClose();
        // }

        cc.PopUpManager.main().ClosePopup();
     
    },


    DoClose() {
        // PopUpManager.main.OnClose();
        // DestroyImmediate(gameObject);
        this.node.destroy();
    },
 

});

cc.UIViewPop = module.export = UIViewPop;


