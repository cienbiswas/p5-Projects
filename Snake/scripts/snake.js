function Snake() {
    this.pos = createVector(1, 0);
    this.speed = createVector(1, 0);
    this.total = 0;
    this.tail = [];

    this.dir = function(x, y) {
        if(x != this.speed.x * -1 && y != this.speed.y * -1){
            this.speed.x = x;
            this.speed.y = y;
        }
    }

    this.death = function(){
        let deathScreen = document.getElementById("deathScreen");
        let deathScreenScore = document.getElementById("deathScreenScore");
        let deathScreenHighScore = document.getElementById("deathScreenHighScore");
        let highScoreMode = document.getElementById("highScoreMode");
        for(let i = 0; i < this.tail.length; i++){
            let d = dist(this.pos.x, this.pos.y, this.tail[i].x, this.tail[i].y);
            if(d < 1){
                waitingForKey = true;
                //set score to this.total
                    deathScreenScore.innerHTML = "Score: " + this.total;
                //toggle visibility
                    deathScreenScore.style.display = "block";
                    deathScreen.style.display = "block";
                    document.getElementById("continue").style.display = "block";
                //style
                    deathScreenScore.style.margin = "350px 0px";
                    deathScreenScore.style.padding = "0px 215px";
                //if high score, set highscore to score
                    if(highScore[difficulty-1] < this.total){   //the -1 because difficulty is between 1-4 and arr length between 0-3
                        //update highscore
                        highScore[difficulty-1] = this.total;
                        //set appropiate highscore to score
                            switch(difficulty){
                                case 1: document.getElementById("highScoreEasy").innerHTML = highScore[difficulty-1]; break;
                                case 2: document.getElementById("highScoreMedium").innerHTML = highScore[difficulty-1]; break;
                                case 3: document.getElementById("highScoreHard").innerHTML = highScore[difficulty-1]; break;
                                case 4: document.getElementById("highScoreExtreme").innerHTML = highScore[difficulty-1]; break;
                            }

                        //style
                        if(this.total < 10){
                            deathScreenScore.style.margin = "425px 0px";
                            deathScreenScore.style.padding = "0px 215px";
                        }
                        else{
                            deathScreenScore.style.margin = "425px 0px";
                            deathScreenScore.style.padding = "0px 200px";
                        }
                        //toggle visibility of death screen high score
                        deathScreenHighScore.style.display = "block";
                        deathScreenHighScore.innerHTML = "NEW High Score!";

                    }
                //initialize
                    this.total = 0;
                    this.tail = [];

                noLoop();
            }
        }
    }

    this.update = function() {
        //shifting the tail one back
            for (let i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
            if (this.total >= 1) {
                this.tail[this.total - 1] = createVector(this.pos.x, this.pos.y);
            }

        //updating the score
            let score = this.tail.length;
            document.getElementById("score").innerHTML = score;
            /** Digit margin fixes --> looks nicer*/
                    if(score < 10){
                        document.getElementById("score").style.margin = "230px 675px";
                    }
                    else if(score >= 10 && score < 100){
                        document.getElementById("score").style.margin = "230px 650px";
                    }
                    else{
                        document.getElementById("score").style.margin = "230px 625px";
                    }

        //moving the snake
            this.pos.x += this.speed.x * scl;
            this.pos.y += this.speed.y * scl;

            if(this.pos.x >= width)
                this.pos.x = 0;
            else if(this.pos.x < 0)
                this.pos.x = width;

            if(this.pos.y >= height)   
                this.pos.y = 0;
            else if(this.pos.y < 0)
                this.pos.y = height;

        //checking if developer mode is on
        if(document.getElementById("developerMode").checked == true){
            document.getElementById("developerB").style.display = "block";
        }
        else
            document.getElementById("developerB").style.display = "none";
    }

    this.show = function() {
        stroke(rgb);
        for(let i = 0; i < this.tail.length; i++){
            fill(0, 120+(i*10), 0);
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        fill(0, 255, 0);
        rect(this.pos.x, this.pos.y, scl, scl);
    }

    this.eat = function(fpos) {
        let d = dist(this.pos.x, this.pos.y, fpos.x, fpos.y);
        if(d < 5){
            this.total++;
            //making it faster
            if((this.tail.length+1) % accelerationInterval === 0){
                movingSpeed += difficultySpeed;
                frameRate(movingSpeed);
            }
            return true;
        }
        else
            return false;
    }
}