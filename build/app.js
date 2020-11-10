class Ellipse {
    constructor(x, y, radiusX, radiusY) {
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.clockwise = false;
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radiusX, this.startAngle, this.endAngle);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvasId, toGuessWord) {
        this.toGuessWord = [];
        this.mistakes = 0;
        this.pressedKeys = [];
        this.words = [
            "sweet",
            "blind",
            "flippant",
            "star",
            "strap",
            "position",
            "beam",
            "earthquake",
            "potato",
            "education",
            "object",
            "summer",
            "preserve",
            "obnoxious",
            "slim",
            "cloth",
            "mountain",
            "quickest",
            "surprise",
            "cautious",
            "picayune",
            "produce",
            "cloudy",
            "wren",
            "powerful",
            "profit",
            "ready",
            "bulb",
            "berry",
            "loud"
        ];
        this.keyPress = (ev) => {
            this.checkWinOrLoss();
            let key = ev.key;
            if (!(this.pressedKeys.includes(key))) {
                let indexes = [];
                for (let i = 0; i < this.toGuessWord.length; i++) {
                    if (this.toGuessWord[i] === key) {
                        indexes.push(i);
                    }
                }
                if (indexes.length === 0) {
                    this.mistakes++;
                }
                else {
                    let wordToArray = this.word.text.split('');
                    indexes.forEach((index) => {
                        wordToArray[index] = key;
                    });
                    this.word.text = wordToArray.join('');
                }
                this.pressedKeys.push(key);
            }
            else {
                alert("key already pressed");
            }
            this.drawCanvas();
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.title = new TextString(cx, 70, "Hangman, the game");
        if (toGuessWord != null) {
            this.toGuessWord = toGuessWord;
        }
        else {
            this.toGuessWord = this.words[Math.floor(Math.random() * this.words.length)].split('');
        }
        console.log(this.toGuessWord);
        let correctGuess = [];
        this.toGuessWord.forEach((char) => {
            correctGuess.push('-');
        });
        this.word = new TextString(cx, 150, correctGuess.join(''));
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        this.verticalPole = new Rectangle(cx - 250, cy - (cy / 2), 40, 610);
        this.verticalPole.fillStyle = "brown";
        this.horizontalPole = new Rectangle(cx - 275, cy - (cy / 2), 400, 30);
        this.horizontalPole.fillStyle = "brown";
        this.verticalString = new Line(cx, (cy - (cy / 2)) + 30, cx, cy - 100);
        this.head = new Ellipse(cx, cy - 100, 30);
        this.body = new Line(cx, cy - 70, cx, cy + 70);
        this.leftArm = new Line(cx, cy - 55, cx - 20, cy);
        this.rightArm = new Line(cx, cy - 55, cx + 20, cy);
        this.leftLeg = new Line(cx, cy + 70, cx - 20, cy + 150);
        this.rightLeg = new Line(cx, cy + 70, cx + 20, cy + 150);
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.drawHangMan();
    }
    checkWinOrLoss() {
        if (this.mistakes === 9) {
            this.gameOver();
        }
        if (!(this.word.text.split('').includes('-'))) {
            this.gameWon();
        }
    }
    gameOver() {
        alert("You LOST, resetting game with new word");
        location.reload();
    }
    gameWon() {
        alert("You WON, resetting game with new word");
        location.reload();
    }
    drawHangMan() {
        switch (this.mistakes) {
            case 1:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                break;
            case 2:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                break;
            case 3:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                break;
            case 4:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                break;
            case 5:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                this.body.drawLine(this.ctx);
                break;
            case 6:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                break;
            case 7:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                this.rightArm.drawLine(this.ctx);
                break;
            case 8:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                this.rightArm.drawLine(this.ctx);
                this.leftLeg.drawLine(this.ctx);
                break;
            case 9:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx);
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                this.rightArm.drawLine(this.ctx);
                this.leftLeg.drawLine(this.ctx);
                this.rightLeg.drawLine(this.ctx);
                break;
            default:
                this.base.drawRectangle(this.ctx);
                break;
        }
    }
}
let game = null;
window.addEventListener('load', function () {
    game = new Game(document.getElementById('canvas'));
});
class Line {
    constructor(x1, y1, x2, y2) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    drawLine(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class TextString {
    constructor(x, y, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.textBaseline = "alphabetic";
        this.x = x;
        this.y = y;
        this.text = text;
    }
    drawText(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map