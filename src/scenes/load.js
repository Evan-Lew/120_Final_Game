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
        // rm  this.load.atlas("groceries_atlas", "test_groceries.png", "test_groceries.json");
        // rm  this.load.atlas("tomato_atlas", "tomato.png", "tomato.json");
        this.load.atlas("vegetables_atlas", "vegetables.png", "vegetables_map.json");



        // load cart
        this.load.image('cart', 'cart.png');

        // load title screen
        this.load.image('menu_background', 'menu_background.png');
    }

    create() {
        // start the game

        this.create_Animation_Vegetables();
        this.create_Animation_aisle2();
        this.create_Animation_aisle3();
        this.create_Animation_aisle4();
        //this.scene.start("title_screen");
        this.scene.start("stage_one_vegetables");

    }

    create_Animation_Vegetables() {
        //tomato
        this.anims.create({
            key: 'tomato_idle',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'tomato_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'tomato_normal',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'tomato_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'tomato_bad',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'tomato_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        //potato
        this.anims.create({
            key: 'potato_idle',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'potato_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'potato_normal',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'potato_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'potato_bad',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'potato_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        //carrot
        this.anims.create({
            key: 'carrot_idle',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'carrot_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'carrot_normal',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'carrot_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'carrot_bad',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'carrot_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        //onion
        this.anims.create({
            key: 'onion_idle',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'onion_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'onion_normal',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'onion_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'onion_bad',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'onion_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        //onion
        this.anims.create({
            key: 'corn_idle',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'corn_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'corn_normal',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'corn_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'corn_bad',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'corn_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });
    }

    //rename it and than change the call func in load.js create()
    create_Animation_aisle2() {

    }

    //rename it and than change the call func in load.js create()
    create_Animation_aisle3() {

    }

    //rename it and than change the call func in load.js create()
    create_Animation_aisle4() {

    }

}