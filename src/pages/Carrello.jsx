import { useEffect, useState } from "react";
import GoBack from "../components/GoBack";
import { useCarrello } from "../context/CarrelloContext";

export default function Carrello() {
    const {listaCarrello, removeCarrello} = useCarrello();

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
                            <div className="col-img-carrello">
                                <img src={prodotto.image} alt="" />
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