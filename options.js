module.exports = {
    optionsButtons: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{text: 'Результат', callback_data: 'result'}, {text: 'Видеоотзывы', callback_data: '2'}, {text: 'Факты об а...', callback_data: '3'}],
                [{text: 'Акция', callback_data: '4'}, {text: 'Наши услуги', callback_data: '5'}, {text: 'О руководителе', callback_data: '6'}],
                [{text: 'Наши контакты', callback_data: '0'}]
            ]
        })
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'кнопка', callback_data: 'button'}]
            ]
        })
    }
}

