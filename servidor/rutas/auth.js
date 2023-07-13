const express = require("express");
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Usuario = require("../models/Usuario");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  authorizationParams: {
      prompt: 'select_account'
  }
},
    async function (accessToken, refreshToken, perfil, done) {

        const nuevoUsuario = {
            googleId: perfil.id,
            nombre: perfil.name.givenName
        }

        try {
            let usuario = await Usuario.findOne({ googleId: perfil.id });
            if (usuario) {
                done(null, usuario);
            } else {
                usuario = await Usuario.create(nuevoUsuario);
                done(null, usuario);
            }
        } catch (error) {
            console.log(error);
        }
    }
));

router.get('/auth/google',
  (peticion, respuesta, siguiente) => {
    console.log('Se hizo clic en el botón de Google');
    passport.authenticate('google', { scope: ['profile'] })(peticion, respuesta, siguiente);
  }
);

router.get('/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/crear-cuenta'
  }),
  function(peticion, respuesta) {
    console.log('Se ha autenticado correctamente con Google');
    respuesta.redirect('/notas');
  }
);

passport.serializeUser(async function(usuario, done) {
  console.log('Serializando usuario:', usuario);
  done(null, usuario.id);
});

passport.deserializeUser(async function(id, done) {
  console.log('Deserializando usuario con ID:', id);
  try {
    const usuario = await Usuario.findById(id);
    done(null, usuario);
  } catch (error) {
    done(error);
  }
});

// Ruta para cerrar sesión
router.get("/cerrar-sesion", (peticion, respuesta) => {
  peticion.session.destroy(error => {
    if (error) {
      console.log(error);
      respuesta.send("Error al cerrar sesión");
    } else {
      console.log('Sesión cerrada correctamente');
      respuesta.redirect("/");
    }
  });
});

module.exports = router;
