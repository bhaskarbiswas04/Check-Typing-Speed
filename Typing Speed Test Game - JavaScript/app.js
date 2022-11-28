const typingText = document.querySelector(".typing-text p");
inpField = document.querySelector(".wrapper .input-field");

const mistakesCount = document.querySelector(".mistakes span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainBtn = document.querySelector(".btn");

let timer, maxTime = 60, timeLeft = maxTime, charIndex = isTyping = mistakes = 0;

//Function to get a random paragraph from the Paragraphs array.
function randParagraph() {
    //Getting random number and it will always be less than the paragraphs length.
    const randIndex = Math.floor(Math.random() * paragraphs.length);

    typingText.innerHTML = "";

    //Getting random item from the paragraphs array, splitting all characters of it, adding into a span and then adding the span inside the p tag.
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");

    document.addEventListener("keydown", () => inpField.focus()); //Focus() set the element as a active element in the current document
    typingText.addEventListener("click", () => inpField.focus());
}

//Function to play the game.
function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if ((charIndex < characters.length - 1) && timeLeft > 0) {
        //Once the timer Starts it won't restart again.
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }

        //If user hasn't entered any character or pressed backspace.
        if (typedChar == null) {
            charIndex--;

            //Decrement the mistakes only if the span contains the class incorrect.
            if (characters[charIndex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        } else {
            //If the user typed character and shown character matches then add the correct class or else add the incorrect class.
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                characters[charIndex].classList.add("incorrect");
                mistakes++;
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        mistakesCount.innerText = mistakes;
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60); // 5 indicates - 5 charecters = 1 word.
        //If wpm value is 0, empty or Infinite then setting its value to 0;
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; //cpm will not count mistakes.
    } else {
        inpField.value = "";
        clearInterval(timer);
    }
}


function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    randParagraph();
    inpField.value = "";
    clearInterval(timer)
    timeLeft = maxTime,
    charIndex = isTyping = mistakes = 0;
    timeTag.innerText = maxTime;
    mistakesCount.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

}

randParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);
