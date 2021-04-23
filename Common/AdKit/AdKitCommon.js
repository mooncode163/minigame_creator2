var AppSceneBase = require("AppSceneBase");

var AdType = cc.Enum({
    //区分大小写
    BANNER: 0,
    INSERT: 1,
    VIDEO: 2,
});

var AdStatus = cc.Enum({
    //区分大小写
    FAIL: 0,
    SUCCESFULL: 1,
    START: 2,
    CLOSE: 3,
});

var AdKitCommon = cc.Class({
    extends: cc.Object,
    statics: {
        // 声明静态变量 
        //enum
        AdType: AdType,
        AdStatus: AdStatus,
    },
    properties: {
        //get 和 set 函数不能放在statics里

        widthAdBanner:0,
        heightAdBanner:0,//screen
        heightCanvasAdBanner:0,//canvas
    },

    //banner
    	/*
	{   
	success: function (p,w,h) {
	},
	fail: function () {
	}, 
	}
	*/
    InitAdBanner: function () {
        if (cc.Common.noad) {
            return;
        }
        var isShowAdBanner = true;
        // if (Common.isiOS) {
        //     if (!AppVersion.appCheckHasFinished) {
        //         //ios app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        // if (Common.isAndroid) {

        //     if (!AppVersion.appCheckHasFinished) {
        //         //xiaomi app审核不显示banner
        //         isShowAdBanner = false;
        //     }
        // }

        if (isShowAdBanner) {
            // cc.AdBanner.main().SetScreenSize(Screen.width, Screen.height);
            // cc.AdBanner.main().SetScreenOffset(0, cc.Device.main.heightSystemHomeBar);
            {
                // var type =cc.AdConfigParser.SOURCE_TYPE_BANNER;
                // var source = cc.AdConfig.main().GetAdSource(type); 
                cc.AdBanner.main().InitAd({
                    source: cc.Source.WEIXIN,
                    success: function (p, w, h) {
                        this.widthAdBanner = w;
                        this.heightAdBanner = h;
                        this.heightCanvasAdBanner = cc.Common.ScreenToCanvasHeigt(cc.Common.appSceneMain.sizeCanvas,h);
                        // if (obj.success != null) {
                        //     obj.success(this, w, h);
                        // }
                        AppSceneBase.main.LayOut();
                    }.bind(this),
                });

                cc.AdBanner.main().ShowAd(true);
            }
        }


    },

    //insert
    InitAdInsert: function () {
        if (cc.Common.noad) {
            return;
        }
        var isShowAdInsert = false;
        // if (AppVersion.appCheckHasFinished) {
        //     isShowAdInsert = true;
        // }
        isShowAdInsert = true;
        if (isShowAdInsert) {
            // AdInsert.SetObjectInfo(this.gameObject.name);
            // var type = cc.AdConfigParser.SOURCE_TYPE_INSERT;
            // var source = cc.AdConfig.main().GetAdSource(type);
            var source = cc.Source.WEIXIN;
            cc.AdInsert.main().InitAd(source);
        }
    },


    //Video
    InitAdVideo: function () {
        if (cc.Common.noad) {
            return;
        }
        // if (AppVersion.appCheckHasFinished) {
            cc.AdVideo.main().SetType(cc.AdVideo.ADVIDEO_TYPE_REWARD);
            // var type = cc.AdConfigParser.SOURCE_TYPE_VIDEO;
            // var source = cc.AdConfig.main().GetAdSource(type);
            var source = cc.Source.WEIXIN;
            Debug.Log("InitAdVideo AdVideo.InitAd =" + source);
            cc.AdVideo.main().InitAd(source);
        // }
    },



    ShowAdBanner(isShow) {
        cc.AdBanner.main().ShowAd(isShow);
    },
    ShowAdVideo() {
        //show 之前重新设置广告
        this.InitAdVideo();
        cc.AdVideo.main().ShowAd();
    },

    ShowAdInsert(rate) {

        // if (!AppVersion.appCheckHasFinished) {
        //     return;
        // }

        if (cc.Common.noad) {
            return;
        }
        // if (Common.isAndroid) {
        //     if (Common.GetDayIndexOfUse() <= Config.main.NO_AD_DAY) {
        //         return;
        //     }
        // }


        var randvalue = cc.Common.RandomRange(0, 100); 
        if (randvalue > rate) {
            return;
        }
        //show 之前重新设置广告
        //InitAdInsert();
        cc.AdInsert.main().ShowAd();

    },


    AdBannerDidReceiveAd(str) {
        /*
                int w = 0;
                int h = 0;
                int idx = str.IndexOf(":");
                string strW = str.Substring(0, idx);
                int.TryParse(strW, out w);
                string strH = str.Substring(idx + 1);
                int.TryParse(strH, out h);
                Debug.Log("AdBannerDidReceiveAd::w=" + w + " h=" + h);
                // if (gameBaseRun != null)
                // {
                //     gameBaseRun.AdBannerDidReceiveAd(w, h);
                // }
                if (callbackFinish != null) {
                    callbackFinish(AdType.BANNER, AdStatus.SUCCESFULL, str);
                }
        */
    },
    AdBannerDidReceiveAdFail(adsource) {

        /*
                int type = cc.AdConfigParser.SOURCE_TYPE_BANNER;
                AdInfo info = AdConfig.main.GetNextPriority(type);
                if (info != null) {
                    AdBanner.InitAd(info.source);
                    AdBanner.ShowAd(true);
                }
                else {
                    if (callbackFinish != null) {
                        callbackFinish(AdType.BANNER, AdStatus.FAIL, null);
                    }
                }
                */
    },

    AdBannerDidClick(adsource) {

    },
    AdInsertWillShow(str) {
        //Debug.Log(str);
        // PauseGame(true);

        if (callbackFinish != null) {
            callbackFinish(AdType.INSERT, AdStatus.START, null);
        }
    },
    AdInsertDidClose(str) {
        //s Debug.Log(str);
        // PauseGame(false);
        if (callbackFinish != null) {
            callbackFinish(AdType.INSERT, AdStatus.CLOSE, null);
        }
    },

    AdInsertDidFail(adsource) {

        // int type = AdConfigParser.SOURCE_TYPE_INSERT;
        // AdInfo info = AdConfig.main.GetNextPriority(type);
        // if (info != null) {
        //     AdInsert.InitAd(info.source);
        //     AdInsert.ShowAd();
        // }
        // else {
        //     if (callbackFinish != null) {
        //         callbackFinish(AdType.INSERT, AdStatus.FAIL, null);
        //     }
        // }

    },


    AdVideoDidFail(str) {
        // int type = AdConfigParser.SOURCE_TYPE_VIDEO;
        // AdInfo info = AdConfig.main.GetNextPriority(type);
        // if (info != null) {
        //     AdVideo.InitAd(info.source);
        //     AdVideo.ShowAd();
        // }
        // else {
        //     if (callbackFinish != null) {
        //         callbackFinish(AdType.VIDEO, AdStatus.FAIL, null);
        //     }
        // }
    },

    AdVideoDidStart(str) {
        // AudioPlay.main.Pause();
        // if (callbackFinish != null) {
        //     callbackFinish(AdType.VIDEO, AdStatus.START, null);
        // }

    },


    // void DoAdVideoDidFinish()
    // {
    //     //win10 微軟視頻廣告 播放結束調用需要在main ui thread 否則會crash
    //     string str = "advideo";
    //     bool ret = Common.GetBool(AppString.STR_KEY_BACKGROUND_MUSIC);
    //     if (ret) {
    //         AudioPlay.main.Play();
    //     }

    //     if (callbackFinish != null) {
    //         callbackFinish(AdType.VIDEO, AdStatus.SUCCESFULL, str);
    //     }
    // } 

    AdVideoDidFinish(str) {

        this.DoAdVideoDidFinish();

    },

});

AdKitCommon.main = new AdKitCommon();

cc.AdKitCommon = module.export = AdKitCommon;

