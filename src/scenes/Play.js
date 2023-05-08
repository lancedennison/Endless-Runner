class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.Score = 0;
        this.color;
    }
    preload() {
        // load images/tile sprites
        //this.load.image('', './assets/.png');
        // load spritesheet
        //this.load.spritesheet('', './assets/.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        //this. = this.add.tileSprite(0, 0, game.config.width, game.config.height, '').setOrigin(0, 0);
        //this. = this.add.image(650, 700, '');

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //CONTROLS 1
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        //CONTROLS 2
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // add obj class
        //this. = new (this, 598, 690, '').setOrigin(0.5, 0);
        // animation config
        // this.anims.create({
        //     key: '',
        //     frames: this.anims.generateFrameNumbers('', { start: 0, end: 9, first: 0}),
        //     frameRate: 60
        // });
        // GAME OVER flag
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.score = this.add.text(20, 20, Score, scoreConfig);
        this.redGroup = new Group(this.physics.world, this, );
        this.greenGroup = new Group(this.physics.world, this, );
        this.blueGroup = new Group(this.physics.world, this, );
        this.yellowGroup = new Group(this.physics.world, this, );
    }
    update() {
        // check key input for restart
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (!this.gameOver) {               
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
        }
        handleKeys();
        // check collisions
        //this.checkCollision(this., this.);
    }
    handleKeys()
    {
        // fire button
        if(Phaser.Input.Keyboard.JustDown(this.key.Q) && Phaser.Input.Keyboard.JustDown(this.key.A)) {
            //red
            this.color = "red";
        }
        if(Phaser.Input.Keyboard.JustDown(this.key.W) && Phaser.Input.Keyboard.JustDown(this.key.S)) {
            //green
            this.color = "green";
        }
        if(Phaser.Input.Keyboard.JustDown(this.key.E) && Phaser.Input.Keyboard.JustDown(this.key.D)) {
            //blue
            this.color = "blue";
        }
        if(Phaser.Input.Keyboard.JustDown(this.key.R) && Phaser.Input.Keyboard.JustDown(this.key.F)) {
            //yellow
            this.color = "yellow";
        }
    }
    checkCollision(obj1, obj2) {
        // simple AABB checking
        if(true/*collision*/) {
                //do something
        }
        else {
          return false;
        }
    }
}