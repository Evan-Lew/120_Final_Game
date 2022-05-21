class Inventory extends Phaser.GameObjects.Sprite {
    //construct guide: x, y are where sprite are created
    //                 texture is atlas name, for example, 'tomato_atlas'
    //                 frame is starting frame, for example, 'tomato_idle_01'
    //                 quality is defined as globle in main, -1 -> Bad,  0 -> Normal,  1 -> Good
    constructor(scene, x, y, texture, frame, quality, ID) {
        super(scene, x, y, texture, frame);    
        scene.add.existing(this);
        this.quality = quality;
        this.ID = ID;
        this.idle = frame;
        this.key = texture;
    }


}


