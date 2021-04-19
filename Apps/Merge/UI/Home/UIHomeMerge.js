var UIHomeBase = require("UIHomeBase");
var AppRes = require("AppRes"); 
var GameViewController = require("GameViewController"); 

var UIHomeMerge =cc.Class({
    extends: UIHomeBase,
    properties: {  
        labelTitle: cc.Label,
        textTitle: cc.UIText,
        testNode: {
            default: null,
            type: cc.Node
        },
        imageLogo: {
            default: null,
            type: cc.UIImage
        },
        // textTitle: {
        //     default: null,
        //     type: cc.UIText
        // },
        nodeImageLogo: {
            default: null,
            type: cc.Node
        },
        nodeTextTitle: {
            default: null,
            type: cc.Node
        },
    },
    onLoad: function () {
        this._super();
        var x, y, w, h;
    // this.node.setContentSize(cc.Common.appSceneMain.sizeCanvas); 
        //物理系统默认是关闭的，手动开启物理系统 
        cc.Common.EnablePhysic(true, false);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true; 
      
        var info = cc.GameLevelParse.main().GetLastItemInfo();
        var pic = cc.GameLevelParse.main().GetImagePath(info.id); 
        this.imageLogo = this.nodeImageLogo.getComponent(cc.UIImage);
        cc.Debug.Log("UIHomeMerge pic="+pic);
        this.imageLogo.UpdateImage(pic);

        var name = cc.Language.main().GetString("APP_NAME");
        if (cc.Device.main.isLandscape) {
            name = cc.Language.main().GetString("APP_NAME_HD");
        }

        this.nodeTextTitle.getComponent(cc.UIText).text = name;
        
        // this.imageLogo.UpdateImage2(pic);
        cc.Debug.Log("UIHomeMerge onLoad");
        this.LayOut();  
        // this.LoadCenterBar();
        this.LoadSideBar();

    },

    start: function () {
        this._super();
        // this.ShowGameWinAlert();
    },
    ShowGameWinAlert: function () {
        var title = cc.Language.main().GetString("STR_UIVIEWALERT_TITLE_GAME_FINISH");
        var msg = cc.Language.main().GetString("STR_UIVIEWALERT_MSG_GAME_FINISH");
        var yes = cc.Language.main().GetString("STR_UIVIEWALERT_YES_GAME_FINISH");
        var no = cc.Language.main().GetString("STR_UIVIEWALERT_NO_GAME_FINISH");
        cc.Debug.Log("game finish ShowFull");

        cc.ViewAlertManager.main().ShowFull({
            title: title,
            msg: msg,
            yes: yes,
            no: no,
            isShowBtnNo: true,
            name: "STR_KEYNAME_VIEWALERT_GAME_FINISH",
            finish: function (ui, isYes) {
                if (isYes) {
                    cc.LevelManager.main().GotoNextLevelWithoutPlace();
                } else {
                    //replay
                    cc.GameManager.main().GotoPlayAgain();
                }
            }.bind(this),
        });

    },

    LayOut: function () {
        this._super();
       
    },

    GotoGameByModeInteranl: function () {
        if (this.controller != null) {
            var navi = this.controller.naviController;
            navi.Push(GameViewController.main());
        }
    },
    GotoGame: function () {
        // cc.GameManager.gameMode = mode;
        cc.LevelManager.main().StartParsePlace(function () {
            this.GotoGameByModeInteranl();
        }.bind(this)
        );
    },

    OnClickBtnPlay: function (event, customEventData) { 
        this.GotoGame(); 
    },

});

