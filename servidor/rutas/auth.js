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
  console.log('Se hizo clic en el botón de Google');
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
  passport.authenticate('google', { scope: ['profile'] })
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
  try {
    done(null, usuario._id);
  } catch (error) {
    done(error);
  }
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


router.get("/cerrar-sesion", (peticion, respuesta) => {
  console.log("Se hizo clic en el botón de cerrar sesión");
  peticion.logout(function(error) {
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
