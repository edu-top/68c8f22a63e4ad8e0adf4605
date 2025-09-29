/**
 * Rectangle parameters calculation
 */

// User input
const i1 = prompt("Введите длину прямоугольника");
const i2 = prompt("Введите ширину прямоугольника");
if (isNaN(i1) || isNaN(i2)) {
    alert("Вводимые данные должны быть числами");
}
else {
    // Rectangle length and width
    const length = Number(i1);
    const width = parseFloat(i2);

    // Rectangle area
    const area = length * width;
    const perimeter = (length * width) * 2;

    // Output
    console.log(`Rectangle area: ${area}, perimeter: ${perimeter}`);
    alert(`Площадь прямоугольника: ${area}, периметр: ${perimeter}`)
}
