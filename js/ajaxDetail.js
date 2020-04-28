// Recibimos por get el id del usuario que voy a utilizar para mostrar
// el card los detalles del usuario
function obtenerValorParametro() {
    var sPaginaURL = window.location.search.substring(1);
    // sPaginaURL contien algo así id=1
    var sParametro = sPaginaURL.split('=');
    if (sParametro[0] == 'id') {
        return sParametro[1];
    }
    return null;
}

window.onload = function () {
    valorParametro = obtenerValorParametro();
    alert("El usuario es el número " + valorParametro);
    // TODO 1: Llamar a la función cargaUsuario, pasándole como argumento el id del usuario que está en valorParametro. La función cargaUsuario debe pedir a la api de reqres el usuario concreto.
    // TODO 2: Cuando tenga el usuario, pongo sus datos en el card del html.
}
