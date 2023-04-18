import fetch from 'node-fetch';
import * as url from '../configs/api-url.json'

export async function getEnglishJoke() {
  try {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    };
    const response = await fetch(`${url.ENGLISH_JOKE_URL}`, options);
    const data = await response.json();
    return {
      type: 'text',
      text: data.joke
    }
  } catch (err) {
    console.error(err)
  }
}