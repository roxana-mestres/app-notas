const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/Usuario");

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "https://proyectos-roxana-mestres.xyz/app-notas/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    console.log("Google authentication callback received");
    console.log("Profile:", profile);

    const nuevoUsuario = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value,
      email: profile.emails[0].value
    }

    try {
      let usuario = await Usuario.findOne({ googleId: profile.id });
      if (usuario) {
        console.log("Usuario existente encontrado");
        done(null, usuario);
      } else {
        console.log("Nuevo usuario creado");
        usuario = await Usuario.create(nuevoUsuario);
        done(null, usuario);
      }
    } catch (error) {
      console.log("Error durante la autenticación:", error);
      done(error, null);
    }
  }));

// Ruta para iniciar sesión con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: "/app-notas/",
    successRedirect: "/app-notas/notas"
  }),
);

// Cerrar sesión
router.get("/cerrar-sesion", (peticion, respuesta) => {
  console.log("Cerrando sesión del usuario");

  peticion.session.destroy(error => {
    if (error) {
      console.log("Error al destruir sesión:", error);
      respuesta.send("Error al cerrar sesión");
    } else {
      console.log("Se destruyó la sesión correctamente");
      respuesta.redirect("/app-notas/");
    }
  });
});

// Persistencia de datos luego de autenticación.

passport.serializeUser(function (usuario, done) {
  console.log("Serializing user:", usuario);
  done(null, usuario.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user with ID:", id);

  try {
    const usuario = await Usuario.findById(id);
    console.log("Deserialized user:", usuario);
    done(null, usuario);
  } catch (error) {
    console.log("Error while deserializing user:", error);
    done(error, null);
  }
});

module.exports = router;