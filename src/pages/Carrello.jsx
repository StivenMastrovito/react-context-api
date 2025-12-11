import { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { useCarrello } from "../context/CarrelloContext";
import { usePreferiti } from "../context/PreferitiContext";

export default function Carrello() {
    const { listaCarrello, removeCarrello } = useCarrello();

    const {isPreferito, addPreferito, removePreferito} = usePreferiti();

    const [tot, setTot] = useState(0);
    useEffect(() => {
        let somma = 0;
        listaCarrello.forEach(({ prezzo }) => {
            somma += prezzo;
        });
        setTot(somma);
    }, [listaCarrello])


    return (
        <>


            <div className="container-carrello">
                <div className="header-page">
                    <GoBack />
                    <h2>Il tuo carrello</h2>
                    <h2>Totale: € {tot}</h2>
                </div>
                <div className="griglia">
                    {listaCarrello.map((prodotto, index) => (
                        <div key={index} className="col_carrello">
                            <div className="col-img-carrello relative">
                                <img src={prodotto.image} alt="" />
                                <span onClick={() => { isPreferito(prodotto.id) ? removePreferito(prodotto.id) : addPreferito(prodotto.id) }} className="preferiti">{isPreferito(prodotto.id) ? <i className="bi bi-suit-heart-fill"></i> : <i className="bi bi-suit-heart"></i>}</span>
                            </div>
                            <div className="col-content-carrello">
                                <div className="">
                                    <p className="mb-10">{prodotto.titolo}</p>
                                    <p>€ {prodotto.prezzo}</p>
                                </div>
                                <span className="elimina-carrello" onClick={() => removeCarrello(index)}><i className="bi bi-cart-x"></i></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}