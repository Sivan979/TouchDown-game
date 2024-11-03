const gameContent = document.querySelector(".game-content-div");
const playbtn = document.querySelector(".play-btn");
const betAmountElm = document.querySelector(".bet-amount");
const minusBtn = document.querySelector(".minus-btn");
const plusBtn = document.querySelector(".plus-btn");
const profitElement = document.querySelector(".profit");
const balanceElement = document.querySelector(".balance");
const cashOutBtn = document.querySelector(".cash-out-btn");
const bigBtn = document.querySelector(".big-btn");
const mediumBtn = document.querySelector(".medium-btn");
const smallBtn = document.querySelector(".small-btn");
const xContainer = document.querySelector(".x-container");

const images = [ 
    {name: "helmet", imgsrc:"./images/helmet.png"},
    {name: "ball", imgsrc:"./images/ball.avif"},
    {name: "catched-ball", imgsrc: "./images/catched-ball.png"}
];
const rowMultipliers = [1.20, 1.50, 1.90, 2.40, 3.10, 4.50, 5.80, 6.90, 8.20, 10.00];
const mediumRowMultipliers = [1.30, 1.70, 2.30, 3.00, 4.00, 5.30, 7.10, 9.50];
const smallRowMultipliers = [1.40, 2.10, 3.20, 4.80, 7.20];
const betAmounts = [0.20, 0.40, 0.60, 1.00, 1.50, 2.00, 3.00, 4.00, 5.00, 7.00, 10.00, 15.00, 20.00, 30.00, 40.00, 50.00, 70.00, 100.00];
const bigFieldX = ["x10","x8.2","x6.9","x5.8","x4.5","x3.1","x2.4", "x1.9","x1.5" ,"x1.2"];
const mediumFieldX = ["x9.5", "x7.1", "x5.3", "x4.0", "x3.0", "x2.3", "x1.7", "x1.3"];
const smallFieldX = ["x7.2", "x4.8", "x3.2", "x2.1", "x1.4"];

let gameStarted = false;
let gameOver = false;
let activeRowIndex = 10;
let activeRowIndexS = 5;
let activeRowIndexM = 8;

let balance = 5.00;
let currentMultiplier = 0;
let currentBetIndex = 3;
let newBalance = 0;
let profits;
let bigFieldCreated = "false";
let mediumFieldCreated = "false";
let smallFieldCreated = "false";

cashOutBtn.disabled = true;
if(gameStarted === true){
    cashOutBtn.disabled = false;
}

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
    balanceElement.innerHTML = `Balance: €${balance.toFixed(2)}`;

};

function updateProfit(profits) {
    profitElement.innerHTML = `Profits: ${profits.toFixed(2)}`;
}


function fieldButtonsState(isEnabled) {
    bigBtn.disabled = !isEnabled;
    mediumBtn.disabled = !isEnabled;
    smallBtn.disabled = !isEnabled;
}

function bigFieldXF(){
    xContainer.innerHTML = "";
    for(let i = 0; i <= 9; i++){
        const paragraph =document.createElement("p");
        xContainer.appendChild(paragraph);
        paragraph.innerText = bigFieldX[i];
    }
}
function mediumFieldXF(){
    xContainer.innerHTML = "";
    for (let i = 0; i<=7; i++){
        const paragraph =document.createElement("p");
        xContainer.appendChild(paragraph);
        paragraph.innerText = mediumFieldX[i];
    }
}
function smallFieldXF(){
    xContainer.innerHTML = "";
    for (let i = 0; i<=4; i++){
        const paragraph =document.createElement("p");
        xContainer.appendChild(paragraph);
        paragraph.innerText = smallFieldX[i];
    }
}

bigBtn.addEventListener("click", function(){
    if(smallFieldCreated === "true" || mediumFieldCreated === "true"){
        gameContent.innerHTML = "";
        contentGenerator();
        smallFieldCreated = "false";
        mediumFieldCreated = "false";
        bigFieldCreated = "true";
        bigFieldXF();
        return;
    }
    if(bigFieldCreated === "true"){
        return;
    }
    if (bigFieldCreated === "false"){
        contentGenerator();
        bigFieldCreated = "true";
        bigFieldXF();
        return;
    }  
});


