import { useEffect, useState } from "react";
import {
    Link
} from "react-router-dom";
import styles from "../styles/Livro.module.css"

function Livros() {
    const [livros, setLivros] = useState([])

    async function fetchLivros() {
        const res = await fetch('/api/livros')
        const resBody = await res.json();
        setLivros(resBody.livros)
    }
    useEffect(() => {
        fetchLivros()
    }, [])

    return (
        <>
            <h2>Livros</h2>
            <div className={styles.livros}>
                {
                    livros.map(livro => (
                        <div
                            className={styles.livroIndividual}
                            key={livro._id}
                        >
                            <Link to={`/livros/${livro._id}`}>
                                <img className={styles.imagem} src={livro.imagem} />
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}


export default Livros;