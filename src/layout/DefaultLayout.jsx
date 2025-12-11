import { Outlet } from "react-router-dom"
import Header from "../components/Header"

export default function DefaultLayout({countCarrello}){
    return(
        <>
            <Header countCarrello = {countCarrello}/>
            <main>
                <Outlet />
            </main>
        </>
    )
}