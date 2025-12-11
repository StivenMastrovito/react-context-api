import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <div className="container">
            <section className="section_hero">
                <Link to="/prodotti"><button className="acquista">ACQUISTA ORA</button></Link>
            </section>
        </div>
            
        </>
    )
}