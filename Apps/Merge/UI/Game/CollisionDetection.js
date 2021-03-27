var UIViewController = require("UIViewController");
var UIView = require("UIView");

var CollisionDetection = cc.Class({
    extends: UIView,
    statics: {
        
    },

    properties: { 
    },
    onLoad: function () {
        this._super();
        this.LoadLanguageGame(); 
        this.textTitle.node.active = false;
    },
    start: function () {
        this._super();
    },
     
});
