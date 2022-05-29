class tutorial_0 extends Phaser.Scene {
    constructor() {
        super("tutorial_0");

        this.canvas_x = 940;
        this.canvas_y = 720;


        // dialog constants
        this.DBOX_X = 0;			                            // dialog box x-position
        this.DBOX_Y = this.canvas_y - 200;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	                        // dialog box font key

        this.TEXT_X = 50;			                            // text w/in dialog box x-position
        this.TEXT_Y = this.canvas_y - 155;			    // text w/in dialog box y-position
        this.TEXT_SIZE = 30;		                            // text font size (in pixels)
        this.TEXT_MAX_WIDTH = this.canvas_x - 85;	        // max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = 900;			// next text prompt x-position
        this.NEXT_Y = 684;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.Slug = null;
        this.Rick = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;

    }

    create() {

        // ------------------------------------------------------------------
        // mouse, keyboard setup
        this.input.mouse.disableContextMenu();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // mouse, keyboard setup end
        // ------------------------------------------------------------------


        this.background_field5 = this.add.tileSprite(0, 0, 940, 720, 'Tutorial_menu').setOrigin(0, 0);


        this.text_setup();
        this.makeDialog();

    }

    update() {
        // check for spacebar press
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.dialogTyping) {
            // trigger dialog
            this.typeText();
        }

        if(Phaser.Input.Keyboard.JustDown(keyR) ){
            this.dialog_reset();
            this.scene.start("title_screen");
        }
    }

    dialog_reset() {
        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing
        this.dialog = this.cache.json.get('tutorial_0');
    }


    text_setup(){
        let tab_main_TextConfig = {
            align: 'center',
            fontFamily: 'Lobster',
            fontSize: "80px",
            color: "#000814",
        }
        this.tab_main_text = this.add.text(340, 42, "Tutorial", tab_main_TextConfig);


        let text_menu = {
            align: 'left',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#000000",
        }

        let text_menu_colorChange = {
            align: 'left',
            fontFamily: 'Lobster',
            fontSize: "45px",
            color: "#b30000",
        }

        this.menu1_rec = this.add.rectangle(470, 200, 120, 50, 0xfafafa).setOrigin(0.5);
        this.menu1_rec.setInteractive();
        this.menu1_text = this.add.text(470, 200, "Shopping", text_menu).setOrigin(0.5);

        this.menu1_rec.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.dialog_reset();
                this.scene.start("tutorial_1");
                this.menu1_text.destroy();
                this.menu1_rec.destroy();
            }
        }, this) //mouse managment is done

        this.menu1_rec.on('pointerover', function () {
            this.menu1_text.destroy();
            this.menu1_text = this.add.text(470, 200, "Shopping", text_menu_colorChange).setOrigin(0.5);
        }, this) //mouse managment is done

        this.menu1_rec.on('pointerout', function () {
            this.menu1_text.destroy();
            this.menu1_text = this.add.text(470, 200, "Shopping", text_menu).setOrigin(0.5);
        }, this) //mouse managment is done



        this.menu2_rec = this.add.rectangle(470, 275, 120, 50, 0xfafafa).setOrigin(0.5);
        this.menu2_rec.setInteractive();
        this.menu2_text = this.add.text(470, 275, "Cooking", text_menu).setOrigin(0.5);

        this.menu2_rec.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.dialog_reset();
                this.scene.start("tutorial_2");
                this.menu2_text.destroy();
                this.menu2_rec.destroy();
            }
        }, this) //mouse managment is done

        this.menu2_rec.on('pointerover', function () {
            this.menu2_text.destroy();
            this.menu2_text = this.add.text(470, 275, "Cooking", text_menu_colorChange).setOrigin(0.5);
        }, this) //mouse managment is done

        this.menu2_rec.on('pointerout', function () {
            this.menu2_text.destroy();
            this.menu2_text = this.add.text(470, 275, "Cooking", text_menu).setOrigin(0.5);
        }, this) //mouse managment is done



        this.menu3_rec = this.add.rectangle(470, 350, 120, 50, 0xfafafa).setOrigin(0.5);
        this.menu3_rec.setInteractive();
        this.menu3_text = this.add.text(470, 350, "Grocery List", text_menu).setOrigin(0.5);

        this.menu3_rec.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.dialog_reset();
                this.scene.start("tutorial_4_1");
                this.menu3_text.destroy();
                this.menu3_rec.destroy();
            }
        }, this) //mouse managment is done

        this.menu3_rec.on('pointerover', function () {
            this.menu3_text.destroy();
            this.menu3_text = this.add.text(470, 350, "Grocery List", text_menu_colorChange).setOrigin(0.5);
        }, this) //mouse managment is done

        this.menu3_rec.on('pointerout', function () {
            this.menu3_text.destroy();
            this.menu3_text = this.add.text(470, 350, "Grocery List", text_menu).setOrigin(0.5);
        }, this) //mouse managment is done



    }


    makeDialog(){
        // parse dialog from JSON file
        this.dialog = this.cache.json.get('tutorial_0');
        //console.log(this.dialog);

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'dialogbox').setOrigin(0);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen
        this.Slug = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y + 8, 'Slug').setOrigin(0, 1);
        this.Rick = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y + 8, 'Rick').setOrigin(0, 1);

        // input
        cursors = this.input.keyboard.createCursorKeys();

        // start dialog
        this.typeText();
        this.dialogText.setTint(0xffffff);
        this.nextText.setTint(0xffffff);
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

        /* Note: In my conversation data structure: 
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties: 
                    1. a speaker (required)
                    2. the dialog text (required)
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if (this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }

        // make sure we haven't run out of conversations...
        if (this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            console.log('End of Conversations');
            // tween out prior speaker's image
            if (this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }
            // make text box invisible
            this.dialogbox.visible = false;
            //this.scene.start("Machbeth");

        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if (this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if (this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + 50,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0;
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => {
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if (this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });

            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    dialog_reset(){
        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing
        this.dialog = this.cache.json.get('tutorial_0');
        }
}