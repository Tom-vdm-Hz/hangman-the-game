class Game {

    /**
     * @internal Holds the canvas HTML element where this game should draw on. 
     * This variable knows the screen's size.
     * 
     * @see [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     */
    private readonly canvas: HTMLCanvasElement;


    /**
     * @internal attribute that holds the RenderContext to draw on. This will
     * be used in the `draw()` method.
     * 
     * @see [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
     */
    private readonly ctx: CanvasRenderingContext2D;

    // The game screen components
    private title: TextString;
    private word: TextString;
    private toGuessWord: string[] = [];
    private mistakes: number = 0
    private pressedKeys: string[] = []

    // The hangman parts
    private base: Rectangle;
    private verticalPole: Rectangle;
    private horizontalPole: Rectangle;
    private verticalString: Line;
    private head: Ellipse;
    private body: Line
    private leftArm: Line;
    private rightArm: Line;
    private leftLeg: Line;
    private rightLeg: Line;


    private words: string[] = [
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
    ]

    /**
     * Construct a new Game.
     * 
     * @param {HTMLCanvasElement} canvasId 
     */
    public constructor(canvasId: HTMLCanvasElement, toGuessWord?: string[]) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        // Initialize the game items
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        this.title = new TextString(cx, 70, "Hangman, the game");
        if (toGuessWord != null) {
            this.toGuessWord = toGuessWord
        } else {
            this.toGuessWord = this.words[Math.floor(Math.random() * this.words.length)].split('')
        }
        console.log(this.toGuessWord)
        let correctGuess: string[] = []
        this.toGuessWord.forEach((char) => {
            correctGuess.push('-')
        })
        this.word = new TextString(cx, 150, correctGuess.join(''));


        // The base of the hangman
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

        // Draw the canvas
        this.drawCanvas();

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }


    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        // Draw the hangman
        this.drawHangMan()
    }



    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        this.checkWinOrLoss();
        let key: string = ev.key;
        if (!(this.pressedKeys.includes(key))) {
            let indexes: number[] = [];
            for (let i = 0; i < this.toGuessWord.length; i++) {
                if (this.toGuessWord[i] === key) {
                    indexes.push(i)
                }
            }
            if (indexes.length === 0) {
                this.mistakes++
            } else {
                let wordToArray: string[] = this.word.text.split('')
                indexes.forEach((index) => {
                    wordToArray[index] = key;
                })
                this.word.text = wordToArray.join('')
            }
            this.pressedKeys.push(key);
        } else {
            alert("key already pressed");
        }
        this.drawCanvas()
    }

    private checkWinOrLoss() {
        if (this.mistakes === 9) {
            this.gameOver()
        }
        if (!(this.word.text.split('').includes('-'))) {
            this.gameWon()
        }

    }

    private gameOver() {
        alert("You LOST, resetting game with new word")
        location.reload()
    }

    private gameWon() {
        alert("You WON, resetting game with new word")
        location.reload()
    }



    private drawHangMan() {
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
                this.head.drawCircle(this.ctx)
                break;
            case 5:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx)
                this.body.drawLine(this.ctx);
                break;
            case 6:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx)
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                break;
            case 7:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx)
                this.body.drawLine(this.ctx);
                this.leftArm.drawLine(this.ctx);
                this.rightArm.drawLine(this.ctx);
                break;
            case 8:
                this.base.drawRectangle(this.ctx);
                this.verticalPole.drawRectangle(this.ctx);
                this.horizontalPole.drawRectangle(this.ctx);
                this.verticalString.drawLine(this.ctx);
                this.head.drawCircle(this.ctx)
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
                this.head.drawCircle(this.ctx)
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

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});
