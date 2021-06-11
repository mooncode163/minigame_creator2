var NaviViewController = require("NaviViewController");
var HomeViewController = require("HomeViewController");
var MainViewController = require("MainViewController");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
var CloudResViewController = require("CloudResViewController");
var AppSceneBase = require("AppSceneBase"); 
var InitViewController = cc.Class({
    extends: NaviViewController,
    CloundResDidClose(p) {
        this.GotoHome();
    },

    GotoCloundRes() {
        CloudResViewController.main().Show(null, this.CloundResDidClose.bind(this));
    },
    GotoHome() {
        this.Push(HomeViewController.main());//HomeViewController
    },




    ViewDidLoad: function () {
        this._super();
        this.InitLoad();
    },


    InitLoad: function () {
        var isShowClound = false;
        if (cc.Platform.main.isCloudRes) {
            //cc.Debug.Log("InitViewController 1");
            var isDownload = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_DOWNLOAD_CLOUNDRES, false);
            if (!isDownload) {
                //cc.Debug.Log("InitViewController 2");
                //第一次 下载资源
                isShowClound = true;
            } else {
                //cc.Debug.Log("InitViewController 3")

                cc.CloudResVersion.main().LoadVersion(
                    {
                        success: function (p, data) {
                            var versionNet = cc.CloudResVersion.main().versionNet;
                            var versionLocal = cc.CloudResVersion.main().versionLocal;
                            //cc.Debug.Log("InitViewController version: versionNet=" + versionNet + " versionLocal=" + versionLocal);
                            if (versionNet > versionLocal) {
                                //需要更新资源 
                                isShowClound = true;
                            }
                        }.bind(this),

                        fail: function () {
                        }.bind(this),


                    });
            }
        }
        // isShowClound = true;
        if (isShowClound) {
            this.GotoCloundRes();
        } else {
            this.RunGame();
        }

    },

    RunGame: function () {
        cc.AppPreLoad.main().Load({
            success: function (p) {
                this.OnAppPreLoadFinish();
            }.bind(this),
            fail: function () {
                this.OnAppPreLoadFinish();
            }.bind(this),
        });
    },

    OnAppPreLoadFinish: function () {
        var isFirstRun = !cc.Common.GetBoolOfKey(cc.CommonRes.STR_KEY_NOT_FIRST_RUN, false);
        if (isFirstRun) {
            // cc.Common.gold = AppRes.GOLD_INIT_VALUE;
            //第一次安装
            cc.Common.SetBoolOfKey(cc.CommonRes.STR_KEY_NOT_FIRST_RUN, true);

            cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BTN_SOUND, true);
            cc.Common.SetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, true);

            //languageCode
            var lan = cc.sys.language;
            cc.Common.SetItemOfKey(cc.CommonRes.KEY_LANGUAGE, lan);
            cc.Language.main().SetLanguage(lan);
        }
        else {

            var lan = cc.Common.GetItemOfKey(cc.CommonRes.KEY_LANGUAGE, cc.sys.LANGUAGE_CHINESE);
            cc.Language.main().SetLanguage(lan);

        }

        this.StartParsePlace();
    },

    StartParsePlace: function () {
        //cc.Debug.Log("HomeViewController StartParsePlace");
        cc.LevelManager.main().StartParsePlace(
            {
                success: function (p) {
                    this.StartParseGuanka();
                }.bind(this),
                fail: function () {
                    this.StartParseGuanka();
                }.bind(this),
            });
    },

    StartParseGuanka() {
        //cc.Debug.Log("HomeViewController StartParseGuanka");
        cc.LevelManager.main().StartParseGuanka(
            {
                success: function (p) {
                    this.ParseLevelFinish();
                }.bind(this),
                fail: function () {
                    this.ParseLevelFinish();
                }.bind(this),
            });
    },



    GotoCloundRes: function () {
        CloudResViewController.main.Show(
            {
                controller: this,
                close: function (p) {
                    this.RunGame();
                }.bind(this),
            });
    },

    OnImageResFinish: function () {


    },

    OnConfigAudioFinish: function () {
        this.GotoGame();
    },

    ParseLevelFinish: function () {

        this.GotoGame();

    },

    GotoGame: function () {
        var p = MainViewController.main();
        AppSceneBase.main().SetRootViewController(p);
        var ret = cc.Common.GetBoolOfKey(cc.CommonRes.KEY_BACKGROUND_MUSIC, false);
        //cc.Debug.Log("MusicBgPlay Start");
        if (ret) { 
            cc.MusicBgPlay.main().PlayBgMusic();
        }

    },

});

//单例对象 方法一
// InitViewController.main = new InitViewController(); 

//单例对象 方法二
InitViewController._main = null;
InitViewController.main = function () {
    if (!InitViewController._main) { 
        InitViewController._main = new InitViewController();
    } else {
        //cc.//cc.Debug.Log("_main is not null");
    }
    return InitViewController._main;
}
