import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/Autores.module.css'


function Autores() {
    const [autores, setAutores] = useState([])

    async function fetchAutores() {
        const res = await fetch('/api/autor')
        const resBody = await res.json();
        // console.log('mount', resBody)
        setAutores(resBody.autores)
    }
    useEffect(() => {
        fetchAutores()
    }, [])

    return (
        <>
        <h2>Autores</h2>  
            <div className = {styles.autores}>
                {
                    autores.map(autores => (
                        <div
                            className = {styles.autorIndividual}
                            key={autores._id}
                        >
                            <Link to={`/autor/${autores._id}`}>
                                <figure>
                                <img className={styles.imagemAutor} src = {autores.imagemAutor} />
                                <figcaption>{autores.autor}</figcaption>
                                </figure>
                            </Link>
                        </div>    
                    
                    ))
                }
            </div>
        </>
    )
}

export default Autores;