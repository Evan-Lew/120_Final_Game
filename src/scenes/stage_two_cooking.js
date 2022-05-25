class stage_two_cooking extends Phaser.Scene {
    constructor() {
        super("stage_two_cooking");


    }

    create() {
        


        //local variable
        this.inventory_scale = 0.4;
        this.pot_scale = 0.5;

        this.inventory_sprite = [];
        this.inPot = [];


        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);

        this.add.rectangle(600, 100, 400, 550, 0xEFC0C0).setOrigin(0, 0);


        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------



        //create some groceries for testing
        //  inventory.push(new Inventory(this, 300 + inventory_spacing_x, 200 + inventory_spacing_y, "vegetables_atlas", "tomato_normal_02", 0, ID_GROCERY_TOMATO, 1).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
        // inventory_spacing_x = 0;
        //  inventory_spacing_y += 2 * INVENTORY_INCREMENT;

        // inventory.push(new Inventory(this, 300 + inventory_spacing_x, 200 + inventory_spacing_y, "vegetables_atlas", "potato_normal_02", 0, ID_GROCERY_POTATO, 2).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
        //  inventory_spacing_x = 0;
        //  inventory_spacing_y += 2 * INVENTORY_INCREMENT;

        //  inventory.push(new Inventory(this, 300 + inventory_spacing_x, 200 + inventory_spacing_y, "seasoning_atlas", "salt_normal_02", 0, ID_GROCERY_SALT, 0.1).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
        //  inventory_spacing_x = 0;
        //  inventory_spacing_y += 2 * INVENTORY_INCREMENT;



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
        console.log("inventory length is " + inventory.length);
        console.log("inventory sprite length is " + this.inventory_sprite.length);
        console.log("pot length is " + this.inPot.length);



    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        }




    }

    //helper function used in display to do the interaction
    inventory_Helper_onClick(i) {
        this.inventory_sprite[i].on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                if (this.inPot.length < 4) {
                    this.inventory_sprite[i].visible = false;
                    this.inPot.push(new Inventory(this, POT_SPACING_ORIGINAL_X, POT_SPACING_ORIGINAL_Y, inventory[i].key, inventory[i].idle, inventory[i].quality, inventory[i].ID, inventory[i].price).setOrigin(0.5, 0.5).setScale(this.pot_scale));
                    POT_SPACING_ORIGINAL_Y += POT_INCREMENT;
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
    potCook_Helper_reset(){
        this.inPot = null;
        this.inPot = [];
    }

    potCook(){

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

            for(var i = 0; i < this.inPot.length; i++){
                console.log("I am ID: " + this.inPot[i].ID + " With quaility " + this.inPot[i].quality);
                this.inPot[i].destroy();
            }//for end

            //clean the pot up
            this.potCook_Helper_reset();

            console.log("Cook");
            }
        }, this)


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
        stageOneOver = false;
        //reinitialize timer
        timer = 0;
        timer_countDown = TIME_PHASE_END / 1000;
    }



}








