class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
    // load audio
        //this.load.audio('', './assets/.wav');
    }
    create() {
        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - 50, 'RGBY Runner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 25, 'Controls: ←↑↓→', menuConfig).setOrigin(0.5);
        //letters and boxes for Q-W-E-R
        this.Q = this.add.text(QWER.x, QWER.y, 'Q', letterConfig).setOrigin(0.5);
        this.W = this.add.text(QWER.x + space, QWER.y, 'W', letterConfig).setOrigin(0.5);
        this.E = this.add.text(QWER.x + space*2, QWER.y, 'E', letterConfig).setOrigin(0.5);
        this.R = this.add.text(QWER.x + space*3, QWER.y, 'R', letterConfig).setOrigin(0.5);
        this.Q.setBackgroundColor(redHex);
        this.W.setBackgroundColor(greenHex);
        this.E.setBackgroundColor(blueHex);
        this.R.setBackgroundColor(yellowHex);
        //letters and boxes for A-S-D-F
        this.A = this.add.text(ASDF.x, ASDF.y, 'A', letterConfig).setOrigin(0.5);
        this.S = this.add.text(ASDF.x + space, ASDF.y, 'S', letterConfig).setOrigin(0.5);
        this.D = this.add.text(ASDF.x + space*2, ASDF.y, 'D', letterConfig).setOrigin(0.5);
        this.F = this.add.text(ASDF.x + space*3, ASDF.y, 'F', letterConfig).setOrigin(0.5);
        this.A.setBackgroundColor(redHex);
        this.S.setBackgroundColor(greenHex);
        this.D.setBackgroundColor(blueHex);
        this.F.setBackgroundColor(yellowHex);
        //done with letters
        // define keys

        this.input.keyboard.on('keydown', (event) => {
            this.scene.start('playScene');
        });        
    }
    update() {
    }
}