import { Client, WebhookEvent, ClientConfig, TextMessage } from '@line/bot-sdk'
import * as dotenv from 'dotenv'
import { menuMessage } from './messages/flex-message'
import { welcomeMessage } from './messages/text-message'


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
    // await jokeGenerator(client, response)
  } catch (err) {
    console.log(err)
  }
  if (response.type !== 'message') {
    return
  }
  const { replyToken } = response

  if (response.message.type === 'text') {
    const { text } = response.message
    const responseText: TextMessage = {
      type: 'text',
      text,
    }
    await client.replyMessage(replyToken, responseText)
  } else {
    await client.replyMessage(replyToken, menuMessage)
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