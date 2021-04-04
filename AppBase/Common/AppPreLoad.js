var AppPreLoad = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量  
    },

    properties: { 
        countLoad:0,
        countMax:0,
    },

    OnFinish: function (obj)
    {
        this.countLoad++;
        cc.Debug.Log("AppPreLoad this.countLoad=" + this.countLoad + ",this.countMax=" + this.countMax);
        if(this.countLoad>=this.countMax)
        {   
            this.countLoad =0;
            if(obj.success!=null)
            {
                obj.success(this);
            }
        }
    },

    /*
{ 
success: function (p) {
},
fail: function () {
}, 
}*/

    Load: function (obj) {
        // this.objCallBack = obj;
        var w, h;
        this.countLoad = 0;
        this.countMax = 5; 

        //config
        // this.countMax++;
        cc.Config.main().Load(  
            {  
            success: function (p) { 
                cc.Debug.Log("AppPreLoad Config success");
                this.OnFinish(obj); 
            }.bind(this),
            fail: function () {
                cc.Debug.Log("AppPreLoad Config fail");
            }, 
            });


            // return;

        // color
        // this.countMax++;
        cc.ColorConfig.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("AppPreLoad ColorConfig success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("AppPreLoad ColorConfig fail");
            }, 
            });
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = "color";
        //     info.isLoad = false;
        //     this.listProLoad.push(info);
        //     cc.ColorConfig.main().GetColor({
        //         key: "apppreload",
        //         def: cc.Color.BLACK,
        //         success: function (color) {
        //             for (let infotmp of this.listProLoad) {
        //                 if (infotmp.id == "color") {
        //                     infotmp.isLoad = true;
        //                 }
        //             }
        //             cc.Debug.Log("AppPreLoadDidFinish color");
        //             this.AppPreLoadDidFinish(info);
        //         }.bind(this),
        //     });

        // }

        //本地 imageres.json
        //if (!cc.Common.main().isWeiXin) 
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = "image";
        //     info.isLoad = false;
        //     this.listProLoad.push(info);
        //     cc.ImageRes.main().GetImage({
        //         key: "apppreload",
        //         success: function (image) {
        //             for (let infotmp of this.listProLoad) {
        //                 if (infotmp.id == "image") {
        //                     infotmp.isLoad = true;
        //                 }
        //             }
        //             cc.Debug.Log("AppPreLoadDidFinish image");
        //             this.AppPreLoadDidFinish(info);
        //         }.bind(this),
        //     });
        // }

        //language
        // this.countMax++;
        cc.Language.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("AppPreLoad Language success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("AppPreLoad Language fail");
            }, 
            });
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = cc.LoadItemInfo.LANGUAGE;
        //     info.isLoad = false;
        //     this.listProLoad.push(info);

        //     var lan = cc.Language.main();
        //     lan.SetLoadFinishCallBack(this.AppPreLoadDidFinish.bind(this), info);
        // }


        //image
        // this.countMax++;
        cc.ImageRes.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("AppPreLoad ImageRes success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("AppPreLoad ImageRes fail");
            }, 
            });

        // prefab
        // this.countMax++;
        cc.ConfigPrefab.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("AppPreLoad ConfigPrefab success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("AppPreLoad ConfigPrefab fail");
            }, 
            });
            
 

    },
    

});


AppPreLoad._main = null;
AppPreLoad.main = function () {
    // 
    if (!AppPreLoad._main) {
        AppPreLoad._main = new AppPreLoad();
    } else {
    }

    return AppPreLoad._main;
}

cc.AppPreLoad = module.export = AppPreLoad;



