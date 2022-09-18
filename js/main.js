/**
 * @author Danilo Ramírez Mattey
 * @year 2022
 */


const config = {
    maxNumberOfBalls: 100
}
const balls = [];

/**
 * The ball class
 */
class Ball {

    /**
     * The top and left values
     * @type {number}
     */
    top = 0;
    left = 0;


    /**
     * The color of the ball
     * @type {string}
     */
    color = '';

    /**
     * The name prefix
     * @type {string}
     */
    ballPrefix = 'dancing_ball_';


    /**
     * The shake intensity we want to apply
     * @type {number}
     */
    shakeIntensity = 2000;


    /**
     * The class of the ball
     * @type {string}
     */
    ballClass = 'dancing_ball';

    /**
     * The name of the ball
     * @type {string}
     */
    name = '';

    /**
     * How much time between each tic
     * @type {number}
     */
    ticTime = 250;


    /**
     * The interval object
     * @type {null}
     */
    intervalObject = null;

    /**
     * Constructor
     */
    constructor() {
        this.setTopAndLeft( this.getRandomPosition(), this.getRandomPosition() );
        /**
         * Getting a random number for this ball
         * @type {string}
         */
        this.name = this.ballPrefix + this.getRandomNumber(100000, 999999);
        this.color = this.getRandomColor();
        this.ticTime = this.getRandomNumber(200, 500);
        this.shakeIntensity = this.getRandomNumber(1500,3500);
        this.setUpTic();
    }


    /**
     * This will execute everytime unless we clear the interval
     */
    setUpTic() {
        this.intervalObject = setInterval(() => {
            this.shakeBall();
        }, this.ticTime);
    }

    shakeBall() {

        let newTop = this.getRandomNumber(0, this.shakeIntensity);
        let newLeft = this.getRandomNumber(0, this.shakeIntensity);

        const topMod = this.getRandomNumber(0,2);
        const leftMod = this.getRandomNumber(0,2);

        if(topMod === 0) newTop= newTop *-1;
        if(leftMod === 0) newLeft = newLeft *-1;

        // console.log(newTop, newLeft, topMod, leftMod);

        this.setTopAndLeft( this.top + (newTop / 1000), this.left + (newLeft / 1000) );

        // console.log(this.top, this.left, this.name);
        this.updateBallPosition();
    }


    setTopAndLeft(top,left){
        if(top < 0) top = 0;
        if(top > 100) top = 100;
        if(left < 0) left = 0;
        if(left > 100) left = 100;

        this.top = top;
        this.left = left;
    }

    /**
     * This will update ball position
     */
    updateBallPosition() {
        $('#' + this.name).css('top', this.top.toString() + '%');
        $('#' + this.name).css('left', this.left.toString() + '%');
    }


    /**
     * Get random position
     */
    getRandomPosition() {
        return this.getRandomNumber(0, 100);
    }


    /**
     * Gets a random number
     * @param initial
     * @param end
     * @returns {number}
     */
    getRandomNumber(initial, end) {
        return Math.floor(Math.random() * (initial + end));
    }


    /**
     * This will print the ball
     * @param spaceIdentifier
     */
    printBallInSpace(spaceIdentifier) {

        const ballHtml = `
        <div class="${this.ballClass}" id="${this.name}" style="top: ${this.top}%; left: ${this.left}%; background-color: #${this.color};"></div>
        `;
        $(spaceIdentifier).append(ballHtml);
    }

    /**
     * Gets a random color
     */
    getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }

    /**
     * Organizing the ball
     * @param index
     */
    organizeMe(index, total){

        const line =  Math.ceil(Math.sqrt(total));

        const row = Math.floor(index / line);
        const column = index % line;

        const nextTop = (100 / line) * row;
        const nextLeft = (100 / line) * column ;

        /*const aux = {
            index: index,
            total: total,
            line: line,
            row: row,
            column: column,
            top: nextTop,
            left: nextLeft
        }*/

        // console.table(aux);

        clearInterval(this.intervalObject);
        this.top = nextTop;
        this.left = nextLeft;
        this.updateBallPosition();
    }

}


/**
 * Short for console log
 */
function l(t) {
    if (typeof t === 'string') {
        console.log('[L] ' + t);
    } else {
        console.log(t);
    }
}


/**
 * Window ready
 */
$(window).ready(() => {
    l('Window ready');

    for (let i = 0; i < config.maxNumberOfBalls; i++) {
        const aux = new Ball();
        aux.printBallInSpace('#ballsSpace');
        balls.push(aux);
    }

    $('#organize_button').click( ()=>{
        for (let i = 0; i < config.maxNumberOfBalls; i++) {
            balls[i].organizeMe(i, config.maxNumberOfBalls);
        }
    });

});
