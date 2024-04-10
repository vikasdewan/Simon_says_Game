let gameSeq = [];
let userSeq = [];
let level = 0;
let start = false;
let btns = ["red","green","blue","yellow"];
let h2 = document.querySelector("h2");


//start of a game
document.addEventListener("keypress",function(){
  //once game started then no need to start it again
  if(start == false){
    console.log("game started");
    start = true;
    levelUp(); 
}
})


//flashing of a button during game
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },100);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },100);
}




//leveling up
function levelUp(){
    userSeq =[];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);

}


//checking response by user
function checkAns(idx){
    // console.log("current level : ",level)
    if(gameSeq[idx] == userSeq[idx]){
         if(userSeq.length == gameSeq.length){      
            setTimeout(levelUp,1000);
        }
    }
    
    else{
        h2.innerText = `Game Over! Your score was  ${level} .Press any key to start again :)`
        document.querySelector("body").style.backgroundColor= "red";
        const currentScore = level;
        console.log(currentScore);
        updateHighestScore(currentScore);
        
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor= "black";

        },150)
        reset();
    }

}

//press mechanism

function btnPress(){
    // console.log("button was pressed");
    // console.log(this);
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}


function reset(){
    start = false;
    gameSeq =[];
    userSeq =[];
    level =0;

}


function tag(){
    let maxWidth = screen.width;
    console.log(maxWidth)
    if(maxWidth<522){
      let tagLine = document.querySelector("h2");
        tagLine.innerText = "tap anywhere to Start the Game";
        console.log(tagLine.innerText)   
    }
}

tag();
 
// Initialize highestScore from localStorage (if available)
let highestScore = parseInt(localStorage.getItem('highestScore')) || 0;

// Function to update highest score
function updateHighestScore(score) {
    document.getElementById('highest-score').textContent = `Highest Score: ${highestScore}`;
    if (score > highestScore) {
        highestScore = score;
        console.log(highestScore);
        document.getElementById('highest-score').textContent = `Highest Score: ${highestScore} 👏 `;
        // Store the updated highest score in localStorage
        localStorage.setItem('highestScore', highestScore);
    }
    else{
        document.getElementById('highest-score').textContent = `Highest Score: 👉${highestScore}👈 __Try agin You can Beat This Score 💯__`;
    }
}

// Example usage (call this after each successful level completion)
// const currentScore = 5; // Replace with the actual score


 
