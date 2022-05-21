class stage_one_meats extends Phaser.Scene {
    constructor() {
        super("stage_one_meats");


    }

    create() {


        // ------------------------------------------------------------------
        // local variable create
        this.scale = 0.4;   //tell me when u make some weird asset with DIFFERENT Scale 
        this.scale_basket = 0.8;
        this.inventory_scale = 0.2;
        this.inventory_spacing = 0;
        this.inventory_spacing_increment = 20;
        this.budgetCheck = 0;


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
        // Canvas setup 

        // canvas_play
        this.canvas_play = this.add.tileSprite(0, 0, 940, 720, 'meat_aisle').setOrigin(0, 0);

        // canvas_play basket
        this.basket_Init();
        // canvas_play belts
        this.belt_Init();
        // canvas_play tabs
        this.tab_AddTabs();
        this.tab_makeInteractive();

        // canvas_order
        this.order_Init();

        // Canvas setup  end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Inventory setup
        this.canvas_inventory = this.add.tileSprite(940, 480, 340, 240, 'inventory').setOrigin(0, 0);
        this.inventory_Display();
        // Inventory setup end
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        // timer setup
        this.Timer_Global();
        // timer setup end
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

        //console.log(timer);
        //console.log(timer_countDown);

        // console.log(game.input.mousePointer.x);
        // console.log(game.input.mousePointer.y);
        //use for testing

        /* this is the best code for performance check
        if(groceries.length != 0){
            console.log(groceries.length);
            console.log(inventory.length);
        }
        */


    }

    //"Global Timer"
    Timer_Global() {

        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "50px",
            color: "#000000",
        }

        //display timer init
        this.text_countDown = this.add.text(750, 70, timer_countDown, centerTextConfig);


        //increment timer
        this.timer_globalTimer = this.time.addEvent({
            delay: 1000,                                          //every second call loop below
            callback: () => {
                {
                    if (!gameOver) {
                        timer += 1000;                                  //increment timePassed
                    } else {
                        this.timer_globalTimer.remove(false);     //turn off clockEvent  WARNING: this line is extremely important, and will guarantee 
                        // causing logical bug if u remove it
                    }
                }
            },
            callbackScope: this,
            loop: true
        });//timePassed increment end

        //counter down timer -- 
        this.timer_globalTimer_countDown = this.time.addEvent({
            delay: 1000,                                          //every second call loop below
            callback: () => {
                {
                    if (!gameOver) {
                        timer_countDown--;                                  //decrement timePassed
                        this.text_countDown.destroy();
                        this.text_countDown = this.add.text(750, 70, timer_countDown, centerTextConfig);
                    } else {
                        this.timer_globalTimer_countDown.remove(false);     //turn off clockEvent  WARNING: this line is extremely important, and will guarantee 
                        // causing logical bug if u remove it
                    }
                }
            },
            callbackScope: this,
            loop: true
        });//timePassed increment end

        
    }


    //note: helper function shouldn't be called in create(), update(), it's for function only
    //HELPER function used in other groceries func, setting up: mouse, modify inventory, modify inventory spacing
    groceries_Helper_MouseInput(i) {
        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "32px",
            color: "#000000",
        }
        let highlightTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "32px",
            color: "#CA3433",
        }
 
        //mouse control
        groceries[i].on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                //case right click 
                groceries[i].flipGrocery();
            } else if (pointer.leftButtonDown()) {
                //case left click 
                //currently just set grocery to invisible
                //need to add /drag animation

                this.budgetCheck = budget - groceries[i].price;
                //valid only if u have enough money to purchase
                if(this.budgetCheck < 0){
                    //shake the screen
                    this.cameras.main.shake(200, 0.05);
                    //highlight the money
                    this.highlight = this.time.addEvent({
                        delay: 500,                                          //every second call loop below
                        callback: () => {
                            {
                                 this.text_budget.destroy();
                                 this.text_budget = this.add.text(1150, 400, budget, highlightTextConfig);                   
                            }
                        },
                        callbackScope: this,
                        repeat: 4
                    });
                    this.highlight = this.time.addEvent({
                        delay: 1000,                                          //every second call loop below
                        callback: () => {
                            {
                                 this.text_budget.destroy();
                                 this.text_budget = this.add.text(1150, 400, budget, centerTextConfig);                 
                            }
                        },
                        callbackScope: this,
                        repeat: 4
                    });
                    
                }else{
                //will add to inventory if u can purchase it
                //spacing for inventory
                  if (inventory_spacing_x < 250) {
                     inventory_spacing_x += INVENTORY_INCREMENT;
                  } else {
                        inventory_spacing_x = 0;
                        inventory_spacing_y += INVENTORY_INCREMENT;
                    }

                    groceries[i].leftClickFlag = true;
             }
            } else {
                //case other click (mouse mid key or side keys)
                console.log("ERROR: Undefined key");
            }
        }, this)


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
        temp = Phaser.Math.Between(1, 61);
        if(temp == 61){
            this.randomGrocery_ID = ID_GROCERY_SLUG;
            this.randomGrocery_frame = 'bananaslug_idle_01';
            this.randomGrocery_idle_bad = 'bananaslug_normal_02';
            this.randomGrocery_idle_normal = 'bananaslug_normal_02';
            this.randomGrocery_idle_good = 'bananaslug_normal_02';
            this.randomQuality = 0;
        }else if(temp >= 1 && temp < 21){
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_STEAK;
            this.randomGrocery_frame = 'steak_idle_01';
            this.randomGrocery_idle_bad = 'steak_bad_02';
            this.randomGrocery_idle_normal = 'steak_normal_02';
            this.randomGrocery_idle_good = 'steak_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }else if(temp >= 21 && temp < 41){
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_FISH;
            this.randomGrocery_frame = 'fish_idle_01';
            this.randomGrocery_idle_bad = 'fish_bad_02';
            this.randomGrocery_idle_normal = 'fish_normal_02';
            this.randomGrocery_idle_good = 'fish_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }else if(temp >= 41 && temp < 61){

            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_BEEF;
            this.randomGrocery_frame = 'beef_idle_01';
            this.randomGrocery_idle_bad = 'beef_bad_02';
            this.randomGrocery_idle_normal = 'beef_normal_02';
            this.randomGrocery_idle_good = 'beef_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }else{
            console.log("Error: undefined random number");
        }
    }

    //HELPER function determine which to generate
    groceries_Helper_MakeRandomGrocery_group2() {
        let temp = 0;
        temp = Phaser.Math.Between(1, 61);

        if(temp == 61){
            this.randomGrocery_ID = ID_GROCERY_SLUG;
            this.randomGrocery_frame = 'bananaslug_idle_01';
            this.randomGrocery_idle_bad = 'bananaslug_normal_02';
            this.randomGrocery_idle_normal = 'bananaslug_normal_02';
            this.randomGrocery_idle_good = 'bananaslug_normal_02';
            this.randomQuality = 0;
        }else if(temp >= 1 && temp < 35){
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_CHICKEN;
            this.randomGrocery_frame = 'chicken_idle_01';
            this.randomGrocery_idle_bad = 'chicken_bad_02';
            this.randomGrocery_idle_normal = 'chicken_normal_02';
            this.randomGrocery_idle_good = 'chicken_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }else if(temp >= 35 && temp < 61){
            //generate Grocery, the following data will be used in constructor
            this.randomGrocery_ID = ID_GROCERY_SHRIMP;
            this.randomGrocery_frame = 'shrimp_idle_01';
            this.randomGrocery_idle_bad = 'shrimp_bad_02';
            this.randomGrocery_idle_normal = 'shrimp_normal_02';
            this.randomGrocery_idle_good = 'shrimp_good_02';

            //generate quality
            this.groceries_Helper_MakeRandomQuality();
        }else{
            console.log("Error: undefined random number");
        }

    }

    //generate Groceries on the right with ID, which should be defined as global and unique in main.js
    groceries_Generate(group_num) {

        if (group_num == 1) {
            //group one is first belt, generate and put into temp var, then call constructor, then add mouse interact (0) because it's first one

            this.generate_timer1 = this.time.addEvent({
                delay: generation_frequency,
                callback: () => {
                    {
                        //same three step, generate, push, and add mouse effect (groceries.length - 1), the latest groceries been added
                        this.groceries_Helper_MakeRandomGrocery_group1();
                        if(this.randomGrocery_ID == ID_GROCERY_SLUG){
                            groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'slug_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        }else{
                            groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'meats_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        }//if end
                        this.groceries_Helper_MouseInput(groceries.length - 1);
                    }
                }, //call back end
                callbackScope: this,
                loop: true

            });//time event end
        } else {
            //group two is second belt, generate and put into temp var, then call constructor, then add mouse interact (0) because it's first one
            this.generate_timer2 = this.time.addEvent({
                delay: generation_frequency,
                callback: () => {
                    {
                        //same three step, generate, push, and add mouse effect (groceries.length - 1), the latest groceries been added
                        this.groceries_Helper_MakeRandomGrocery_group2();
                        if(this.randomGrocery_ID == ID_GROCERY_SLUG){
                            groceries.push(new Groceries(this, this.canvas_play.width + 250, -50 + 2 * this.canvas_play.height / 3, 'slug_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        }else{
                            groceries.push(new Groceries(this, this.canvas_play.width + 250, -50 + 2 * this.canvas_play.height / 3, 'meats_atlas', this.randomGrocery_frame, this.randomGrocery_idle_bad, this.randomGrocery_idle_normal, this.randomGrocery_idle_good, this.randomQuality, this.randomGrocery_ID).setOrigin(0.5, 0.5).setScale(this.scale).setInteractive());
                        }
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
                    this.order_Helper_budgetUpdate();
                    //push to inventory
                    inventory.push(new Inventory(this, 980 + inventory_spacing_x, 540 + inventory_spacing_y, groceries[i].key, groceries[i].idle, groceries[i].quality, groceries[i].ID).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
                    //inventory[inventory.length - 1].visible = true;
                    //reset and destroy the old sprite in grocery
                    groceries[i].movedToInventory = true;
                    groceries[i].leftClickFlag = false;
                    groceries[i].destroy();
                }
            }//for end
        }//if end

    }

    inventory_Display(){
        //display inventory stuffs if it's not empty
        if(inventory.length != 0){

            for(var i = 0; i < inventory.length; i++){
                //make if loop to check 
                
                this.add.sprite(inventory[i].x, inventory[i].y, inventory[i].key, inventory[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale);
                inventory[i].visible = true;
            }
        }
    }

    belt_Init() {
        this.belt_1 = this.add.sprite(50, 30 + 1 * this.canvas_play.height / 3, 'belt_atlas').setOrigin(0, 0);
        this.belt_1.play("belt_EASY");
        this.belt_2 = this.add.sprite(50, -20 + 2 * this.canvas_play.height / 3, 'belt_atlas').setOrigin(0, 0);
        this.belt_2.play("belt_EASY");
    }


    //function that control the speed of the belt and spawning
    phase_change() {
        //algo : two steps:  check if timer has passed the phase end point or not
        //                          if passed, init to previous phase and run the next with fixed delay
        if (timer >= TIME_PHASE_ONE && timer < TIME_PHASE_TWO) {
            //init to previous
            velocity = VELOCITY_EASY;
            //update generate_timer1 delay time to make them generate faster
            generation_frequency = GENERATION_FREQUENCY_P1;
            this.generate_timer1.delay = GENERATION_FREQUENCY_P1;
            this.generate_timer2.delay = GENERATION_FREQUENCY_P1;
            this.belt_1.play("belt_EASY");
            this.belt_2.play("belt_EASY");

            //enable the delay event
            this.beltSpeed_Normal = this.time.addEvent({
                delay: (TIME_PHASE_TWO - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_NORMAL;
                        generation_frequency = GENERATION_FREQUENCY_P2;
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
                delay: (TIME_PHASE_THREE - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_HARD;
                        generation_frequency = GENERATION_FREQUENCY_P3;
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
                delay: (TIME_PHASE_FOUR - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_EXPERT;
                        generation_frequency = GENERATION_FREQUENCY_P4;
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

            //game over
            this.beltSpeed_End = this.time.addEvent({
                delay: (TIME_PHASE_END - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        gameOver = true;
                    }
                },
                callbackScope: this,
                loop: false
            });//

        } else if (timer >= TIME_PHASE_TWO && timer < TIME_PHASE_THREE) {
            //init to previous
            velocity = VELOCITY_NORMAL;
            //update generate_timer1 delay time to make them generate faster
            generation_frequency = GENERATION_FREQUENCY_P2;
            this.generate_timer1.delay = GENERATION_FREQUENCY_P2;
            this.generate_timer2.delay = GENERATION_FREQUENCY_P2;
            this.belt_1.play("belt_NORMAL");
            this.belt_2.play("belt_NORMAL");

            //enable the delay event

            this.beltSpeed_Hard = this.time.addEvent({
                delay: (TIME_PHASE_THREE - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_HARD;
                        generation_frequency = GENERATION_FREQUENCY_P3;
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
                delay: (TIME_PHASE_FOUR - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_EXPERT;
                        generation_frequency = GENERATION_FREQUENCY_P4;
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

            //game over
            this.beltSpeed_End = this.time.addEvent({
                delay: (TIME_PHASE_END - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        gameOver = true;
                    }
                },
                callbackScope: this,
                loop: false
            });//


        } else if (timer >= TIME_PHASE_THREE && timer < TIME_PHASE_FOUR) {
            //init to previous
            velocity = VELOCITY_HARD;
            //update generate_timer1 delay time to make them generate faster
            generation_frequency = GENERATION_FREQUENCY_P3;
            this.generate_timer1.delay = GENERATION_FREQUENCY_P3;
            this.generate_timer2.delay = GENERATION_FREQUENCY_P3;
            this.belt_1.play("belt_HARD");
            this.belt_2.play("belt_HARD");

            //enable the delay event
            this.beltSpeed_Expert = this.time.addEvent({
                delay: (TIME_PHASE_FOUR - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        velocity = VELOCITY_EXPERT;
                        generation_frequency = GENERATION_FREQUENCY_P4;
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

            //game over
            this.beltSpeed_End = this.time.addEvent({
                delay: (TIME_PHASE_END - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        gameOver = true;
                    }
                },
                callbackScope: this,
                loop: false
            });//

        } else if (timer >= TIME_PHASE_FOUR && timer < TIME_PHASE_END) {
            //init to previous
            velocity = VELOCITY_EXPERT;
            //update generate_timer1 delay time to make them generate faster
            generation_frequency = GENERATION_FREQUENCY_P4;
            this.generate_timer1.delay = GENERATION_FREQUENCY_P4;
            this.generate_timer2.delay = GENERATION_FREQUENCY_P4;
            this.belt_1.play("belt_EXPERT");
            this.belt_2.play("belt_EXPERT");

            //game over
            this.beltSpeed_End = this.time.addEvent({
                delay: (TIME_PHASE_END - timer),                                               //every 3 seconds call loop below
                callback: () => {
                    {
                        gameOver = true;
                    }
                },
                callbackScope: this,
                loop: false
            });//

        } else {
            //in this case time has passed the end game time
            gameOver = true;
        }
    }



    //function that add threes tabs on the top and active the interaction with pointer
    tab_AddTabs() {
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

        this.tab_main_text = this.add.text(370, 42, "Meats", tab_main_TextConfig);

        this.tab_left = this.add.sprite(0, 0, 'Tab_left').setOrigin(0, 0);
        this.tab_left.setInteractive();
        this.tab_left.play("Tab_left_idle");
        this.tab_left_text = this.add.text(50, -3, "Vegetables", tab_TextConfig);

        this.tab_mid = this.add.sprite(274, 0, 'Tab_mid').setOrigin(0, 0);
        this.tab_mid.setInteractive();
        this.tab_mid.play("Tab_mid_idle");
        this.tab_mid_text = this.add.text(380, -3, "Seasoning", tab_TextConfig);

        this.tab_right = this.add.sprite(604, -1, 'Tab_right').setOrigin(0, 0);
        this.tab_right.setInteractive();
        this.tab_right.play("Tab_right_idle");
        this.tab_right_text = this.add.text(720, -3, "Dairy", tab_TextConfig);

    }


    //function that check the mouse position and interact with tab, change tab text color
    tab_makeInteractive() {
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
            this.tab_left_text = this.add.text(50, -3, "Vegetables", tab_colorChange_TextConfig);
        });
        this.tab_left.on("pointerout", () => {
            this.tab_left.play("Tab_left_idle");
            //destory the old text and add new color to it
            this.tab_left_text.destroy();
            this.tab_left_text = this.add.text(50, -3, "Vegetables", tab_TextConfig);
        });
        this.tab_left.on("pointerdown", () => {
            this.scene.start("stage_one_vegetables");
        });



        this.tab_mid.on("pointerover", () => {
            this.tab_mid.play("Tab_mid_onOver");
            this.tab_mid_text.destroy();
            this.tab_mid_text = this.add.text(380, -3, "Seasoning", tab_colorChange_TextConfig);
        });
        this.tab_mid.on("pointerout", () => {
            this.tab_mid.play("Tab_mid_idle");
            this.tab_mid_text.destroy();
            this.tab_mid_text = this.add.text(380, -3, "Seasoning", tab_TextConfig);
        });

        this.tab_mid.on("pointerdown", () => {
            console.log("I am going to the mid");
        });


        this.tab_right.on("pointerover", () => {
            this.tab_right.play("Tab_right_onOver");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(720, -3, "Dairy", tab_colorChange_TextConfig);
        });

        this.tab_right.on("pointerout", () => {
            this.tab_right.play("Tab_right_idle");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(720, -3, "Dairy", tab_TextConfig);
        });

        this.tab_right.on("pointerdown", () => {
            console.log("I am going to the right");
        });

    }



    //helper function used in grocery update to update the budget       
    order_Helper_budgetUpdate() {
        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "32px",
            color: "#000000",
        }
        this.text_budget.destroy();
        this.text_budget = this.add.text(1150, 400, budget, centerTextConfig);
    }



    //function that init the order area
    order_Init() {
        this.canvas_order = this.add.tileSprite(960, 10, 310, 450, 'order_background').setOrigin(0, 0);

        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "32px",
            color: "#000000",
        }

        this.text_budget = this.add.text(1150, 400, budget, centerTextConfig);
    }

    //function that make add basket
    basket_Init() {
        this.basket = this.add.sprite(620, 150, 'basket').setOrigin(0, 0).setScale(this.scale_basket);
        this.basket.play("basket_empty");
    }

    //function that update the basket sprite animation
    basket_Update() {
        if (inventory.length > 24) {
            gameOver = true;
        } else if (inventory.length >= BASKET_FULL) {
            this.basket.play("basket_full");
        } else if (inventory.length >= BASKET_HALF) {
            this.basket.play("basket_half");
        } else {
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
        //reinitialize timer
        timer = 0;
        timer_countDown = TIME_PHASE_END / 1000;
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

