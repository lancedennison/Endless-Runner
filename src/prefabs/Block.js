// Player prefab
class Block extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        // add object to existing scene
        scene.add.existing(this);
        console.log(this);
    }
    update() {
        if(this.x < 0 - this.width) {
            this.destroy();
        }
    }
}