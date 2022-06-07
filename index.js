import TelegramBot from 'node-telegram-bot-api';
import { numsOptions, botOptions, getAnswerOptions, toStartOptions, getLuckOptions } from './options.js'
import { predictionList, answersList, luckValues, commandTexts} from './texts.js'

const token = '5464202256:AAE6rAXa3baCr4Lk-U_Zony3HyutIQC-1QI';
const bot = new TelegramBot(token, {polling: true});

var luckNumber = 1;

/*
    1 - предсказание на день
    2 - проверь удачу на сегодня
    3 - получить ответ на вопрос
*/

bot.setMyCommands([
    {command: '/start',         description: commandTexts[0]},
    {command: '/restart',       description: commandTexts[1]},
    {command: '/prediction',    description: commandTexts[2]},
    {command: '/luck',          description: commandTexts[3]},
    {command: '/question',      description: commandTexts[4]},
])
/* Prediction */
const getPrediction = async (chatId) => {
    const randIndex =  Math.floor(Math.random() * (predictionList.length - 1) );
    await bot.sendMessage(chatId, predictionList[randIndex], toStartOptions)
}

/* Luck */
const checkLuck = async (chatId) => {
    await bot.sendMessage(chatId, 'Очисти разум и настройся на вайб Вселенной!', getLuckOptions)
}

const showNums = async (chatId) => {
    await bot.sendMessage(chatId, 'Вселенная послала тебе число от 1 до 9. Какое?', numsOptions);
    luckNumber = Number(Math.floor(Math.random() * 8)) + 1;
}

const determLuckValue = async (chatId, selectedNum) => {
    const delta = Math.abs(selectedNum - luckNumber);
    const index = delta < 8 ? Math.floor(delta / 2) : 3;
    await bot.sendMessage(chatId, luckValues[index], toStartOptions)
}

/* Question */
const askQuestion = async (chatId) => {
    await bot.sendMessage(chatId, 'Очисти разум и загадай вопрос', getAnswerOptions)
}

const getAnswer = async (chatId) => {
    const randAns = Math.floor(Math.random() * (answersList.length - 1));
    await bot.sendMessage(chatId, answersList[randAns], toStartOptions)
}

/* To Start */
const goToStart = async (chatId) => {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/df4/305/df430517-93f0-3a43-9b14-a376f18bcb0e/5.webp');
    await bot.sendMessage(chatId, `Готов снова помочь тебе!`, botOptions)
}

/* Init */
const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/df4/305/df430517-93f0-3a43-9b14-a376f18bcb0e/5.webp');
            return await bot.sendMessage(chatId, `Приветствую тебя, ${msg.from.first_name}! Меня зовут Кас. Что желает твоя душа?`, botOptions)
        }

        if (text === '/prediction'){
            return getPrediction(chatId)
        }

        if (text === '/luck'){
            return checkLuck(chatId)
        }

        if (text === '/question'){
            return askQuestion(chatId)
        }

        if (text === '/restart'){
            return goToStart(chatId)
        }

        return bot.sendMessage(chatId, `Я тебя не понимаю`)
    })

    bot.on('callback_query', (msg) => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        
        if (data === 'getPrediction')
            return getPrediction(chatId);
        
        if (data === 'askQuestion')
            return askQuestion(chatId);
        
        if (data === 'checkLuck')
            return checkLuck(chatId);

        if (data === 'getAnswer')
            return getAnswer(chatId);
        
        if (data === 'goToStart')
            return goToStart(chatId);

        if (data === 'showNums')
            return showNums(chatId);
        
        if (data === '1' || data === '2' || data === '3' ||
            data === '4' || data === '5' || data === '6' ||
            data === '7' || data === '8' || data === '9')
            return determLuckValue(chatId, data)

        
        // if (data == chats[chatId])
        //     return bot.sendMessage(chatId, `Ты отгадал`, againOptions)
        // else
        //     return bot.sendMessage(chatId, `не отгадал ${data} ${chats[chatId]}`, againOptions)
    })
}

start();