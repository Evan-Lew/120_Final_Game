class menu_cart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object object to existing scene
        scene.add.existing(this);

        // var declare
        this.locate = 2;
        this.moveSpeed_12 = 315;
        this.moveSpeed_23 = 265;
        this.moveSpeed_34 = 275;

        this.scene = scene;

        // add sound effect
        this.sfx_cart = scene.sound.add("sfx_cart");
    }

    update() {
        // move right                               
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            if (this.locate == 1) {
                this.x += this.moveSpeed_12;
                this.sfx_cart.play();
                this.locate++;
            }
            else if (this.locate == 2) {
                this.x += this.moveSpeed_23;
                this.sfx_cart.play();
                this.locate++;
            }
            else if (this.locate == 3) {
                this.x += this.moveSpeed_34;
                this.sfx_cart.play();
                this.locate++;
            }
        }

        // move left
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            if (this.locate == 2) {
                this.x -= this.moveSpeed_12;
                this.sfx_cart.play();
                this.locate--;
                
            }
            else if (this.locate == 3) {
                this.x -= this.moveSpeed_23;
                this.sfx_cart.play();
                this.locate--;
            }
            else if (this.locate == 4) {
                this.x -= this.moveSpeed_34;
                this.sfx_cart.play();
                this.locate--;
            }
        }
    }
}