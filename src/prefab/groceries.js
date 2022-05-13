class Groceries extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, front, goodQuality, badQuality) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.front = front;
        this.goodQuality = goodQuality;
        this.badQuality = badQuality;
    
    }

    flipGoodQuality() {
        var grocery = this;
        grocery.setTexture(grocery.texture, grocery.goodQuality);
        setTimeout(function() {
            grocery.setTexture(grocery.texture, grocery.front);
        }, 1000);
    }

    flipBadQuality() {
        var grocery = this;
        grocery.setTexture(grocery.texture, grocery.badQuality);
        setTimeout(function () {
            grocery.setTexture(grocery.texture, grocery.front);
        }, 1000);
    }

}