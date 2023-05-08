// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, color, frame) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        this.create();
    }
    create() {
        
    }
    update() {
        if(this.x < 0 - this.width) {
            this.destroy();
        }
    }
}