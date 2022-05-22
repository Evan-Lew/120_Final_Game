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


    scene: [load, title_screen, stage_one_vegetables, stage_one_meats]
    // the the starter scene in load.js
}

var game = new Phaser.Game(config);
var borderUISize = game.config.height / 20;
var borderPadding = borderUISize / 3;


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
var TIME_PHASE_THREE = 50000;       //set to 50000
var TIME_PHASE_FOUR = 70000;        //set to 70000
var TIME_PHASE_END = 90000;         //set to 90000

var GENERATION_FREQUENCY_P1 = 4000;    // 3 seconds
var GENERATION_FREQUENCY_P2 = GENERATION_FREQUENCY_P1 / 2;    
var GENERATION_FREQUENCY_P3 = GENERATION_FREQUENCY_P2 / 2;    
var GENERATION_FREQUENCY_P4 = GENERATION_FREQUENCY_P3 / 2;    

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
//var ID_GROCERY_ 

var INVENTORY_INCREMENT = 50;
var INVENTORY_SPACING_ORIGINAL_X = -50;
var INVENTORY_SPACING_ORIGINAL_Y = 0;

var BUDGET = 20;

// globle variables
// WARNING: Dynamic varible may cause memory leak, free array before u restart the scene
var groceries = [];
var inventory = [];

var inventory_spacing_x = INVENTORY_SPACING_ORIGINAL_X;  //this number is -INVENTORY_INCREMENT because first time, it will increment first
var inventory_spacing_y = INVENTORY_SPACING_ORIGINAL_Y;   //before it runs

var velocity = 0;

var generation_frequency = GENERATION_FREQUENCY_P1;

var timer = 0;           //this timer used as counter for time event so, timer = 1000 means 1 second
var timer_countDown = TIME_PHASE_END/1000;
var budget = BUDGET;
var gameOver = false;








