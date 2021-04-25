//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var AppRes = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: {

        //int
        GOLD_SHARE: 5,
        GOLD_GUANKA: 3,
        GOLD_COMMENT: 3,
        GOLD_INIT_VALUE: 10,
        GOLD_GUANKA_STEP: 4,

        //key
        KEY_LANGUAGE: "KEY_LANGUAGE",
        KEY_FIRST_RUN: "KEY_FIRST_RUN",
        KEY_BACKGROUND_MUSIC: "KEY_BACKGROUND_MUSIC",
        KEY_LANGUAGE: "STR_KEY_LANGUAGE",
        KEY_COMMENT_VERSION: "key_comment_",
        KEY_COMMENT_LAST_TIME: "key_comment_last_time",
        KEY_USER_GUIDE: "key_comment_user_guide_",
        KEY_DOWNLOAD_CLOUNDRES: "KEY_DOWNLOAD_CLOUNDRES",
        KEY_GAME_LOCK: "KEY_GAME_LOCK22111222",

        //share
        SHARE_TITLE: "将两个相同的水果合成一个更大的水果",
        SHARE_IMAGE_URL: "https://6c69-lianlianle-shkb3-1259451541.tcb.qcloud.la/Share/minigame/Merge/Watermelon/4.jpg?sign=42482e753246e0afe6a0a84cebc7a543&t=1618808297",

        //https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/GameRes/image/banyuan/banyuan.png?sign=6f70fe6cbbb02943d6b433348ce66ba8&t=1552029703

        //audio 
        AUDIO_BG: "Bg.mp3",


        //image
        IMAGE_BtnMusicOn: "AppCommon/UI/Home/BtnMusicOn",
        IMAGE_BtnMusicOff: "AppCommon/UI/Home/BtnMusicOff",
  


        IMAGE_CELL_BG_BLUE: "AppCommon/UI/Setting/SettingCellBgBlue",
        IMAGE_CELL_BG_ORINGE: "AppCommon/UI/Setting/SettingCellBgOringe",
        IMAGE_CELL_BG_YELLOW: "AppCommon/UI/Setting/SettingCellBgYellow",

        //game
        IMAGE_Game_Bomb: "AppCommon/UI/Game/Bomb", 
    },

    properties:
    {
        URL_HTTP_HEAD:
        {
            get: function () {
                var str = "";
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    str = "https://7368-shapecolor-4f2a07-1258767259.tcb.qcloud.la/";
                }
                return str;
            },
        }


    },

});

AppRes._main = null;
AppRes.main = function () {
    if (!AppRes._main) {
        AppRes._main = new AppRes();
    }
    return AppRes._main;
}

cc.AppRes = module.export = AppRes;

