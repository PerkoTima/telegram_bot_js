// Подключаем модули
const {Telegraf} = require('telegraf');


const {optionsButtons, againOptions} = require('./options')
// const HttpsProxyAgent = require('https-proxy-agent');
// Общие настройки
let config = {
    "token": "5832143056:AAEnmJayAY_q-qC1WMqt70hpV1fINp0FenQ", // Токен бота
    "admin": 613782787, // id владельца бота
};
// Создаем объект бота
const bot = new Telegraf(config.token, {
        // Если надо ходить через прокси - укажите: user, pass, host, port
        // telegram: { agent: new HttpsProxyAgent('http://user:pass@host:port') }
    }
);

// Текстовые настройки
let replyText = {
    "helloAdmin": "Привет админ, ждем сообщения от пользователей",
    // "helloUser":  `${ctx.message.from.first_name ? ctx.message.from.first_name : ''} ${ctx.message.from.last_name ? ctx.message.from.last_name : ''} добрый день!!! Это Пожарицкий Роман, руководитель Alfa Digital Agency\n\nВы только что оставили заявку у нас на сайте https://alfa-digital.agency\n\nЛовите свой супер ценный... `,
    "replyWrong": "Для ответа пользователю используйте функцию Ответить/Reply."
};
// Проверяем пользователя на права
let isAdmin = (userId) => {
    return userId == config.admin;
};
// Перенаправляем админу от пользователя или уведомляем админа об ошибке
let forwardToAdmin = (ctx) => {
    if (isAdmin(ctx.message.from.id)) {
        // ctx.reply(replyText.replyWrong);
    } else {
        // ctx.forwardMessage(config.admin, ctx.from.id, ctx.message.id);
    }
};
// Старт бота
bot.start(async(ctx) => {
    // console.log(ctx)
    ctx.replyWithHTML(`${ctx.message.from.first_name ? ctx.message.from.first_name : ''} ${ctx.message.from.last_name ? ctx.message.from.last_name : ''} добрый день!!! Это Пожарицкий Роман, руководитель Alfa Digital Agency\n\nВы только что оставили заявку у нас на сайте <a href='https://alfa-digital.agency/'>Alfa Digital Agency</a> \n\nЛовите свой супер ценный... `, optionsButtons);
    let msg = await ctx.reply('Закрепленное сообщение', againOptions)
    await ctx.pinChatMessage(msg.message_id)
    setTimeout(() => ctx.reply('Сообщение с задержкой'), 10000)
});

// Слушаем на наличие объекта message
bot.on('message', (ctx) => {
    // убеждаемся что это админ ответил на сообщение пользователя
    const userId = ctx.message
    console.log(ctx.message)
    const text = ctx.message.text 
    if(text === 'Результат'){
        ctx.reply('Результат')
    }else if(text === 'Видеоотзывы'){
        ctx.reply('Видеоотзывы')
    }else if(text === 'Факты об а...'){
        ctx.reply('Факты об а...')
    }else if(text === 'Акция'){
        ctx.reply('Акция')
    }else if(text === 'Наши услуги'){
        ctx.reply('Наши услуги')
    }else if(text === 'О руководителе'){
        ctx.reply('О руководителе')
    }else if(text === 'Наши контакты'){
        ctx.reply('Наши контакты')
    }else{
        if (ctx.message.reply_to_message
            && ctx.message.reply_to_message.forward_from
            && isAdmin(ctx.message.from.id)) {
                // console.log(userId)
            // отправляем копию пользователю
            ctx.telegram.sendCopy(ctx.message.reply_to_message.forward_from.id, ctx.message);
        }else{
            // перенаправляем админу
            // console.log(userId)
            forwardToAdmin(ctx);
        }
    }
   
});
// запускаем бот
bot.launch();