var UIView = require("UIView");


var UISprite = cc.Class({
    extends: UIView,//cc.Component,
    editor: CC_EDITOR && {
        menu: "UIKit/UISprite/UISprite",
        help: " ",
        // inspector: ' ',
    },
    statics: {

    },
    properties: {
        sprite: cc.Sprite,
        keyImage2: "",
    },


    onLoad: function () {
        this._super();
        this.UpdateImageKey(this.keyImage);
    },



    /*
      { 
          pic: "",
          def: "",
          type:cc.Sprite.Type.SIMPLE,//SLICED
          left:0,
          right:0,
          top:0,
          bottom:0,
          success: function () {
          },
          fail: function () {
          }, 
      }
  */

    UpdateImageKey: function (key) {
        //this.keyImage = key;
        var pic = this.GetImageOfKey(key);
        var board = null;
        if (cc.ImageRes.main().IsHasBoard(key)) {
            board = cc.ImageRes.main().GetImageBoard(key);
        }
        if (!cc.Common.isBlankString(pic)) {
            this.UpdateImageObj({
                // pic: cc.CloudRes.main().uiRootPath + "/" + pic,
                pic:pic,
                type: board ? cc.Sprite.Type.SLICED : cc.Sprite.Type.SIMPLE,//SLICED
                left: board ? board.x : 0,
                right: board ? board.y : 0,
                top: board ? board.z : 0,
                bottom: board ? board.w : 0,
                success: function () {
                    this.LayOut();
                }.bind(this),
            });
        }
    },

    UpdateImage: function (pic,board=null) {
        if (!cc.Common.isBlankString(pic)) {
            this.UpdateImageObj({
                // pic: cc.CloudRes.main().uiRootPath + "/" + pic,
                pic:pic,
                type: board ? cc.Sprite.Type.SLICED : cc.Sprite.Type.SIMPLE,//SLICED
                left: board ? board.x : 0,
                right: board ? board.y : 0,
                top: board ? board.z : 0,
                bottom: board ? board.w : 0,
                success: function () {
                    this.LayOut();
                }.bind(this),
            });
        }
    }
    ,
    UpdateImageObj: function (obj) {
        cc.TextureUtil.UpdateSpriteImage({
            sprite: this.sprite,
            pic: obj.pic,
            type: obj.type,//SLICED
            left: obj.left,
            right: obj.right,
            top: obj.top,
            bottom: obj.bottom,
            success: function () {
                if (obj.success != null) {
                    obj.success();
                }
                if (this.objCallBack != null) {
                    this.objCallBack.OnUpdateImageFinish(this);
                }
            }.bind(this),
            fail: function () {
                if (obj.fail != null) {
                    obj.fail();
                }
            }.bind(this),
        });
    },

    UpdateImage2: function (pic,type=cc.Sprite.Type.SIMPLE) {
        this.UpdateImage({
            pic: pic,
            type: type,// 
            success: function () {
                this.LayOut();
                // cc.AppSceneBase.main().LayOut();
                
            }.bind(this),
        });
    },


    LayOut() {
        this._super();
    },

});

cc.UISprite = module.export = UISprite;



