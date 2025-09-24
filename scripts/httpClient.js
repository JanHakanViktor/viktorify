import { settings } from "./config/config.js";

export async function HttpClient(endpoint) {
  try {
    const uri = settings.api_url + endpoint;
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error(
        `Något gick fel: ${response.status}, ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
}
