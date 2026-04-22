	// Mostrar/ocultar contraseña en el modal de login
	const passwordInput = document.getElementById('password');
	const togglePassword = document.getElementById('toggle-password');
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
// Modal de inicio de sesión universal para todas las vistas
window.addEventListener('DOMContentLoaded', () => {
		// Modal Asignar Actividades: mostrar formulario de limpieza si se selecciona 'limpieza'
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
				option.value = 'area' + (idx+1);
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
	// Modal login
	const loginIcon = document.querySelector('.header-login-icon');
	const loginModal = document.querySelector('.modal-login');
	const closeLoginModal = document.querySelector('.close-modal');
	const passwordInput = document.querySelector('.password-wrapper input[type="password"], .password-wrapper input[type="text"]');
	const togglePassword = document.querySelector('.toggle-password');

	if (loginIcon && loginModal) {
		loginIcon.addEventListener('click', () => {
			loginModal.classList.remove('hidden');
		});
	}
	if (closeLoginModal && loginModal) {
		closeLoginModal.addEventListener('click', () => {
			loginModal.classList.add('hidden');
		});
	}
	// Cerrar modal al hacer click fuera del contenido
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
});
// Funcionalidad para los botones del mosaico
window.addEventListener('DOMContentLoaded', () => {
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

	// Tabs en panel.html
	const panelTabs = document.querySelectorAll('.panel-tab');

	// Modal Asignar Actividades
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

	if (panelTabs.length > 0) {
		// Siempre seleccionar Integrantes por defecto y mostrar solo su contenido
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
			});
		});

		// Generar dinámicamente los selects de áreas en permisos
		const areasTable = document.querySelector('#areas-content .tabla-areas tbody');
		if (areasTable) {
			const areaNombres = Array.from(areasTable.querySelectorAll('tr')).map(tr => {
				const nombreTd = tr.querySelector('td:nth-child(2)');
				return nombreTd ? nombreTd.textContent.trim() : null;
			}).filter(Boolean);
			// Poblar selects de áreas para permisos
			const selectEvento = document.getElementById('select-evento-area');
			const selectLimpieza = document.getElementById('select-limpieza-area');
			const selectPanel = document.getElementById('select-panel-area');
			[selectEvento, selectLimpieza, selectPanel].forEach(select => {
				if (select) {
					select.innerHTML = '';
					areaNombres.forEach((nombre, idx) => {
						const option = document.createElement('option');
						option.value = 'area' + (idx+1);
						option.textContent = nombre;
						select.appendChild(option);
					});
				}
			});
		}
	}
});
