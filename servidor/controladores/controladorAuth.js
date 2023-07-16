const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registro = async (peticion, respuesta, siguiente) => {
    console.log("Datos de la solicitud:", peticion.body);

    try {
        const hashedPassword = await bcrypt.hash(peticion.body.contrasena, 10);
        
        const usuario = new Usuario({
            nombre: peticion.body.nombre,
            apellido: peticion.body.apellido,
            email: peticion.body.email,
            password: hashedPassword
        });

        const usuarioGuardado = await usuario.save();
        console.log("Usuario guardado:", usuarioGuardado);
        respuesta.redirect("/iniciar-sesion"); // Redirigir a la página de notas
    } catch (error) {
        console.log("Error al guardar el usuario:", error);
        respuesta.status(500).json({
            error: "Ocurrió un error al guardar el usuario",
            details: error.message // Obtener el mensaje de error
        });
    }
};

const inicioSesion = async (peticion, respuesta, siguiente) => {
    const email = peticion.body.email;
    const password = peticion.body.password;

    console.log("Datos de inicio de sesión:", peticion.body);

    try {
        const usuario = await Usuario.findOne({ email: email });
        
        if (usuario) {
            const resultado = await bcrypt.compare(password, usuario.password);
            
            if (resultado) {
                console.log("Contraseña coincidente");
                const token = jwt.sign({ nombre: usuario.nombre }, "&8azt45N", { expiresIn: "1h" });
                respuesta.cookie("token", token); // Establecer cookie con el token
                respuesta.redirect("/notas"); // Redirigir a la página de notas
            } else {
                console.log("Contraseña no coincide");
                respuesta.status(401).json({
                    message: "La contraseña no coincide"
                });
            }
        } else {
            console.log("No se ha encontrado ningún usuario");
            respuesta.status(404).json({
                message: "No se ha encontrado ningún usuario"
            });
        }
    } catch (error) {
        console.log("Error al comparar las contraseñas:", error);
        respuesta.status(500).json({
            error: "Ocurrió un error al comparar las contraseñas"
        });
    }
};

module.exports = { registro, inicioSesion };
