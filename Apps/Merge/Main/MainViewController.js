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
        cc.MooSnow.main().Init();
        this.GotoHome();
    },
 
    GotoHome() { 
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
