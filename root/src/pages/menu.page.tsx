import { registerApplication, start, LifeCycles } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";

interface AppConfig {
  applications: Application[];
}

interface Application {
  name: string;
  path: string;
  url: string;
}

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

async function sendData() {
  const userName = 'lOtaviool';
  fetch(`https://api.github.com/users/${userName}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário no GitHub');
    }
    return response.json();
  })
  .then(data=>{
    sessionStorage.setItem('user', JSON.stringify(data));
  })
  .catch(error => {
    console.error('Erro:', error);
  });

  
}

export default async function MenuPage(): Promise<void>{
  await sendData();
  await buildImportMap();
  await CreateLayout();
}

MenuPage()

