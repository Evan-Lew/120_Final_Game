class load extends Phaser.Scene {
    constructor() {
        super("load");
    }

    preload() {
        // set load path
        this.load.path = "./assets/";

        // -----loading audio-----
        // sounds effects
        this.load.audio('sfx_door', 'door_open.wav');
        this.load.audio('sfx_cart', 'rolling_cart.mp3');
        this.load.audio('sfx_dialog', 'space.wav');
        this.load.audio('sfx_button', 'clickSound.wav');
        this.load.audio('sfx_iventory_add_fail', 'failed_toAdd.wav');
        this.load.audio('sfx_iventory_add', 'addToInventory.wav');
        this.load.audio('sfx_check_quality', 'checkQuality.wav');
        this.load.audio('sfx_check_out', 'checkout.wav');
        this.load.audio('sfx_cook', 'cook_sound.mp3');
        this.load.audio('sfx_pot_add', 'addToPot.wav');
        this.load.audio('sfx_pot_add_fail', 'failed_toAdd.wav');



        // background music
        this.load.audio('store_bgm', 'store_music.mp3');
        this.load.audio('title_bgm', 'jazz_music.mp3');
        this.load.audio('cook_bgm', 'stage_2BGM.mp3');

        // -----loading assets-----
        // load vegetables/dairy/meats atlas
        this.load.atlas("vegetables_atlas", "vegetables.png", "vegetables_map.json");
        this.load.atlas("dairy_atlas", "dairy.png", "dairy_map.json");
        this.load.atlas("meats_atlas", "meats.png", "meats_map.json");
        this.load.atlas("seasoning_atlas", "seasoning.png", "seasoning_map.json");
        this.load.atlas("slug_atlas", "Banana_Slug.png", "banana_slug_map.json");


        // load produce/dairy/meat/seasoning aisles
        this.load.image('produce_aisle', 'Produce_Aisle.png');
        this.load.image('dairy_aisle', 'Dairy_Aisle.png');
        this.load.image('meat_aisle', 'Meat_Aisle.png');
        this.load.image('seasoning_aisle', 'Seasoning_Aisle.png');
        this.load.image('stage2_bg', 'Stage_Two.png');
        this.load.image('cook1', 'cook1.png');
        this.load.image('cook2', 'cook2.png');

        // load the tab above the shelf
        this.load.spritesheet('Tab_left', 'Tab_left.png', { frameWidth: 335, frameHeight: 51 });
        this.load.spritesheet('Tab_mid', 'Tab_mid.png', { frameWidth: 394, frameHeight: 51 });
        this.load.spritesheet('Tab_right', 'Tab_right.png', { frameWidth: 337, frameHeight: 51 });
        this.load.spritesheet('steam', 'steam.png', { frameWidth: 497, frameHeight: 269 });

        // load basket on left bottom
        this.load.spritesheet('basket', 'basket.png', { frameWidth: 940, frameHeight: 720 });

        // load conveyor belt
        this.load.atlas("belt_atlas", "coveyor_belt.png", "conveyor_belt_map.json");

        // load dish atlats
        this.load.atlas("dish_atlas", "Dishes.png", "dish_map.json");

        // load inventory
        this.load.image('inventory', 'inventory.png');

        // load cart
        this.load.image('cart', 'cart.png');

        // load ordering canvas
        this.load.image('order_background', 'order_background.png');

        // load title screen
        this.load.image('menu_background', 'menu_background.png');

        // load img for score board
        this.load.image('score_background1', 'score_background.png');
        this.load.image('score_background2', 'score_background2.png');
        this.load.image('score_background3', 'score_background3.png');
        this.load.image('score_background4', 'score_background4.png');
        this.load.image('score_background5', 'score_background5.png');


        // load everything needed for tutorial
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml');
        this.load.image('score_background1', 'score_background.png');
        this.load.image('dialogbox', 'dialogbox.png');

        this.load.image('Slug', 'Slug.png');
        this.load.image('Rick', 'Rick.png');

        this.load.json('tutorial_0', 'json/tutorial_0.json');
        this.load.json('tutorial_1', 'json/tutorial_1.json');
        this.load.json('tutorial_2', 'json/tutorial_2.json');
        this.load.json('tutorial_4_1', 'json/tutorial_4_1.json');
        this.load.json('tutorial_4_2', 'json/tutorial_4_2.json');


        this.load.image('Tutorial_menu', 'Tutorial_menu.png');
        
        this.load.image('price_list1', 'price_list1.png');
        
        this.load.image('price_list2', 'price_list2.png');
        this.load.image('Tutorial_1', 'Tutorial_1.png');

        // load credit
        this.load.image('Credits', 'Credits.png');


    }



    create() {
        // start the game
        this.create_recipes();
        this.recipe_randomizer();
        this.create_dialog();
        this.create_Animation_Tabs();
        this.create_Animation_Basket();
        this.create_Animation_Slug();
        this.create_Animation_Vegetables();
        this.create_Animation_Meat();
        this.create_Animation_dairy();
        this.create_Animation_seasoning();
        this.create_Animation_Belt();
        this.create_Animation_steam();
        this.create_Animation_dish();
        this.makeTutor();


        //this.scene.start("stage_two_cooking");
        this.scene.start("title_screen");
        //this.scene.start("stage_one_vegetables");
        //this.scene.start("scoreboard");


    }
    //function used to make and add recipe
    create_recipes(){
        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Steamed Potato", ID_DISH_STEAM_POTATO, 3, true, ID_GROCERY_POTATO, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Tasty Steamed Potato", ID_DISH_STEAM_POTATO_TASTY, 8, false, ID_GROCERY_POTATO, ID_GROCERY_SALT, ID_GROCERY_PEPPER, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Epic Steamed Potato", ID_DISH_STEAM_POTATO_EPIC, 13, false,  ID_GROCERY_POTATO, ID_GROCERY_SALT, ID_GROCERY_PEPPER, ID_GROCERY_PARSLEY).setOrigin(0.5, 0.5).setVisible(false));
       
        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Tomato Salad", ID_DISH_TOMATO_SALAD, 5.6, true,  ID_GROCERY_TOMATO, ID_GROCERY_SALT, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Tasty Tomato Salad", ID_DISH_TOMATO_SALAD_TASTY, 8, false, ID_GROCERY_TOMATO, ID_GROCERY_SALT, ID_GROCERY_PEPPER, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Roasted Corn", ID_DISH_ROASTED_CORN, 1.5, true, ID_GROCERY_CORN, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Tasty Roasted Corn", ID_DISH_ROASTED_CORN_TASTY, 6, false, ID_GROCERY_CORN, ID_GROCERY_SALT, ID_GROCERY_PEPPER, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Cheese Roasted Corn", ID_DISH_ROASTED_CORN_CHEESEY, 20, false, ID_GROCERY_CORN, ID_GROCERY_CHEESE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Fried Egg", ID_DISH_FRY_EGG, 11, true, ID_GROCERY_EGGS, ID_GROCERY_SOYSAUCE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this,  0, 0, "slug_atlas", 'bananaslug_idle_01', "Chinese Breakfast", ID_DISH_CHINESE_BREAKFAST, 17, true, ID_GROCERY_EGGS, ID_GROCERY_SOYSAUCE, ID_GROCERY_MILK, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Beef Stew", ID_DISH_BEEF_STEW, 26, true, ID_GROCERY_BEEF, ID_GROCERY_ONION, ID_GROCERY_CARROT, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
        
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Scrambled Eggs", ID_DISH_SCRAMBLED_EGGS, 12, true, ID_GROCERY_EGGS, ID_GROCERY_MILK, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // One item recipes that are not shown
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Warm Milk", ID_DISH_WARM_MILK, 8, false, ID_GROCERY_MILK, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Cooked Chicken", ID_DISH_COOKED_CHICKEN, 13, false, ID_GROCERY_CHICKEN, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Cooked Beef", ID_DISH_COOKED_BEEF, 23, false, ID_GROCERY_BEEF, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Cooked Fish", ID_DISH_COOKED_FISH, 18, false, ID_GROCERY_FISH, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Cooked Shrimp", ID_DISH_COOKED_SHRIMP, 21, false, ID_GROCERY_SHRIMP, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Cooked Steak", ID_DISH_COOKED_STEAK, 24, false, ID_GROCERY_STEAK, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Fried Egg", ID_DISH_FRIED_EGG, 8, false, ID_GROCERY_EGGS, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Steamed Carrots", ID_DISH_STEAMED_CARROTS, 4, false, ID_GROCERY_CARROT, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Steak Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Steak and Veggies", ID_DISH_STEAK_AND_VEGGIES, 29, true, ID_GROCERY_STEAK, ID_GROCERY_ONION, ID_GROCERY_CARROT, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Garlic Steak", ID_DISH_GARLIC_STEAK, 33, true, ID_GROCERY_STEAK, ID_GROCERY_GARLIC, ID_GROCERY_BUTTER, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Steak & Potatos", ID_DISH_STEAK_AND_POTATOS, 26, true, ID_GROCERY_STEAK, ID_GROCERY_POTATO, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Fish/Shrimp Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Steamed Fish", ID_DISH_STEAMED_FISH, 20, true, ID_GROCERY_FISH, ID_GROCERY_PARSLEY, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Seafood Dish", ID_DISH_SEAFOOD_DISH, 33, true, ID_GROCERY_FISH, ID_GROCERY_SHRIMP, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Shrimp Gumbo", ID_DISH_SHRIMP_GUMBO, 45, true, ID_GROCERY_SHRIMP, ID_GROCERY_BEEF, ID_GROCERY_PARSLEY, ID_GROCERY_POTATO).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Shrimp & Eggs", ID_DISH_SHRIMP_AND_EGGS, 26, true, ID_GROCERY_SHRIMP, ID_GROCERY_EGGS, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
    
        // Chicken Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Quesadilla", ID_DISH_QUESADILLA, 23, true, ID_GROCERY_CHICKEN, ID_GROCERY_CHEESE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Veggie Quesadilla", ID_DISH_VEGGIE_QUESADILLA, 30, true, ID_GROCERY_CHICKEN, ID_GROCERY_CHEESE, ID_GROCERY_ONION, ID_GROCERY_TOMATO).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Garlic Soy Chicken", ID_DISH_GARLIC_SOY_CHICKEN, 17, true, ID_GROCERY_CHICKEN, ID_GROCERY_SOYSAUCE, ID_GROCERY_GARLIC, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Buttered Chicken", ID_DISH_BUTTERED_CHICKEN, 27, true, ID_GROCERY_CHICKEN, ID_GROCERY_BUTTER, ID_GROCERY_GARLIC, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", "bananaslug_idle_01", "Chicken & Veggies", ID_DISH_CHICKEN_AND_VEGGIES, 23, true, ID_GROCERY_CHICKEN, ID_GROCERY_CARROT, ID_GROCERY_ONION, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Beef Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Chili", ID_DISH_CHILI, 26, true, ID_GROCERY_BEEF, ID_GROCERY_TOMATO, ID_GROCERY_ONION, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Meatloaf", ID_DISH_MEATLOAF, 22, true, ID_GROCERY_BEEF, ID_GROCERY_TOMATO, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Beef burger", ID_DISH_BEEF_BURGER, 22, true, ID_GROCERY_BEEF, ID_GROCERY_ONION, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Beef casserole", ID_DISH_BEEF_CASSEROLE, 40.5, true, ID_GROCERY_BEEF, ID_GROCERY_CORN, ID_GROCERY_CHEESE, ID_GROCERY_MILK).setOrigin(0.5, 0.5).setVisible(false));

        // Egg Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Omelete", ID_DISH_OMELETE, 17, true, ID_GROCERY_EGGS, ID_GROCERY_BUTTER, ID_GROCERY_TOMATO, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Yogurt eggs", ID_DISH_YOGURT_EGGS, 11, false, ID_GROCERY_YOGURT, ID_GROCERY_EGGS, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
        
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Soy sauce eggs", ID_DISH_SOY_SAUCE_EGGS, 11, true, ID_GROCERY_SOYSAUCE, ID_GROCERY_EGGS, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Potato Dishes
        // There's no "garlic powder" in groceries.
        // menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Garlic fries", ID_DISH_GARLIC_FRIES, 8, true, ID_GROCERY_POTATO, ID_GROCERY_GARLIC_POWDER, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Mashes potatos", ID_DISH_MASHES_POTATOS, 17, true, ID_GROCERY_POTATO, ID_GROCERY_MILK, ID_GROCERY_BUTTER, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Baked potato", ID_DISH_YOGURT_EGGS, 17, true, ID_GROCERY_POTATO, ID_GROCERY_CHEESE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Yogurt Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Yogurt coleslaw", ID_DISH_YOGURT_COLESLAW, 9.5, true, ID_GROCERY_YOGURT, ID_GROCERY_CARROT, ID_GROCERY_CORN, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Yogurt salad", ID_DISH_YOGURT_SALAD, 11, true, ID_GROCERY_YOGURT, ID_GROCERY_TOMATO, ID_GROCERY_CARROT, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Corn Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Corn salsa", ID_DISH_CORN_SALSA, 9.5, true, ID_GROCERY_CORN, ID_GROCERY_TOMATO, ID_GROCERY_ONION, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Popcorn", ID_DISH_YOGURT_COLESLAW, 9.5, true, ID_GROCERY_CORN, ID_GROCERY_BUTTER, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        // Misc Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Mac & Cheese", ID_DISH_MAX_AND_CHEESE, 18, true, ID_GROCERY_MILK, ID_GROCERY_CHEESE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Veggie salad", ID_DISH_VEGGIE_SALAD, 10.5, true, ID_GROCERY_CARROT, ID_GROCERY_TOMATO, ID_GROCERY_CORN, ID_GROCERY_ONION).setOrigin(0.5, 0.5).setVisible(false));

        // Slug Dishes
        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Dead slug", ID_DISH_DEAD_SLUG, -100, false, ID_GROCERY_SLUG,ID_GROCERY_SALT, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Two slugs", ID_DISH_TWO_SLUGS, 200, false, ID_GROCERY_SLUG, ID_GROCERY_SLUG, ID_GROCERY_SALT, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));

        menu.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "Three slugs", ID_DISH_THREE_SLUGS, 500, false, ID_GROCERY_SLUG, ID_GROCERY_SLUG, ID_GROCERY_SLUG, ID_GROCERY_SALT).setOrigin(0.5, 0.5).setVisible(false));
   
   
    }

    create_dialog() {
        // add title text
        this.add.bitmapText(centerX, centerY - 32, 'gem_font', 'THE ODYSSEY', 32).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY, 'gem_font', 'Press SPACE to start', 16).setOrigin(0.5);
        // create input
        cursors = this.input.keyboard.createCursorKeys();
    }


    recipe_randomizer() {
        randomMenu = null;
        randomMenu = [];

        var tempMenu = [];
        var tempNum1;
        var tempNum2;
        var tempNum3;
        //find all randomable meanu and push them into tempMenu
        for (var i = 0; i < menu.length; i++) {
            if (menu[i].randomable) {
                tempMenu.push(new recipes(this, 0, 0, menu[i].key, menu[i].idle, menu[i].Name, menu[i].ID, menu[i].points, true, menu[i].ingredient1, menu[i].ingredient2, menu[i].ingredient3, menu[i].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
            }
        }

        //then the tempMenu will have all randomable recipe, do random function
        tempNum1 = Phaser.Math.Between(0, tempMenu.length - 1);
        do {
            tempNum2 = Phaser.Math.Between(0, tempMenu.length - 1);
        } while (tempNum2 == tempNum1);
        do {
            tempNum3 = Phaser.Math.Between(0, tempMenu.length - 1);
        } while (tempNum3 == tempNum1 || tempNum3 == tempNum2);

        randomMenu.push(new recipes(this, 0, 0, tempMenu[tempNum1].key, tempMenu[tempNum1].idle, tempMenu[tempNum1].Name, tempMenu[tempNum1].ID, tempMenu[tempNum1].points, true, tempMenu[tempNum1].ingredient1, tempMenu[tempNum1].ingredient2, tempMenu[tempNum1].ingredient3, tempMenu[tempNum1].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
        randomMenu.push(new recipes(this, 0, 0, tempMenu[tempNum2].key, tempMenu[tempNum2].idle, tempMenu[tempNum2].Name, tempMenu[tempNum2].ID, tempMenu[tempNum2].points, true, tempMenu[tempNum2].ingredient1, tempMenu[tempNum2].ingredient2, tempMenu[tempNum2].ingredient3, tempMenu[tempNum2].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
        randomMenu.push(new recipes(this, 0, 0, tempMenu[tempNum3].key, tempMenu[tempNum3].idle, tempMenu[tempNum3].Name, tempMenu[tempNum3].ID, tempMenu[tempNum3].points, true, tempMenu[tempNum3].ingredient1, tempMenu[tempNum3].ingredient2, tempMenu[tempNum3].ingredient3, tempMenu[tempNum3].ingredient4).setOrigin(0.5, 0.5).setVisible(false));

        tempMenu.destroy;
        tempMenu = null;
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
                start: 11,
                end: 1,
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
                start: 11,
                end: 1,
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
                start: 11,
                end: 1,
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
                start: 11,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
    }


    create_Animation_steam() {
        this.anims.create({
            key: "steam_idle",
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('steam', { start: 12, end: 12 }),
            repeat: 0
        });

        this.anims.create({
            key: "steam_anim",
            frameRate: 13,
            frames: this.anims.generateFrameNumbers('steam', { start: 0, end: 12 }),
            repeat: 0
        });

    }

    create_Animation_dish() {

        this.anims.create({
            key: 'dish_normal',
            frames: this.anims.generateFrameNames('dish_atlas', {
                prefix: 'dish_normal_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,
        });


        this.anims.create({
            key: 'dish_horrible',
            frames: this.anims.generateFrameNames('dish_atlas', {
                prefix: 'dish_horrible_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,
        });


        this.anims.create({
            key: 'dish_bad',
            frames: this.anims.generateFrameNames('dish_atlas', {
                prefix: 'dish_bad_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,
        });


        this.anims.create({
            key: 'dish_good',
            frames: this.anims.generateFrameNames('dish_atlas', {
                prefix: 'dish_good_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 2
            }),
            frameRate: 5,
            repeat: -1,
        });

    }


    makeTutor(){
        
        randomMenu_tutor.push(new recipes(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', "steam potato", ID_DISH_STEAM_POTATO, 10, true, ID_GROCERY_POTATO, ID_NONE, ID_NONE, ID_NONE).setOrigin(0.5, 0.5).setVisible(false));
        inventory_tutor.push(new Inventory(this, 0, 0, 'vegetables_atlas', 'potato_normal_02', 0, ID_GROCERY_POTATO, 1).setOrigin(0.5, 0.5).setScale(this.inventory_scale).setVisible(false));
        inventory_tutor.push(new Inventory(this, 0, 0, 'vegetables_atlas', 'potato_good_02', 1, ID_GROCERY_POTATO, 1).setOrigin(0.5, 0.5).setScale(this.inventory_scale).setVisible(false));
        inventory_tutor.push(new Inventory(this, 0, 0, 'vegetables_atlas', 'potato_bad_02', -1, ID_GROCERY_POTATO, 1).setOrigin(0.5, 0.5).setScale(this.inventory_scale).setVisible(false));

    }

}