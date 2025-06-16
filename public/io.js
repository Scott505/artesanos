function registrarUsuario(socket, user) {
  if (user && user.id_perfil) {
    socket.emit('registrar-usuario', user.id_perfil);
  }
}

function manejarNuevaSolicitud(data) {
  const solicitudesBtn = document.querySelector('a[href="/seguidores/solicitudes"]');
  if (solicitudesBtn) {
    let contador = solicitudesBtn.querySelector('.contador-solicitudes');
    if (!contador) {
      contador = document.createElement('span');
      contador.classList.add('contador-solicitudes');
      solicitudesBtn.appendChild(contador);
    }
    let actual = parseInt(contador.textContent) || 0;
    actual += 1;
    contador.textContent = actual;
    contador.style.display = 'inline-block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
  const user = window.usuarioAutenticado || null;

  registrarUsuario(socket, user);

  socket.on('nueva-solicitud', (data) => {
    console.log('📥 Notificación recibida:', data);
    manejarNuevaSolicitud(data);
  });
});

