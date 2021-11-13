import React, { useState } from 'react'
import {
    Link, useHistory
} from "react-router-dom";
import BotaoVoltar from './BotaoVoltar';
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsPeopleCircle } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa";

function Home({ pagina }) {
    return <div className={pagina === "/" ? "paginaprincipal" : "geral"}>
        {pagina === "/" ? <NavBar /> : <NavBarGeral />}
        <div className={pagina === "/" ? "home" : "geral1"}>
            <h2 className="titulo">book<strong>xperience</strong></h2> <br></br>
                <Pesquisa /><br></br>
            <div className="caixa">

                <Link className="link" to="/autor"><button><BsPeopleCircle /><br></br>Autores</button></Link>

                <Link className="link" to="/livros"><button><FiBookOpen /><br></br>Livros</button></Link>

                <Link className="link" to="/genero"><button><FaPenFancy />Géneros</button></Link>
            </div>
        </div>

    </div>
}

function NavBarGeral() {
    return <div className="navBar">
        <Link><BotaoVoltar /></Link>
        <BsFillHouseDoorFill className="casa" /><Link className="nome" to="/">Olá Alberto</Link>
        <div className="items">
            <Link className="itemW" to="/wishlist">Wishlist</Link>
            <Link className="itemC" to="/checklist">Checklist</Link>
        </div>
    </div>
}

function NavBar() {
    return <div className="navBar">
        <BsFillHouseDoorFill className="casa1" /><Link className="nome1" to="/">Olá Alberto</Link>
        <div className="items">
            <Link className="itemW" to="/wishlist">Wishlist</Link>
            <Link className="itemC" to="/checklist">Checklist</Link>
        </div>
    </div>

}

function Pesquisa() {
    const history = useHistory()
    const [pesquisa, setPesquisa] = useState([])
    const [text, setText] = useState("")

    async function fetchSearch(text) {
        const res = await fetch(`/api/pesquisa?search=${text}`)
        const resBody = await res.json();
        console.log(resBody)
        setPesquisa(resBody)
    }

    function onInputChange(event) {
        console.log(event.target.value)
        setText(event.target.value)
    }

    function onSearch() {
        history.push(`/pesquisa?pesquisa=${text}`)
    }

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    }

    return (
        <div>
            <input className="barra-pesquisa"
                onKeyPress={handleKeyEnter}
                type="text"
                id="pesquisa"
                value={text}
                onChange={onInputChange}
                placeholder="Autor/Livro/Género"
            />
            <button className="pesquisar" onClick={onSearch}><BiSearchAlt2 /></button>
        </div>

    )

}

export default Home;