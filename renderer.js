  // --- Guardar Nueva Área ---
  const formNuevaArea = document.getElementById('form-nueva-area');
  const areasTbody = document.querySelector('#areas-content .tabla-areas tbody');

  async function cargarAreas() {
    try {
      // Asegurarse de que integrantes esté cargado antes de renderizar áreas
      if (!integrantes || integrantes.length === 0) {
        await cargarIntegrantes();
      }
      const res = await fetch('http://localhost:3001/areas');
      const areas = await res.json();
      renderAreas(areas);
    } catch (err) {
      if (areasTbody) areasTbody.innerHTML = '<tr><td colspan="5">Error al cargar áreas</td></tr>';
    }
  }

  function renderAreas(areas) {
    if (!areasTbody) return;
    areasTbody.innerHTML = '';
    areas.forEach(area => {
      let encargadoNombre = '';
      if (Array.isArray(integrantes) && integrantes.length > 0) {
        const encargado = integrantes.find(i => String(i.id) === String(area.encargado_id));
        encargadoNombre = encargado ? `${encargado.nombre} ${encargado.apellido1} ${encargado.apellido2}` : '';
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${area.id}</td>
        <td>${area.nombre}</td>
        <td>${encargadoNombre}</td>
        <td>${area.descripcion}</td>
        <td></td>
      `;
      areasTbody.appendChild(tr);
    });
  }

  if (formNuevaArea) {
    formNuevaArea.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nueva-area-nombre').value;
      const encargado_id = document.getElementById('nueva-area-encargado').value;
      const descripcion = document.getElementById('nueva-area-descripcion').value;
      try {
        await fetch('http://localhost:3001/areas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, encargado_id, descripcion })
        });
        document.getElementById('modal-nueva-area').classList.add('hidden');
        formNuevaArea.reset();
        await cargarAreas();
      } catch (err) {
        alert('Error al guardar área');
      }
    });
    cargarAreas();
  }
// Funcionalidad para los botones del mosaico y toda la lógica de la app
console.log('renderer.js cargado');
window.addEventListener('DOMContentLoaded', () => {
  // --- INTEGRANTES: Render dinámico, editar y borrar ---
  const integrantesTbody = document.querySelector('#integrantes-content .tabla-integrantes tbody');
  const formNuevoIntegrante = document.getElementById('form-nuevo-integrante');

  // --- INTEGRACIÓN REAL CON BACKEND ---
  let integrantes = [];

  async function cargarIntegrantes() {
    try {
      const res = await fetch('http://localhost:3001/integrantes');
      integrantes = await res.json();
      renderIntegrantes();
    } catch (err) {
      integrantesTbody.innerHTML = '<tr><td colspan="9">Error al cargar integrantes</td></tr>';
    }
  }

  function renderIntegrantes() {
    integrantesTbody.innerHTML = '';
    integrantes.forEach(integ => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${integ.id}</td>
        <td>${integ.nombre}</td>
        <td>${integ.apellido1}</td>
        <td>${integ.apellido2}</td>
        <td>${integ.semestre}</td>
        <td>${integ.carrera}</td>
        <td>${integ.celular}</td>
        <td>${integ.correo}</td>
        <td>
          <button class="btn-editar-integrante" data-id="${integ.id}">✏️</button>
          <button class="btn-borrar-integrante" data-id="${integ.id}">🗑️</button>
        </td>
      `;
      integrantesTbody.appendChild(tr);
    });
    // Asignar eventos a los botones
    document.querySelectorAll('.btn-editar-integrante').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(btn.dataset.id);
        abrirModalEditarIntegrante(id);
      });
    });
    document.querySelectorAll('.btn-borrar-integrante').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number(btn.dataset.id);
        borrarIntegrante(id);
      });
    });
  }

  function abrirModalEditarIntegrante(id) {
    const integ = integrantes.find(i => i.id === id);
    if (!integ) return;
    document.getElementById('nuevo-nombre').value = integ.nombre;
    document.getElementById('nuevo-apellido1').value = integ.apellido1;
    document.getElementById('nuevo-apellido2').value = integ.apellido2;
    document.getElementById('nuevo-semestre').value = integ.semestre;
    document.getElementById('nuevo-carrera').value = integ.carrera;
    document.getElementById('nuevo-celular').value = integ.celular;
    document.getElementById('nuevo-correo').value = integ.correo;
    formNuevoIntegrante.setAttribute('data-edit-id', id);
    document.getElementById('modal-nuevo-integrante').classList.remove('hidden');
  }

  async function borrarIntegrante(id) {
    if (confirm('¿Seguro que deseas borrar este integrante?')) {
      try {
        await fetch(`http://localhost:3001/integrantes/${id}`, { method: 'DELETE' });
        await cargarIntegrantes();
      } catch (err) {
        alert('Error al borrar integrante');
      }
    }
  }

  if (formNuevoIntegrante) {
    formNuevoIntegrante.addEventListener('submit', async (e) => {
      e.preventDefault();
      const idEdit = formNuevoIntegrante.getAttribute('data-edit-id');
      const nuevo = {
        nombre: document.getElementById('nuevo-nombre').value,
        apellido1: document.getElementById('nuevo-apellido1').value,
        apellido2: document.getElementById('nuevo-apellido2').value,
        semestre: document.getElementById('nuevo-semestre').value,
        carrera: document.getElementById('nuevo-carrera').value,
        celular: document.getElementById('nuevo-celular').value,
        correo: document.getElementById('nuevo-correo').value
      };
      if (idEdit) {
        // Editar existente
        try {
          await fetch(`http://localhost:3001/integrantes/${idEdit}`,
            { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nuevo) });
          formNuevoIntegrante.removeAttribute('data-edit-id');
          document.getElementById('modal-nuevo-integrante').classList.add('hidden');
          await cargarIntegrantes();
        } catch (err) {
          alert('Error al editar integrante');
        }
      } else {
        // Nuevo integrante
        try {
          await fetch('http://localhost:3001/integrantes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo)
          });
          document.getElementById('modal-nuevo-integrante').classList.add('hidden');
          await cargarIntegrantes();
        } catch (err) {
          alert('Error al dar de alta integrante');
        }
      }
    });
  }

  // Inicializar tabla al cargar
  if (integrantesTbody) cargarIntegrantes();

  // --- Botones del mosaico ---
  const eventosBtn = document.getElementById('eventos-btn');
  const limpiezaBtn = document.getElementById('limpieza-btn');

  if (eventosBtn) {
    eventosBtn.addEventListener('click', () => {
      window.location.href = 'eventos.html';
    });
  }

  if (limpiezaBtn) {
    limpiezaBtn.addEventListener('click', () => {
      window.location.href = 'limpieza.html';
    });
  }

  // Botón volver al dashboard en limpieza.html
  const volverDashboardBtn = document.getElementById('volver-dashboard');
  if (volverDashboardBtn) {
    volverDashboardBtn.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }

  // --- Modal login ---
  const loginIcon = document.querySelector('.header-login-icon');
  const loginModal = document.querySelector('.modal-login');
  const closeLoginModal = document.querySelector('.close-modal');
  const passwordInput = document.querySelector('.password-wrapper input[type="password"], .password-wrapper input[type="text"]');
  const togglePassword = document.querySelector('.toggle-password');

  if (loginIcon && loginModal) {
    loginIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      loginModal.classList.remove('hidden');
    });
  }
  if (closeLoginModal && loginModal) {
    closeLoginModal.addEventListener('click', () => {
      loginModal.classList.add('hidden');
    });
  }
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.classList.add('hidden');
      }
    });
  }

  // Mostrar/ocultar contraseña
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = '🙈';
      } else {
        passwordInput.type = 'password';
        togglePassword.textContent = '👁️';
      }
    });
  }

  // --- LOGIN INTEGRACIÓN BACKEND ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const usuario = document.getElementById('nombre').value;
      const contrasena = document.getElementById('password').value;
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuario, contrasena })
        });
        const data = await response.json();
        if (data.success) {
          sessionStorage.setItem('usuarioLogueado', 'true'); // Guardar sesión
          window.location.href = 'panel.html';
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } catch (err) {
        alert('Error de conexión con el servidor');
      }
    });
  }

  // --- Confirmar cierre de sesión ---
  const logoutBtn = document.querySelector('.header-logout-icon');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      const confirmar = confirm('¿Seguro que deseas cerrar la sesión?');
      if (confirmar) {
        sessionStorage.removeItem('usuarioLogueado');
        window.location.href = 'dashboard.html';
      } else {
        e.preventDefault();
      }
    });
  }

  // --- Modal Asignar Actividades ---
  const assignIcon = document.querySelector('.header-assign-icon');
  const assignModal = document.getElementById('modal-assign');
  const closeAssignModal = document.getElementById('close-assign-modal');

  if (assignIcon && assignModal) {
    assignIcon.addEventListener('click', () => {
      assignModal.classList.remove('hidden');
    });
  }
  if (closeAssignModal && assignModal) {
    closeAssignModal.addEventListener('click', () => {
      assignModal.classList.add('hidden');
    });
  }
  if (assignModal) {
    assignModal.addEventListener('click', (e) => {
      if (e.target === assignModal) {
        assignModal.classList.add('hidden');
      }
    });
  }

  // Mostrar formulario de limpieza si se selecciona 'limpieza'
  const seccionSelect = document.getElementById('seccion-select');
  const formLimpieza = document.getElementById('form-limpieza');
  const areaLimpieza = document.getElementById('area-limpieza');
  const assignBtn = document.querySelector('.assign-btn');

  // Llenar select de áreas en el formulario de limpieza
  const areasTableForAssign = document.querySelector('#areas-content .tabla-areas tbody');
  if (areaLimpieza && areasTableForAssign) {
    areaLimpieza.innerHTML = '';
    const areaNombres = Array.from(areasTableForAssign.querySelectorAll('tr')).map(tr => {
      const nombreTd = tr.querySelector('td:nth-child(2)');
      return nombreTd ? nombreTd.textContent.trim() : null;
    }).filter(Boolean);
    areaNombres.forEach((nombre, idx) => {
      const option = document.createElement('option');
      option.value = 'area' + (idx + 1);
      option.textContent = nombre;
      areaLimpieza.appendChild(option);
    });
  }

  if (seccionSelect && formLimpieza && assignBtn) {
    assignBtn.addEventListener('click', (e) => {
      if (seccionSelect.value === 'limpieza') {
        e.preventDefault();
        formLimpieza.classList.remove('hidden');
      } else {
        formLimpieza.classList.add('hidden');
      }
    });
    seccionSelect.addEventListener('change', () => {
      if (seccionSelect.value === 'limpieza') {
        formLimpieza.classList.remove('hidden');
      } else {
        formLimpieza.classList.add('hidden');
      }
    });
  }

  // --- Modal Nueva Área ---
  const btnNuevaArea = document.getElementById('btn-nueva-area');
  const modalNuevaArea = document.getElementById('modal-nueva-area');
  const closeNuevaAreaModal = document.getElementById('close-nueva-area-modal');

  if (btnNuevaArea && modalNuevaArea) {
    btnNuevaArea.addEventListener('click', () => {
      // Llenar select de encargados con integrantes
      const encargadoSelect = document.getElementById('nueva-area-encargado');
      if (encargadoSelect) {
        encargadoSelect.innerHTML = '<option value="">Selecciona un integrante</option>';
        integrantes.forEach(integ => {
          const option = document.createElement('option');
          option.value = integ.id;
          option.textContent = `${integ.nombre} ${integ.apellido1} ${integ.apellido2}`;
          encargadoSelect.appendChild(option);
        });
      }
      modalNuevaArea.classList.remove('hidden');
    });
  }
  if (closeNuevaAreaModal && modalNuevaArea) {
    closeNuevaAreaModal.addEventListener('click', () => {
      modalNuevaArea.classList.add('hidden');
    });
  }
  if (modalNuevaArea) {
    modalNuevaArea.addEventListener('click', (e) => {
      if (e.target === modalNuevaArea) {
        modalNuevaArea.classList.add('hidden');
      }
    });
  }

  // --- Modal Nuevo Integrante ---
  const btnNuevoIntegrante = document.getElementById('btn-nuevo-integrante');
  const modalNuevoIntegrante = document.getElementById('modal-nuevo-integrante');
  const closeNuevoIntegranteModal = document.getElementById('close-nuevo-integrante-modal');

  if (btnNuevoIntegrante && modalNuevoIntegrante) {
    btnNuevoIntegrante.addEventListener('click', () => {
      modalNuevoIntegrante.classList.remove('hidden');
    });
  }
  if (closeNuevoIntegranteModal && modalNuevoIntegrante) {
    closeNuevoIntegranteModal.addEventListener('click', () => {
      modalNuevoIntegrante.classList.add('hidden');
    });
  }
  if (modalNuevoIntegrante) {
    modalNuevoIntegrante.addEventListener('click', (e) => {
      if (e.target === modalNuevoIntegrante) {
        modalNuevoIntegrante.classList.add('hidden');
      }
    });
  }

  // --- Tabs en panel.html ---
  const panelTabs = document.querySelectorAll('.panel-tab');


  if (panelTabs.length > 0) {
    const tabContents = [
      document.getElementById('integrantes-content'),
      document.getElementById('areas-content'),
      document.getElementById('permisos-content'),
      document.getElementById('bd-content')
    ];

    panelTabs.forEach((tab, idx) => {
      if (idx === 0) {
        tab.classList.add('active');
        if (tabContents[idx]) tabContents[idx].classList.remove('hidden');
      } else {
        tab.classList.remove('active');
        if (tabContents[idx]) tabContents[idx].classList.add('hidden');
      }
      tab.addEventListener('click', () => {
        panelTabs.forEach((t, i) => {
          t.classList.remove('active');
          if (tabContents[i]) tabContents[i].classList.add('hidden');
        });
        tab.classList.add('active');
        if (tabContents[idx]) tabContents[idx].classList.remove('hidden');
        // Si es la pestaña de Áreas, cargar áreas
        if (tab.textContent.trim().toLowerCase().includes('área')) {
          cargarAreas();
        }
      });
    });
    // Cargar áreas al iniciar si la pestaña de Áreas está activa
    const activeTab = Array.from(panelTabs).find(tab => tab.classList.contains('active'));
    if (activeTab && activeTab.textContent.trim().toLowerCase().includes('área')) {
      cargarAreas();
    }

    // Generar dinámicamente los selects de áreas en permisos
    const areasTable = document.querySelector('#areas-content .tabla-areas tbody');
    if (areasTable) {
      const areaNombres = Array.from(areasTable.querySelectorAll('tr')).map(tr => {
        const nombreTd = tr.querySelector('td:nth-child(2)');
        return nombreTd ? nombreTd.textContent.trim() : null;
      }).filter(Boolean);

      const selectEvento = document.getElementById('select-evento-area');
      const selectLimpieza = document.getElementById('select-limpieza-area');
      const selectPanel = document.getElementById('select-panel-area');

      [selectEvento, selectLimpieza, selectPanel].forEach(select => {
        if (select) {
          select.innerHTML = '';
          areaNombres.forEach((nombre, idx) => {
            const option = document.createElement('option');
            option.value = 'area' + (idx + 1);
            option.textContent = nombre;
            select.appendChild(option);
          });
        }
      });
    }
  }

  // Protección de acceso: solo usuarios logueados pueden ver el panel
  // Solo aplicar esto si estamos en panel.html
  if (window.location.pathname.endsWith('panel.html')) {
    if (!sessionStorage.getItem('usuarioLogueado')) {
      window.location.href = 'dashboard.html';
    }
  }

});