class Game {
    // code to be added
    constructor (color){
        this.startScreen = document.querySelector("#game-intro"); //change screen to intro
        this.gameScreen = document.querySelector("#game-screen"); //change screen to game-screen
        this.gameEndScreen = document.querySelector("#game-end"); //change screen to game-end

        this.color = color;

        this.player = new Player(this.gameScreen, 200, 500, 100, 125, color); // so the car is in the center and not the left side of the car in the center
        
        this.imgFish1;
        this.imgFish2;
                
        this.height = 500; // <-- could be directly in px, but makes it hard to use them later if we want to create some game logic
        this.width = 1100;

        this.obstacles = [];  
        this.obstacles2 = []
        this.bonusES = [];
        this.Extralives = [];
        this.bubbles =[]
        
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false;
        this.loadingObstacle = false;
        this.loadingObstacle2 = false;
        this.loadingBonus = false;
        this.loadinglive = false;
        this.loadingbubbles = false
        this.level =1;
        //this.x = 0
    }

        /*let fish =[1,2]
        if (fish[0] === 1) {
            this.imgFish="../images/peixe2.png"
        } else {
            this.imgFish="../images/peixe1.png"
        }*/
        
        start(){
            // Define height and width of game screen
            //this.pickPlayer()
            this.gameScreen.style.height = `${this.height}px`;  // <-- this way, we can use this later for making in-game changes on the with, if we wish 
            this.gameScreen.style.width = `${this.width}px`;
            // Hide Game Intro Screen
            this.startScreen.style.display = "none";    // visibility property also duable, but display is better
            // Show the Game Screen
            this.gameScreen.style.display = "block";
            
            let  footer = document.getElementById("footer");
            footer.style.display = "none";
            
            let bar = document.querySelector(".stat")
            bar.style.display = "block";
            // Start the Game
            this.gameLoop();

            const audio0 = new Audio("docs/sound/underwater.mp3");
            audio0.loop = true; // Set the loop property to true to play the audio in a loop
            audio0.play();
        }

    gameLoop(){
        if (this.gameIsOver){
            return;             // since return stops the function...
        }
              // keeps updating the screen with the gameLoop function

        window.requestAnimationFrame(() => this.gameLoop()); // window (grabs the window of the browser) requestAnimationFrame (keeps the selected function running)
        this.update();  
    }
    
    update() {
        this.player.move(this.level);
    
        for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move(this.level);
    
            // Check for Collision with Obstacles
            if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                if(this.lives>=1){
                const audio5 = new Audio(['docs/sound/icq-old-sound.mp3']);
                audio5.play([0])
                audio5.volume = 0.1
            } 

            } else if (obstacle.top > this.height) {
                this.score++;
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
            }        
        }

                // Check for Collision with Bonuses

        for (let j = 0; j < this.bonusES.length; j++) {
            const bonus = this.bonusES[j];
            bonus.move();
    
            if (this.player.didCollide(bonus)) {
                bonus.element.remove();
                this.bonusES.splice(j, 1);
                this.score ++ ; //
                
                    const audio5 = new Audio(['docs/sound/message-incoming-132126.mp3']);
    
                    audio5.play([0])
                    audio5.volume = 0.8

            } else if(bonus.top > this.height) {
                bonus.element.remove();
                this.bonusES.splice(j, 1); //
            }                        
        }
                    //// check for colision obstaculo2

        for (let k = 0; k < this.obstacles2.length; k++) {
            const obstacle2 = this.obstacles2[k];
            obstacle2.move();
    
            if (this.player.didCollide(obstacle2)) {
                obstacle2.element.remove();
                this.obstacles2.splice(k, 1);
                this.lives --;

                const audio3 = new Audio(['docs/sound/obstacle2.mp3']);
                audio3.play([0])

            } else if(obstacle2.top > this.height) {
                obstacle2.element.remove();
                this.obstacles2.splice(k, 1); //
            }
        }

