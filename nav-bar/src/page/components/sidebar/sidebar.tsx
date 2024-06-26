import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss';

interface Props {
  user: any,
}

const Sidebar: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();


  const handleClick = (path: string, userdata: any, local: string)=>{

    switch (local){
      case 'react':
        navigate(path, {state: user})
        break;
      case 'angular':
        dispatchEvent(new CustomEvent('userAngular', { detail: user}))
        navigate(path)
        break;
      case 'vue':
        dispatchEvent(new CustomEvent('userVue', { detail: user}))
        navigate(path)
        break;
      default :
        console.log('Nenhum evento emitido!')
        break;
    }
    
  }


  return (
      <div className="sidebar">
        <h2>Back-Office Anota</h2>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a onClick={() => handleClick('/app1', user, 'react')}>App1</a>
          </li>
          <li>
            <a onClick={() => handleClick('/app2', user, 'angular')}>App2</a>
          </li>
          <li>
            <a onClick={() => handleClick('/app3', user, 'vue')}>App3</a>
          </li>
        </ul>
      </div>
  );
};

export default Sidebar;