import { FlexBox, FlexImage, FlexMessage } from '@line/bot-sdk'

const menuImage: FlexImage = {
  type: 'image',
  url: 'https://play-lh.googleusercontent.com/kCuoLGcYqdmZN_TvKVYrUjuF2C8uua2rfY83anNJw7YGzijReQc3yTlsqzvMdxs03IM=w240-h480-rw',
  size: 'full',
  aspectRatio: '20:13',
  aspectMode: 'cover',
  action: {
    type: 'uri',
    label: 'Browse',
    uri: 'https://github.com/winnielinn/joke-generator-line-bot',
  },
}

const menuTittle: FlexBox = {
  type: 'box',
  layout: 'vertical',
  contents: [
    {
      type: 'text',
      text: '現在你想來點 ...',
      weight: 'bold',
      size: 'xl',
    },
  ],
}

const menuOptions: FlexBox = {
  type: 'box',
  layout: 'vertical',
  spacing: 'sm',
  contents: [
    {
      type: 'button',
      height: 'sm',
      action: {
        type: 'postback',
        label: '隨機中文笑話',
        data: 'randomChineseJoke',
        text: '隨機中文笑話',
      },
    },
    {
      type: 'button',
      height: 'md',
      action: {
        type: 'postback',
        label: '隨機英文笑話',
        data: 'randomEnglishJoke',
        text: '隨機英文笑話',
      },
    },
    {
      type: 'button',
      style: 'link',
      height: 'sm',
      action: {
        type: 'uri',
        label: '回饋表單',
        uri: 'https://forms.gle/wA4deoc3fH4dXsVS8',
      },
    },
  ],
}

export const menuMessage: FlexMessage = {
  type: 'flex',
  altText: 'This is a joke menu.',
  contents: {
    type: 'bubble',
    hero: menuImage,
    body: menuTittle,
    footer: menuOptions,
  },
}