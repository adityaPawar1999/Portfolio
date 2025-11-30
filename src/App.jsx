import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

import Account from './Modules/Accounting/Account'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/crm" element={<NotFound />} />
          <Route path="/sales" element={<NotFound />} />
          <Route path="/stock" element={<NotFound />} />

           <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;