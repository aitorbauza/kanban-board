function renderitzarTauler() {
    // Aplicam filtres abans de pintar
    const tasquesFiltrades = getTasquesFiltrades();
    
    // Buidam les columnes
    document.getElementById('perFerList').innerHTML = '';
    document.getElementById('enCursList').innerHTML = '';
    document.getElementById('fetList').innerHTML = '';

    // Pintam cada tasca filtrada a la seva columna
    tasquesFiltrades.forEach(tasca => {
        const tascaElement = crearTargetaTasca(tasca);
        
        if (tasca.estat === 'perFer') {
            document.getElementById('perFerList').appendChild(tascaElement);
        } else if (tasca.estat === 'enCurs') {
            document.getElementById('enCursList').appendChild(tascaElement);
        } else if (tasca.estat === 'fet') {
            document.getElementById('fetList').appendChild(tascaElement);
        }
    });
    
    // Actualitzam estadístiques després de renderitzar
    actualitzarEstadistiques();
}

function getTasquesFiltrades() {
    let resultat = [...tasques];
    
    // Per estat
    if (filtres.estat !== 'totes') {
        resultat = resultat.filter(t => t.estat === filtres.estat);
    }
    
    // Per prioritat
    if (filtres.prioritat !== 'totes') {
        resultat = resultat.filter(t => t.prioritat === filtres.prioritat);
    }
    
    // Per text (títol o descripció)
    if (filtres.cerca !== '') {
        const cercaLower = filtres.cerca.toLowerCase();
        resultat = resultat.filter(t => 
            t.titol.toLowerCase().includes(cercaLower) || 
            (t.descripcio && t.descripcio.toLowerCase().includes(cercaLower))
        );
    }
    
    return resultat;
}

function actualitzarEstadistiques() {
    const total = tasques.length;
    const perFer = tasques.filter(t => t.estat === 'perFer').length;
    const enCurs = tasques.filter(t => t.estat === 'enCurs').length;
    const fet = tasques.filter(t => t.estat === 'fet').length;
    const percentatge = total === 0 ? 0 : Math.round((fet / total) * 100);
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('perFerCount').textContent = perFer;
    document.getElementById('enCursCount').textContent = enCurs;
    document.getElementById('fetCount').textContent = fet;
    document.getElementById('percentCompletat').textContent = percentatge;
}

function crearTargetaTasca(tasca) {
    const div = document.createElement('div');
    div.className = `task-card prioritat-${tasca.prioritat}`;
    div.style.backgroundColor = getPrioritatColor(tasca.prioritat);
    div.style.padding = '10px';
    div.style.margin = '10px 0';
    div.style.borderRadius = '8px';
    div.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      
    div.innerHTML = `
        <h4>${escapeHtml(tasca.titol)}</h4>
        <p>${escapeHtml(tasca.descripcio) || 'Sense descripció'}</p>
        <small>📅 ${tasca.dataVenciment || 'Sense data'}</small>
        <br>
        <small>🏷️ Prioritat: ${tasca.prioritat}</small>
        <div style="margin-top: 10px;">
            <button class="edit-btn" data-id="${tasca.id}">✏️ Editar</button>
            <button class="delete-btn" data-id="${tasca.id}">🗑️ Eliminar</button>
            <select class="change-status" data-id="${tasca.id}">
                <option value="perFer" ${tasca.estat === 'perFer' ? 'selected' : ''}>Per fer</option>
                <option value="enCurs" ${tasca.estat === 'enCurs' ? 'selected' : ''}>En curs</option>
                <option value="fet" ${tasca.estat === 'fet' ? 'selected' : ''}>Fet</option>
            </select>
        </div>
    `;
    
    return div;
}

function getPrioritatColor(prioritat) {
    switch(prioritat) {
        case 'alta': return '#ffcccc';
        case 'mitjana': return '#fff3cc';
        case 'baixa': return '#ccffcc';
        default: return 'white';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function netejarFormulari() {
    document.getElementById('title').value = '';
    document.getElementById('desc').value = '';
    document.getElementById('priority').value = 'baixa';
    document.getElementById('date').value = '';
    editantId = null;
    const submitBtn = document.querySelector('#taskForm button[type="submit"]');
    submitBtn.textContent = 'Crear tasca';
    document.getElementById('cancelEdit').style.display = 'none';
}

function omplirFormulariPerEditar(tasca) {
    document.getElementById('title').value = tasca.titol;
    document.getElementById('desc').value = tasca.descripcio;
    document.getElementById('priority').value = tasca.prioritat;
    document.getElementById('date').value = tasca.dataVenciment || '';
    editantId = tasca.id;
    const submitBtn = document.querySelector('#taskForm button[type="submit"]');
    submitBtn.textContent = 'Guardar canvis';
    document.getElementById('cancelEdit').style.display = 'inline-block';
}