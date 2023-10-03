import MainScene from "./scenes/MainScene.js";

const config = {
	width: 600,
	height: 500,
	backgroundColor: "rgba(0,0,75,0)",
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
