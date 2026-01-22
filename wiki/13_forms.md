<link href="../styles.css" rel="stylesheet" />

## Формы и элементы управления

- [Формы и элементы управления](#формы-и-элементы-управления)
  - [Формы и их элементы](#формы-и-их-элементы)
    - [Получение формы](#получение-формы)
    - [Свойства и методы форм](#свойства-и-методы-форм)
    - [Элементы форм](#элементы-форм)
    - [Свойства элементов форм](#свойства-элементов-форм)
  - [Кнопки](#кнопки)
    - [Очистка формы](#очистка-формы)
  - [Текстовые поля](#текстовые-поля)
    - [Поле ввода пароля](#поле-ввода-пароля)
    - [Скрытое поле](#скрытое-поле)
    - [Элемент textarea](#элемент-textarea)
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

### Кнопки
Для отправки введенных данных на форме используются кнопки. Для создания кнопки используется либо элемент `button`:
```html
<button name="send">Отправить</button>
```

Либо элемент `input`:
```html
<input type="submit" name="send" value="Отправить" />
```

С точки зрения функциональности в html эти элементы не совсем равноценны, но в данном случае они нас интересуют с точки зрения взаимодействия с кодом javascript.

При нажатии на любой из этих двух вариантов кнопки происходит отправка формы по адресу, который указан у формы в атрибуте `action`, либо по адресу веб-страницы, если атрибут `action` не указан. Однако в коде javascript мы можем перехватить отправку, обрабатывая событие **`click`**
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
<form name="search">
    <input type="text" name="key">
    <input type="submit" name="send" value="Отправить" />
</form>
<script>
function sendForm(e){

    // получаем значение поля key
    const keyBox = document.search.key;
    const val = keyBox.value;
    if(val.length<3){
        alert("Недопустимая длина строки");
        e.preventDefault();
    }
    else
        alert("Отправка разрешена");
}

const sendButton = document.search.send;
sendButton.addEventListener("click", sendForm);
</script>
</body>
</html>
```

При нажатии на кнопку происходит событие `click`, и для его обработки к кнопке прикрепляем обработчик `sendForm`. В этом обработчике проверяем введенный в текстовое поле текст. Если его длина меньше 3 символов, то выводим сообщение о недостимой длине и прерываем обычный ход события с помощью вызова **`e.preventDefault()`**. В итоге форма не отправляется.

Если же длина текста три и больше символов, то также выводится сообщение, и затем форма отправляется.

![Отправка формы через JavaScript](../img/formsubmit.png)

Также мы можем при необходимости при отправке изменить адрес, на который отправляются данные:
```js
function sendForm(e){

    // получаем значение поля key
    const keyBox = document.search.key;
    const val = keyBox.value;
    if(val.length > 3){
        alert("Недопустимая длина строки");
        document.search.action="PostForm";
    }
    else
        alert("Отправка разрешена");
}
```

В данном случае, если длина текста меньше 3 символов, то текст отправляется, только теперь он отправляется по адресу `PostForm`, поскольку задано свойство `action`:
```js
document.search.action="PostForm";
```

#### Очистка формы
Для очистки формы предназначены следующие равноценные по функциональности кнопки:
```html
<button type="reset">Очистить</button>
<input type="reset" value="Очистить" />
```

При нажатию на кнопки произойдет очистка форм. Но также функциональность по очистке полей формы можно реализовать с помощью метода `reset()`:
```js
function sendForm(e){

    // получаем значение поля key
    const keyBox = document.search.key;
    const val = keyBox.value;
    if(val.length < 3){
        alert("Недопустимая длина строки");
        document.search.reset();
        e.preventDefault();
    }
    else
        alert("Отправка разрешена");
}
```

Кроме специальных кнопок отправки и очистки на форме также может использоваться обычная кнопка:
```html
<input type="button" name="send" value="Отправить" />
```

При нажатии на подобную кнопку отправки данных не происходит, хотя также генерируется событие `click`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
<form name="search">
    <input type="text" name="key" placeholder="Введите ключ">
    <input type="button" name="print" value="Печать" />
</form>
<div id="printBlock"></div>
<script>
function printForm(e){

    // получаем значение поля key
    const keyBox = document.search.key;
    const val = keyBox.value;
    // получаем элемент printBlock
    const printBlock = document.getElementById("printBlock");
    // создаем новый параграф
    const pElement = document.createElement("p");
    // устанавливаем у него текст
    pElement.textContent = val;
    // добавляем параграф в printBlock
    printBlock.appendChild(pElement);
}

const printButton = document.search.print;
printButton.addEventListener("click", printForm);
</script>
</body>
</html>
```

При нажатии на кнопку получаем введенный в текстовое поле текст, создаем новый элемент параграфа для этого текста и добавляем параграф в элемент `printBlock`.[^10.2]

![Обработка нажатия кнопки в JavaScript](../img/buttonclick.png)

### Текстовые поля
Для ввода простейшей текстовой информации предназначены элементы `<input type="text">`:
```html
<input type="text" name="kye" size="10" maxlength="15" value="hello world" />
```

Данный элемент поддерживает ряд событий, в частности:

- `focus`: происходит при получении фокуса

- `blur`: происходит при потере фокуса

- `change`: происходит при изменении значения поля

- `input`: происходит при изменении значения поля

- `select`: происходит при выделении текста в текстовом поле

- `keydown`: происходит при нажатии клавиши клавиатуры

- `keypress`: происходит при нажатии клавиши клавиатуры для печатаемых символов

- `keyup`: происходит при отпускании ранее нажатой клавиши клавиатуры

Применим ряд событий:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
    <form name="search">
        <input type="text" name="key" placeholder="Введите ключ" />
        <input type="button" name="print" value="Печать" />
    </form>
    <div id="printBlock"></div>
    <script>
        const keyBox = document.search.key;

        // обработчик изменения текста
        function onchange(e){
            // получаем элемент printBlock
            const printBlock = document.getElementById("printBlock");
            // получаем новое значение
            const val = e.target.value;
            // установка значения
            printBlock.textContent = val;
        }
        // обработка потери фокуса
        function onblur(e){

            // получаем его значение и обрезаем все пробелы
            const text = keyBox.value.trim();
            if(text==="")
                keyBox.style.borderColor = "red";
            else
                keyBox.style.borderColor = "green";
        }
        // получение фокуса
        function onfocus(e){

            // установка цвета границ поля
            keyBox.style.borderColor = "blue";
        }
        keyBox.addEventListener("change", onchange);
        keyBox.addEventListener("blur", onblur);
        keyBox.addEventListener("focus", onfocus);
    </script>
</body>
</html>
```

Здесь к текстовому полю прикрепляется три обработчика для событий `blur`, `focus` и `change`. Обработка события `change` позволяет сформировать что-то вроде привязки: при изменении текста весь текст отображается в блоке `printBlock`. Но надо учитывать, что событие `change` возникает не сразу после изменения текста, а после потери им фокуса.

Обработка события потери фокуса `blur` позволяет провести валидацию введенного значения. Например, в данном случае если текст состоит из пробелов или не был введен, то окрашиваем границу поля в красный цвет.

![Изменение текста в JavaScript](../img/textchange.png)

Кроме события `change` мы можем обрабатывать изменение введенного текста, обрабатывая событие **`input`**. Но если событие **`change`** возникает, когда пользователь закончит ввод и переведт фокус с текстового поля на другой элемент, то событие **`input`** возникает сразу при вводе нового символа или удаления имеющегося:
```js
const keyBox = document.search.key;

// обработчик изменения текста
function oninput(e){
    // получаем элемент printBlock
    const printBlock = document.getElementById("printBlock");
    // получаем новое значение
    const val = e.target.value;
    // установка значения
    printBlock.textContent = val;
}

keyBox.addEventListener("input", oninput);
```

#### Поле ввода пароля
Кроме данного текстового поля есть еще специальные поля ввода. Так, поле `<input type="password">` предназначено для ввода пароля. По функциональности оно во многом аналогично обычному текстовому полю за тем исключением, что для вводимых символов используется маска:
```html
<input type="password" name="password" />
```

Однако само вводимое значение никак не шифруется, и мы его можем спокойно получить:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
 <form name="loginForm">
    <input type="password" name="password" />
</form>
    <div id="printBlock"></div>
    <script>
        const passwordBox = document.loginForm.password;

        // обработчик изменения текста
        function oninput(e){
            // получаем элемент printBlock
            const printBlock = document.getElementById("printBlock");
            // получаем новое значение
            printBlock.textContent = e.target.value;
        }
        passwordBox.addEventListener("input", oninput);
    </script>
</body>
</html>
```

![Получение пароля с помощью кода JavaScript](../img/password.png)

#### Скрытое поле
Если нам надо, чтобы на форме было некоторое значение, но чтобы оно было скрыто от пользователя, то для этого могут использоваться скрытые поля:
```html
<input type="hidden" name="id" value="345" />
```

Для скрытого поля обычно не используется обработка событий, но также, как и для других элементов, мы можем в javascript получить его значение или изменить его.

#### Элемент textarea
Для создания многострочных текстовых полей используется элемент `textarea`:
```html
<textarea rows="15" cols="40" name="textArea"></textarea>
```

Данные элемент генерирует все те же самые события, что и обычное текстовое поле:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
    <form name="search">
        <textarea rows="7" cols="40" name="message"></textarea>
    </form>
    <div id="printBlock"></div>
    <script>
    const messageBox = document.search.message;

    // обработчик ввода символа
    function onkeypress(e){
        // получаем элемент printBlock
        const printBlock = document.getElementById("printBlock");
        // получаем введенный символ
        const val = String.fromCharCode(e.keyCode);
        // добавление символа
        printBlock.textContent += val;
    }

    function onkeydown(e){
        if(e.keyCode===8){ // если нажат Backspace

            // получаем элемент printBlock
            const printBlock = document.getElementById("printBlock"),
                length = printBlock.textContent.length;
            // обрезаем строку по последнему символу
            printBlock.textContent = printBlock.textContent.substring(0, length-1);
        }
    }

    messageBox.addEventListener("keypress", onkeypress);
    messageBox.addEventListener("keydown", onkeydown);
    </script>
</body>
</html>
```

Здесь к текстовому полю прикрепляются обработчики для событий `keypress` и `keydown`. В обработчике `keypress` получаем введенный символ с помощью конвертации числового кода клавиши в строку:
```js
const val = String.fromCharCode(e.keyCode);
```

Затем символ добавляется к содержимому блока `printBlock`.

Событие `keypress` возникает при нажатии на клавиши для печатаемых символов, то такие символы отображаются в текстовом поле. Однако есть и другие клавиши, которые оказывают влияние на текстовое поле, но они не дают отображаемого символа, поэтому не отслеживаются событием `keypress`. К таким клавишам относится клавиша Backspace, которая удаляет последний символ. И для ее отслеживания также обрабатываем событие keydown. В обработчике `keydown` удаляем из строки в блоке `printBlock` последний символ.[^10.3]

![Обработка keypress в JavaScript](../img/keypress.png)

### Источники информации
[^10.1]: [Формы и их элементы](https://metanit.com/web/javascript/10.1.php)
[^10.2]: [Кнопки](https://metanit.com/web/javascript/10.2.php)
[^10.3]: [Текстовые поля](https://metanit.com/web/javascript/10.3.php)
