const MAX_BULLET_COUNT = 500;

class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, "bullet");

		this.scene = scene;
	}

	fire(x, y, angle, speed = 300) {
		this.body.reset(x, y);

		this.setActive(true);
		this.setVisible(true);

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
			active: false,
			visible: false,
			classType: Bullet,
		});

		this.leftBullets = MAX_BULLET_COUNT;
	}

	static preload = (scene) => {
		scene.load.image("bullet", "assets/sprites/bullet/bullet7.png");
	};

	fireBullet(x, y, angle) {
		const bullet = this.getFirstDead(false);

		if (bullet) {
			bullet.fire(x, y, angle);
			this.leftBullets -= 1;
		}
	}

	danmakuFire = () => {
		// 시간에 따른 발사
		this.scene.time.addEvent({
			delay: 100,
			startAt: 100,
			repeat: this.getLength() - 1,
			callback: () => {
				const x = this.getRandomInt(600);

				this.fireBullet(x, -25, 90);
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
