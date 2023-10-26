class Obstacle2 {
    constructor (gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 1000 + 70);  
        this.top = 150;
        this.width = 70
        this.height = 120;
        this.element = document.createElement("img");

        this.element.src = "../images/obstaculo2.png";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.element.style.position = "absolute";
        
        this.gameScreen.appendChild(this.element)
    }

    updatePosition(){
        this.element.style.top = `${this.top}px`;  // only top because the car only moves down and not to the sides
    }

    move(){
        this.updatePosition();
    }
}

