function afegirTasca(tasca) {
    tasques.push(tasca);
    guardarTasques();
    renderitzarTauler();
}

function actualitzarTasca(id, novesDades) {
    const index = tasques.findIndex(t => t.id === id);
    if (index !== -1) {
        tasques[index] = { ...tasques[index], ...novesDades };
        guardarTasques();
        renderitzarTauler();
    }
}

function eliminarTasca(id) {
    if (confirm('Segur que vols eliminar aquesta tasca?')) {
        tasques = tasques.filter(t => t.id !== id);
        guardarTasques();
        renderitzarTauler();
    }
}

function canviarEstatTasca(id, nouEstat) {
    actualitzarTasca(id, { estat: nouEstat });
}