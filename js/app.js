import MainScene from "./scenes/MainScene.js";

const config = {
	width: 512,
	height: 512,
	backgroundColor: "#2d2d2d",
	type: Phaser.AUTO,
	parent: "phaser-example",
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
};

new Phaser.Game(config);
