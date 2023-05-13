class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.gameOver = false;
        this.blockER = {
            blockNumber: 0,
            spawnDelay: 5000,
            timeGate: 0,
            lastSpawn: 0
        }
        this.validRange = {
            min: 200,
            max: (game.config.height - 200)
        }
        this.score = 0;
    }
    preload() {
        // load images/tile sprites
        this.load.image('playerSprite', './assets/player.png');
        this.load.image('redSprite', './assets/player/playerNOTred.png');
        this.load.image('greenSprite', './assets/player/playerNOTgreen.png');
        this.load.image('blueSprite', './assets/player/playerNOTblue.png');
        this.load.image('yellowSprite', './assets/player/playerNOTyellow.png');
        this.load.image('looping', './assets/rows.png');
        // load spritesheet
        //this.load.spritesheet('', './assets/.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        //-----------------------------------------------------------------------------------------
        //  UI
        //-----------------------------------------------------------------------------------------
        this.timer = this.add.text(game.config.width/2, 20, Math.floor(this.time.now/1000), timerConfig).setOrigin(0.5).setDepth(2);
        this.Q = this.add.text(20, 20, 'Q', letterConfig).setDepth(2);
        this.W = this.add.text(this.Q.x + 45, 20, 'W', letterConfig).setDepth(2);
        this.E = this.add.text(this.Q.x + 45*2, 20, 'E', letterConfig).setDepth(2);
        this.R = this.add.text(this.Q.x + 45*3, 20, 'R', letterConfig).setDepth(2);
        this.Q.setBackgroundColor(redHex);
        this.W.setBackgroundColor(greenHex);
        this.E.setBackgroundColor(blueHex);
        this.R.setBackgroundColor(yellowHex);
        //letters and boxes for A-S-D-F
        this.A = this.add.text(45, 65, 'A', letterConfig).setDepth(2);
        this.S = this.add.text(this.A.x + 45, 65, 'S', letterConfig).setDepth(2);
        this.D = this.add.text(this.A.x + 45*2, 65, 'D', letterConfig).setDepth(2);
        this.F = this.add.text(this.A.x + 45*3, 65, 'F', letterConfig).setDepth(2);
        this.A.setBackgroundColor(redHex);
        this.S.setBackgroundColor(greenHex);
        this.D.setBackgroundColor(blueHex);
        this.F.setBackgroundColor(yellowHex);
        this.scorePlayer = this.add.text(this.R.x + 65, 20, this.score, scoreConfig);
        //-----------------------------------------------------------------------------------------
        //  SETUP VARS
        //-----------------------------------------------------------------------------------------
        this.color = lightHex;
        this.speed = -250;
        this.spawnTimer;
        this.time.now = 0;
        //-----------------------------------------------------------------------------------------
        //  KEYS
        //-----------------------------------------------------------------------------------------
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
        // animation config
        // this.anims.create({
        //     key: '',
        //     frames: this.anims.generateFrameNumbers('', { start: 0, end: 9, first: 0}),
        //     frameRate: 60
        // });
        //-----------------------------------------------------------------------------------------
        //  BLOCK GROUPS
        //-----------------------------------------------------------------------------------------
        this.groupConfig = {
            collideWorldBounds: false,
            immovable: true,
            velocityX: -250
        }
        this.redGroup = this.physics.add.group(this.groupConfig);
        this.greenGroup = this.physics.add.group(this.groupConfig);
        this.blueGroup = this.physics.add.group(this.groupConfig);
        this.yellowGroup = this.physics.add.group(this.groupConfig);
        this.physics.add.collider(this.redGroup);
        this.physics.add.collider(this.greenGroup);
        this.physics.add.collider(this.blueGroup);
        this.physics.add.collider(this.yellowGroup);
        //-----------------------------------------------------------------------------------------
        //  SPAWN
        //-----------------------------------------------------------------------------------------
        this.player = new Player(this, game.config.width/3, game.config.height/2, 'playerSprite');
        this.spawn();
        this.spawnTimer = this.time.addEvent({
            delay: this.blockER.spawnDelay,
            callback: this.spawn,
            callbackScope: this,
            loop: true
        });
    }
    update() {
        this.timer.text = Math.floor(this.time.now/1000);
        // this.background.tilePositionX += 5;
        // check key input for restart
        if (this.gameOver) {               
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', menuConfig).setOrigin(0.5).setDepth(2);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (ESC) to Restart or ← for Menu', menuConfig).setOrigin(0.5).setDepth(2);
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }
            //do death animation
            this.player.setAlpha(0);
        }
        if (Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.restart();
        }
        this.blockSpawner();
        this.groupConfig.velocityX = this.speed;
        this.redGroup.setVelocityX(this.speed);
        this.greenGroup.setVelocityX(this.speed);
        this.blueGroup.setVelocityX(this.speed);
        this.yellowGroup.setVelocityX(this.speed);
        this.handleKeys();
        this.checkCollision();
        this.checkBlocks();
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
        if(!this.gameOver)
        {
            //red
            if(this.color != redHex)
            {
                this.physics.world.collide(this.player, this.redGroup, () => {this.gameOver = true});
            }
            else
            {
                this.physics.world.overlap(this.player, this.redGroup, () => {this.scorePass()});
            }
            //green
            if(this.color != greenHex)
            {
                this.physics.world.collide(this.player, this.greenGroup, () => {this.gameOver = true});
            }
            else
            {
                this.physics.world.overlap(this.player, this.greenGroup, () => {this.scorePass()});
            }
            //blue
            if(this.color != blueHex)
            {
                this.physics.world.collide(this.player, this.blueGroup, () => {this.gameOver = true});
            }
            else
            {
                this.physics.world.overlap(this.player, this.blueGroup, () => {this.scorePass()});
            }
            //yellow
            if(this.color != yellowHex)
            {
                this.physics.world.collide(this.player, this.yellowGroup, () => {this.gameOver = true});
            }
            else
            {
                this.physics.world.overlap(this.player, this.yellowGroup, () => {this.scorePass()});
            }
        }
    }
    scorePass() {
        this.scorePlayer.text = this.score + 10;
        let text = this.add.text(this.scorePlayer.x + this.scorePlayer.width + 10, this.scorePlayer.y, "+10!", scoreConfig);
        text.fontSize = '8px';
        this.tweens.add({
            targets: text,
            alpha: 0,
            duration: 1000, // duration in milliseconds
            ease: 'Linear',
            onComplete: () => { text.destroy() } // when the tween is complete
        });
    }
    checkBlocks() {
        this.physics.world.collide(this.redGroup, [this.greenGroup, this.blueGroup, this.yellowGroup], (block, blocks) => {block.x += (66); console.log("changed");});
        this.physics.world.collide(this.greenGroup, [this.blueGroup, this.yellowGroup], (block, blocks) => {block.x += (66); console.log("changed");});
        this.physics.world.collide(this.blueGroup, [this.yellowGroup], (block, blocks) => {block.x += (66); console.log("changed");});
    }
    blockSpawner() {
        if(Math.floor(this.time.now/1000) > this.blockER.timeGate)
        {
            if(this.blockER.spawnDelay > 2000)
                this.blockER.spawnDelay -= 500;
            this.blockER.timeGate += 10;
            if(this.speed < 700)
                this.speed -= 75;
            this.time.addEvent({
                delay: this.blockER.spawnDelay,
                callback: this.spawn,
                callbackScope: this,
                loop: true
            });
        }
    }
    spawn() {
        let rC, rH;
        rC = Math.floor(Math.random() * 4) + 1;
        rH = (Math.random() * this.validRange.max) + this.validRange.min;
        if(rC == 1)
        {
            this.redGroup.add(new Block(this, game.config.width + 60, rH, 20, 200, redFILL), true);
        }
        if(rC == 2)
        {
            this.greenGroup.add(new Block(this, game.config.width + 60, rH, 20, 200, greenFILL), true);
        }
        if(rC == 3)
        {
            this.blueGroup.add(new Block(this, game.config.width + 60, rH, 20, 200, blueFILL), true);
        }
        if(rC == 4)
        {
            this.yellowGroup.add(new Block(this, game.config.width + 60, rH, 20, 200, yellowFILL), true);
        }
    }
}