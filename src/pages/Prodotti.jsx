import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
import GoBack from "../components/GoBack";
import Loading from "../components/Loading";
import { useBudget } from "../context/BudgetContext";


export default function Prodotti({ listaCarrello, setListaCarrello, prodotti, load }) {
    const [prodottiFiltrati, setProdottiFiltrati] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("");
    const [categorieProdotti, setCategorieProdotti] = useState([]);

    const { budgetMode } = useBudget();
    useEffect(() => {
        if (budgetMode !== "") {
            const copyArray = prodotti.filter(({ price }) => price <= parseInt(budgetMode))
            setProdottiFiltrati(copyArray)
        } else {
            setProdottiFiltrati(prodotti)
        }
    }, [budgetMode])

    useEffect(() => {
        setProdottiFiltrati(prodotti);
        const array = prodotti;
        const categoria = [];
        array.forEach(({ category }) => {
            !categoria.includes(category) && categoria.push(category);
        });
        setCategorieProdotti(categoria)
    }, [])

    useEffect(() => {
        if (filtroCategoria === "") {
            setProdottiFiltrati(prodotti)
        } else {
            const copyArray = prodotti.filter(({ category }) => category === filtroCategoria);
            setProdottiFiltrati(copyArray);
        }
    }, [filtroCategoria])

    function addCarrello(prodotto) {
        const newProduct = {
            titolo: prodotto.title,
            prezzo: prodotto.price,
            image: prodotto.image,
            id: prodotto.id,
        }
        const newArray =
            setListaCarrello([...listaCarrello, newProduct]);
    }


    return (
        <>
            <div className="container">
                <div className="header-page">
                    <GoBack />
                    <h2>I Nostri Prodotti</h2>
                </div>

                {load && <Loading />}
                {!load && <div className="titolo_prodotti">

                    <div className="filtri">
                        <label htmlFor="categoria">Filtra per categoria:</label>
                        <select name="categoria" id="categoria" value={filtroCategoria} onChange={(event) => setFiltroCategoria(event.target.value)}>
                            <option value="">Tutte</option>
                            {categorieProdotti.map((categoria, index) => (
                                <option key={index} value={categoria}>{categoria}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>}


                <div className="griglia">
                    {prodottiFiltrati.map((prodotto) => (
                        <div key={prodotto.id} className="col">
                            <Link to={`/prodotti/${prodotto.id}`} className="col-img">
                                <img src={prodotto.image} alt="" />
                            </Link>
                            <div className="col-content">
                                <span className="aggiungi_carrello" onClick={() => addCarrello(prodotto)}><i className="bi bi-cart"></i></span>
                                <Link to={`/prodotti/${prodotto.id}`} className="titolo">{prodotto.title}</Link>
                                <p className="prezzo text_blue">€ {prodotto.price}</p>
                                <p className="rating">{prodotto.rating.rate} <i className="bi bi-star-fill"></i>- {prodotto.rating.count} recensioni</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </>
    )
}
