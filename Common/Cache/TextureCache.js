var Dictionary = require("Dictionary");
//https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html
//api: https://docs.cocos.com/creator/api/zh/
var TextureCache = cc.Class({
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

    isHttpUrl: function (str) {
        var idx = str.indexOf("https://");
        if (idx != 0) {
            idx = str.indexOf("http://");
        }
        if (idx != 0) {
            //微信缓存本地文件
            idx = str.indexOf("wxfile://");
        }
        if (idx == 0) {
            return true;
        }
        return false;
    },

    // * loadRes(url: string, completeCallback: (error: Error, resource: any) => void): void
    //Texture2D
    Load: function (filepath, completeCallback) {
        // var key = filepath;
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        var ret = null;

        if (this.isHttpUrl(filepath)) {
            return this.LoadUrl(filepath, completeCallback);
        } else {
            //去除后缀
            key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        }
        this.Init();
        //cc.Debug.Log("TextureCache  Load  key="+key);
        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.Debug.Log("TextureCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            // //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            // cc.resources.load(filepath, cc.Texture2D, function (err, tex) {
            //     //cc.url.raw('res/textures/content.png')
            //     if (err) {
            //         cc.Debug.Log("TextureCache loadRes fail");
            //         cc.Debug.Log(err.message || err);
            //         if (completeCallback) {
            //             completeCallback(err, tex);
            //         }
            //         return ret;
            //     }
            //     // cc.Debug.Log("TextureCache loadRes ok");
            //     if (tex != null) {
            //         this.dicItem.Add(key, tex);
            //     }
            //     if (completeCallback) {
            //         completeCallback(err, tex);
            //     }
            //     //this.sprite.spriteFrame = new cc.SpriteFrame(tex); 
            // }.bind(this));
            this.LoadNotCache(key, completeCallback);
        }
        return ret;

    },

    Load2: function (filepath, isCache, completeCallback) {
        if (isCache) {
            this.LoadCache(filepath, completeCallback);
        } else {
            this.LoadNotCache(filepath, completeCallback);
        }
    },

    /*
{
url:"", 
isCloud:false,
success: function (p,data) {
}.bind(this),
fail: function (p) {
}.bind(this), 
}
*/
    LoadObj: function (obj) {
        var ret = null;
        this.Init();
        var key = obj.url;
        //cc.Debug.Log("TextureCache  Load  key="+key);
        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.Debug.Log("TextureCache  load  from cache");
            // if (completeCallback) {
            //     completeCallback(null, ret);
            // }
        } else {
            if (obj.isCloud) {
                cc.ResManager.main().LoadUrl({
                    url: key,
                    success: function (p, data) {
                        if (obj.success) {
                            obj.success(this, data);
                        }
                    }.bind(this),
                    fail: function (p, error) {
                        cc.Debug.Log("TextureCache LoadObj LoadUrl fail");
                        cc.Debug.Log(error.message || error);
                        if (obj.fail) {
                            obj.fail(this);
                        }
                        return ret;
                    }.bind(this)
                });
            } else {
                cc.ResManager.main().Load({
                    filepath: key,
                    success: function (p, data) {
                        if (obj.success) {
                            obj.success(this, data);
                        }
                    }.bind(this),
                    fail: function (p, error) {
                        cc.Debug.Log("TextureCache LoadObj LoadUrl fail");
                        cc.Debug.Log(error.message || error);
                        if (obj.fail) {
                            obj.fail(this);
                        }
                        return ret;
                    }.bind(this)
                });
            }
        }
    },

    LoadCache: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        // var key = filepath;
        var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        if (this.dicItem.Contains(key) == true) {
            ret = this.dicItem.Get(key);
            cc.Debug.Log("TextureCache  load  from cache");
            if (completeCallback) {
                completeCallback(null, ret);
            }
        } else {
            // //加载图片： https://www.jianshu.com/p/8bd1eb0240d7
            // cc.resources.load(filepath, cc.Texture2D, function (err, tex) {
            //     //cc.url.raw('res/textures/content.png')
            //     if (err) {
            //         cc.Debug.Log("TextureCache loadRes fail");
            //         cc.Debug.Log(err.message || err);
            //         if (completeCallback) {
            //             completeCallback(err, tex);
            //         }
            //         return ret;
            //     }
            //     // cc.Debug.Log("TextureCache loadRes ok");
            //     if (tex != null) {
            //         this.dicItem.Add(key, tex);
            //     }
            //     if (completeCallback) {
            //         completeCallback(err, tex);
            //     }
            //     //this.sprite.spriteFrame = new cc.SpriteFrame(tex); 
            // }.bind(this));
            this.LoadNotCache(filepath, completeCallback);
        }
        return ret;

    },

    LoadNotCacheFail: function (filepath, completeCallback) {
        cc.ResManager.main().LoadUrl({
            filepath: filepath,
            success: function (p, data) {
                if (completeCallback) {
                    completeCallback(null, data);
                }
            }.bind(this),
            fail: function (p, error) {
                cc.Debug.Log("TextureCache loadRes fail");
                cc.Debug.Log(error.message || error);
                if (completeCallback) {
                    completeCallback(error, null);
                }
                return ret;
            }.bind(this)
        });
    },

    LoadNotCache: function (filepath, completeCallback) {
        this.Init();
        var ret = null;
        var key = filepath;
        // var key = cc.FileUtil.GetFileBeforeExtWithOutDot(filepath);
        {
            cc.Debug.Log("TextureCache LoadNotCache key=" + key);
            //加载图片： https://www.jianshu.com/p/8bd1eb0240d7


            // cc.resources.load(key, cc.Texture2D, function (err, tex) {
            //     //cc.url.raw('res/textures/content.png')
            //     if (err) {
            //         cc.Debug.Log("TextureCache loadRes fail");
            //         cc.Debug.Log(err.message || err);
            //         if (completeCallback) {
            //             completeCallback(err, tex);
            //         }
            //         return ret;
            //     }
            //     if (tex != null) {
            //         // this.dicItem.Add(key, tex);
            //     }
            //     if (completeCallback) {
            //         completeCallback(err, tex);
            //     }
            // }.bind(this));

            cc.ResManager.main().Load({
                filepath: filepath,
                success: function (p, data) {
                    if (completeCallback) {
                        completeCallback(null, data);
                    }
                }.bind(this),
                fail: function (p, error) {
                    cc.Debug.Log("TextureCache loadRes fail");
                    cc.Debug.Log(error.message || error);
                    // if (completeCallback) {
                    //     completeCallback(error, null);
                    // }
                    this.LoadNotCacheFail(filepath, completeCallback);
                    return ret;
                }.bind(this)
            });
        }
        return ret;

    },

    LoadUrl: function (url, completeCallback) {
        this.Init();
        var ret = null;
        var key = url;

        cc.assetManager.loadRemote(url, function (err, tex) {
            if (err) {
                cc.Debug.Log("TextureCache loadRes fail url=" + url);
                cc.Debug.Log(err.message || err);
                if (completeCallback) {
                    completeCallback(err, tex);
                }
                return ret;
            }
            // if (tex != null) {
            //     this.dicItem.Add(key, tex);
            // }
            if (completeCallback) {
                completeCallback(err, tex);
            }
        }.bind(this));

        return ret;

    },

});

TextureCache.main = new TextureCache();


cc.TextureCache = module.export = TextureCache;

