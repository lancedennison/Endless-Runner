//------------------------------------------------------------------------------------------------------------------
//  Lance Dennison
//  RGBY Runner
//  Hours spent: ~25
//  CTJ: I wanted to make a endless runner that had simple and elegant
//          graphics that started with the normal "avoid the barriers"
//          movement mechanics, but when you use QWER/ASDF to change
//          the background color, you are able to pass through the
//          blocks (I initially wanted them just blend in with the
//          background and disappear with no outline on the blocks but
//          it was too hard to play) and get points for doing so
//          (to add the points I had to distinguish between collision & overlap)
//          (I had to brute force a Play scene timer cuz scene.reset was not resetting the time)
//          (I also think I got the movement feeling pretty nice)
//
//  I believe that I was able to create a aesthetic that stands out apart from other runners
//  while staying within my own abilities as an artist
//
//  SFX made in ChipTone
//------------------------------------------------------------------------------------------------------------------
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 720,
    backgroundColor: '#CECECE',
    pixelArt: true,
    // Sets game scaling
    scale: {
        // Fit to window
        mode: Phaser.Scale.FIT,
        // Center vertically and horizontally
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// reserve keyboard vars
let keyESC, keyUP, keyDOWN, keyLEFT, keyRIGHT, keyQ, keyW, keyE, keyR, keyA, keyS, keyD, keyF;
// set text configs
let menuConfig = {
    fontFamily: 'CustomFont',
    fontSize: '28px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'right',
    padding: {
    x: 20,
    y: 5
    },
    fixedWidth: 0
}
let scoreConfig = {
    fontFamily: 'CustomFont',
    fontSize: '28px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'center',
    padding: {
    x: 10,
    y: 5
    },
    fixedWidth: 100
}
let timerConfig = {
    fontFamily: 'CustomFont',
    fontSize: '40px',
    color: '#ffffff',
    shadow: {
        color: '#4682B4',
        offsetX: 4,
        offsetY: 4,
        fill: true
    },
    align: 'right',
    fixedWidth: 0
}
let letterConfig = {
    fontFamily: 'CustomFont',
    fontSize: '28px',
    color: '#000000',
    align: 'center',
    fixedWidth: 40,
    fixedHeight: 40
}
//for menu letters
let QWER = {
    x: game.config.width / 2 - 75,
    y: game.config.height/2 + 20
}
let ASDF = {
    x: game.config.width / 2 - 50,
    y: game.config.height/2 + 65
}
let space = 45;
//define color hexes
let redHex = '#FF422E';
let greenHex = '#6A9A3B';
let blueHex = '#4B66BB';
let yellowHex = '#FFE028';
let lightHex = '#CECECE';
let darkHex = '#3F3F3F';
let redFILL = 0xFF422E;
let greenFILL = 0x6A9A3B;
let blueFILL = 0x4B66BB;
let yellowFILL = 0xFFE028;
let lightFILL = 0xCECECE;
let darkFILL = 0x3F3F3F;