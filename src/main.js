// Main.js holds global variables and essential config datas

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    transparent: true,
    
    physics: {
        default: 'arcade',
        arcade: {
            fps: { forceSetTimeOut: true, target: 60 }
        }
    },


    scene: [load, title_screen, credits,  tutorial_0, tutorial_1, tutorial_2,  tutorial_4_1, tutorial_4_2, stage_one_vegetables, stage_one_meats, stage_one_dairy, stage_one_seasoning, stage_two_cooking, scoreboard]
    // the the starter scene in load.js
}

var game = new Phaser.Game(config);
var borderUISize = game.config.height / 20;
var borderPadding = borderUISize / 3;

// variable for dialog
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let cursors = null;

// input key variables
var keyLeft, keyRight, keyR;

// keys for the main menu
var keyA, keyD, keyEnter, keyESC;

// globle constant
var BASKET_HALF = 6;
var BASKET_FULL = 18;

var QUALITY_BAD = -1;
var QUALITY_NORMAL = 0;
var QUALITY_GOOD = 1;

var VELOCITY_EASY = 2;
var VELOCITY_NORMAL = 4;
var VELOCITY_HARD = 8;
var VELOCITY_EXPERT = 10;

var TIME_PHASE_ONE = 0;     //  NUM/1000 seconds, used in time event
var TIME_PHASE_TWO = 20000;          //set to 20000
var TIME_PHASE_THREE = 60000;       //set to 60000
var TIME_PHASE_FOUR = 80000;        //set to 80000
var TIME_PHASE_END = 90000;         //set to 90000

var GENERATION_FREQUENCY_P1 = 4000;    // 3 seconds
var GENERATION_FREQUENCY_P2 = GENERATION_FREQUENCY_P1 / 2;    
var GENERATION_FREQUENCY_P3 = GENERATION_FREQUENCY_P2 / 2;    
var GENERATION_FREQUENCY_P4 = GENERATION_FREQUENCY_P3 / 2;    

var ID_NONE = 0;
var ID_GROCERY_SLUG = 1000;

var ID_GROCERY_TOMATO = 1001;
var ID_GROCERY_CARROT = 1002;
var ID_GROCERY_ONION = 1003;
var ID_GROCERY_CORN = 1004;
var ID_GROCERY_POTATO = 1005;

var ID_GROCERY_CHICKEN = 1006; 
var ID_GROCERY_STEAK = 1007;
var ID_GROCERY_FISH = 1008;
var ID_GROCERY_BEEF = 1009;
var ID_GROCERY_SHRIMP = 1010;

var ID_GROCERY_CHEESE = 1011;
var ID_GROCERY_MILK = 1012;
var ID_GROCERY_EGGS = 1013;
var ID_GROCERY_BUTTER = 1014;
var ID_GROCERY_YOGURT = 1015;

var ID_GROCERY_PARSLEY  = 1016;
var ID_GROCERY_GARLIC  = 1017;
var ID_GROCERY_SALT  = 1018;
var ID_GROCERY_PEPPER  = 1019;
var ID_GROCERY_SOYSAUCE = 1020;
//var ID_GROCERY_  = 

/* README FOR MODIFY DISH ID
    ID Explain: 110: 11 means the type of the dish for example POTATO_STEAM, 0 indicate the the various suffix
    Suffix Explain:
        TASTY means add salt and pepper
        EPIC means add salt, pepper, and parsley
        CHEESEY means add cheese
        _ExtraIngrdientName  if it's not common
    NOTE: put ingredients for original dish next to in, the combination MUST BE unique    
          and don't make name too long
*/

//  Steamed potato: potato
var ID_DISH_STEAM_POTATO = 110;
var ID_DISH_STEAM_POTATO_TASTY = 112;
var ID_DISH_STEAM_POTATO_EPIC = 113;

//  Tomato salad: tomato salt
var ID_DISH_TOMATO_SALAD = 120;
var ID_DISH_TOMATO_SALAD_TASTY = 121;

//  Roasted corn: corn
var ID_DISH_ROASTED_CORN = 130;
var ID_DISH_ROASTED_CORN_TASTY = 131;
var ID_DISH_ROASTED_CORN_CHEESEY = 132;

//  Fried egg : egg soysauce
var ID_DISH_FRY_EGG = 140;

//  Chinese breakfast : egg soysauce milk
var ID_DISH_CHINESE_BREAKFAST = 141;

// Beef stew : beef onion carrot
var ID_DISH_BEEF_STEW = 150;

// Scrambled eggs : eggs milk
var ID_DISH_SCRAMBLED_EGGS = 160;

// --One item recipes that are not shown--
// Warm milk : milk
var ID_DISH_WARM_MILK = 170;

// Cooked chicken : chicken
var ID_DISH_COOKED_CHICKEN = 180;

// Cooked beef : beef
var ID_DISH_COOKED_BEEF = 190;

// Cooked fish : fish
var ID_DISH_COOKED_FISH = 200;

// Cooked shrimp : shrimp
var ID_DISH_COOKED_SHRIMP = 210;

// Cooked steak : steak
var ID_DISH_COOKED_STEAK = 220;

// Fried egg : egg
var ID_DISH_FRIED_EGG = 230;

// Steamed carrots : carrots
var ID_DISH_STEAMED_CARROTS = 240;

// --Steak Dishes--
// Steak and veggies : steak, onion, carrot
var ID_DISH_STEAK_AND_VEGGIES = 250;

