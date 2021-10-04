// Precisa fazer uso de uma abordagem cliente/servidor
// Eu fiz utilizando a própria extensão Live Server do VSCode
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();

    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'characters.json', true);

    xobj.onreadystatechange = function () {

        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }

    };

    xobj.send(null);  

}

function len(word) {
    if (word === '') return 0;

    return 1 + len(word.substr(1));
}

loadJSON((res) => {

    // todos os personagens presentes no arquivo characters.json
    const characters = JSON.parse(res);

    // utilização do filter()
    const akatsukiMembers = characters.filter(e => e.cla === 'Akatsuki');

    // utilização do map()
    akatsukiMembers.map(e => e.isDead = true);
    characters.map(e => e.nameLength = len(e.name));

    // utilização do reduce()
    const akatsukiNames = akatsukiMembers.reduce((array, elem) => [...array, elem.name], []);

    // utilização do this
    function list(i) {
        console.log(`#${i} ${this.name} - ${this.cla}`);
    }

    // função utilizando prototype do Array
    Array.prototype.myForEach = function (callback) {
        for (let i = 0; i < this.length; i++) callback(this[i], i, this);
    };

    characters.myForEach((e, i) => list.call(e, i + 1));

    console.log(`Characters: ${(characters.every(e => e.isDead)) ? 'All dead' : 'Not all dead'}`);
    console.log(`Akatsuki Members: ${(akatsukiMembers.every(e => e.isDead)) ? 'All dead' : 'Not all dead'}`);

});
