import { Link } from "react-router-dom";
import GoBack from "../components/GoBack";
import { useCarrello } from "../context/CarrelloContext";
import { usePreferiti } from "../context/PreferitiContext";

export default function Preferiti({ prodotti }) {
    const { addCarrello } = useCarrello();
    const { listaPreferiti, removePreferito, isPreferito } = usePreferiti();

    const preferitiFinale = prodotti.filter(({ id }) => listaPreferiti.includes(id))
    return (
        <>
            <div className="container">
                <div className="header-page">
                    <GoBack />
                    <h2>I Nostri Prodotti</h2>
                </div>

                <div className="griglia">
                    {preferitiFinale.map((prodotto) => (
                        <div key={prodotto.id} className="col relative">
                            <Link to={`/prodotti/${prodotto.id}`} className="col-img">
                                <img src={prodotto.image} alt="" />
                            </Link>
                            <span onClick={() => { removePreferito(prodotto.id) }} className="preferiti"><i className="bi bi-suit-heart-fill"></i></span>
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