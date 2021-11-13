const { sendLivrosToMongo } = require("./db");
const fs = require("fs")
const MEMORY_LIVROS = "./BD/livros.json"
const MEMORY_AUTORES = "./BD/autores.json"
const MEMORY_GENERO = "./BD/genero.json"
const MEMORY_QUOTES = "./BD/quotes.json"


function readFile(memoria) {
    const memoria1 = JSON.parse(fs.readFileSync(memoria).toString())
    return memoria1
}

async function insertLivros(memoria) {
    const jsonFile = await readFile(memoria)
    //passa a memoria para o mongo
    const livros = await sendLivrosToMongo(jsonFile, "bookxperience", "livros")
}

async function insertQuotes(memoria) {
    const jsonFile = await readFile(memoria)
    //passa a memoria para o mongo
    const livros = await sendLivrosToMongo(jsonFile, "bookxperience", "quotes")
}
async function insertAutores(memoria) {
    const jsonFile = await readFile(memoria)
    //passa a memoria para o mongo
    const livros = await sendLivrosToMongo(jsonFile, "bookxperience", "autores")
}
async function insertGeneros(memoria) {
    const jsonFile = await readFile(memoria)
    //passa a memoria para o mongo
    const livros = await sendLivrosToMongo(jsonFile, "bookxperience", "generos")
}
insertLivros(MEMORY_LIVROS).then(() => console.log('inseridos livros'))
insertQuotes(MEMORY_QUOTES).then(() => console.log('inseridos quotes'))
insertAutores(MEMORY_AUTORES).then(() => console.log('inseridos autores'))
insertGeneros(MEMORY_GENERO).then(() => console.log('inseridos generos'))