const TelegramApi = require('node-telegram-bot-api')
const {optionsButtons} = require('./options')
const token = '5832143056:AAEnmJayAY_q-qC1WMqt70hpV1fINp0FenQ'
const bot = new TelegramApi(token, {polling: true})

const chats = {}

const chatID = 613782787

const start = () => {
    // bot.setMyCommands([
    //     {command: '/start', description: 'Приветствие'},
    // ])
    
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id
    
        if(text === '/start'){
            // await bot.sendMessage(chatID, text)
            return bot.sendMessage(chatId, `${msg.chat.first_name ? msg.chat.first_name : ''} ${msg.chat.last_name ? msg.chat.last_name : ''} добрый день!!! Это Пожарицкий Роман, руководитель Alfa Digital Agency\n\nВы только что оставили заявку у нас на сайте https://alfa-digital.agency\n\nЛовите свой супер ценный... `, optionsButtons)
        }
       
        if(text === 'Результат'){
            console.log(chatId)
            await bot.sendMessage(chatID, text)
            return bot.sendMessage(chatId, 'Результат')
        }
        if(text === 'Видеоотзывы'){
            return bot.sendMessage(chatId, 'Видеоотзывы')
        }
        if(text === 'Факты об а...'){
            return bot.sendMessage(chatId, 'Факты об а...')
        }
        if(text === 'Акция'){
            return bot.sendMessage(chatId, 'Акция')
        }
        if(text === 'Наши услуги'){
            return bot.sendMessage(chatId, 'Наши услуги')
        }
        if(text === 'О руководителе'){
            return bot.sendMessage(chatId, 'О руководителе')
        }
        if(text === 'Наши контакты'){
            return bot.sendMessage(chatId, 'Наши контакты')
        }

        // return bot.sendMessage(chatId, 'Что-то пошло не так, проверь команды и попробуй снова')
    })

}

start()