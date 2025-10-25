/* Возвести число в необходимую степень с помощью любого цикла.
 * Основание и показатель степени вводятся пользователем.
 * Вывод осуществлять с помощью модального окна.
*/

const base = parseFloat(prompt("Введите основание степени:"));
const exponent = parseInt(prompt("Введите показатель степени (целое число):"));

let result = 1;
const isNegativeExponent = exponent < 0;
const positiveExponent = Math.abs(exponent);

for (let i = 0; i < positiveExponent; i++) {
  result *= base;
}

if (isNegativeExponent) {
  result = 1 / result;
}

alert(`Результат: ${base}^${exponent} = ${result}`);

/* Test data
  2   3   => 8
  5   0   => 1
  3   1   => 3
  2   -2  => 0.25 (1 / (2^2))
  -2  3   => -8
  -2  4   => 16
  0   5   => 0
  10  -1  => 0.1
*/
