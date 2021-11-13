import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel'
import {
    Link
} from "react-router-dom";
import styles from "../styles/Extras.module.css"
import Rating from "./Rating";



function Extras() {

    return <div>
        <div><Top10 /> </div>
        <div><Quotes /> </div>
    </div>
}



function Top10() {
    const [livros, setLivros] = useState([])

    async function fetchLivrosTop10() {
        const res = await fetch('/api/top10')
        const resBody = await res.json();
        console.log('mount', resBody)
        setLivros(resBody.livros)
    }
    useEffect(() => {
        fetchLivrosTop10()
    }, [])

    console.log(livros)
    return (
        <div className={styles.top10}>
            <h2 className={styles.titulo}>Top 10</h2>

            <Carousel className={styles.carousel} fade>
                {
                    livros.map((livro, i) => (
                        <Carousel.Item className={styles.itensCarousel} key={livro._id}>

                            <Link className={styles.links} to={`/livros/${livro._id}`}>
                                <div className={styles.imagemTop}>
                                <img
                                    className={styles.imagemCarousel}
                                    src={livro.imagem}
                                    alt="First slide"
                                />
                                </div>
                                <p className = {styles.numero}>{i + 1}</p>
                            </Link>

                            <Carousel.Caption>
                                <Rating id={livro._id} disabled={true} />
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    )
}


function Quotes() {
    const [quotes, setQuotes] = useState([])

    async function fetchQuotes() {
        const res = await fetch('/api/quotes')
        const resBody = await res.json();
        setQuotes(resBody.quotes)
    }

    useEffect(() => {
        fetchQuotes()
    }, [])

    return (
        <div>
            <h2 className={styles.tituloQ}>Quotes</h2>
            <Carousel className={styles.carouselQ} >
                {
                    quotes.map(quote => (
                        <Carousel.Item className={styles.itensCarouselQ}>
                            <Link className={styles.links} to={`/livros/${quote.livro._id}`}>
                                <div className={styles.quote}><i>{quote.quote}</i></div>
                            </Link>
                            <Carousel.Caption className={styles.autorTitulo}>
                                <div className={styles.autorTitulo}> <strong>{quote.titulo}, {quote.autor}</strong></div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Extras;