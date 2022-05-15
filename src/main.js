// Main.js holds global variables and essential config datas

let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    scene: [load, title_screen, stage_one_vegetables]
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
var QUALITY_BAD = -1;
var QUALITY_NORMAL = 0;
var QUALITY_GOOD = 1;


var VELOCITY_EASY = 2;
var VELOCITY_NORMAL = 4;
var VELOCITY_HARD = 8;
var VELOCITY_EXPERT = 10;

var TIME_PHASE_ONE = 0;     //10 seconds
var TIME_PHASE_TWO = 10000;     
var TIME_PHASE_THREE = 20000;    
var TIME_PHASE_FOUR = 30000;     
var TIME_PHASE_END = 40000;     

var ID_GROCERY_TOMATO   = 1001;
var ID_GROCERY_CARROT   = 1002;
var ID_GROCERY_ONION    = 1003;
var ID_GROCERY_CORN    = 1004;
var ID_GROCERY_POTATO    = 1005;


var INVENTORY_INCREMENT = 50;

// globle variables
// WARNING: Dynamic varible may cause memory leak, free array before u restart the scene
var groceries = [];
var inventory = [];

var inventory_spacing_x = -50;  //this number is -INVENTORY_INCREMENT because first time, it will increment first
var inventory_spacing_y = 0;   //before it runs

var velocity = 0;
var generation_frequency = 3000;   // 3 seconds


/*
var inventory_tomato_bad = 0;
var inventory_tomato_normal = 0;
var inventory_tomato_good = 0;
*/






