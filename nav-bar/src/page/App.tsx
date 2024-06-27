import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import './app.scss';

const App = ()=>{
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