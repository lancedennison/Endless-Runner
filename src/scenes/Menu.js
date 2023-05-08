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
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'RGBY Runner', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Controls:', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, '', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + (borderUISize + borderPadding)*2, '', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (this.input.keyboard.on('keydown')) {
            this.scene.start('playScene');    
        }
    }
}