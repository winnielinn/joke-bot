import axios from 'axios'
import * as url from '../configs/api-url.json'

type ChineseJoke = {
  description: string
  answer: string
}

export async function getChineseJoke() {
  let reply = ''
  try {
    const response = await axios.get<ChineseJoke>(`${url.CHINESE_JOKE_URL}`)
    const { data } = response
    reply = data.answer !== '' ? `Q: ${data.description}\nA: ${data.answer}` : `${data.description}`
    return {
      type: 'text',
      text: reply
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(`error message: ${err.message}`)
      return err.message
    } else {
      console.log(`unexpected error: ${err}`)
      return 'An unexpected error occurred'
    }
  }
}