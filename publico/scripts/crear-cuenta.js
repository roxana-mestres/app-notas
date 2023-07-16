window.addEventListener('load', function() {
    const iconoOjo = document.querySelector('.icono-ojo');
    const inputContrasena = document.querySelector('input[name="contrasena"]');
    const visibilidadContrasenaToggle = document.querySelector('.icono-ojo-cerrado');
  
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
  
    //FORMULARIO

    const formulario = document.querySelector('form');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const apellidoInput = document.querySelector('input[name="apellido"]');
    const emailInput = document.querySelector('input[name="email"]');
    const contrasenaInput = document.querySelector('input[name="contrasena"]');
    const mensajeErrorDivs = Array.from(document.querySelectorAll('.mensaje-error'));
  
    formulario.addEventListener('submit', (event) => {
      event.preventDefault(); // Evitar envío por defecto
  
      // Limpiar mensajes de error
      mensajeErrorDivs.forEach((div) => {
        div.style.display = 'none';
      });
  
      // Verificar nombre
      if (!verificarNombre()) {
        return;
      }
  
      // Verificar apellidos
      if (!verificarApellidos()) {
        return;
      }
  
      // Verificar correo electrónico
      if (!verificarCorreoElectronico()) {
        return;
      }
  
      // Verificar contraseña
      if (!verificarContrasena()) {
        return;
      }
  
      // Si no hay errores, enviar el formulario
      formulario.submit();
    });
  
    function verificarNombre() {
      const nombre = nombreInput.value.trim();
  
      if (nombre === '') {
        mostrarError(nombreInput, 'El nombre es obligatorio');
        return false;
      }
  
      return true;
    }
  
    function verificarApellidos() {
      const apellidos = apellidoInput.value.trim();
  
      return true;
    }
  
    function verificarCorreoElectronico() {
      const correoElectronico = emailInput.value.trim();
      const correoElectronicoRegex = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
  
      if (correoElectronico === '') {
        mostrarError(emailInput, 'El correo electrónico es obligatorio');
        return false;
      }
  
      if (!correoElectronicoRegex.test(correoElectronico)) {
        mostrarError(emailInput, 'El correo electrónico no es válido');
        return false;
      }
  
      return true;
    }
  
    function verificarContrasena() {
      const contrasena = contrasenaInput.value.trim();
      
      if (contrasena === '') {
        mostrarError(
          contrasenaInput.parentElement.querySelector('.mensaje-error'),
          'La contraseña es obligatoria'
        );
        return false;
      }
      
      if (contrasena.length < 8) {
        mostrarError(
          contrasenaInput.parentElement.querySelector('.mensaje-error'),
          'La contraseña debe tener al menos 8 caracteres'
        );
        return false;
      }
      
      return true;
    }
    
      
    function mostrarError(input, mensaje) {
    const mensajeErrorDiv = input.parentElement.querySelector('.mensaje-error');
      mensajeErrorDiv.textContent = mensaje;
      mensajeErrorDiv.style.display = 'block';
      mensajeErrorDiv.style.width = 'auto';
      mensajeErrorDiv.style.maxWidth = '350px';
      mensajeErrorDiv.style.marginLeft = '30px';
      mensajeErrorDiv.style.lineHeight = '1.5';
      mensajeErrorDiv.style.fontSize = '16px';
    }
  });