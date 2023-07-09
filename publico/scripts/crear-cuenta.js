const iconoOjo = document.querySelector('.icono-ojo');
const inputContrasena = document.querySelector('input[type="password"]');
const visibilidadContrasenaToggle = document.querySelector('.eye-off-icon');

iconoOjo.addEventListener('click', toggleVisibilidadContrasena);
visibilidadContrasenaToggle.addEventListener('click', toggleVisibilidadContrasena);

function toggleVisibilidadContrasena() {
    if (inputContrasena.type === 'password') {
        inputContrasena.type = 'text';
        iconoOjo.style.display = 'none';
        visibilidadContrasenaToggle.style.display = 'inline';
    } else {
        inputContrasena.type = 'password';
        iconoOjo.style.display = 'inline';
        visibilidadContrasenaToggle.style.display = 'none';
    }
}

const elementoAvatar = document.querySelector('.avatar');
const imagenesAvatar = Array.from(elementoAvatar.querySelectorAll('.avatar-imagen'));
let indiceAvatar = 0;

elementoAvatar.addEventListener('click', () => {
    imagenesAvatar[indiceAvatar].style.display = 'none';
    indiceAvatar = (indiceAvatar + 1) % imagenesAvatar.length;
    imagenesAvatar[indiceAvatar].style.display = 'block';
});

// Mostrar el avatar inicial
imagenesAvatar[0].style.display = 'block';
