
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useState, useEffect } from "react";

import Home from "./Pages/Home";
import Yapilan from "./Pages/Yapilan";
import Ekle from "./Pages/Ekle";
import Layout from "./Pages/Layout";
import './App.css'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>     
          <Route index element={<Home />} />
          <Route path="ekle" element={<Ekle />} />  
          <Route path="yapilan" element={<Yapilan />} />
        </Route>  
      </Routes>
    </BrowserRouter>

  );
}

export default App
