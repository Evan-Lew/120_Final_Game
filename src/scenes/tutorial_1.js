class tutorial_1 extends Phaser.Scene {
    constructor() {
        super("tutorial_1");

        this.canvas_x = 940;
        this.canvas_y = 720;


        // dialog constants
        this.DBOX_X = 0;			                            // dialog box x-position
        this.DBOX_Y = this.canvas_y - 200;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	                        // dialog box font key

        this.TEXT_X = 50;			                            // text w/in dialog box x-position
        this.TEXT_Y = this.canvas_y - 155;			    // text w/in dialog box y-position
        this.TEXT_SIZE = 30;		                            // text font size (in pixels)
        this.TEXT_MAX_WIDTH = this.canvas_x - 85;	        // max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 900;			// next text prompt x-position
        this.NEXT_Y = 684;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.Slug = null;
        this.Rick = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;

    }

    create() {

        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------


        this.background_field5 = this.add.tileSprite(0, 0, 940, 720, 'Tutorial_1').setOrigin(0, 0);


        // canvas_play tabs
        this.tab_AddTabs();

        // canvas_order
        this.order_Init();


        // ------------------------------------------------------------------
        // Inventory setup
        this.canvas_inventory = this.add.tileSprite(1110, 600, 340, 240, 'inventory').setOrigin(0.5, 0.5).setInteractive();
        this.inventory_Display();
        this.inventory_Interaction();
        // Inventory setup end
        // ------------------------------------------------------------------


        groceries_tutor.push(new Groceries(this, 200, 250, 'vegetables_atlas', 'potato_idle_01', 'potato_bad_02', 'potato_normal_02', 'potato_good_02', -1, ID_GROCERY_POTATO).setOrigin(0.5, 0.5).setScale(0.7).setInteractive());
        groceries_tutor.push(new Groceries(this, 450, 250, 'vegetables_atlas', 'potato_idle_01', 'potato_bad_02', 'potato_normal_02', 'potato_good_02', 0, ID_GROCERY_POTATO).setOrigin(0.5, 0.5).setScale(0.7).setInteractive());
        groceries_tutor.push(new Groceries(this, 700, 250, 'vegetables_atlas', 'potato_idle_01', 'potato_bad_02', 'potato_normal_02', 'potato_good_02', 1, ID_GROCERY_POTATO).setOrigin(0.5, 0.5).setScale(0.7).setInteractive());

        this.groceries_Helper_MouseInput(0);
        this.groceries_Helper_MouseInput(1);
        this.groceries_Helper_MouseInput(2);



        this.makeDialog();

    }

    update() {

        this.groceries_Update();
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            // trigger dialog
            this.typeText();
        }

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.dialog_reset();
            this.reset();
            this.scene.start("tutorial_0");
        }
    }



    reset(){
        groceries_tutor = null;
        groceries_tutor = [];
        inventory = null;
        inventory = [];

        inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;
        inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;

        //reinitialize budget
        budget_tutor = BUDGET_TUTOR;
    }

    makeDialog() {
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('tutorial_1');
        //console.log(this.dialog);

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen
        this.Slug = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y + 8, 'Slug').setOrigin(0, 1);
        this.Rick = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y + 8, 'Rick').setOrigin(0, 1);

        // input
        cursors = this.input.keyboard.createCursorKeys();

        // start dialog
        this.typeText();
        this.dialogText.setTint(0xffffff);
        this.nextText.setTint(0xffffff);
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

        /* Note: In my conversation data structure: 
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties: 
                    1. a speaker (required)
                    2. the dialog text (required)
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if (this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }

        // make sure we haven't run out of conversations...
        if (this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            // tween out prior speaker's image
            if (this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }
            // make text box invisible
            this.dialogbox.visible = false;
            //this.scene.start("Machbeth");

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if (this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if (this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + 50,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0;
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => {
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if (this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });

            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    dialog_reset() {
        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing
        this.dialog = this.cache.json.get('tutorial_0');
    }


    inventory_Display() {
        //display inventory stuffs if it's not empty
        if (inventory.length != 0) {

            for (var i = 0; i < inventory.length; i++) {
                //make if loop to check 

                this.add.sprite(inventory[i].x, inventory[i].y, inventory[i].key, inventory[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale);
                inventory[i].visible = true;
            }
        }
    }

    inventory_Interaction() {
        let TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "60px",
            color: "#B22222",
        }
        //mouse control
        //show check out text
        this.canvas_inventory.on('pointerover', function (pointer) {
            this.checkout_text = this.add.text(990, 600, "Check Out", TextConfig);
        }, this)
        this.canvas_inventory.on("pointerout", () => {
            this.checkout_text.destroy();
        }, this);
        this.canvas_inventory.on("pointerdown", () => {
            this.scene.start("tutorial_2");
            this.dialog_reset();
            this.reset();
            // add something here
        }, this);
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

        this.tab_main_text = this.add.text(310, 42, "Vegetables", tab_main_TextConfig);

        this.tab_left = this.add.sprite(0, 0, 'Tab_left').setOrigin(0, 0);
        this.tab_left.setInteractive();
        this.tab_left.play("Tab_left_idle");
        this.tab_left_text = this.add.text(90, -3, "Dairy", tab_TextConfig);

        this.tab_mid = this.add.sprite(274, 0, 'Tab_mid').setOrigin(0, 0);
        this.tab_mid.setInteractive();
        this.tab_mid.play("Tab_mid_idle");
        this.tab_mid_text = this.add.text(380, -3, "Seasoning", tab_TextConfig);

        this.tab_right = this.add.sprite(604, -1, 'Tab_right').setOrigin(0, 0);
        this.tab_right.setInteractive();
        this.tab_right.play("Tab_right_idle");
        this.tab_right_text = this.add.text(730, -3, "Meats", tab_TextConfig);

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
            this.tab_left_text = this.add.text(90, -3, "Dairy", tab_colorChange_TextConfig);
        });
        this.tab_left.on("pointerout", () => {
            this.tab_left.play("Tab_left_idle");
            //destory the old text and add new color to it
            this.tab_left_text.destroy();
            this.tab_left_text = this.add.text(90, -3, "Dairy", tab_TextConfig);
        });
        this.tab_left.on("pointerdown", () => {
            //this.scene.start("stage_one_dairy");
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
            //this.scene.start("stage_one_seasoning");
        });


        this.tab_right.on("pointerover", () => {
            this.tab_right.play("Tab_right_onOver");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(730, -3, "Meats", tab_colorChange_TextConfig);
        });

        this.tab_right.on("pointerout", () => {
            this.tab_right.play("Tab_right_idle");
            this.tab_right_text.destroy();
            this.tab_right_text = this.add.text(730, -3, "Meats", tab_TextConfig);
        });

        this.tab_right.on("pointerdown", () => {
            //this.scene.start("stage_one_meats");

        });

    }





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
        groceries_tutor[i].on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                //case right click 
                groceries_tutor[i].flipGrocery();
            } else if (pointer.leftButtonDown()) {
                //case left click 
                //currently just set grocery to invisible
                //need to add /drag animation

                this.budgetCheck = budget_tutor - groceries_tutor[i].price;
                //valid only if u have enough money to purchase
                if (this.budgetCheck < 0) {
                    //shake the screen
                    this.cameras.main.shake(200, 0.05);
                    //highlight the money
                    this.highlight = this.time.addEvent({
                        delay: 500,                                          //every second call loop below
                        callback: () => {
                            {
                                this.text_budget.destroy();
                                this.text_budget = this.add.text(1150, 400, budget_tutor.toFixed(1), highlightTextConfig);
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
                                this.text_budget = this.add.text(1150, 400, budget_tutor.toFixed(1), centerTextConfig);
                            }
                        },
                        callbackScope: this,
                        repeat: 4
                    });

                } else {
                    //will add to inventory if u can purchase it
                    //spacing for inventory
                    if (inventory_spacing_x < 250) {
                        inventory_spacing_x += INVENTORY_INCREMENT;
                    } else {
                        inventory_spacing_x = 0;
                        inventory_spacing_y += INVENTORY_INCREMENT;
                    }

                    groceries_tutor[i].leftClickFlag = true;
                }
            } else {
                //case other click (mouse mid key or side keys)
                console.log("ERROR: Undefined key");
            }
        }, this)


    }


    groceries_Update() {
        //visibility update  
        if (groceries_tutor.length != 0) {
            //for loop to check ALL groceries
            for (var i = 0; i < groceries_tutor.length; i++) {
             
                    //if it's been choosen (right click set visiblity to false)
                    //  leftClickFlag when be on once it interacted with groceries in mouse input function
                    //  clean memory after that
                    if (groceries_tutor[i].leftClickFlag) {
                        //will be destroy when it's moving to inventory (couple lines of code below)
                        groceries_tutor[i].visible = false;
                        // keep it moving if not click on it
                    } else {
                        groceries_tutor[i].visible = true;
                    }
                

                //move target into inventory and display it, reduce the budget
                //groceries[i].moveToInventory will be true if this step has done
                if (groceries_tutor[i].leftClickFlag && !groceries_tutor[i].moveToInventory) {
                    //update budget
                    budget_tutor -= groceries_tutor[i].price;
                    this.order_Helper_budgetUpdate();
                    //push to inventory
                    inventory.push(new Inventory(this, 980 + inventory_spacing_x, 540 + inventory_spacing_y, groceries_tutor[i].key, groceries_tutor[i].idle, groceries_tutor[i].quality, groceries_tutor[i].ID, groceries_tutor[i].price).setOrigin(0.5, 0.5).setScale(0.2));
                    //inventory[inventory.length - 1].visible = true;
                    //reset and destroy the old sprite in grocery
                    groceries_tutor[i].movedToInventory = true;
                    groceries_tutor[i].leftClickFlag = false;
                    groceries_tutor[i].destroy();
                }
            }//for end
        }//if end
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
        this.text_budget = this.add.text(1150, 400, budget_tutor.toFixed(1), centerTextConfig);
    }



    //function that init the order area
    order_Init() {
        this.canvas_order = this.add.tileSprite(960, 10, 310, 450, 'order_background').setOrigin(0, 0);

        let size_recipeIngre = 0.2;
        let recipe_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "30px",
            color: "#383737",
        }

        this.recipe1_text = this.add.text(1010, 90, randomMenu_tutor[0].Name, recipe_TextConfig);
        if (randomMenu_tutor[0].ingredient1 != 0) {
            this.recipe1_ingredient1 = this.add.sprite(1020, 130, randomMenu_tutor[0].ingredient1_texture, randomMenu_tutor[0].ingredient1_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu_tutor[0].ingredient2 != 0) {
            this.recipe1_ingredient2 = this.add.sprite(1070, 130, randomMenu_tutor[0].ingredient2_texture, randomMenu_tutor[0].ingredient2_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu_tutor[0].ingredient3 != 0) {
            this.recipe1_ingredient3 = this.add.sprite(1120, 130, randomMenu_tutor[0].ingredient3_texture, randomMenu_tutor[0].ingredient3_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu_tutor[0].ingredient3 != 0) {
            this.recipe1_ingredient3 = this.add.sprite(1170, 130, randomMenu_tutor[0].ingredient4_texture, randomMenu_tutor[0].ingredient4_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }

        let centerTextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "32px",
            color: "#000000",
        }

        this.text_budget = this.add.text(1150, 400, budget_tutor.toFixed(1), centerTextConfig);
    }

}