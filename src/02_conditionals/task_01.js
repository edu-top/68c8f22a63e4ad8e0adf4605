/* Проверить вводимое пользователем число на чётность и положительность. */

const userInput = prompt("Введите целое число:");
const n = Number(userInput);

if (isNaN(n)) {
    alert("Пожалуйста, введите корректное число");
}
else if (n % 1 != 0) // !Number.isInteger(num)
{
    alert("Пожалуйста, введите целое число");
}
else {
    let isEven = n % 2 === 0;
    let isPositive;
    if (n > 0) isPositive = true;
    else if (n < 0) isPositive = false;
    else isPositive = null;

    if (isPositive == null) alert("Число равно нулю")
    else alert(`Число ${isPositive ? 'положительное' : 'отрицательное'} и ${isEven ? 'четное' : 'нечетное'}`);
}

/* Test data
10 (положительное, чётное)

7 (положительное, нечётное)

0 (ноль)

-4 (отрицательное, чётное)

-9 (отрицательное, нечётное)

1.5 (положительное, дробное, нечётное по модулю)

"abc" (не число)
*/
