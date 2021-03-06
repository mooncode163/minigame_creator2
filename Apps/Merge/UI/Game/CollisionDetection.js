var UIViewController = require("UIViewController");
var UIView = require("UIView");

var CollisionDetection = cc.Class({
    extends: UIView,
    statics: {

    },

    properties: {
        isItDetected: true,//定义是否进行碰撞检测后逻辑判断
        playFallingSound: false,//定义是否播放过下落声音

    },
    onLoad: function () {
        this.isItDetected = true;
        this._super();
    },
    start: function () {
        this._super();
    },


    CheckCollision: function (other) {
        var _tag = other.node.name;//获取被碰撞物体的Tag 
      
        //播放下落声音
        if (other.node.name == cc.GameData.NameDeadLine && this.playFallingSound == false) {
            //播放下落声音
            this.playFallingSound = true;
            // AudioPlay.main.PlayFile(AppRes.AUDIO_Down);
            cc.AudioPlay.main().PlayByKey("Down");
        } 
        if (other.node.name != this.node.name) {
            // Debug.Log("OnCollisionEnter2D other.node.name != this.node.name"+_tag);
            return;
        }


         // 在出生地方不检测
        var enable = false;
        var limity = 10;
        var stepy = 0;
        stepy = Math.abs(this.node.position.y - cc.GameMerge.main().posYInit);
        if ( stepy< limity) {
            cc.Debug.Log("OnCollisionEnter2D stepy 1="+stepy);
            return;
        }
        stepy = Math.abs(other.node.position.y - cc.GameMerge.main().posYInit);
        if (stepy < limity) { 
            cc.Debug.Log("OnCollisionEnter2D stepy 2="+stepy);
            return;
        } 



        // 检测是否产生新的
        var otherDetect = other.node.getComponent(CollisionDetection).HasTheDeliveryBeenDetected();
        cc.Debug.Log("OnCollisionEnter2D otherDetect=" + otherDetect);
        if (this.isItDetected == true&&otherDetect) //判断碰撞物体的tag是否与自身一致和是否应该检测
        {
            this.isItDetected = false;//不进行检测
            other.node.getComponent(CollisionDetection).IgnoreDetection();//停止对方检测
            var v2 = other.node.position;//保存被碰撞物体的位置
            //   _tag = other.transform.tag;//获取被碰撞物体的Tag
            cc.Debug.Log("OnCollisionEnter2D other=" + _tag);
            //判断是否超出最大水果限制
            // if (Convert.ToInt32(_tag) < Generate.imageKeyFruit.Length)
            var keynext = cc.GameMerge.main().GetNextItem(_tag);

            if (cc.Common.isBlankString(keynext)) {
                cc.Debug.Log("OnCollisionEnter2D keynext blank");
                return;
            }

        
            {
                cc.Debug.Log("OnCollisionEnter2D keynext=" + keynext + " this.name=" + this.node.name + " other.name=" + other.node.name + " this.position=" + this.node.position + " other.position=" + other.node.position);
                //在被碰撞的物体原有的位置上生成新物体
                
                var uiNext = cc.GameMerge.main().CreateItem(keynext); 
                uiNext.node.setPosition(v2);
                uiNext.EnableGravity(true); 
                uiNext.hasGoDownDeadLine = true;
                cc.GameMerge.main().ShowMergeParticle(v2, _tag); 
                //播放合成声音 
                // AudioPlay.main.PlayFile(AppRes.AUDIO_Merge);
                cc.AudioPlay.main().PlayByKey("Merge");
                //增加分数

                cc.GameData.main().score += 10 * cc.GameMerge.main().GetIndexOfItem(keynext);
                cc.UIGameMerge.main().UpdateScore();

                cc.GameMerge.main().RemoveItemFromList(this.node);
                cc.GameMerge.main().RemoveItemFromList(other.node);
                cc.Debug.Log("OnCollisionEnter2D destroy ");
                this.node.destroy();
                other.node.destroy(); 

                if (keynext == cc.GameMerge.main().GetLastItem()) {
                    //game win 合成了大西瓜
                    //  UIGameMerge.main.OnGameFinish(false);
                }
            }
        }


    },

    /// <summary>
    /// 用来忽略检测
    /// </summary>
    IgnoreDetection: function ()//用于忽略检测
    {
        this.isItDetected = false;//不进行检测
    },

    HasTheDeliveryBeenDetected: function () {
        return this.isItDetected;
    },


    // onCollisionEnter:function(other,self){
    //     console.log('on collision enter onCollisionEnter other.name='+other.node.name);
    // },

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {
        console.log('OnCollisionEnter2D on collision enter onBeginContact otherCollider.name=' + otherCollider.node.name+" this.name="+this.node.name);
        this.CheckCollision(otherCollider);
        
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, other) {
        if (other.node.name == cc.GameData.NameDeadLine)
         {
            cc.Debug.Log("onPreSolve enter other.name="+other.node.name);
        } 
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    }

});
