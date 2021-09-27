function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * ((max + 1) - min) + min);
}

function getCategory(n) {
    let category;

    switch (n) {
        case 0:
            category = 'Animal'
            break
        
        case 1:
            category = 'Comida'
            break

        case 2:
            category = 'Marca'
            break
    }

    return category
}

function fetchApi(url) {
    return fetch(url)
}

function getJSONResponse(res) {
    return res.json()
}

async function ibgeApi() {

    try {
        // definindo a URL da API IBGE
        const ibgeUrl = 'https://servicodados.ibge.gov.br/api/v1/paises/'

        // pegando o conteúdo da API no formato JSON
        const api = await fetchApi(ibgeUrl)
        const response = await getJSONResponse(api)

        return response
    } catch (error) {
        return false
    }
}

// Creating the data base
const WORDS = [
    ['leao', 'gato', 'cachorro', 'tigre'], // animal
    ['macarrao', 'carne', 'frango', 'peixe'], // food
    ['apple', 'mercedes', 'tesla', 'coca-cola'], // brand
];

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

function game() {

    // choosing category and word randomly
    const CATEGORY_NUMBER = generateRandomNumber(0, WORDS.length);
    const WORD_NUMBER = generateRandomNumber(0, WORDS[CATEGORY_NUMBER].length);

    // getting category
    let category = getCategory(CATEGORY_NUMBER);

    // getting the word for the game
    const WORD = WORDS[CATEGORY_NUMBER][WORD_NUMBER].split('');

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

            hint = prompt(`Categoria: ${category}\nVidas: ${lifes.join(' ')}\nLetras chutadas: ${hintedWords.join(', ')}\n${gallowsDisplay[displayController]}\nPalavra: ${underlines.join(' ')}\n\n${msg}Informe seu chute:`).trim()

        } while (hintedWords.find(x => x == hint) || hint.length != 1 || !alphabet.find(x => x == hint.toUpperCase()))

        // put the letter into the array
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
            alert('Você venceu!')
            break
        }

    }

    // defeat
    if (lifes.length == 0) alert(`Você perdeu!\n${gallowsDisplay[displayController]}`)
}

// play
game();

while (true) {
    
    let answer = prompt('Deseja jogar novamente? (S/N)').trim().toUpperCase()[0]

    if (answer == 'N') break;
    else if (answer == 'S') game();
    else continue;

}
