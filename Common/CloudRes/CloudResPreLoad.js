var CloudResPreLoad = cc.Class({
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
        cc.Debug.Log("CloudResPreLoad this.countLoad=" + this.countLoad + ",this.countMax=" + this.countMax);
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
        this.countMax = 6; 

        //config
        // this.countMax++;
        cc.Config.main().Load(  
            {  
            success: function (p) { 
                cc.Debug.Log("CloudResPreLoad Config success");
                this.OnFinish(obj); 
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad Config fail");
            }, 
            });


            // return;

        // color
        // this.countMax++;
        cc.ColorConfig.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("CloudResPreLoad ColorConfig success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad ColorConfig fail");
            }, 
            });
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = "color";
        //     info.isLoad = false;
        //     this.listProLoad.push(info);
        //     cc.ColorConfig.main().GetColor({
        //         key: "CloudResPreLoad",
        //         def: cc.Color.BLACK,
        //         success: function (color) {
        //             for (let infotmp of this.listProLoad) {
        //                 if (infotmp.id == "color") {
        //                     infotmp.isLoad = true;
        //                 }
        //             }
        //             cc.Debug.Log("CloudResPreLoadDidFinish color");
        //             this.CloudResPreLoadDidFinish(info);
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
        //         key: "CloudResPreLoad",
        //         success: function (image) {
        //             for (let infotmp of this.listProLoad) {
        //                 if (infotmp.id == "image") {
        //                     infotmp.isLoad = true;
        //                 }
        //             }
        //             cc.Debug.Log("CloudResPreLoadDidFinish image");
        //             this.CloudResPreLoadDidFinish(info);
        //         }.bind(this),
        //     });
        // }

        //language
        // this.countMax++;
        cc.Language.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("CloudResPreLoad Language success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad Language fail");
            }, 
            });
        // {
        //     var info = new cc.LoadItemInfo();
        //     info.id = cc.LoadItemInfo.LANGUAGE;
        //     info.isLoad = false;
        //     this.listProLoad.push(info);

        //     var lan = cc.Language.main();
        //     lan.SetLoadFinishCallBack(this.CloudResPreLoadDidFinish.bind(this), info);
        // }


        //image
        // this.countMax++;
        cc.ImageRes.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("CloudResPreLoad ImageRes success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad ImageRes fail");
            }, 
            });

        // prefab
        // this.countMax++;
        cc.ConfigPrefab.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("CloudResPreLoad ConfigPrefab success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad ConfigPrefab fail");
            }, 
            });
            

         // Audio
        // this.countMax++;
        cc.ConfigAudio.main().Load(  
            {  
            success: function (p) {  
                cc.Debug.Log("CloudResPreLoad ConfigAudio success");
                this.OnFinish(obj);
            }.bind(this),
            fail: function () {
                cc.Debug.Log("CloudResPreLoad ConfigAudio fail");
            }, 
            });

    },
    

});


CloudResPreLoad._main = null;
CloudResPreLoad.main = function () { 
    if (!CloudResPreLoad._main) {
        CloudResPreLoad._main = new CloudResPreLoad();
    } else {
    }

    return CloudResPreLoad._main;
}

cc.CloudResPreLoad = module.export = CloudResPreLoad;



