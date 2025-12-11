## События

- [События](#события)
  - [Программный вызов событий](#программный-вызов-событий)
  - [Источники информации](#источники-информации)

### Программный вызов событий
События могут возникать не только в следствие действий пользователя на веб-странице. События также можно генерировать программно.

Чтобы программно вызвать событие, у элемента на веб-странице можно вызвать метод `dispatchEvent()`, в который передается экземпляр объекта `Event` (либо его производные типа `MouseEvent` или `KeybordEvent`).

```js
const event = new Event(имя_события, config);   //  определяем объект события
element.dispatchEvent(event);   //   вызываем событие для элемента element
```

Первый аргумент, передаваемый конструктору `Event`, представляет собой строку — тип события. Дополнительно в качестве второго параметра можно передать объект конфигурации. В частности, с помощью объекта конфигурации можно определить следующие свойства:

- `cancelable`: можно ли событие отменить (если `true`, то отменяемое событие, `false` — неотменяемое)

- `bubbles`: должно ли событие быть восходящим (если `true`, то восходящее)

Например, программно нажмем на ссылку:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <a id="link" href="https://metanit.com">Metanit.com</a>
    <script>
    const link = document.getElementById("link");   // получаем ссылку
    const event = new MouseEvent("click");
    link.dispatchEvent(event);
    </script>
</body>
</html>
```

Нажатие на ссылку представляет событие мыши "click", поэтому определяем объект события типа `MouseEvent`:
```js
const event = new MouseEvent("click");
```

Затем вызываем событие для элемента `link`:
```js
link.dispatchEvent(event);
```

В итоге произойдет переход по ссылке уже при загрузке страницы.

И как в общем случае, это событие также можно обработать:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <a id="link" href="https://metanit.com">Metanit.com</a>
    <script>
    const link = document.getElementById("link");

    link.addEventListener("click", (e)=>{
        console.log("Link has been clicked");
        e.preventDefault();     // предупреждаем переход
    });

    const event = new MouseEvent("click", {cancelable:true});
    link.dispatchEvent(event);
    </script>
</body>
</html>
```

Чтобы выполнение события можно было остановить, в конструктор `MouseEvent` в качестве второго параметра передаем конфигурационных объект с одним свойством: `cancelable:true` указывает, что можно остановить обработку события. Благодаря этому в обработчике события "click" можно вызвать метод `e.preventDefault()`.[^9.7]

### Источники информации
[^9.7]: [Программный вызов событий](https://metanit.com/web/javascript/9.7.php)
