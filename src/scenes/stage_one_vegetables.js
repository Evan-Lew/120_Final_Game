class stage_one_vegetables extends Phaser.Scene {
    constructor() {
        super("stage_one_vegetables");




    }

    create() {

        // ------------------------------------------------------------------
        // local variable create
        this.tomato_scale = 0.4;
        this.scale = 0.4;   //tell me when u make some weird asset with DIFFERENT Scale 
        this.inventory_scale = 0.2;
        this.generation_frequency = 3000;   // 3 seconds
        this.randomQuality = 0;
        this.inventory_spacing = 0;
        this.inventory_spacing_increment = 20;
        // local variable end
        // ------------------------------------------------------------------



        // ------------------------------------------------------------------
        // animation create
        // rm  this.createAnimations();
        // animation end
        // ------------------------------------------------------------------




        // ------------------------------------------------------------------
        // Background Layer
        // play area
        this.canvas_play = this.add.rectangle(0, 0, 940, 720, 0xB1F2F2).setOrigin(0, 0);
        // order
        this.canvas_order = this.add.rectangle(940, 0, 340, 480, 0xE5AE89).setOrigin(0, 0);
        // extra
        this.canvas_inventory = this.add.rectangle(940, 480, 340, 240, 0xFFFFFFF).setOrigin(0, 0);
        // background end
        // ------------------------------------------------------------------


        this.add.text(0, 0, "Here is the  play area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 70, "order area", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });
        this.add.text(940, 480, "Inventory", { align: 'center', fontFamily: 'Georgia', fontSize: '32px', color: '#000000', });


        // ------------------------------------------------------------------
        // mouse setup
        this.input.mouse.disableContextMenu();
        // mouse setup end
        // ------------------------------------------------------------------


        // ------------------------------------------------------------------
        // Aisle setup
        this.groceries_Generate(ID_GROCERY_TOMATO);
        // Aisle setup end
        // ------------------------------------------------------------------

    }


    update() {



        this.groceries_Update(VELOCITY_EASY);

        console.log(groceries.length);

        console.log(inventory.length);


    }

    //note: helper function shouldn't be called in create(), update(), it's for function only
    //HELPER function used in other groceries func, setting up: mouse, modify inventory, modify inventory spacing
    groceries_Helper_MouseInput(i) {

        if (groceries[i].ID == ID_GROCERY_TOMATO) {
            //mouse control
            groceries[i].on('pointerdown', function (pointer) {
                if (pointer.rightButtonDown()) {
                    //case right click 
                    groceries[i].flipGrocery();
                } else if (pointer.leftButtonDown()) {
                    //case left click 
                    //currently just set grocery to invisible
                    //need to add /drag animation

                    //spacing for inventory
                    if(inventory_spacing_x < 250){
                    inventory_spacing_x += INVENTORY_INCREMENT;
                    }else{
                    inventory_spacing_x = 0;
                    inventory_spacing_y += INVENTORY_INCREMENT;
                    }

                    groceries[i].leftClickFlag = true;
                } else {
                    //case other click (mouse mid key or side keys)
                    console.log("ERROR: Undefined key");
                }
            })
        }

    }

    //HELPER function used in generating the random
    groceries_Helper_MakeRandomQuality() {
        let temp = 0;
        temp = Phaser.Math.Between(1, 4);
        if (temp == 1) {
            //return bad quality
            this.randomQuality = -1;
        } else if (temp == 2 || temp == 3) {
            //return normal quality    with bigger change than bad/good
            this.randomQuality = 0;
        } else {
            //return good quality
            this.randomQuality = 1;
        }
    }

    //generate Groceries on the left with ID, which should be defined as global and unique in main.js
    groceries_Generate(ID_GROCERY_) {
        //first grocery will be init before delay time event
        this.groceries_Helper_MakeRandomQuality();
        groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'vegetables_atlas', 'tomato_idle_01', 'tomato_bad_02', 'tomato_normal_02', 'tomato_good_02', this.randomQuality, ID_GROCERY_TOMATO).setOrigin(0.5, 0.5).setScale(this.tomato_scale).setInteractive());
        this.groceries_Helper_MouseInput(0);
        this.timer = this.time.addEvent({
            delay: this.generation_frequency,
            callback: () => {
                {
                    if (ID_GROCERY_ == 1001) { //1001 tomato, see main.js
                        this.groceries_Helper_MakeRandomQuality();
                        groceries.push(new Groceries(this, this.canvas_play.width + 100, 1 * this.canvas_play.height / 3, 'vegetables_atlas', 'tomato_idle_01', 'tomato_bad_02', 'tomato_normal_02', 'tomato_good_02',this.randomQuality, ID_GROCERY_TOMATO).setOrigin(0.5, 0.5).setScale(this.tomato_scale).setInteractive());

                        //add mouse input to latest created grocery
                        this.groceries_Helper_MouseInput(groceries.length - 1);
                    } else if (ID_GROCERY_ == 1002) {  //1002 carrot

                    } else {
                        console.log("Error: Bad ID");
                    }
                }
            }, //call back end
            callbackScope: this,
            loop: true

        });//time event end
    }


    //function called in update to control grocery status: visibility, moving speed control
    groceries_Update(VELOCITY_) {
        //visibility update  
        if (groceries.length != 0) {
            for (var i = 0; i < groceries.length; i++) {
                groceries[i].x -= VELOCITY_;
                //it won't be visiable until it shows up in canvas
                if (groceries[i].x > this.canvas_play.width - 50) {
                    groceries[i].visible = false;
                } else if (groceries[i].x < 100) {
                    groceries[i].visible = false;
                    //free
                    groceries[i].destroy();

                } else {
                    //if it's been choosen (right click set visiblity to false)
                    if (groceries[i].leftClickFlag) {
                        groceries[i].visible = false;
                        //free
                        groceries[i].destroy();

                    } else {
                        groceries[i].visible = true;
                    }
                }

                //move target into inventory and display it
                if (groceries[i].leftClickFlag && !groceries[i].moveToInventory) {

                    if (groceries[i].ID == ID_GROCERY_TOMATO) {
                        inventory.push(new Inventory(this, 980 + inventory_spacing_x, 540 + inventory_spacing_y, 'vegetables_atlas', groceries[i].idle, groceries[i].quality, groceries[i].ID).setOrigin(0.5, 0.5).setScale(this.inventory_scale));
                        inventory[inventory.length - 1].visible = true;
                        groceries[i].movedToInventory = true;
                        groceries[i].leftClickFlag = false;
                    } else { }//display end
                }
            }//for end
        }//if end
    }
}