//Create variables here
var dog,   dogHappy, database, foodS, foodStock,dogImg;
var feed,addFood,foodObject;
var lastFed;




function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  

}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();
  foodObject = new Food();
  dog = createSprite(800,200,20,20);
  dog.addImage("dog",dogImg);

  dog.scale = 0.5;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}


function draw() {  
background(46, 139, 87);

foodObject.display();

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed = data.val();
  
})
fill("white");
textSize(15);
if(lastFed>=12){
  text("Last feed  :  " + lastFed%12+"pm",350,30);
}
else if(lastFed === 0){
  text("Last feed  : 12am ", 350,30);
} else{
  text("Last feed  :  " + lastFed+"am",350,30)
}

  drawSprites();


  //add styles here

}





function writeStock(num){


if (num<0){
  num = 0;


}

else{
  num = num - 1;
}
database.ref("/").update({
  Food  : num
})

}


function readStock(data){
foodS = data.val();

foodObject.updatefoodStock(foodS);
}
function feedDog(){
  dog.addImage("happy",dogHappy);
  dog.changeImage("happy");

  
  foodObject.updatefoodStock(foodObject.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  });
  
}


function addFoods(){
  foodS ++;
  database.ref("/").update({
    Food:foods
  })
}