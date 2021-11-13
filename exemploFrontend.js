
import React, { useEffect } from 'react'
import { Formik, Field } from 'formik'
import './App.css';

function App() {
  const [animais, setAnimais] = React.useState([])
  const [selecionado, setSelecionado] = React.useState()
  const [erro, setErro] = React.useState("")

  async function fetchAnimals() {
    const res = await fetch('/api/animal')
    const resBody = await res.json();
    console.log('mount', resBody)
    setAnimais(resBody.animais)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  useEffect(() => console.log('update: ', animais), [animais])

  const fetchAnimal = async (id) => {
    if (!id) return
    const res = await fetch(`/api/animal/${id}`)
    if (res.status === 200) {
      const resObj = await res.json();
      setSelecionado(resObj.animal)
      setErro("")
    } else {
      setErro('Ocorreu um erro: ' + res.statusText)
    }
  }

  const onClose = async () => {
    setSelecionado(() => undefined)
    fetchAnimals()
  }

  return (
    <div className="App">
      {erro.length > 0 && <strong>ERRO: {erro}</strong>}
      {
        selecionado
          ? <Animal
            animal={selecionado}
            onClose={onClose}
            onUpdate={async () => {
              const promises = [
                fetchAnimals(),
                fetchAnimal(selecionado?._id)
              ]
              await Promise.all(promises)
              console.log('recebemos as duas')
            }}
          />
          : <AnimalList
            animais={animais}
            onSelect={fetchAnimal}
          />
      }

      <CreateAnimal
        onCreate={fetchAnimal}
      />

    </div>
  );
}

const CustomInput = ({ field, form, meta, ...props }) => {
  return (
    <div>
      <p><input {...field} {...props} /></p>
      <p style={{color: 'red'}}>
        {form.touched[field.name] && form.errors[field.name]}
      </p>
    </div>
  )
};

function CreateAnimal({ onCreate }) {
  return (
    <Formik
      initialValues={{ name: '', birthday: '' }}
      validate={(values) => {
        let err = {}

        if (values.name.length < 3) {
          err.name = "Este campo deve ter mais de 2 caracteres."
        }
        if (new Date(values.birthday) == "Invalid Date") {
          err.birthday = "Data Inválida"
        }

        return err
      }}
      onSubmit={async (values, { resetForm }) => {
        console.log(values)
        const res = await fetch(`/api/animal`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" }
        })
        console.log(res.status)
        if (res.status === 201) {
          const { id } = await res.json()
          onCreate(id)
          resetForm()
        }
      }}
    >
      {
        ({ handleSubmit, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <Field 
              type="text" 
              name="name" 
              placeholder="Nome do Animal..." 
              component={CustomInput} />

            <Field 
              type="text" 
              name="birthday" 
              placeholder="Data de Nascimento" 
              component={CustomInput} />

            <button type="submit">Submeter</button>
          </form>
        )
      }
    </Formik>
  )
}

function Animal({ animal, onClose, onUpdate }) {
  if (animal) {
    return (
      <div>
        <span>{JSON.stringify(animal)}</span>
        <Formik
          initialValues={animal}
          onSubmit={async (values) => {
            console.log(values)

            const res = await fetch(`/api/animal/${animal._id}`, {
              method: "PATCH",
              body: JSON.stringify(values),
              headers: { "Content-Type": "application/json" }
            })
            console.log(res.status)
            if (res.status === 200) {
              onUpdate()
            }
          }}
        >
          {
            ({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Field type="text" name="name" placeholder="Nome do Animal..." />
                <Field type="text" name="birthday" placeholder="Data de Nascimento" />

                <button type="submit">Submeter</button>
              </form>
            )
          }
        </Formik>
        <button onClick={onClose}>Fechar</button>
      </div>
    )
  }
  return <div>Selecione um animal</div>
}

function AnimalList(props) {
  console.log('AnimalList Props', props)
  // props.animais
  return (
    <ul>
      {
        props.animais.map(animal => (
          <li
            key={animal._id}
            onClick={() => props.onSelect(animal._id)}
          >
            {animal.name}
          </li>
        ))
      }
    </ul>
  )
}

export default App;
