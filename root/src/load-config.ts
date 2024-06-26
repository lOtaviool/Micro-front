import config from '../public/app-config.json'
export async function loadConfig() {
    // const response = await fetch('/path/to/app-config.json');
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch configuration: ${response.statusText}`);
    // }
    return await config;
  }