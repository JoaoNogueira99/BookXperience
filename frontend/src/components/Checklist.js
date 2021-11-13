import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Livro.module.css"

function Checklist() {
    const [livros, setChecklist] = useState([])

    async function fetchChecklist() {
        const res = await fetch('/api/checklist')
        const resBody = await res.json();

        setChecklist(resBody.livros)
    }
    useEffect(() => {
        fetchChecklist()
    }, [])

    return (
        <>
            <h2>Checklist</h2>
            <div className={styles.livros}>
                {
                    livros.map(livro => (
                        <div className={styles.livro}
                            key={livro._id}
                        >
                            <Link to={`/livros/${livro._id}`}>
                                <img src={livro.imagem} className={styles.imagem} />
                            </Link>

                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Checklist;