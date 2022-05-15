class Groceries extends Phaser.GameObjects.Sprite {
    //construct guide: x, y are where sprite are created
    //                 texture is atlas name, for example, 'tomato_atlas'
    //                 frame is starting frame, for example, 'tomato_idle_01'
    //                 quality is defined as globle in main, -1 -> Bad,  0 -> Normal,  1 -> Good
    //                 idles are used in inventory constructor
    constructor(scene, x, y, texture, frame, frame_bad_idle, frame_normal_idle, frame_good_idle, quality, ID) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.quality = quality;
        this.ID = ID;
        this.leftClickFlag = false;
        this.movedToInventory = false;
        this.idle_normal = frame_normal_idle;
        this.idle_bad = frame_bad_idle;
        this.idle_good = frame_good_idle;

        if (this.quality == QUALITY_BAD) {
            this.idle = this.idle_bad;
        } else if (this.quality == QUALITY_GOOD) {
            this.idle = this.idle_good;
        } else {
            this.idle = this.idle_normal;
        }
    }

    //function plays anime
    flipGrocery() {
        if (this.ID == ID_GROCERY_TOMATO) {
            if (this.quality == 1) {
                this.play("tomato_good");
            } else if (this.quality == 0) {
                this.play("tomato_normal");
            } else if (this.quality == -1) {
                this.play("tomato_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
        }else if(this.ID == ID_GROCERY_CARROT){
            if (this.quality == 1) {
                this.play("carrot_good");
            } else if (this.quality == 0) {
                this.play("carrot_normal");
            } else if (this.quality == -1) {
                this.play("carrot_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_ONION){
            if (this.quality == 1) {
                this.play("onion_good");
            } else if (this.quality == 0) {
                this.play("onion_normal");
            } else if (this.quality == -1) {
                this.play("onion_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_CORN){
            if (this.quality == 1) {
                this.play("corn_good");
            } else if (this.quality == 0) {
                this.play("corn_normal");
            } else if (this.quality == -1) {
                this.play("corn_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_POTATO){
            if (this.quality == 1) {
                this.play("potato_good");
            } else if (this.quality == 0) {
                this.play("potato_normal");
            } else if (this.quality == -1) {
                this.play("potato_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
        }else{
            console.log("ERROR: unable to load ID");
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

