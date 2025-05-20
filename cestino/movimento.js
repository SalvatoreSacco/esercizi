"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["Jump"] = 4] = "Jump";
})(Direction || (Direction = {}));
function move(dir) {
    switch (dir) {
        case Direction.Up:
            console.log("moving up");
            break;
        case Direction.Down:
            console.log("moving down");
            break;
        case Direction.Left:
            console.log("moving left");
            break;
        case Direction.Right:
            console.log("moving right");
            break;
        case Direction.Jump:
            console.log("jumping");
            break;
    }
}
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}
console.log("Premi w/a/s/d per muoverti, spacebar per saltare, CTRL per abassarti. Premi q per uscire.");
process.stdin.on('keypress', function (str, key) {
    switch (key.name) {
        case 'w':
            move(Direction.Up);
            break;
        case 'a':
            move(Direction.Left);
            break;
        case 's':
            move(Direction.Down);
            break;
        case 'd':
            move(Direction.Right);
            break;
        case 'space':
            move(Direction.Jump);
            break;
        case 'q':
            process.exit();
    }
});
