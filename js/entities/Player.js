import ArcadeEntity from "./ArcadeEntity.js";
import Bullet from "./Bullets.js";

export default class Player extends ArcadeEntity {
	constructor(data) {
		let { scene, x, y, texture, frame } = data;
		super({ ...data, name: "player" });

		this.setScale(0.25, 0.25);

		this.speed = 200;

		this.setSize(66, 50, true);
		this.setCircle(36);
	}

	static preload = (scene) => {
		scene.load.image("boat", "assets/sprites/boat/boat.png");
	};

	update = (time, delta) => {
		this.updateInput(time, delta);
	};

	// 캐릭터 입력 조작
	updateInput = (time, delta) => {
		let playerVelocity = new Phaser.Math.Vector2();
		if (this.inputKeys.left.isDown) {
			playerVelocity.x = -1;
		} else if (this.inputKeys.right.isDown) {
			playerVelocity.x = 1;
		}
		if (this.inputKeys.up.isDown) {
			playerVelocity.y = -1;
		} else if (this.inputKeys.down.isDown) {
			playerVelocity.y = 1;
		}
		playerVelocity.normalize();
		playerVelocity.scale(this.speed);
		this.setVelocity(playerVelocity.x, playerVelocity.y);
	};
}
