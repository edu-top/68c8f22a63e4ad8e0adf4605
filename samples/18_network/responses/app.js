const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer(function(request, response){
    response.setHeader('Access-Control-Allow-Origin', '*'); // Для CORS

    switch(request.url) {
        case "/user/text":
            response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            response.end("Иван Иванов");
            break;

        case "/user/json":
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            const userData = {
                id: 1,
                name: "Иван Иванов",
                email: "ivan@example.com",
                age: 30,
                isActive: true,
                hobbies: ["программирование", "спорт", "чтение"]
            };
            response.end(JSON.stringify(userData, null, 2));
            break;

        case "/user/xml":
            response.writeHead(200, {'Content-Type': 'application/xml; charset=utf-8'});
            const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
<user>
    <id>1</id>
    <name>Иван Иванов</name>
    <email>ivan@example.com</email>
    <age>30</age>
    <active>true</active>
    <hobbies>
        <hobby>программирование</hobby>
        <hobby>спорт</hobby>
        <hobby>чтение</hobby>
    </hobbies>
</user>`;
            response.end(xmlData);
            break;

        case "/user/csv":
            response.writeHead(200, {'Content-Type': 'text/csv; charset=utf-8'});
            const csvData = `id,name,email,age,isActive
1,Иван Иванов,ivan@example.com,30,true
2,Мария Петрова,maria@example.com,25,true
3,Петр Сидоров,petr@example.com,35,false`;
            response.end(csvData);
            break;

        case "/user/blob":
            response.writeHead(200, {
                'Content-Type': 'image/svg+xml',    // SVG!
                'Access-Control-Allow-Origin': '*'  // CORS для fetch
            });
            // Читаем картинку из файла (положите image.png рядом с server.js)
            fs.readFile(path.join(__dirname, "user.svg"), (err, data) => {
                if (err) {
                    response.writeHead(404, {'Content-Type': 'text/plain'});
                    response.end("Изображение не найдено");
                    return;
                }
                response.end(data);
            });
            break;

        case "/api/users":
            response.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
            const users = [
                { id: 1, name: "Иван Иванов", role: "admin" },
                { id: 2, name: "Мария Петрова", role: "user" },
                { id: 3, name: "Петр Сидоров", role: "moderator" }
            ];
            response.end(JSON.stringify(users));
            break;

        default:
            fs.readFile("index.html", (error, data) => {
                if (error) {
                    response.writeHead(404, {'Content-Type': 'text/plain'});
                    response.end("Страница не найдена");
                } else {
                    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    response.end(data);
                }
            });
    }
}).listen(3000, () => console.log("Server started at http://localhost:3000"));
