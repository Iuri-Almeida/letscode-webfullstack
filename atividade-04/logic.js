// Precisa fazer uso de uma abordagem cliente/servidor
// Eu fiz utilizando a própria extensão Live Server do VSCode
function loadJSON(callback) {

    let xmlHttpRequest = new XMLHttpRequest();

    xmlHttpRequest.overrideMimeType("application/json");
    xmlHttpRequest.open('GET', 'characters.json', true);

    xmlHttpRequest.onreadystatechange = () => { if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") callback(xmlHttpRequest.responseText); };

    xmlHttpRequest.send(null);  

}

function len(word) { return (word === '') ? 0 : 1 + len(word.substr(1)); }

loadJSON(res => {

    // todos os personagens presentes no arquivo characters.json
    const characters = JSON.parse(res);

    // utilização do filter()
    const akatsukiMembers = characters.filter(e => e.cla === 'Akatsuki');

    // utilização do map()
    akatsukiMembers.map(e => e.isDead = true);
    characters.map(e => e.nameLength = len(e.name));

    // utilização do reduce() e spread operator
    const akatsukiNames = akatsukiMembers.reduce((array, elem) => [...array, elem.name], []);

    // utilização do this
    function list(i) { console.log(`#${i} ${this.name} - ${this.cla}`); }

    // função utilizando prototype do Array
    Array.prototype.myForEach = function (callback) { for (let i = 0; i < this.length; i++) callback(this[i], i, this); };

    console.log('*** Listando o JSON ***');
    characters.myForEach((e, i) => list.call(e, i + 1));

    console.log('');
    console.log('*** Usando funções de alta ordem ***');
    console.log(`Akatsuki Members: ${(akatsukiMembers.every(e => e.isDead)) ? 'All dead' : 'Not all dead'}`);
    console.log(`Busca Naruto: ${characters.find(e => e.name == "Naruto").name} - ${characters.find(e => e.name == "Naruto").cla}`);

});
