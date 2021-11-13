import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Autores.module.css"


function AutoresId() {
  const params = useParams();

  const [livros, setlivros] = useState()
  const [autor, setautor] = useState({})
  const [erro, setErro] = useState("")

  const fetchLivrosByAutor = async (id) => {
    console.log('id', id)
    if (!id) return
    try {
      const res = await fetch(`/api/autor/${id}`)
      if (res.status === 200) {
        const resObj = await res.json();
        setlivros(resObj.livros)
        setautor(resObj.autor)
        setErro("")
      } else {
        console.log(res.status)
        setErro('Ocorreu um erro: ' + res.statusText)
      }
    } catch (err) {
      console.log('fetch err', err)
    }
  }
  useEffect(() => {
    fetchLivrosByAutor(params.id)
  }, [params])


  if (livros) {
    return (
      <>
        <h2>Livros de <br></br>{autor.autor}</h2>
        <div className={styles.livros}>
          {
            livros.map(livro => (
              <div className={styles.livroIndividual}
                key={livro._id}>
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
  return (
    <div>
      <p>
        {erro}
      </p>
    </div>
  )
}



export default AutoresId;