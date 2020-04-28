const READY_STATE_COMPLETE=4;
let contPro=0;
let contUsu=0;
// utilizo esta variable global para saber qué tabla voy a crear
let nombreTabla="";

function ocultarUsu(){
    let div = document.getElementById('divtablaUsuario');
    contUsu++;
    if(contUsu==1)
        descargaUsuarios();
    if(contUsu % 2 !=0) {
        div.className = "";
    }else if(contUsu % 2 ==0){
        div.className += "d-none";
    }

}

function ocultar(){
    let div = document.getElementById('divtablaProductos');
    contPro++;
    if(contPro==1)
        descargaProductos();
    if( contPro % 2 !=0) {
        div.className = "";
    }else if(contPro % 2 ==0){
        div.className = "d-none";
    }

}

// Esta función crea la tabla con los datos leídos por la petición http de Ajax y
// los muestra en la tabla establecida en la variable global nombreTabla.
function muestraDatos(){
    if(peticion_http.readyState === READY_STATE_COMPLETE){
        if(peticion_http.status === 200){
            var datos = JSON.parse(peticion_http.responseText);
            var idTabla=document.getElementById(nombreTabla);
            var tbody = idTabla.getElementsByTagName('tbody')[0];
            for (var i=0;i<datos.data.length;i++){
                var tr = document.createElement('tr');
                var linea = datos.data[i];
                console.log(linea);
                for (var propiedad in linea) {
                    if(propiedad !== 'avatar') {
                        var celda = cargaCelda(linea[propiedad]);
                        tr.appendChild(celda);
                    }
                }
                // Hemos añadido un enlace sólo para la tabla de Usuarios para ver el detalle de cada usuario
                if(nombreTabla === 'tablaUsuario'){
                    // Para la tabla de usuarios voy a añadir una celda con un enlace tipo botón
                    let celdaEnlace = document.createElement('td');
                    let boton = document.createElement('a');
                    boton.className = "btn btn-success";
                    boton.href = "DetalleUsuario.html?id=" + linea["id"];
                    boton.innerText = "Detalle";
                    celdaEnlace.appendChild(boton);
                    tr.appendChild(celdaEnlace);
                }
                tbody.appendChild(tr);
            }
        }
    }
}

// Esta función, crea una celda con el texto decibido y la devuelve
function cargaCelda(texto) {
    var celda = document.createElement('td');
    var txt = document.createTextNode(texto);
    celda.appendChild(txt);
    return celda;
}

function cargarContenido(url,metodo,funcion){
        peticion_http = inicializar_xhr();
        if (peticion_http) {
            peticion_http.onreadystatechange = funcion;
            peticion_http.open(metodo, url, true);
            peticion_http.send();
        }

}

function inicializar_xhr(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }
}

// Hemos añadido a estas dos funciones la definición del nombre de la tabla para cada una de ellas
function descargaUsuarios(){
    nombreTabla = "tablaUsuario";
    cargarContenido("https://reqres.in/api/users/", "GET",muestraDatos);
}

function descargaProductos(){
    nombreTabla = "tablaProducto";
    cargarContenido("https://reqres.in/api/products/", "GET",muestraDatos);
}

window.onload=function () {
    let boton = document.getElementById('boton');
    boton.addEventListener('click',ocultarUsu);
    let boton2 = document.getElementById('boton2');
    boton2.addEventListener('click',ocultar);
}
