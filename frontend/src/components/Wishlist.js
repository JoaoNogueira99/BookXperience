import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Livro.module.css"

function Wishlist() {
    const [livros, setWishlist] = useState([])

    async function fetchWishlist() {
        console.log('cenas')
        const res = await fetch('/api/wishlist')
        const resBody = await res.json();
        console.log('mount', resBody)
        setWishlist(resBody.livros)
    }
    useEffect(() => {
        fetchWishlist()
    }, [])

    return (
        <>
            <h2>Wishlist</h2>
            <div className={styles.livros}>
                {
                    livros.map(livro => (
                        <div className={styles.livroIndividual}
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
export default Wishlist;