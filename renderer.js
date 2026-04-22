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
				if (tabContents[idx]) tabContents[idx].style.display = '';
			} else {
				tab.classList.remove('active');
				if (tabContents[idx]) tabContents[idx].style.display = 'none';
			}
			tab.addEventListener('click', () => {
				panelTabs.forEach((t, i) => {
					t.classList.remove('active');
					if (tabContents[i]) tabContents[i].style.display = 'none';
				});
				tab.classList.add('active');
				if (tabContents[idx]) tabContents[idx].style.display = '';
			});
		});
	}
});
