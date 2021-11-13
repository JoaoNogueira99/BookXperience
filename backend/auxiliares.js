const { ObjectId } = require("mongodb");
const { getCollection } = require("./db");

const DB_NAME = "bookxperience"
const BOOK_COLLECTION = "livros"
const AUTORES_COLLECTION = "autores"
const GENEROS_COLLECTION = "generos"
const COMMENT_COLLECTION = "comentarios"
const CHECKLIST_COLLECTION = "checklist"
const WISHLIST_COLLECTION = "wishlist"
const QUOTES_COLLECTION = "quotes"
const RATING_COLLECTION = "ratings"

async function sendLivrosToMongo(data) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION)
    const result = await collection.insertMany(data.livros)
    return result
}

async function findLivros() {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);

    const livros = await collection.find({}, {
        projection: { titulo: 1, autor: 1, imagem: 1 }
    }).sort({ titulo: 1 }).toArray()
    return livros;
}

async function addChecklist(id) {
    const collection = await getCollection(DB_NAME, CHECKLIST_COLLECTION);
    const book = await collection.findOne({ bookId: ObjectId(id) })
    if (!book) {
        const checklist = await collection.insertOne({ bookId: ObjectId(id) })
        return checklist;
    } else {
        return null;
    }
}

async function removeChecklist(id) {
    const collection = await getCollection(DB_NAME, CHECKLIST_COLLECTION);
    const book = await collection.findOne({ bookId: ObjectId(id) })
    if (book) {
        const checklist = await collection.deleteOne({ bookId: ObjectId(id) })
        return checklist;
    } else {
        return null;
    }
}

async function findChecklist() {
    const collection = await getCollection(DB_NAME, CHECKLIST_COLLECTION);

    const checklist = await collection.find({}).toArray()
    const livros = await Promise.all(
        checklist.map(async ci => await findLivrosById(ci.bookId))
    )
    livros.sort((a, b) => a.titulo < b.titulo ? -1 : (a.titulo > b.titulo ? 1 : 0))

    // se a < b a diferença é -1
    // se a > b a diferença é 1
    // senão é 0

    return livros;
}

async function addWishlist(id) {
    const collection = await getCollection(DB_NAME, WISHLIST_COLLECTION);
    const book = await collection.findOne({ bookId: ObjectId(id) })
    if (!book) {
        const wishlist = await collection.insertOne({ bookId: ObjectId(id) })
        return wishlist;
    } else {
        return null;
    }
}
async function removeWishlist(id) {
    const collection = await getCollection(DB_NAME, WISHLIST_COLLECTION);
    const book = await collection.findOne({ bookId: ObjectId(id) })
    if (book) {
        const wishlist = await collection.deleteOne({ bookId: ObjectId(id) })
        return wishlist;
    } else {
        return null;
    }
}
async function findWishlist() {
    const collection = await getCollection(DB_NAME, WISHLIST_COLLECTION);
    const collectionBook = await getCollection(DB_NAME, BOOK_COLLECTION);

    const wishlist = await collection.find({}).toArray()
    const livros = await Promise.all(
        wishlist.map(async ci => await findLivrosById(ci.bookId))
    )
    livros.sort((a, b) => a.titulo < b.titulo ? -1 : (a.titulo > b.titulo ? 1 : 0))
    return livros;
}

async function findComentarios(id) {
    const collection = await getCollection(DB_NAME, COMMENT_COLLECTION);
    const comentarios = await collection.find({ bookId: ObjectId(id) }).toArray()

    return comentarios;
}

async function addComentario(id, comentario) {
    const collection = await getCollection(DB_NAME, COMMENT_COLLECTION);
    const comentarios = await collection.insertOne({ bookId: ObjectId(id), ...comentario, date: new Date()})
    
    return comentarios;
}

async function findLivrosTop10() {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);

    const livros = await collection.find({}, {
        projection: { titulo: 1, autor: 1, imagem: 1, avaliacao: 1 },
    })
        .sort({ avaliacao: -1 })
        .limit(10)
        .toArray()
    
    return livros;
}
async function findLivroByTitulo(titulo) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);

    const livro = await collection.findOne({ titulo: titulo })

    return livro;
}


async function findQuotes() {
    const collection = await getCollection(DB_NAME, QUOTES_COLLECTION);

    const quotes = await collection.find({}, {
        projection: { quote: 1, titulo: 1, autor: 1 },
    }).limit(7)
        .toArray()
    console.log(quotes)

    const livro = await Promise.all(quotes.map(async quote => {
        return {
            ...quote,
            livro: await findLivroByTitulo(quote.titulo)
        }
    }))

    return livro;
}



