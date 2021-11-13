import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import styles from '../styles/Livro.module.css';

function GeneroId() {
  const params = useParams();
  const [genero, setgenero] = useState({})
  const [livros, setlivros] = useState([])
  const [erro, setErro] = useState("")

  const fetchLivrosByGenero = async (id) => {
    if (!id) return
    try {
      const res = await fetch(`/api/genero/${id}`)
      if (res.status === 200) {
        const resObj = await res.json();
        setgenero(resObj.genero)
        setlivros(resObj.livros)
        setErro("")
      } else {
        setErro('Ocorreu um erro: ' + res.statusText)
      }
    } catch (err) {
      console.log('fetch err', err)
    }
  }
  useEffect(() => {
    fetchLivrosByGenero(params.id)
  }, [params])


  if (livros) {
    return (
      <div>
        <h2 className={styles.titulo}>{genero.genero}</h2>
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
      </div>
    )
  }
  return (
    <div>
      <p>
        {erro}
      </p>
    </div>
  )
}
export default GeneroId;