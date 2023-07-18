const Nota = require("../models/Notas");
const mongoose = require("mongoose");

// Página inicial
exports.notas = async (peticion, respuesta) => {
  const locals = {
    titulo: "Notas"
  };

  try {
    if (peticion.isAuthenticated()) {
      console.log("Usuario autenticado:", peticion.user);

      const usuario = peticion.user;
      const primerNombre = usuario.displayName.split(" ")[0];
      const notas = await Nota.aggregate([
        {
          $match: { usuario: new mongoose.Types.ObjectId(usuario.id) }
        },
        {
          $project: {
            titulo: { $substr: ["$titulo", 0, 30] },
            cuerpo: { $substr: ["$cuerpo", 0, 150] },
            _id: 1 // Agregar el campo "_id" al resultado de la agregación
          }
        },
        {
          $sort: {
            creado: -1
          }
        }
      ]);

      console.log("Datos a pasar a la plantilla:", locals);

      respuesta.render("notas", {
        locals,
        nombre: primerNombre,
        notas,
        layout: "layouts/pag-notas"
      });
    } else {
      // Manejar el caso cuando el usuario no está autenticado
      console.log("Usuario no autenticado");
      respuesta.redirect("/"); // Redirigir a la página de inicio de sesión o manejar según sea necesario
    }
  } catch (error) {
    console.log("Error:", error);
    // Manejar el error
    respuesta.status(500).send("Error interno del servidor"); // Enviar una respuesta de error apropiada
  }
};

// Página edicion-nota 

// Ver nota

exports.verNota = async (peticion, respuesta) => {
  const nota = await Nota.findById({ _id: peticion.params.id })
  .where({ usuario: peticion.user.id }).lean();

  if(nota) {
    respuesta.render("layouts/pag-edicion-nota"), {
        notaId: peticion.params.id,
        nota,
        layout: "layouts/pag-edicion-nota"
    };
  }else {
    respuesta.send("Ocurrió un error")
  }
};

// Actualizar nota
exports.actualizarNota = async (peticion, respuesta) => {
  
};

// Página cerrar sesión
exports.cerrarSesion = (peticion, respuesta) => {
  const locals = {
    titulo: "Cerrar sesión"
  };

  peticion.logout(); // Utilizar el método apropiado para cerrar sesión del usuario

  respuesta.render("/", {
    locals,
    layout: "layouts/principal"
  });
};
