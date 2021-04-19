 
var GameStatus = cc.Enum({
    //区分大小写
    Play: 0,
    Prop: 1,

});

var GameData = cc.Class({
    extends: cc.Object,
    statics: {
        GameStatus: GameStatus,
        NameDeadLine: "DeadLine",
        NameBoardLine: "BoardLine",

        Place_Custom: "Custom",
        MaxSpeed: 10.0,
        MaxBounce: 1.0,
        MaxRotation: 360.0,
        ShaderCircle: "Moonma/ImageCircle",
        isGameFail: false,
    },

    properties: {
        status: GameStatus.Play,
        radiusCustom: 0.4,
        score: 0,
        speed: {
            get: function () {
                var ret = 0;
                var key = "KEY_GAME_SPEED";
                ret = cc.Common.GetItemOfKey(key, 0);
                return ret;
            },
            set: function (value) {
                var key = "KEY_GAME_SPEED";
                cc.Common.SetItemOfKey(key, value);
            },
        },
        rotation: {
            get: function () {
                var ret = 0;
                var key = "KEY_GAME_ROTATION";
                ret = cc.Common.GetItemOfKey(key, 0);
                return ret;
            },
            set: function (value) {
                var key = "KEY_GAME_ROTATION";
                cc.Common.SetItemOfKey(key, value);
            },
        },

        bounce: {
            get: function () {
                var ret = 0;
                var key = "KEY_GAME_BOUNCE";
                ret = cc.Common.GetItemOfKey(key, 0);
                return ret;
            },
            set: function (value) {
                var key = "KEY_GAME_BOUNCE";
                cc.Common.SetItemOfKey(key, value);
            },
        },

        //  自定义目录
        CustomImageRootDir: {
            get: function () {
                //     string ret = Application.temporaryCachePath + "/CustomImage";
                // FileUtil.CreateDir(ret);
                // return ret;
            },
        },

        HasCustomImage: {
            get: function () {
                var ret = 0;
                var key = "KEY_HasCustomImage";
                ret = cc.Common.GetItemOfKey(key, 0);
                return ret;
            },
            set: function (value) {
                var key = "KEY_HasCustomImage";
                cc.Common.SetItemOfKey(key, value);
            },
        },

        HasCustomImage:
        {
            get: function () {
                var key = "KEY_HasCustomImage";
                return cc.Common.GetBoolOfKey(key, false);
            }, set: function () {
                var key = "KEY_HasCustomImage";
                cc.Common.SetBoolOfKey(key, value);
            },
        },
    
    },
    IsCustom: function () {
        var idx = cc.LevelManager.main().placeLevel;
        var infoPlace = cc.LevelManager.main().GetPlaceItemInfo(idx);
        if (infoPlace.id == GameData.Place_Custom) {
            return true;
        }
        return false;
    },


});

GameData._main = null;
GameData.main = function () {
    // 
    if (!GameData._main) {
        GameData._main = new GameData();
    }
    return GameData._main;
}

cc.GameData = module.export = GameData;
