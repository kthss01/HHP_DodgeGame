const MAX_BULLET_COUNT = 64 * 50;

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture, frame);

		this.scene = scene;

		this.setScale(0.25, 0.25);
	}

	fire(x, y, angle, speed = 300, frame = 1) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

		this.setFrame(frame);

		this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
		// this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity); // radian으로 회전
	}

	preUpdate(time, delta) {
		super.preUpdate(time, delta);

		// 화면 밖을 벗어나면 다시 총알 재사용할 수 있게 처리하는 부분
		// 이번 게임에서는 다 발사되면 게임종료됨
		// if (this.y >= 800) {
		// 	this.setActive(false);
		// 	this.setVisible(false);
		// }

		// 화면 밖을 벗어난 경우
		if (this.y >= 500) {
			this.setActive(false);
			this.setVisible(false);
		}
	}
}

export default class Bullets extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene);

		this.createMultiple({
			frameQuantity: MAX_BULLET_COUNT,
			key: "bullet",
			frame: 1,
			// randomFrame: true,
			active: false,
			visible: false,
			classType: Bullet,
		});

		this.leftBullets = MAX_BULLET_COUNT;
	}

	static preload = (scene) => {
		// scene.load.image("bullet", "assets/sprites/bullet/bullet7.png");
		scene.load.spritesheet("bullet", "assets/sprites/bullet/balls.png", {
			frameWidth: 17,
			frameHeight: 17,
		});
	};

	fireBullet(x, y, angle, speed, frame) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y, angle, speed, frame);
			this.leftBullets -= 1;
		}
	}

	danmakuFire = () => {
		this.angle = -52.5;
		this.angle2 = 52.5;
		this.angleSpeed = 30;
		this.angleSpeed2 = 30;
		this.speed = 100;
		this.delay = 100; // 발사 딜레이

		this.oneShootCnt = 8; // 한번에 발사 수

		// 시간에 따른 발사
		this.scene.time.addEvent({
			delay: this.delay,
			startAt: 0,
			repeat: this.getLength() / (this.oneShootCnt * 4) - 1,
			callback: () => {
				const x = 300;

				for (let i = 0; i < this.oneShootCnt; i++) {
					this.fireBullet(
						x,
						100,
						this.angle + (i / this.oneShootCnt) * 360,
						this.speed,
						1
					);
				}

				for (let i = 0; i < this.oneShootCnt; i++) {
					this.fireBullet(
						x - 100,
						200,
						this.angle + (i / this.oneShootCnt) * 360,
						this.speed,
						2
					);
				}

				this.angle = this.angle + this.angleSpeed;

				for (let i = 0; i < this.oneShootCnt; i++) {
					this.fireBullet(
						x,
						300,
						this.angle2 - (i / this.oneShootCnt) * 360,
						this.speed,
						3
					);
				}

				for (let i = 0; i < this.oneShootCnt; i++) {
					this.fireBullet(
						x + 100,
						200,
						this.angle2 - (i / this.oneShootCnt) * 360,
						this.speed,
						4
					);
				}

				this.angle2 = this.angle2 - this.angleSpeed2;
			},
		});
	};

	getLeftBullets = () => {
		return this.leftBullets;
	};

	getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};
}
