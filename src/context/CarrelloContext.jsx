import { createContext, useContext, useState } from "react";

const CarrelloContext = createContext();

function CarrelloProvider({children}) {
    const [listaCarrello, setListaCarrello] = useState([]);

    function addCarrello(prodotto) {
        const newProduct = {
            titolo: prodotto.title,
            prezzo: prodotto.price,
            image: prodotto.image,
            id: prodotto.id,
        }
        const newArray = setListaCarrello([...listaCarrello, newProduct]);
    }

    function removeCarrello(indexDelete) {
        const copyArray = listaCarrello.filter((prodotto, indice) => indice !== indexDelete);
        setListaCarrello(copyArray);
    }

    const valueCarrelloContext = {
        listaCarrello,
        addCarrello,
        removeCarrello,
    }
    
    return (
        <CarrelloContext value={valueCarrelloContext}>
            {children}
        </CarrelloContext>
    )
}

function useCarrello(){
    const value = useContext(CarrelloContext);
    return value;
}

export { CarrelloProvider, useCarrello }