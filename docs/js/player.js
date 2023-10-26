class Player {  // the game "calls" the player
    constructor (gameScreen, left, top, width, height, color){
        this.gameScreen = gameScreen;  // because player "happens" inside the game screem
        this.left = left;             // horizontal positioning of the player (the more left, the less left you have...)
        this.top = top;                // vertical positioning of the player (the more top, the less top you have)
        this.width = width;
        this.height = height;
        this.directionX = -20;            // horizontal axis
        this.directionY = -5;            // vertical axis
        this.element = document.createElement("img");
        //this.imgSrc= "../images/peixe2.png"
        this.color = color;
        if(color === "blue"){
            this.element.src = "docs/images/peixe1.png";
        } else {
            this.element.src = "docs/images/peixe2.png";
        }
        this.element.style.position = "absolute"; // clear values for the movement
        // set some default values
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
        this.gameScreen.appendChild(this.element);
        this.speedFactor = 1;
    }
    move(level){
        // update player's car position based on direction

        switch (level) {
            case 5:
                this.speedFactor = 3;
                this.updatePosition();
                break;
            case 4:
                this.speedFactor = 2;
                this.updatePosition();
                break;
            case 3:
                this.speedFactor = 1;
                this.updatePosition();
                break;

            case 2:
                this.speedFactor = 1;
                this.updatePosition();
                break;
            default:
                this.speedFactor = 1;
        }

        this.left += this.directionX * this.speedFactor;
        this.top += this.directionY * this.speedFactor;

        if (this.left + this.width >= this.gameScreen.offsetWidth){  // if the car is trying to leave the screen size on the right side, it will always be on the inside part of the screen
            this.left = this.gameScreen.offsetWidth - this.width;
            // left - side
        } else if (this.left <= 0){
            this.left = 0;
        }
        if (this.top + this.height >= this.gameScreen.offsetHeight){  // height is measured from top to bottom, so this condition is for the bottom part
            this.top = this.gameScreen.offsetHeight - this.height;
        } else if (this.top <= 0){
            this.top = 0;
        }
        this.updatePosition();
    }
    updatePosition(){
        // Update CSS - during movement of the player?
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }
    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
        if (playerRect.left < obstacleRect.right            // (measurable from left to right)
            && playerRect.right > obstacleRect.left         // (measurable from left to right)
            && playerRect.top < obstacleRect.bottom         // (measurable from top to bottom)
            && playerRect.bottom > obstacleRect.top){       // (measurable from top to bottom)
            return true;
            } else {
            return false
        }
    }
}