
var monkey , monkey_running,spriteImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,mango,mangoImage;
var sprite,monkey_collided;
var score,ground,groundImage;

function preload(){
  
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  spriteImage = loadImage("sprite_0.png");

  collided_monkey = 
  loadImage("money.png");
  mangoImage = loadImage("mango_PNG9184.png");
  
}

function setup() {
  createCanvas(600,600);

  var survivalTime=0;
  
  monkey = createSprite(50,165,20,50);
  monkey.addAnimation("money",monkey_running);
  monkey.scale = 0.09;
 
 
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  MangoGroup = new Group();
  score = 0;
}
function draw() {
  
  background("teal");
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("j")){
  monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 
  
  spawnObstacles();
  spawnFood();
  spawnMango();
  if(FoodGroup.isTouching(monkey)){
  FoodGroup[0].remove();
  score = score+3;
  }
   if(MangoGroup.isTouching(monkey)){
   MangoGroup[0].remove();
   score = score+2;
  }
  
 
  
  obstacleMonkey();
  drawSprites();
}
 
 function spawnObstacles(){
 if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
     obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
   
                
  }
}

function spawnFood(){
 if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function obstacleMonkey(){
if(obstacleGroup.isTouching(monkey)){
  ground.velocityX = 0;
  monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach (0);
  obstacleGroup.setLifetimeEach  (-1);
  FoodGroup.setLifetimeEach (-1);
  monkey.addImage(monkey_collided);
}
}
function spawnMango(){
if (frameCount % 60 === 0) {
    mango = createSprite(600,250,40,10);
    mango.y = random(120,200);    
    mango.velocityX = -5;
    
     //assign lifetime to the variable
    mango.lifetime = 300;
    mango.depth = mango.depth + 1;
    
    //add image of banana
     mango.addImage(mangoImage);
     mango.scale=0.05;
    
    //add each banana to the group
      MangoGroup.add(mango);
  
}
}