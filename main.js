const gameContent = document.querySelector(".game-content-div");
const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"},
    {name: "catched-ball", imgsrc: "./images/catched-ball.png"}
];
let gameStarted = false; // Game starts when set to true
let gameOver = false; // Indicates whether the game is over
let activeRowIndex = 10; // Start with the last row as the active row

const playbtn = document.querySelector(".play-btn");
playbtn.addEventListener("click", function () {
    // Reset game state to the initial condition
    gameStarted = true;
    gameOver = false;
    activeRowIndex = 10;

    // Disable the play button to prevent multiple clicks while playing
    playbtn.disabled = true;

    // Clear the game area and regenerate content
    const gameContent = document.querySelector(".game-content-div");
    gameContent.innerHTML = ""; // Remove all the existing rows and blocks
    contentGenerator(); // Recreate the game blocks
});



document.querySelector(".play-btn").addEventListener("click", function () {
    gameStarted = true; // Set game state to started
    document.querySelector(".play-btn").disabled = true; // Disable the start button
});


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
                if (gameStarted && !gameOver) {
                    handleBlockClick(frontGameBlock, rowDiv, rowIndex);
                }            
            });
        }
        gameContent.appendChild(rowDiv);

        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow); // This line is responsible for selecting a random block within each row where the image will be placed
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc; // Set the helmet image on the randomly selected block
    }
}

function handleBlockClick(frontGameBlock, rowDiv, rowIndex) {
    if (!gameStarted || gameOver) {
        return; // Ignore clicks if the game hasn't started or is over
    }


    // Check if the game is already over
    if (gameOver) {
        return; // Ignore clicks if the game is over
    }

    // Allow interaction only with blocks in the active row
    if (rowIndex !== activeRowIndex) {
        return; // Ignore clicks if the row is not active
    }

    // Check if a ball has already been placed in this row
    if (rowDiv.getAttribute("data-ball-placed") === "true") {
        return; // If yes, ignore subsequent clicks in this row
    }

    if (frontGameBlock.src.includes('helmet')) {
        frontGameBlock.src = './images/catched-ball.png'; // Change helmet to caught ball
        rowDiv.setAttribute("data-ball-placed", "true"); // Mark the row as having a ball placed
        // If the block has a helmet, do nothing

        // Set the game state to over
        gameOver = true;
        gameStarted = false; // Game is no longer in play
        // Re-enable the play button for a new game
        playbtn.disabled = false;

        return;
    }
    // Set the image to the ball if no helmet
    frontGameBlock.src = './images/ball.avif';
    // Update the row attribute to indicate a ball has been placed
    rowDiv.setAttribute("data-ball-placed", "true");

    // Move to the next row above
    if (activeRowIndex > 1) {
        activeRowIndex--; // Decrease the active row index to allow the next row above
    }
}


contentGenerator();