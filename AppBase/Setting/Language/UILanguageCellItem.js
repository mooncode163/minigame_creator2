var UIView = require("UIView");
var UICellItemBase = require("UICellItemBase");
var UISetting = require("UISetting");
var AppSceneBase = require("AppSceneBase");
cc.Class({
    extends: UICellItemBase,
    //extends: require('viewCell'),
    properties: {
        imageBg: cc.UIImage,
        textTitle: cc.UIText,
    },
    onLoad: function () {
        this._super();

    },

    init: function init(index, data, reload, group) {
        this.node.active = true;
        this.index = index;
        if (index >= data.array.length) {
            // this.index.string = '越界';
            // this.group.string = group.toString();
            this.node.active = false;
            return;
        }
        this.target = data.target;
        this.info = data.array[index];
        this.UpdateItem(this.info);
    },

    OnClickItem: function () {
        var uiViewParent = this.GetUIViewParent();// 
        var lan = cc.Language.main();
        cc.Debug.Log("language id= " + this.info.id);
        lan.SetLanguage(this.info.id);
        cc.Common.appSceneMain.UpdateLanguage();

        cc.Common.SetItemOfKey(cc.CommonRes.KEY_LANGUAGE, this.info.id);
        this.target.OnClickBtnBack();
    },
    UpdateItem: function (info) {
        this.textTitle.text = info.title;
        this.UpdateImageBg(UISetting.listImage[this.index % 3]);
    },
    UpdateImageBg: function (pic) {
        //不会保留图片的sliced参数
        // cc.TextureCache.main.Load(pic, function (err, tex) {
        //     if (err) {
        //         cc.Debug.Log(err.message || err);
        //         return;
        //     }
        //     this.imageBg.spriteFrame = new cc.SpriteFrame(tex);

        // }.bind(this));

        //ok  会保留图片的sliced参数
        // cc.resources.load(pic, cc.SpriteFrame, function (err, frame) {
        //     if (err) {
        //         cc.Debug.Log(err.message || err);
        //     } else {
        //         this.imageBg.spriteFrame = frame;
        //     }
        // }.bind(this));

        // var oft = 20;
        // cc.TextureUtil.UpdateSpriteImage({
        //     sprite: this.imageBg,
        //     pic: cc.CloudRes.main().uiRootPath + "/" + pic,
        //     type: cc.Sprite.Type.SLICED,//SLICED
        //     left: oft,
        //     right: oft,
        //     top: oft,
        //     bottom: oft,
        //     success: function () {
        //     }.bind(this),
        // });
        this.imageBg.UpdateImageKey(pic);
    },
});

