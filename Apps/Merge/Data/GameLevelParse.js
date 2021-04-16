var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");

var GameLevelParse = cc.Class({
    extends: cc.LevelParseBase,
    statics: {
    },

    statics: {
        ADVIDEO_LEVEL_MIN: 10,

    },

    properties: {
        listGameItems: {
            default: [],
            type: cc.Object
        },
        listGameItemDefault: {
            default: [],
            type: cc.Object
        },
    },

    GetGuankaTotal: function () {
        return this.listGameItems.length;
    },
    CleanGuankaList: function () {
        if (this.listGameItems != null) {
            this.listGameItems.splice(0, this.listGameItems.length);
        }

    },
    GetItemInfo: function (idx) {
        return this.listGameItems[idx];
    },
    GetLastItemInfo: function () { 
        cc.Debug.Log("GameItems:GetLastItemInfo this.listGameItems=" + this.listGameItems.length);
        return this.listGameItems[this.listGameItems.length - 1];
    },
    GetGuankaTotal: function () {
        return this.listGameItems.length;
    },
    GetImagePath: function (id) {
        // return id;
        if (cc.GameData.main().IsCustom()) {
            return this.GetCustomImagePath(id);
        }
        var idx = cc.LevelManager.main().placeLevel;
        return this.GetImagePathPlace(id, idx);
    },
    GetCustomImagePath: function (id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (!cc.FileUtil.FileExist(pic)) {
            pic = this.GetImagePathPlace(id, 0);
        }
        return pic;
    },

    // string 
    GetSaveCustomImagePath: function (id) {
        return cc.Common.GAME_RES_DIR + "/Image/" + id + ".png";
    },
    IsRenderCustomImage: function (id) {
        if (cc.GameData.main().IsCustom()) {
            if (this.IsHasCustomImage(id)) {
                return true;
            }
        }
        return false;
    },

    IsHasCustomImage: function (id) {
        var pic = this.GetSaveCustomImagePath(id);
        if (cc.FileUtil.FileExist(pic)) {
            return true;
        }
        return false;
    },
    GetImagePath: function (id) {
        if (cc.GameData.main().IsCustom()) {
            return this.GetCustomImagePath(id);
        }
        var idx = cc.LevelManager.main().placeLevel;
        return this.GetImagePathPlace(id, idx);

    },

    GetImagePathDefault: function (id) {
        return this.GetImagePathPlace(id, 0);
    },
    GetImagePathPlace: function (id, idx) {
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        return cc.Common.GAME_RES_DIR + "/Image/" + infoPlace.id + "/" + id + ".png";
    }, 

    ParseGameItemJson: function (json) {

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }

        this.ParseGuankaDidFinish();
    },


    ParseGameItems: function (json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }
        cc.Debug.Log("GameItems:this.listGameItems=" + this.listGameItems.length);
        this.ParseGuankaDidFinish();
    },

    ParseGameItemsDefault: function (json) {
        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.ItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItemDefault.push(info);
        }

        // this.ParseGuankaDidFinish();
    },


    StartParseGameItems: function () {
        if ((this.listGameItems != null) && (this.listGameItems.length != 0)) {
            return;
        }

        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var filepath = cc.Common.GAME_RES_DIR + "/Level/" + infoPlace.id;// + ".json";
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("GameItems:err=" + err);
            }
            if (err == null) {
                cc.Debug.Log("GameItems:ParseGameItems");
                this.ParseGameItems(rootJson.json);
            }
        }.bind(this));

    },


    StartParseGameItemsDefault: function () {
        if ((this.listGameItemDefault != null) && (this.listGameItemDefault.length != 0)) {
            return;
        }

        var idx = 0;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        var filepath = cc.Common.GAME_RES_DIR + "/Level/" + infoPlace.id;// + ".json";
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("GameItems:err=" + err);
            }
            if (err == null) {
                this.ParseGameItemsDefault(rootJson.json);
            }
        }.bind(this));

    },



    StartParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        this.StartParseGameItems();
        this.StartParseGameItemsDefault();
    },


});

GameLevelParse._main = null;
GameLevelParse.main = function () {
    // 
    if (!GameLevelParse._main) {
        GameLevelParse._main = new GameLevelParse();
    }
    return GameLevelParse._main;
}

cc.GameLevelParse = module.export = GameLevelParse;
