let objects;
let size;
let objWidth;
let space;
let colour;
let runningVariable;

function setup() {
  createCanvas(1530, 745);
  background(220);

  /**     Initialization     */
    runningVariable = 0;
    objWidth = width/75;
    //space in between the rectangles
    space = objWidth / 2;
    //how many rectangles (the size of the array)
    size = width / (objWidth * 1.5);


    objects = [];
    //set height to random values
    for(let i = 0; i < size; i++){
      let objHeight = random(height);
      objects[i] = objHeight;
    }
    //set color to a random value
    colour = random(360);
}

function draw() {

  /**   Sorting Algorithm   */
  bubbleSort();

  runningVariable++;
}

function isSorted(arr){
  for(let i = 0; i < arr.length-1; i++){
    if(arr[i] > arr[i+1])
      return false;
  }
  console.log("successfully sorted!")
  return true;
}

function bubbleSort(){
  for(let i = 0; i < objects.length-1-runningVariable; i++){
    
    background(0, 0, 86);

    /**   Check if right neighbour is bigger
     *    yes -> switch the places
     *    no  -> nothing happens
     */
      if(objects[i] > objects[i+1]){
      let zwischenAblage = objects[i+1];
      objects[i+1] = objects[i];
      objects[i] = zwischenAblage;

      if(isSorted(objects))
        noLoop();
  }

    /**   Draw     */
      for(let r = 0; r < objects.length; r++){
        colorMode(HSL, 360, 100, 100);
        fill(colour, 100, objects[r] / 10);
        rect(objWidth * r + space, height - objects[r], objWidth, objects[r])
        space += objWidth/2;
      }
      space = objWidth / 2;
  }
}