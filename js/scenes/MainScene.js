import Player from "../entities/Player.js";

export default class MainScene extends Phaser.Scene {
	constructor(config) {
		super("MainScene");
		this.config = config;
	}

	preload = () => {
		Player.preload(this);
	};

	create = () => {
		this.createPlayer();
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

	update = (time, delta) => {
		this.player.update(time, delta);
	};
}
