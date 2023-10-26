class Vida {
    constructor (gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 1000 + 70);  
        this.top = Math.floor(Math.random() *150);
        this.width = 60
        this.height = 110;
        this.element = document.createElement("img");

        this.element.src = "docs\images\Extra_live.png";
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
    }    }
