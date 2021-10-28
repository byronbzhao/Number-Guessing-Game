const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

///START RECOGNITION AND GAME
recognition.start();

///CAPTURE USER SPEECH
function onSpeak(e) {
    const msg = e.results[0][0].transcript

    writeMessage(msg);
    checkNumber(msg);
}


///TWRITE MWHAT USER SPEAKS INTO DOM
function writeMessage(msg) {
    msgEl.innerHTML = `
            <div>You said: </div>
                <span class="box">${msg}</span>
    `;
}

///CHECK MESSAGE AGAINST NUMBER
function checkNumber(msg) {
    const num = +msg;

    //Check if its a valid number 
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid  number</div>';
        return
    }

    //Check in in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    //Check number if correct
    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>CONGRATULATIONS YOU HAVE GUESSED THE NUMBER! <br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER</div>'
    }else {
        msgEl.innerHTML += '<div>GO HIGHER</div>'
    }
}


///GENERATE RANDOM NUMBER
function getRandomNumber() {
    return Math.floor(Math.random() * 100) +1
}


///SPEAK RESULT
recognition.addEventListener('result', onSpeak);

//END Speech Recognition SERVICE
recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})