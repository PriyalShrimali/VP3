class Milk{
    constructor(){
        this.lastFed;
        this.foodStock = foodStock;
        this.image = loadImage("images/Milk.png");
        this.bedroomImg = loadImage("/images/Bed Room.png");
        this.gardenImg= loadImage("/images/Garden.png");
        this.washroomImg = loadImage("/images/Wash Room.png")
    
    }

    getFoodStock(){
        return(this.foodStock);
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    dedeuctFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    bedroom(){
        imageMode(CENTER);
        image(this.bedroomImg, 500, 200, 1000, 400);
    }

    garden(){
        imageMode(CENTER);
        image(this.gardenImg, 500, 200, 1000, 400);
    }

    washroom(){
        imageMode(CENTER);
        image(this.washroomImg, 500, 200, 1000, 400);
    }

display(){

var x = 80, y = 100;

imageMode(CENTER);
image(this.image,720,220,70,70);

if(this.foodStock!==0){
    for (var i=0;i<this.foodStock;i++){
            if(i%10===0){
                x = 80;
                y = y+50;
            }
            image(this.image,x,y,50,50);
            x=x+30;
            }
        }
    }
}