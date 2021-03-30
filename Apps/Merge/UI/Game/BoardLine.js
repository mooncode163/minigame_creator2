var UIViewController = require("UIViewController");
var UIView = require("UIView");

var BoardLine = cc.Class({
    extends: UIView,
    statics: {
        
    },

    properties: { 
    },
    onLoad: function () {
        this._super(); 
        this.node.id = cc.GameRes.NameBoardLine;
    },
    start: function () {
        this._super();
    },
    
 


});
