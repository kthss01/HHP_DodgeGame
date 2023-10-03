import MainScene from "./scenes/MainScene.js";
import EndingScene from "./scenes/EndingScene.js";

const config = {
	width: 600,
	height: 500,
	backgroundColor: "rgba(0,0,75,0)",
	type: Phaser.AUTO,
	parent: "phaser-example",
	scene: [MainScene, EndingScene],
	physics: {
		default: "arcade",
		arcade: {
			debug: false,
		},
	},
};

new Phaser.Game(config);
