console.log('storage.js carregat');
function guardarTasques() {
    localStorage.setItem('tasquesKanban', JSON.stringify(tasques));
}

function carregarTasques() {
    const tasquesGuardades = localStorage.getItem('tasquesKanban');
    if (tasquesGuardades) {
        tasques = JSON.parse(tasquesGuardades);
    } else {
        // Dades de prova
        tasques = [
            {
                id: generarId(),
                titol: 'Dissenyar la interfície',
                descripcio: 'Crear el layout amb HTML i CSS',
                prioritat: 'alta',
                dataVenciment: '2026-05-20',
                estat: 'perFer'
            },
            {
                id: generarId(),
                titol: 'Implementar localStorage',
                descripcio: 'Desar i carregar tasques',
                prioritat: 'mitjana',
                dataVenciment: '2026-05-18',
                estat: 'enCurs'
            },
        ];
        guardarTasques();
    }
}