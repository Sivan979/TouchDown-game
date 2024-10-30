const gameContent = document.querySelector(".game-content-div");
const playbtn = document.querySelector(".play-btn");

const betAmountElm = document.querySelector(".bet-amount");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");


const balanceElement = document.querySelector(".balance");
let balance = 5.00;

const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"},
    {name: "catched-ball", imgsrc: "./images/catched-ball.png"}
];
let gameStarted = false;
let gameOver = false;
let activeRowIndex = 10;

const rowMultipliers = [1.20, 1.50, 1.90, 2.40, 3.10, 4.50, 5.80, 6.90, 8.20, 10.00];
const betAmounts = [0.20, 0.40, 0.60, 1.00, 1.50, 2.00, 3.00, 4.00, 5.00, 7.00, 10.00, 15.00, 20.00, 30.00, 40.00, 50.00, 70.00, 100.00];
let currentBetIndex = 0;




function updateBetAmount() {
    betAmountElm.innerHTML = `${betAmounts[currentBetIndex].toFixed(2)} EUR`;
}  
plusBtn.addEventListener("click", function(){
    if (currentBetIndex < betAmounts.length - 1) {
        currentBetIndex++;
        updateBetAmount();
      }
});
minusBtn.addEventListener("click", function(){
    if (currentBetIndex > 0) {
        currentBetIndex--;
        updateBetAmount();
      }
});
updateBetAmount();



playbtn.addEventListener("click", function () {
    // Reset game state to the initial condition
    gameStarted = true;
    gameOver = false;
    activeRowIndex = 10;
    balance = 5.0;
    updateBalance();

    playbtn.disabled = true;// Disable the play button to prevent multiple clicks while playing

    // Clear the game area and regenerate content
    gameContent.innerHTML = "";
    contentGenerator(); // Recreate the game blocks
});



document.querySelector(".play-btn").addEventListener("click", function () {
    gameStarted = true;
    document.querySelector(".play-btn").disabled = true;
});


function updateBalance() {
    balanceElement.innerHTML = `Balance: €${balance.toFixed(2)}`;
}

function contentGenerator() {
    const rows = 10;
    const blocksPerRow = 5;

    for(let rowIndex = 1; rowIndex <= rows; rowIndex++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        gameContent.appendChild(rowDiv);

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
        
        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow);
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc;
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

    
    // Update balance after successfully placing the ball in the current row
    const currentRewardIndex = 10 - activeRowIndex;
    if (currentRewardIndex <= rowMultipliers.length) {
        balance = 5.00 * rowMultipliers[currentRewardIndex];
        updateBalance();
    }

    // Move to the next row above
    if (activeRowIndex > 1) {
        activeRowIndex--;
    }else {
        // Player has successfully reached the top row (won the game)
        gameOver = true;
        gameStarted = false;
        playbtn.disabled = false;
        return; // Exit the function since the game is now won
    }



}
contentGenerator();