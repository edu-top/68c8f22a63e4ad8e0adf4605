<link href="../styles.css" rel="stylesheet" />

## Формы и элементы управления

- [Формы и элементы управления](#формы-и-элементы-управления)
  - [Формы и их элементы](#формы-и-их-элементы)
    - [Получение формы](#получение-формы)
    - [Свойства и методы форм](#свойства-и-методы-форм)
    - [Элементы форм](#элементы-форм)
    - [Свойства элементов форм](#свойства-элементов-форм)
  - [Источники информации](#источники-информации)

### Формы и их элементы
Один из способов взаимодействия с пользователями представляют html-формы. Например, если нам надо получить от пользователя некоторую информацию, мы можем определить на веб-странице формы, которая будет содержать текстовые поля для ввода информации и кнопку для отправки. И после ввода данных мы можем обработать введенную информацию.[^10.1]

Для создания формы используется элемент `<form>`:
```html
<form id="search" name="search">
</form>
```

В JavaScript форма представлена объектом **`HtmlFormElement`**. И после создания формы мы можем к ней обратиться различными способами.

#### Получение формы
Первый способ заключается в прямом обращении по имени формы:
```js
const searchForm = document.search;
```

Второй способ состоит в обращении к коллекции форм документа — коллекция `forms` и поиске в ней нужной формы:
```js
const searchForm1 = document.forms["search"];   // по имени
const searchForm2 = document.forms[0];          // по индексу
```

Третий способ представляет получение форм стандартными методами для поиска элемента по id, по тегу или по селектору. Например:
```js
const formById = document.getElementById("search");
const formByName = document.getElementsByName("search")[0];
const formBySelector = document.querySelector("form");
```

#### Свойства и методы форм
Форма имеет ряд свойств, из которых перечислю основные:

- **`name`**: имя формы

- **`elements`**: коллекция элементов формы

- **`length`**: количество элементов формы

- **`action`**: значение атрибута `action` — адрес отправки формы

- **`method`**: значение атрибута `method` — метод HTTP, применяемый для отправки

Например, получим свойства формы:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <form id="search" name="search" action="https://google.com/search" method="get">
        <input type="text" id="key" name="q" />
        <input type="submit" id="send" name="send" />
    </form>
    <script>
    const form = document.getElementById("search");
    console.log(form.elements);     // HTMLFormControlsCollection(2) [input, input, q: input, send: input]
    console.log(form.length);       // 2
    console.log(form.name);         // search
    console.log(form.action);       // https://google.com/search
    console.log(form.method);       // get
    </script>
</body>
</html>
```

Среди методов формы надо отметить метод **`submit()`**, который отправляет данные формы на сервер, и метод **`reset()`**, который очищает поля формы:
```js
const form = document.forms["search"];
form.submit();
form.reset();
```

#### Элементы форм
Форма может содержать различные элементы ввода html: `input`, `textarea`, `button`, `select` и т.д. Для каждого из элементов существует свой тип JavaScript:

html-элемент | Тип JavaScript
-- | --
`<input>` | `HTMLInputElement`
`<textarea>` | `HTMLTextAreaElement`
`<select>` | `HTMLSelectElement`
`<option>` (в списках `<select>`) | `HTMLOptionElement`

Для получения элементов форм можно использовать два способа:

- Применение стандартных методов `getElementById()`, `getElementsByClassName()`, `getElementsByTagName()`, `getElementsByName()`, `querySelector()` и `querySelectorAll()` для поиска элементов соответственно по id, классу, тегу, имени или селектору. Например, возьмем ранее определенную форму и получим ее поле ввода:

    ```js
    // получаем элемент по id="key"
    const keyField = document.getElementById("key");
    console.log(keyField);
    ```

- Использование свойства **`elements`** соответствующей формы. Например:

    ```js
    const form = document.getElementById("search");
    // получение поля по индексу
    const keyField = form.elements[0];
    console.log(keyField);
    // получение этого же поля, но через имя
    const keyField2 = form.elements["q"];
    console.log(keyField2);
    ```

- Использование имени формы и элемента. Например:

    ```js
    // поле q на форме search
    const keyField = document.search.q;
    console.log(keyField);
    ```

#### Свойства элементов форм
Все они имеют ряд общих свойств и методов. Также, как и форма, элементы форм имеют свойство **`name`**, с помощью которого можно получить значение атрибута **`name`**. Другим важным свойством является свойство **`value`**, которое позволяет получить или изменить значение поля:
```html
<form name="search">
    <input type="text" name="key" value="hello world"></input>
    <input type="submit" name="send"></input>
</form>
<script>
const form = document.getElementById("search");
// получение поля формы по имени
const keyField = form.elements["key"];
// получение значения поля
console.log(keyField.value);
// установка значения поля
keyField.value = "Enter a string";
</script>
```

Свойство **`type`** позволяет получить тип поля ввода. Это либо название тега элемента (например, `textarea`), либо значение атрибута `type` у элементов `input`.

```js
const form = document.getElementById("search");
// получение поля формы по имени
const keyField = form.elements["key"];
// получение значения поля
console.log(keyField.type); // text
```

Из методов можно выделить методы **`focus()`** (устанавливает фокус на элемент) и **`blur()`** (убирает фокус с элемента):
```js
const searchForm = document.forms["search"];
const keyField = searchForm.elements["key"];
keyField.focus();
```

### Источники информации
[^10.1]: [Формы и их элементы](https://metanit.com/web/javascript/10.1.php)
