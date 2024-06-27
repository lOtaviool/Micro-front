import { useLocation } from 'react-router-dom';
import './app1.scss';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
    const location = useLocation();
    const userData: any = location.state;


  return (
    <div className='container'>
    <div className='menu'>
    <div className='logo'>
        <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" alt="Logo React" width="100" height="100" />
        <h1>React.js</h1>
    </div>
    {userData ? (
        <>
        <h2>Seja Bem Vindo {userData?.name}!</h2>
        </>
    ) : (
        <h2>Carregando dados do usuário...</h2>
    )}
    </div>
    </div>
  );
}

export default App;
