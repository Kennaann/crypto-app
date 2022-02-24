import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Routes, Route} from 'react-router-dom'
import Coins from './components/Coins'
import Coin from './routes/Coin'
import Navbar from './components/Navbar'

import './index.css'
function App() {

  // Hook pour le state qui va retourner un tableau de coins
  const [coins, setCoins] = useState([]) // "[]" car l'Api retourne un tableau 

  // url de ma requête vers l'API CoinGecko
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false'

  // remplace "componentDidMount" "componentWillMount"
  useEffect(() => {
    axios.get(url).then((response) => { // avec axios je récupère l'url qui va me renvoyer dans la réponse un tableau avec mes données
      setCoins(response.data)
    }).catch((error) => {  // si il y a des erreurs je les affiches
      console.log(error) 
    })
  }, []) // "[]" pour pas que l'api fasse des appels en continue 

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Coins coins={coins} />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element={<Coin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
