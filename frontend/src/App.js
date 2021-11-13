
import React from 'react'
import Autores from './components/Autores';
import Livros from './components/Livros';
import Home from './components/Home';
import AutoresId from './components/AutoresId';
import LivrosId from './components/LivrosId';
import Genero from './components/Genero';
import GeneroId from './components/GeneroId';
import Extras from './components/Extras';


import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import ResultadosPesquisa from './components/ResultadosPesquisa';
import Checklist from './components/Checklist';
import Wishlist from './components/Wishlist';



function App() {
  const location = useLocation()

  return <div>

    <Home pagina={location.pathname} />
    <Switch>
      <Route exact path="/" children={<Extras />} />

      <Route exact path="/checklist" children={<Checklist />} />

      <Route exact path="/wishlist" children={<Wishlist />} />

      <Route exact path="/autor" children={<Autores />} />

      <Route exact path="/livros" children={<Livros />} />

      <Route exact path="/genero" children={<Genero />} />

      <Route path="/pesquisa" children={<ResultadosPesquisa />} />

    </Switch>
    <Switch>
      <Route path="/autor/:id" children={<AutoresId />} />

      <Route path="/livros/:id" children={<LivrosId />} />

      <Route path="/genero/:id" children={<GeneroId />} />
    </Switch>
  </div>
}


export default App;