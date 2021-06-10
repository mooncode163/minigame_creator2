var CloudResPreLoad = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量  
    },

    properties: { 
        countLoad:0, 
        listItem: {
            default: [],
            type: cc.ConfigBase
        }, 
    }, 

    Load: function (obj) {
        // this.objCallBack = obj;
        var w, h;
        this.countLoad = 0;
        this.countMax = 6; 

       
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

 

    },
    
    Init: function() {
 
        this.listItem.push(cc.ConfigCloudRes.main());
        this.listItem.push(cc.LanguageCloudRes.main());
        this.listItem.push(cc.ImageResCloudRes.main());
        
    },
 
    /*
{ 
success: function (p) {
},
fail: function () {
}, 
}*/
    Load: function(obj) {
        this.countLoad = 0;
        this.listItem.forEach((item) => {
            item.Load(
                {
                    // isCloud:false,

                    success: function (p) {  
                        Debug.Log("CloudResPreLoad success this.countLoad="+this.countLoad);
                        this.OnFinish(obj,false);
                    }.bind(this),
                    fail: function (p) {
                        Debug.Log("CloudResPreLoad fail this.countLoad="+this.countLoad);
                        this.OnFinish(obj,true);
                    },  
                });
        });  

    } ,

    OnFinish: function(obj,isFail) {
        this.countLoad++;
        if (this.countLoad >= this.listItem.length) { 
            if(isFail)
            {
                if (obj.fail != null) {
                    obj.fail(this);
                }
            }else{
                if (obj.success != null) {
                    obj.success(this);
                }
            }
        }
    },

});


CloudResPreLoad._main = null;
CloudResPreLoad.main = function () { 
    if (!CloudResPreLoad._main) {
        CloudResPreLoad._main = new CloudResPreLoad();
        CloudResPreLoad._main.Init();
    } else {
    }

    return CloudResPreLoad._main;
}

cc.CloudResPreLoad = module.export = CloudResPreLoad;



