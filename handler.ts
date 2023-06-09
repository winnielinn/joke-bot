import { Client, WebhookEvent, ClientConfig, TextMessage } from '@line/bot-sdk'
import * as dotenv from 'dotenv'
import { menuMessage } from './messages/flex-message'
import { welcomeMessage } from './messages/text-message'
import { getChineseJoke } from './apis/chinese-jokes'
import { getEnglishJoke } from './apis/english-jokes'


export const webhook = async (event: any, _context: any) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
  }
  const clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.CHANNEL_SECRET,
  }
  const client = new Client(clientConfig)
  const body: any = JSON.parse(event.body)
  const response: WebhookEvent = body.events[0]
  try {
    await addFriendWelcome(client, response)
    await messageTextJokeGenerator(client, response)
    await messagePostbackJokeGenerator(client, response)
  } catch (err) {
    console.error(err)
  }
}

const addFriendWelcome = async (client: Client, event: WebhookEvent): Promise<void> => {
  try {
    if (event.type !== 'follow') return
    const { replyToken } = event
    await client.replyMessage(replyToken, welcomeMessage)
  } catch (err) {
    console.error(err)
  }
}

const messageTextJokeGenerator = async (client: Client, event: WebhookEvent): Promise<void> => {
  try {
    if (event.type !== 'message') return
    const { replyToken } = event
    const { message } = event
    switch (message.type) {
      case 'text': 
        const { text }: TextMessage = message
        if (text === '隨機中文笑話') {
          const chineseJoke = (await getChineseJoke()) as TextMessage
          await client.replyMessage(replyToken, chineseJoke)
        } else if (text === '隨機英文笑話') {
          const englishJoke = (await getEnglishJoke()) as TextMessage
          await client.replyMessage(replyToken, englishJoke)
        } else {
          await client.replyMessage(replyToken, menuMessage)
        }
      break
      default:
        await client.replyMessage(replyToken, menuMessage)
    }
  } catch (err) {
    console.error(err)
  }
}

const messagePostbackJokeGenerator = async (client: Client, event: WebhookEvent): Promise<void> => {
  try {
    if (event.type !== 'postback') return
    const { replyToken } = event
    const { postback } = event
    console.log('postback', postback)
    switch (postback.data) {
      case 'randomChineseJoke': 
        const chineseJoke = (await getChineseJoke()) as TextMessage
        await client.replyMessage(replyToken, chineseJoke)
      break
      case 'randomEnglishJoke':
        const englishJoke = (await getEnglishJoke()) as TextMessage
        await client.replyMessage(replyToken, englishJoke)
      break
    }
  } catch (err) {
    console.error(err)
  }
}