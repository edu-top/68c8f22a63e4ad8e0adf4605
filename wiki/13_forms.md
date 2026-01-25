<link href="../styles.css" rel="stylesheet" />

## Формы и элементы управления

- [Формы и элементы управления](#формы-и-элементы-управления)
  - [Формы и их элементы](#формы-и-их-элементы)
    - [Навигация: формы и элементы](#навигация-формы-и-элементы)
    - [Обратная ссылка: element.form](#обратная-ссылка-elementform)
    - [Получение формы](#получение-формы)
    - [Свойства и методы форм](#свойства-и-методы-форм)
    - [Элементы форм](#элементы-форм)
    - [Свойства элементов форм](#свойства-элементов-форм)
      - [input и textarea](#input-и-textarea)
      - [select и option](#select-и-option)
      - [new Option](#new-option)
    - [Ссылки](#ссылки)
    - [Итого](#итого)
    - [Задачи](#задачи)
      - [Добавьте пункт к выпадающему списку](#добавьте-пункт-к-выпадающему-списку)
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
  - [Validation API. Валидация элементов формы](#validation-api-валидация-элементов-формы)
    - [Валидация HTML5](#валидация-html5)
    - [Получение информации о валидации в JavaScript](#получение-информации-о-валидации-в-javascript)
  - [Источники информации](#источники-информации)

### Формы и их элементы
Один из способов взаимодействия с пользователями представляют html-формы. Например, если нам надо получить от пользователя некоторую информацию, мы можем определить на веб-странице формы, которая будет содержать текстовые поля для ввода информации и кнопку для отправки. И после ввода данных мы можем обработать введенную информацию.[^10.1]

Для создания формы используется элемент `<form>`:
```html
<form id="search" name="search">
</form>
```

В JavaScript форма представлена объектом **`HtmlFormElement`**. Формы и элементы управления, такие как `<input>`, имеют множество специальных свойств и событий. И после создания формы к ней можно обратиться различными способами. Работать с формами намного удобнее, если хорошо знать их свойства и методы.

#### Навигация: формы и элементы
Формы в документе входят в специальную коллекцию `document.forms`.

Это так называемая «именованная» коллекция: мы можем использовать для получения формы как её имя, так и порядковый номер в документе.

```js
document.forms.my - форма с именем "my" (name="my")
document.forms[0] - первая форма в документе
```

Когда мы уже получили форму, любой элемент доступен в именованной коллекции `form.elements`.

Например:
```html
<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
</form>

<script>
  // получаем форму
  let form = document.forms.my; // <form name="my"> element

  // получаем элемент
  let elem = form.elements.one; // <input name="one"> element

  alert(elem.value); // 1
</script>
```

Может быть несколько элементов с одним и тем же именем, это часто бывает с кнопками-переключателями `radio`.

В этом случае `form.elements[name]` является коллекцией, например:
```html
<form>
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
</form>

<script>
let form = document.forms[0];

let ageElems = form.elements.age;

alert(ageElems[0]); // [object HTMLInputElement]
</script>
```

Эти навигационные свойства не зависят от структуры тегов внутри формы. Все элементы управления формы, как бы глубоко они не находились в форме, доступны в коллекции `form.elements`.

!!! info "`<fieldset>` как «подформа»"
    Форма может содержать один или несколько элементов `<fieldset>` внутри себя. Они также поддерживают свойство `elements`, в котором находятся элементы управления внутри них.

    Например:
    ```html
    <body>
    <form id="form">
        <fieldset name="userFields">
        <legend>info</legend>
        <input name="login" type="text">
        </fieldset>
    </form>

    <script>
        alert(form.elements.login); // <input name="login">

        let fieldset = form.elements.userFields;
        alert(fieldset); // HTMLFieldSetElement

        // мы можем достать элемент по имени как из формы, так и из fieldset с ним
        alert(fieldset.elements.login == form.elements.login); // true
    </script>
    </body>
    ```

!!! warning "Сокращённая форма записи: `form.name`"
    Есть более короткая запись: мы можем получить доступ к элементу через `form[index/name]`.

    Другими словами, вместо `form.elements.login` мы можем написать `form.login`.

    Это также работает, но есть небольшая проблема: если мы получаем элемент, а затем меняем его свойство `name`, то он всё ещё будет доступен под старым именем (также, как и под новым).

    В этом легче разобраться на примере:
    ```html
    <form id="form">
    <input name="login">
    </form>

    <script>
    alert(form.elements.login == form.login); // true, ведь это одинаковые <input>

    form.login.name = "username"; // изменяем свойство name у элемента input

    // form.elements обновили свои имена:
    alert(form.elements.login); // undefined
    alert(form.elements.username); // input

    // а в form мы можем использовать оба имени: новое и старое
    alert(form.username == form.login); // true
    </script>
    ```

    Обычно это не вызывает проблем, так как мы редко меняем имена у элементов формы.

#### Обратная ссылка: element.form
Для любого элемента форма доступна через `element.form`. Так что форма ссылается на все элементы, а эти элементы ссылаются на форму.[^form-elements]

Вот иллюстрация:

![Form navigation](../svg/form-navigation.svg)

Пример:
```html
<form id="form">
  <input type="text" name="login">
</form>

<script>
  // form -> element
  let login = form.login;

  // element -> form
  alert(login.form); // HTMLFormElement
</script>
```

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

##### input и textarea
К их значению можно получить доступ через свойство `input.value` (строка) или `input.checked` (булево значение) для чекбоксов.

Вот так:
```js
input.value = "Новое значение";
textarea.value = "Новый текст";

input.checked = true; // для чекбоксов и переключателей
```

!!! warning "Используйте `textarea.value` вместо `textarea.innerHTML`"
    Обратим внимание: хоть элемент `<textarea>...</textarea>` и хранит своё значение как вложенный HTML, нам не следует использовать `textarea.innerHTML` для доступа к нему.

    Там хранится только тот HTML, который был изначально на странице, а не текущее значение.

##### select и option
Элемент `<select>` имеет 3 важных свойства:

1. `select.options` – коллекция из подэлементов `<option>`,
2. `select.value` – значение выбранного в данный момент `<option>`,
3. `select.selectedIndex` – номер выбранного `<option>`.

Они дают три разных способа установить значение в `<select>`:

1. Найти соответствующий элемент `<option>` и установить в `option.selected` значение `true`.
2. Установить в `select.value` значение нужного `<option>`.
3. Установить в `select.selectedIndex` номер нужного `<option>`.

Первый способ наиболее понятный, но `(2)` и `(3)` являются более удобными при работе.

Вот эти способы на примере:
```html
<select id="select">
  <option value="apple">Яблоко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>

<script>
  // все три строки делают одно и то же
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
</script>
```

В отличие от большинства других элементов управления, `<select>` позволяет нам выбрать несколько вариантов одновременно, если у него стоит атрибут `multiple`. Эту возможность используют редко, но в этом случае для работы со значениями необходимо использовать первый способ, то есть ставить или удалять свойство `selected` у подэлементов `<option>`.

Их коллекцию можно получить как `select.options`, например:
```html
<select id="select" multiple>
  <option value="blues" selected>Блюз</option>
  <option value="rock" selected>Рок</option>
  <option value="classic">Классика</option>
</select>

<script>
  // получаем все выбранные значения из select с multiple
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);

  alert(selected); // blues,rock
</script>
```

Полное описание элемента `<select>` доступно в спецификации https://html.spec.whatwg.org/multipage/forms.html#the-select-element.

##### new Option
Элемент `<option>` редко используется сам по себе, но и здесь есть кое-что интересное.

В [спецификации](https://html.spec.whatwg.org/multipage/forms.html#the-option-element) есть красивый короткий синтаксис для создания элемента `<option>`:
```js
option = new Option(text, value, defaultSelected, selected);
```

Параметры:

- `text` – текст внутри `<option>`,
- `value` – значение,
- `defaultSelected` – если `true`, то ставится HTML-атрибут `selected`,
- `selected` – если `true`, то элемент `<option>` будет выбранным.

Тут может быть небольшая путаница с `defaultSelected` и `selected`. Всё просто: `defaultSelected` задаёт HTML-атрибут, его можно получить как `option.getAttribute('selected')`, а `selected` – выбрано значение или нет, именно его важно поставить правильно. Впрочем, обычно ставят оба этих значения в `true` или не ставят вовсе (т.е. `false`).

Пример:
```js
let option = new Option("Текст", "value");
// создаст <option value="value">Текст</option>
```

Тот же элемент, но выбранный:
```js
let option = new Option("Текст", "value", true, true);
```

Элементы `<option>` имеют свойства:

- **`option.selected`**

    Выбрана ли опция.

- **`option.index`**

    Номер опции среди других в списке `<select>`.

- **`option.value`**

    Значение опции.

- **`option.text`**

    Содержимое опции (то, что видит посетитель).

#### Ссылки
- Спецификация: https://html.spec.whatwg.org/multipage/forms.html.

#### Итого
Свойства для навигации по формам:

- **`document.forms`**

Форма доступна через `document.forms[name/index]`.

- **`form.elements`**

    Элементы формы доступны через `form.elements[name/index]`, или можно просто использовать `form[name/index]`. Свойство `elements` также работает для `<fieldset>`.

- **`element.form`**

    Элементы хранят ссылку на свою форму в свойстве `form`.

Значения элементов формы доступны через `input.value`, `textarea.value`, `select.value` и т.д. либо `input.checked` для чекбоксов и переключателей.

Для элемента `<select>` мы также можем получить индекс выбранного пункта через `select.selectedIndex`, либо используя коллекцию пунктов `select.options`.

Это были основы для начала работы с формами. Далее в учебнике мы встретим ещё много примеров.

В следующей главе мы рассмотрим такие события, как `focus` и `blur`, которые могут происходить на любом элементе, но чаще всего обрабатываются в формах.[^form-elements]

#### Задачи

##### Добавьте пункт к выпадающему списку

Имеется `<select>`:
```html
<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>
```

Используя JavaScript:

1. Выведите значение и текст выбранного пункта.
2. Добавьте пункт: `<option value="classic">Классика</option>`.
3. Сделайте его выбранным.

<details>
<summary>Решение</summary>

Решение шаг за шагом:
```html
<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>

<script>
  // 1)
  let selectedOption = genres.options[genres.selectedIndex];
  alert( selectedOption.value );
  alert( selectedOption.text );

  // 2)
  let newOption = new Option("Классика", "classic");
  genres.append(newOption);

  // 3)
  newOption.selected = true;
</script>
```

</details>

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

### Validation API. Валидация элементов формы

#### Валидация HTML5
HTML5 поддерживает нативную валидацию форм и их элементов. Для этого у полей ввода применяются различные атрибуты, которые настраивают валидацию. В частности, мы можем применять следующие атрибуты:

- **`required`** требует, чтобы поле ввода обязательно содержало какое-нибудь значение

- **`max`** задает максимальное числовое значение (для ввода числовых данных)

- **`min`** задает минимальное числовое значение (для ввода числовых данных)

- **`maxlength`** задает максимальную длину строки

- **`minlength`** задает минимальную длину строки

Например, возьмем следующую страницу:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
    <style>
    input {width: 150px;}
    input:invalid {border-color: red; }
    input:valid { border-color: green;}
    </style>
</head>
<body>
<form id="registerForm" name="registerForm" method="post" action="register">
<p>
    <label for="username">Username:</label><br>
    <input id="username" name="username" maxlength="20" minlength="3" required>
</p>
<p>
    <label for="email">Email:</label><br>
    <input type="email" id="email" name="email" required>
</p>
<p>
    <label for="age">Age:</label><br>
    <input type="number" id="age" name="age" min="1" max="110" value="18">
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
</body>
</html>
```

Здесь на форме определено поле `username` для ввода условного имени пользователя. Причем это имя должно иметь не меньше 3 и не больше 20 символов. Поля для ввода имени и `email` обязательны для заполнения (имеют атрибут `required`). Также для поля `age`, которое предназначено для ввода условного возраста, установлено минимальное и максимальное допустимые значения — 1 и 110 соответственно.

Также стоит отметить, что с помощью селектора `input:invalid` можно определить стиль для невалидных полей, тогда как селектор `input:valid` задает стиль для полей, которые прошли валидацию.

И если мы введем в поле значение, которое не соответствует атрибутам валидации, или не введем никакого значения в поля, которые требуют наличия ввода, то при попытке отправить форму браузер нам отобразит для соответствующего поля ошибку валидации:

![Нативная валидация в HTML5](../img/validation3.png)

Конкретное сообщение валидации зависит от веб-браузера. Выше приведен пример для Google Chrome. Однако в данном случае нас будет интересовать, как мы можем взаимодействовать с нативной валидацией HTML5 в коде JavaScript. в других браузерах вид может отличаться.[^10.6]

#### Получение информации о валидации в JavaScript
*[API]: Application Programming Interface

Современные веб-браузеры позволяют взаимодействовать в коде JavaScript с механизмом нативной валидации HTML5. Для этого предназначен специальный API — <dfn title="Constraint Validation API">Constraint Validation API</dfn>. Этот API определяет ряд свойств, которые можно применять к формам или элементам форм и которые позволяют получить состояние валидации элементов:

- **`willValidate`**: возвращает булевое значение, которое указывает, доступна ли валидация для элемента формы. Если валидация доступна, то возвращается `true`, при недоступности возвращается `false`. Например, если для элемента формы установлен атрибут `disabled`, что делает этот элемент недоступным для взаимодействия, то валидация для него также недоступна. Для других элементов (не элементов формы) возвращается значение `undefined`

- **`validity`**: возвращает объект типа **`ValidityState`**, который, в свою очередь, содержит информацию о валидации данного элемента формы. Свойства **`ValidityState`**:

  - `valid`: возвращает булевое значение, которое указывает, проходит ли элемент формы валидацию (`true`) или нет (`false`)

  - `valueMissing`: возвращает `true`, если в элементе формы, который требует обязательного ввода, отсутствует значение

  - `typeMismatch`: возвращает `true`, если введенное значение не соответствует типу элемента формы (например, в элемент `<input type="email">` введен текст, которые не является адресом элементронной почты)

  - `patternMismatch`: возвращает `true`, если введенное значение не соответствует указанному шаблону

  - `tooLong`: возвращает `true`, если введенное значение превышает максимально допустимый лимит

  - `tooShort`: возвращает `true`, если введенное значение меньше минимально допустимого значения

  - `rangeUnderflow`: возвращает `true`, если введенное значение меньше диапазона допустимых значений

  - `rangeOverflow`: возвращает `true`, если введенное значение превышает диапазон допустимых значений

  - `stepMismatch`: возвращает `true`, если введенное значение не соответствует значению атрибута `step`

  - `badInput`: возвращает `true`, если введенное значение некорректно

  - `customError`: возвращает `true`, если при вводе была сгенерирована кастомная ошибка

- **`validationMessage`**: содержит сообщение об ошибке валидации для текущего элемента формы. Конкретное сообщение зависит от используемого веб-браузера.

Применим некоторые из этих свойств для проверки ввода в элемент формы:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
    <style>
    input {width: 150px;}
    input:invalid {border-color: red; }
    input:valid { border-color: green;}
    </style>
</head>
<body>
<form id="registerForm" name="registerForm" method="post" action="register">
<p>
    <label for="email">E-mail:</label><br>
    <input type="email" id="email" name="email" required>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const emailField = document.getElementById("email");
emailField.addEventListener("change", validateEmail);

function validateEmail() {
    console.log("Может валидироваться:", emailField.willValidate);
    console.log("Значение отсутствует:", emailField.validity.valueMissing);
    console.log("Значение валидно:", emailField.validity.valid);
    console.log("Значение соответствует типу", emailField.validity.typeMismatch);
    console.log(emailField.validationMessage);
}
</script>
</body>
</html>
```

Пример работы:

![Получение информации о валидации полей формы в JavaScript](../img/validation1.png)

Благодаря этому мы можем производить дополнительную обработку информации о валидации, например, выводить ошибки валидации на страницу:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
    <style>
    input {width: 150px;}
    input:invalid {border-color: red; }
    input:valid { border-color: green;}
    #emailErrors {padding:5px;background-color: #ffcccc; color:#b33939; display:none;}
    </style>
</head>
<body>
<form id="registerForm" name="registerForm" method="post" action="register">
<p>
    <label for="email">E-mail:</label><br>
    <input type="email" id="email" name="email" required>
    <div id="emailErrors"></div>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const emailField = document.getElementById("email");
const emailErrors = document.getElementById("emailErrors");
emailField.addEventListener("change", validateEmail);

function validateEmail() {
    if(!emailField.validity.valid){
        emailErrors.textContent = emailField.validationMessage;
        emailErrors.style.display = "block";
    }
    else{
        emailErrors.textContent = "";
        emailErrors.style.display = "none";
    }
}
</script>
</body>
</html>
```

Здесь при наличии ошибки валидации в блок `emailErrors` помещаем данное сообщение:

![Вывод ошибок валидации полей формы в JavaScript](../img/validation2.png)

Как видно, браузер сам определяет сообщение об ошибке. Однако мы можем проверять валидацию по конкретным параметрам и устанавливать свои сообщения об ошибке
```js
function validateEmail() {
    if(!emailField.validity.valueMissing){
        emailErrors.textContent = "Отстуствет email!";
        emailErrors.style.display = "block";
    }
    else{
        emailErrors.textContent = "";
        emailErrors.style.display = "none";
    }
}
```

### Источники информации
[^10.1]: [Формы и их элементы](https://metanit.com/web/javascript/10.1.php)
[^10.2]: [Кнопки](https://metanit.com/web/javascript/10.2.php)
[^10.3]: [Текстовые поля](https://metanit.com/web/javascript/10.3.php)
[^10.4]: [Флажки и радиокнопки](https://metanit.com/web/javascript/10.4.php)
[^10.5]: [Список select](https://metanit.com/web/javascript/10.5.php)
[^form-elements]: [Свойства и методы формы](https://learn.javascript.ru/form-elements)
[^10.6]: [Validation API. Валидация элементов формы](https://metanit.com/web/javascript/10.6.php)
