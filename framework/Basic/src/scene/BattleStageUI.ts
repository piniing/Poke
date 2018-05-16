class BattleStageUI extends eui.Component implements eui.UIComponent{


	private _topHeader:TopHeader = null;//顶部用户自己的头像和积分位置
	
	private _battleControl: battle.BattleStageControl = null; //对战控制

	private _sendCardAnimal:battle.SendCardAnimal = null;

	public _playerHeadSprite:egret.Sprite = null; //对手头像放置地方

	public _myCardSprote:egret.Sprite = null;
	public _sendCardSprote:egret.Sprite = null;
	
	public constructor() {
		super();
		
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		console.log("partAdded",partName,instance);
		if(partName == "topHeader"){
			this._topHeader = instance;
		}
	}


	/**
	 * 添加几个假的用户
	 */
	public explameAddPlayer(){
		GlobalData.myUser = new GUser();
		GlobalData.myUser.avator = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526393669326&di=835161a2290b3b6ae1740bd39eb52f3e&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201609%2F16%2F20160916214658_UcHjJ.jpeg";
		GlobalData.myUser.nickName = "vv";
		GlobalData.myUser.userID = 85642;
		GlobalData.myUser.pointValue = 12535;
	}

	/**
	 * 显示顶部的用户信息
	 */
	public showTopUserInfo(user ?:GUser){
		if(user){
			this._topHeader.init();
			this._topHeader.ShowAvator(user.avator);
			this._topHeader.SetNickName(user.nickName);
			this._topHeader.SetPointValue(user.pointValue);
		}
	}

	public init(){
		this.explameAddPlayer();
		//显示用户头像
		this.showTopUserInfo(GlobalData.myUser);
		
		this._myCardSprote = new egret.Sprite();
		this.addChild(this._myCardSprote);

		//发牌容器
		this._sendCardSprote = new egret.Sprite();
		this.addChild(this._sendCardSprote);
		this._sendCardSprote.touchChildren = false;
		this._sendCardSprote.touchEnabled = false;

		// 发牌动画类
		this._sendCardAnimal = new battle.SendCardAnimal();
		this._sendCardAnimal.Init(this._sendCardSprote);

		
		this._playerHeadSprite = new egret.Sprite();
		this.addChild(this._playerHeadSprite);

		// 控制对战舞台类
		this._battleControl = new battle.BattleStageControl(this);
		this._battleControl.init();
	}

	//添加用户
	public addPlayer(user:GUser){
		this._battleControl.addPlayer(user);
	}

	/**
	 * 发牌动画
	 */
	public SendCard(player:battle.Player):void{
		this._sendCardAnimal.StartAnimal(player, function (): void {

                // 其他隐藏,除自己的
                //全部隐藏起来等待服务器下发叫地主通知
                // if (this._btnProxy.State != GameBtnProxy.STATE_Qiangdizhu && this._btnProxy.State != GameBtnProxy.STATE_Playing) {
                //     this._btnProxy.HideAll();
                // }
            }, this);
	}


}