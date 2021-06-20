/**  Constantes  */
const contenedor = document.querySelector('.bloquesContainer'),
    identidadBloques = document.getElementById('identidad');
/** Variables  */
var nBloques = 16, //4x4=16
    currentPlayer = '👾'//🤖;
/*Inicio */
imprimirBloques();



/** FUNCIONES!! */
function imprimirBloques() {
    for (let index = 0; index < nBloques; index++) {
        //**crea los bloques para la tabla!!
        contenedor.appendChild(document.createElement('div')).classList.add("bloque");
    }
}
function eliminarBloque() {
    document.querySelector('.bloque').parentNode.removeChild(document.querySelector('.bloque'));
}
function eliminarBloquesAuto() {
    for (let index = 0; index < nBloques; index++) {
        eliminarBloque();
    }
    imprimirBloques();
}

function handleCambiar() {
    const bloquesEliminar = document.querySelector('.bloque'),
        validar = contenedor.contains(bloquesEliminar);
    if (validar) {
        for (let index = 0; index < nBloques; index++) {
            eliminarBloque();
        } nBloques = (nBloques == 16) ? 9 : 16;
        if (nBloques == 16) {
            contenedor.classList.remove("grid-cols-3");
            contenedor.classList.add("grid-cols-4");
            identidadBloques.innerHTML = "4x4";
        } else {
            identidadBloques.innerHTML = "3x3"
            contenedor.classList.remove("grid-cols-4");
            contenedor.classList.add("grid-cols-3");
        }
        imprimirBloques();
    } else {
        alert("No hay bloques!!");
        alert("pero ahora si!!!");
        imprimirBloques();
    }
}

////////////////////////////*1
contenedor.addEventListener("click", handleClick);

function handleClick(e) {
    let bloques = e.target;
    if (bloques.classList.contains("bloque")) {
        const bloquesIndex = Array.from(bloques.parentNode.children).indexOf(bloques);
        //console.log("Index", bloquesIndex, " Element-> ", bloques);
        //console.log(bloques.innerHTML.includes('👾'),"currentPlayer ".currentPlayer)
        if (bloques.innerHTML.includes('👾') || bloques.innerHTML.includes('🤖')) {
            return;
        }

        haldleInprime(bloques);
    }
}

function haldleInprime(bloques) {
    bloques.innerHTML = currentPlayer;
    currentPlayer = (currentPlayer === '👾') ? '🤖' : '👾';
}