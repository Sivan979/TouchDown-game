const gameContent = document.querySelector(".game-content-div");
const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"}
];

function contentGenerator() {
    const rows = 10;
    const blocksPerRow = 5;

    for(let rowIndex = 1; rowIndex <= rows; rowIndex++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        
        // Array to keep track of block elements in the current row
        const currentRowBlocks = [];

        for(let blockIndex = 1; blockIndex <= blocksPerRow; blockIndex++){
            const gameBlock= document.createElement("div");
            const frontGameBlock = document.createElement("img");
            const backGameBlock = document.createElement("div");
        
            gameBlock.classList.add("game-block");
            frontGameBlock.classList.add("front-game-block");
            backGameBlock.classList.add("back-game-block");
        
            gameBlock.setAttribute("data-block", `row${rowIndex}-block${blockIndex}`);

            gameBlock.appendChild(frontGameBlock);
            gameBlock.appendChild(backGameBlock);
            
            rowDiv.appendChild(gameBlock);
            
            currentRowBlocks.push(frontGameBlock);
        }

        gameContent.appendChild(rowDiv);

        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow); // Random index from 0 to 4
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc; // Set the helmet image on the randomly selected block
    }
}

contentGenerator();