const visibilidadContrasenaIcono = document.querySelector('.visibilidad-contrasena-icono');
const inputContrasena = document.querySelector('.campo-contrasena input[type="password"]');

visibilidadContrasenaIcono.addEventListener('click', toggleVisibilidadContrasena);

function toggleVisibilidadContrasena() {
  if (inputContrasena.type === 'password') {
    inputContrasena.type = 'text';
    visibilidadContrasenaIcono.textContent = 'visibility';
  } else {
    inputContrasena.type = 'password';
    visibilidadContrasenaIcono.textContent = 'visibility_off';
  }
}
