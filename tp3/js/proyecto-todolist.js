document.addEventListener('DOMContentLoaded', () => {
    const DB_NAME = 'PortfolioDB';
    const STORE_NAME = 'tareas';
    let db;

    function initDB() {
        const request = indexedDB.open(DB_NAME, 1);

        request.onerror = (event) => {
            console.error('Error al abrir IndexedDB:', event.target.errorCode);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            db = event.target.result;
            renderTareas();
        };
    }

    const form = document.getElementById('form-tarea');
    const input = document.getElementById('input-tarea');
    const lista = document.getElementById('lista-tareas');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const texto = input.value.trim();
        if (texto) {
            agregarTarea(texto);
            input.value = '';
            input.focus();
        }
    });

    function agregarTarea(texto) {
        if (!db) return;
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const tarea = { texto: texto, completada: false, fecha: new Date() };
        const request = store.add(tarea);

        request.onsuccess = () => {
            renderTareas();
        };
        request.onerror = (event) => {
            console.error('Error al agregar tarea:', event.target.error);
        };
    }

    function renderTareas() {
        if (!db) return;
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            lista.innerHTML = '';
            const tareas = request.result;
            if (tareas.length === 0) {
                lista.innerHTML = `<li class="tarea-item-empty">No hay tareas pendientes.</li>`;
            } else {
                tareas.forEach(tarea => {
                    const li = document.createElement('li');
                    li.className = `tarea-item ${tarea.completada ? 'completada' : ''}`;
                    li.dataset.id = tarea.id;

                    li.innerHTML = `
                        <input type="checkbox" class="completar" ${tarea.completada ? 'checked' : ''}>
                        <span class="tarea-texto">${tarea.texto}</span>
                        <div class="acciones">
                            <button class="btn-accion eliminar" title="Eliminar Tarea">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </button>
                        </div>
                    `;
                    lista.appendChild(li);
                });
            }
        };
    }

    lista.addEventListener('click', (e) => {
        const id = e.target.closest('.tarea-item')?.dataset.id;
        if (!id) return;

        if (e.target.classList.contains('completar')) {
            toggleCompletada(parseInt(id, 10));
        } else if (e.target.closest('.eliminar')) {
            eliminarTarea(parseInt(id, 10));
        }
    });

    function toggleCompletada(id) {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
            const tarea = request.result;
            tarea.completada = !tarea.completada;
            store.put(tarea).onsuccess = renderTareas;
        };
    }

    function eliminarTarea(id) {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        store.delete(id).onsuccess = renderTareas;
    }

    initDB();
});
