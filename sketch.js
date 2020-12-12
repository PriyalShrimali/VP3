var dog,happyDog,database,foodS,foodStock;
var Dog1, DogHappy;
var gameState;
var foodType = null;
var happiness = 0;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload()
{
  Dog1 = loadImage("images/dogImg.png");
  DogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Milk();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(Dog1);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  readState = database.ref("gameState");
  readState.on("value", function(data){
    gameState = data.val();
  });

  background(46, 139, 87);
  foodObj.display();
   
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed >=12){
    text("Last Fed: "+lastFed%12 + " PM", 350 ,30);
  }
  else if(lastFed === 0){
    text("Last Fed: 12 AM", 350 ,30);
  }
  else{
    text("Last Fed: "+lastFed%12 + " AM", 350 ,30);
  }

  if(gameState !== "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(Dog1);
  }

  currentTime = hour();

  if(currentTime === (lastFed+1)){
    update("playing");
    foodObj.garden();
  }else if(currentTime === lastFed+2){
    update("sleeping");
    foodObj.bedroom();
  }else if(currentTime === lastFed+2 && currentTime <= (lastFed+4)){
    update("bathing");
    foodObj.washroom();
  }else{
    update("hungry");
    foodObj.display();
  }


  drawSprites();
}

function feedDog(){
  dog.addImage(DogHappy);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food : foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x = 0; 
  }
  else{
    x -=1;
  }
  database.ref('/').update({
    food:x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}

function keyPressed(){
  if(keyCode === 32 && foodS == 0){
    database.ref('/').update({
      food: 20
    })
  }
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}