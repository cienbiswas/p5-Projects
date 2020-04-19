class Obstacle{
    constructor(x, y){
      this.pos = createVector(x, y);
    }
    displayOb(){
      stroke(0);
      strokeWeight(5);
      fill(255);
      ellipse(this.pos.x, this.pos.y, obRadius*2, obRadius*2);
    }
  }
  
  class Target{
    constructor(){
      this.pos = createVector(mainWidth-70, mainHeight/2);
    }
  
    displayTa(){
      fill(0, 255, 0);
      strokeWeight(3);
      stroke(0);
      ellipse(this.pos.x, this.pos.y, targetRadius*2, targetRadius*2);
    }
  }