const express = require('express');
const path = require('path');
const app = express();

// Все SPA-маршруты → index.html
app.get(['/home', '/about', '/contacts', '/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'index3.html'));
});

// Статические файлы (CSS, JS, изображения)
app.use(express.static('.'));

app.listen(3000, () => {
    console.log('SPA запущено на http://localhost:3000');
});
