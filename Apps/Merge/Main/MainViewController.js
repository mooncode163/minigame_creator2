var NaviViewController = require("NaviViewController");
var HomeViewController = require("HomeViewController");
//var Language = require("Language");
var PlaceViewController = require("PlaceViewController");
var GuankaViewController = require("GuankaViewController");
var CloudResViewController = require("CloudResViewController");

var MainViewController = cc.Class({
    extends: NaviViewController,

    ViewDidLoad: function () {
        this._super();
        //moon ui for test
        var str = cc.Language.main().GetString("APP_NAME");
        cc.Debug.Log("Language GetString=" + str);
        cc.Debug.Log("MainViewController 0");
        var isShowClound = false;
        if (cc.Common.main().isWeiXin) {
            cc.Debug.Log("MainViewController 1");
            var isDownload = cc.Common.GetBoolOfKey(cc.AppRes.KEY_DOWNLOAD_CLOUNDRES, false);
            if (!isDownload) {
                cc.Debug.Log("MainViewController 2");
                //第一次 下载资源
                isShowClound = true;
            } else {
                cc.Debug.Log("MainViewController 3");
                cc.CloudResVersion.main().Load(function () {
                    var versionNow = cc.Config.main().version;
                    var versionLocal = cc.CloudResVersion.main().version;
                    cc.Debug.Log("MainViewController version: versionNow=" + versionNow + " versionLocal=" + versionLocal);
                    if (versionNow > versionLocal) {
                        //需要更新资源 
                        isShowClound = true;
                    }

                }.bind(this));
            }
        }

        if (isShowClound) {
            this.GotoCloundRes();
        } else {
            this.GotoHome();
        }
    },

    CloundResDidClose(p) {
        this.GotoHome();
    },

    GotoCloundRes() {
        CloudResViewController.main().Show(null, this.CloundResDidClose.bind(this));
    },
    GotoHome() {
        // cc.ImageRes.main().GetImage({
        //     key: "apppreload",
        //     success: function (image) {
                
        //     }.bind(this),
        // });
        this.Push(HomeViewController.main());//HomeViewController
    },
});

//单例对象 方法一
// MainViewController.main = new MainViewController(); 

//单例对象 方法二
MainViewController._main = null;
MainViewController.main = function () {
    if (!MainViewController._main) {
        cc.Debug.Log("_main is null");
        MainViewController._main = new MainViewController();
    } else {
        //cc.Debug.Log("_main is not null");
    }
    return MainViewController._main;
}
