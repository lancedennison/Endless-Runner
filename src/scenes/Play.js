class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.score = 0;
        this.color = lightHex;
    }
    preload() {
        // load images/tile sprites
        this.load.image('playerSprite', './assets/player.png');
        this.load.image('redSprite', './assets/player/playerNOTred.png');
        this.load.image('greenSprite', './assets/player/playerNOTgreen.png');
        this.load.image('blueSprite', './assets/player/playerNOTblue.png');
        this.load.image('yellowSprite', './assets/player/playerNOTyellow.png');
        // load spritesheet
        //this.load.spritesheet('', './assets/.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite
        //this. = this.add.tileSprite(0, 0, game.config.width, game.config.height, '').setOrigin(0, 0);
        //this. = this.add.image(650, 700, '');

        // define keys
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
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
        this.scoreDisplay = this.add.text(20, 20, this.score, scoreConfig);
        // this.redGroup = new Group(this.physics.world, this);
        // this.greenGroup = new Group(this.physics.world, this);
        // this.blueGroup = new Group(this.physics.world, this);
        // this.yellowGroup = new Group(this.physics.world, this);
        this.groupConfig = {
            collideWorldBounds: false,
            immovable: true,
            velocityX: -10
        }
        this.redGroup = this.physics.add.group(this.groupConfig);
        this.greenGroup = this.physics.add.group(this.groupConfig);
        this.blueGroup = this.physics.add.group(this.groupConfig);
        this.yellowGroup = this.physics.add.group(this.groupConfig);
        this.physics.add.collider(this.redGroup);
        this.physics.add.collider(this.greenGroup);
        this.physics.add.collider(this.blueGroup);
        this.physics.add.collider(this.yellowGroup);
        this.redGroup.add(new Block(this, 600, 300, 20, 100, greenHex), true);
        this.add.rectangle(600, 300, 20, 100, greenHex);
        //initalize player
        this.player = new Player(this, game.config.width/3, game.config.height/2, 'playerSprite');
    }
    update() {
        // check key input for restart
        if (this.gameOver) {               
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (ESC) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
            if (Phaser.Input.Keyboard.JustDown(keyESC)) {
                this.scene.restart();
            }
            //do death animation
            this.player.setAlpha(0);
        }
        this.handleKeys();
        this.checkCollision();
        this.player.update();
    }
    handleKeys()
    {
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyQ) || Phaser.Input.Keyboard.JustDown(keyA)) {
            //red
            this.color = redHex;
            this.changBackground();
            this.player.setColor(this.color);
        }
        if(Phaser.Input.Keyboard.JustDown(keyW) || Phaser.Input.Keyboard.JustDown(keyS)) {
            //green
            this.color = greenHex;
            this.changBackground();
            this.player.setColor(this.color);
        }
        if(Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyD)) {
            //blue
            this.color = blueHex;
            this.changBackground();
            this.player.setColor(this.color);
        }
        if(Phaser.Input.Keyboard.JustDown(keyR) || Phaser.Input.Keyboard.JustDown(keyF)) {
            //yellow
            this.color = yellowHex;
            this.changBackground();
            this.player.setColor(this.color);
        }
    }
    changBackground() {
        this.cameras.main.setBackgroundColor(this.color);
    }
    checkCollision() {
        //check collisions
        if(this.color != redHex)
        {
            this.physics.world.collide(this.player, this.redGroup, (Player, Block) =>
            {
                this.gameOver = true;
            });
        }
        if(this.color != greenHex)
        {
            this.physics.world.collide(this.player, this.greenGroup, (Player, Block) =>
            {
                this.gameOver = true;
            });
        }
        if(this.color != blueHex)
        {
            this.physics.world.collide(this.player, this.blueGroup, (Player, Block) =>
            {
                this.gameOver = true;
            });
        }
        if(this.color != yellowHex)
        {
            this.physics.world.collide(this.player, this.yellowGroup, (Player, Block) =>
            {
                this.gameOver = true;
            });
        }
    }
}