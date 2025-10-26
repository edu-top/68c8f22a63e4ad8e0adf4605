/* Создайте функцию, находящую среднее значение по всем своим числовым аргументам.
 * Число аргументов не ограничено (может быть любым).
 * При отсутствии аргументов вернуть `null`.
 */

function average() {
    if (arguments.length === 0) return null;
    let sum = 0;
    for (let i = 0; i < arguments.length; i++) {
      sum += arguments[i];
    }
    return sum / arguments.length;
}

function avg(...numbers) {
    if (numbers.length === 0) return null;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

/* Tests */
console.log(average(1, 2, 3, 4, 5));            // => 3
console.log(average(1, -3, 4, -2, 0, 5));       // => 0.8333333333333334
console.log(average(-1, -2, -3));               // => -2
console.log(average(1, 2, 3));                  // => 2
console.log(average(0, 0, 0));                  // => 0
console.log(average(1.5, 2.5, 3.5));            // => 2.5
console.log(average(5));                        // => 5
console.log(average());                         // => null
