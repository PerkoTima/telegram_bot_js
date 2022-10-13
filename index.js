const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '5401099997:AAE_sFWtcLRngDyDyP769Rb04hjJafihCvo'
const bot = new TelegramApi(token, {polling: true})
const chats = {}

const startGame = async (chatId) => {
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/940/db2/940db267-de3d-37ec-a2f7-4b832394eb3f/16.webp')
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру, а ты должен ее отгадать)')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начни общение'},
        {command: '/info', description: 'Информация о боте'},
        {command: '/game', description: 'Игра'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
    
        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/940/db2/940db267-de3d-37ec-a2f7-4b832394eb3f/2.webp')
            return bot.sendMessage(chatId, 'Привет, добро пожаловать в тестовый телеграм бот')
        }
        if(text === '/info'){
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/940/db2/940db267-de3d-37ec-a2f7-4b832394eb3f/7.webp')
            return bot.sendMessage(chatId, 'Тестовый бот')
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Что-то пошло не так, проверь команды и попробуй снова')
    })

    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data === '/again'){
            return startGame(chatId )
        }
        if(data == chats[chatId]){
            return bot.sendMessage(chatId, `Поздравляю ты выбрал правильную цифру`, againOptions)
        }else{
            return bot.sendMessage(chatId, `Ты ошибся, правильная цифра - ${chats[chatId]}`, againOptions)
        }
    })
}

start()