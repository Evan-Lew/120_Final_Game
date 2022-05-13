class load extends Phaser.Scene {
    constructor() {
        super("loadscene");
    }

    preload() {
        // set load path
        this.load.path = "assets/";
        
        // load groceries atlas
        this.load.atlas("groceries_atlas", "test_groceries.png", "test_groceries.json");


    }

    create() {
        // start the game
        this.scene.start("stage_one_main");
    }
}