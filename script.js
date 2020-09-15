let categorias = ["Mario Bros.", "Metroid", "The Legend of Zelda", "StarCraft"];
let imagenes = [
    ["img/Paper Mario.jpg", "img/Mario Maker.jpg", "img/Super Mario Galaxy I.jpg", "img/Super Mario Galaxy II.jpg", "img/Super Mario Odyssey.jpg", "img/Super Mario 64.jpg"],
    ["img/Super Metroid.jpg", "img/Samus Logo.jpg", "img/Prime I.jpg", "img/Other M.jpg", "img/Metroid II.jpg", "img/Prime Trilogy.jpg"],
    ["img/Majora's Mask.jpg", "img/Ocarina of Time.jpg", "img/Breath of The Wild.jpg", "img/The Minish Cap.jpg", "img/Twilight Princess.jpg", "img/Wind Waker.jpg"],
    ["img/The Hyperion.jpg", "img/Praetor Artanis.jpg", "img/General Jim Raynor.jpg", "img/The Queen of Blades.jpg", "img/Dark Prelate Zeratul.jpg", "img/Starcraft Marins.jpg"]
];

const seccionCategorias = document.getElementById("seccionCategorias");
const imagenPrincipal = document.getElementById("imagenPrincipal");
const titulo = document.getElementById("titulo");
let actual, anterior = "", actualFiltro, anteriorFiltro = "";

///////////////////////Serie de Acciones al cargar la página
construirGaleria();
const primerElemento=document.getElementById("primerElemento");
imagenPrincipal.setAttribute("src", primerElemento.getAttribute("src"));
titulo.innerText=primerElemento.getAttribute("alt");
activa(primerElemento);
anterior=primerElemento;


/////////////////////////////////////Construccion de la galeria y manejo de propiedades en base al array
function construirGaleria() {
    let cadena = "<h3>Galería de Imágenes</h3><div id='contenedor'>";
    for (let categoria = 0; categoria < 4; categoria++) {
        cadena = cadena + '<h4 id="nombreCategoria">' + categorias[categoria] + '</h4><article class="categoria">';
        for (let imagen = 0; imagen < 6; imagen++) {
            let texto = imagenes[categoria][imagen];
            if (imagen === 0) {
                cadena += '<img class="imagen" id="primerElemento" src="' + texto + '" alt="' + llamarTexto(texto) + '">';
            }
            else {
                cadena += '<img class="imagen" src="' + texto + '" alt="' + llamarTexto(texto) + '">';
            }
        }
        cadena += "</article>"
    }
    cadena += "</div>"
    seccionCategorias.innerHTML = cadena;
}

////////////////////////////////////////////////Seleccion de imagen y filtros
const contenedor = document.getElementById("contenedor");
const articuloFiltros = document.getElementById("articuloFiltros");
contenedor.addEventListener("click", seleccionDeImagen, false);
articuloFiltros.addEventListener("click", seleccionDeFiltro, false);


///Funcion que cambia la imagen segun la seleccionada
function seleccionDeImagen(evento) {
    let cadena = evento.target.getAttribute("src");
    if (cadena) {
        activa(anterior);
        actual = evento.target;
        titulo.innerText = actual.getAttribute("alt");
        imagenPrincipal.style.filter = "none";
        imagenPrincipal.setAttribute("src", cadena);
        activa(actual);
        anterior = actual;
        anteriorFiltro.classList.remove("elementoActivo");
        anteriorFiltro = "";
    }
}
//Funcion que agrega el filtro, averiguando qué botón de filtro presionó
function seleccionDeFiltro(evento) {
    let cadena = evento.target.getAttribute("class");
    if (cadena != null) {
        if (evento.target.classList.contains("elementoActivo")) {
            activa(evento.target);
            imagenPrincipal.style.filter = "none";
            anteriorFiltro = "";
        }
        else {
            let filtro = evento.target.getAttribute("id");
            if (filtro !== "fullscreen") {
                actualFiltro = evento.target;
                if (filtro === "filtro1") {
                    //imagenPrincipal.classList.add("grayscale");
                    imagenPrincipal.style.filter = "grayscale(100%)";
                }
                else if (filtro === "filtro2") {
                    imagenPrincipal.style.filter = "saturate(5)";
                }
                else if (filtro === "filtro3") {
                    imagenPrincipal.style.filter = "contrast(150%)";
                }
                else if (filtro === "filtro4") {
                    imagenPrincipal.style.filter = "hue-rotate(60deg)";
                }
                activa(anteriorFiltro);
                activa(actualFiltro);
                anteriorFiltro = actualFiltro;
            }
            else {
                pantallaCompleta(imagenPrincipal);
            }
        }
    }
}


/////////////////////////////////////////Funcion para solicitar pantala completa
function pantallaCompleta(imagen) {
    if (imagen.webkitRequestFullScreen) {
        imagen.webkitRequestFullScreen();
    }
    else if (imagen.mozRequestFullScreen) {
        imagen.mozRequestFullScreen();
    }
}

////////////////////////////////////////Funcion para agregar clase activo
function activa(elemento) {
    if (elemento !== "") {
        elemento.classList.toggle('elementoActivo');
    }
}

//////////////////////////////////////Funcion para quitar el .jpg de los nombres en el array, y quitar las rutas "/"
function llamarTexto(texto) {
    let recorrido = 0, nombreReal = "";
    let tamañoRealTexto = texto.length - 4;
    for (recorrido; recorrido < tamañoRealTexto; recorrido++) {
        if (texto[recorrido] != "/") {
            nombreReal += texto[recorrido];
        }
        else {
            nombreReal = "";
        }
    }
    return nombreReal;
}
