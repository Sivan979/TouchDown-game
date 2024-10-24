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

        // Add an attribute to track if the ball image has been placed in this row
        rowDiv.setAttribute("data-ball-placed", "false");
        
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

            gameBlock.addEventListener('click', function() {
                handleBlockClick(frontGameBlock, rowDiv);
            });
        }
        gameContent.appendChild(rowDiv);

        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow); // This line is responsible for selecting a random block within each row where the image will be placed
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc; // Set the helmet image on the randomly selected block
    }
}

function handleBlockClick(frontGameBlock, rowDiv) {
    // Check if a ball has already been placed in this row
    if (rowDiv.getAttribute("data-ball-placed") === "true") {
        return; // If yes, ignore subsequent clicks in this row
    }

    if (frontGameBlock.src.includes('helmet')) {
        // If the block has a helmet, do nothing
        return;
    }
    // Set the image to the ball if no helmet
    frontGameBlock.src = './images/ball.avif';
    // Update the row attribute to indicate a ball has been placed
    rowDiv.setAttribute("data-ball-placed", "true");
}


contentGenerator();