////////////////////////////check for colision extra lives///////////

        for (let q = 0; q < this.Extralives.length; q++) {
            const ELive = this.Extralives[q];
            ELive.move();
    
            if (this.player.didCollide(ELive)) {
                ELive.element.remove();
                this.Extralives.splice(q, 1);
                this.lives ++;


                const audio3 = new Audio(['docs/sound/extra life.mp3']);
                audio3.play([0])
        } 
        else if(ELive.top > this.height) {
                ELive.element.remove();
                this.Extralives.splice(q, 1); //
            }
        }

                    ////////////////////////////check for colision bubble

        for (let w = this.bubbles.length-1; w >= 0; w--) {
            const bubble = this.bubbles[w];
            bubble.move();
        
            if (this.player.didCollide(bubble)) {
                bubble.element.remove();
                this.bubbles.splice(w, 1);

                const audio3 = new Audio(['docs/sound/mixkit-deep-water-bubbles-1321.wav']);
                audio3.play([0])
                audio3.volume = 1

                // Create an image element and set its attributes
                const img = new Image();
                img.src = "docs/images/FUNDO pRETO.png";
                img.style.opacity = '0.7';
                img.style.backgroundSize = "cover";
                
                // Append the image to a specific element in the document
                // Replace 'container' with the appropriate container element
                const containerIMG = document.getElementById("game-screen"); // Replace with your container element's ID
                containerIMG.appendChild(img);
        
                setTimeout(() => {
                    img.remove();
                }, 5000); 

            } else if (bubble.top <0) {
                bubble.element.remove();
                this.bubbles.splice(w, 1);
            }
        }

        if (this.lives === 0) {
            this.endGame();
        }
    
        let level = document.getElementById("level");

        // Update the level
        if (this.score > 10 && this.score <= 11) {
            this.level = 2;
        } else if (this.score > 20 && this.score <= 21) {
            this.level = 3;

        } else if(this.score >35  && this.score <= 36){
            this.level = 4;

        } else if (this.score >50){
            this.level = 5;
        }

        level.innerHTML = this.level;
        
        if (!this.obstacles.length && !this.loadingObstacle) {
            this.loadingObstacle = true;

            setTimeout(() => {
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.loadingObstacle = false;
            }, 500);
        }
    
        if (!this.bonusES.length && !this.loadingBonus) {
            this.loadingBonus = true;
            setTimeout(() => {
                this.bonusES.push(new Bonus(this.gameScreen));
                this.loadingBonus = false;
            }, 50);

            //////obstaculo 2


        if (!this.obstacles2.length && !this.loadingObstacle2 && this.level >= 2 && this.level<3) {
            this.loadingObstacle2 = true;

            setTimeout(() => {
                this.obstacles2.push(new Obstacle2(this.gameScreen));
                this.loadingObstacle2 = false;
            }, 500)
        }

        if (!this.obstacles2.length && !this.loadingObstacle2 && this.level >= 3) {
            this.loadingObstacle2 = true;
        
            // Create and push a new Obstacle2

            const newObstacle2 = new Obstacle2(this.gameScreen);
            this.obstacles2.push(newObstacle2);
            
            setTimeout(() => {
                    const index1 = this.obstacles2.indexOf(newObstacle2);
                    if (index1 !== -1) {
                        this.obstacles2.splice(index1, 1);
                        newObstacle2.element.remove();
                    }
                    this.loadingObstacle2 = false; 
                }, 4500); 
            }

                /* setTimeout(() => {
                    this.obstacles2.push(new Obstacle2(this.gameScreen));
                    this.loadingObstacle2 = false;
                }, 500);*/
        
            ////////////EXTRA LIVE//////////////////

        if (!this.Extralives.length && !this.loadinglive&&this.level>=3) {
            this.loadinglive = true;
        
            // Create the object and add it to Extralives
            const newVida = new Vida(this.gameScreen);
            this.Extralives.push(newVida);
        
            // Schedule its removal after 2 seconds
            setTimeout(() => {
                // Remove the object from Extralives and the DOM
                const index = this.Extralives.indexOf(newVida);
                if (index !== -1) {
                    this.Extralives.splice(index, 1);
                    newVida.element.remove();
                }
                this.loadinglive = false; // Reset the flag
            }, 5500); // 2000 milliseconds = 2 seconds
        }
            
            
            //////////last obstacle buble////////////////
            
        if (!this.bubbles.length && !this.loadingbubbles&&this.level >= 4) {
            this.loadingbubbles = true;

                setTimeout(() => {
                this.bubbles.push(new Bubble(this.gameScreen));
                this.loadingbubbles = false;
            }, 50);
        }
    }

         //////////////////////////////////////////////

        let score = document.getElementById("score");
        let lives = document.getElementById("lives");
    
        score.innerHTML = this.score;
        lives.innerHTML = this.lives;
    }

    endGame(){
        this.gameIsOver = true;
        this.player.element.remove();
        this.obstacles.forEach(obstacle =>{
            obstacle.element.remove();
        });
        this.gameScreen.style.display = "none";
        this.gameEndScreen.style.display = "block";

        const audio5 = new Audio(['docs/sound/mixkit-funny-fail-low-tone-2876.wav']);
        audio5.play([0])
    }
}    