import * as readline from 'readline';

enum Direction {
    Up,
    Down,
    Left,
    Right,
    Jump,
}

function move(dir: Direction): void {
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

console.log("Premi w/a/s/d per muoverti, spacebar per saltares. Premi q per uscire.");

process.stdin.on('keypress', (str: string, key: { name: string, ctrl: boolean, meta: boolean, shift: boolean, sequence: string }) => {

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