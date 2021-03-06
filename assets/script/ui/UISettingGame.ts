const { ccclass, property } = cc._decorator;

/**
 * setting game
 *
 * @export
 * @class SettingGame
 * @extends {cc.Component}
 */
@ccclass
export class SettingGame extends cc.Component {
	/**
	 * 设置按钮.
	 */
	@property(cc.Node)
	private settingButton: cc.Node = null;

	/**
	 * onload
	 *
	 * @protected
	 * @memberof SettingGame
	 */
	protected onLoad(): void {
		// 设置点击事件
		this.settingButton.on(cc.Node.EventType.TOUCH_START, this.settingPress, this);
		this.settingButton.on(cc.Node.EventType.TOUCH_END, this.settingPressCancel, this);
		this.settingButton.on(cc.Node.EventType.TOUCH_CANCEL, this.settingPressCancel, this);
	}

	/**
	 * setting press
	 *
	 * @private
	 * @memberof SettingGame
	 */
	private settingPress(): void {
		// 按钮缩放
		this.settingButton.scaleX = 1.2;
		this.settingButton.scaleY = 1.2;
	}

	/**
	 * 按钮取消.
	 *
	 * @private
	 * @memberof SettingGame
	 * @returns
	 * @example
	 */
	private settingPressCancel(): void {
		// 按钮缩放
		this.settingButton.scaleX = 1;
		this.settingButton.scaleY = 1;
	}
}
