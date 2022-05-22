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
        // load vegetables/dairy/meats atlas
        this.load.atlas("vegetables_atlas", "vegetables.png", "vegetables_map.json");
        this.load.atlas("dairy_atlas", "dairy.png", "dairy_map.json");
        this.load.atlas("meats_atlas", "meats.png", "meats_map.json");
        this.load.atlas("seasoning_atlas", "seasoning.png", "seasoning_map.json");
        this.load.atlas("slug_atlas", "Banana_Slug.png", "banana_slug_map.json");


        // load produce/dairy/meat aisle/seasoning
        this.load.image('produce_aisle', 'Produce_Aisle.png');
        this.load.image('dairy_aisle', 'Dairy_Aisle.png');
        this.load.image('meat_aisle', 'Meat_Aisle.png');
        this.load.image('seasoning_aisle', 'Seasoning_Aisle.png');

        // load the tab above the shelf
        this.load.spritesheet('Tab_left', 'Tab_left.png', { frameWidth: 335, frameHeight: 51 });
        this.load.spritesheet('Tab_mid', 'Tab_mid.png', { frameWidth: 394, frameHeight: 51 });
        this.load.spritesheet('Tab_right', 'Tab_right.png', { frameWidth: 337, frameHeight: 51 });

        // load basket on left bottom
        this.load.spritesheet('basket', 'basket.png', { frameWidth: 940, frameHeight: 720 });

        // load conveyor belt
        this.load.atlas("belt_atlas", "coveyor_belt.png", "conveyor_belt_map.json");

        // load inventory
        this.load.image('inventory', 'inventory.png');

        // load cart
        this.load.image('cart', 'cart.png');

        // load ordering canvas
        this.load.image('order_background', 'order_background.png');

        // load title screen
        this.load.image('menu_background', 'menu_background.png');


    }

    create() {
        // start the game
        this.create_Animation_Tabs();
        this.create_Animation_Basket();
        this.create_Animation_Slug();
        this.create_Animation_Vegetables();
        this.create_Animation_Meat();
        this.create_Animation_dairy();
        this.create_Animation_seasoning();
        this.create_Animation_Belt();
        //this.scene.start("title_screen");
        this.scene.start("title_screen");

    }



    create_Animation_Tabs() {
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

    create_Animation_Basket() {

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

    create_Animation_Slug() {
        //banana slug
        this.anims.create({
            key: 'bananaslug_idle',
            frames: this.anims.generateFrameNames('slug_atlas', {
                prefix: 'bananaslug_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'bananaslug_normal',
            frames: this.anims.generateFrameNames('slug_atlas', {
                prefix: 'bananaslug_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
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


    create_Animation_Meat() {
        //chicken
        this.anims.create({
            key: 'chicken_idle',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'chicken_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'chicken_normal',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'chicken_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'chicken_bad',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'chicken_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'chicken_good',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'chicken_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        //steak
        this.anims.create({
            key: 'steak_idle',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'steak_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'steak_normal',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'steak_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'steak_bad',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'steak_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'steak_good',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'steak_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //fish
        this.anims.create({
            key: 'fish_idle',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'fish_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'fish_normal',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'fish_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'fish_bad',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'fish_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'fish_good',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'fish_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        //beef
        this.anims.create({
            key: 'beef_idle',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'beef_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'beef_normal',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'beef_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'beef_bad',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'beef_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'beef_good',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'beef_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //shrimp
        this.anims.create({
            key: 'shrimp_idle',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'shrimp_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'shrimp_normal',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'shrimp_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'shrimp_bad',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'shrimp_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'shrimp_good',
            frames: this.anims.generateFrameNames('meats_atlas', {
                prefix: 'shrimp_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



    }

    create_Animation_dairy() {
        //cheese
        this.anims.create({
            key: 'cheese_idle',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'cheese_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'cheese_normal',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'cheese_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'cheese_bad',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'cheese_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'cheese_good',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'cheese_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //milk
        this.anims.create({
            key: 'milk_idle',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'milk_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'milk_normal',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'milk_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'milk_bad',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'milk_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'milk_good',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'milk_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //eggs
        this.anims.create({
            key: 'eggs_idle',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'eggs_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'eggs_normal',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'eggs_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'eggs_bad',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'eggs_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'eggs_good',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'eggs_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //butter
        this.anims.create({
            key: 'butter_idle',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'butter_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'butter_normal',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'butter_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'butter_bad',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'butter_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'butter_good',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'butter_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        //yogurt
        this.anims.create({
            key: 'yogurt_idle',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'yogurt_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'yogurt_normal',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'yogurt_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'yogurt_bad',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'yogurt_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'yogurt_good',
            frames: this.anims.generateFrameNames('dairy_atlas', {
                prefix: 'yogurt_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });
    }


    create_Animation_seasoning() {

        //parsley
        this.anims.create({
            key: 'parsley_idle',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'parsley_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'parsley_normal',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'parsley_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'parsley_bad',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'parsley_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'parsley_good',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'parsley_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //garlic
        this.anims.create({
            key: 'garlic_idle',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'garlic_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'garlic_normal',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'garlic_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'garlic_bad',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'garlic_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'garlic_good',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'garlic_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        //salt
        this.anims.create({
            key: 'salt_idle',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'salt_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'salt_normal',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'salt_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'salt_bad',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'salt_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'salt_good',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'salt_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        //pepper
        this.anims.create({
            key: 'pepper_idle',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'pepper_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'pepper_normal',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'pepper_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'pepper_bad',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'pepper_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'pepper_good',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'pepper_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        //soysauce
        this.anims.create({
            key: 'soysauce',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'soysauce_idle_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

        this.anims.create({
            key: 'soysauce_normal',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'soysauce_normal_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });


        this.anims.create({
            key: 'soysauce_bad',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'soysauce_bad_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });



        this.anims.create({
            key: 'soysauce_good',
            frames: this.anims.generateFrameNames('seasoning_atlas', {
                prefix: 'soysauce_good_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: 0,
        });

    }

    //create animation for the belt
    create_Animation_Belt() {
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