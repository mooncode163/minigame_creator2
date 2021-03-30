 

var GameRes = cc.Class({
    extends: cc.Object,
    statics: {
        NameDeadLine: "DeadLine",
        NameBoardLine: "BoardLine", 
    },
 
    properties: {
      
    },
 
 


});

GameRes._main = null;
GameRes.main = function () {
    // 
    if (!GameRes._main) {
        GameRes._main = new GameRes();
    }
    return GameRes._main;
}

cc.GameRes = module.export = GameRes;
