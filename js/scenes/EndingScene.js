export default class EndingScene extends Phaser.Scene {
	constructor(config) {
		super("EndingScene");
		this.config = config;
	}

	preload = () => {
		this.load.image("ending", "assets/sprites/game_over.jpg");
	};

	create = () => {
		this.bg = this.add
			.sprite(300, 250, "ending")
			.setDisplaySize(500, 400)
			.setAlpha(0);
		this.name = this.add.text(50, 25, "총알 피하기 : 김태훈", {
			fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
		});
	};

	update = () => {
		if (this.bg.alpha <= 1) {
			this.bg.setAlpha(this.bg.alpha + 0.01);
		}
	};
}
