class stage_two_cooking extends Phaser.Scene {
    constructor() {
        super("stage_two_cooking");


    }

    create() {
        //local variable
        this.inventory_scale = 0.3;
        this.pot_scale = 0.4;
        this.score = bonusPoint_fromStage1;
        this.total_quality = 1;
        this.qualityWeight = 0.4;
        this.slugCount = 0;
        this.potIsWorking = false;


        this.dishTable = [];
        this.inventory_sprite = [];
        this.inPot = [];
        this.dishTable = [];
        this.foundRecipe = false;


        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(600, 100, 400, 550, 0xEFC0C0).setOrigin(0, 0);

        // ------------------------------------------------------------------
        // music setup
        if(store_bgm_isPlaying){
            store_bgm.stop();
            store_bgm_isPlaying = false;
        }
        this.cook_bgm = this.sound.add('cook_bgm', { volume: 0.4 });
        this.cook_bgm.play();
        // music setup end
        // ------------------------------------------------------------------

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



        //performance debugging
        //console.log("inventory length is " + inventory.length);
       //console.log("inventory sprite length is " + this.inventory_sprite.length);
        //console.log("pot length is " + this.inPot.length);
        //console.log("recipe length is " + menu.length);



        this.finish_button();


    }


    update() {

        this.UI_Update();
        this.dishTable_Update();
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play("sfx_button");
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        }

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
                    this.inPot.push(new Inventory(this, pot_spacing_x, pot_spacing_y, inventory[i].key, inventory[i].idle, inventory[i].quality, inventory[i].ID, inventory[i].price).setOrigin(0.5, 0.5).setScale(this.pot_scale));
                    pot_spacing_x += POT_INCREMENT_X;
                    //go next line
                    if ((pot_spacing_x - POT_SPACING_ORIGINAL_X) >= 2 * POT_INCREMENT_X) {
                        pot_spacing_x = POT_SPACING_ORIGINAL_X;
                        pot_spacing_y += POT_INCREMENT_Y;
                    }
                } else {
                    this.sound.play("sfx_pot_add_fail");
                    //too many ingredients warning
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
        if (inventory.length != 0) {

            for (var i = 0; i < inventory.length; i++) {
                //make if loop to check 
                this.inventory_sprite[i] = this.add.sprite(inventory_stage2_spacing_x, inventory_stage2_spacing_y, inventory[i].key, inventory[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale).setInteractive();
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

        this.button_cook = this.add.sprite(680, 500, 'cook1').setInteractive();

        this.button_cook.on("pointerover", () => {
            this.button_cook = this.add.sprite(680, 500, 'cook2');
        });
        this.button_cook.on("pointerout", () => {
            this.button_cook = this.add.sprite(680, 500, 'cook1');
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
                            for (var k = 0; k < 3; k++) {
                                if (menu[i].ID == randomMenu[k].ID) {
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

                            // result < 0.3 will be considered as bad, > 0.6 is good, between is normal
                            this.dashCalculator = this.total_quality / this.inPot.length;
                            if (this.dashCalculator < 0) {
                                this.NewDish = this.add.sprite(DISH_ORIGINAL_X, DISH_ORIGINAL_Y, 'dish_atlas', 'dish_bad_01').setScale(0.8);
                                this.dishTable.push(this.NewDish);

                            } else if (this.dashCalculator > 0.6) {
                                this.NewDish = this.add.sprite(DISH_ORIGINAL_X, DISH_ORIGINAL_Y, 'dish_atlas', 'dish_good_01').setScale(0.8);
                                this.dishTable.push(this.NewDish);
                            } else {
                                this.NewDish = this.add.sprite(DISH_ORIGINAL_X, DISH_ORIGINAL_Y, 'dish_atlas', 'dish_normal_01').setScale(0.8);
                                this.dishTable.push(this.NewDish);
                            }




                        }
                        //reset this recipe after the sort
                        this.potCook_Helper_resetRecipe(i);
                    }

                    if (this.foundRecipe == false) {
                        this.pt = -10;
                        this.score -= 10;
                        this.tempName = "bad dish";

                        this.NewDish = this.add.sprite(DISH_ORIGINAL_X, DISH_ORIGINAL_Y, 'dish_atlas', 'dish_horrible_01').setScale(0.8);
                        this.dishTable.push(this.NewDish);
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
                this.endGame_Update_Helper_reset();
                this.scene.start("scoreboard");
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

        this.recipe1_text = this.add.text(1000, 150, randomMenu[0].Name, recipe_TextConfig);
        if (randomMenu[0].ingredient1 != 0) {
            this.recipe1_ingredient1 = this.add.sprite(1010, 190, randomMenu[0].ingredient1_texture, randomMenu[0].ingredient1_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[0].ingredient2 != 0) {
            this.recipe1_ingredient2 = this.add.sprite(1060, 190, randomMenu[0].ingredient2_texture, randomMenu[0].ingredient2_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[0].ingredient3 != 0) {
            this.recipe1_ingredient3 = this.add.sprite(1110, 190, randomMenu[0].ingredient3_texture, randomMenu[0].ingredient3_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[0].ingredient3 != 0) {
            this.recipe1_ingredient3 = this.add.sprite(1160, 190, randomMenu[0].ingredient4_texture, randomMenu[0].ingredient4_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }


        this.recipe2_text = this.add.text(1000, 240, randomMenu[1].Name, recipe_TextConfig);
        if (randomMenu[1].ingredient1 != 0) {
            this.recipe2_ingredient1 = this.add.sprite(1010, 280, randomMenu[1].ingredient1_texture, randomMenu[1].ingredient1_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[1].ingredient2 != 0) {
            this.recipe2_ingredient2 = this.add.sprite(1060, 280, randomMenu[1].ingredient2_texture, randomMenu[1].ingredient2_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[1].ingredient3 != 0) {
            this.recipe2_ingredient3 = this.add.sprite(1110, 280, randomMenu[1].ingredient3_texture, randomMenu[1].ingredient3_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[1].ingredient3 != 0) {
            this.recipe2_ingredient3 = this.add.sprite(1160, 280, randomMenu[1].ingredient4_texture, randomMenu[1].ingredient4_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }

        this.recipe3_text = this.add.text(1000, 330, randomMenu[2].Name, recipe_TextConfig);
        if (randomMenu[2].ingredient1 != 0) {
            this.recipe2_ingredient1 = this.add.sprite(1010, 370, randomMenu[2].ingredient1_texture, randomMenu[2].ingredient1_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[2].ingredient2 != 0) {
            this.recipe2_ingredient2 = this.add.sprite(1060, 370, randomMenu[2].ingredient2_texture, randomMenu[2].ingredient2_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[2].ingredient3 != 0) {
            this.recipe2_ingredient3 = this.add.sprite(1110, 370, randomMenu[2].ingredient3_texture, randomMenu[2].ingredient3_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
        if (randomMenu[2].ingredient3 != 0) {
            this.recipe2_ingredient3 = this.add.sprite(1160, 370, randomMenu[2].ingredient4_texture, randomMenu[2].ingredient4_frame).setOrigin(0, 0).setScale(size_recipeIngre);
        }
    }



    //helper function used to reset globle variable
    endGame_Update_Helper_reset() {
        //update score to score board
        score.push(this.score);
        //free memory
        groceries = null;
        inventory = null;
        //reinitialize it
        groceries = [];
        inventory = [];
        //reinitialize inventory
        inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;
        inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;
        //reinitialize inventory
        inventory_stage2_spacing_x = INVENTORY_STAGE2_ORIGINAL_X;
        inventory_stage2_spacing_y = INVENTORY_STAGE2_ORIGINAL_Y;
        //reinitialize budget
        budget = BUDGET;
        //reinitialize flag
        gameOver = false;
        stageOneOver = false;
        //reinitialize timer
        timer = 0;
        timer_countDown = TIME_PHASE_END / 1000;
        //reinitialize the bonus
        bonusPoint_fromStage1 = 0;
        //reinitialize those local variable
        this.qualityWeight = 0.4;
        this.score = 0;
        this.dishTable = null;
        this.dishTable = [];
        this.inventory_sprite = null;
        this.inventory_sprite = [];
        //stop music
        this.cook_bgm.stop();
    }
}








