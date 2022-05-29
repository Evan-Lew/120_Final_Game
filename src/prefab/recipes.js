class recipes extends Phaser.GameObjects.Sprite {
    //construct guide: x, y are where sprite are created
    // (won't display) texture is atlas name, for example, 'recipes_atlas'
    // (won't display) frame is starting frame, for example, 'recipes_idle_01'
    //                 dishName is dish name
    //                 dishID are the ID used for the dish
    //                 points are used for calculation scores
    //                 randomable means if the dish can be put in order area
    //                 ingredients are groceries needed to make the recipe

    constructor(scene, x, y, texture, frame, dishName, dishID, points, randomable, ingredient1, ingredient2, ingredient3, ingredient4) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.idle = frame;
        this.key = texture;

        this.Name = dishName;
        this.ID = dishID;
        this.points = points;
        this.randomable = randomable;
        this.ingredient1 = ingredient1;
        this.ingredient2 = ingredient2;
        this.ingredient3 = ingredient3;
        this.ingredient4 = ingredient4;


        //flag are used to check if it matches the what the pot has
        this.flag_ingredient1 = false;
        this.flag_ingredient2 = false;
        this.flag_ingredient3 = false;
        this.flag_ingredient4 = false;

        this.flag_matched = 0;

        this.flag_beenPicked = false;


        this.count = 0;             //count will be used to calculate how many ingredients are here
        this.ingredient1_texture;
        this.ingredient1_frame;
        this.ingredient2_texture;
        this.ingredient2_frame;
        this.ingredient3_texture;
        this.ingredient3_frame;
        this.ingredient4_texture;
        this.ingredient4_frame;

        this.count_ingredient();
        //limit the loop time
        if(this.randomable){
        this.library_ID_to_Idle();
        }



    }

    count_ingredient() {
        if (this.ingredient1 != 0) {
            this.count++;
        }
        if (this.ingredient2 != 0) {
            this.count++;
        }
        if (this.ingredient3 != 0) {
            this.count++;
        }
        if (this.ingredient4 != 0) {
            this.count++;
        }
    }

    library_ID_to_Idle() {

        if (this.ingredient1 != 0) {
            if (this.ingredient1 == ID_GROCERY_TOMATO) {
                this.ingredient1_texture = "vegetables_atlas";
                this.ingredient1_frame = "tomato_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_CARROT) {
                this.ingredient1_texture = "vegetables_atlas";
                this.ingredient1_frame = "carrot_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_ONION) {
                this.ingredient1_texture = "vegetables_atlas";
                this.ingredient1_frame = "onion_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_CORN) {
                this.ingredient1_texture = "vegetables_atlas";
                this.ingredient1_frame = "corn_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_POTATO) {
                this.ingredient1_texture = "vegetables_atlas";
                this.ingredient1_frame = "potato_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_CHICKEN) {
                this.ingredient1_texture = "meats_atlas";
                this.ingredient1_frame = "chicken_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_STEAK) {
                this.ingredient1_texture = "meats_atlas";
                this.ingredient1_frame = "steak_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_FISH) {
                this.ingredient1_texture = "meats_atlas";
                this.ingredient1_frame = "fish_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_BEEF) {
                this.ingredient1_texture = "meats_atlas";
                this.ingredient1_frame = "beef_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_SHRIMP) {
                this.ingredient1_texture = "meats_atlas";
                this.ingredient1_frame = "shrimp_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_CHEESE) {
                this.ingredient1_texture = "dairy_atlas";
                this.ingredient1_frame = "cheese_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_MILK) {
                this.ingredient1_texture = "dairy_atlas";
                this.ingredient1_frame = "milk_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_EGGS) {
                this.ingredient1_texture = "dairy_atlas";
                this.ingredient1_frame = "eggs_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_BUTTER) {
                this.ingredient1_texture = "dairy_atlas";
                this.ingredient1_frame = "butter_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_YOGURT) {
                this.ingredient1_texture = "dairy_atlas";
                this.ingredient1_frame = "yogurt_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_SOYSAUCE) {
                this.ingredient1_texture = "seasoning_atlas";
                this.ingredient1_frame = "soysauce_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_PARSLEY) {
                this.ingredient1_texture = "seasoning_atlas";
                this.ingredient1_frame = "parsley_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_GARLIC) {
                this.ingredient1_texture = "seasoning_atlas";
                this.ingredient1_frame = "garlic_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_SALT) {
                this.ingredient1_texture = "seasoning_atlas";
                this.ingredient1_frame = "salt_normal_01";
            } else if (this.ingredient1 == ID_GROCERY_PEPPER) {
                this.ingredient1_texture = "seasoning_atlas";
                this.ingredient1_frame = "pepper_normal_01";
            } else {
                console.log("Error: ID not found " + this.ingredient1);
            }            
        }


        if (this.ingredient2 != 0) {
            if (this.ingredient2 == ID_GROCERY_TOMATO) {
                this.ingredient2_texture = "vegetables_atlas";
                this.ingredient2_frame = "tomato_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_CARROT) {
                this.ingredient2_texture = "vegetables_atlas";
                this.ingredient2_frame = "carrot_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_ONION) {
                this.ingredient2_texture = "vegetables_atlas";
                this.ingredient2_frame = "onion_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_CORN) {
                this.ingredient2_texture = "vegetables_atlas";
                this.ingredient2_frame = "corn_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_POTATO) {
                this.ingredient2_texture = "vegetables_atlas";
                this.ingredient2_frame = "potato_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_CHICKEN) {
                this.ingredient2_texture = "meats_atlas";
                this.ingredient2_frame = "chicken_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_STEAK) {
                this.ingredient2_texture = "meats_atlas";
                this.ingredient2_frame = "steak_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_FISH) {
                this.ingredient2_texture = "meats_atlas";
                this.ingredient2_frame = "fish_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_BEEF) {
                this.ingredient2_texture = "meats_atlas";
                this.ingredient2_frame = "beef_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_SHRIMP) {
                this.ingredient2_texture = "meats_atlas";
                this.ingredient2_frame = "shrimp_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_CHEESE) {
                this.ingredient2_texture = "dairy_atlas";
                this.ingredient2_frame = "cheese_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_MILK) {
                this.ingredient2_texture = "dairy_atlas";
                this.ingredient2_frame = "milk_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_EGGS) {
                this.ingredient2_texture = "dairy_atlas";
                this.ingredient2_frame = "eggs_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_BUTTER) {
                this.ingredient2_texture = "dairy_atlas";
                this.ingredient2_frame = "butter_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_YOGURT) {
                this.ingredient2_texture = "dairy_atlas";
                this.ingredient2_frame = "yogurt_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_SOYSAUCE) {
                this.ingredient2_texture = "seasoning_atlas";
                this.ingredient2_frame = "soysauce_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_PARSLEY) {
                this.ingredient2_texture = "seasoning_atlas";
                this.ingredient2_frame = "parsley_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_GARLIC) {
                this.ingredient2_texture = "seasoning_atlas";
                this.ingredient2_frame = "garlic_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_SALT) {
                this.ingredient2_texture = "seasoning_atlas";
                this.ingredient2_frame = "salt_normal_01";
            } else if (this.ingredient2 == ID_GROCERY_PEPPER) {
                this.ingredient2_texture = "seasoning_atlas";
                this.ingredient2_frame = "pepper_normal_01";
            } else {
                console.log("Error: ID not found " + this.ingredient2);
            }
        }



        if (this.ingredient3 != 0) {
            if (this.ingredient3 == ID_GROCERY_TOMATO) {
                this.ingredient3_texture = "vegetables_atlas";
                this.ingredient3_frame = "tomato_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_CARROT) {
                this.ingredient3_texture = "vegetables_atlas";
                this.ingredient3_frame = "carrot_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_ONION) {
                this.ingredient3_texture = "vegetables_atlas";
                this.ingredient3_frame = "onion_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_CORN) {
                this.ingredient3_texture = "vegetables_atlas";
                this.ingredient3_frame = "corn_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_POTATO) {
                this.ingredient3_texture = "vegetables_atlas";
                this.ingredient3_frame = "potato_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_CHICKEN) {
                this.ingredient3_texture = "meats_atlas";
                this.ingredient3_frame = "chicken_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_STEAK) {
                this.ingredient3_texture = "meats_atlas";
                this.ingredient3_frame = "steak_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_FISH) {
                this.ingredient3_texture = "meats_atlas";
                this.ingredient3_frame = "fish_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_BEEF) {
                this.ingredient3_texture = "meats_atlas";
                this.ingredient3_frame = "beef_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_SHRIMP) {
                this.ingredient3_texture = "meats_atlas";
                this.ingredient3_frame = "shrimp_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_CHEESE) {
                this.ingredient3_texture = "dairy_atlas";
                this.ingredient3_frame = "cheese_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_MILK) {
                this.ingredient3_texture = "dairy_atlas";
                this.ingredient3_frame = "milk_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_EGGS) {
                this.ingredient3_texture = "dairy_atlas";
                this.ingredient3_frame = "eggs_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_BUTTER) {
                this.ingredient3_texture = "dairy_atlas";
                this.ingredient3_frame = "butter_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_YOGURT) {
                this.ingredient3_texture = "dairy_atlas";
                this.ingredient3_frame = "yogurt_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_SOYSAUCE) {
                this.ingredient3_texture = "seasoning_atlas";
                this.ingredient3_frame = "soysauce_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_PARSLEY) {
                this.ingredient3_texture = "seasoning_atlas";
                this.ingredient3_frame = "parsley_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_GARLIC) {
                this.ingredient3_texture = "seasoning_atlas";
                this.ingredient3_frame = "garlic_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_SALT) {
                this.ingredient3_texture = "seasoning_atlas";
                this.ingredient3_frame = "salt_normal_01";
            } else if (this.ingredient3 == ID_GROCERY_PEPPER) {
                this.ingredient3_texture = "seasoning_atlas";
                this.ingredient3_frame = "pepper_normal_01";
            } else {
                console.log("Error: ID not found " + this.ingredient3);
            }
        }



        if (this.ingredient4 != 0) {
            if (this.ingredient4 == ID_GROCERY_TOMATO) {
                this.ingredient4_texture = "vegetables_atlas";
                this.ingredient4_frame = "tomato_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_CARROT) {
                this.ingredient4_texture = "vegetables_atlas";
                this.ingredient4_frame = "carrot_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_ONION) {
                this.ingredient4_texture = "vegetables_atlas";
                this.ingredient4_frame = "onion_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_CORN) {
                this.ingredient4_texture = "vegetables_atlas";
                this.ingredient4_frame = "corn_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_POTATO) {
                this.ingredient4_texture = "vegetables_atlas";
                this.ingredient4_frame = "potato_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_CHICKEN) {
                this.ingredient4_texture = "meats_atlas";
                this.ingredient4_frame = "chicken_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_STEAK) {
                this.ingredient4_texture = "meats_atlas";
                this.ingredient4_frame = "steak_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_FISH) {
                this.ingredient4_texture = "meats_atlas";
                this.ingredient4_frame = "fish_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_BEEF) {
                this.ingredient4_texture = "meats_atlas";
                this.ingredient4_frame = "beef_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_SHRIMP) {
                this.ingredient4_texture = "meats_atlas";
                this.ingredient4_frame = "shrimp_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_CHEESE) {
                this.ingredient4_texture = "dairy_atlas";
                this.ingredient4_frame = "cheese_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_MILK) {
                this.ingredient4_texture = "dairy_atlas";
                this.ingredient4_frame = "milk_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_EGGS) {
                this.ingredient4_texture = "dairy_atlas";
                this.ingredient4_frame = "eggs_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_BUTTER) {
                this.ingredient4_texture = "dairy_atlas";
                this.ingredient4_frame = "butter_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_YOGURT) {
                this.ingredient4_texture = "dairy_atlas";
                this.ingredient4_frame = "yogurt_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_SOYSAUCE) {
                this.ingredient4_texture = "seasoning_atlas";
                this.ingredient4_frame = "soysauce_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_PARSLEY) {
                this.ingredient4_texture = "seasoning_atlas";
                this.ingredient4_frame = "parsley_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_GARLIC) {
                this.ingredient4_texture = "seasoning_atlas";
                this.ingredient4_frame = "garlic_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_SALT) {
                this.ingredient4_texture = "seasoning_atlas";
                this.ingredient4_frame = "salt_normal_01";
            } else if (this.ingredient4 == ID_GROCERY_PEPPER) {
                this.ingredient4_texture = "seasoning_atlas";
                this.ingredient4_frame = "pepper_normal_01";
            } else {
                console.log("Error: ID not found " + this.ingredient4);
            }
        }
    }

}
