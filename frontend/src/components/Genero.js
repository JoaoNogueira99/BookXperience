import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Genero.module.css"

function Genero() {
    const [generos, setGeneros] = useState([])

    async function fetchGenero() {
        const res = await fetch('/api/genero')
        const resBody = await res.json();

        setGeneros(resBody.generos)
    }
    useEffect(() => {
        fetchGenero()
    }, [])

    return (
        <>
            <h2>Géneros</h2>
            <div className={styles.livros}>
                {
                    generos.map(generos => (
                        <div className={styles.livroIndividual}
                            key={generos._id}
                        >
                            <Link to={`/genero/${generos._id}`}><button className={styles.botaoG}>
                                <div>{generos.genero}</div>
                            </button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}



export default Genero;