mediumBtn.addEventListener("click", function(){
    if(bigFieldCreated === "true" || smallFieldCreated === "true"){
        gameContent.innerHTML = "";
        mediumBtnF();
        smallFieldCreated = "false";
        bigFieldCreated = "false";
        mediumFieldCreated = "true";
        mediumFieldXF();
        return;
    }
    if(mediumFieldCreated === "true"){
        return;
    }
    if (mediumFieldCreated === "false"){
        gameContent.innerHTML = "";
        mediumBtnF();
        mediumFieldCreated = "true";
        mediumFieldXF();
    }  
});


smallBtn.addEventListener("click", function(){
    if (bigFieldCreated === "true" || mediumFieldCreated === "true"){
        gameContent.innerHTML = "";
        smallBtnF();
        bigFieldCreated = "false";
        mediumFieldCreated = "false";
        smallFieldCreated = "true";
        smallFieldXF();
        return;
    }
    if(smallFieldCreated === "true"){
        return;
    }
    if (smallFieldCreated === "false"){
        smallFieldCreated = "true";
        smallBtnF();
        smallFieldXF();
        return;
    }
});



playbtn.addEventListener("click", function () {
    if(balance < betAmounts[currentBetIndex]){
        alert("no enugh balance, refreash the page to reset your balance to 5EUR");
        return;
    }
    if(bigFieldCreated === "true"){
        // Reset game state to the initial condition
        gameStarted = true;
        gameOver = false;
        activeRowIndex = 10;
        currentMultiplier = 0;
        balance = balance - betAmounts[currentBetIndex];
        updateBalance();
        updateProfit(currentMultiplier);
        playbtn.disabled = true;
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        // Clear the game area and regenerate content
        gameContent.innerHTML= "";
        contentGenerator();
        bigFieldXF();
        fieldButtonsState(false, false, false);

    } else if (mediumFieldCreated === "true"){
        gameStarted = true;
        gameOver = false;
        activeRowIndexM = 8;
        currentMultiplier = 0;
        balance = balance - betAmounts[currentBetIndex];
        updateBalance();
        updateProfit(currentMultiplier);
        playbtn.disabled = true;
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        // Clear the game area and regenerate content
        gameContent.innerHTML= "";
        mediumBtnF();
        mediumFieldXF();
        fieldButtonsState(false, false, false);

    } else if(smallFieldCreated === "true"){
        gameStarted = true;
        gameOver = false;
        activeRowIndexS = 5;
        currentMultiplier = 0;
        balance = balance - betAmounts[currentBetIndex];
        updateBalance();
        updateProfit(currentMultiplier);
        playbtn.disabled = true;
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        // Clear the game area and regenerate content
        gameContent.innerHTML= "";
        smallBtnF(); 
        smallFieldXF();
        fieldButtonsState(false, false, false);       
    }
    
});
updateProfit(currentMultiplier);


cashOutBtn.addEventListener("click", function(){
    if(cashOutBtn.disabled === false){
        gameOver = true;
        gameStarted =false;
        balance = balance + profits;
        playbtn.disabled = false;
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        cashOutBtn.disabled = true;
        fieldButtonsState(true, true, true);
        updateBalance();

    }
});


function smallBtnF(){
    const rows = 5;
    const blocksPerRow = 3;

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
            console.log("befor gameblock");
            gameBlock.addEventListener('click', function() {
                if (gameStarted && !gameOver) {
                    console.log("inside if ");
                    handleBlockClick(frontGameBlock, rowDiv, rowIndex);
                }
            });
        }
        
        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow);
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc;
    }
};



