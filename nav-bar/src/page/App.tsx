import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Content from './components/content/content';
import './app.scss';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useEffect, useState } from 'react';

const secretKey = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012'); // Chave de 32 caracteres para AES-256

const App = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const encryptedData = Cookies.get('secureData');
    const decryptedData = decryptData(encryptedData);
    setUserData(decryptedData);
  }, []);

  function decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, secretKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });

      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(decryptedData);

    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <Router>
      <div className="app">
        <Sidebar user={userData} />
        <Content />
      </div>
    </Router>
  );
}

export default App;
