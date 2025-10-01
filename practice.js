let btn = document.querySelectorAll(".box");
let rst = document.querySelector(".new");//new game
let msg = document.querySelector(".msg");
let scrSet = document.querySelector(".newSet"); //reset score
let rondNum = document.querySelector(".roundNo");
let shwWin = document.getElementById("showWin");//show who wins

let scoreX = 0;
let scoreO = 0;
let roundNum = 0;



let numX = document.querySelector(".digX");
let numO = document.querySelector(".digO");
let sec = document.querySelector(".sec");


let sound = new Audio("do.mp3")
let winSound = new Audio("win.mp3");
let change = new Audio("error.mp3");
let turnO = true;



roundNum++;
rondNum.innerText = roundNum;
// display which player turn is?
msg.innerText = "Turn O";

function toggle() {
    if (turnO) {
        msg.innerText = "Turn O";
    } else {
        msg.innerText = "Turn X";
    }
}
btn.forEach((done) => {

    done.addEventListener("click", () => {

        if (turnO) {

            sound.play();
            done.innerText = "O"
            turnO = false;
            clearInterval(oStratInterval);
            O_time.innerText = "00";

            xStartTime();

        }
        else {

            sound.play();
            done.innerText = "X"
            turnO = true;
            clearInterval(xStartInterval);
            X_time.innerText = "00";

            oStartTime();

        }

        check();
        done.disabled = true;

    });
});

function newGame() {
    toggle();
    btn.forEach((done) => {
        done.innerText = ""
        done.disabled = false;

        clearInterval(oStratInterval);
        O_time.innerText = "00";
        clearInterval(xStartInterval);
        X_time.innerText = "00";
    });
    roundNum++;
    rondNum.innerText = roundNum;
};

scrSet.addEventListener("click", () => {
    numO.innerText = ""
    numX.innerText = ""
    scoreO = 0;
    scoreX = 0;
    rondNum.innerText = ""
    roundNum = 1;
    rondNum.innerText = roundNum;
});

const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const print = (val1) => {


    if (val1 === "X") {
        scoreX++;
        numX.innerText = scoreX;
    } else if (val1 === "O") {
        scoreO++;
        numO.innerText = scoreO;
    }
}

const dis = () => {
    for (let bo of btn) {
        bo.disabled = true;
    }
}

const check = () => {
    for (let ch of win) {
        let val1 = btn[ch[0]].innerText
        let val2 = btn[ch[1]].innerText
        let val3 = btn[ch[2]].innerText

        if (val1 != "" && val2 != "" && val3 != "") {
            if (val1 === val2 && val2 === val3) {
                clearInterval(oStratInterval);
                clearInterval(xStartInterval);
                console.log("winner", val1)
                showMessage(val1);
                print(val1);
                dis();
                winSound.play();
            }


        }
    };
    // display draw!
    let filled = 0;
    btn.forEach((done) => {
        if (done.innerText !== "")
            filled++;
    });
    if (filled === 9) {
        winSound.play();
        showMessage();
        shwWin.innerText = "It's a draw!"
    }
};

// timer
let set_time_x = 10;
let set_time_o = 10;
let X_time = document.getElementById("x-time");
let O_time = document.getElementById("o-time");
let xStartInterval, oStratInterval;

function xStartTime() {
    clearInterval(oStratInterval);
    set_time_x = 10;
    X_time.classList.remove("colour");
    X_time.innerText = set_time_x;
msg.innerText="Turn X"
    xStartInterval = setInterval(() => {


        set_time_x--;
        X_time.innerText = set_time_x;



        if (set_time_x <= 0) {
            change.play();
            clearInterval(xStartInterval);
            X_time.innerText = "00";
            X_time.classList.add("colour");
            turnO = true;
            oStartTime();
        }
    }, 1000);
}

function oStartTime() {
    clearInterval(xStartInterval);
    set_time_o = 10;
    O_time.classList.remove("colour");
    O_time.innerText = set_time_o;
msg.innerText="Turn O"
    oStratInterval = setInterval(() => {


        set_time_o--;
        O_time.innerText = set_time_o;


        if (set_time_o <= 0) {
            change.play();
            clearInterval(oStratInterval);
            O_time.innerText = "00";
            O_time.classList.add("colour");
            turnO = false;

            xStartTime();
        }
    }, 1000);
}

// pop msg

function showMessage(val1) {
    document.getElementById("popMsg").style.display = 'flex';

    shwWin.innerText = `${val1} wins!`
    document.querySelector(".wrap").classList.add("blur");
};
function hideMessage() {
    document.getElementById("popMsg").style.display = 'none';
    document.querySelector(".wrap").classList.remove("blur");
};

