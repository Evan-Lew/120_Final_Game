class Groceries extends Phaser.GameObjects.Sprite {
    //construct guide: x, y are where sprite are created
    //                 texture is atlas name, for example, 'tomato_atlas'
    //                 frame is starting frame, for example, 'tomato_idle_01'
    //                 quality is defined as globle in main, -1 -> Bad,  0 -> Normal,  1 -> Good
    constructor(scene, x, y, texture, frame, quality, ID) {
        super(scene, x, y, texture, frame);    
        scene.add.existing(this);
        this.quality = quality;
        this.ID = ID;
        this.leftClickFlag = false;
        this.movedToInventory = false;
    }

    //function plays anime
    flipGrocery(){
        if(this.quality == 1 && this.ID == ID_GROCERY_TOMATO ){
            //this.play("tomato_good");
            console.log("no anime, but I am good tomato");
        }else if(this.quality == 0 && this.ID == ID_GROCERY_TOMATO){
            this.play("tomato_normal");
        }else if(this.quality == -1 && this.ID == ID_GROCERY_TOMATO){
            this.play("tomato_bad");
        }else{
            //remove this on final
            console.log("Error: unable to load anime");
        }
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

