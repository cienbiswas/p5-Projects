let creatures;
let obstacles;
let target;
let popsize;
let obRadius;
let crRadius;
let tick;
let time;
let testCreature;
let creaturePool;
let currentGeneration;
let targetRadius;
let overallNumberOfFinishedCreatures;
let numberOfFinishedCreatures;
let mainWidth;
let mainHeight;
let generationCount;

function setup(){

  /**    Window SetUp   */
    createCanvas(windowWidth, windowHeight);
    mainWidth = 900;
    mainHeight = 740;

    frameRate(500);

    time = 120; //  15 == 1sek
    tick = time;
  
  /**   Initialization   */

    /* Generations/Population  */
      popsize = 100;
      generationCount = 1;

    /*  Creatures   */
      creatures = [];
      for(let i = 0; i < popsize; i++){
        creatures[i] = new Creature();
      }
      crRadius = 8;
      currentGeneration = [];
    
    /* Obstacles and Target */
      obstacles = [];
      obstacles[0] = new Obstacle(mainWidth/2, mainHeight/2);
      obRadius = 50;
  
      target = new Target();
      targetRadius = 25;

    /* Other  */
      overallNumberOfFinishedCreatures = 0;
      numberOfFinishedCreatures = 0;

  /*    Test creature
  let test = 0.01;
  console.log(map(test, 1/mainWidth, 0.01, 0, 1));
  console.log(map(1/(dist(0, mainHeight/2, target.pos.x, target.pos.y)),1/830, 1, 0, 1));
  console.log(map(1/(dist(400, mainHeight/2, target.pos.x, target.pos.y)),1/830, 1, 0, 1));
  testCreature = new Creature();
  */
}

function draw(){

  /**  General fixed things  */
    background(200);
    line(mainWidth, 0, mainWidth, mainHeight);
    tick -= 0.25;

  /**     Display            */
    /*  Creatures     */
      for(let i = 0; i < creatures.length; i++){

        creatures[i].display(255);
        creatures[i].update();
        creatures[i].calcFitness();

        if(isFinished(creatures[i]))
          creatures.splice(i, 1);
      }

    /*  Obstacles     */
      for(let i = 0; i < obstacles.length; i++){
        obstacles[i].displayOb();
      }

    /*  Target        */
      target.displayTa();



  /**   Check if collision      */
    for(let i = 0; i < obstacles.length; i++){
      for(let k = 0; k < creatures.length; k++){
        if(collision(creatures[k], obstacles[i])){
          currentGeneration[currentGeneration.length] = creatures[k];
          creatures.splice(k, 1);
        }
      }
    }

  /**   Next generation         */
    if(nextGeneration()){
      for(let i = 0; i < creatures.length; i++){
        currentGeneration[currentGeneration.length] = creatures[i];
      }
      tick = time;
      generationCount++;
      numberOfFinishedCreatures = 0;
      makeNewGeneration();

      console.log("Creatures: ", creatures);
      console.log("Current gen: ", currentGeneration);

      currentGeneration = [];
    }

  /**   Displaying the text      */
    textFont("Helvetica Neue");
    textSize(40);
    fill(0);
    text("Overall finishers: " + overallNumberOfFinishedCreatures, 950, 150);
    text("Overall population: " + popsize*generationCount, 950, 200);
    text("Success rate: " + (Math.floor((overallNumberOfFinishedCreatures/(popsize*generationCount)) * 100000)) / 1000  + "%", 950, 250);
    text(generationCount + ". generation", 950, 375);
    text("- finishers: " + numberOfFinishedCreatures, 980, 450);
    text("- population: " + popsize, 980, 500);
    text("Next generation in " + floor(tick), 950, 650)

  /**    Test creature
    let wind = createVector(random(-0.002, 0.002), random(-0.002, 0.002));
    testCreature.addDNA(wind);
    testCreature.mutate();
    testCreature.applyForce(wind);
    testCreature.calcFitness();


    testCreature.display(0);
    testCreature.update()
    console.log(testCreature.fitness);
  */
}

/**
 * @description Creates an obstacle at the mouses' coordinates
 */