async function search(text) { //searchBar
    const bookCollection = await getCollection(DB_NAME, BOOK_COLLECTION)
    const livros = await bookCollection.find({
        $or: [
            { titulo: { $regex: `.*${text}.*`, $options: 'i' } },
            { genero: { $regex: `.*${text}.*`, $options: 'i' } },
            { autor: { $regex: `.*${text}.*`, $options: 'i' } },
        ]
    }).toArray()
    const autorCollection = await getCollection(DB_NAME, AUTORES_COLLECTION)
    const autores = await autorCollection.find({
        autor: { $regex: `.*${text}.*`, $options: 'i' }
    }).toArray()
    const generoCollection = await getCollection(DB_NAME, GENEROS_COLLECTION)
    const generos = await generoCollection.find({
        genero: { $regex: `.*${text}.*`, $options: 'i' }
    }).toArray()

    return {
        livros,
        autores,
        generos
    }
}

async function searchLivros(text) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION)
    const livros = await collection.find({
        titulo: { $regex: `.*${text}.*`, $options: 'i' }
    }).toArray()
    return livros
}

async function searchAutores(text) {
    const collection = await getCollection(DB_NAME, AUTORES_COLLECTION)
    const livros = await collection.find({
        titulo: { $regex: `.*${text}.*`, $options: 'i' }
    }).toArray()
    return livros
}

async function findAutores() {
    const collection = await getCollection(DB_NAME, AUTORES_COLLECTION);

    const autores = await collection.find({}, {
        projection: { autor: 1, imagemAutor: 1 }
    }).sort({ autor: 1 }).toArray()

    return autores;
}

async function findGeneros() {
    const collection = await getCollection(DB_NAME, GENEROS_COLLECTION);

    const generos = await collection.find({}, {
        projection: { genero: 1 }
    }).sort({ genero: 1 }).toArray()

    return generos;
}

async function findLivrosById(id) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);
    console.log(id)
    const livro = await collection.findOne({ _id: ObjectId(id) })

    const chCollection = await getCollection(DB_NAME, CHECKLIST_COLLECTION);
    const whCollection = await getCollection(DB_NAME, WISHLIST_COLLECTION);
    const lido = await chCollection.findOne({ bookId: ObjectId(id) })
    const favorite = await whCollection.findOne({ bookId: ObjectId(id) })

    if (favorite) {
        livro.favorite = true
    }
    if (lido) {
        livro.lido = true
    }


    return livro;
}

async function findAutorById(id) {
    const collection = await getCollection(DB_NAME, AUTORES_COLLECTION);

    const autor = await collection.findOne({ _id: ObjectId(id) })
    console.log(autor)

    return autor;
}

async function findGeneroById(id) {
    const collection = await getCollection(DB_NAME, GENEROS_COLLECTION);

    const genero = await collection.findOne({ _id: ObjectId(id) })

    return genero;
}



async function findLivrosByGenero(genero) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);

    const livros = await collection.find({ genero: genero }).toArray()

    return livros;
}

async function findLivrosByAutor(autor) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);
    console.log(autor)

    const livros = await collection.find({ autor: autor }).toArray()

    return livros;
}

async function updateAvaliacao(id, value) {
    const collection = await getCollection(DB_NAME, RATING_COLLECTION);
    const avaliacao = await collection.findOne({ bookId: ObjectId(id) })
    if (avaliacao) {
        const livroUpdate = await collection.updateOne(
            { bookId: ObjectId(id) },
            {
                $set: {
                    avaliacao: value
                },
            }
        )
    } else {
        const livroUpdate = await collection.insertOne(
            {
                bookId: ObjectId(id),
                avaliacao: value
            },
        )
    }
    await atualizaAvaliacaoNoLivro(id)
}

async function findAvaliacao(id) {
    const collection = await getCollection(DB_NAME, BOOK_COLLECTION);
    const livro = await collection.findOne({ _id: ObjectId(id) })
    if (livro) {
        return livro.avaliacao
    } else {
        return 0
    }

}

async function atualizaAvaliacaoNoLivro(id) {
    const collection = await getCollection(DB_NAME, RATING_COLLECTION);
    const avaliacoes = await collection.find({ bookId: ObjectId(id) }).toArray();
    const avaliacao = caculaMedia(avaliacoes)

    const bcollection = await getCollection(DB_NAME, BOOK_COLLECTION);

    await bcollection.updateOne({
        _id: ObjectId(id)
    }, {
        $set: { avaliacao: avaliacao }
    })
}

function caculaMedia(avaliacao) {
    const arrAvg = avaliacao.reduce((a, b) => a + b.avaliacao, 0) / avaliacao.length

    return arrAvg
}


module.exports = {
    sendLivrosToMongo,
    findLivros,
    findLivrosById,
    findLivroByTitulo,
    findLivrosByGenero,
    findLivrosByAutor,
    findAutores,
    searchLivros,
    findGeneros,
    findAutorById,
    findGeneroById,
    findLivrosTop10,
    findAvaliacao,
    searchAutores,
    search,
    addComentario,
    findComentarios,
    addChecklist,
    findChecklist,
    addWishlist,
    findWishlist,
    findQuotes,
    updateAvaliacao,
    removeChecklist,
    removeWishlist
}