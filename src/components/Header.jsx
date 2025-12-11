import { NavLink, Link } from "react-router-dom"
import { useBudget } from "../context/BudgetContext"

export default function Header({countCarrello}){
    const {budgetMode, setBudgetMode} = useBudget();
    
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
            nome: `Carrello ${countCarrello === 0 ? "" : countCarrello}`,
            path: "/carrello",
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
                    <div>
                        <h3>Inserisci budget</h3>
                        <input type="number" value={budgetMode} onChange={(event) => {setBudgetMode(event.target.value)}}/>
                    </div>
                </ul>
            </header>
        </>
    )
}