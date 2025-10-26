/* Напишите функцию, принимающую числовые переменные и функцию обратного вызова для выполнения любой заданной пользователем математической операции над любым количеством переданных чисел.
 * Если не передано ни одного числа, то необходимо вернуть `null`.
 */

function calc(callback, ...numbers) {
  if (typeof callback !== 'function') {
    throw new Error('Первый аргумент должен быть функцией');
  }
  if (numbers.length === 0) return null;

  return numbers.reduce(callback);
}


/* Tests */
// Функции для callback
const sum = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;

console.log(calc(sum, 1, 2, 3, 4));

// Набор тестовых случаев
const testCases = [
  { callback: sum, numbers: [1, 2, 3, 4], expected: 10 },
  { callback: multiply, numbers: [1, 2, 3, 4], expected: 24 },
  { callback: subtract, numbers: [10, 5, 1], expected: 4 }, // (10 - 5) - 1 = 4
  { callback: divide, numbers: [100, 2, 5], expected: 10 }, // (100 / 2) / 5 = 10
  { callback: sum, numbers: [], expected: null }, // нет чисел
];

// Тестирование функции с выводом результатов и промежуточных значений
testCases.forEach(({ callback, numbers, expected }, index) => {
  try {
    console.log(`Тест ${index + 1}:`);
    console.log(`Аргументы: ${numbers.join(", ")}`);
    console.log(`Ожидаемый результат: ${expected}`);
    const result = calc(callback, ...numbers);
    console.log(`Фактический результат: ${result}`);
    console.log(result === expected ? "Статус: Passed" : "Статус: Failed");
    console.log("-----");
  } catch (e) {
    console.log(`Тест ${index + 1}: Исключение - ${e.message}`);
  }
});

/* Test results
Тест 1:
Аргументы: 1, 2, 3, 4
Ожидаемый результат: 10
Фактический результат: 10
Статус: Passed
-----
Тест 2:
Аргументы: 1, 2, 3, 4
Ожидаемый результат: 24
Фактический результат: 24
Статус: Passed
-----
Тест 3:
Аргументы: 10, 5, 1
Ожидаемый результат: 4
Фактический результат: 4
Статус: Passed
-----
Тест 4:
Аргументы: 100, 2, 5
Ожидаемый результат: 10
Фактический результат: 10
Статус: Passed
-----
Тест 5:
Аргументы:
Ожидаемый результат: null
Фактический результат: null
Статус: Passed
-----
*/
