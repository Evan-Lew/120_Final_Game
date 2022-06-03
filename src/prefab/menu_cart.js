class menu_cart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object object to existing scene
        scene.add.existing(this);
        this.scene = scene;
        // var declare
        this.locate = 2;

        this.locate_1_x = 145;
        this.locate_2_x = 460;
        this.locate_3_x = 725;
        this.locate_4_x = 1000;

        // add sound effect
        this.sfx_cart = scene.sound.add("sfx_cart");
    }


    setToLocate_1(){
        this.x =  this.locate_1_x;
        this.sfx_cart.play();
    }

    setToLocate_2(){
        this.x =  this.locate_2_x;
        this.sfx_cart.play();
    }

    setToLocate_3(){
        this.x =  this.locate_3_x;
        this.sfx_cart.play();
    }

    setToLocate_4(){
        this.x =  this.locate_4_x;
        this.sfx_cart.play();
    }

}