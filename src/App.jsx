import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './layout/DefaultLayout'
import Home from './pages/Home'
import Prodotti from './pages/Prodotti'
import ChiSiamo from './pages/ChiSiamo'
import Carrello from './pages/Carrello'
import NotFound from "./pages/NotFound"
import { useEffect, useState } from 'react'
import SingoloProdotto from './pages/SingoloProdotto'
import axios from 'axios'
import { BudgetProvider } from './context/BudgetContext'
import { CarrelloProvider, useCarrello } from './context/CarrelloContext'

function App() {
  const [prodotti, setProdotti] = useState([]);
  const [load, setLoad] = useState(true);
  // const { listaCarrello } = useCarrello();
 
  useEffect(() => {
    setLoad(true);
    axios.get("https://fakestoreapi.com/products").then((resp) => {
      setProdotti(resp.data);
      setLoad(false)
    })
  }, [])

  CarrelloProvider();

  return (
    <>
      <CarrelloProvider>
        <BudgetProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout
                countCarrello={listaCarrello.length} />}>
                <Route path='/' element={<Home />} />
                <Route path='/prodotti' element={<Prodotti
                  prodotti={prodotti}
                  load={load} />} />
                <Route path='/chi-siamo' element={<ChiSiamo />} />
                <Route path='/carrello' element={<Carrello
                />} />
                <Route path='/prodotti/:id' element={<SingoloProdotto
                />} />
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </BudgetProvider>
      </CarrelloProvider>

    </>
  )
}

export default App
