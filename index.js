import TelegramBot from 'node-telegram-bot-api';
import {gameOptions, againOptions} from './options.js'

const token = '5464202256:AAE6rAXa3baCr4Lk-U_Zony3HyutIQC-1QI';

const bot = new TelegramBot(token, {polling: true});

const chats = {}

bot.setMyCommands([
    {command: '/start', description: 'Start'},
    {command: '/info', description: 'info'},
    {command: '/game', description: 'game'},
])

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9`)
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадай', gameOptions)
}

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/df4/305/df430517-93f0-3a43-9b14-a376f18bcb0e/5.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот')
        }
    
        if (text === '/info'){
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }

        if (text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `Я тебя не понимаю`)
    })

    bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again')
            return startGame(chatId)
        if (data == chats[chatId])
            return bot.sendMessage(chatId, `Ты отгадал`, againOptions)
        else
            return bot.sendMessage(chatId, `не отгадал ${data} ${chats[chatId]}`, againOptions)
    })
}

start();