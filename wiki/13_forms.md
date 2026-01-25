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
  - [Флажки и радиокнопки](#флажки-и-радиокнопки)
  - [Список select](#список-select)
    - [Динамическое управление списком](#динамическое-управление-списком)
    - [События элемента select. Обработка выбора в списке](#события-элемента-select-обработка-выбора-в-списке)
    - [Список со множественным выбором](#список-со-множественным-выбором)
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

### Флажки и радиокнопки
Особую группу элементов ввода составляют флажки (чекбоксы) и радиокнопки.[^10.4]

<dfn title="флажок">Флажки</dfn> (*checkboxes*) представляют поле, в которое можно поставить отметки и которое создается с помощью элемента `<input type="checkbox">`. Отличительную особенность флажка составляет свойство **`checked`**, которое в отмеченном состоянии принимает значение `true`:
```html
<form name="myForm">
    <input type="checkbox" name="enabled" checked><span>Включить</span>
</form>
<div id="printBlock"></div>
<script>
const enabledBox = document.myForm.enabled;
const printBlock = document.getElementById("printBlock");
//  в текст printBlock передаем установленное значение
enabledBox.addEventListener("click", (e)=> printBlock.textContent = e.target.checked);
</script>
```

Нажатие на флажок генерирует событие `click`. В данном случае при обработке данного события мы просто выводим информацию, отмечен ли данный флажок, в блок `div`.

![Checkbox в JavaScript](../img/checkbox.png)

<dfn title="радиокнопка">Радиокнопки</dfn> (*radio buttons*) представляют группы кнопок, из которых мы можем выбрать только одну. Радиокнопки создаются элементом `<input type="radio">`.

Выбор или нажатие на одну из них также представляет событие `click`:
```html
<form name="myForm">
    <input type="radio" name="languages" value="Java" /><span>Java</span>
    <input type="radio" name="languages" value="C#" /><span>C#</span>
    <input type="radio" name="languages" value="C++" /><span>C++</span>
</form>
<div id="printBlock"></div>
<script>
const printBlock = document.getElementById("printBlock");
const myForm = document.myForm;
function onclick(e){
    printBlock.textContent = `Вы выбрали: ${language}`;
}
for (let i = 0; i < myForm.languages.length; i++) {
    myForm.languages[i].addEventListener("click", onclick);
}
</script>
```

При создании группы радиокнопок их атрибут `name` должен иметь одно и то же значение. В данном случае это `languages`. То есть радиокнопки образуют группу `languages`.

Поскольку радиокнопок может быть много, то при прикреплении к ним обработчика события нам надо пробежаться по всему массиву радиокнопок, который можно получить по имени группы:
```js
for (let i = 0; i < myForm.languages.length; i++) {
    myForm.languages[i].addEventListener("click", onclick);
}
```

Значение выбранного радиокнопки также можно получить через объект `Event: e.target.value`.

![RadioButton в JavaScript](../img/radiobutton.png)

Каждая радиокнопка также, как и флажок, имеет свойство `checked`, которое возвращает значение `true`, если радиокнопка отмечена. Например, отметим последнюю радиокнопку:
```js
myForm.languages[myForm.languages.length-1].checked = true;
```

### Список select
Для создания списка используется html-элемент `select`. Причем с его помощью можно создавать как выпадающие списки, так и обычные с ординарным или множественным выбором. Например, стандартный список:
```html
<select name="language" size="4">
    <option value="JS" selected="selected">JavaScript</option>
    <option value="Java">Java</option>
    <option value="C#">C#</option>
    <option value="C++">C++</option>
</select>
```

Атрибут `size` позволяет установить, сколько элементов будут отображаться одномоментно в списке. Значение `size="1"` отображает только один элемент списка, а сам список становится выпадающим. Если установить у элемента `select` атрибут **`multiple`**, то в списке можно выбрать сразу несколько значений.

Каждый элемент списка представлен html-элементом `option`, у которого есть отображаемая метка и есть значения в виде атрибута value.

В JavaScript элементу `select` соответствует объект **`HTMLSelectElement`**, а элементу option — объект **`HtmlOptionElement`** или просто **`Option`**.

Все элементы списка в javascript доступны через коллекцию **`options`**. А каждый объект `HtmlOptionElement` имеет свойства: `index` (индекс в коллекции `options`), `text` (отображаемый текст) и `value` (значение элемента). Например, получим первый элемент списка и выведем о нем через его свойства всю информацию:
```html
<form name="myForm">
    <select name="language" size="4">
        <option value="JS" selected="selected">JavaScript</option>
        <option value="Java">Java</option>
        <option value="CS">C#</option>
        <option value="CPP">C++</option>
    </select>
</form>
<script>
const firstLanguage = document.myForm.language.options[0];
console.log("Index:", firstLanguage.index);
console.log("Text:", firstLanguage.text);
console.log("Value:", firstLanguage.value);
</script>
```

![Элемент select в JavaScript](../img/selectoptions.png)

Другой способ получить нужный элемент списка по индексу представляет метод **`item()`**, в который передается индекс элемента:
```js
const firstLanguage = myForm.language.item(0);
console.log("Index:", firstLanguage.index);
console.log("Text:", firstLanguage.text);
console.log("Value:", firstLanguage.value);
```

#### Динамическое управление списком
В javascript мы можем не только получать элементы, но и динамически управлять списком. Например, применим добавление и удаление объектов списка:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
<form name="myForm">
    <select name="language" size="5">
        <option value="JS" selected="selected">JavaScript</option>
        <option value="Java">Java</option>
        <option value="CS">C#</option>
        <option value="CPP">C++</option>
    </select>
    <p><input type="text" name="textInput" placeholder="Введите текст" /></p>
    <p><input type="text" name="valueInput" placeholder="Введите значение" /></p>
    <p>
        <input type="button" name="addButton" value="Добавить" />
        <input type="button" name="removeButton" value="Удалить" />
    </p>
</form>

<script>
const myForm = document.myForm;
const addButton = myForm.addButton,
      removeButton = myForm.removeButton,
      languagesSelect = myForm.language;
// обработчик добавления элемента
function addOption(){
    // получаем текст для элемента
    const text = myForm.textInput.value;
    // получаем значение для элемента
    const value = myForm.valueInput.value;
    // создаем новый элемента
    const newOption = new Option(text, value);
    languagesSelect.options[languagesSelect.options.length]=newOption;
}
// обработчик удаления элемент
function removeOption(){

    const selectedIndex = languagesSelect.options.selectedIndex;
    // удаляем элемент
    languagesSelect.options[selectedIndex] = null;
}

addButton.addEventListener("click", addOption);
removeButton.addEventListener("click", removeOption);
</script>
</body>
</html>
```

Для добавления на форме предназначены два текстовых поля (для текстовой метки и значения элемента option) и кнопка. Для удаления выделенного элемента предназначена еще одна кнопка.

За добавление в коде javascript отвечает функция `addOption`, в которой получаем введенные в текстовые поля значения, создаем новый объект `Option` и добавляем его в массив `options` объекта списка.

За удаление отвечает функция `removeOption`, в которой просто получаем индекс выделенного элемента с помощью свойства **`selectedIndex`** и в коллекции `options` приравниваем по этому индексу значение `null`.

![Добавление и удаление элементов списка в JavaScript](../img/addoption.png)

Для добавления/удаления также в качестве альтернативы можно использовать методы элемента `select`:
```js
// вместо вызова
// languagesSelect.options[languagesSelect.options.length]=newOption;
// использовать для добавления вызов метода add
languagesSelect.add(newOption);
// вместо вызова
// languagesSelect.options[selectedIndex] = null;
// использовать для удаления метод remove
languagesSelect.remove(selectedIndex);
```

#### События элемента select. Обработка выбора в списке
Элемент `select` поддерживает три события: `blur` (потеря фокуса), `focus` (получение фокуса) и `change` (изменение выделенного элемента в списке). Рассмотрим применение события `select`:
```html
<form name="myForm">
    <select name="language" size="5">
        <option value="JS" selected="selected">JavaScript</option>
        <option value="Java">Java</option>
        <option value="CS">C#</option>
        <option value="CPP">C++</option>
    </select>
</form>
<div id="selection"></div>
<script>
const languagesSelect = document.myForm.language;
const selection = document.getElementById("selection");

function changeOption(){
    const selectedOption = languagesSelect.options[languagesSelect.selectedIndex];
    selection.textContent = "Вы выбрали: " + selectedOption.text;
}

languagesSelect.addEventListener("change", changeOption);
</script>
```

![Выбор элементов в списке select в JavaScript](../img/selectoptions2.png)

#### Список со множественным выбором
Если у элемента `<select>` установлен атрибут **`multiple`**, то список позволяет выбрать несколько элементов. В этом случае для получения всех выделенных элементов необходимо использовать свойство **`selectedOptions`**, которое представляет объект типа **`HTMLCollection`** и содержит список выбранных элементов. А каждый объект в этом списке имеет тип **`HTMLOptionElement`**. Соответственно для получения каждого из выбранных элементов нам надо перебрать эту коллекцию:
```html
<form name="myForm">
    <select name="languages" multiple>
        <option value="JS">JavaScript</option>
        <option value="Java">Java</option>
        <option value="CS">C#</option>
        <option value="CPP">C++</option>
    </select>
</form>
<div id="selection"></div>
<script>
const languages = document.myForm.languages;
const selection = document.getElementById("selection");

function changeOption(){
    // удаляем ранее выбранные элементы
    while (selection.firstChild) {
        selection.removeChild(selection.firstChild);
    }
    // получаем выбранные элементы
    const options = languages.selectedOptions;
    for (let i = 0; i < options.length; i++) {      // for each option ...
        const option = options[i].text    // получаем выбранный элемент
        const div = document.createElement("div");  // для каждого выбранного элемента создаем div
        const optionText = document.createTextNode(option); // создаем текстовый узел для выбранного элемента
        div.appendChild(optionText);    // добавляем  optionText в div
        selection.appendChild(div)      // добавляем div в контейнер
    }
}
languages.addEventListener("change", changeOption);
</script>
```

В данном случае в обработчике события `change` проходим по каждому выбранному элементу и для каждого элемента создаем текстовый узел, который помещаем в элемент `div`, который, в свою очередь, помещаем в элемент `selection` на веб-странице.[^10.5]

![обработка выбора элементов списка со множественным выбором в JavaScript](../img/multipleselect.png)

### Источники информации
[^10.1]: [Формы и их элементы](https://metanit.com/web/javascript/10.1.php)
[^10.2]: [Кнопки](https://metanit.com/web/javascript/10.2.php)
[^10.3]: [Текстовые поля](https://metanit.com/web/javascript/10.3.php)
[^10.4]: [Флажки и радиокнопки](https://metanit.com/web/javascript/10.4.php)
[^10.5]: [Список select](https://metanit.com/web/javascript/10.5.php)
