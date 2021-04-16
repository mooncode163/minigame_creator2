var UIViewController = require("UIViewController");
var UIView = require("UIView");
var UIMergeItem = cc.Class({
    extends: UIView,
    statics: { 
    },

    properties: {   
        nodeItem:cc.Node,

        spriteItem: {
            default: null,
            type: cc.UISprite
        },
        
        isNew:false,
        type:0,
    },
    onLoad: function () {
        this._super(); 

        var collider = this.node.getComponent(cc.PhysicsBoxCollider);
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);
    },
    start: function () {
        this._super();
    },  

    UpdateImage: function (pic) {
        this.spriteItem = this.nodeItem.getComponent(cc.UISprite);
         this.spriteItem.UpdateImage(pic);
    }, 
    
    EnableGravity: function (isEnable) {
        var bd = this.node.getComponent(cc.RigidBody);
        // bd.bodyType = isEnable ? RigidbodyType2D.Dynamic : RigidbodyType2D.Static;
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
