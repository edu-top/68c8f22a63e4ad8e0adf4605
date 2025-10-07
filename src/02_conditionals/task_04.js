/* По введенному номеру дня недели (1-7) вывести название дня ("Понедельник", ..., "Воскресенье").
 * Для реализации логики использовать переключатель `switch..case`.
 */

const userInput = prompt("Введите номер дня недели (1-7):");
const dayNumber = Number(userInput);

if (isNaN(dayNumber) || !Number.isInteger(dayNumber)) {
  alert("Пожалуйста, введите корректное целое число от 1 до 7");
}
else {
  switch(dayNumber) {
    case 1:
      alert("Понедельник");
      break;
    case 2:
      alert("Вторник");
      break;
    case 3:
      alert("Среда");
      break;
    case 4:
      alert("Четверг");
      break;
    case 5:
      alert("Пятница");
      break;
    case 6:
      alert("Суббота");
      break;
    case 7:
      alert("Воскресенье");
      break;
    default:
      alert("Неверный номер дня");
      break;
  }
}

/* Test data
1 (Понедельник)

2 (Вторник)

3 (Среда)

4 (Четверг)

5 (Пятница)

6 (Суббота)

7 (Воскресенье)

0 (Неверный номер дня)

8 (Неверный номер дня)

-1 (Неверный номер дня)

1.2 (Неверный ввод, нецелое число)

"abc" (Неверный ввод, не число)
*/