// Garlic steak : steak, garlic, butter
var ID_DISH_GARLIC_STEAK = 260;

// Steak and potatos : steak, potato
var ID_DISH_STEAK_AND_POTATOS = 270;

// --Shrimp and Fish Dishes--
// Steamed fish : fish, parsley
var ID_DISH_STEAMED_FISH = 280;

// Seafood dish : fish, shrimp
var ID_DISH_SEAFOOD_DISH = 290;

// Shrimp gumbo : shrimp, beef, parsley, potato
var ID_DISH_SHRIMP_GUMBO = 300;

// Shrimp and eggs : shrimp, eggs
var ID_DISH_SHRIMP_AND_EGGS = 310;

// --Chicken Dishes--
// Quesadilla : chicken, cheese
var ID_DISH_QUESADILLA = 320;

// Veggie Quesadilla : chicken, cheese, onion, tomato
var ID_DISH_VEGGIE_QUESADILLA = 321;

// Garlic soy chicken : chicken, soy sauce, garlic
var ID_DISH_GARLIC_SOY_CHICKEN = 330;

// Buttered chicken : chicken, garlic, butter
var ID_DISH_BUTTERED_CHICKEN = 340;

// Chicken and veggies : chicken, carrot, onion
var ID_DISH_CHICKEN_AND_VEGGIES = 350;

// --Beef Dishes--
// Beef Dishes
var ID_DISH_CHILI = 360;
var ID_DISH_MEATLOAF = 370;
var ID_DISH_BEEF_BURGER = 380;
var ID_DISH_BEEF_CASSEROLE = 390;

// --Egg Dishes--
var ID_DISH_OMELETE = 400;
var ID_DISH_YOGURT_EGGS = 410;
var ID_DISH_SOY_SAUCE_EGGS = 420;

// --Garlic Fries--
var ID_DISH_GARLIC_FRIES = 430;
var ID_DISH_MASHES_POTATOS = 440;
var ID_DISH_BAKED_POTATO = 450;

// --Yogurt Dishes--
var ID_DISH_YOGURT_COLESLAW = 460;
var ID_DISH_YOGURT_SALAD = 470;

// --Corn Salad--
var ID_DISH_CORN_SALSA = 480;
var ID_DISH_POPCORN = 490;

// --Misc Dishes--
var ID_DISH_MAX_AND_CHEESE = 500;
var ID_DISH_VEGGIE_SALAD = 510;

// --Slug Dishes--
var ID_DISH_DEAD_SLUG = 520;
var ID_DISH_TWO_SLUGS = 530;
var ID_DISH_THREE_SLUGS = 540;




var INVENTORY_INCREMENT = 50;
var INVENTORY_SPACING_ORIGINAL_X = -50;
var INVENTORY_SPACING_ORIGINAL_Y = 0;

var INVENTORY_STAGE2_INCREMENT = 70;
var INVENTORY_STAGE2_ORIGINAL_X = 120;
var INVENTORY_STAGE2_ORIGINAL_Y = 170;

var POT_INCREMENT_X = 100;
var POT_INCREMENT_Y = 100;
var POT_SPACING_ORIGINAL_X = 630;
var POT_SPACING_ORIGINAL_Y = 300;

var DISH_ORIGINAL_X = 1280;
var DISH_ORIGINAL_Y = 650;
//var DISH_INCREMENT = 100;

var BUDGET = 20;
var BUDGET_TUTOR = 2;

// globle variables
// WARNING: Dynamic varible may cause memory leak, free array before u restart the scene
var groceries = [];
var inventory = [];
var menu = [];
var randomMenu = [];
var score = [];


//variable for tutor
var budget_tutor = BUDGET_TUTOR;
var groceries_tutor = [];
var inventory_tutor = [];
var randomMenu_tutor = [];





var inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;   //this number is -INVENTORY_INCREMENT because first time, it will increment first
var inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;   //before it runs
var inventory_stage2_spacing_x = INVENTORY_STAGE2_ORIGINAL_X;                 //this number is -INVENTORY_INCREMENT because first time, it will increment first
var inventory_stage2_spacing_y = INVENTORY_STAGE2_ORIGINAL_Y; 
var pot_spacing_x = POT_SPACING_ORIGINAL_X;                 //this number is -INVENTORY_INCREMENT because first time, it will increment first
var pot_spacing_y = POT_SPACING_ORIGINAL_Y; 
//var dish_spacing_x = DISH_ORIGINAL_X;
//var dish_spacing_y = DISH_ORIGINAL_Y;

var velocity = 0;

var generation_frequency = GENERATION_FREQUENCY_P1;

var timer = 0;           //this timer used as counter for time event so, timer = 1000 means 1 second
var timer_countDown = TIME_PHASE_END/1000;
var budget = BUDGET;
var bonusPoint_fromStage1 = 0;
var gameOver = false;
var stageOneOver = false;


/* Submission Description

Credit:
https://pixabay.com/music/elevator-music-elevator-music-5805/ - music used for the store bgm, we changed the reverb

https://pixabay.com/music/traditional-jazz-cool-jazz-loops-2641/ - music used for the title bgm, we changed the reverb

https://freesound.org/people/yottasounds/sounds/232136/ - cart noise sfx that we trimmed down

https://freesound.org/people/NeoSpica/sounds/425090/ - door opening sfx
*/