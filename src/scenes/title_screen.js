class title_screen extends Phaser.Scene {
    constructor() {
        super("title_screen");


       
    }

    create() {
        // key input init
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // temp white background
        this.add.rectangle(0, 0, 1280, 720, 0xFFFFFF).setOrigin(0, 0);

        // background
        this.add.tileSprite(0, 0, 1280, 720, 'menu_background').setOrigin(0, 0);

        // intialize the cart
        this.cart = new menu_cart(this, 155 + 315, 575, 'cart').setOrigin(0, 0);

 
        // initialize the bgm
        if(!title_bgm_isPlaying){
        this.title_bgm = this.sound.add('title_bgm', { volume: 0.4 });
        this.title_bgm.play();
        title_bgm_isPlaying = true;
        }

        //randomlize menu
        this.menu_Update();


        //this.scene.start("tutorial_2");


        if(store_bgm_isPlaying){
            store_bgm.stop();
            store_bgm_isPlaying = false;
        }


    }

    update() {




        // update cart
        this.cart.update();
        this.selectFromMenu();


    }


    selectFromMenu() {
        // enter key interaction
        if (Phaser.Input.Keyboard.JustDown(keyEnter)) {
            // stop title screen bgm and start store bgm

            if (this.cart.locate == 1) {
                this.title_bgm.stop();
                title_bgm_isPlaying = false;
                if(!store_bgm_isPlaying){
                    store_bgm = this.sound.add('store_bgm', { volume: 0.4 });
                    store_bgm.play();
                    store_bgm_isPlaying = true;
                }


                // play door sfx
                this.sound.play('sfx_door');
                this.scene.start("stage_one_vegetables");
            }
            else if (this.cart.locate == 2) {
                // play door sfx
                this.sound.play('sfx_door');
                this.scene.start("tutorial_0");
            }
            else if (this.cart.locate == 3) {
                // play door sfx
                this.sound.play('sfx_door');
                this.scene.start("credits");
            }
            else if (this.cart.locate == 4) {
                close();
            }
        }
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

    menu_Update() {
        this.recipe_randomizer();
    }
}




