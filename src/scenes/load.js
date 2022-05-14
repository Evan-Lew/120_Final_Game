class load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        // set load path
        this.load.path = "./assets/";
        
        // -----loading audio-----
        this.load.audio('sfx_door', 'door_open.wav');
        this.load.audio('sfx_cart', 'rolling_cart.mp3');


        // -----loading assets-----
        // load groceries atlas
        this.load.atlas("groceries_atlas", "test_groceries.png", "test_groceries.json");
        this.load.atlas("tomato_atlas", "tomato.png", "tomato.json");

        // load cart
        this.load.image('cart', 'cart.png');

        // load title screen
        this.load.image('menu_background', 'menu_background.png');
    }

    create() {
        // start the game
        this.scene.start("title_screen");
    }
}