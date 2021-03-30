var UIViewController = require("UIViewController");  
var UIView = require("UIView");
var GameBase = require("GameBase"); 

//shu： wx621ff1107207384c
//weixin小程序appid: heng: wx2c5d3abfad26e8b1
//cocos: wx6ac3f5090a6b99c5
//weixin test app：wx844d0aa648111acb
var GameMerge = cc.Class({
    extends: GameBase,
    statics: {
      
 

    },

    properties: { 

    },
    //百度tts:  http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 
    onLoad: function () {
        this._super();
        GameMerge._main = this;
        this.node.setContentSize(this.node.parent.getContentSize());
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);

    }, 

    LayOut: function () {
        this._super();

    },

    OnTouchDown: function (pos) {
    },
    OnTouchMove: function (pos) {
    },
    OnTouchUp: function (pos) {
    },
    OnUITouchEvent: function (ev, status, event) {

        var pos = event.getLocation();//canvas坐标原点在屏幕左下角 
        var posnode = this.node.convertToNodeSpace(pos);//坐标原点在node左下角
        var posnodeAR = this.node.convertToNodeSpaceAR(pos);//坐标原点在node的锚点

        switch (status) {
            case cc.UITouchEvent.TOUCH_DOWN:
                this.OnTouchDown(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_MOVE:
                this.OnTouchMove(posnodeAR);
                break;

            case cc.UITouchEvent.TOUCH_UP:
                this.OnTouchUp(posnodeAR);
                break;
        }
    },
    
});

GameMerge._main = null;
GameMerge.main = function () {
    // 
    if (!GameMerge._main) {
        // GameMerge._main = new GameMerge();
    }
    return GameMerge._main;
}

cc.GameMerge = module.export = GameMerge;
