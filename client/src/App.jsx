import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import ViewStore from './components/ViewStore'
import StoreForm from './components/StoreForm'
import axios from 'axios'
import EditStore from './components/EditStore'

function App() {

  const [allStores, setAllStores] = useState([]);

  useEffect( () => {
      axios.get('http://localhost:8000/api/stores')
          .then( res => setAllStores(res.data))
          .catch( err => console.log(err))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home allStores={allStores} setAllStores={setAllStores}/>}/>
        <Route path={'/stores/add'} element={<StoreForm allStores={allStores} setAllStores={setAllStores}/>}/>
        <Route path={'/stores/edit/:id'} element={<EditStore allStores={allStores} setAllStores={setAllStores}/>}/>
        <Route path={'/stores/:id'} element={<ViewStore />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
