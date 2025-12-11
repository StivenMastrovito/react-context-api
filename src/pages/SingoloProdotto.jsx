import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import GoBack from "../components/GoBack";
import Loading from "../components/Loading";
import { useCarrello } from "../context/CarrelloContext";

export default function SingoloProdotto() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [singoloProdotto, setSingoloProdotto] = useState(null);
    const [index, setIndex] = useState(id);
    const [maxIndex, setMaxIndex] = useState(100)
    const [load, setLoad] = useState(true);

    const {addCarrello} = useCarrello();

    useEffect(() => {
        setLoad(true);
        axios.get(`https://fakestoreapi.com/products/${index}`).then((resp) => {
            setSingoloProdotto(resp.data)
            if (resp.data === "") { navigate("/prodotti"); }
            setLoad(false);
        })
    }, [id, index])

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`).then((resp) => {
            setMaxIndex(resp.data.length);
        })
    }, [])

    function prodottoPrecedente() {
        setIndex((current) => parseInt(current) - 1);
    }
    function prodottoSuccessivo() {
        setIndex((current) => parseInt(current) + 1);
    }

    return (
        <>
            <div className="container">
                <GoBack />
                {load && <Loading />}
                {!load &&
                    <div className="col_carrello">
                        <div className="col-img-carrello">
                            <img src={singoloProdotto.image} alt="" />
                        </div>
                        <div className="col-content-carrello">
                            <p className="fs-2">{singoloProdotto.title}</p>
                            <p>{singoloProdotto.description}</p>
                            <p className="text_blue">€ {singoloProdotto.price}</p>
                            <div className="flex">
                                <p>{singoloProdotto.rating.rate} <i className="bi bi-star-fill"></i> / {singoloProdotto.rating.count} recensioni</p>
                                <span className="aggiungi_carrello" onClick={() => addCarrello(singoloProdotto)}><i className="bi bi-cart"></i></span>
                            </div>
                        </div>
                    </div>
                }
                <div className="cambia-prodotto">
                    <button disabled={index === 1 ? true : false} className="btn-avanti-dietro" onClick={prodottoPrecedente}><i className="bi bi-arrow-left"></i></button>
                    <h4>Cambia prodotto</h4>
                    <button disabled={index === maxIndex ? true : false} className="btn-avanti-dietro " onClick={prodottoSuccessivo}><i className="bi bi-arrow-right"></i></button>
                </div>
            </div>
        </>
    )
}
