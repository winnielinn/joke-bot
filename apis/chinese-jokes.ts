import axios from 'axios'

type ChineseJoke = {
  description: string;
  answer: string;
}

export async function getChineseJoke() {
  let reply = ''
  try {
    const response = await axios.get<ChineseJoke>(
      'https://quiet-atoll-68130.herokuapp.com/api/chinesejoke'
    )
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