class stage_one_main extends Phaser.Scene {
    constructor() {
        super("stage_one_main");
  

    }

    create() {

        // ------------------------------------------------------------------
        // background
        // play area
        this.add.rectangle(0, 0, 940, 720, 0xB1F2F2).setOrigin(0, 0);
        // order
        this.add.rectangle(940, 0, 340, 480, 0xE5AE89).setOrigin(0, 0);
        // extra
        this.add.rectangle(940, 480, 340, 240, 0xFFFFFFF).setOrigin(0, 0);
        // background end
        // ------------------------------------------------------------------


        this.add.text(80, 70, "Here is the  play area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 70, "order area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 480, "extra area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });

        
        // ------------------------------------------------------------------
        // test grocery flip
        this.tomato = new Groceries(this, game.config.width / 2, game.config.height / 2, "groceries_atlas", "tomato_0001", "tomato_0001", "tomato_flip_0001", "tomato_cut_0001").setOrigin(0.5).setScale(0.4).setInteractive();
        this.carrot = new Groceries(this, game.config.width / 2 - 100, game.config.height / 2, "groceries_atlas", "carrot_0001", "carrot_0001", "carrot_flip_0001", "carrot_cut_0001").setOrigin(0.5).setScale(0.4).setInteractive();

        this.tomato.on("pointerdown", function (pointer) {
            this.flipGoodQuality();
        })
        this.carrot.on("pointerdown", function (pointer) {
            this.flipBadQuality();
        })

        // end test
        // ------------------------------------------------------------------

    }


    update() {}


}