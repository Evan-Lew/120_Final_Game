class tutorial_2 extends Phaser.Scene {
    constructor() {
        super("tutorial_2");

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

                //local variable
                this.inventory_scale = 0.3;
                this.pot_scale = 0.4;
                this.score = 0
                this.total_quality = 1;
                this.qualityWeight = 0.4;
                this.slugCount = 0;
                this.potIsWorking = false;
        
        
                this.inventory_sprite = [];
                this.inPot = [];
                this.dishTable = [];
                this.foundRecipe = false;

        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Pot setup
        this.stage2_bg = this.add.tileSprite(0, 0, 1280, 720, 'stage2_bg').setOrigin(0, 0);
        this.order_Init();
        //this.potButton();
        // Pot setup end
        // ------------------------------------------------------------------

        // ------------------------------------------------------------------
        // Inventory setup
        this.inventory_Display();
        // Inventory setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // pot setup
        this.potCook();
        // pot setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // UI setup 
        this.UI();
        // UI setup end
        // ------------------------------------------------------------------

        this.finish_button();

        this.makeDialog();

    }

    update() {

        this.UI_Update();
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            // trigger dialog
            this.sound.play("sfx_dialog");    
            this.typeText();
        }

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play("sfx_button");
            this.dialog_reset();
            this.endGame_Update_Helper_reset()
            this.scene.start("tutorial_0");
        }
    }



    

    makeDialog() {
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('tutorial_2');
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



        //function that setup UI: score
        UI() {
            let TextScore = {
                align: 'center',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#e6f9ff",
            }
    
            this.text_score = this.add.text(10, 0, "Total Score: " + this.score.toFixed(0), TextScore).setOrigin(0, 0);
        }
    
        //someUI need update
        UI_Update() {
            let TextScore = {
                align: 'center',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#e6f9ff",
            }
            //destroy the old one and update
            this.text_score.destroy();
            this.text_score = this.add.text(10, 0, "Total Score: " + this.score.toFixed(0), TextScore).setOrigin(0, 0);
        }
    
        //helper function used in display to do the interaction
        inventory_Helper_onClick(i) {
            this.inventory_sprite[i].on('pointerdown', function (pointer) {
                if (pointer.leftButtonDown()) {
                    if (this.inPot.length < 4) {
                        this.sound.play("sfx_pot_add");
                        this.inventory_sprite[i].visible = false;
                        this.inPot.push(new Inventory(this, pot_spacing_x, pot_spacing_y, inventory_tutor[i].key, inventory_tutor[i].idle, inventory_tutor[i].quality, inventory_tutor[i].ID, inventory_tutor[i].price).setOrigin(0.5, 0.5).setScale(this.pot_scale));
                        pot_spacing_x += POT_INCREMENT_X;
                        //go next line
                        if ((pot_spacing_x - POT_SPACING_ORIGINAL_X) >= 2 * POT_INCREMENT_X) {
                            pot_spacing_x = POT_SPACING_ORIGINAL_X;
                            pot_spacing_y += POT_INCREMENT_Y;
                        }
                    } else {
                        //too many ingredients warning
                        this.sound.play("sfx_pot_add_fail");
                        this.cameras.main.shake(200, 0.05);
    
                        let Text_ingreWarn = {
                            align: 'left',
                            fontFamily: 'Lobster',
                            fontSize: "35px",
                            color: "#800000",
                        }
                        this.Text_ingreW = this.add.text(POT_SPACING_ORIGINAL_X - 100, POT_SPACING_ORIGINAL_Y - 240, "Too Many Ingredients", Text_ingreWarn);
    
                        this.delay_ingreW = this.time.addEvent({
                            delay: 2000,
                            callback: () => {
                                {
                                    this.Text_ingreW.destroy();
                                }
                            },
                            callbackScope: this,
                            loop: false
                        });//
    
                    }
                }
            }, this)
        }// for end
    
    
    
        inventory_Display() {
            //display inventory stuffs if it's not empty and make them interactive
            if (inventory_tutor.length != 0) {
    
                for (var i = 0; i < inventory_tutor.length; i++) {
                    //make if loop to check 
                    this.inventory_sprite[i] = this.add.sprite(inventory_stage2_spacing_x, inventory_stage2_spacing_y, inventory_tutor[i].key, inventory_tutor[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale).setInteractive();
                    inventory_stage2_spacing_x += INVENTORY_STAGE2_INCREMENT;
                    if (inventory_stage2_spacing_x > INVENTORY_STAGE2_INCREMENT * 5) {
                        inventory_stage2_spacing_y += INVENTORY_STAGE2_INCREMENT;
                        inventory_stage2_spacing_x -= INVENTORY_STAGE2_INCREMENT * 4;
                    }
                    this.inventory_Helper_onClick(i);
                }//for end
            }//if end
        }
    
    
        //helper function reset the pot array
        potCook_Helper_reset() {
            for (var index = 0; index < this.inPot.length; index++) {
                this.inPot[index].setVisible(false);
                this.inPot[index].destroy;
            }
            pot_spacing_x = POT_SPACING_ORIGINAL_X;
            pot_spacing_y = POT_SPACING_ORIGINAL_Y;
            this.foundRecipe = false;
            this.inPot = null;
            this.inPot = [];
            this.total_quality = 1;
            this.slugCount = 0;
        }
    
        //helper function that reset the variable change in specific recipe
        potCook_Helper_resetRecipe(i) {
            menu[i].flag_ingredient1 = false;
            menu[i].flag_ingredient2 = false;
            menu[i].flag_ingredient3 = false;
            menu[i].flag_ingredient4 = false;
            menu[i].flag_matched = 0;
        }
    
        potCook() {
            this.pt = 0;
            this.dashCalculator = 0;
            //tempName to hold the name
            this.tempName = null;
            let cookconfig = {
                align: 'left',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#000000",
            }
    
            let cookconfig2 = {
                align: 'center',
                fontFamily: 'Lobster',
                fontSize: "55px",
                color: "#000000",
            }
    
    
            let cookconfig3 = {
                align: 'left',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#b30000",
            }
    
            let cookconfig4 = {
                align: 'left',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#ff8585",
            }
    
            this.button_cook = this.add.sprite(680, 450, 'cook1').setInteractive();
    
            this.button_cook.on("pointerover", () => {
                this.button_cook = this.add.sprite(680, 450, 'cook2');
            });
            this.button_cook.on("pointerout", () => {
                this.button_cook = this.add.sprite(680, 450, 'cook1');
            });
    
            this.button_cook.on('pointerdown', function (pointer) {
    
                if (this.inPot.length == 0 || this.potIsWorking) {
                } else {
    
                    if (pointer.leftButtonDown()) {

                        this.sound.play("sfx_cook");
    
                        //check if they cook slug 
                        for (var index = 0; index < this.inPot.length; index++) {
                            if (this.inPot[index].ID == ID_GROCERY_SLUG) {
                                this.slugCount++;
                            }
                        }
    
                        //increment the weight if slug is added to the recipe
                        if (this.slugCount != 0) {
                            this.qualityWeight = this.qualityWeight * (2 * this.slugCount);
                        }
    
                        //total quality will be used to calculate the score
                        for (var index = 0; index < this.inPot.length; index++) {
                            this.total_quality += this.inPot[index].quality * this.qualityWeight;
                        }
    
    
                        //fill the empty slot with empty
                        while (this.inPot.length < 4) {
                            this.inPot.push(new Inventory(this, 0, 0, "slug_atlas", 'bananaslug_idle_01', 0, ID_NONE, 0).setOrigin(0.5, 0.5).setScale(this.pot_scale).setVisible(false));
                        }
    
    
    
                        //check through all recipes
                        for (var i = 0; i < menu.length; i++) {
    
                            //check through all ingredients in the pot to see if it matches the recipe
                            for (var index = 0; index < this.inPot.length; index++) {
                                //it won't check it again if the specific ingredients have already matched
                                if (menu[i].ingredient1 == this.inPot[index].ID && menu[i].flag_ingredient1 == false) {
                                    menu[i].flag_ingredient1 = true;
                                    menu[i].flag_matched++;
                                } else if (menu[i].ingredient2 == this.inPot[index].ID && menu[i].flag_ingredient2 == false) {
                                    menu[i].flag_ingredient2 = true;
                                    menu[i].flag_matched++;
                                } else if (menu[i].ingredient3 == this.inPot[index].ID && menu[i].flag_ingredient3 == false) {
                                    menu[i].flag_ingredient3 = true;
                                    menu[i].flag_matched++;
                                } else if (menu[i].ingredient4 == this.inPot[index].ID && menu[i].flag_ingredient4 == false) {
                                    menu[i].flag_ingredient4 = true;
                                    menu[i].flag_matched++;
                                } else {
                                }
                            }
    
                            //this will hit 4 when all ingredient matched (order didn't matter)
                            if (menu[i].flag_matched == 4) {
                                this.foundRecipe = true;
                                //first check if the dishes matches the order
                                this.matchOrder = false;
                                for (var k = 0; k < 1; k++) {
                                    if (menu[i].ID == randomMenu_tutor[k].ID) {
                                        this.matchOrder = true;
                                        break;
                                    }
                                }
    
                                //double the point if they made what order is asking
                                if (this.matchOrder == true) {
                                    this.pt = (menu[i].points * this.total_quality) * 2;
                                    this.score += this.pt;
                                } else {
                                    this.pt = menu[i].points * this.total_quality;
                                    this.score += this.pt;
                                }
                                this.tempName = menu[i].Name;
    

    
                            }
                            //reset this recipe after the sort
                            this.potCook_Helper_resetRecipe(i);
                        }
    
                        if (this.foundRecipe == false) {
                            this.pt = -10;
                            this.score -= 10;
                            this.tempName = "bad dish";
                        }
                        //clean the pot up
                        this.potCook_Helper_reset();
                    }//click done
    
                    this.steam = this.add.sprite(660, 160, 'steam').setOrigin(0.5);
                    this.steam.play("steam_anim");
    
                    //set pot is working
                    this.potIsWorking = true;
    
                    //text and animation when cooking
                    this.steamEvent = this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            {
    
                                this.cookText1 = this.add.text(600, 100, "Made", cookconfig).setOrigin(0.5);
                                this.cookText2 = this.add.text(700, 150, this.tempName, cookconfig2).setOrigin(0.5);
                                this.cookText4 = this.add.text(600, 200, "  " + this.pt.toFixed(0) + " pts", cookconfig4).setOrigin(0.5);
    
                                this.text3_rec = this.add.rectangle(720, 250, 100, 50, 0xfff9f9).setOrigin(0.5);
                                this.text3_rec.setInteractive();
    
                                this.cookText3 = this.add.text(720, 250, "Next", cookconfig).setOrigin(0.5);
    
    
    
                                this.text3_rec.on('pointerdown', function (pointer) {
                                    if (pointer.leftButtonDown()) {
                                        this.sound.play("sfx_dialog");
                                        this.cookText1.destroy();
                                        this.cookText2.destroy();
                                        this.cookText3.destroy();
                                        this.cookText4.destroy();
                                        this.text3_rec.destroy();
                                        this.steam.destroy();
                                        this.potIsWorking = false;
                                        //this.button_cook.setInteractive();
                                    }
                                }, this) //mouse managment is done
    
                                this.text3_rec.on('pointerover', function () {
                                    this.cookText3.destroy();
                                    this.cookText3 = this.add.text(720, 250, "Next", cookconfig3).setOrigin(0.5);
                                }, this) //mouse managment is done
    
                                this.text3_rec.on('pointerout', function () {
                                    this.cookText3.destroy();
                                    this.cookText3 = this.add.text(720, 250, "Next", cookconfig).setOrigin(0.5);
                                }, this) //mouse managment is done
                            }
                        },
                        callbackScope: this,
                        loop: false
                    });//
    
    
                }//0 length validation done
            }, this) //mouse managment is done
    
    
        }
    
        //make dish moving
        dishTable_Update() {
            for (var i = 0; i < this.dishTable.length; i++) {
                if (this.dishTable[i].x > -100) {
                    this.dishTable[i].x--;
                }
            }
        }
    
        finish_button() {
            let endfig = {
                align: 'left',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#000000",
            }
    
            let endfig2 = {
                align: 'left',
                fontFamily: 'Lobster',
                fontSize: "45px",
                color: "#b30000",
            }
    
            this.end_rec = this.add.rectangle(1200, 580, 120, 50, 0xbc936b).setOrigin(0.5);
            this.end_rec.setInteractive();
            this.endText = this.add.text(1200, 580, "FINISH", endfig).setOrigin(0.5);
    
    
    
            this.end_rec.on('pointerdown', function (pointer) {
                if (pointer.leftButtonDown()) {
                    this.sound.play("sfx_button");
                    this.dialog_reset();
                    this.endGame_Update_Helper_reset()
                    this.scene.start("tutorial_0");
                    this.endText.destroy();
                    this.end_rec.destroy();
                }
            }, this) //mouse managment is done
    
            this.end_rec.on('pointerover', function () {
                this.endText.destroy();
                this.endText = this.add.text(1200, 580, "FINISH", endfig2).setOrigin(0.5);
            }, this) //mouse managment is done
    
            this.end_rec.on('pointerout', function () {
                this.endText.destroy();
                this.endText = this.add.text(1200, 580, "FINISH", endfig).setOrigin(0.5);
            }, this) //mouse managment is done
        }
    
        //function that init the order area
        order_Init() {
    
            let size_recipeIngre = 0.2;
            let recipe_TextConfig = {
                align: 'center',
                fontFamily: 'Lobster',
                fontSize: "30px",
                color: "#383737",
            }
    
            this.recipe1_text = this.add.text(1000, 150, randomMenu_tutor[0].Name, recipe_TextConfig);
            if (randomMenu_tutor[0].ingredient1 != 0) {
                this.recipe1_ingredient1 = this.add.sprite(1010, 190, randomMenu_tutor[0].ingredient1_texture, randomMenu_tutor[0].ingredient1_frame).setOrigin(0, 0).setScale(size_recipeIngre);
            }
            if (randomMenu_tutor[0].ingredient2 != 0) {
                this.recipe1_ingredient2 = this.add.sprite(1060, 190, randomMenu_tutor[0].ingredient2_texture, randomMenu_tutor[0].ingredient2_frame).setOrigin(0, 0).setScale(size_recipeIngre);
            }
            if (randomMenu_tutor[0].ingredient3 != 0) {
                this.recipe1_ingredient3 = this.add.sprite(1110, 190, randomMenu_tutor[0].ingredient3_texture, randomMenu_tutor[0].ingredient3_frame).setOrigin(0, 0).setScale(size_recipeIngre);
            }
            if (randomMenu_tutor[0].ingredient3 != 0) {
                this.recipe1_ingredient3 = this.add.sprite(1160, 190, randomMenu_tutor[0].ingredient4_texture, randomMenu_tutor[0].ingredient4_frame).setOrigin(0, 0).setScale(size_recipeIngre);
            }
        }
    
    
    
        //helper function used to reset globle variable
        endGame_Update_Helper_reset() {
            //reinitialize inventory
            inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;
            inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;
            //reinitialize inventory
            inventory_stage2_spacing_x = INVENTORY_STAGE2_ORIGINAL_X;
            inventory_stage2_spacing_y = INVENTORY_STAGE2_ORIGINAL_Y;
            //reinitialize those local variable
            this.qualityWeight = 0.4;
            this.score = 0;
            this.inventory_sprite = null;
            this.inventory_sprite = [];
        }

   

}