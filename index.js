import TelegramBot from 'node-telegram-bot-api';
import { numsOptions, botOptions, getAnswerOptions, toStartOptions, getLuckOptions } from './options.js'
import { PREDICTIONCARDSCOUNT, predictionList, answersList, luckValues, commandTexts, entryStikerList } from './texts.js'

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
    const randIndex =  Math.floor(Math.random() * (PREDICTIONCARDSCOUNT - 1) );
    await bot.sendPhoto(chatId, '../assets/' + randIndex + '.png', toStartOptions)
}

/* Luck */
const checkLuck = async (chatId) => {
    await bot.sendMessage(chatId, '❞\n     Очисти разум и настройся на вайб Вселенной!\n❞', getLuckOptions)
}

const showNums = async (chatId) => {
    await bot.sendMessage(chatId, '❞\n     Вселенная послала тебе число от 1 до 9. Какое?\n❞', numsOptions);
    luckNumber = Number(Math.floor(Math.random() * 8)) + 1;
}

const determLuckValue = async (chatId, selectedNum) => {
    const delta = Math.abs(selectedNum - luckNumber);
    const index = delta < 8 ? Math.floor(delta / 2) : 3;
    await bot.sendMessage(chatId, '❞\n     ' + luckValues[index] + '\n❞', toStartOptions)
}

/* Question */
const askQuestion = async (chatId) => {
    await bot.sendMessage(chatId, '❞\n     Очисти разум и загадай вопрос\n❞', getAnswerOptions)
}

const getAnswer = async (chatId) => {
    const randAns = Math.floor(Math.random() * (answersList.length - 1));
    await bot.sendMessage(chatId, '❞\n     ' + answersList[randAns] + '\n❞', toStartOptions)
}

/* To Start */
const goToStart = async (chatId) => {
    const rand = Math.floor(Math.random() * (entryStikerList.length - 1));
    await bot.sendSticker(chatId, entryStikerList[rand]);
    await bot.sendMessage(chatId, `❞\n     Готов снова помочь тебе!\n❞`, botOptions)
}

/* Init */
const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if (text === '/start'){
            const rand = Math.floor(Math.random() * (entryStikerList.length - 1));
            await bot.sendSticker(chatId, entryStikerList[rand]);
            return await bot.sendMessage(chatId, `❞\n     Приветствую тебя, ${msg.from.first_name}! Меня зовут Кас. Что желает твоя душа?\n❞`, botOptions)
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

        return bot.sendMessage(chatId, `❞\n     Я тебя не понимаю\n❞`)
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