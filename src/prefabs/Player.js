// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 2;
        this.acceleration = 0;
        this.orign = {
            x: this.x,
            y: this.y
        };
        this.create();
    }
    create() {
        // this.anims.create({
        //     key: '',
        //     frames: this.anims.generateFrameNumbers('', { start: 1, end: 5, first: 1}),
        //     frameRate: 60
        // });
    }
    update() {
        
    }
    getColor()
    {
        return this.color
    }
}