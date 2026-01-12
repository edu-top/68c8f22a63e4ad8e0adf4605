document.body.innerHTML = "<h2>External script</h2>";               // выводим заголовок
document.body.innerHTML += "This is the text from external script"; // выводим обычный текст

/* Запрос данных в диалоговом окне */
const input = prompt("Введите данные");

/* Вывод данных в модальном окне */
alert("Пользовательский ввод: " + input);

/* Модальное окно подтверждения */
const response = confirm("Подтвердите действие");

/* Вывод данных в консоль */
console.log(`Пользовательский выбор: ${response}`);
