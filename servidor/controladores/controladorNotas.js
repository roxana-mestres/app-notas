// controladorNotas.js
const Nota = require("../models/Notas");
const mongoose = require("mongoose");
const passport = require("passport");

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

// Crear nota

exports.agregarNotas = async (peticion, respuesta) => {
  try {
    if (peticion.isAuthenticated()) {
      const usuario = peticion.user;
      const primerNombre = usuario.displayName.split(" ")[0];

      const nuevaNota = {
        titulo: "Título de la nueva nota",
        cuerpo: "Contenido de la nueva nota",
        usuario: usuario.id,
        creado: new Date() // Establecer la fecha de creación actual
      };

      const notaCreada = await Nota.create(nuevaNota);

      respuesta.json({ message: "Nota creada exitosamente" });
    } else {
      console.log("Usuario no autenticado");
      respuesta.status(401).json({ error: "Usuario no autenticado" });
    }
  } catch (error) {
    console.log("Error:", error);
    respuesta.status(500).json({ error: "Error interno del servidor" });
  }
};

// Página edicion-nota

// Ver nota
exports.verNota = async (peticion, respuesta) => {
  try {
    console.log("ID de la nota:", peticion.params.id);
    console.log("ID del usuario:", peticion.user.id);

    const nota = await Nota.findById({ _id: peticion.params.id }).where({
      usuario: peticion.user.id
    }).lean();

    if (nota) {
      console.log("Nota encontrada:", nota);

      respuesta.render("edicion-nota", {
        notaId: peticion.params.id,
        nota,
        layout: "layouts/pag-edicion-nota"
      });
    } else {
      console.log("La nota no existe.");

      respuesta.send("La nota no existe.");
    }
  } catch (error) {
    console.log("Error:", error);

    respuesta.status(500).send("Error interno del servidor");
  }
};

// Actualizar nota
exports.actualizarNota = async (peticion, respuesta) => {
  try {
    if (peticion.isAuthenticated()) {
      const notaId = peticion.params.id;
      const usuarioId = peticion.user.id;
      const titulo = peticion.body.titulo;
      const cuerpo = peticion.body.cuerpo;

      console.log("Datos recibidos:");
      console.log("notaId:", notaId);
      console.log("usuarioId:", usuarioId);
      console.log("titulo:", titulo);
      console.log("cuerpo:", cuerpo);

      await Nota.findOneAndUpdate(
        { _id: notaId },
        { titulo, cuerpo }
      ).where({ usuario: usuarioId });

      respuesta.redirect("/notas");
    } else {
      // El usuario no está autenticado, manejar según sea necesario
      respuesta.status(401).send("Usuario no autenticado");
    }
  } catch (error) {
    console.log(error);
  }
};

// Borrar nota
exports.borrarNota = async (peticion, respuesta) => {
  try {
    await Nota.findByIdAndRemove(peticion.params.id);
    respuesta.redirect("/notas");
  } catch (error) {
    console.log(error);
  }
};

// Búsqueda

exports.notasBusqueda = async(peticion, respuesta) => {
  try{
    respuesta.render("notas/buscar",{
      resultadosBusqueda: "",
      layout: "layouts/pag-notas"
    })
  }catch(error){
    console.log(error);
  }
}

exports.notasBuscar = async (peticion, respuesta) => {
  try {
    let terminosBusqueda = peticion.body.terminosBusqueda;
    const sinCaracEspeciales = terminosBusqueda.replace(/[^\w\s]/gi, '').toLowerCase(); // Convertir a minúsculas

    const resultadosBusqueda = await Nota.find({
      $or: [
        { titulo: { $regex: new RegExp(sinCaracEspeciales, "i") }},
        { cuerpo: { $regex: new RegExp(sinCaracEspeciales, "i") }}
      ]
    }).where( {usuario: peticion.user.id });

    respuesta.render("buscar", {
      resultadosBusqueda,
      layout: "layouts/pag-buscar"
    });
  } catch(error) {
    console.log(error);
  }
}


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
