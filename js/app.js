import MainScene from "./scenes/MainScene.js";

const config = {
	width: 600,
	height: 500,
	backgroundColor: "#2d2d2d",
	type: Phaser.AUTO,
	parent: "phaser-example",
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
};

new Phaser.Game(config);
