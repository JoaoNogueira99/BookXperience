import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Formik, Field } from 'formik';
import styles from "../styles/LivrosId.module.css"
import Rating from './Rating';
import { BiListPlus } from "@react-icons/all-files/bi/BiListPlus";
import { BiListCheck } from "@react-icons/all-files/bi/BiListCheck";
import React from 'react';
import Moment from 'react-moment';

function Livro() {
  const params = useParams();

  const [livro, setlivro] = useState(false)
  const [erro, setErro] = useState("")

  const fetchLivro = async (id) => {
    if (!id) return
    try {
      const res = await fetch(`/api/livros/${id}`)
      if (res.status === 200) {
        const resObj = await res.json();
        setlivro(resObj.livro)
        setErro("")
      } else {
        setErro('Ocorreu um erro: ' + res.statusText)
      }
    } catch (err) {
    }
  }
  useEffect(() => {
    fetchLivro(params.id)
  }, [params])


  const [comentarios, setComentarios] = useState([])

  async function fetchComentarios() {
    const res = await fetch(`/api/livros/${params.id}/comentarios`)
    const resBody = await res.json();
    setComentarios(resBody.comentarios)
  }
  useEffect(() => {
    fetchComentarios()
  }, [])

  if (livro) {
    return (
      <div className={styles.informacao}>
        <img className={styles.imagem} src={livro.imagem} /><br></br>
        <div className={styles.rating}><Rating id={livro._id} /></div><br></br>
        <div className={styles.buttons}>

          <button className={styles.favorito} onClick={
            livro.lido ?
              async () => {
                await removeChecklist(livro._id)
                await fetchLivro(params.id)
              }
              :
              async () => {
                await addChecklist(livro._id)
                await fetchLivro(params.id)
              }} >{livro.lido ? <BiListCheck size={25} /> : <BiListPlus size={25} />}
            {livro.lido ? 'Remover da Checklist' : 'Adicionar à Checklist'}

          </button>
          <button className={styles.favorito} onClick={
            livro.favorite ?
              async () => {
                await removeWishlist(livro._id)
                await fetchLivro(params.id)
              }
              :
              async () => {
                await addWishlist(livro._id)
                await fetchLivro(params.id)
              }} >{livro.favorite ? <BiListCheck size={25} /> : <BiListPlus size={25} />}
            {livro.favorite ? 'Remover da Wishlist' : `Adicionar à Wishlist`}

          </button>
        </div> <br></br>
        <p><strong>Título: </strong> {livro.titulo}</p>
        <p><strong>Autor: </strong> {livro.autor}</p>
        <p><strong>Género: </strong> {livro.genero}</p>
        <p><strong>Resumo: </strong> {livro.resumo}</p>

        <div>
          <Comentarios comentarios={comentarios} id={livro._id} />
          <AddComentario onAdd={async () => await fetchComentarios()} id={livro._id} />
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
async function addChecklist(id) {
  return await fetch(`/api/livros/${id}/checklist`, {
    method: "POST",
    body: JSON.stringify(),
    headers: { "Content-Type": "application/json" }
  })
}
async function removeChecklist(id) {
  return await fetch(`/api/livros/${id}/checklist`, {
    method: "DELETE",
    body: JSON.stringify(),
    headers: { "Content-Type": "application/json" }
  })
}


async function addWishlist(id) {
  return await fetch(`/api/livros/${id}/wishlist`, {
    method: "POST",
    body: JSON.stringify(),
    headers: { "Content-Type": "application/json" }
  })
}

async function removeWishlist(id) {
  return await fetch(`/api/livros/${id}/wishlist`, {
    method: "DELETE",
    body: JSON.stringify(),
    headers: { "Content-Type": "application/json" }
  })
}


function Comentarios({ id, comentarios }) {
  return (
    <>
      <h2>Comentários</h2>
      <div className={styles.comentarios}>
        {
          comentarios.map(comentario => (
            <div
              className={styles.comentario}
              key={comentario._id}
            >
              <p className={styles.boxComentario}>{comentario.comentario} </p>
              <p className={styles.boxData}><Moment date={comentario.date} format="DD/MM/YYYY" /></p>
            </div>
          ))
        }
      </div>
    </>

  )
}


function AddComentario({ id, onAdd }) {
  const history = useHistory()

  return (
    <>
      <div className={styles.commentsInput}>
        <Formik
          initialValues={{ comentario: '' }}


          onSubmit={async (values, { resetForm }) => {
            const res = await fetch(`/api/livros/${id}/comentarios`, {
              method: "POST",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" }
            })
            if (res.status === 201) {
              await onAdd()
              resetForm()
            }
          }}
        >
          {
            ({ handleSubmit, touched, errors }) => (
              <form className={styles.placeholder} onSubmit={handleSubmit}>
                <Field className={styles.caixaComentario}
                  label="Comentario"
                  type="text"
                  name="comentario"
                  placeholder="Escreva aqui o seu comentário"
                /><br></br>

                <button variant="primary" type="submit">Submeter</button>
              </form>
            )
          }
        </Formik>
      </div>
    </>
  )

}



export default Livro;