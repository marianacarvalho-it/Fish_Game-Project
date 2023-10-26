class Obstacle {
    constructor (gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 1000 + 70);  
        this.top = 0;
        this.width = 75
        this.height = 125;
        this.element = document.createElement("img");
        
        const imageSources =["docs\images\garbage1.png","docs\images\garbage0.png","docs\images\garbage3.png"];

        const randomIndex = Math.floor(Math.random() * imageSources.length);
        const selectedImageSrc = imageSources[randomIndex];
    
        this.element.src = selectedImageSrc;

        this.element.style.width = `${this.width-20}px`;
        this.element.style.height = `${this.height-20}px`;
        this.element.style.left = `${this.left-20}px`;
        this.element.style.top = `${this.top-20}px`;
        this.element.style.position = "absolute";
        
        this.gameScreen.appendChild(this.element);
    }

    updatePosition(){
        this.element.style.top = `${this.top}px`;  // only top because the car only moves down and not to the sides
    }

    move(level){
        if(level === 1 ) {
            this.top +=3;
            this.updatePosition();

            } else if (level === 2){
                this.top +=6
                this.updatePosition();

            } else if (level === 3) {
                this.top += 10
                this.updatePosition();

            } else if (level === 4) {
                this.top += 15
                this.updatePosition();

            } else if (level === 5) {
                this.top += 15
                this.updatePosition();

            }
        }
    }    