// Javascript game variables
let board;
let context;
let blockSize = 20;
let cols = 30;
let rows = 20;

// game audio
let appleAudio;
let gameOverAudio;

//snake dimensions
let snakeX = 0;
let snakeY = 0;
let tail = [];

//food variables
let foodX = 0;
let foodY = 0;


//initialize score
let score = 0;

//velocity
let velocityX = 1;
let velocityY = 0;

let gameOver = false; 

window.onload = () => {
    board = getElementById('board');
    context = board.getContextt('2d');

    appleAudio = newAudio('apple_sound.mp3');
    gameOverAudio = newAudio('game_over_sound.mp3');

    board.width = cols * blockSize;
    board.height = rows * blockSize;

    document.addEventListener('keyup', changeDirection);

    board.addEventListener('click', () => {
        gameOverAudio = false;
        score =  0;

    })

    foodPlace();

    setInterval(update, 1000/10);
}

function update() {
    //clear screen
    createRect(0,0, board.width, board.height);

    if (gameOver) {

        //game end screen
        createText('Game Over',board.width /2, board.height /2 -25, 'center', 50 );
        
        createText(`Score: ${score}`, board.width / 2, board.height  / 2 + 25, 'center');

        createText('Click to Start Again', (cols * blockSize / 2, board.height -50, 'center'));

        return;
    }

    //display score
    createText(`Score: ${score}`, 30, 40);

    //create first food
    createRect(foodX, foodY, blockSize, 'lime');
  
    //Did snake eat food
    if (snakeX == foodX && snakeY == foodY) {
        tail.push([foodX, foodY]);

        score += 10;

        appleAudio.play();

        foodPlace();
    }


    //snake tail
    for (let i = tail.length; i > 0; i--) {
        tail[i] = tail[i - 1];
    }

    if (tail.length) {
        tail[0] = [snakeX, snakeY];
    }

    //snake position
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    createRect(snakeX, snakeY, blockSize, 'orange');

    for(let i = 0; i < tail.length; i++) {
        createRect(tail[i][0], tail[i][1], blockSize, blockSize, 'lime');
    }

    //if snake hits wall
    if (snakeX < 0 || snakeX >  cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOverEvent();
    }

    //snake eats itself
    for (let i = 0; i < tail.length; i++) {
        if( snakeX == tail[i][0] && snakeY == tail[i][1]) {
            gameOverEvent();
        }
    }



}

function foodPlace() {}

function changeDirection() {}

function gameOverEvent() {}

function createRect() {

}

function createText() {}