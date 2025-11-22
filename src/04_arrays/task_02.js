/* Запросить у пользователя ряд значений любого типа.
   Ограничением последовательности является ввод пустого значения.
   Вывести все значения в консоль в порядке, обратном вводу.
 */

const values = [];

while (true) {
  const input = prompt("Введите значение (или нажмите Enter для завершения):");
  if (input === null || input.trim() === "") {
    break; // Завершение ввода при пустой строке
  }
  values.push(input);
}

// Вывод элементов в консоль в обратном порядке
for (let i = values.length - 1; i >= 0; i--) {
  console.log(values[i]);
}

const reversed = values.toReversed()
for (let i = 0; i < reversed.length; i++) {
  console.log(reversed[i]);
}

/* Test data
apple banana cherry         => cherry   banana  apple
40    30      20      10    => 10       20      30      40
1     2       3       4   5 => 5        4       3       2     1
*/
