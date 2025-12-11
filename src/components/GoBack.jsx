import { useNavigate } from "react-router-dom"

export default function GoBack(){
    const navigate = useNavigate();
    return (
        <button className="goBack" onClick={()=>navigate(-1)}><i className="bi bi-arrow-left"></i></button>
    )
}