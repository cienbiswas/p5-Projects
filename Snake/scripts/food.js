function Food(){
    let cols = floor(width/scl);
    let rows = floor(height/scl);
    this.pos = createVector(floor(random(cols)), floor(random(rows)));
    //creating a new vector if the food spawns on the snake
        for(let i = 0; i < snake.tail.length; i++){
            if(this.pos == snake.tail[i].pos){
                this.pos = createVector(floor(random(cols)), floor(random(rows)));
            }
        }
    
    this.pos.mult(scl);

    this.show = function() {
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y, scl, scl);
    }
}