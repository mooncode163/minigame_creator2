var UIViewController = require("UIViewController");
var UIGameBase = require("UIGameBase");
var GameMerge = require("GameMerge");

var UIGameMerge = cc.Class({
    extends: UIGameBase,
    statics: {

    },

    properties: {
        game: {
            default: null,
            type: GameMerge
        },
        // nodeImageBg:cc.Node,
        isShowGame: false,
        titleScore: cc.Label,
    },
    onLoad: function () {
        this._super();
        UIGameMerge._main = this;
        // this.LoadLanguageGame(); 
        // this.textTitle.node.active = false;
        
    },
    start: function () {
        this._super();
 
        // this.ShowGameWinAlert();
    },


    CreateGame: function () {
        this.UpdateGuankaLevel(cc.LevelManager.main().gameLevel);
        // this.OnGameFinish(true);

    },

    CreateGameInteranl: function () {
        if(this.game!=null)
        {
            this.game.OnDestroy();
            this.game.destroy();
        }
        var node = cc.instantiate(this.gamePrefab);
        this.game = node.getComponent(GameMerge);
        this.game.node.parent = this.node;
        //zorder 让imageBg 显示在最底层，game显示在UI下面
        this.imageBg.node.zIndex = -20;
        // this.nodeImageBg.zIndex = -20;
        this.game.node.zIndex = -10;
        this.isShowGame = true;
        this.callbackGuankaFinish = null;
      

    },
    UpdateScore: function () {
        var str = cc.Language.main().GetString("Score") + ":" + cc.GameData.main().score.toString();
        cc.Debug.Log("UpdateScore str="+str);
        this.titleScore.string = str;
        this.LayOut();
       
    },




    UpdateGuankaLevel: function (level) {
        cc.Debug.Log("UIGameShapeColor::UpdateGuankaLevel");
        this._super();
        cc.GameData.main().isGameFail = false;
        
        cc.GameData.main().score = 0;
        this.CreateGameInteranl();
        
        this.UpdateScore();
        // this.game.textTitle = this.textTitle;
        // this.textTitle.node.active = false;

        // this.game.objGameFinish = {
        //     onWin: function (ui) {
        //         this.OnGameWinFinish(ui, false);
        //     }.bind(this),
        //     onFail: function (ui) {
        //         this.OnGameWinFinish(ui, true);
        //     }.bind(this),
        // };

        // this.game.LoadGame(cc.GameManager.gameMode);


    },

 
    OnGameFinish(isFail) {
        var info = cc.GameLevelParse.main().GetItemInfo();  
        var key = "UIGameWin";
        var strPrefab = "";
        //show game win
        if (isFail)
        { 
            this.ShowAdInsert(UIGameBase.GAME_AD_INSERT_SHOW_STEP);
            
            key = "UIGameFail";
            strPrefab = cc.ConfigPrefab.main().GetPrefab(key);
            cc.PopUpManager.main().Show({
                prefab: strPrefab,
                open: function (ui) {
                    cc.AudioPlay.main().PlayByKey("Fail");
                    //ui.UpdateItem(info); 
                }.bind(this),
                close: function (ui) {
                }.bind(this),
            });  
            // cc.PrefabCache.main.LoadByKey(key, function (err, prefab) {
            //     if (err) {
            //         cc.Debug.Log("UIGameFail err=" + err.message || err);
            //         return;
            //     }
            //     var node = cc.instantiate(prefab); 
            //     cc.Debug.Log("UIGameFail ok");
            //     // node.parent = this.node;
            //     var nodeRoot = cc.Common.appSceneMain.rootNode;
            //     node.parent = nodeRoot;

            //     // var nodePop = node;
            //     // nodePop.scaleX = 0;
            //     // nodePop.scaleY = 0;
            //     // var duration = cc.PopUpManager.ANIMATE_DURATION;
            //     // var actionTo1 = cc.scaleTo(duration / 2, 1.2);
            //     // var actionTo2 = cc.scaleTo(duration / 2, 1);
            //     // var seq = cc.sequence([actionTo1, actionTo2, cc.callFunc(function () {
            //     //     // this.DoClickItem(event, customEventData);
            //     // }.bind(this))]);
            //     // nodePop.runAction(seq);
            // }.bind(this)
            // );
        }
    },


});

UIGameMerge._main = null;
UIGameMerge.main = function () {
    // 
    if (!UIGameMerge._main) {
        // GameMerge._main = new GameMerge();
    }
    return UIGameMerge._main;
}

cc.UIGameMerge = module.export = UIGameMerge;
