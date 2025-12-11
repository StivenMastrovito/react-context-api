import { NavLink, Link } from "react-router-dom"
import { useBudget } from "../context/BudgetContext"
import { useCarrello } from "../context/CarrelloContext";

export default function Header(){
    const {budgetMode, setBudgetMode} = useBudget();
    const { listaCarrello } = useCarrello();
    
    const links = [
        {
            nome: "Home",
            path: "/",
        },
        {
            nome: "Prodotti",
            path: "/prodotti",
        },
        {
            nome: "Chi Siamo?",
            path: "/chi-siamo",
        },
        {
            nome: `Carrello ${listaCarrello.length === 0 ? "" : listaCarrello.length}`,
            path: "/carrello",
        },
        {
            nome: `Preferiti`,
            path: "/preferiti",
        },

    ]
    

    return (
        <>
            <header>
                <Link to="/"><img src="/Logoe-commerce.png" alt="" height={"80px"}/> </Link>
                <ul>
                    {links.map((link, index) => (
                    <li key={index} onClick={link.funzione && (() => setBudgetMode((current) => !current))}><NavLink to={link.path}>{link.nome}</NavLink></li>
                    ))
                    }
                    <div className="flex">
                        <p>Inserisci budget</p>
                        <input type="number" value={budgetMode} onChange={(event) => {setBudgetMode(event.target.value)}}/>
                    </div>
                </ul>
            </header>
        </>
    )
}