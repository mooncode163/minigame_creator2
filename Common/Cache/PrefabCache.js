var Dictionary = require("Dictionary");
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var PrefabCache = cc.Class({
    //cc.js.getClassName
    extends: cc.Object,
    properties: {
        dicItem: {
            default: null,
            type: Dictionary
        },
    },
    Init: function () {
        if (this.dicItem != null) {
            return;
        }
        this.dicItem = new Dictionary();
    },
 
    LoadByKey: function (key, completeCallback) { 
        var strPrefab = cc.ConfigPrefab.main().GetPrefab(key);
        cc.Debug.Log("LoadByKey strPrefab="+strPrefab+" key="+key);
        return this.Load(strPrefab,completeCallback);
    },


    // * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
    //Texture2D
    Load: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;
        key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.Debug.Log("PrefabCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            cc.resources.load(key, function (err, prefab) {
                //cc.url.raw('res/textures/content.png')
                if (err) {
                    cc.Debug.Log("PrefabCache loadRes fail filepath="+filepath+" err="+err.message || err);
                    cc.Debug.Log(err.message || err);
                    if (completeCallback) {
                        completeCallback(err, prefab);
                    }
                    return ret;
                }
                cc.Debug.Log("PrefabCache loadRes ok");
                if (prefab != null) {
                    this.dicItem.Add(key, prefab);
                }
                if (completeCallback) {
                    completeCallback(err, prefab);
                }
            }.bind(this));
        }
        return ret;

    },


});

PrefabCache.main = new PrefabCache();

cc.PrefabCache = module.export = PrefabCache; 

