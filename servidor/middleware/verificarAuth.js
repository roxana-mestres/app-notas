exports.isLoggedIn = function (peticion, respuesta, siguiente) {
    if(peticion.usuario){
        siguiente();
    }else{
        return respuesta.status(401).render("pag-401");
    }
};