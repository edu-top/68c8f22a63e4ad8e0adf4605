/* Напишите функцию, которая принимает массив чисел и возвращает новый отфильтрованный массив.
 * Тип фильтрации определяется вторым аргументом:
 *  1 — только положительные числа;
 * -1 — только отрицательные числа;
 *  0 — только нулевые значения (нули).
 * В случае неверно указанного типа фильтрации (при любом другом значении второго аргумента) вернуть массив без изменения
 */

function filterNumbers(arr, filterType) {
    if (filterType === 1) return arr.filter(num => num > 0);
    if (filterType === -1) return arr.filter(num => num < 0);
    if (filterType === 0) return arr.filter(num => num == 0);
    return arr;
}

/* Tests */
console.log(filterNumbers([1, -3, 4, -2, 0, 5], 1));        // => [1, 4, 5]
console.log(filterNumbers([1, -3, 4, -2, 0, 5], -1));       // => [-3, -2]
console.log(filterNumbers([1, -3, 4, -2, 0, 5], 0));        // => [0]
console.log(filterNumbers([], 1));                          // => []
console.log(filterNumbers([-1, -2, -3], 1));                // => []
console.log(filterNumbers([1, 2, 3], -1));                  // => []
console.log(filterNumbers([0, 0, 0], 1));                   // => []
console.log(filterNumbers([1, -3, 4, -2, 0, 5], 2));        // => [1, -3, 4, -2, 0, 5]
console.log(filterNumbers([1, -3, 4, -2, 0, 5], "a"));      // => [1, -3, 4, -2, 0, 5]
console.log(filterNumbers([1, -3, 4, -2, 0, 5], null));     // => [1, -3, 4, -2, 0, 5]
console.log(filterNumbers([1, -3, 4, -2, 0, 5]));           // => [1, -3, 4, -2, 0, 5]
