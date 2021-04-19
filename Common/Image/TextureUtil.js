var TextureUtil = cc.Class({
    extends: cc.Object,// cc.ItemInfo,
    properties: {

    },
    statics: {
        UpdateButtonTexture: function (btn, filepath, isUpdateSize) {
            var sp = btn.node.getComponent(cc.Sprite);
            this.UpdateImage(sp, filepath, isUpdateSize);
        },
        UpdateImage: function (image, filepath, isUpdateSize) {
            // var sp = btn.node.getComponent(cc.Sprite);
            var sp = image;
            cc.TextureCache.main.Load2(filepath, false, function (err, tex) {
                if (err) {
                    cc.Debug.Log("UpdateBtnSwitch err");
                    cc.Debug.Log(err.message || err);
                    return;
                }
                //cc.Debug.Log("UpdateBtnSwitch spriteFrame");
                if (tex == null) {
                    cc.Debug.Log("UpdateButtonTexture spriteFrame=null");
                    return;
                }
                sp.spriteFrame = new cc.SpriteFrame(tex);
            }.bind(this));

        },
        /*
         {
             sprite:cc.Sprite,
             pic: "",
             def: "",
             type:cc.Sprite.Type.SIMPLE,//SLICED
             left:0,
             right:0,
             top:0,
             bottom:0,
             success: function (tex) {
             },
             fail: function () {
             }, 
         }p
     */
        UpdateSpriteImage: function (obj) {
            var pic = cc.FileUtil.GetFileBeforeExtWithOutDot(obj.pic);
            cc.Debug.Log("UpdateSpriteImage pic=" + pic);
            cc.TextureCache.main.Load(pic, function (err, tex) {
                if (err) {
                    cc.Debug.Log("UpdateSpriteImage err=" + err);
                    if (obj.fail != null) {
                        obj.fail();
                    }
                    return;
                }
                cc.Debug.Log("UpdateSpriteImage success");
                obj.sprite.spriteFrame = new cc.SpriteFrame(tex);
                var spf = obj.sprite.spriteFrame;
               
                if (obj.type==cc.Sprite.Type.SLICED)
                 {
                    cc.Debug.Log("pic="+pic+" spf="+spf+" obj.top="+obj.top);
                    spf.type = obj.type;
                    // 纹理的四个边距
                    spf.insetBottom = obj.bottom;
                    spf.insetTop = obj.top;
                    spf.insetLeft = obj.left;
                    spf.insetRight = obj.right; 
                }

                // spf.type = cc.Sprite.Type.SLICED;
                // spf.insetBottom = 64;
                // spf.insetTop = 64;
                // spf.insetLeft = 64;
                // spf.insetRight = 64;
                if(obj.sprite.node!=null)
                {
                    obj.sprite.node.setContentSize(tex.width, tex.height);
                    var lyscale = obj.sprite.node.getComponent(cc.LayOutScale);
                    if (lyscale) {
                        lyscale.LayOut();
                    }
                }
             
                if (obj.success != null) {
                    obj.success(tex);
                }
            }.bind(this));
        },
        /*
               {
                   btn:cc.Button,
                   bg: "",
                   icon:"",
                   def: "",
                   isUpdateSize:true,
                   success: function () {
                   },
                   fail: function () {
                   }, 
               }
           */
        UpdateTypeButtonImage: function (obj) {
            var typebtn = obj.btn.node.getComponent(cc.UIButton);
            var objBg = {
                sprite: typebtn.imageBg,
                pic: obj.bg,
                def: obj.def,
                success: obj.success,
                fail: obj.fail,
            };
            this.UpdateSpriteImage(objBg);

            if (obj.icon) {
                var objIcon = {
                    sprite: typebtn.imageIcon,
                    pic: obj.icon,
                    def: obj.def,
                    success: obj.success,
                    fail: obj.fail,
                };
                this.UpdateSpriteImage(objIcon);
            }
        },

    },


});

cc.TextureUtil = module.export = TextureUtil; 
