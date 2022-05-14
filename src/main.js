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


// globle variables
// WARNING: Dynamic varible may cause memory leak, free array before u restart the scene
var groceries = [];
var quality_bad = -1;
var quality_normal = 1;
var quality_good = 1;
/*
var inventory_grocery_potato_goodQuality ;
var inventory_grocery_potato_normalQuality ;
var inventory_grocery_potato_badQuality ;
*/



