var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");

var GameLevelParse = cc.Class({
    extends: cc.LevelParseBase,
    statics: {
    },

    statics: {
    },

    properties: {
        listGameItems: {
            default: [],
            type: cc.Object
        },
    },

    GetGuankaTotal: function () {
        // var count = this.ParseGuanka();
        var count = 0;

        return count;
    },
    CleanGuankaList: function () {


    },

    GetLastItemInfo: function () {
        return this.listGameItems[this.listGameItems.length-1];
    }, 

    ParseGameItemJson: function (json) {

        var items = json.items;
        for (var i = 0; i < items.length; i++) {
            var info = new cc.CaiCaiLeItemInfo();
            var item = items[i];
            info.id = item["id"];
            info.pic = this.GetImagePath(info.id);
            this.listGameItems.push(info);
        }

        this.ParseGuankaDidFinish();
    },

    StartParseGameItems: function () {
        if ((this.listGameItems != null) && (this.listGameItems.length != 0)) {
            return;
        }

        var filepath = cc.Common.GAME_RES_DIR + "/Level/GameItems";
        cc.resources.load(filepath, function (err, rootJson) {
            if (err) {
                cc.Debug.Log("config:err=" + err);
            }
            if (err == null) {
                this.ParseGameItemJson(rootJson.json);
            }
        }.bind(this));

    },
 



    StartParseGuanka: function (callback) {
        this.callbackGuankaFinish = callback;
        this.StartParseGameItems();
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
