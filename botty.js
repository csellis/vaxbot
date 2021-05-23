import { config } from "dotenv";
import fetch from "isomorphic-fetch";
import TelegramBot from "node-telegram-bot-api";
config();

export function sendMessage(message) {
  const mkdown = {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: message,
        },
      },
    ],
  };
  fetch(process.env.SLACK_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({
      text: mkdown,
    }),
  });
}

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

const chatId = process.env.CHAT_ID;
const devChatId = process.env.DEV_CHAT_ID;

export function sendBotMessage(message, options = {}) {
  bot.sendMessage(options.dev ? devChatId : chatId, message, options);
}
