const gameContent = document.querySelector(".game-content-div");
const playbtn = document.querySelector(".play-btn");
const betAmountElm = document.querySelector(".bet-amount");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const profitElement = document.querySelector(".profit");
const balanceElement = document.querySelector(".balance");

const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"},
    {name: "catched-ball", imgsrc: "./images/catched-ball.png"}
];
const rowMultipliers = [1.20, 1.50, 1.90, 2.40, 3.10, 4.50, 5.80, 6.90, 8.20, 10.00];
const betAmounts = [0.20, 0.40, 0.60, 1.00, 1.50, 2.00, 3.00, 4.00, 5.00, 7.00, 10.00, 15.00, 20.00, 30.00, 40.00, 50.00, 70.00, 100.00];

let gameStarted = false;
let gameOver = false;
let activeRowIndex = 10;
let balance = 5.00;
let currentMultiplier = 0;
let currentBetIndex = 3;
let newBalance = 0;


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



function updateBalance() {
    if(gameStarted === false){
        balanceElement.innerHTML = `Balance: €${balance.toFixed(2)}`;
    }else if (gameStarted === true){
        balanceElement.innerHTML = `Balance: €${newBalance.toFixed(2)}`;
    }
};

function updateProfit(profits) {
    profitElement.innerHTML = `Profits: ${profits.toFixed(2)}`;
}

playbtn.addEventListener("click", function () {
    if(balance < betAmounts[currentBetIndex]){
        alert("no enugh balance");
        return;
    }
    // Reset game state to the initial condition
    gameStarted = true;
    gameOver = false;
    activeRowIndex = 10;
    currentMultiplier = 0;
    newBalance = balance - betAmounts[currentBetIndex];
    updateBalance();
    updateProfit(currentMultiplier);
    playbtn.disabled = true;
    minusBtn.disabled = true;
    plusBtn.disabled = true;
    // Clear the game area and regenerate content
    gameContent.innerHTML = "";
    contentGenerator(); // Recreate the game blocks
});
updateProfit(currentMultiplier);



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

    /*just comment outted this to write on paper using bolean withh if
    if (gameOver) {
        return;
    }
    */

    // Allow interaction only with blocks in the active row
    if (rowIndex !== activeRowIndex) {
        return;
    }

    // Check if a ball has already been placed in this row
    if (rowDiv.getAttribute("data-ball-placed") === "true") {
        return;
    }

    if (frontGameBlock.src.includes('helmet')) {
        frontGameBlock.src = './images/catched-ball.png';
        rowDiv.setAttribute("data-ball-placed", "true");

        gameOver = true;
        gameStarted = false;
        playbtn.disabled = false;
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        return;
    } else {
        frontGameBlock.src = './images/ball.avif';
        rowDiv.setAttribute("data-ball-placed", "true");
    }
    
    // Update balance after successfully placing the ball in the current row
    let profits;
    const currentRewardIndex = 10 - activeRowIndex;
    if (currentRewardIndex <= rowMultipliers.length) {
        profits = betAmounts[currentBetIndex] * rowMultipliers[currentRewardIndex];
        updateProfit(profits);
    }

    // Move to the next row above
    if (activeRowIndex > 1) {
        activeRowIndex--;
    }else {
        // Player has successfully reached the top row (won the game)
        gameOver = true;
        gameStarted = false;
        playbtn.disabled = false;
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        return;
    }



}
contentGenerator();