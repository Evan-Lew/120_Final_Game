class load extends Phaser.Scene {
    constructor() {
        super("loadscene");
    }

    preload() {
        // set load path
        this.load.path = "assets/";
        
        // load groceries atlas
        this.load.atlas("groceries_atlas", "test_groceries.png", "test_groceries.json");

        // load title screen
        this.load.image('menu_background', 'menu_background.png');
    }

    create() {
        // start the game
        this.scene.start("title_screen");
    }
}