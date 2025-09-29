/**
 * Rectangle parameters calculation
 */

// User input
const i1 = prompt("Введите длину прямоугольника");
if (isNaN(i1)) {
    alert("Некорректный ввод: должно быть число")
}
else {
    const i2 = prompt("Введите ширину прямоугольника");
    if (isNaN(i2)) {
        alert("Некорректный ввод: должно быть число")
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
}
