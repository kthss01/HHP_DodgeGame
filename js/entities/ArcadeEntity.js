export default class ArcadeEntity extends Phaser.Physics.Arcade.Sprite {
	constructor(data) {
		let { name, scene, x, y, texture, frame } = data;

		super(scene, x, y, texture, frame);

		this.x += this.width / 2;
		this.y += this.height / 2;

		this.name = name;
		this._position = new Phaser.Math.Vector2(this.x, this.y);

		this.setDepth(1);

		this.scene.add.existing(this);
		// game object render면 추가됨 preUpdate method 있으면 이것도 update list에 추가
		this.scene.physics.add.existing(this);
	}

	get position() {
		this._position.set(this.x, this.y);
		return this._position;
	}

	get velocity() {
		return this.body.velocity;
	}
}
