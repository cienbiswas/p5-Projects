let rgb;
let snake;
let scl;
let food;
let movingSpeed;
let difficulty;
let difficultySpeed;
let accelerationInterval;
let easyB;
let mediumB;
let hardB;
let highScore;
let waitingForKey;
let gameRunning;

function setup(){
    createCanvas(600, 600);
    rgb = 51;
    scl = 20;
    setDifficulty(2);
    highScore = [0, 0, 0, 0];
    waitingForKey = false;

    initialization(3, 5);
}

function initialization(difficultySpeedVar, accelerationIntervalVar){
    movingSpeed = 7;
    frameRate(movingSpeed);
    difficultySpeed = difficultySpeedVar;
    accelerationInterval = accelerationIntervalVar;
    gameRunning = true;
    snake = new Snake();
    food = new Food();
}

function draw(){
    background(rgb);
    if(snake.eat(food.pos)){
        food = new Food();
    }
    food.show();

    snake.death();
    snake.update();
    snake.show();
}

function keyPressed(){
    if(keyCode === 37)      //LEFT_ARROW
        snake.dir(-1, 0);
    else if(keyCode === 38) //UP_ARROW
        snake.dir(0, -1);
    else if(keyCode === 39) //RIGHT_ARROW
        snake.dir(1, 0);
    else if(keyCode === 40) //DOWN_ARROW
        snake.dir(0, 1);


    /** New Game starts */
    else if(keyCode === 70 && waitingForKey == true){  //Press F
        //resetting the var
        waitingForKey = false;

        //toggle visibility
        document.getElementById("deathScreen").style.display = "none";
        document.getElementById("deathScreenScore").style.display = "none";
        document.getElementById("deathScreenHighScore").style.display = "none";
        document.getElementById("continue").style.display = "none";
        

        //initialize
        initialization(difficultySpeed, accelerationInterval);
        loop();
    }

    /**Pause the Game */
    else if(keyCode === 32){ //Spacebar
        if(gameRunning == true){
            noLoop();
            gameRunning = false;
            document.getElementById("pause").style.display = "block";
        }
        else{
            loop();
            gameRunning = true;
            document.getElementById("pause").style.display = "none";
        }
    }
}

function setDifficulty(g){
    difficulty = g;
    if(g == 1){
        //difficulty = 33%
        difficultySpeed = 1;
        accelerationInterval = 3;
        setColours(g);
    }
    else if(g == 2){
        //difficulty = 66%
        difficultySpeed = 3;
        accelerationInterval = 5;
        setColours(g);
    }
    else if(g == 3){
        //difficulty = 100%
        difficultySpeed = 5;
        accelerationInterval = 5;
        setColours(g);
    }
    else if(g == 4){
        //difficulty = 125%
        difficultySpeed = 5;
        accelerationInterval = 4;
        setColours(g);
    }
    initialization(difficultySpeed, accelerationInterval);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function setColours(g){
    if(g == 1){
        document.getElementById("easyB").style.backgroundColor = "#00FF00";
        document.getElementById("mediumB").style.backgroundColor = "#e1e1e1";
        document.getElementById("hardB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.color = "#000000";
    }
    else if(g == 2){
        document.getElementById("easyB").style.backgroundColor = "#e1e1e1";
        document.getElementById("mediumB").style.backgroundColor = "#FFFF00";
        document.getElementById("hardB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.color = "#000000";
    }
    else if(g == 3){
        document.getElementById("easyB").style.backgroundColor = "#e1e1e1";
        document.getElementById("mediumB").style.backgroundColor = "#e1e1e1";
        document.getElementById("hardB").style.backgroundColor = "#FF0000";
        document.getElementById("extremeB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.color = "#000000";
    }
    else if(g == 4){
        document.getElementById("easyB").style.backgroundColor = "#e1e1e1";
        document.getElementById("mediumB").style.backgroundColor = "#e1e1e1";
        document.getElementById("hardB").style.backgroundColor = "#e1e1e1";
        document.getElementById("extremeB").style.backgroundColor = "#000000";
        document.getElementById("extremeB").style.color = "#FFFFFF";
    }
}

function developer(){
    snake.eat(snake.pos);
}