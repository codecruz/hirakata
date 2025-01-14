let hiraganaData = [];
let currentCharacter = null;

// Elementos del DOM
const characterElement = document.getElementById('character');
const answerInput = document.getElementById('answer');
const checkButton = document.getElementById('check');
const resultElement = document.getElementById('result');

fetch('../data/hiragana.json')
    .then(response => response.json())
    .then(data => {
        hiraganaData = data.hiragana;
        showRandomCharacter(); 
    })
    .catch(error => console.error('Error cargando el JSON:', error));

function showRandomCharacter() {
    const randomIndex = Math.floor(Math.random() * hiraganaData.length);
    currentCharacter = hiraganaData[randomIndex];
    characterElement.textContent = currentCharacter.character;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentCharacter.romanization;

    if (userAnswer === correctAnswer) {
        resultElement.textContent = '¡Correcto! 🎉';
        resultElement.style.color = 'green';
        showRandomCharacter(); // Mostrar un nuevo carácter aleatorio
    } else {
        resultElement.textContent = `Incorrecto. La respuesta correcta es "${correctAnswer}". ❌`;
        resultElement.style.color = 'red';
    }

    // Limpiar el campo de entrada
    answerInput.value = '';
}

// Eventos
checkButton.addEventListener('click', checkAnswer);
answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});