const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registro = (peticion, respuesta, siguiente) => {
    console.log("Datos de la solicitud:", peticion.body);

    bcrypt.hash(peticion.body.contrasena, 10, function (error, hashedPassword) {
        if (error) {
            console.log("Error al encriptar la contraseña:", error);
            respuesta.status(500).json({
                error: "Ocurrió un error al encriptar la contraseña"
            });
        } else {
            let usuario = new Usuario({
                nombre: peticion.body.nombre,
                apellido: peticion.body.apellido,
                email: peticion.body.email,
                password: hashedPassword
            });

            usuario.save()
                .then(usuarioGuardado => {
                    console.log("Usuario guardado:", usuarioGuardado);
                    respuesta.redirect("/notas"); // Redirigir a la página de notas
                })
                .catch(error => {
                    console.log("Error al guardar el usuario:", error);
                    respuesta.status(500).json({
                        error: "Ocurrió un error al guardar el usuario",
                        details: error.message // Obtener el mensaje de error
                    });
                });
        }
    });
};

const inicioSesion = (peticion, respuesta, siguiente) => {
    var email = peticion.body.email;
    var password = peticion.body.password;

    console.log("Datos de inicio de sesión:", email, password);

    Usuario.findOne({ email: email })
        .then(usuario => {
            if (usuario) {
                bcrypt.compare(password, usuario.password, function (error, resultado) {
                    if (error) {
                        console.log("Error al comparar las contraseñas:", error);
                        respuesta.status(500).json({
                            error: "Ocurrió un error al comparar las contraseñas"
                        });
                    }
                    if (resultado) {
                        console.log("Contraseña coincidente");
                        let token = jwt.sign({ nombre: usuario.nombre }, "&8azt45N", { expiresIn: "1h" });
                        respuesta.cookie("token", token); // Establecer cookie con el token
                        respuesta.redirect("/notas"); // Redirigir a la página de notas
                    } else {
                        console.log("Contraseña no coincide");
                        respuesta.status(401).json({
                            message: "La contraseña no coincide"
                        });
                    }
                });
            } else {
                console.log("No se ha encontrado ningún usuario");
                respuesta.status(404).json({
                    message: "No se ha encontrado ningún usuario"
                });
            }
        });
};

module.exports = { registro, inicioSesion };
