import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const [timer, setTimer] = useState(5);
    const navigate = useNavigate();
    
    useEffect(()=>{
        setInterval(()=>{
            setTimer((current) => current - 1);
        }, 1000)
        setTimeout(()=>{
            navigate("/")
        }, 5000)
        
    },[])

    return(
        <>
            <div className="container-error-page">
               <h1>Error 404</h1>
               <h2>Pagina non trovata</h2>
               <h3>Sarai reinderizzato alla home tra {timer} secondi</h3> 
            </div>
        </>
    )
}