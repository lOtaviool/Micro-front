import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import './app.scss';
import postis from 'postis';

interface User {
  nome: string,
  id: number,
  token: string
}

const App = ()=>{
  const port = location.port;
  const [userTeste, setUserTeste] = useState<any>();
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');

  return (
    <Router>
      <div className="app">
        <Sidebar user={userData}/>
        <Content />
      </div>
    </Router>
  );
}

export default App;