var Player = function()
{
    this.image = document.createElement("img");
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.width = 159;
    this.height = 163;
    this.velX = 0;
    this.velY = 0;
    this.angVel = 0;
    this.rot = 0;
    this.image.src = "hero.png";
};

Player.prototype.update = function (deltaTime) {
    this.rot += deltaTime;
};

Player.prototype.draw = function() {
    context.save();
    
    context.translate(this.x,this.y);
    context.rotate(this.rot);
    context.drawImage(this.image, - this.width/2, -this.height/2);
    
    context.restore();    
}
