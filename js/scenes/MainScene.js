import Bullets from "../entities/Bullets.js";
import Player from "../entities/Player.js";

export default class MainScene extends Phaser.Scene {
	constructor(config) {
		super("MainScene");
		this.config = config;
	}

	preload = () => {
		Bullets.preload(this);
		Player.preload(this);
	};

	create = () => {
		this.createPlayer();
		this.createBullets();
		this.createScore();
	};

	createPlayer = () => {
		this.player = new Player({
			scene: this,
			x: 200,
			y: 200,
			texture: "boat",
		});

		// player 입력키 설정
		this.player.inputKeys = this.input.keyboard.addKeys({
			// WASD 입력
			// up: Phaser.Input.Keyboard.KeyCodes.W,
			// down: Phaser.Input.Keyboard.KeyCodes.S,
			// left: Phaser.Input.Keyboard.KeyCodes.A,
			// right: Phaser.Input.Keyboard.KeyCodes.D,

			// 화살표키 입력
			up: Phaser.Input.Keyboard.KeyCodes.UP,
			down: Phaser.Input.Keyboard.KeyCodes.DOWN,
			left: Phaser.Input.Keyboard.KeyCodes.LEFT,
			right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
		});
	};

	createBullets = () => {
		this.bullets = new Bullets(this);

		this.bullets.danmakuFire();

		// collide 처리
		this.player.body.onOverlap = true;
		this.physics.add.overlap(this.player, this.bullets);
		this.physics.world.on(
			"overlap",
			(gameObject1, gameObject2, body1, body2) => {
				gameObject1.setAlpha(0.5);
				gameObject2.setAlpha(0.5);

				this.showGameOver();
			}
		);
	};

	createScore = () => {
		this.score = this.add.text(
			0,
			0,
			`Left Bullet : ${this.bullets.getLength()}`,
			{
				fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
			}
		);
	};

	update = (time, delta) => {
		this.player.update(time, delta);

		this.updateScore();
	};

	updateScore = () => {
		this.score.setText(
			`Left Bullet : ${this.bullets.getLeftBullets()}`
			//\nUsed Bullet : ${this.bullets.getTotalUsed()} // 체크용
		);

		if (this.bullets.getTotalUsed() == 0) {
			this.showGameOver();
		}
	};

	showGameOver = () => {
		// console.log("game over");
		alert(`Game Over!! Left Bullets : ${this.bullets.getLeftBullets()}`);
		this.scene.pause();
	};
}
