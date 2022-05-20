class stage_one_vegetables extends Phaser.Scene {
    constructor() {
        super("stage_one_vegetables");




    }

    create() {

        // ------------------------------------------------------------------
        // local variable create
        this.scale = 0.4;   //tell me when u make some weird asset with DIFFERENT Scale 
        this.scale_basket = 0.8;
        this.inventory_scale = 0.2;
        this.inventory_spacing = 0;
        this.inventory_spacing_increment = 20;


        this.group1 = 1;
        this.group2 = 2;

        this.randomQuality = 0;
        this.randomGrocery_ID;
        this.randomGrocery_frame;
        this.randomGrocery_idle_bad;
        this.randomGrocery_idle_normal;
        this.randomGrocery_idle_good;


        // local variable end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Background Layer
        // play area
        //this.canvas_play = this.add.rectangle(0, 0, 940, 720, 0xB1F2F2).setOrigin(0, 0); // old/rm later
        this.canvas_play = this.add.tileSprite(0, 0, 940, 720, 'produce_aisle').setOrigin(0, 0);
        //this.canvas_play_basket = this.add.Sprite(0, 0, 940, 720, 'basket').setOrigin(0, 0);
        
        // basket
        this.basket_Init();

        //this.conveyor_play = this.add.tileSprite(55, 280, 835, 100, 'conveyor_belt').setOrigin(0, 0); // testing/rm later
        // order
        //this.canvas_order = this.add.rectangle(940, 0, 340, 480, 0xE5AE89).setOrigin(0, 0);

        // belts
        this.belt_Init();
        // tabs
        this.tab_AddTabs();
        this.tab_makeInteractive();
        // extra
        //this.canvas_inventory = this.add.rectangle(940, 480, 340, 240, 0xFFFFFFF).setOrigin(0, 0); // old/rm later
        this.canvas_inventory = this.add.tileSprite(940, 480, 340, 240, 'inventory').setOrigin(0, 0);
        
        // display their text
           this.text_display();
        // background end
        // ------------------------------------------------------------------




        // ------------------------------------------------------------------
        // mouse setup
        this.input.mouse.disableContextMenu();
        // mouse setup end
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        // Aisle setup
        this.groceries_Generate(this.group1);
        this.groceries_Generate(this.group2);
        // Aisle setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Phase setup
        this.phase_change();
        // Phase setup end
        // ------------------------------------------------------------------

    }


    update() {

 
        this.groceries_Update();
        this.basket_Update();
        this.endGame_Update();


       // console.log(game.input.mousePointer.x);
       // console.log(game.input.mousePointer.y);
        //use for testing
        
        /*
        if(groceries.length != 0){
            console.log(groceries.length);
            console.log(inventory.length);
        }
        */


    }

    //note: helper function shouldn't be called in create(), update(), it's for function only
    //HELPER function used in other groceries func, setting up: mouse, modify inventory, modify inventory spacing
    groceries_Helper_MouseInput(i) {


        //mouse control
        groceries[i].on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                //case right click 
                groceries[i].flipGrocery();
            } else if (pointer.leftButtonDown()) {
                //case left click 
                //currently just set grocery to invisible
                //need to add /drag animation

                //spacing for inventory
                if (inventory_spacing_x < 250) {
                    inventory_spacing_x += INVENTORY_INCREMENT;
                } else {
                    inventory_spacing_x = 0;
                    inventory_spacing_y += INVENTORY_INCREMENT;
                }

                groceries[i].leftClickFlag = true;
            } else {
                //case other click (mouse mid key or side keys)
                console.log("ERROR: Undefined key");
            }
        })


    }

    //HELPER function used in generating the random
    groceries_Helper_MakeRandomQuality() {
        let temp = 0;
        temp = Phaser.Math.Between(1, 3);
        if (temp == 1) {
            //return bad quality
            this.randomQuality = -1;
        } else if (temp == 2) {
            //return normal quality    with bigger change than bad/good
            this.randomQuality = 0;
        } else {
            //return good quality
            this.randomQuality = 1;
        }
    }

    //HELPER function determine which to generate
    groceries_Helper_MakeRandomGrocery_group1() {
        let temp = 0;
        temp = Phaser.Math.Between(ID_GROCERY_TOMATO, ID_GROCERY_ONION);

        if (temp == ID_GROCERY_TOMATO) {
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_TOMATO;
            this.randomGrocery_frame = 'tomato_idle_01';
            this.randomGrocery_idle_bad = 'tomato_bad_02';
            this.randomGrocery_idle_normal = 'tomato_normal_02';
            this.randomGrocery_idle_good = 'tomato_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        } else if (temp == ID_GROCERY_CARROT) {
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_CARROT;
            this.randomGrocery_frame = 'carrot_idle_01';
            this.randomGrocery_idle_bad = 'carrot_bad_02';
            this.randomGrocery_idle_normal = 'carrot_normal_02';
            this.randomGrocery_idle_good = 'carrot_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        } else {
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_ONION;
            this.randomGrocery_frame = 'onion_idle_01';
            this.randomGrocery_idle_bad = 'onion_bad_02';
            this.randomGrocery_idle_normal = 'onion_normal_02';
            this.randomGrocery_idle_good = 'onion_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
            
        }
    }

    //HELPER function determine which to generate
    groceries_Helper_MakeRandomGrocery_group2() {
        let temp = 0;
        temp = Phaser.Math.Between(ID_GROCERY_CORN, ID_GROCERY_POTATO);

        if (temp == ID_GROCERY_CORN) {
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_CORN;
            this.randomGrocery_frame = 'corn_idle_01';
            this.randomGrocery_idle_bad = 'corn_bad_02';
            this.randomGrocery_idle_normal = 'corn_normal_02';
            this.randomGrocery_idle_good = 'corn_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        } else {
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_POTATO;
            this.randomGrocery_frame = 'potato_idle_01';
            this.randomGrocery_idle_bad = 'potato_bad_02';
            this.randomGrocery_idle_normal = 'potato_normal_02';
            this.randomGrocery_idle_good = 'potato_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }
    }

    //generate Groceries on the right with ID, which should be defined as global and unique in main.js
    groceries_Generate(group_num) {

        if (group_num == 1) {
            //first grocery will be init before delay time event
            //group one is first belt, generate and put into temp var, then call constructor, then add mouse interact (0) because it's first one
            this.groceries_Helper_MakeRandomGrocery_group1();
            groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'vegetables_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
            this.groceries_Helper_MouseInput(0);

            this.generate_timer1 = this.time.addEvent({
                delay: generation_frequency,
                callback: () => {
                    {
                        //same three step, generate, push, and add mouse effect (groceries.length - 1), the latest groceries been added
                        this.groceries_Helper_MakeRandomGrocery_group1();
                        groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'vegetables_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        this.groceries_Helper_MouseInput(groceries.length - 1);
                    }
                }, //call back end
                callbackScope: this,
                loop: true

            });//time event end
        } else {
            //first grocery will be init before delay time event
            //group two is second belt, generate and put into temp var, then call constructor, then add mouse interact (0) because it's first one
            this.groceries_Helper_MakeRandomGrocery_group2();

            groceries.push(new Groceries(this, this.canvas_play.width + 250, -50 + 2 * this.canvas_play.height / 3, 'vegetables_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
            this.groceries_Helper_MouseInput(1);
            this.generate_timer2 = this.time.addEvent({
                delay: generation_frequency,
                callback: () => {
                    {
                        //same three step, generate, push, and add mouse effect (groceries.length - 1), the latest groceries been added
                        this.groceries_Helper_MakeRandomGrocery_group2();
                        groceries.push(new Groceries(this, this.canvas_play.width + 250, -50 + 2 * this.canvas_play.height / 3, 'vegetables_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        this.groceries_Helper_MouseInput(groceries.length - 1);
                    }
                }, //call back end
                callbackScope: this,
                loop: true

            });//time event end

        }
    }


    //function called in update to control grocery status: visibility, moving speed control
    groceries_Update() {
        //visibility update  
        if (groceries.length != 0) {
            //for loop to check ALL groceries
            for (var i = 0; i < groceries.length; i++) {
                //keep them moving
                groceries[i].x -= velocity;

                //it won't be visiable until it shows up in canvas
                if (groceries[i].x > this.canvas_play.width - 50) {
                    groceries[i].visible = false;
                //destroy them when they hit the edge (clean memory for optimiaztion)
                } else if (groceries[i].x < 100) {
                    groceries[i].visible = false;
                    groceries[i].destroy();
                } else {
                    //if it's been choosen (right click set visiblity to false)
                    //  leftClickFlag when be on once it interacted with groceries in mouse input function
                    //  clean memory after that
                    if (groceries[i].leftClickFlag) {
                        //will be destroy when it's moving to inventory (couple lines of code below)
                        groceries[i].visible = false;
                    // keep it moving if not click on it
                    } else {
                        groceries[i].visible = true;
                    }
                }

                //move target into inventory and display it, reduce the budget
                //groceries[i].moveToInventory will be true if this step has done
                if (groceries[i].leftClickFlag && !groceries[i].moveToInventory) {
                    //update budget
                    budget -= groceries[i].price;
                    this.text_display_Helper_budgetUpdate();
                    //push to inventory
                    inventory.push(new Inventory(this, 980 + inventory_spacing_x, 540 + inventory_spacing_y, 'vegetables_atlas', groceries[i].idle, groceries[i].quality, groceries[i].ID).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
                    inventory[inventory.length - 1].visible = true;
                    //reset and destroy the old sprite in grocery
                    groceries[i].movedToInventory = true;
                    groceries[i].leftClickFlag = false;
                    groceries[i].destroy();
                }
            }//for end
        }//if end

    }

    belt_Init(){
        this.belt_1 = this.add.sprite(50, 30 + 1 * this.canvas_play.height / 3, 'belt_atlas').setOrigin(0, 0);
        this.belt_1.play("belt_EASY");
        this.belt_2 = this.add.sprite(50,  -20 + 2 * this.canvas_play.height / 3, 'belt_atlas').setOrigin(0, 0);
        this.belt_2.play("belt_EASY");
    }


    //function that control the speed of the belt and spawning
    phase_change() {

        //delay event used to call velocity change
        this.beltSpeed_Easy = this.time.addEvent({
            delay: TIME_PHASE_ONE,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    velocity = VELOCITY_EASY;

                }
            },
            callbackScope: this,
            loop: false
        });//
        this.beltSpeed_Normal = this.time.addEvent({
            delay: TIME_PHASE_TWO,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    velocity = VELOCITY_NORMAL;
                    generation_frequency = generation_frequency / 2;
                    //update generate_timer1 delay time to make them generate faster
                    this.generate_timer1.delay = generation_frequency;
                    this.generate_timer2.delay = generation_frequency;
                    this.belt_1.play("belt_NORMAL");
                    this.belt_2.play("belt_NORMAL");
                }
            },
            callbackScope: this,
            loop: false
        });//
        this.beltSpeed_Hard = this.time.addEvent({
            delay: TIME_PHASE_THREE,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    velocity = VELOCITY_HARD;
                    generation_frequency = generation_frequency / 2;
                    //update generate_timer1 delay time to make them generate faster
                    this.generate_timer1.delay = generation_frequency;
                    this.generate_timer2.delay = generation_frequency;
                    this.belt_1.play("belt_HARD");
                    this.belt_2.play("belt_HARD");


                }
            },
            callbackScope: this,
            loop: false
        });//
        this.beltSpeed_Expert = this.time.addEvent({
            delay: TIME_PHASE_FOUR,                                               //every 3 seconds call loop below
            callback: () => {
                {
                    velocity = VELOCITY_EXPERT;
                    generation_frequency = generation_frequency / 2;
                    //update generate_timer1 delay time to make them generate faster
                    this.generate_timer1.delay = generation_frequency;
                    this.generate_timer2.delay = generation_frequency;
                    this.belt_1.play("belt_EXPERT");
                    this.belt_2.play("belt_EXPERT");

                }
            },
            callbackScope: this,
            loop: false
        });//
    }


    //function used to display text and budget
    text_display() {

        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Georgia',
            fontSize: "32px",
            color: "#000000",
        }


        //this.add.text(0, 0, "Here is the  play area", centerTextConfig);
        this.add.text(940, 70, "order area", centerTextConfig);
        //this.add.text(940, 480, "Inventory", centerTextConfig);
        this.add.text(940, 430, "Budget:", centerTextConfig);

        this.text_budget = this.add.text(1100, 430, budget, centerTextConfig);
    }

    //helper function used in grocery update to update the budget
    text_display_Helper_budgetUpdate() {
        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Georgia',
            fontSize: "32px",
            color: "#000000",
        }
        this.text_budget.destroy();
        this.text_budget = this.add.text(1100, 430, budget, centerTextConfig);
    }


    //function that add threes tabs on the top and active the interaction with pointer
    tab_AddTabs(){
        let tab_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

        let tab_main_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "80px",
            color: "#000814",
        }

        this.tab_main_text = this.add.text(310, 42, "Vegetables", tab_main_TextConfig);

        this.tab_left = this.add.sprite(0, 0, 'Tab_left').setOrigin(0, 0);
        this.tab_left.setInteractive();
        this.tab_left.play("Tab_left_idle");
        this.tab_left_text = this.add.text(90, -3, "Dairy", tab_TextConfig);

        this.tab_mid = this.add.sprite(274, 0, 'Tab_mid').setOrigin(0, 0);
        this.tab_mid.setInteractive();
        this.tab_mid.play("Tab_mid_idle");
        this.tab_mid_text = this.add.text(420, -3, "Meat", tab_TextConfig);

        this.tab_right = this.add.sprite(604, -1, 'Tab_right').setOrigin(0, 0);
        this.tab_right.setInteractive();
        this.tab_right.play("Tab_right_idle");
        this.tab_right_text = this.add.text(690, -3, "Seasoning ", tab_TextConfig);
        
    }


    //function that check the mouse position and interact with tab, change tab text color
    tab_makeInteractive(){
        let tab_colorChange_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#B4F8C8",
        }

        let tab_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

       
        this.tab_left.on("pointerover", () => {
            this.tab_left.play("Tab_left_onOver");
            //destory the old text and add new color to it
            this.tab_left_text.destroy();
            this.tab_left_text = this.add.text(90, -3, "Dairy", tab_colorChange_TextConfig);
        });  
        this.tab_left.on("pointerout", () => {
            this.tab_left.play("Tab_left_idle");
            //destory the old text and add new color to it
            this.tab_left_text.destroy();
            this.tab_left_text = this.add.text(90, -3, "Dairy", tab_TextConfig);
        });        
        this.tab_left.on("pointerdown", () => {
            console.log("I am going to the left");
  
        });   


        
        this.tab_mid.on("pointerover", () => {
            this.tab_mid.play("Tab_mid_onOver");
            this.tab_mid_text.destroy();
            this.tab_mid_text = this.add.text(420, -3, "Meat", tab_colorChange_TextConfig);
        });        
        this.tab_mid.on("pointerout", () => {
            this.tab_mid.play("Tab_mid_idle");
            this.tab_mid_text.destroy();
            this.tab_mid_text = this.add.text(420, -3, "Meat", tab_TextConfig);
        });        
        
        this.tab_mid.on("pointerdown", () => {
            console.log("I am going to the mid");
        });   


        this.tab_right.on("pointerover", () => {
            this.tab_right.play("Tab_right_onOver");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(690, -3, "Seasoning ", tab_colorChange_TextConfig);
        });        
        
        this.tab_right.on("pointerout", () => {
            this.tab_right.play("Tab_right_idle");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(690, -3, "Seasoning ", tab_TextConfig);
        });        
        
        this.tab_right.on("pointerdown", () => {
            console.log("I am going to the right");
        });   

    }

    //function that make add basket
    basket_Init(){
        this.basket = this.add.sprite(620, 150, 'basket').setOrigin(0, 0).setScale(this.scale_basket);
        this.basket.play("basket_empty");
    }

    //function that update the basket sprite animation
    basket_Update(){
        if(inventory.length > 24){
            gameOver = true;
        }else if(inventory.length >= BASKET_FULL){
            this.basket.play("basket_full");
        }else if(inventory.length >= BASKET_HALF){
            this.basket.play("basket_half");
        }else{
            this.basket.play("basket_empty");
        }
    }

    //helper function used to reset globle variable
    endGame_Update_Helper_reset() {
        //free memory
        groceries = null;
        inventory = null;
        //reinitialize it
        groceries = [];
        inventory = [];
        //reinitialize inventory
        inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;
        inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;
        //reinitialize budget
        budget = BUDGET;
        //reinitialize flag
        gameOver = false;
    }

    //function update the endgame parameter and variable
    endGame_Update() {
        if (budget <= 0) {
            gameOver = true;
        } 

        // inventory.length() > 24, this will cause         gameOver = true;
        // check detail in basket_Update

        if (gameOver) {
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        } else {

        }//if end

    }

}

