import { createContext, useContext, useState } from "react";

const PreferitiContext = createContext();

function PreferitiProvider({children}){
    const [listaPreferiti, setListaPreferiti] = useState([]);

    function isPreferito(id){
        return listaPreferiti.includes(parseInt(id));
    }

    function addPreferito(id){
        setListaPreferiti([...listaPreferiti, id])
    }

    function removePreferito(id){
        setListaPreferiti(listaPreferiti.filter((idPreferito) => idPreferito !== id))
    }

    const valuePreferitiContext = {
        listaPreferiti,
        isPreferito,
        addPreferito,
        removePreferito,
    }

    return(
        <PreferitiContext value={valuePreferitiContext}>
            {children}
        </PreferitiContext>
    )
}

function usePreferiti(){
    const value = useContext(PreferitiContext);
    return value;
}

export {PreferitiProvider, usePreferiti}