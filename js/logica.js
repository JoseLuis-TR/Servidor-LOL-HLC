
/*
* Variable global que contendrá todos los personajes del LoL. Se seteará al cargar
* la página, al realizar el primer fetch
*/
var personajes;

/*
* Función que inicializa la página. Realiza una petición a la API del Lol para obtener los personajes, rellena el select, etc etc.
*/
async function inicializarPagina() {
    await fetch('datos/personajes.json')
        .then(response => response.json())
        .then(data => personajes = data.data);
    console.log(personajes);
    populateSelect();

    //Aniadimos un evento al formulario
    let mainForm = document.querySelector("#mainForm");
    mainForm.addEventListener("submit", handleForm);
    mainForm.addEventListener("reset", resetPage);
}

/*
* Función que realiza un fetch para obtener de la API del LOL la imagen del personaje indicado
*/
/*
async function doFetchImage(nombrePersonaje) {

    let imageObjectURL = "";
    await fetch(`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${nombrePersonaje}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob => imageObjectURL = URL.createObjectURL(imageBlob));
    crearDiv(imageObjectURL);
}
*/

/*
* Función que obtiene la imagen del personaje indicado
*/
function obtenerImagen(nombrePersonaje) {

    let imageObjectURL = `./images/campeonesMD/${nombrePersonaje}_0`;
    crearDiv(imageObjectURL);
}

/*
* Función para manejar el submit del formulario
*/
function handleForm(event) {

    event.preventDefault();
    resetPage();

    const inputName = event.target.name.value;
    const optionName = event.target.selectPsjs.value;
    const optionRol = event.target.selectRol.value;
    let nombrePersonaje = "";
    let rolPersonaje = "";

    if(inputName !== ""){
        nombrePersonaje = inputName;
        seleccionarPersonaje(nombrePersonaje);
    }else if(optionName !== ""){
        nombrePersonaje = optionName;
        seleccionarPersonaje(nombrePersonaje);
    }else if(optionRol !== ""){
        rolPersonaje = optionRol;
        seleccionarRol(rolPersonaje);
    }
    
}

/*
* Función que imprime todos los personajes asociados a un rol determinado
*/
function seleccionarRol(rolPersonaje){
    Object.entries(personajes).map(psj => {
        if (psj[1].tags[0] === rolPersonaje) {
            let nombrePersonaje = psj[1].name;
            const urlImg = `./sprites/campeonesMD/${nombrePersonaje}_0`;
            crearDiv(urlImg, psj[1]);
        }
    });
}

/*
* Función que imprime un personaje en concreto dado
*/
function seleccionarPersonaje(nombrePersonaje){
    Object.entries(personajes).map(psj => {
        if (psj[1].name === nombrePersonaje) {
            const urlImg = `./sprites/campeonesMD/${nombrePersonaje}_0`;
            crearDiv(urlImg, psj[1]);
        }
    });
}

/*
* Función para resetear los divs de los personajes. Para que no se acumulen uno 
* al lado del otro.
*/
function resetPage() {
    var divPsjs = document.querySelector("#psjs");
    
    if (divPsjs !== null) {
        while(divPsjs.firstChild){
            divPsjs.removeChild(divPsjs.lastChild);
        }
    }
}

/*
* Función para crear un Div que contendrá la imagen de un personaje
*/
function crearDiv(urlImg, personaje) {
    let divPsjs = document.querySelector("#psjs");
    let divCaja = document.createElement("div");
    let elemImg = document.createElement("img");
    let divInfo = document.createElement("div");
    
    
    elemImg.setAttribute("src", urlImg);
    divCaja.appendChild(elemImg);
    
    let elemPNombre = document.createElement("p");
    elemPNombre.appendChild(document.createTextNode(personaje.name));
    divInfo.appendChild(elemPNombre);



    let inputJoke = document.createElement("input");
    inputJoke.setAttribute("type", "button");
    inputJoke.classList.add("bolaVerde");
    inputJoke.setAttribute("id", personaje.name);
    inputJoke.addEventListener("click", playJoke);
    //inputJoke.setAttribute("onclick", "playJoke(event)");
    divInfo.appendChild(inputJoke);

    let inputRisa = document.createElement("input");
    inputRisa.setAttribute("type", "button");
    inputRisa.classList.add("bolaRoja");
    inputRisa.setAttribute("id", personaje.name);
    inputRisa.addEventListener("click", playLaugh);
    //inputRisa.setAttribute("onclick", "playLaugh(event)");
    divInfo.appendChild(inputRisa);

    divInfo.classList.add("caja2")
    divCaja.appendChild(divInfo);
    
    divCaja.classList.add("col-sm-6");
    divCaja.classList.add("col-lg-4");
    divCaja.classList.add("caja");
    divCaja.classList.add("g-3");
    divPsjs.appendChild(divCaja);
}

function playJoke(event){
    //console.log(event.target.id);
    new Audio(`./sounds/jokes/${event.target.id}.joke.wav`).play();
}

function playLaugh(event){
    //console.log(event.target.id);
    new Audio(`./sounds/laugh/${event.target.id}.laugh1.wav`).play();
}

/*
* Función para rellenar el select del formulario principal que nos sirve para poder seleccionar un personaje
*/
function populateSelect() {
    var selectPsjs = document.querySelector("#selectPsjs");
    Object.entries(personajes).map(psj => {
        var option = document.createElement("option");
        option.setAttribute("id", psj[1].name);
        option.setAttribute("name", psj[1].name);
        option.setAttribute("value", psj[1].name);
        option.innerText = psj[1].name;
        selectPsjs.appendChild(option);
    });
}

window.onload = inicializarPagina();