class stage_two_cooking extends Phaser.Scene {
    constructor() {
        super("stage_two_cooking");


    }

    create() {

        //local variable
        this.inventory_scale = 0.4;
        this.pot_scale = 0.5;
        let pot_x = 300;


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
        //this.inventory_makeInteraction();
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



    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        }




    }
    
    /*
    inventory_makeInteraction() {
        //make every inventory groceries interactive with right lick
        //  also display them
        if (inventory.length != 0) {
            for (var i = 0; i < inventory.length; i++) {
                //     inventory[i] = this.add.sprite(inventory[i].x, inventory[i].y, inventory[i].key, inventory[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale);
                inventory[i].setInteractive();
                this.inventory_Helper_onClick(i);
            }//for end
        }
    }

    inventory_Helper_onClick(i) {
        inventory[i].on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                inventory[i].visible = false;
                inPot.push(new Inventory(this, 800 + POT_SPACING_ORIGINAL_X, 110 + POT_SPACING_ORIGINAL_Y, inventory[i].key, inventory[i].idle, inventory[i].quality, inventory[i].ID, inventory[i].price).setOrigin(0.5, 0.5).setScale(this.pot_scale));
                POT_SPACING_ORIGINAL_Y += POT_INCREMENT;
            }
        }, this)
    }// for end


    potButton(){

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
            console.log("shut up!!! I am cooking");
            }
        }, this)


    }

    */


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








