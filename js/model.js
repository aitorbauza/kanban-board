console.log('model.js carregat');
let tasques = [];
let editantId = null;

let filtres = {estat: 'totes', prioritat: 'totes', cerca: ''};

// Generam un id únic per a cada tasca
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}