class scoreboard extends Phaser.Scene {
    constructor() {
        super("scoreboard");


    }

    create() {


        // local variable
        this.spacingY = 50;


        // ------------------------------------------------------------------
        // background setup
        // layer bottom 
        this.background_field5 = this.add.tileSprite(0, 0, 1280, 720, 'score_background5').setOrigin(0, 0);
        this.background_field2 = this.add.tileSprite(0, 0, 1280, 720, 'score_background2').setOrigin(0, 0);
        this.background_field3 = this.add.tileSprite(0, 0, 1280, 720, 'score_background3').setOrigin(0, 0);
        // layer top
        this.background_field4 = this.add.tileSprite(0, 0, 1280, 720, 'score_background1').setOrigin(0, 0);
        this.background_field1 = this.add.tileSprite(0, 0, 1280, 720, 'score_background4').setOrigin(0, 0);
        // background setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // mouse, keyboard setup
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------

        this.UI();





    }


    update() {

        //bonus close game if play more than 7 times
        if (score.length > 7) {
                    close();
         }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.endGame_Update_Helper_reset();
            this.scene.start("title_screen");
        } else {
            this.background_field2.tilePositionY -= 2.5;
            this.background_field3.tilePositionY -= 1.5;
            this.background_field4.tilePositionY -= 1;
        }

    }


    //function that display all infor of score board
    UI() {

        let Textconfig = {
            align: 'left',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }


        this.spacingY_inc = 70;

        this.line0 = this.add.text(500, this.spacingY, "SCOREBOARD", Textconfig);
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line00 = this.add.text(450, this.spacingY, "PLAY              SCORE", Textconfig);
        this.spacingY = this.spacingY + this.spacingY_inc;

        //display play time and score
        this.line1 = this.add.text(480, this.spacingY, "1", Textconfig);
        if (score.length > 0) {
            this.line1_score = this.add.text(700, this.spacingY, score[0].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line2 = this.add.text(480, this.spacingY, "2", Textconfig);
        if (score.length > 1) {
            this.line1_score = this.add.text(700, this.spacingY, score[1].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line3 = this.add.text(480, this.spacingY, "3", Textconfig);
        if (score.length > 2) {
            this.line1_score = this.add.text(700, this.spacingY, score[2].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line4 = this.add.text(480, this.spacingY, "4", Textconfig);
        if (score.length > 3) {
            this.line1_score = this.add.text(700, this.spacingY, score[3].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line5 = this.add.text(480, this.spacingY, "5", Textconfig);
        if (score.length > 4) {
            this.line1_score = this.add.text(700, this.spacingY, score[4].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line6 = this.add.text(480, this.spacingY, "6", Textconfig);
        if (score.length > 5) {
            this.line1_score = this.add.text(700, this.spacingY, score[5].toFixed(0), Textconfig);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;
        this.line7 = this.add.text(480, this.spacingY, "7", Textconfig);
        if (score.length > 6) {
            this.line1_score = this.add.text(700, this.spacingY, score[6].toFixed(0), Textconfig);
            //end the game when bonus run is over
            score.push(0);
        }
        this.spacingY = this.spacingY + this.spacingY_inc;

    }

    //used for randomize the recipe
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
        //reinitialize the bonus
        bonusPoint_fromStage1 = 0;
        //reinitialize those local variable

    }
}