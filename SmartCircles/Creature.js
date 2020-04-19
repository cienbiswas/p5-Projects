class Creature{
    constructor(DNAarr){
      if(DNAarr)
        this.DNA = DNAarr;
      else
        this.DNA = [];
      this.pos = createVector(0, mainHeight/2);
      this.vel = createVector(random(2), random(-2, 2));
      this.acc = createVector(0, 0);
      this.fitness = 0;
    }
  
    display(rgb){
      push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        stroke(0);
        strokeWeight(1);
        fill(rgb);
        beginShape();
        vertex(0, 0);
        vertex(-5, -5);
        vertex(10, 0);
        vertex(-5, 5);
        endShape(CLOSE);
      pop();
    }
  
    update(){
      this.pos.add(this.vel);
      this.vel.add(this.acc);
    }
  
    applyForce(force){
      this.acc.add(force);
    }
  
    addDNA(vector){
      this.DNA[this.DNA.length] = vector;
    }
  
    calcFitness(){
      let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
      let fit = map(d, 33, mainWidth, 1, 0);   //parameters explained: 1. variable d should get mapped, 2. lowest dist possible = 1, 3. highest dist possible = mainWidth,
                                        //4. if(low dist) --> high fitness, 5. if(high dist) --> low fitness
      this.fitness = fit * (100 / d);
    }
  
    mutate(){
      let r = random(1);
      //mutation rate 4%
      if(r < 0.04){
        let a = floor(random(this.DNA.length-1));
        this.DNA[a] = createVector(random(-0.002, 0.002), random(-0.002, 0.002));
      }
    }
  
    crossover(partner){
      let newDNA = [];
      let midPoint = floor(random(this.DNA.length));
      for(let i = 0; i < this.DNA.length; i++){
        if(i < midPoint)
          newDNA[i] = this.DNA[i];
        else
          newDNA[i] = partner.DNA[i];
      }
      return new Creature(newDNA);
    }
  }