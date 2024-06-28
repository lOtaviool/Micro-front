import { registerApplication, start, LifeCycles } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

interface AppConfig {
  applications: Application[];
}

interface Application {
  name: string;
  path: string;
  url: string;
}

const secretKey = CryptoJS.enc.Utf8.parse('12345678901234567890123456789012');

async function loadAppConfig(): Promise<AppConfig> {
  const response = await fetch('app-config.json');
  const data = await response.json();
  return data;
}

async function buildImportMap(): Promise<void> {
  const appConfig = await loadAppConfig();

  const imports: Record<string, string> = {};
  appConfig.applications.forEach(app => {
    imports[app.name] = app.url;
  });

  const script = document.createElement('script');
  script.type = 'systemjs-importmap';
  script.textContent = JSON.stringify({ imports });
  document.head.appendChild(script);
}


async function CreateLayout(): Promise<void>{
  const appConfig = await loadAppConfig();

  const layoutHtml = `
    <single-spa-router>
      <main>
        ${appConfig.applications.map(app => `
          <route path="${app.path}">
            <application name="${app.name}"></application>
          </route>
        `).join('')}
      </main>
    </single-spa-router>
  `;

  const layoutElement = document.createElement('div');
  layoutElement.id = 'single-spa-layout';
  layoutElement.innerHTML = layoutHtml;
  document.body.appendChild(layoutElement);

  const routes = constructRoutes(layoutHtml);

  const applications = constructApplications({
    routes,
    loadApp({ name }) {
      return System.import(name).then((app: any)=>{
        if (!app.unmount) {
          console.log('APP', app)
          throw new Error(`Application ${name} does not export the lifecycle functions`);
        }
        return app;
      })
    },
  });

  const layoutEngine = constructLayoutEngine({routes: routes, applications: applications});
  
  applications.forEach(registerApplication);
  layoutEngine.activate();
  start();
}

function encryptData(data) { 
  try {
    const stringData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(stringData, secretKey, { 
      mode: CryptoJS.mode.ECB, 
      padding: CryptoJS.pad.Pkcs7 
    });
    return encrypted.toString();

  } catch (error) {
    console.error(error);
    return null;
  }
}

function setSecureCookie(data) {
  const encryptedData = encryptData(data);
  Cookies.set('secureData', encryptedData, { expires: 7, secure: true, sameSite: 'Strict' });
}

async function sendData() {
  const userData = {
    id: "uuid",
    externalId: 12345,
    name: "Luis Teste",
    login: "luis.teste@anota.ai",
    permissions: [
        "UPDATE_PRODUCT",
        "VIEW_PRODUCT",
    ],
    profile: "Tech"
  }

  setSecureCookie(userData);
  
}

export default async function MenuPage(): Promise<void>{
  await sendData();
  await buildImportMap();
  await CreateLayout();

}

MenuPage()

