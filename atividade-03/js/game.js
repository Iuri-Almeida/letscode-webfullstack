// 
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

async function fetchApi(url) {

    try {

        let response = await fetch(url);
        let data = await response.json();

        return data;
    } catch (error) {

        console.error(error);
        return null;

    }

}

// setting the API URL
const IBGE_URL = 'https://servicodados.ibge.gov.br/api/v1/paises/';

// gallows
const gallowsDisplay = [
    `_______           
|
|
|
|
|   
|
`, 
`_______           
|
|          😁
|    
|  
|   
|
`, 
`_______           
|
|         🤨
|         /|\\
|   
| 
|
`, 
`_______           
|
|         😮
|         /|\\
|          |
|  
| 
`, 
`_______           
|
|         😲
|         /|\\
|          |
|         / \\
|
`,
`_______           
|
|         💀
|         /|\\
|          |
|         / \\
|
`
]

// getting the alphabet (https://javascript.plainenglish.io/create-an-array-of-alphabet-characters-in-javascript-with-this-simple-trick-930033079dd3)
const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

async function game() {

    // getting the API data
    let data = await fetchApi(IBGE_URL);

    const WORD_NUMBER = generateRandomNumber(0, data.length);

    // getting category
    let category = data[WORD_NUMBER].localizacao.regiao.nome;

    // getting the word for the game
    let WORD = data[WORD_NUMBER].nome.abreviado.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").split('');
    
    // setting variables
    let lifes = ['❤', '❤', '❤', '❤', '❤'];
    let displayController = 0;
    let hintedWords = [];
    let hits = 0;

    // setting the display
    let underlines = [];
    for (let i = 0; i < WORD.length; i++) {
        
        if (WORD[i] === ' ' || WORD[i] === '-') {
            underlines.push(WORD[i]);
            hits++;
        } else underlines.push('_');

    }

    // starting the game
    while (lifes.length != 0) {

        // getting user hint
        let hint;
        do {
            let msg;

            if (!hint) msg = ''
            else if (hintedWords.find(x => x == hint)) msg = 'Esta letra já foi escolhida. '
            else if (hint.length != 1) msg = 'É preciso digitar somente uma única letra. '
            else if (!alphabet.find(x => x == hint)) msg = 'O que foi digitado não é uma string. '

            hint = prompt(`Localização: ${category}\nVidas: ${lifes.join(' ')}\nLetras chutadas: ${hintedWords.join(', ')}\n${gallowsDisplay[displayController]}\nPalavra: ${underlines.join(' ')}\n\n${msg}Informe seu chute:`).trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        } while (hintedWords.find(x => x == hint) || hint.length != 1 || !alphabet.find(x => x == hint.toUpperCase()))

        // put the letter into the hinted array
        hintedWords.push(hint);

        // check if it is one of the letters of the word
        if (WORD.find(x => x == hint)) {

            WORD.forEach((e, i) => {
                if (e == hint) {
                    underlines[i] = e;
                    hits++
                }
            })

        } else {
            displayController++
            lifes.pop()
        }

        // victory
        if (hits == WORD.length) {
            alert(`Você venceu! Você acertou a palavra: ${WORD.join('').toUpperCase()}`);
            break
        }

    }

    // defeat
    if (lifes.length == 0) alert(`Você perdeu!\n${gallowsDisplay[displayController]}\nA palavra era: ${WORD.join('').toUpperCase()}`)
}

async function playAgain() {
    while (true) {
    
        let answer = prompt('Deseja jogar novamente? (S/N)').trim().toUpperCase()[0]
    
        if (answer == 'N') break;
        else if (answer == 'S') await game();
        else continue;
    
    }
}

// play
game().then(() => playAgain())
