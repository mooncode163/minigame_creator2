var UIView = require("UIView");
//var LayoutAlign = require("LayoutAlign");
 

var RectTransform = cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/RectTransform",
        help: " ",
        // inspector: ' ',
    },

    statics: {
        //enum
         
    },

    properties: { 
        //     The offset of the lower left corner of the rectangle relative to the lower left
        //     anchor.
        _offsetMin: cc.Vec2,
        offsetMin:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMin;
            },
            set: function (value) {
                this._offsetMin = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },

        _offsetMax: cc.Vec2,
        //     The offset of the upper right corner of the rectangle relative to the upper right
        //     anchor.
        offsetMax:
        {
            type: cc.Vec2,
            get: function () {
                return this._offsetMax;
            },
            set: function (value) {
                this._offsetMax = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },


        //     The normalized position in the parent RectTransform that the lower left corner
        //     is anchored to.
        _anchorMin: cc.Vec2,
        anchorMin:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchorMin;
            },
            set: function (value) {
                this._anchorMin = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },

        //     The normalized position in the parent RectTransform that the upper right corner
        //     is anchored to.
        _anchorMax: cc.Vec2,
        anchorMax:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchorMax;
            },
            set: function (value) {
                this._anchorMax = value;
                // this.UpdateType(this.sizeType, true);
                // this.UpdateType(this.sizeType, false);
                this.LayOut();
            },
        },



        //     The position of the pivot of this RectTransform relative to the anchor reference
        //     point. 
        _anchoredPosition: cc.Vec2,
        anchoredPosition:
        {
            type: cc.Vec2,
            get: function () {
                return this._anchoredPosition;
            },
            set: function (value) {
                this._anchoredPosition = value;
            },
        },
 

        _width: 0,
        width:
        {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
                //this.UpdateType(this.sizeType);
            },
        },
        _height: 0,
        height:
        {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
                // this.UpdateType(this.sizeType);
            },
        },

    },
    onLoad: function () { 
        this.LayOut();

    },

    start: function () {
        this.LayOut();
    },

    LayOut: function () { 
        
        var x, y, w, h;
        w = this.node.getContentSize().width;
        h = this.node.getContentSize().height;
        this.width = w;
        this.height = h;
        //cc.Debug.Log("OnResize w=" + w + " h=" + h);

        var children = this.node._children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var rctran = child.getComponent(RectTransform);
            if (rctran != null) {
                // cc.Debug.Log("OnResize child");
                rctran.LayOut();
            }

        }

        //align
        // var lA = this.node.getComponent(LayoutAlign);
        // if (lA != null) {
        //     lA.UpdateType(lA.alignType);
        // }

        // this.UpdateAlign(this.alignType);

        var view = this.node.getComponent(UIView);
        if (view != null) {
            // cc.Debug.Log("OnResize child");
            view.LayOutDidFinish();
        }
    },

     
});
cc.RectTransform = module.export = RectTransform;

