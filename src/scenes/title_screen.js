class title_screen extends Phaser.Scene {
    constructor() {
        super("title_screen");
    }

    create() {
        // key input init
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // temp white background
        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);
        
        // background
        this.add.tileSprite(0, 0, 1280, 720, 'menu_background').setOrigin(0, 0);

        // intialize the cart
        this.cart = new menu_cart(this, 155, 575, 'cart').setOrigin(0, 0);

    }

    update() {
        // update cart
        this.cart.update();


        // enter key interaction
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            if (this.cart.locate == 1) {
                this.sound.play('sfx_door');
                this.scene.start("stage_one_vegetables");
            }
            else if (this.cart.locate == 2) {
                
            }
            else if (this.cart.locate == 3) {

            }
            else if (this.cart.locate == 4) {
                close();
            }
        }
    }
}
