import React, { useEffect, useState } from 'react'
import {
    Link,
    useParams,
    useLocation
} from "react-router-dom";
import queryString from "query-string"
import styles from "../styles/Resultados.module.css"


function ResultadosPesquisa() {
    const location = useLocation()
    const params = useParams()
    const [results, setResults] = useState({ livros: [], autores: [], generos: []})

    const query = queryString.parse(location.search)
    console.log(location, params, query)
    
    async function fetchSearch(text) {
        const res = await fetch(`/api/pesquisa?search=${text}`)
        const resBody = await res.json();
        console.log('res', resBody)
        setResults(resBody)
    }

    useEffect(() => {
        fetchSearch(query.pesquisa)
    }, [query.pesquisa])

    return (
        <>
        <h3>Resultados da pesquisa</h3>
            <div className={styles.livros}>
         {results.livros.length === 0 && <span className={styles.noResults}>Não foram encontrados resultados</span> }  
            { 
                results.livros && results.livros.map(livro => (
                    <div className={styles.livroIndividual}
                        key={livro._id}
                    >
                        <Link to={`/livros/${livro._id}`}>
                        <img className = {styles.imagem} src = {livro.imagem} />
                        </Link>
                    </div>
                )) 
            }
            </div>
        </>
    )
}

export default ResultadosPesquisa;