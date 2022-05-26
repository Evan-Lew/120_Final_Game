class stage_two_cooking extends Phaser.Scene {
    constructor() {
        super("stage_two_cooking");


    }

    create() {



        //local variable
        this.inventory_scale = 0.4;
        this.pot_scale = 0.5;
        this.score = 0;
        this.total_quality = 1;
        this.qualityWeight = 0.4;
        this.slugCount = 0;

        this.inventory_sprite = [];
        this.inPot = [];
        this.foundRecipe = false;


        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(600, 100, 400, 550, 0xEFC0C0).setOrigin(0, 0);


        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Pot setup
        this.add.rectangle(600, 100, 400, 550, 0xEFC0C0).setOrigin(0, 0);
        //this.potButton();
        // Pot setup end
        // ------------------------------------------------------------------




        // ------------------------------------------------------------------
        // Inventory setup
        this.inventory_Display();
        // Inventory setup end
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        // Inventory setup
        this.potCook();
        // Inventory setup end
        // ------------------------------------------------------------------







        let TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

        this.text = this.add.text(600, 100, "I am a pot", TextConfig);
        this.text = this.add.text(600, 650, "Press enter to return", TextConfig);


        //performance debugging
        //console.log("inventory length is " + inventory.length);
        //console.log("inventory sprite length is " + this.inventory_sprite.length);
        //console.log("pot length is " + this.inPot.length);
        //console.log("recipe length is " + menu.length);





    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        }

        console.log("Your score  is " + this.score);


    }

    //helper function used in display to do the interaction
    inventory_Helper_onClick(i) {
        this.inventory_sprite[i].on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                if (this.inPot.length < 4) {
                    this.inventory_sprite[i].visible = false;
                    this.inPot.push(new Inventory(this, pot_spacing_x, pot_spacing_y, inventory[i].key, inventory[i].idle, inventory[i].quality, inventory[i].ID, inventory[i].price).setOrigin(0.5, 0.5).setScale(this.pot_scale));
                    pot_spacing_y += POT_INCREMENT;
                } else {
                    console.log("too many ingredients");
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
                if (inventory_stage2_spacing_x > 500) {
                    inventory_stage2_spacing_y += INVENTORY_STAGE2_INCREMENT;
                    inventory_stage2_spacing_x -= 500;
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

        let TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

        this.cook_text = this.add.text(200, 600, "Click here to cook", TextConfig);
        this.cook_text.setInteractive();
        this.cook_text.on('pointerdown', function (pointer) {

            if (pointer.leftButtonDown()) {

                if (this.inPot.length == 0) {
                    console.log("Nothing in the pot");
                    return;
                }


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
                        this.score += menu[i].points * this.total_quality;
                        console.log("U got a " + menu[i].Name)
                    }
                    //reset this recipe after the sort
                    this.potCook_Helper_resetRecipe(i);
                }

                if (this.foundRecipe == false) {
                    this.score -= 10;
                    console.log("U got a bad dish");
                }
                //clean the pot up
                this.potCook_Helper_reset();
            }//click done
        }, this) //mouse managment is done

    }

    //used for randomize the recipe
    recipe_randomizer(){
        randomMenu = null;
        randomMenu = [];
        
        var tempMenu = [];
        var tempNum1;
        var tempNum2;
        var tempNum3;
        //find all randomable meanu and push them into tempMenu
        for(var i = 0; i < menu.length; i++){
            if(menu[i].randomable){
                tempMenu.push(new recipes(this,  0, 0, menu[i].key, menu[i].idle, menu[i].Name, menu[i].ID, menu[i].points, true, menu[i].ingredient1, menu[i].ingredient2, menu[i].ingredient3, menu[i].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
            }
        }

        //then the tempMenu will have all randomable recipe, do random function
        tempNum1 = Phaser.Math.Between(0, tempMenu.length - 1);
        do{
            tempNum2 = Phaser.Math.Between(0, tempMenu.length - 1);
        }while(tempNum2 == tempNum1);
        do{
            tempNum3 = Phaser.Math.Between(0, tempMenu.length - 1);
        }while(tempNum3 == tempNum1 || tempNum3 == tempNum2);

        randomMenu.push(new recipes(this,  0, 0, tempMenu[tempNum1].key, tempMenu[tempNum1].idle, tempMenu[tempNum1].Name, tempMenu[tempNum1].ID, tempMenu[tempNum1].points, true, tempMenu[tempNum1].ingredient1, tempMenu[tempNum1].ingredient2, tempMenu[tempNum1].ingredient3, tempMenu[tempNum1].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
        randomMenu.push(new recipes(this,  0, 0, tempMenu[tempNum2].key, tempMenu[tempNum2].idle, tempMenu[tempNum2].Name, tempMenu[tempNum2].ID, tempMenu[tempNum2].points, true, tempMenu[tempNum2].ingredient1, tempMenu[tempNum2].ingredient2, tempMenu[tempNum2].ingredient3, tempMenu[tempNum2].ingredient4).setOrigin(0.5, 0.5).setVisible(false));
        randomMenu.push(new recipes(this,  0, 0, tempMenu[tempNum3].key, tempMenu[tempNum3].idle, tempMenu[tempNum3].Name, tempMenu[tempNum3].ID, tempMenu[tempNum3].points, true, tempMenu[tempNum3].ingredient1, tempMenu[tempNum3].ingredient2, tempMenu[tempNum3].ingredient3, tempMenu[tempNum3].ingredient4).setOrigin(0.5, 0.5).setVisible(false));

        tempMenu.destroy;
        tempMenu = null;
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
        //reinitialize those local variable
        this.qualityWeight = 0.4;
        this.score = 0;

        this.recipe_randomizer();
    }
}








