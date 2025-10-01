/**
 * Rectangle parameters calculation
 */

// User input
const i1 = prompt("Введите длину прямоугольника");
const i2 = prompt("Введите ширину прямоугольника");

// Parse input
const length = Number(i1);
const width = parseFloat(i2);

if (isNaN(length) || isNaN(width))
    alert("Вводимые данные должны быть числами");
else if (length < 0 || width < 0)
    alert("Введенные числа должны быть положительными")
else {
    // Rectangle area
    const area = length * width;
    const perimeter = (length * width) * 2;

    // Output
    console.log(`Rectangle area: ${area}, perimeter: ${perimeter}`);
    alert(`Площадь прямоугольника: ${area}, периметр: ${perimeter}`)
}
