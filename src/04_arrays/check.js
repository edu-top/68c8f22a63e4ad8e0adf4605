// Ввод размеров матрицы
const rows = parseInt(prompt("Введите число строк:"));
const cols = parseInt(prompt("Введите число столбцов:"));

// Ввод элементов матрицы
const matrix = [];
for (let i = 0; i < rows; i++) {
  matrix[i] = [];
  for (let j = 0; j < cols; j++) {
    matrix[i][j] = parseInt(prompt(`Введите элемент [${i}][${j}]:`));
  }
}

// Транспонирование матрицы
const transpose = [];
for (let j = 0; j < cols; j++) {
  transpose[j] = [];
  for (let i = 0; i < rows; i++) {
    transpose[j][i] = matrix[i][j];
  }
}

// Вывод транспонированной матрицы
console.log("Транспонированная матрица:");
for (let i = 0; i < cols; i++) {
  console.log(transpose[i].join(" "));
}
