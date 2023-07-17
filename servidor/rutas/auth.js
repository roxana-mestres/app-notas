const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Usuario = require("../models/Usuario");

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  async function (accessToken, refreshToken, profile, done) {

    const nuevoUsuario = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.givenName,
      lastName: profile.familyName,
      profileImage: profile.photos[0].value
    }
    try {
      let usuario = await Usuario.findOne({ googleId: profile.id });
      if (usuario) {
        done(null, usuario);
      } else {
        usario = await Usuario.create(nuevoUsuario);
        done(null, usuario);
      }
    } catch (error) {
      console.log(error);
    }
  }
));

// Ruta para iniciar sesión con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));

// Obtener información de usuario

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: "/",
    successRedirect: "/notas"
  }),
);

// Destroy sesión

router.get("/cerrar-sesion", (peticion, respuesta) => {
  peticion.session.destroy(error => {
    if(error) {
      console.log(error);
      respuesta.send("Error al cerrar sesión");
    } else {
      respuesta.redirect("/");
    }
    
  }); 
});

// Persistencia de datos luego de autenticación

passport.serializeUser(function (usuario, done) {
  done(null, usuario.id);
});

// Obtener información usuario de la sesión

passport.deserializeUser(async (id, done) => {
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error, null);
  }
});

module.exports = router;
