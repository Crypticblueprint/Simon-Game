//declare variable to be used

//keeps track of light order
let order = [];
//keeps track of player clicks
let playerOrder = [];
//number of flashes in game
let flash;
//keep track of what turn we are on
let turn;
//boolean for player status in game
let good;
//boolean track computer of player turn
let compTurn;
//variable used to clearInterval
let intervalId;
//option, if on, player will automatically lose
//game once he chooses wrong
let strict = false;
//audio enabled when game is operating
let noise = true;
//click option 
let on = false;
//end game with win 
let win;


//getElements that will be used
const turnCounter = document.getElementById('turn');
const topLeft = document.getElementById('topLeft');
const topRight = document.getElementById('topRight');
const bottomLeft = document.getElementById('bottomLeft');    
const bottomRight = document.getElementById('bottomRight');
const onButton = document.getElementById('on');
const strictButton = document.getElementById('strict');
const startButton = document.getElementById('start')

//setup strict button
strictButton.addEventListener('click', (e) => {
    if(strictButton.checked === true) {
        console.log('checked')
        strict = true;
    } else {
        strict = false;
    }
});


//setup on button, default counter text
onButton.addEventListener('click', (e) => {
    if (onButton.checked == true) {
        console.log('checked')
        on = true;
        turnCounter.innerText = "-";
    } else {
        on = false;
        turnCounter.innerText = "";
        clearColor();
        clearInterval(intervalId);
    }
});

//setup start button
startButton.addEventListener('click', (e) => {
    if (on || win) {
        play();
    }
});

//set game and play function
function play() {
    win = false;
    order = [];
    playerOrder = [];
    //number of times a color has flashed
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerText = 1;
    good = true;
    //set order of flashing lights, limit set at 
    //20 rounds, win game, get randomly and push order numbers to 
    //empty array
    for (let i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
        console.log(order)
    }
    //Computer starts game
    compTurn = true;
    //flashing lights interval set to 800 milliseconds
    //power off, clearInterval, tied to onButton
    //gameTurn flashes colors
    intervalId = setInterval(gameTurn, 800);
};

//gameTurn function
function gameTurn() {
    //while its computer's turn, can't click on button options
    on = false;
    //end computers turn
    if(flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        //player can now click buttons
        on = true;
    }
    //if its computer's turn
    if (compTurn) {
        clearColor();
        setTimeout(() => {
        if (order[flash] == 1) one();
        if (order[flash] == 2) two();
        if (order[flash] == 3) three();
        if (order[flash] == 4) four();
        flash++;
        }, 200);
    }
};

function one() {
    if (noise) {
        let audio = document.getElementById('clip1');
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = 'lightgreen';
};

function two() {
    if (noise) {
        let audio = document.getElementById('clip2');
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = 'tomato';
};

function three() {
    if (noise) {
        let audio = document.getElementById('clip3');
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = 'yellow';
};

function four() {
    if (noise) {
        let audio = document.getElementById('clip4');
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = 'lightskyblue';
};

function clearColor() {
    topLeft.style.backgroundColor = 'darkgreen';
    topRight.style.backgroundColor = 'darkred';
    bottomLeft.style.backgroundColor = 'goldenrod';
    bottomRight.style.backgroundColor = 'darkblue';
}

function flashColor() {
    topLeft.style.backgroundColor = 'lightgreen';
    topRight.style.backgroundColor = 'tomato';
    bottomLeft.style.backgroundColor = 'yellow';
    bottomRight.style.backgroundColor = 'lightskyblue';
}
//click buttons after computer turn
//populate playerOrder array
//to check if player clicked right

topLeft.addEventListener('click', (e) => {
    if(on) {
        playerOrder.push(1);
        check();
        one();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

topRight.addEventListener('click', (e) => {
    if(on) {
        playerOrder.push(2);
        check();
        two();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

bottomLeft.addEventListener('click', (e) => {
    if(on) {
        playerOrder.push(3);
        check();
        three();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

bottomRight.addEventListener('click', (e) => {
    if(on) {
        playerOrder.push(4);
        check();
        four();
        if(!win) {
            setTimeout(() => {
                clearColor();
            }, 300)
        }
    }
})

function check() {
    //playerOrder[playerOrder.length - 1] is the click of player
    //order[playerOrder.length - 1] is the real order
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length -1])
    good = false;

    if(playerOrder.length == 20 && good == true) {
        winGame();
    }
    
    if (good == false) {
        flashColor();
        turnCounter.innerText = 'No!';
        setTimeout(() => {
            turnCounter.innerText = turn;
            clearColor();

            if(strict) {
                play();
            } else {
               compTurn = true;
               flash = 0;
               playerOrder = [];
               good = true;
               intervalId = setInterval(gameTurn, 800);
            }
        }, 800); 
        noise = false;
    }
    if(turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerText = turn; 
        intervalId = setInterval(gameTurn, 800);
    }
}

function winGame() {
    flashColor();
    turnCounter.innerText = 'WIN!';
    on = false;
    win = true;
}