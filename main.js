const gameContent = document.querySelector(".game-content-div");
const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"}
];

const contenGenerator = () =>{
    const rows = []; // Will store rows of blocks

    for(let i = 0; i < 50; i++) {
        if(i < 50){
            const gameBlock= document.createElement("div");
            const frontGameBlock = document.createElement("img");
            const backGameBlock = document.createElement("div");
        
            gameBlock.classList = "game-block";
            frontGameBlock.classList = "front-game-block";
            backGameBlock.classList = "back-game-block";
        
            gameContent.appendChild(gameBlock);
            gameBlock.appendChild(frontGameBlock);
            gameBlock.appendChild(backGameBlock);

            


        }
    };
};

contenGenerator();