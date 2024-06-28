import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './sidebar.scss';

interface Props {
  user: any,
}

interface Application {
  name?: string,
  path?: string,
  type?: string,
  tag?: string,
  role?: string,
}

const Sidebar: React.FC<Props> = ({user}) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const navigate = useNavigate();

  const handleClick = (path: string, type: string)=>{

    switch (type){
      case 'React':
        navigate(path, {state: user})
        break;
      case 'Angular':
        dispatchEvent(new CustomEvent('userAngular', { detail: user}))
        navigate(path)
        break;
      case 'Vue':
        dispatchEvent(new CustomEvent('userVue', { detail: user}))
        navigate(path)
        break;
      default :
        console.log('Nenhum evento emitido!')
        break;
    }
    
  }

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const response = await fetch('app-config.json');
        const data = await response.json();
        
        if (user && user.permissions) {
          const filteredApps = data.applications.filter((app: Application) =>
            user.permissions.includes(app.role)
          );
          setApplications(filteredApps);
        } 

      } catch (error) {
        console.error(error);
      }
    };

    loadApplications();
  }, [user]);

  return (
      <>
        <div className="sidebar">
        <h2>Back-Office Anota</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {applications.map((app, index) => (
              <li key={index}>
                <a onClick={() => handleClick(app.path, app.type)}>{app.tag}</a>
              </li>
            ))}
          </ul>
        </div>
      
      </>
  );
};

export default Sidebar;