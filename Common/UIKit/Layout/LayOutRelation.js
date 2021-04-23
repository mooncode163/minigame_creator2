
var LayOutRelationType = cc.Enum({
    //区分大小写 
    NONE: 0,// 
    PARENT: 1,//相对父窗口 
    TARGET: 2,//相对目标 
});

//相对布局 位于target的左边 右边 下边 上边
var LayOutRelation = cc.Class({
    extends: cc.LayOutBase,//HorizontalOrVerticalLayoutBase

    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutRelation",
        help: " ",
        // inspector: ' ',
    },
    statics: {
        //enum
        LayOutRelationType: LayOutRelationType,


    },
    properties: {
        target: cc.Node,
        _type: LayOutRelationType.PARENT,
        type: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            type: LayOutRelationType,
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                return this.LayOut();
            },
        },
        _offset: cc.Vec2.ZERO,
        offset:
        {
            type: cc.Vec2,
            get: function () {
                return this._offset;
            },
            set: function (value) {
                this._offset = value;
                this.LayOut();
            },
        },
    },

    onLoad: function () {
        //  this.row = 1;
        //  this.col = this.GetChildCount(); 
        this.LayOut();

    },
    start: function () {
        this.LayOut();
    },
    LayOut: function () {
        /// this.col = this.GetChildCount(); 
        if (!this.Enable()) {
            return;
        }
        this._super();
        var x, y, w, h;
        var pt = this.node.getPosition();
        x = pt.x;
        y = pt.y;

        // var rctran = this.node.getComponent(cc.RectTransform);
        var rctran = this.node.getBoundingBox();
        // if (rctran == null) {
        //     return;
        // }
        w = rctran.width;
        h = rctran.height;
        var w_parent = 0;
        var h_parent = 0;
        // var rctranParent = this.node.parent.getComponent(cc.RectTransform);
        var rectParent = this.node.parent.getBoundingBox();
        w_parent = rectParent.width;
        h_parent = rectParent.height;
        // if (rctranParent != null)
        // {
        //       w_parent = rctranParent.width;
        //       h_parent = rctranParent.height;
        // }

        cc.Debug.Log("this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " w=" + w);
        switch (this.type) {
            case LayOutRelationType.PARENT:
                {

                    if (this.align == cc.Align.LEFT) {
                        x = - w_parent / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == cc.Align.RIGHT) {
                        x = w_parent / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == cc.Align.UP) {
                        cc.Debug.Log("Align.UP this.type=" + this.type + " w_parent=" + w_parent + " h_parent=" + h_parent + " h=" + h);
                        y = h_parent / 2 - h / 2 - this.offset.y;
                    }
                    if (this.align == cc.Align.DOWN) {
                        y = - h_parent / 2 + h / 2 + this.offset.y;
                    }
                    // x =   w_parent / 2;

                }
                break;
            case LayOutRelationType.TARGET:
                {
                    if (this.target == null) {
                        break;
                    }
                    var rctranTarget = this.target.getComponent(cc.RectTransform);
                    if (rctranTarget == null) {
                        break;
                    }
                    var ptTarget = this.target.getPosition();
                    //位于target的左边
                    if (this.align == cc.Align.LEFT) {
                        x = ptTarget.x - rctranTarget.width / 2 - w / 2 - this.offset.x;
                    }
                    if (this.align == cc.Align.RIGHT) {
                        x = ptTarget.x + rctranTarget.width / 2 + w / 2 + this.offset.x;
                    }
                    if (this.align == cc.Align.UP) {
                        y = ptTarget.y + rctranTarget.height / 2 + h / 2 + this.offset.y;
                    }
                    if (this.align == cc.Align.DOWN) {
                        y = ptTarget.y - rctranTarget.height / 2 - h / 2 - this.offset.y;
                    }

                    //相同位置
                    if (this.align == cc.Align.SAME_POSTION) {
                        x = ptTarget.x;
                        y = ptTarget.y;
                    }

                }
                break;

        }
        if (this.enableOffsetAdBanner) {

            y += cc.AdKitCommon.main.heightCanvasAdBanner;
        }

        this.node.setPosition(x, y);

    },


});

cc.LayOutRelation = module.export = LayOutRelation;
