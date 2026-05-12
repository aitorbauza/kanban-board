function setupEventListeners() {
    // Formulari
    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const titol = document.getElementById('title').value.trim();
        if (!titol) {
            alert('El títol és obligatori');
            return;
        }
        
        const novaTasca = {
            id: editantId || generarId(),
            titol: titol,
            descripcio: document.getElementById('desc').value,
            prioritat: document.getElementById('priority').value,
            dataVenciment: document.getElementById('date').value,
            estat: 'perFer'
        };
        
        if (editantId) {
            actualitzarTasca(editantId, novaTasca);
        } else {
            afegirTasca(novaTasca);
        }
        
        netejarFormulari();
    });
    
    document.getElementById('cancelEdit').addEventListener('click', () => {
        netejarFormulari();
    });
    
    // Delegació d'esdeveniments per botons dinàmics
    document.querySelector('.kanban').addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');
        
        if (editBtn) {
            const id = editBtn.dataset.id;
            const tasca = tasques.find(t => t.id === id);
            if (tasca) omplirFormulariPerEditar(tasca);
        }
        
        if (deleteBtn) {
            const id = deleteBtn.dataset.id;
            eliminarTasca(id);
        }
    });
    
    // Canvi d'estat
    document.querySelector('.kanban').addEventListener('change', (e) => {
        const statusSelect = e.target.closest('.change-status');
        if (statusSelect) {
            const id = statusSelect.dataset.id;
            const nouEstat = statusSelect.value;
            canviarEstatTasca(id, nouEstat);
        }
    });
    
    // Per estat
    document.getElementById('filterStatus').addEventListener('change', (e) => {
        filtres.estat = e.target.value;
        renderitzarTauler();
    });
    
    // Per prioritat
    document.getElementById('filterPriority').addEventListener('change', (e) => {
        filtres.prioritat = e.target.value;
        renderitzarTauler();
    });
    
    // Per text
    document.getElementById('search').addEventListener('input', (e) => {
        filtres.cerca = e.target.value;
        renderitzarTauler();
    });

    const columns = document.querySelectorAll('.column');
    
    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });
        
        column.addEventListener('drop', (e) => {
            e.preventDefault();
            
            if (draggedTaskId === null) return;
        
            const nouEstat = column.getAttribute('data-status');
            // Canviar l'estat de la tasca
            canviarEstatTasca(draggedTaskId, nouEstat);
            
            draggedTaskId = null;
        });
    });
}