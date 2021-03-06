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
        this.key = texture;
        this.leftClickFlag = false;
        this.movedToInventory = false;
        this.idle_normal = frame_normal_idle;
        this.idle_bad = frame_bad_idle;
        this.idle_good = frame_good_idle;
        this.price = 0;

        if (this.quality == QUALITY_BAD) {
            this.idle = this.idle_bad;
        } else if (this.quality == QUALITY_GOOD) {
            this.idle = this.idle_good;
        } else {
            this.idle = this.idle_normal;
        }

        this.setPrice();
    }

    //function plays anime
    flipGrocery() {
        if(this.ID == ID_GROCERY_SLUG){
            this.play("bananaslug_normal");
        }else if(this.ID == ID_GROCERY_TOMATO) {
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
        }else if(this.ID == ID_GROCERY_CHICKEN){
            if (this.quality == 1) {
                this.play("chicken_good");
            } else if (this.quality == 0) {
                this.play("chicken_normal");
            } else if (this.quality == -1) {
                this.play("chicken_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
            
        }else if(this.ID == ID_GROCERY_STEAK){
            if (this.quality == 1) {
                this.play("steak_good");
            } else if (this.quality == 0) {
                this.play("steak_normal");
            } else if (this.quality == -1) {
                this.play("steak_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
            
        }else if(this.ID == ID_GROCERY_FISH){
            
            if (this.quality == 1) {
                this.play("fish_good");
            } else if (this.quality == 0) {
                this.play("fish_normal");
            } else if (this.quality == -1) {
                this.play("fish_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
        }else if(this.ID == ID_GROCERY_BEEF){
            
            if (this.quality == 1) {
                this.play("beef_good");
            } else if (this.quality == 0) {
                this.play("beef_normal");
            } else if (this.quality == -1) {
                this.play("beef_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
        }else if(this.ID == ID_GROCERY_SHRIMP){
            if (this.quality == 1) {
                this.play("shrimp_good");
            } else if (this.quality == 0) {
                this.play("shrimp_normal");
            } else if (this.quality == -1) {
                this.play("shrimp_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_CHEESE){
            if (this.quality == 1) {
                this.play("cheese_good");
            } else if (this.quality == 0) {
                this.play("cheese_normal");
            } else if (this.quality == -1) {
                this.play("cheese_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_MILK){
            if (this.quality == 1) {
                this.play("milk_good");
            } else if (this.quality == 0) {
                this.play("milk_normal");
            } else if (this.quality == -1) {
                this.play("milk_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_EGGS){
            if (this.quality == 1) {
                this.play("eggs_good");
            } else if (this.quality == 0) {
                this.play("eggs_normal");
            } else if (this.quality == -1) {
                this.play("eggs_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_BUTTER){
            if (this.quality == 1) {
                this.play("butter_good");
            } else if (this.quality == 0) {
                this.play("butter_normal");
            } else if (this.quality == -1) {
                this.play("butter_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_YOGURT){
            if (this.quality == 1) {
                this.play("yogurt_good");
            } else if (this.quality == 0) {
                this.play("yogurt_normal");
            } else if (this.quality == -1) {
                this.play("yogurt_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_SOYSAUCE){
            if (this.quality == 1) {
                this.play("soysauce_good");
            } else if (this.quality == 0) {
                this.play("soysauce_normal");
            } else if (this.quality == -1) {
                this.play("soysauce_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_PARSLEY){
            if (this.quality == 1) {
                this.play("parsley_good");
            } else if (this.quality == 0) {
                this.play("parsley_normal");
            } else if (this.quality == -1) {
                this.play("parsley_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_GARLIC){
            if (this.quality == 1) {
                this.play("garlic_good");
            } else if (this.quality == 0) {
                this.play("garlic_normal");
            } else if (this.quality == -1) {
                this.play("garlic_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_SALT){
            if (this.quality == 1) {
                this.play("salt_good");
            } else if (this.quality == 0) {
                this.play("salt_normal");
            } else if (this.quality == -1) {
                this.play("salt_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }

        }else if(this.ID == ID_GROCERY_PEPPER){
            if (this.quality == 1) {
                this.play("pepper_good");
            } else if (this.quality == 0) {
                this.play("pepper_normal");
            } else if (this.quality == -1) {
                this.play("pepper_bad");
            } else {
                //remove this on final
                console.log("ERROR: unable to load anime");
            }
            
        }else{
            console.log("ERROR: unable to load ID");
        }
    }

    setPrice(){
        if (this.ID == ID_GROCERY_TOMATO) {
            this.price = 1;

        }else if(this.ID == ID_GROCERY_CARROT){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_ONION){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_CORN){
            this.price = 0.50;
        }else if(this.ID == ID_GROCERY_POTATO){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_SLUG){
            this.price = -2;
        }else if(this.ID == ID_GROCERY_CHICKEN){
            this.price = 3;
        }else if(this.ID == ID_GROCERY_STEAK){
            this.price = 7;
        }else if(this.ID == ID_GROCERY_FISH){
            this.price = 5;
        }else if(this.ID == ID_GROCERY_BEEF){
            this.price = 6;
        }else if(this.ID == ID_GROCERY_SHRIMP){
            this.price = 5;
        }else if(this.ID == ID_GROCERY_CHEESE){
            this.price = 4;
        }else if(this.ID == ID_GROCERY_MILK){
            this.price = 2;
        }else if(this.ID == ID_GROCERY_EGGS){
            this.price = 2;
        }else if(this.ID == ID_GROCERY_BUTTER){
            this.price = 2;
        }else if(this.ID == ID_GROCERY_YOGURT){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_PARSLEY){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_GARLIC){
            this.price = 1;
        }else if(this.ID == ID_GROCERY_SALT){
            this.price = 0.2;
        }else if(this.ID == ID_GROCERY_PEPPER){
            this.price = 0.2;
        }else if(this.ID == ID_GROCERY_SOYSAUCE){
            this.price = 1;
        }else{
            console.log("ERROR: unable to load ID");
        }
    }
}



