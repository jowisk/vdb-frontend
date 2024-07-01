import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import AddClothing from './pages/AddClothing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}> </Route>
        <Route path='/subirprenda' element={<AddClothing/>}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
