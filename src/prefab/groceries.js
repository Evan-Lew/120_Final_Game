class Groceries extends Phaser.GameObjects.Sprite {
    //construct guide: x, y are where sprite are created
    //                 texture is atlas name, for example, 'tomato_atlas'
    //                 frame is starting frame, for example, 'tomato_idle_01'
    //                 quality is defined as globle in main, -1 -> Bad,  0 -> Normal,  1 -> Good
    constructor(scene, x, y, texture, frame, quality) {
        super(scene, x, y, texture, frame);    
        scene.add.existing(this);
        this.quality = quality;
    }

    //function plays anime
    flipNormalQuality(){
        this.play("tomato_normal");
    }
    //function plays anime    
    flipBadQuality() {
        this.play("tomato_bad");
    }
    
    //function plays anime   
    flipGoodQuality() {
        //assets not ready
    }
}




    /*old
    constructor(scene, x, y, texture, frame, front, goodQuality, badQuality) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.front = front;
        this.goodQuality = goodQuality;
        this.badQuality = badQuality;
    */

    /*old
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
    */

