const express = require("express");
const app = express();

const datosPersonajes = require("./data/personajes_es.json")
const arrayDatos = Object.entries(datosPersonajes);
const dateToday = new Date()

app.use(
    (req,res,next) => {
        console.log("\x1b[36m%s\x1b[0m",`[Recibida petición a fecha -> ${dateToday}]`)
        console.log("\x1b[36m%s\x1b[0m",`[Url llamada -> ${req.originalUrl}]`)
        console.log("\x1b[36m%s\x1b[0m",`[Metodo utilizado -> ${req.method}]`)

        next()
    }
)

// Entrypoint index
app.get("/", (req,res,next)=>{
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el index]")
    res.sendFile("/html/index.html", {root: __dirname})
})

// Entrypoint favicon
app.get("/favicon.ico", (req,res,next) => {
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el favicon]")
    res.sendFile("/images/logo/favicon.ico", {root: __dirname})
})

// Entrypoint styles
app.get("/styles.css", (req,res,next) => {
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve los estilos]")
    res.sendFile("/css/styles.css", {root:__dirname})
})

// Entrypoint logoSVG
app.get("/images/logo/logo_vector.svg", (req,res,next) => {
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el logo en svg]")
    res.sendFile("/images/logo/logo_vector.svg", {root:__dirname})
})

// Entrypoint logica de js
app.get("/logica.js", (req,res,next) => {
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el archivo con la lógica]")
    res.sendFile("/js/logica.js", {root:__dirname})
})

// Entrypoint json personajes
app.get("/datos/personajes.json", (req,res,next) => {
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el json de personajes]")
    res.sendFile("/data/personajes_es.json", {root: __dirname})
})

// Entrypoint sprites de personaje
// Se consiguen todos los sprites excepto 
// de personajes los cuales no existen archivo
app.get("/sprites/campeonesMD/:nombrePersonaje", (req, res, next) => {
    let personaje = req.params.nombrePersonaje;
    let englishName = searchKeyByValue(arrayDatos, personaje.slice(0,-2))
    englishName = englishName.split(".")
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el sprite de personaje]")
    res.sendFile(`/images/campeonesMD/${englishName[2] + "_0"}.jpg`, {root: __dirname})
})

// Función que utilizamos para sacar las keys que hacen falta hasta llegar al nombre en español
// en la función que es llamada se utiliza para obtener el nombre "normalizado"
function searchKeyByValue(obj, value) {
    for (let key in obj) {
        if (obj[key] === value) {
            return key;
        } else if (typeof obj[key] === "object") {
            let result = searchKeyByValue(obj[key], value);
            if (result) {
                return `${key}.${result}`;
            }
        }
    }
    return undefined;
}

// Entrypoint sonidos joke de los personajes
// Se consiguen todos los sonidos excepto 
// de personajes los cuales no existen archivo
app.get("/sounds/jokes/:nombrePersonaje", (req, res, next) => {
    let personaje = req.params.nombrePersonaje;
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el joke de personaje]")
    res.sendFile(`/sounds/jokes/${personaje}`, {root: __dirname})
})

// Entrypoint sonidos laugh de los personajes
// Se consiguen todos los sonidos excepto 
// de personajes los cuales no existen archivo
app.get("/sounds/laugh/:nombrePersonaje", (req, res, next) => {
    let personaje = req.params.nombrePersonaje;
    console.log("\x1b[32m%s\x1b[0m","[Se devuelve el laugh de personaje]")
    res.sendFile(`/sounds/laugh/${personaje}`, {root: __dirname})
})

app.get("*",(req,res,next) => {
    res.status(404);
    console.log("\x1b[31m%s\x1b[0m","[Se devuelve la página de error]")
    res.sendFile("/html/404.html", {root: __dirname})
})

// Conexión por el puerto 3001
const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`[Servidor escuchando en puerto ${PORT}]`)
})