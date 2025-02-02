let isReverseMode = false; 
let hiraganaData = []; 
let currentCharacter = null; 
let currentRomanization = null;

async function loadHiraganaData() {
    try {
        const response = await fetch('../data/hiragana.json');
        const data = await response.json();
        hiraganaData = data.hiragana;
        loadNewCharacter();
    } catch (error) {
        console.error('Error cargando el JSON:', error);
    }
}

function getRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * hiraganaData.length);
    return hiraganaData[randomIndex];
}

function updateUI() {
    const characterElement = document.getElementById("character");
    const answerInput = document.getElementById("answer");
    const toggleButton = document.getElementById("toggle-mode");

    if (isReverseMode) {
        // Modo Reverse: Mostrar la romanización y pedir el carácter
        characterElement.textContent = currentRomanization;
        answerInput.placeholder = "Escribe el carácter en japonés";
    } else {
        // Modo Normal: Mostrar el carácter y pedir la romanización
        characterElement.textContent = currentCharacter;
        answerInput.placeholder = "Escribe la romanización";
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const resultElement = document.getElementById("result");

    if (isReverseMode) {
        // Modo Reverse: Comparar con el carácter en japonés
        if (userAnswer === currentCharacter) {
            resultElement.textContent = "¡Correcto!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Incorrecto. La respuesta correcta es: ${currentCharacter}`;
            resultElement.style.color = "red";
        }
    } else {
        // Modo Normal: Comparar con la romanización
        if (userAnswer === currentRomanization) {
            resultElement.textContent = "¡Correcto!";
            resultElement.style.color = "green";
        } else {
            resultElement.textContent = `Incorrecto. La respuesta correcta es: ${currentRomanization}`;
            resultElement.style.color = "red";
        }
    }

    document.getElementById("answer").value = "";
    loadNewCharacter();
}

function loadNewCharacter() {
    const randomChar = getRandomCharacter();
    currentCharacter = randomChar.character;
    currentRomanization = randomChar.romanization;
    updateUI();
}

document.getElementById("toggle-mode").addEventListener("click", () => {
    isReverseMode = !isReverseMode;
    updateUI();
});

document.getElementById("check").addEventListener("click", checkAnswer);

loadHiraganaData();