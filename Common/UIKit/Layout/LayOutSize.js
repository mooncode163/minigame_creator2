
var LayOutSizeType = cc.Enum({
    //区分大小写  

    MATCH_CONTENT: 0,//按内容设置
    MATCH_PARENT: 1,//与父窗口等大或者按比例 
    MATCH_TARGET: 2,//与目标等大或者按比例 
    MATCH_PARENT_MIN: 3,//父窗口width 和 height 的 min
    MATCH_PARENT_MAX: 4,//父窗口width 和 height 的 max
    MATCH_WIDTH: 5,//width 和 height 相等
    MATCH_HEIGHT: 6,//width 和 height相等
    BETWEEN_SIDE_TARGET: 7,//夹在边界和target之间
    BETWEEN_TWO_TARGET: 8,//夹在两个target之间

    // 和widht height同步
    MATCH_VALUE: 9,

    // 和widht height同步 canvas大小
    MATCH_VALUE_Canvas: 10,
});



var LayOutSizeSideType = cc.Enum({
    //区分大小写  
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
});

var LayOutSize = cc.Class({
    extends: cc.LayOutBase,
    editor: CC_EDITOR && {
        menu: "UIKit/Layout/LayOutSize",
        help: " ",
        // inspector: ' ',
    },
    statics: {
        //enum
        LayOutSizeType: LayOutSizeType,
        LayOutSizeSideType: LayOutSizeSideType,
    },

    properties: {


        target: cc.Node,
        target2: cc.Node,
        ratio: 1,

        ratioW: 1.0,//宽
        ratioH: 1.0,//高 

        // 横屏参数
        widthH: 1.0,//宽
        heightH: 1.0,//高  
        _sideType: LayOutSizeSideType.UP,
        sideType: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            type: LayOutSizeSideType,
            get: function () {
                return this._sideType;
            },
            set: function (value) {
                this._sideType = value;
                return this.LayOut();
            },
        },

        _width: 1.0,
        width: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            // type: LayOutSizeType,
            get: function () {
                if (this.IsUseLandscape()) {
                    return this.widthH;
                }
                return this._width;
            },
            set: function (value) {
                if (this.IsUseLandscape()) {
                    this.widthH = value;
                } else {
                    this._width = value;
                }
                return this.LayOut();
            },
        },

        _height: 1.0,
        height: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            //    type: LayOutSizeType,
            get: function () {
                if (this.IsUseLandscape()) {
                    return this.heightH;
                }
                return this._height;
            },
            set: function (value) {
                if (this.IsUseLandscape()) {
                    this.heightH = value;
                } else {
                    this._height = value;
                }
                return this.LayOut();
            },
        },


        _typeX: LayOutSizeType.MATCH_PARENT,
        typeX: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            type: LayOutSizeType,
            get: function () {
                return this._typeX;
            },
            set: function (value) {
                this._typeX = value;
                return this.LayOut();
            },
        },


        _typeY: LayOutSizeType.MATCH_PARENT,
        typeY: {
            //default 和 get set 不能同时存在
            // default:cc.AlignUP, 
            type: LayOutSizeType,
            get: function () {
                return this._typeY;
            },
            set: function (value) {
                this._typeY = value;
                return this.LayOut();
            },
        },

    },

    onLoad: function () {
        this.LayOut();
    },
    LayOut: function () {
        if (!this.Enable()) {
            return;
        }
        this._super();
        this.UpdateSize();
        if ((this.typeX == LayOutSizeType.MATCH_HEIGHT) || (this.typeY == LayOutSizeType.MATCH_WIDTH)) {
            this.UpdateSize();
        }


    },

    UpdateSizeX: function () {
        var x, y, w, h;
        var size = this.node.getContentSize();
        var sizeParent = this.node.parent.getContentSize();
        w = size.width;
        h = size.height;
        var rctran = this.node.getComponent(cc.RectTransform);

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;

        // if (rctran == null) {
        //     return;
        // }
        // w = rctran.width;
        // h = rctran.height;




        switch (this.typeX) {
            case LayOutSizeType.MATCH_CONTENT:
                {
                    w = size.width;
                }
                break;
            case LayOutSizeType.MATCH_VALUE:
                {
                    w = this.width;
                }
                break;
            case LayOutSizeType.MATCH_VALUE_Canvas:
                {
                    w = this.width;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case LayOutSizeType.MATCH_PARENT:
                {
                    w = w_parent * this.ratioW;
                }
                break;
            case LayOutSizeType.MATCH_PARENT_MIN:
                {
                    w = Math.min(w_parent, h_parent) * this.ratioW;

                }
                break;
            case LayOutSizeType.MATCH_PARENT_MAX:
                {
                    w = Math.max(w_parent, h_parent) * this.ratioW;
                }
                break;
            case LayOutSizeType.MATCH_TARGET:
                {
                    if (this.target != null) {
                        w = this.target.getContentSize().width * this.ratioW;

                    }

                }
                break;
            case LayOutSizeType.MATCH_HEIGHT:
                {
                    w = size.height;
                }
                break;

            case LayOutSizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == LayOutSizeSideType.LEFT) || (this.sideType == LayOutSizeSideType.RIGHT)) {
                        w = cc.LayoutUtil.main().GetBetweenSideAndTargetSize(this.target, this.sideType) * this.ratioW;
                    }

                }
                break;
            case LayOutSizeType.BETWEEN_TWO_TARGET:
                {
                    w = cc.LayoutUtil.main().GetBetweenTwoTargetSize(this.target, this.target2, false);

                }
                break;
        }
        cc.Debug.Log("UpdateSizeX w="+w+" h="+h);
        this.node.setContentSize(new cc.size(w, h));
    },



    UpdateSizeY: function () {
        var x, y, w, h;
        var size = this.node.getContentSize();
        var sizeParent = this.node.parent.getContentSize();
        w = size.width;
        h = size.height;
        var rctran = this.node.getComponent(cc.RectTransform);

        var w_parent = sizeParent.width;
        var h_parent = sizeParent.height;

        // if (rctran == null) {
        //     return;
        // }
        // w = rctran.width;
        // h = rctran.height;




        switch (this.typeX) {
            case LayOutSizeType.MATCH_CONTENT:
                {
                    h = size.height;
                }
                break;
            case LayOutSizeType.MATCH_VALUE:
                {
                    h = this.height;
                }
                break;
            case LayOutSizeType.MATCH_VALUE_Canvas:
                {
                    h = this.height;
                    //  if (IsSprite())
                    // {
                    //     w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, width);
                    // }
                    //    x = rctran.anchoredPosition.x;
                }
                break;

            case LayOutSizeType.MATCH_PARENT:
                {
                    h = h_parent * this.ratioH;
                }
                break;
            case LayOutSizeType.MATCH_PARENT_MIN:
                {
                    h = Math.min(w_parent, h_parent) * this.ratioH;

                }
                break;
            case LayOutSizeType.MATCH_PARENT_MAX:
                {
                    h = Math.max(w_parent, h_parent) * this.ratioH;
                }
                break;
            case LayOutSizeType.MATCH_TARGET:
                {
                    if (this.target != null) {
                        h = this.target.getContentSize().height * this.ratioH;

                    }

                }
                break;
            case LayOutSizeType.MATCH_WIDTH:
                {
                    h = size.width;
                }
                break;

            case LayOutSizeType.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == LayOutSizeSideType.UP) || (this.sideType == LayOutSizeSideType.DOWN)) {
                        h = cc.LayoutUtil.main().GetBetweenSideAndTargetSize(this.target, this.sideType) * this.ratioH;
                    }

                }
                break;
            case LayOutSizeType.BETWEEN_TWO_TARGET:
                {
                    h = cc.LayoutUtil.main().GetBetweenTwoTargetSize(this.target, this.target2, true);

                }
                break;
        }
        cc.Debug.Log("UpdateSizeY w="+w+" h="+h);
        this.node.setContentSize(new cc.size(w, h));
    },
    UpdateSize: function () {
        this.UpdateSizeX();
        this.UpdateSizeY();
        /*
        float x = 0, y = 0, w = 0, h = 0;
        RectTransform rctranParent = this.transform.parent as RectTransform;
        if (rctranParent == null)
        {
            return;
        }
        RectTransform rctran = this.transform as RectTransform;
        var w_parent = rctranParent.rect.width;
        var h_parent = rctranParent.rect.height;
        w = rctran.rect.width;
        h = rctran.rect.height;
        if (this.gameObject.name == "Board")
        {

            Debug.Log("Board w_parent = " + w_parent + " h_parent=" + h_parent + " cam=" + Common.GetWorldSize(AppSceneBase.main.mainCamera));
        }
        switch (this.typeX)
        {
            case Type.MATCH_CONTENT:
                {
                    w = rctran.rect.width;
                    x = rctran.anchoredPosition.x;
                }
                break;
            case Type.MATCH_VALUE:
                {
                    w = width;
                    x = rctran.anchoredPosition.x;
                }
                break;
           case Type.MATCH_VALUE_Canvas:
                {
                    w = width;
                     if (IsSprite())
                    {
                        w= Common.CanvasToWorldWidth(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, width);
                    }
                   x = rctran.anchoredPosition.x;
                }
                break;
            case Type.MATCH_PARENT:
                {
                    w = w_parent * ratioW;
                    x = rctran.anchoredPosition.x;
                }
                break;
            case Type.MATCH_PARENT_MIN:
                {
                    w = Mathf.Min(w_parent, h_parent) * ratioW;
                    x = rctran.anchoredPosition.x;
                }
                break;
            case Type.MATCH_PARENT_MAX:
                {
                    w = Mathf.Max(w_parent, h_parent) * ratioW;
                    x = rctran.anchoredPosition.x;
                }
                break;
            case Type.MATCH_TARGET:
                {
                    if (this.target != null)
                    {
                        RectTransform rctranTarget = this.target.GetComponent<RectTransform>();
                        Vector2 ptTarget = rctranTarget.anchoredPosition;//this.target.getPosition();
                        w = rctranTarget.rect.width * ratioW;
                        x = rctran.anchoredPosition.x;
                    }

                }
                break;
            case Type.MATCH_HEIGHT:
                {
                    w = rctran.rect.height;
                }
                break;

            case Type.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.LEFT) || (this.sideType == SideType.RIGHT))
                    {
                        w = LayoutUtil.main.GetBetweenSideAndTargetSize(this.target, this.sideType) * ratioW;
                    }

                }
                break;
            case Type.BETWEEN_TWO_TARGET:
                {
                    w = LayoutUtil.main.GetBetweenTwoTargetSize(this.target, this.target2, false);

                }
                break;
        }

        switch (this.typeY)
        {
            case Type.MATCH_CONTENT:
                {
                    h = rctran.rect.height;
                    y = rctran.anchoredPosition.y;
                }
                break;
            case Type.MATCH_VALUE:
                {
                    h = height;
                    y = rctran.anchoredPosition.y;
                }
                break;
           case Type.MATCH_VALUE_Canvas:
                {
                    h = height;
                     if (IsSprite())
                    {
                    h= Common.CanvasToWorldHeight(AppSceneBase.main.mainCamera, AppSceneBase.main.sizeCanvas, height);
                    }
                    y = rctran.anchoredPosition.y;
                }
                break;
                
            case Type.MATCH_PARENT:
                {
                    h = h_parent * ratioH;
                    y = rctran.anchoredPosition.y;
                }
                break;
            case Type.MATCH_PARENT_MIN:
                {
                    h = Mathf.Min(w_parent, h_parent) * ratioH;
                    y = rctran.anchoredPosition.y;
                }
                break;
            case Type.MATCH_PARENT_MAX:
                {
                    h = Mathf.Max(w_parent, h_parent) * ratioH;
                    y = rctran.anchoredPosition.y;
                }
                break;
            case Type.MATCH_TARGET:
                {
                    if (this.target != null)
                    {
                        RectTransform rctranTarget = this.target.GetComponent<RectTransform>();
                        Vector2 ptTarget = rctranTarget.anchoredPosition;//this.target.getPosition();
                        h = rctranTarget.rect.height * ratioH;
                        y = rctran.anchoredPosition.y;
                    }

                }
                break;
            case Type.MATCH_WIDTH:
                {
                    h = rctran.rect.width;
                }
                break;

            case Type.BETWEEN_SIDE_TARGET:
                {

                    if ((this.sideType == SideType.UP) || (this.sideType == SideType.DOWN))
                    {
                        h = LayoutUtil.main.GetBetweenSideAndTargetSize(this.target, this.sideType) * ratioH;
                    }

                }
                break;
            case Type.BETWEEN_TWO_TARGET:
                {
                    h = LayoutUtil.main.GetBetweenTwoTargetSize(this.target, this.target2, true);

                }
                break;

        }

        w -= (this.offsetMin.x + this.offsetMax.x);
        h -= (this.offsetMin.y + this.offsetMax.y);

        if (enableOffsetAdBanner)
        {

            if (IsSprite())
            {
                h -= AdKitCommon.main.heightAdWorld;
            }
            else
            {
                h -= AdKitCommon.main.heightAdCanvas;
            }
        }

        switch (this.typeWidthHeightScale)
        {
            case TypeWidthHeightScale.MIN:
                {
                    w = Mathf.Min(w, h);
                    h = w;
                }
                break;

            case TypeWidthHeightScale.MAX:
                {
                    w = Mathf.Max(w, h);
                    h = w;
                }
                break;

        }

        rctran.sizeDelta = new Vector2(w, h);
        */
    },
});

cc.LayOutSize = module.export = LayOutSize;