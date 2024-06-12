import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Form from './components/Form';


const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/form" element={<Form />} />
      </Routes>
    </>
  )
}

export default App

