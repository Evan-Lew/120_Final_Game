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
        this.load.atlas("vegetables_atlas", "vegetables.png", "vegetables_map.json");

        // load produce aisle
        this.load.image('produce_aisle', 'Produce Aisle.png');

        // load the tab above the shelf
        this.load.spritesheet('Tab_left', 'Tab_left.png', { frameWidth: 335 , frameHeight: 51 });
        this.load.spritesheet('Tab_mid', 'Tab_mid.png', { frameWidth: 394 , frameHeight: 51 });
        this.load.spritesheet('Tab_right', 'Tab_right.png', { frameWidth: 337, frameHeight: 51 });

        // load basket on left bottom
        this.load.spritesheet('basket', 'basket.png', { frameWidth: 940 , frameHeight: 720 });

        // load conveyor belt
        this.load.atlas("belt_atlas", "coveyor_belt.png", "conveyor_belt_map.json");

        // load inventory
        this.load.image('inventory', 'inventory.png');

        // load cart
        this.load.image('cart', 'cart.png');

        // load title screen
        this.load.image('menu_background', 'menu_background.png');


    }

    create() {
        // start the game
        this.create_Animation_Tabs();
        this.create_Animation_Basket();
        this.create_Animation_Vegetables();
        this.create_Animation_aisle2();
        this.create_Animation_aisle3();
        this.create_Animation_aisle4();
        this.create_Animation_Belt();
        //this.scene.start("title_screen");
        this.scene.start("stage_one_vegetables");

    }



    create_Animation_Tabs(){
        this.anims.create({
            key: "Tab_left_idle",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_left', { start: 0, end: 0 }),
            repeat: 1
        });

        this.anims.create({
            key: "Tab_left_onOver",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_left', { start: 1, end: 1 }),
            repeat: 1
        });


        this.anims.create({
            key: "Tab_mid_idle",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_mid', { start: 0, end: 0 }),
            repeat: 1
        });

        this.anims.create({
            key: "Tab_mid_onOver",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_mid', { start: 1, end: 1 }),
            repeat: 1
        });

        this.anims.create({
            key: "Tab_right_idle",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_right', { start: 0, end: 0 }),
            repeat: 1
        });

        this.anims.create({
            key: "Tab_right_onOver",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('Tab_right', { start: 1, end: 1 }),
            repeat: 1
        });

        
    }

    create_Animation_Basket(){

        this.anims.create({
            key: "basket_empty",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('basket', { start: 0, end: 0 }),
            repeat: 1
        });

        this.anims.create({
            key: "basket_half",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('basket', { start: 1, end: 1 }),
            repeat: 1
        });

        this.anims.create({
            key: "basket_full",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('basket', { start: 2, end: 2 }),
            repeat: 1
        });
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

        this.anims.create({
            key: 'tomato_good',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'tomato_good_',
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

        this.anims.create({
            key: 'potato_good',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'potato_good_',
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

        this.anims.create({
            key: 'carrot_good',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'carrot_good_',
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


        this.anims.create({
            key: 'onion_good',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'onion_good_',
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



        this.anims.create({
            key: 'corn_good',
            frames: this.anims.generateFrameNames('vegetables_atlas', {
                prefix: 'corn_good_',
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

    //create animation for the belt
    create_Animation_Belt(){
        this.anims.create({
            key: 'belt_EASY',
            frames: this.anims.generateFrameNames('belt_atlas', {
                prefix: 'belt_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: 'belt_NORMAL',
            frames: this.anims.generateFrameNames('belt_atlas', {
                prefix: 'belt_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'belt_HARD',
            frames: this.anims.generateFrameNames('belt_atlas', {
                prefix: 'belt_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 20,
            repeat: -1,
        });

        this.anims.create({
            key: 'belt_EXPERT',
            frames: this.anims.generateFrameNames('belt_atlas', {
                prefix: 'belt_',
                start: 1,
                end: 11,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
    }

}