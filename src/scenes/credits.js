class credits extends Phaser.Scene {
    constructor() {
        super("credits");



    }

    create() {

        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------


        this.background_field5 = this.add.tileSprite(0, 0, 1280, 720, 'Credits').setOrigin(0, 0);




    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keyR) ){
            this.sound.play("sfx_button");
            this.scene.start("title_screen");
        }
    }
}