function mediumBtnF(){
    const rows = 8;
    const blocksPerRow = 4;

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
            console.log("befor gameblock");

            gameBlock.addEventListener('click', function() {
                if (gameStarted && !gameOver) {
                    handleBlockClick(frontGameBlock, rowDiv, rowIndex);
                }
            });
        }
        
        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow);
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc;
    }
};


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
            console.log("befor gameblock");

            gameBlock.addEventListener('click', function() {
                console.log("inside gameblock");
                if (gameStarted && !gameOver) {
                    console.log("gig");
                    handleBlockClick(frontGameBlock, rowDiv, rowIndex);
                }
            });
        }
        
        const randomBlockIndex = Math.floor(Math.random() * blocksPerRow);
        currentRowBlocks[randomBlockIndex].src = images[0].imgsrc;
    }

}

function handleBlockClick(frontGameBlock, rowDiv, rowIndex) {
    if (bigFieldCreated === "true"){
        bigFieldRules();
    }
    if(mediumFieldCreated === "true"){
        mediumFieldRules();
    }
    if(smallFieldCreated === "true"){
        smallFieldRules();
    }

    function smallFieldRules(){
        if (!gameStarted || gameOver) {
            return; // Ignore clicks if the game hasn't started or is over
        }
        if (rowIndex !== activeRowIndexS) {
            return;
        }
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
            cashOutBtn.disabled = true;
            fieldButtonsState(true, true, true);

            return;
        } else {
            frontGameBlock.src = './images/ball.avif';
            rowDiv.setAttribute("data-ball-placed", "true");
            cashOutBtn.disabled = false;
            
        }
        const currentRewardIndex = 5 - activeRowIndexS;
        if (currentRewardIndex <= mediumRowMultipliers.length) {
            profits = betAmounts[currentBetIndex] * smallRowMultipliers[currentRewardIndex];
            updateProfit(profits);
        }

        // Move to the next row above
        if (activeRowIndexS > 1) {
            activeRowIndexS--;
        }else {
            // Player has successfully reached the top row (won the game)
            gameOver = true;
            gameStarted = false;
            playbtn.disabled = false;
            minusBtn.disabled = false;
            plusBtn.disabled = false;
            balance = balance + profits;
            cashOutBtn.disabled = true;
            updateBalance();
            fieldButtonsState(true, true, true);
            return;
        }
    }

    function mediumFieldRules(){
        if (!gameStarted || gameOver) {
            return; // Ignore clicks if the game hasn't started or is over
        }
        if (rowIndex !== activeRowIndexM) {
            return;
        }
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
            cashOutBtn.disabled = true;
            fieldButtonsState(true, true, true);

            return;
        } else {
            frontGameBlock.src = './images/ball.avif';
            rowDiv.setAttribute("data-ball-placed", "true");
            cashOutBtn.disabled = false;
            
        }
        const currentRewardIndex = 8 - activeRowIndexM;
        if (currentRewardIndex <= mediumRowMultipliers.length) {
            profits = betAmounts[currentBetIndex] * mediumRowMultipliers[currentRewardIndex];
            updateProfit(profits);
        }

        // Move to the next row above
        if (activeRowIndexM > 1) {
            activeRowIndexM--;
        }else {
            // Player has successfully reached the top row (won the game)
            gameOver = true;
            gameStarted = false;
            playbtn.disabled = false;
            minusBtn.disabled = false;
            plusBtn.disabled = false;
            balance = balance + profits;
            cashOutBtn.disabled = true;
            updateBalance();
            fieldButtonsState(true, true, true);
            return;
        }
    }

    function bigFieldRules(){
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
            cashOutBtn.disabled = true;
            fieldButtonsState(true, true, true);

            return;
        } else {
            frontGameBlock.src = './images/ball.avif';
            rowDiv.setAttribute("data-ball-placed", "true");
            cashOutBtn.disabled = false;
            
        }
        
        // Update balance after successfully placing the ball in the current row
        
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
            balance = balance + profits;
            cashOutBtn.disabled = true;
            updateBalance();
            fieldButtonsState(true, true, true);
            return;
        }
    }



}
