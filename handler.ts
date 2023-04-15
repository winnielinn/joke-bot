import { Client, WebhookEvent, ClientConfig, TextMessage } from '@line/bot-sdk'
import * as dotenv from 'dotenv';


export const webhook = async (event: any, _context: any) => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }
  const clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
    channelSecret: process.env.CHANNEL_SECRET,
  };
  const client = new Client(clientConfig)
  const body: any = JSON.parse(event.body)
  const response: WebhookEvent = body.events[0]

  if (response.type !== 'message' || response.message.type !== 'text') {
    return
  }

  const { replyToken } = response;
  const { text } = response.message;

  const responseText: TextMessage = {
    type: 'text',
    text,
  };

  await client.replyMessage(replyToken, responseText);
};
