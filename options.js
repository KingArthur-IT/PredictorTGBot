const numsOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
        ]
    })
}

const botOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Хочу получить предсказание на день', callback_data: 'getPrediction'}],
            [{text: 'Хочу проверить свою удачу', callback_data: 'checkLuck'}],
            [{text: 'Хочу получить ответ на интересующий вопрос', callback_data: 'askQuestion'}],
        ]
    })
}

const getAnswerOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Получить ответ', callback_data: 'getAnswer'}],
            [{text: 'Я боюсь, хочу вернуться обратно', callback_data: 'goToStart'}],
        ]
    })
}

const getLuckOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Обратиться ко Вселенной!', callback_data: 'showNums'}],
            [{text: 'Я боюсь, хочу вернуться обратно', callback_data: 'goToStart'}],
        ]
    })
}

const toStartOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Хочу вернуться к выбору', callback_data: 'goToStart'}],
        ]
    })
}

export{ numsOptions, botOptions, getAnswerOptions, toStartOptions, getLuckOptions }