function mouseClicked(){
  if(mouseX <= mainWidth)
    obstacles.push(new Obstacle(mouseX, mouseY));
}

/**
 * @description Checks if the given creature collided with the given obstacle OR the border of the screen
 * @param {*} creature 
 * @param {*} obstacle
 * @returns boolean value
 */
function collision(creature, obstacle){
  let distance = crRadius + obRadius;
  if(dist(creature.pos.x, creature.pos.y, obstacle.pos.x, obstacle.pos.y) <= distance){
    //remove the creatures
    //de-display it
    //it collided with an obstacle, so it died
    return true;
  }
  else if (creature.pos.x <= 0 || creature.pos.x >= mainWidth){   //If it hits the border
    return true;
  }
  else if (creature.pos.y <= 0 || creature.pos.y >= mainHeight){  //If it hits the border
    return true;
  }
  else
    return false;
}

/**
 * @description Checks if the countdown has reached 0 OR if all the creatures died, thus if it has to create a new generation
 * @returns boolean value
 */
function nextGeneration(){
  if(tick == 0 || creatures.length == 0){
    return true;
  }
  else
    return false;
}

/**
 * @description Looks for the creature with the best fitness
 * @returns (number) fitness
 */
function bestFitness(){
  for(let i = 0; i < creatures.length; i++){
    let bf = 0;
    if(creatures[i].fitness > bf){
      bf = creatures[i].fitness;
    }
  }
  return bf;
}

/**
 * @description Creates a new creature generation and adds the creatures' duplicate x times according to their fitness * 100
 * @example creature1.fitness == 0.03 --> 3 duplicates of the creature are added
 * @example creature2.fitness == 0.92 --> 92 duplicates of the creature are added
 */
function PoolOfCreatures(){
  creaturePool = [];
  for(let i = 0; i < currentGeneration.length; i++){
    let n = floor(currentGeneration[i].fitness * 100);  //fitness is between 0 and 1 --> *100
    for(let j = 0; j < n; j++){   //n represents the number of times the creature will get added
      creaturePool[creaturePool.length] = currentGeneration[i];
    }
  }
  console.log("Creature Pool: ", creaturePool);
}

/**
 * @description Picks two different creatures from creaturePool in PoolOfCreatures() and merges their DNA
 * @returns the child (creature) with the mixed DNA of the parents
 */
function selection(){
  let parentA = creaturePool[0];
  let parentB = creaturePool[0];
  let child;

  if(parentA.DNA.length < parentB.DNA.length)
    child = parentA.crossover(parentB);
  else
    child = parentB.crossover(parentA);

  return child;
}

/**
 * @description Creates a new generation by using the method selection()
 */
function createGeneration(){
  creatures = [];
  for(let i = 0; i < popsize; i++){
    let newCreature = selection();
    creatures[i] = newCreature;
  }
}

/**
 * @description Creates a new gen in creatures and then sets currentGeneration to creatures
 */
function makeNewGeneration(){
  PoolOfCreatures();          //Creates HUGE pool of creatures, creaturePool --> PoolOfCreatures()
  createGeneration();         //Creates a new gen by randomly picking two parents from the creaturePool and then merging their DNA to a child creature --> selection()
  //Sets currentGeneration equal to creatures
  //  currentGeneration = [];
  //  for(let i = 0; i < creatures.length; i++){
  //    currentGeneration[i] = creatures[i];
  //  }
}

/**
 * @description Checks if the given creature has reached the target
 * @param {*} creature 
 * @returns boolean value
 */
function isFinished(creature){
  if(dist(creature.pos.x, creature.pos.y, target.pos.x, target.pos.y) <= targetRadius){
    overallNumberOfFinishedCreatures++;
    numberOfFinishedCreatures++;
    return true;
  }else
    return false;
}

function occurences(){
  let arr = [];
  let pointer = 0;
  for(let i = 0; i < creaturePool.length/1.1; i = pointer){
    let result = 0;
    for(let k = pointer; k < creaturePool.length; k++){
      if(!(creaturePool[i] == creaturePool[k])){
        arr[arr.length] = new Array(creaturePool[i].fitness, result);
        pointer = k;
        break;
      }
      result++;
    }
  }
  return arr;
}