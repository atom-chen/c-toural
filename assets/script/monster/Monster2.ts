import { ConstConfig } from '../config/ConfigConst';
const { ccclass, property } = cc._decorator;

/**
 * Monster 2
 *
 * @export
 * @class Monster2
 * @extends {cc.Component}
 */
@ccclass
export class Monster2 extends cc.Component {

	/**
	 * Monster2血量，默认为20
	 */
	private static monster2Blood: number = ConstConfig.MONSTER2_BLOOD;
	/**
	 * 怪物2
	 */
	@property(cc.Node)
	private monster2: cc.Node = null;

	/**
	 * 速度.
	 */
	private speed: number = 30;

	/**
	 * on collision enter
	 *
	 * @param {*} other
	 * @param {*} self
	 * @memberof Monster2
	 */
	public onCollisionEnter(other: any, self: any): void {
		// 如果碰撞到了攻击特效
		if (other.node.group === ConstConfig.ATTACK_GROUP_NAME) {
			// 播放闪烁动画
			const action: cc.ActionInterval = cc.blink(1, 5);
			const callFun: cc.ActionInstant = cc.callFunc(this.displayHero, this);
			const seq: cc.ActionInterval = cc.sequence(action, callFun);

			// 血量减少
			this.monster2.runAction(seq);
			Monster2.monster2Blood -= ConstConfig.HERO_ATTACK;

			// 判断血量
			if (Monster2.monster2Blood <= 0) {
				this.monster2.destroy();
			}
		}
	}

	/**
	 * onload
	 *
	 * @protected
	 * @memberof Monster2
	 */
	protected onLoad(): void {
		// 播放动画
		const monsterAnimation2: cc.Animation = this.monster2.getComponent(cc.Animation);

		// 每隔4秒走一次
		monsterAnimation2.play('monster2Run');
		this.schedule(this.monster2Run, 6);
	}

	/**
	 * start
	 *
	 * @protected
	 * @memberof Monster2
	 */
	protected start(): void {
		// hole
	}

	/**
	 * Update.
	 *
	 * @protected
	 * @param dt - Date time.
	 * @memberof Monster2
	 * @returns
	 * @example
	 */
	protected update(dt: number): void {
		// hole
	}

	/**
	 * change direction
	 *
	 * @private
	 * @memberof Monster2
	 */
	private changeDirection(): void {
		if (this.monster2.scaleX > 0) {
			this.monster2.scaleX = -1.5;
		} else {
			this.monster2.scaleX = 1.5;
		}
	}

	/**
	 * destroy hero
	 *
	 * @private
	 * @memberof Monster2
	 */
	private displayHero(): void {
		this.monster2.opacity = 255;
		this.monster2.active = true;
	}

	/**
	 * 自动行走
	 *
	 * @private
	 * @memberof Monster2
	 * @returns
	 * @example
	 */
	private monster2Run(): void {
		if (this.monster2.scaleX < 0) {
			const moveBegin: cc.ActionInterval = cc.moveTo(2, 2351, 130);
			const moveEnd: cc.ActionInterval = cc.moveTo(2, 2578, 130);
			const callback: cc.ActionInstant = cc.callFunc(this.changeDirection, this);
			const seq: cc.ActionInterval = cc.sequence(moveBegin, moveEnd, callback);

			this.monster2.runAction(seq);
		} else {
			const moveBegin: cc.ActionInterval = cc.moveTo(2, 2578, 130);
			const moveEnd: cc.ActionInterval = cc.moveTo(2, 2351, 130);
			const callback: cc.ActionInstant = cc.callFunc(this.changeDirection, this);
			const seq: cc.ActionInterval = cc.sequence(moveBegin, moveEnd, callback);

			this.monster2.runAction(seq);
		}
	}
}
