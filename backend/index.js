const express = require("express");
const { findLivros, findQuotes,removeChecklist, findComentarios, findLivrosTop10, searchLivros, findAutores, findGeneros, findLivrosById, findLivrosByAutor, findAutorById, findGeneroById, findLivrosByGenero, search, addComentario, addChecklist, findChecklist, addWishlist, findWishlist, removeWishlist, findAvaliacao, updateAvaliacao } = require("./auxiliares")
const app = express();
const PORT = 3001


app.use(express.json())

app.get('/', (req, res) => res.status(200).send('EXPRESS'))

app.get("/api/livros", async (req, res) => {
    if (req.query.search)  {
        res.status(200).json({
            livros: await searchLivros(req.query.search)
        })
    } else {
        res.status(200).json({
            livros: await findLivros()
        })
    }
})

app.get("/api/pesquisa", async (req, res) => { //searchbar
    if (req.query.search)  {
        res.status(200).json(await search(req.query.search))
    } else {
        res.sendStatus(200)
    }
})

app.get("/api/top10", async (req, res) => {
    res.status(200).json({
        livros: await findLivrosTop10()
    })
})

app.get("/api/quotes", async (req, res) => {
    res.status(200).json({
        quotes: await findQuotes()
    })

})



app.get("/api/autor", async (req, res) => {
        res.status(200).json({
            autores: await findAutores()
        })
})

app.get("/api/genero", async (req, res) => {
    res.status(200).json({
        generos: await findGeneros()
    })
})


// GET /api/livro/:id - Retorna um JSON com o livro que tem o id indicado
app.get("/api/livros/:id", async (req, res) => {
    console.log(req.params)
    const livro = await findLivrosById(req.params.id)
    if (livro) {
        res.status(200).json({
            livro: livro
        })
    } else {
        res.status(404).send("Não foi encontrado")
    }
})

app.get("/api/autor/:id", async (req, res) => {
    const autor = await findAutorById(req.params.id)
    const livros = await findLivrosByAutor(autor.autor)
    if (livros) {
        res.status(200).json({
            livros: livros,
            autor: autor
        })
        console.log(livros)
    } else {
        res.status(404).send("Não foi encontrado")
    }
})

app.get("/api/genero/:id", async (req, res) => {
    const genero = await findGeneroById(req.params.id)
    const livros = await findLivrosByGenero(genero.genero)
    if (livros) {
        res.status(200).json({
            livros: livros,
            genero: genero
            
        })
        console.log(livros)
    } else {
        res.status(404).send("Não foi encontrado")
    }
})

app.get("/api/checklist", async (req, res) => {
    try {
        res.status(200).json({
            livros: await findChecklist()  
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/livros/:id/checklist", async (req, res) => {
    await addChecklist(req.params.id)
    res.sendStatus(201)
})

app.delete("/api/livros/:id/checklist", async (req, res) => {
    await removeChecklist(req.params.id)
    res.sendStatus(201)
})

app.get("/api/wishlist", async (req, res) => {
    try {
        res.status(200).json({
            livros: await findWishlist()  
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/livros/:id/wishlist", async (req, res) => {
    await addWishlist(req.params.id)
    res.sendStatus(201)
})

app.delete("/api/livros/:id/wishlist", async (req, res) => {
    await removeWishlist(req.params.id)
    res.sendStatus(201)
})

app.get("/api/livros/:id/comentarios", async (req, res) => {
    try {
        res.status(200).json({
            comentarios: await findComentarios(req.params.id) 
        })
    } catch (error) {
        console.log(error)
    }
})

app.post("/api/livros/:id/comentarios", async (req, res) => {
    await addComentario(req.params.id, req.body)
    
    res.sendStatus(201)
})

app.post("/api/livros/:id/avaliacao", async(req, res) => {
    await updateAvaliacao(req.params.id, req.body.avaliacao)
    res.sendStatus(200)
})

app.get("/api/livros/:id/avaliacao", async(req, res) => {
    const avaliacao = await findAvaliacao(req.params.id)
    res.status(200).json({
        avaliacao: avaliacao
    })
})



app.listen(PORT, () => console.log('À escuta em ' + PORT))