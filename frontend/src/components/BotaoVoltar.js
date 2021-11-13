import { useHistory, useLocation } from "react-router-dom";
import styles from '../styles/Home.modules.css'
import { AiOutlineArrowLeft } from "react-icons/ai/";


function BotaoVoltar() {
    const location = useLocation();
    const history = useHistory();

    function back() {
        console.log(location)
        const { pathname } = location
        const lastSlashIndex = pathname.lastIndexOf("/");
        const newPath = pathname.slice(0, lastSlashIndex === 0 ? 1 : lastSlashIndex)
        console.log(`ir para ${newPath}`)
        history.push(newPath)
    }

    if (location.pathname === "/") {
        return null
    }

    return <button className="seta" onClick={back}><AiOutlineArrowLeft color='white' /> </button>
}

export default BotaoVoltar