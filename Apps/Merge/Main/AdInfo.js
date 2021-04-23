//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var AdInfo = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    statics: { 
        ID_Banner: "adunit-c529d357d13f4d98", 
        ID_Insert: "adunit-96b9f47595d18e33", 
        ID_Video: "adunit-bf085c9e03925282", 
    },

    properties:
    {
      

    },

});

AdInfo._main = null;
AdInfo.main = function () {
    if (!AdInfo._main) {
        AdInfo._main = new AdInfo();
    }
    return AdInfo._main;
}

cc.AdInfo = module.export = AdInfo;

