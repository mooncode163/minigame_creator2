var UIViewController = require("UIViewController");
var UIView = require("UIView");
var GameBase = require("GameBase");
var UIMergeItem = require("UIMergeItem");
//shu： wx621ff1107207384c
//weixin小程序appid: heng: wx2c5d3abfad26e8b1
//cocos: wx6ac3f5090a6b99c5
//weixin test app：wx844d0aa648111acb
var GameMerge = cc.Class({
    extends: GameBase,
    statics: {



    },

    properties: {
        ScaleStart: 0.1,
        isFirstRun: false,
        prefabItem: null,
        uiItem: null,
        listItem: {
            default: [],
            type: cc.Object
        },
    },
    //百度tts:  http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=你要转换的文字 
    onLoad: function () {
        this._super();
        GameMerge._main = this;
        this.LoadPrefab();
        this.node.setContentSize(this.node.parent.getContentSize());
        var ev = this.node.addComponent(cc.UITouchEvent);
        ev.callBackTouch = this.OnUITouchEvent.bind(this);


    },


    LoadPrefab() {
        cc.PrefabCache.main.LoadByKey("UIMergeItem", function (err, prefab) {
            if (err) {
                cc.Debug.Log("LoadGamePrefab err=" + err.message || err);
                return;
            }
            this.prefabItem = prefab;

            var ui = this.CreateItem("putao");
            ui.EnableGravity(true);
        }.bind(this)
        );
    },


    update() {

    },
    LayOut: function () {
        this._super();

    },
    GetTotalItems: function () {
        return cc.GameLevelParse.main().listGameItems.length;
    },
    GetItemId: function (idx) {
        var info = cc.GameLevelParse.main().GetItemInfo(idx);
        return info.id;
    },

    //随机获取水果
    RandomFruitImageKey: function () {
        var rdm = 0;
        if (this.GetTotalItems() >= 4)//判断总水果是否大于4个
        {
            rdm = cc.Common.main().RandomRange(0, 4);
        }
        else {
            rdm = cc.Common.main().RandomRange(0, this.GetTotalItems());
        }
        if (this.isFirstRun) {
            this.isFirstRun = false;
            rdm = 0;
        }

        return this.GetItemId(rdm);
    },

    // string
    GetIndexOfItem: function (key) {
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i)) {
                return i;
            }
        }
        return 0;
    },

    // string
    GetNextItem: function (key) {
        var ret = "";
        for (var i = 0; i < this.GetTotalItems(); i++) {
            if (key == this.GetItemId(i) && ((i + 1) < this.GetTotalItems())) {
                ret = this.GetItemId(i + 1);
                break;
            }
        }
        return ret;
    },

    GetLastItem: function (key) {
        var ret = "";
        if (this.GetTotalItems() > 0) {
            ret = this.GetItemId(this.GetTotalItems() - 1);
        }
        return ret;
    },
    OnRestPlay: function () {
        //  Invoke("OnRestPlayInternal",0.2f);
        this.OnRestPlayInternal();
    },

    OnRestPlayInternal: function () {
        // UIGameMerge.main.gameStatus = UIGameMerge.Status.Play;
        // UIGameMerge.main.game.ShowProp(false);
    },
    // 改变类型为  string toId
    ChangeItem(toId) {
        if (this.uiItem != null) {
            this.uiItem.id = toId;
            this.uiItem.name = toId;
            var pic = cc.GameLevelParse.main().GetImagePath(toId);
            this.uiItem.UpdateImage(pic);
        }

        this.OnRestPlay();
    },

    // UIMergeItem ui
    DeleteItem(ui) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = listItem[i];
            if (uilist == ui) {
                uilist.node.destroy();
                this.listItem.splice(index, 1);
                break;
            }
        }
        this.OnRestPlay();
    },

    // cc.Node 
    RemoveItemFromList(objitem) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = listItem[i];
            var item = objitem.getComponent(UIMergeItem);
            if (uilist == item) {
                this.listItem.splice(index, 1);
                break;
            }
        }

    },

    // 摧毁所有的同类 string
    DeleteAllItemsOfId(id) {
        for (var i = 0; i < this.listItem.length; i++) {
            var uilist = listItem[i];
            if (uilist.id == id) {
                uilist.node.destroy();
            }
        }
        for (var i = 0; i < this.listItem.length; i++) {
            var ui = listItem[i];
            if (ui.id == id) {
                this.listItem.splice(i, 1);
            }
        }
        this.OnRestPlay();
    },

    // string return UIMergeItem
    CreateItem(key) {
        var x, y, w, h;
        var node = cc.instantiate(this.prefabItem);
        var ui = node.getComponent(UIMergeItem);
        ui.isNew = true;
        ui.id = key;
        // ui.index = indexItem++; 
        // AppSceneBase.main.AddObjToMainWorld(ui.gameObject);
        ui.SetParent(this);
        ui.name = key;
        var pic = cc.GameLevelParse.main().GetImagePath(key);
        ui.UpdateImage(pic);

        ui.EnableGravity(false);
        var scale = (this.ScaleStart + 0.05 * this.GetIndexOfItem(key)) * 0.8;
        // ui.transform.localScale = new Vector3(scale, scale, 1);
        // ui.transform.localPosition = new Vector3(0, posYInit, -1);
        this.listItem.push(ui);
        return ui;
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
