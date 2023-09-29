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
		this.player = new Player({
			scene: this,
			x: 200,
			y: 200,
			texture: "boat",
		});
	};
}
