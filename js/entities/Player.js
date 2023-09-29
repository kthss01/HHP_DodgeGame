import ArcadeEntity from "./ArcadeEntity.js";

export default class Player extends ArcadeEntity {
	constructor(data) {
		let { scene, x, y, texture, frame } = data;
		super({ ...data, name: "player" });
	}

	static preload = (scene) => {
		scene.load.image("boat", "assets/sprites/boat/boat.png");
	};

	update = () => {};
}
