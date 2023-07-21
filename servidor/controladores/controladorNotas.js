const Nota = require("../models/Notas");
const mongoose = require("mongoose");
const passport = require("passport");

// Página notas

// Mostrar notas en página notas
exports.notas = async (peticion, respuesta) => {
  // Objeto que almacena datos locales (título)
  const locals = {
    titulo: "Notas"
  };
  try {
    // Verificar si el usuario está autenticado (passport).
    if (peticion.isAuthenticated()) {
      console.log("Usuario autenticado:", peticion.user);

      // Obtener el usuario autenticado y su primer nombre para que cambie en /notas.
      const usuario = peticion.user;
      const primerNombre = usuario.displayName.split(" ")[0];

      // Consulta en la BD para obtener las notas del usuario autenticado (mongoose)
      const notas = await Nota.aggregate([
        {
          $match: { usuario: new mongoose.Types.ObjectId(usuario.id) }
          /*filtra documentos de la colección "Nota" que coinciden con el id del usuario. Se utiliza mongoose.Types.ObjectId para convertir el ID del usuario en un objeto ObjectId de MongoDB, ya que MongoDB almacena los ID como objetos ObjectId.*/
        },
        {
          $project: {
            titulo: { $substr: ["$titulo", 0, 30] },
            cuerpo: { $substr: ["$cuerpo", 0, 150] },
            _id: 1
          }
          /*Especifico qué campos quiero incluir en el resultado de la consulta. Se limitan caracteres de titulo y cuerpo.*/
        },
        {
          $sort: {
            creado: -1
          }
          /*Aquí se ordenan los documentos resultantes en función del campo creado. -1 le indica que ordene de forma descendente (más reciente primero)*/
        }
      ]);

      console.log("Datos a pasar a la plantilla:", locals);

      // Renderizar la plantilla "notas" con los datos locales y las notas del usuario autenticado.
      respuesta.render("notas", {
        locals,
        nombre: primerNombre,
        notas,
        layout: "layouts/pag-notas"
      });
    } else {
      // Si el usuario no está autenticado, redireccionar a la página de inicio.
      console.log("Usuario no autenticado");
      respuesta.redirect("/");
    }
  } catch (error) {
    // Si ocurre algún error durante el proceso, mostrar un mensaje de error en la consola y enviar una respuesta con el estado 500.
    console.log("Error:", error);
    respuesta.status(500).send("Error interno del servidor");
  }
};

// Crear nota

exports.agregarNotas = async (peticion, respuesta) => {
  try {
    // Verificar si el usuario está autenticado.
    if (peticion.isAuthenticated()) {
      // Obtener el usuario autenticado.
      const usuario = peticion.user;

      // Crear un objeto con los datos de la nueva nota, incluyendo el título, contenido y usuario.
      const nuevaNota = {
        titulo: "Título de la nueva nota",
        cuerpo: "Contenido de la nueva nota",
        usuario: usuario.id
      };

      // Guardar la nueva nota en la base de datos utilizando el modelo Nota. create proviene de mongoose (permite crear y guardar un nuevo documento en la colección Nota)
      await Nota.create(nuevaNota);

      // Si la nota es creada exitosamente, enviar una respuesta con un mensaje indicando que la nota ha sido creada.
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

    // Buscar la nota por su ID en la BD y asegurarse de que pertenece al usuario autenticado. lean() es de mongoose (permite obtener objeto JS, en vez de instancias completas de los modelos *Esto lo vi en un video*)
    const nota = await Nota.findById({ _id: peticion.params.id }).where({
      usuario: peticion.user.id
    }).lean();

    // Verificar si la nota existe.
    if (nota) {
      console.log("Nota encontrada:", nota);
      // Renderizar la plantilla "edicion-nota" con los datos de la nota y el diseño de esa página
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
    // Verificar si el usuario está autenticado.
    if (peticion.isAuthenticated()) {
      // Obtener el ID de la nota, el ID del usuario autenticado, el título y el contenido actualizados de la nota desde el cuerpo de la solicitud.
      const notaId = peticion.params.id;
      const usuarioId = peticion.user.id;
      const titulo = peticion.body.titulo;
      const cuerpo = peticion.body.cuerpo;

      console.log("Datos recibidos:");
      console.log("notaId:", notaId);
      console.log("usuarioId:", usuarioId);
      console.log("titulo:", titulo);
      console.log("cuerpo:", cuerpo);

      // Actualizar la nota en la base de datos utilizando el método findOneAndUpdate de Mongoose.
      await Nota.findOneAndUpdate(
        { _id: notaId },
        { titulo, cuerpo }
      ).where({ usuario: usuarioId });

      // Redireccionar a la página de notas después de actualizar la nota.
      respuesta.redirect("/notas");
    } else {
      // Si el usuario no está autenticado, enviar una respuesta con el estado 401 y un mensaje de error
      respuesta.status(401).send("Usuario no autenticado");
    }
  } catch (error) {
    console.log(error);
  }
};

// Borrar nota
exports.borrarNota = async (peticion, respuesta) => {
  try {
    // Buscar y eliminar la nota por su ID en la base de datos.
    await Nota.findByIdAndRemove(peticion.params.id);
    // Redireccionar a la página de notas después de eliminar la nota.
    respuesta.redirect("/notas");
  } catch (error) {
    console.log(error);
  }
};

// Búsqueda

exports.notasBusqueda = async (peticion, respuesta) => {
  try {
    // Renderizar la plantilla "/buscar" con un objeto vacío para los resultados de búsqueda y un diseño específico para esta página.
    respuesta.render("/buscar", {
      resultadosBusqueda: "",
      layout: "layouts/pag-buscar"
    })
  } catch (error) {
    console.log(error);
  }
}

exports.notasBuscar = async (peticion, respuesta) => {
  try {
    let terminosBusqueda = peticion.body.terminosBusqueda;

    // Reemplazar caracteres especiales, tildes y diacríticos por sus equivalentes sin tilde.


    const sinCaracEspeciales = terminosBusqueda.replace(/[^a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ\s]+/ig, "").toLowerCase();

    /* Realizar una consulta en la BD para buscar notas que coincidan con los términos de búsqueda y pertenezcan al usuario autenticado.

    $or - operador de mongoDB que se usa para búsquedas con más de una condición. Deben cumplir con al menos una
    
    $regex, también de mongoDB, se usa para buscar documentos que contengan un valor que coincida con la expresión regular */

    const resultadosBusqueda = await Nota.find({
      $or: [
        { titulo: { $regex: new RegExp(sinCaracEspeciales) } },
        { cuerpo: { $regex: new RegExp(sinCaracEspeciales) } }
      ]
    }).where({ usuario: peticion.user.id });

    respuesta.render("buscar", {
      resultadosBusqueda,
      layout: "layouts/pag-buscar"
    });
  } catch (error) {
    console.log(error);
  }
};


