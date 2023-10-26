class Bonus {
    constructor (gameScreen){
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 1000 + 70);  
        this.top = 0;
        this.width = 65
        this.height = 105;
        this.element = document.createElement("img");
        
        const imageSources =["docs\images\food2.png","docs\images\food5.png"]

        const randomIndex = Math.floor(Math.random() * imageSources.length);
        const selectedImageSrc = imageSources[randomIndex];
    
        this.element.src = selectedImageSrc;

        this.element.style.width = `${this.width-20}px`;
        this.element.style.height = `${this.height-20}px`;
        this.element.style.left = `${this.left-20}px`;
        this.element.style.top = `${this.top-20}px`;
        this.element.style.position = "absolute";
        
        this.gameScreen.appendChild(this.element)
    }
    updatePosition(){
        this.element.style.top = `${this.top}px`;  // only top because the car only moves down and not to the sides
    }
    move(){
        this.top +=3;
        this.updatePosition();
    }    
}