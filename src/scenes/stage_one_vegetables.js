class stage_one_vegetables extends Phaser.Scene {
    constructor() {
        super("stage_one_vegetables");


  

    }

    create() {

        // ------------------------------------------------------------------
        // local variable create
        let SCALE = 0.4;
        let TOMATO_SCALE = SCALE;
        // local variable end
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        // animation create
        this.createAnimations();
        // animation end
        // ------------------------------------------------------------------
  



        // ------------------------------------------------------------------
        // Background Layer
        // play area
        this.canvas_play = this.add.rectangle(0, 0, 940, 720, 0xB1F2F2).setOrigin(0, 0);
        // order
        this.canvas_order = this.add.rectangle(940, 0, 340, 480, 0xE5AE89).setOrigin(0, 0);
        // extra
        this.canvas_extra = this.add.rectangle(940, 480, 340, 240, 0xFFFFFFF).setOrigin(0, 0);
        // background end
        // ------------------------------------------------------------------


        this.add.text(0, 0, "Here is the  play area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 70, "order area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 480, "extra area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });


        //test
        //this.test = this.add.sprite(this.canvas_play.width / 2, this.canvas_play.height / 2, 'tomato_atlas',  'tomato_idle_01').setOrigin(0.5, 0.5).setScale(TOMATO_SCALE).setInteractive();
        //this.test.play("tomato_normal");
        //this.test = new Groceries(this, this.canvas_play.width / 2, this.canvas_play.height / 2, 'tomato_atlas', 'tomato_idle_01', quality_normal).setOrigin(0.5, 0.5).setScale(TOMATO_SCALE).setInteractive();
        //this.test.flipNormalQuality(); 
        //
        groceries.push(new Groceries(this, this.canvas_play.width / 2, this.canvas_play.height / 2, 'tomato_atlas', 'tomato_idle_01', quality_normal).setOrigin(0.5, 0.5).setScale(TOMATO_SCALE).setInteractive());
        groceries[0].flipNormalQuality();
        //


        /*

        // ------------------------------------------------------------------
        // mouse setup
        this.input.mouse.disableContextMenu();
        this.test.on('pointerdown', function (pointer) {
             if(pointer.rightButtonDown()){
                 //case right click 
                console.log("right");
             }else if (pointer.leftButtonDown()){
                 //case left click 
                console.log("left");
             }else{
                 //case other click (mouse mid key or side keys)
                 console.log("bug");
             }
        })
        // mouse setup end
        // ------------------------------------------------------------------

        */

        
        // ------------------------------------------------------------------
        // test grocery flip
        /*
        this.tomato = new Groceries(this, game.config.width / 2, game.config.height / 2, "groceries_atlas", "tomato_0001", "tomato_0001", "tomato_flip_0001", "tomato_cut_0001").setOrigin(0.5).setScale(0.4).setInteractive();
        this.carrot = new Groceries(this, game.config.width / 2 - 100, game.config.height / 2, "groceries_atlas", "carrot_0001", "carrot_0001", "carrot_flip_0001", "carrot_cut_0001").setOrigin(0.5).setScale(0.4).setInteractive();

    
        this.input.mouse.disableContextMenu();
        this.tomato.on("pointerdown", function (pointer) {
            if (pointer.rightButtonDown()) {
                this.flipGoodQuality(); 
            }
        })
        this.carrot.on("pointerdown", function (pointer) {
            if (pointer.rightButtonDown()) {
                this.flipBadQuality();
            }
        })

    */
        // end test
        // ------------------------------------------------------------------

    }


    update() {}



    createAnimations(){

        this.anims.create({
            key: 'tomato_idle',
            frames: this.anims.generateFrameNames('tomato_atlas', {
                prefix: 'tomato_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 2,
            repeat: 0,
        });

        this.anims.create({
            key: 'tomato_normal',
            frames: this.anims.generateFrameNames('tomato_atlas', {
                prefix: 'tomato_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 2,
            repeat: 0,
        });

        this.anims.create({
            key: 'tomato_bad',
            frames: this.anims.generateFrameNames('tomato_atlas', {
                prefix: 'tomato_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 2,
            repeat: 0,
        });
        
    }


}