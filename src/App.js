import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Error from './pages/Error';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/favorites" element={<Favorites />} />
          <Route element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
