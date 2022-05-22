class stage_two_cooking extends Phaser.Scene {
    constructor() {
        super("stage_two_cooking");


    }

    create() {
        this.inventory_scale = 0.2;
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);

        let TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

        this.text = this.add.text(600, 300, "Press enter to return", TextConfig);


        
            //display inventory stuffs if it's not empty
            if (inventory.length != 0) {
    
                for (var i = 0; i < inventory.length; i++) {
                    //make if loop to check 
    
                    this.add.sprite(inventory[i].x, inventory[i].y, inventory[i].key, inventory[i].idle).setOrigin(0.5, 0.5).setScale(this.inventory_scale);
                    inventory[i].visible = true;
                }
            
        }

    }


    update() {
       if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
        this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
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
            stageOneOver = false;
            //reinitialize timer
            timer = 0;
            timer_countDown = TIME_PHASE_END / 1000;
        }
    

}

