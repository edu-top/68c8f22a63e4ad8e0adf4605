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
    - [Выводы](#выводы)
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
  - [Фокусировка: focus/blur](#фокусировка-focusblur)
    - [События focus/blur](#события-focusblur)
    - [Методы focus/blur](#методы-focusblur)
    - [Включаем фокусировку на любом элементе: tabindex](#включаем-фокусировку-на-любом-элементе-tabindex)
    - [События focusin/focusout](#события-focusinfocusout)
    - [Итого](#итого-1)
    - [Задачи](#задачи-1)
      - [Редактируемый div](#редактируемый-div)
      - [Редактирование TD по клику](#редактирование-td-по-клику)
    - [Мышь, управляемая клавиатурой](#мышь-управляемая-клавиатурой)
  - [События: change, input, cut, copy, paste](#события-change-input-cut-copy-paste)
    - [Событие: change](#событие-change)
    - [Событие: input](#событие-input)
    - [События: cut, copy, paste](#события-cut-copy-paste)
      - [Практические примеры](#практические-примеры)
      - [Проверка user gesture](#проверка-user-gesture)
    - [Итого](#итого-2)
    - [Задачи](#задачи-2)
      - [Депозитный калькулятор](#депозитный-калькулятор)
  - [Отправка формы: событие и метод submit](#отправка-формы-событие-и-метод-submit)
    - [Событие: submit](#событие-submit)
    - [Метод: submit](#метод-submit)
    - [Задачи](#задачи-3)
      - [Модальное диалоговое окно с формой](#модальное-диалоговое-окно-с-формой)
  - [Validation API. Валидация элементов формы](#validation-api-валидация-элементов-формы)
    - [Валидация HTML5](#валидация-html5)
    - [Получение информации о валидации в JavaScript](#получение-информации-о-валидации-в-javascript)
  - [Управление валидацией форм](#управление-валидацией-форм)
    - [Методы валидации](#методы-валидации)
    - [Настройка собственных сообщений валидации](#настройка-собственных-сообщений-валидации)
    - [Определение своих правил валидации](#определение-своих-правил-валидации)
  - [Selection и Range](#selection-и-range)
    - [Range](#range)
  - [Практическая работа. Динамическое создание элементов форм](#практическая-работа-динамическое-создание-элементов-форм)
    - [Задание](#задание)
  - [Практическая работа. Создание редактируемых элементов](#практическая-работа-создание-редактируемых-элементов)
    - [Задание](#задание-1)
  - [Практическая работа. Создание депозитного калькулятора](#практическая-работа-создание-депозитного-калькулятора)
    - [Задание](#задание-2)
  - [Практическая работа. Реализация альтернативных механизмов замены изображения пользователя](#практическая-работа-реализация-альтернативных-механизмов-замены-изображения-пользователя)
    - [Задание](#задание-3)
  - [Глоссарий](#глоссарий)
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
        alert(fieldset);            // HTMLFieldSetElement

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
Форма имеет ряд свойств, из которых основные:

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

Основные методы:
- **`submit()`**

  Отправляет данные формы на сервер, аналогично нажатию кнопки `<button type="submit">`. Не всегда запускает событие `submit`, поэтому валидаторы могут не сработать.

  ```js
  const form = document.forms["search"];
  form.submit(); // Программная отправка
  ```

- **`reset()`**

  Очищает все поля формы, возвращая их к значениям по умолчанию из HTML. Запускает событие `reset`.

  ```js
  form.reset(); // Сброс формы
  ```

- **`checkValidity()`**

  Проверяет соответствие формы требованиям HTML5-валидации (`required`, `min`, `max`, `pattern`). Возвращает `true` при успехе или `false` при ошибках.

  ```js
  if (form.checkValidity()) {
      console.log("Форма валидна");
  } else {
      console.log("Есть ошибки валидации");
  }
  ```

- **`reportValidity()`**

  Как `checkValidity()`, но показывает браузерные сообщения об ошибках (всплывающие подсказки).

  ```js
  form.reportValidity(); // Проверка + UI-уведомления
  ```

- **`requestSubmit([submitter])`**

  Современная замена `submit()`. Запускает событие `submit` и обработчики. Принимает кнопку отправки как параметр.

  ```js
  const submitBtn = document.querySelector('#submit');
  form.requestSubmit(submitBtn); // С кнопкой
  form.requestSubmit(); // Без кнопки
  ```

- **`namedItem(name)`**

  Возвращает первый элемент формы с указанным атрибутом `name` (удобно для радио-кнопок, чекбоксов).

  ```js
  const gender = form.namedItem("gender");
  ```

Среди методов формы надо отметить метод **`submit()`**, который отправляет данные формы на сервер, и метод **`reset()`**, который очищает поля формы:
```js
const form = document.forms["search"];
form.submit();
form.reset();
```

| Метод            | Описание            | Возвращает событие |
| ---------------- | ------------------- | ------------------ |
| `submit()`         | Отправка формы      | Не всегда `submit`   |
| `reset()`          | Сброс полей         | `reset`              |
| `checkValidity()`  | Проверка валидации  | `boolean`            |
| `reportValidity()` | Проверка + UI       | `boolean`            |
| `requestSubmit()`  | Отправка с событием | `undefined`          |

Эти методы покрывают 95% задач по программному управлению формами.

#### Элементы форм
Форма может содержать различные элементы ввода html: `input`, `textarea`, `button`, `select` и т.д. Для каждого из элементов существует свой тип JavaScript:

| Элемент    | Описание                                                                    | Тип JavaScript      |
| ---------- | --------------------------------------------------------------------------- | ------------------- |
| `<form>`     | Контейнер формы                                                  | `HTMLFormElement`     |
| `<input>`    | Универсальное поле ввода (`text`, `password`, `checkbox`, `radio`, и т.д.) | `HTMLInputElement`    |
| `<textarea>` | Многострочное текстовое поле schoolsw3​                                     | `HTMLTextAreaElement` |
| `<button>`   | Кнопка (submit, reset, button) schoolsw3​                                   | `HTMLButtonElement`   |
| `<select>`   | Выпадающий список schoolsw3​                                                | `HTMLSelectElement`   |
| `<option>`   | Пункт списка `<select>` или `<datalist>` schoolsw3​                             | `HTMLOptionElement`   |
| `<optgroup>` | Группа пунктов в `<select>` schoolsw3​                                        | `HTMLOptgroupElement` |
| `<label>`    | Подпись к элементу ввода schoolsw3​                                         | `HTMLLabelElement`    |
| `<fieldset>` | Группа связанных элементов schoolsw3​                                       | `HTMLFieldSetElement` |
| `<legend>`   | Заголовок для `<fieldset>`                                 | `HTMLLegendElement`   |
| `<datalist>` | Список подсказок для `<input>` schoolsw3​                                     | `HTMLDataListElement` |
| `<output>`   | Результат вычислений​                                             | `HTMLOutputElement`   |
| `<progress>` | Индикатор прогресса                                              | `HTMLProgressElement` |
| `<meter>`    | Индикатор уровня/объема                                          | `HTMLMeterElement`    |

- **Обязательные элементы**: `<form>`, `<input>`, `<textarea>`, `<select>`, `<button>` — основа любой формы.

- **Группировка**: `<fieldset>`, `<legend>`, `<optgroup>` — для структурирования.

- **Индикация состояния**: `<progress>`, `<meter>` — визуализация данных.

- **Управление UX**: `<datalist>`, `<label>`, `<output>` — улучшают взаимодействие.

Этот список покрывает все элементы, которые могут находиться внутри `<form>` или быть связаны с ней через атрибут `form`.

Для получения элементов форм можно использовать следующие способы:

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

Из методов можно выделить **`focus()`** (устанавливает фокус на элемент) и **`blur()`** (убирает фокус с элемента):
```js
const searchForm = document.forms["search"];
const keyField = searchForm.elements["key"];
keyField.focus();
keyField.blur();
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

#### Выводы
Формы и элементы управления являются основой взаимодействия пользователя с веб-страницей. Они позволяют собирать данные, отправлять их на сервер и управлять поведением страницы без перезагрузки.

Часть элементов управления форм (такие как `input`, `textarea`, `select`, `button`) отвечает за взаимодействие с пользователем, в то время как остальные обеспечивают базовую функциональность, структуру и форматирование (`form`, `label`, `fieldset`, `legend`). JavaScript дает возможность считывать значения, валидировать их, отслеживать изменения и реагировать на события.

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

При нажатии на кнопку происходит событие `click`, и для его обработки к кнопке прикрепляем обработчик `sendForm`. В этом обработчике проверяем введенный в текстовое поле текст. Если его длина меньше 3 символов, то выводим сообщение о недопустимой длине и прерываем обычный ход события с помощью вызова **`e.preventDefault()`**. В итоге форма не отправляется.

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

Кроме события `change` мы можем обрабатывать изменение введенного текста, обрабатывая событие **`input`**. Но если событие **`change`** возникает, когда пользователь закончит ввод и переведет фокус с текстового поля на другой элемент, то событие **`input`** возникает сразу при вводе нового символа или удаления имеющегося:
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
*[CSRF]: Cross-Site Request Forgery

Если нам надо, чтобы на форме было некоторое значение, но чтобы оно было скрыто от пользователя, то для этого могут использоваться скрытые поля:
```html
<input type="hidden" name="id" value="345" />
```

Для скрытого поля обычно не используется обработка событий, но также, как и для других элементов, мы можем в javascript получить его значение или изменить его.

*Работа со скрытыми полями в JavaScript*
```html
<form id="myForm">
    <input type="hidden" name="user_id" id="userId" value="345" />
    <input type="text" name="username" placeholder="Имя пользователя" />
    <button type="submit">Отправить</button>
</form>

<script>
    // При отправке формы добавляем динамические данные
    document.getElementById('myForm').addEventListener('submit', function(e) {
        const timestamp = new Date().getTime();
        document.getElementById('userId').value = 'updated_' + timestamp;
        console.log('Отправляется ID:', document.getElementById('userId').value);
    });
</script>
```

Скрытые поля часто используются для передачи идентификаторов записей, токенов CSRF, временных меток или других служебных данных на сервер.

!!! info "Про CSRF"

    <dfn title="CSRF">CSRF</dfn> (Cross-Site Request Forgery, «Межсайтовая подделка запроса») — это атака, вынуждающая авторизованного пользователя выполнить нежелательные действия (перевод денег, смена пароля) на другом сайте без его ведома. Злоумышленник использует доверие сайта к браузеру жертвы, который автоматически отправляет cookies с запросом.

    **Ключевые аспекты CSRF**:
    - **Принцип**: жертва заходит на вредоносный сайт, который скрыто отправляет запрос на сайт, где жертва авторизована.
    - **Цель**: изменение состояния (данных) на сервере, а не кража информации.
    - **Уязвимые места**: формы, использующие POST-запросы, передача параметров через URL.

    **Методы защиты**:
    - **CSRF-токены** (*Anti-CSRF tokens*): использование уникальных, случайных и секретных токенов для каждого запроса/сессии, которые проверяет сервер.
    - **SameSite cookie attribute**: Настройка атрибута `SameSite` для cookies (Lax или Strict), чтобы они не отправлялись при сторонних запросах.
    - **Проверка заголовков**: проверка заголовков `Referer` или `Origin` на соответствие ожидаемому источнику.

    Наиболее эффективный способ защиты — использование анти-CSRF токенов, которые поддерживаются большинством современных фреймворков.

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

Значение выбранной радиокнопки также можно получить через объект `Event: e.target.value`.

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

Каждый элемент списка представлен html-элементом `option`, у которого есть отображаемая метка и есть значения в виде атрибута `value`.

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

![Элемент select в JavaScript](../img/selectoptions_cp.png)

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

![Добавление и удаление элементов списка в JavaScript](../img/addoption_cp.png)

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

![Выбор элементов в списке select в JavaScript](../img/selectoptions2_cp.png)

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

![обработка выбора элементов списка со множественным выбором в JavaScript](../img/multipleselect_cp.png)

### Фокусировка: focus/blur

Элемент получает фокус, когда пользователь кликает по нему или использует клавишу <kbd>Tab↹</kbd>. Также существует HTML-атрибут `autofocus`, который устанавливает фокус на элемент, когда страница загружается. Есть и другие способы получения фокуса, о них – далее.

Фокусировка обычно означает: «приготовься к вводу данных на этом элементе», это хороший момент, чтобы инициализовать или загрузить что-нибудь.

Момент потери фокуса («blur») может быть важнее. Это момент, когда пользователь кликает куда-то ещё или нажимает <kbd>Tab↹</kbd>, чтобы переключиться на следующее поле формы. Есть другие причины потери фокуса, о них – далее.

Потеря фокуса обычно означает «данные введены», и мы можем выполнить проверку введённых данных или даже отправить эти данные на сервер и так далее.

В работе с событиями фокусировки есть важные особенности. Мы постараемся разобрать их далее.[^focus-blur]

#### События focus/blur
Событие `focus` вызывается в момент фокусировки, а `blur` – когда элемент теряет фокус.

Используем их для валидации(проверки) введённых данных.

В примере ниже:

- обработчик `blur` проверяет, введён ли email, и если нет – показывает ошибку;
- обработчик `focus` скрывает это сообщение об ошибке (в момент потери фокуса проверка повторится).

```html
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Ваш email: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // не email
    input.classList.add('invalid');
    error.innerHTML = 'Пожалуйста, введите правильный email.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
```

Ваш email: <input type="email" id="input">

![Focus/blur events](../img/focus-blur-events.png)

Современный HTML позволяет делать валидацию с помощью атрибутов `required`, `pattern` и т.д. Подробнее об этом изложено в разделе, касающемся [Validation API](#validation-api-валидация-элементов-формы). Иногда это всё, что нам нужно. JavaScript можно использовать, когда мы хотим больше гибкости. А ещё мы могли бы отправлять изменённое значение на сервер, если оно правильное.

#### Методы focus/blur
Методы `elem.focus()` и `elem.blur()` устанавливают/снимают фокус.

Например, запретим посетителю переключаться с поля ввода, если введённое значение не прошло валидацию:
```html
<style>
  .error {
    background: red;
  }
</style>

Ваш email: <input type="email" id="input">
<input type="text" style="width:280px" placeholder="введите неверный email и кликните сюда">

<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // не email
      // показать ошибку
      this.classList.add("error");
      // ...и вернуть фокус обратно
      input.focus();
    } else {
      this.classList.remove("error");
    }
  };
</script>
```

Ваш email: <input type="email" id="input">
<input type="text" style="width:280px" placeholder="введите неверный email и кликните сюда">

![Focus/blur methods](../img/focus-blur-methods.png)

Это сработает во всех браузерах, кроме Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=53579)).

Если мы что-нибудь введём и нажмём <kbd>Tab↹</kbd> или кликнем в другое место, тогда `onblur` вернёт фокус обратно.

Отметим, что мы не можем «отменить потерю фокуса», вызвав `event.preventDefault()` в обработчике `onblur` потому, что `onblur` срабатывает после потери фокуса элементом.

Однако на практике следует хорошо подумать, прежде чем внедрять что-то подобное, потому что мы обычно *должны показывать ошибки* пользователю, но они *не должны мешать* пользователю при заполнении нашей формы. Ведь, вполне возможно, что он захочет сначала заполнить другие поля.

**Альтернативные подходы для удобной валидации**:

1. **Валидация по событию `input` или `change`** — проверяем данные в реальном времени, как только пользователь что-то вводит. Фокус не возвращается, но ошибки показываются сразу.

2. **Валидация по `submit`** — проверяем всю форму только при отправке. Самый ненавязчивый способ для пользователя.

3. **Гибридный подход**:

    ```js
    // Показываем ошибки только при потере фокуса, но НЕ возвращаем фокус
    input.addEventListener('blur', validateField);

    // Дополнительно: подсветка в реальном времени без ошибок
    input.addEventListener('input', clearErrorIfValid);
    ```
4. **"Тихая" валидация** — показываем зелёную галочку при корректных данных, красную ошибку — только при `blur` или `submit`.

*Пример практического решения*:
```js
function validateField(event) {
  const field = event.target;
  const value = field.value.trim();

  // Убираем фокус НЕ возвращаем
  if (!isValid(value)) {
    showError(field, 'Некорректные данные');
  } else {
    clearError(field);
  }
}

// Применяем только к blur, не мешаем пользователю
input.addEventListener('blur', validateField);
form.addEventListener('submit', validateForm);
```

**Вывод**: возврат фокуса — крайняя мера. Лучше сделать UX удобным: мгновенная обратная связь без блокировок, чёткие сообщения об ошибках и валидация на ключевых этапах (`blur` + `submit`).

!!! warning "Потеря фокуса, вызванная JavaScript"
    Потеря фокуса может произойти по множеству причин.

    Одна из них – когда посетитель кликает куда-то ещё. Но и JavaScript может быть причиной, например:

    - `alert` переводит фокус на себя – элемент теряет фокус (событие `blur`), а когда `alert` закрывается – элемент получает фокус обратно (событие `focus`).
    - Если элемент удалить из DOM, фокус также будет потерян. Если элемент добавить обратно, то фокус не вернётся.

    Из-за этих особенностей обработчики `focus`/`blur` могут сработать тогда, когда это не требуется.

    Используя эти события, нужно быть осторожным. Если мы хотим отследить потерю фокуса, которую инициировал пользователь, тогда нам следует избегать её самим.

#### Включаем фокусировку на любом элементе: tabindex
Многие элементы по умолчанию не поддерживают фокусировку.

Какие именно – зависит от браузера, но одно всегда верно: поддержка `focus`/`blur` гарантирована для элементов, с которыми посетитель может взаимодействовать: `<button>`, `<input>`, `<select>`, `<a>` и т.д.

С другой стороны, элементы форматирования `<div>`, `<span>`, `<table>` – по умолчанию не могут получить фокус. Метод `elem.focus()` не работает для них, и события `focus`/`blur` никогда не срабатывают.

Это можно изменить HTML-атрибутом `tabindex`.

Любой элемент поддерживает фокусировку, если имеет `tabindex`. Значение этого атрибута – порядковый номер элемента, когда клавиша <kbd>Tab↹</kbd> (или что-то аналогичное) используется для переключения между элементами.

То есть: если у нас два элемента, первый имеет `tabindex="1"`, а второй `tabindex="2"`, то находясь в первом элементе и нажав <kbd>Tab↹</kbd> – мы переместимся во второй.

Порядок перебора таков: сначала идут элементы со значениями `tabindex` от `1` и выше, в порядке `tabindex`, а затем элементы без `tabindex` (например, обычный `<input>`).

При совпадающих `tabindex` элементы перебираются в том порядке, в котором идут в документе.

Есть два специальных значения:

- `tabindex="0"` ставит элемент в один ряд с элементами без `tabindex`. То есть, при переключении такие элементы будут после элементов с `tabindex ≥ 1`.

    Обычно используется, чтобы включить фокусировку на элементе, но не менять порядок переключения. Чтобы элемент мог участвовать в форме наравне с обычными `<input>`.

- `tabindex="-1"` позволяет фокусироваться на элементе только программно. Клавиша <kbd>Tab↹</kbd> проигнорирует такой элемент, но метод `elem.focus()` будет действовать.

Например, список ниже. Кликните первый пункт в списке и нажмите <kbd>Tab↹</kbd>:
```html
Кликните первый пункт в списке и нажмите Tab. Продолжайте следить за порядком. Обратите внимание, что много последовательных нажатий Tab могут вывести фокус из iframe с примером.
<ul>
  <li tabindex="1">Один</li>
  <li tabindex="0">Ноль</li>
  <li tabindex="2">Два</li>
  <li tabindex="-1">Минус один</li>
</ul>

<style>
  li { cursor: pointer; }
  :focus { outline: 1px dashed green; }
</style>
```

Кликните первый пункт в списке и нажмите Tab. Продолжайте следить за порядком. Обратите внимание, что много последовательных нажатий Tab могут вывести фокус из iframe с примером.
<ul>
  <li tabindex="1">Один</li>
  <li tabindex="0">Ноль</li>
  <li tabindex="2">Два</li>
  <li tabindex="-1">Минус один</li>
</ul>

![Tabindex](../img/focus-tabindex.png)

Порядок такой: `1 - 2 - 0`. Обычно `<li>` не поддерживает фокусировку, но `tabindex` включает её, а также события и стилизацию псевдоклассом `:focus`.

!!! info "Свойство `elem.tabIndex` тоже работает"
    Мы можем добавить `tabindex` из JavaScript, используя свойство `elem.tabIndex`. Это даст тот же эффект.

#### События focusin/focusout
События `focus` и `blur` не всплывают.

Например, мы не можем использовать `onfocus` на `<form>`, чтобы подсветить её:
```html
<!-- добавить класс при фокусировке на форме -->
<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>
```

<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

![Focusin/Focusout](../img/focusin-focusout_1.png)

Пример выше не работает, потому что когда пользователь перемещает фокус на `<input>`, событие `focus` срабатывает только на этом элементе. Это событие не всплывает. Следовательно, `form.onfocus` никогда не срабатывает.

У этой проблемы два решения.

Первое: забавная особенность – `focus`/`blur` не всплывают, но передаются вниз на фазе перехвата.

Это сработает:
```html
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
  // установить обработчик на фазе перехвата (последний аргумент true)
  form.addEventListener("focus", () => form.classList.add('focused'), true);
  form.addEventListener("blur", () => form.classList.remove('focused'), true);
</script>
```

<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

![Focusin/Focusout](../img/focusin-focusout_2.png)

Второе решение: события `focusin` и `focusout` – такие же, как и `focus`/`blur`, но они всплывают.

Заметьте, что эти события должны использоваться с `elem.addEventListener`, но не с `on<event>`.

Второй рабочий вариант:
```html
<form id="form">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
</script>
```

<form onfocus="this.className='focused'">
  <input type="text" name="name" value="Имя">
  <input type="text" name="surname" value="Фамилия">
</form>

![Focusin/Focusout](../img/focusin-focusout_2.png)

#### Итого
События `focus` и `blur` срабатывают на фокусировке/потере фокуса элемента.

Их особенности:

- Они не всплывают. Но можно использовать фазу перехвата или `focusin`/`focusout`.
- Большинство элементов не поддерживают фокусировку по умолчанию. Используйте `tabindex`, чтобы сделать фокусируемым любой элемент.
- Текущий элемент с фокусом можно получить из `document.activeElement`.

#### Задачи

##### Редактируемый div

Создайте `<div>`, который превращается в `<textarea>`, если на него кликнуть.

`<textarea>` позволяет редактировать HTML в элементе `<div>`.

Когда пользователь нажимает <kbd>Enter⏎</kbd> или переводит фокус, `<textarea>` превращается обратно в `<div>`, и его содержимое становится HTML-кодом в `<div>`.

![Div-textarea](../img/div-textarea_1.png)

![Div-textarea](../img/div-textarea_2.png)

<details>
<summary>Решение</summary>

[Код решения](../src/13_forms/editable-div/index.html)

</details>

##### Редактирование TD по клику

Сделайте ячейки таблицы редактируемыми по клику.

- По клику – ячейка должна стать «редактируемой» (`textarea` появляется внутри), мы можем изменять HTML. Изменение размера ячейки должно быть отключено.
- Кнопки OK и ОТМЕНА появляются ниже ячейки и, соответственно, завершают/отменяют редактирование.
- Только одну ячейку можно редактировать за один раз. Пока `<td>` в «режиме редактирования», клики по другим ячейкам игнорируются.
- Таблица может иметь множество ячеек. Используйте делегирование событий.

Демо:

![Editable TD](../img/editable-td_1.png)

![Editable TD](../img/editable-td_2.png)

<details>
<summary>Решение</summary>

1. По клику – заменить `innerHTML` ячейки на `<textarea>` с теми же размерами и без рамки. Можно использовать JavaScript или CSS, чтобы установить правильный размер.
2. Присвоить `textarea.value` значение `td.innerHTML`.
3. Установить фокус на текстовую область.
4. Показать кнопки ОК/ОТМЕНА под ячейкой, обрабатывать клики по ним.

[Код решения](../src/13_forms/editable-td/index.html)

</details>

#### Мышь, управляемая клавиатурой

Установите фокус на мышь. Затем используйте клавиши со стрелками, чтобы её двигать:

Демо:

![Keyboard mouse](../img/kbd-mouse_1.png)

![Keyboard mouse](../img/kbd-mouse_2.png)

P.S. Не добавляйте обработчики никуда, кроме элемента `#mouse`.

P.P.S. Не изменяйте HTML/CSS, подход должен быть общим и работать с любым элементом.

<details>
<summary>Решение</summary>

Мы можем использовать `mouse.onclick` для обработки клика и сделать мышь «перемещаемой» с помощью `position:fixed`, а затем использовать `mouse.onkeydown` для обработки клавиш со стрелками.

Единственная проблема в том, что `keydown` срабатывает только на элементах с фокусом. И нам нужно добавить `tabindex` к элементу. Так как изменять HTML запрещено, то для этого мы можем использовать свойство `mouse.tabIndex`.

P.S. Мы также можем заменить `mouse.onclick` на `mouse.onfocus`.

[Код решения](../src/13_forms/keyboard-mouse.html)

</details>

### События: change, input, cut, copy, paste
Давайте рассмотрим различные события, сопутствующие обновлению данных.[^events-change-input]

#### Событие: change
Событие `change` срабатывает по окончании изменения элемента.

Для текстовых `<input>` это означает, что событие происходит при потере фокуса.

Пока мы печатаем в текстовом поле в примере ниже, событие не происходит. Но когда мы перемещаем фокус в другое место, например, нажимая на кнопку, то произойдёт событие `change`:
```html
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">

![Change event](../img/change-evt_1.png)

Для других элементов: `select`, `input type=checkbox/radio` событие запускается сразу после изменения значения:
```html
<select onchange="alert(this.value)">
  <option value="">Выберите что-нибудь</option>
  <option value="1">Вариант 1</option>
  <option value="2">Вариант 2</option>
  <option value="3">Вариант 3</option>
</select>
```

<select onchange="alert(this.value)">
  <option value="">Выберите что-нибудь</option>
  <option value="1">Вариант 1</option>
  <option value="2">Вариант 2</option>
  <option value="3">Вариант 3</option>
</select>

![Change event](../img/change-evt_2.png)

#### Событие: input
Событие `input` срабатывает каждый раз при изменении значения.

В отличие от событий клавиатуры, оно работает при любых изменениях значений, даже если они не связаны с клавиатурными действиями: вставка с помощью мыши или распознавание речи при диктовке текста.

Например:
```html
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

<input type="text" id="input"> oninput: <span id="result"></span>

![Oninput](../img/oninput.png)

Если мы хотим обрабатывать каждое изменение в `<input>`, то это событие является лучшим выбором.

С другой стороны, событие `input` не происходит при вводе с клавиатуры или иных действиях, если при этом не меняется значение в текстовом поле, т.е. нажатия клавиш <kbd>⇦</kbd>, <kbd>⇨</kbd> и подобных при фокусе на текстовом поле не вызовут это событие.

!!! info "Нельзя ничего предотвратить в `oninput`"

    Событие `input` происходит после изменения значения.

    Поэтому мы не можем использовать `event.preventDefault()` там – будет уже слишком поздно, никакого эффекта не будет.

#### События: cut, copy, paste
Эти события происходят при вырезании/копировании/вставке данных.

Они относятся к классу [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) и обеспечивают доступ к копируемым/вставляемым данным.

Мы также можем использовать `event.preventDefault()` для предотвращения действия по умолчанию, и в итоге ничего не скопируется/не вставится.

Например, код, приведённый ниже, предотвращает все подобные события и показывает, что мы пытаемся вырезать/копировать/вставить:
```html
<input type="text" id="input">
<script>
  const input = document.getElementById('input');

  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false; // или event.preventDefault()
  };
</script>

```

<input type="text" id="input">

![Cut copy paste](../img/cut-copy-paste.png)

Технически, мы можем скопировать/вставить всё. Например, мы можем скопировать файл из файловой системы и вставить его.

Существует список методов [в спецификации](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) для работы с различными типами данных, чтения/записи в буфер обмена.

Но обратите внимание, что буфер обмена работает глобально, на уровне ОС. Большинство браузеров в целях безопасности разрешают доступ на чтение/запись в буфер обмена только в рамках определённых действий пользователя, к примеру, в обработчиках событий `onclick`:

✅ Разрешено в обработчиках пользовательских событий:
   - `onclick`, `onkeydown`, `onmousedown`, `onpaste`, `oncut`, `oncopy`

❌ Запрещено:
   - `setTimeout`, `setInterval`
   - `dispatchEvent('paste')` ← не сработает
   - `iframe` без `permissions-policy`

Также запрещается генерировать «пользовательские» события буфера обмена при помощи `dispatchEvent` во всех браузерах, кроме Firefox.

##### Практические примеры
*Современный способ работы с буфером обмена (async Clipboard API)*:
```js
// Чтение из буфера (требует user gesture)
async function readClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log('Скопировано:', text);
  } catch(err) {
    console.error('Ошибка чтения:', err);
  }
}

// Запись в буфер
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Скопировано в буфер');
  } catch(err) {
    console.error('Ошибка записи:', err);
  }
}
```

*Работа с файлами через `paste`*:
```js
input.onpaste = function(event) {
  const items = event.clipboardData.items;
  for(let item of items) {
    if(item.kind === 'file') {
      const file = item.getAsFile();
      console.log('Вставлен файл:', file.name);
      // Можно загрузить файл
    }
  }
};
```

*Копирование в один клик*:
```js
button.onclick = () => {
  navigator.clipboard.writeText('Скопированный текст')
    .then(() => showToast('Скопировано!'));
};
```

*Предотвращение копирования конфиденциальных данных*:
```js
confidentialField.oncopy = (e) => {
  e.preventDefault();
  showWarning('Копирование запрещено');
};
```

*Валидация вставляемых данных*:
```js
input.onpaste = (e) => {
  const pastedText = e.clipboardData.getData('text');
  if(!isValidFormat(pastedText)) {
    e.preventDefault();
    showError('Неверный формат');
  }
};
```

*Permissions Policy для `iframe`*:
```html
<iframe src="..."
        allow="clipboard-read; clipboard-write">
</iframe>
```

**Вывод**: События буфера обмена — мощный инструмент для UX, но требуют осторожности из-за глобального доступа к ОС. Всегда проверяйте `user gesture` и используйте async Clipboard API для современных приложений.

##### Проверка user gesture

<dfn title="проверка user gesture">Проверка user gesture</dfn> (жеста пользователя) — это механизм безопасности браузеров, который гарантирует, что доступ к чувствительным функциям (буфер обмена, уведомления, полноэкранный режим, автопроигрывание) возможен только из прямого действия пользователя.

Что считается user gesture?

✅ Разрешённые события (активны ~100-300мс после срабатывания):
- `click`, `mousedown`, `mouseup`,
- `keydown`, `keypress`, `keyup`,
- `touchstart`, `touchend`,
- `pointerdown`, `pointerup`

❌ Запрещённые (асинхронный контекст):
- `setTimeout(() => navigator.clipboard.writeText('text'), 0);` // ❌ Ошибка`
- `setInterval(callback, 1000);`                                // ❌
- `requestAnimationFrame(callback);`                            // ❌
- `fetch('/api').then(() => copyToClipboard());`                // ❌
- `new Event('click').dispatchEvent();`                         // ❌

*Практический пример с буфером обмена*:
```js
// ✅ Работает — в обработчике клика
button.onclick = async () => {
  await navigator.clipboard.writeText('Скопировано!');
  console.log('✅ User gesture OK');
};

// ❌ Не работает — через setTimeout
button.onclick = () => {
  setTimeout(async () => {
    await navigator.clipboard.writeText('Скопировано!');
    // Ошибка: DOMException: Document is not focused
  }, 0);
};
```

Как проверить наличие user gesture?
```js
// Современный способ (Chrome 92+)
if (navigator.permissions) {
  navigator.permissions.query({ name: 'clipboard-write' })
    .then(permission => {
      if (permission.state === 'granted') {
        // Можно писать в буфер без gesture
      }
    });
}

// Простой тест через попытку
async function testClipboard() {
  try {
    await navigator.clipboard.writeText('test');
    console.log('✅ User gesture присутствует');
  } catch(e) {
    console.log('❌ Требуется user gesture');
  }
}
```

*Типичные сценарии использования*

| Сценарий                        | Требует user gesture | Пример                 |
| ------------------------------- | -------------------- | ---------------------- |
| `navigator.clipboard.writeText()` | ✅ Да                 | Копирование в 1 клик   |
| `navigator.clipboard.readText()`  | ✅ Да                 | Вставка из буфера      |
| `Notification()`                  | ✅ Да                 | Push-уведомления       |
| `element.requestFullscreen()`     | ✅ Да                 | Полноэкранный режим    |
| `HTMLMediaElement.play()`         | ✅ Да                 | Автопроигрывание видео |
| `window.open()`                   | ✅ Да (popup)         | Новые окна             |

*Обход ограничений (правильный подход)*:
```js
// 1. Сохраняем gesture и используем сразу
button.onclick = async () => {
  await copyToClipboard('текст');  // ✅ В том же стеке вызовов
};

// 2. Показываем кнопку "Скопировать"
function showCopyButton() {
  copyBtn.style.display = 'block';
  copyBtn.focus(); // Подготавливаем gesture
}

copyBtn.onclick = () => navigator.clipboard.writeText(text);
```

**Вывод**: User gesture — защита от злоупотреблений API браузера. Всегда привязывайте чувствительные операции к пользовательским событиям и не полагайтесь на асинхронные вызовы.

#### Итого
События изменения данных:

| Событие        | Описание                                   | Особенности                                                                                                      |
| -------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `change`         | Значение было изменено.                    | Для текстовых полей срабатывает при потере фокуса.                                                               |
| `input`          | Срабатывает при каждом изменении значения. | Запускается немедленно, в отличие от `change`.                                                                     |
| `cut`/`copy`/`paste` | Действия по вырезанию/копированию/вставке. | Действие можно предотвратить. Свойство `event.clipboardData` предоставляет доступ на чтение/запись в буфер обмена… |

#### Задачи

##### Депозитный калькулятор
Создайте интерфейс, позволяющий ввести сумму банковского вклада и процент, а затем рассчитать, какая это будет сумма через заданный промежуток времени.

Демо-версия:

![Deposit calculator](../img/deposit-calculator.png)

Любое изменение введённых данных должно быть обработано немедленно.

Формула:
```js
// initial: начальная сумма денег
// interest: проценты, например, 0.05 означает 5% в год
// years: сколько лет ждать
let result = Math.round(initial * (1 + interest) ** years);
```

<details>
<summary>Решение</summary>

[Код решения](../src/13_forms/deposit-calculator.html)

</details>

### Отправка формы: событие и метод submit
При отправке формы срабатывает событие `submit`, оно обычно используется для проверки (валидации) формы перед её отправкой на сервер или для предотвращения отправки и обработки её с помощью JavaScript.

Метод `form.submit()` позволяет инициировать отправку формы из JavaScript. Мы можем использовать его для динамического создания и отправки наших собственных форм на сервер.

Давайте посмотрим на них подробнее.[^forms-submit]

#### Событие: submit
Есть два основных способа отправить форму:

1. Первый – нажать кнопку `<input type="submit"> или <input type="image">`.
2. Второй – нажать <kbd>Enter⏎</kbd>, находясь на каком-нибудь поле.

Оба действия сгенерируют событие `submit` на форме. Обработчик может проверить данные, и если есть ошибки, показать их и вызвать `event.preventDefault()`, тогда форма не будет отправлена на сервер.

В примере ниже:

1. Перейдите в текстовое поле и нажмите <kbd>Enter⏎</kbd>.
2. Нажмите `<input type="submit">`.

Оба действия показывают `alert` и форма не отправится благодаря `return false`:
```html
<form onsubmit="alert('submit!');return false">
  Первый пример: нажмите Enter: <input type="text" value="Текст"><br>
  Второй пример: нажмите на кнопку "Отправить": <input type="submit" value="Отправить">
</form>
```

<form onsubmit="alert('submit!');return false">
  Первый пример: нажмите Enter: <input type="text" value="Текст"><br>
  Второй пример: нажмите на кнопку "Отправить": <input type="submit" value="Отправить">
</form>

![Submit](../img/submit_1.png)

!!! info "Взаимосвязь между `submit` и `click`"
    При отправке формы по нажатию <kbd>Enter⏎</kbd> в текстовом поле, генерируется событие `click` на кнопке `<input type="submit">`.

    Это довольно забавно, учитывая что никакого клика не было.

    Пример:
    ```html
    <form onsubmit="alert('submit!');return false">
    <input type="text" size="30" value="Установите фокус здесь и нажмите Enter">
    <input type="submit" value="Отправить" onclick="alert('click')">
    </form>
    ```

    <form onsubmit="alert('submit!');return false">
    <input type="text" size="30" value="Установите фокус здесь и нажмите Enter">
    <input type="submit" value="Отправить" onclick="alert('click')">
    </form>

    ![Submit](../img/submit_2.png)

#### Метод: submit
Чтобы отправить форму на сервер вручную, мы можем вызвать метод `form.submit()`.

При этом событие `submit` не генерируется. Предполагается, что если программист вызывает метод `form.submit()`, то он уже выполнил всю соответствующую обработку.

Иногда это используют для генерации формы и отправки её вручную, например так:
```js
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// перед отправкой формы, её нужно вставить в документ
document.body.append(form);

form.submit();
```

#### Задачи

##### Модальное диалоговое окно с формой

Создайте функцию `showPrompt(html, callback)`, которая выводит форму с сообщением (`html`), полем ввода и кнопками `OK/ОТМЕНА`.

- Пользователь должен ввести что-то в текстовое поле и нажать <kbd>Enter⏎</kbd> или кнопку «OK», после чего должна вызываться функция `callback(value)` со значением поля.
- Если пользователь нажимает <kbd>Esc</kbd> или кнопку «ОТМЕНА», тогда вызывается `callback(null)`.

В обоих случаях нужно завершить процесс ввода и закрыть диалоговое окно с формой.

Требования:

- Форма должна быть в центре окна.
- Форма является *модальным окном*, это значит, что никакое взаимодействие с остальной частью страницы невозможно, пока пользователь не закроет его.
- При показе формы, фокус должен находиться сразу внутри `<input>`.
- Клавиши <kbd>Tab⭾</kbd>/<kbd>Shift⇧</kbd>+<kbd>Tab⭾</kbd> должны переключать фокус между полями формы, не позволяя ему переходить к другим элементам страницы.

Пример использования:
```js
showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
  alert(value);
});
```

Демо во фрейме:

![Form modal](../img/form-modal.png)

P.S. HTML/CSS исходного кода к этой задаче содержит форму с фиксированным позиционированием, но вы должны сделать её модальной.

<details>
<summary>Решение</summary>

Модальное окно может быть реализовано с помощью полупрозрачного `<div id="cover-div">`, который полностью перекрывает всё окно:
```css
#cover-div {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.3;
}
```

Так как он перекрывает вообще всё, все клики будут именно по этому `<div>`.

Также возможно предотвратить прокрутку страницы, установив `body.style.overflowY='hidden'`.

Форма должна быть не внутри `<div>`, а после него, чтобы она не унаследовала полупрозрачность (`opacity`).

</details>

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

### Управление валидацией форм

#### Методы валидации
В прошлой теме было рассмотрено, как получить состояние с помощью свойств **Constraint Validation API**. Но в дополнение к свойствам **Constraint Validation API** предоставляет ряд методов, которые позволяют управлять валидацией:

- **`checkValidity()`**: проверяет, проходит ли элемент формы или вся форма валидацию. Этот метод можно вызвать как для формы, так и для отдельных ее элементов. Элемент формы является валидным, если он удовлетворяет всем атрибутам валидации. Форма является валидной, если все ее элементы проходят валидацию. Если форма или ее элементы проходят валидацию, то возвращается `true`, иначе возвращается `false`

- **`reportValidity()`**: также проверяет, проходит ли элемент формы или вся форма валидацию. Однако в отличие от `checkValidity()` этот метод также отображает ошибки валидации. Этот метод также можно вызвать как для формы, так и для отдельных ее элементов.

- **`setCustomValidity()`**: этот метод позволяет настроить сообщения валидации

Например, проверка валидности формы и ее элементов с помощью `checkValidity()`:
```html
<form id="registerForm" name="registerForm" method="post" action="register">
<p>
    <label for="username">Username:</label><br>
    <input id="username" name="username" maxlength="20" minlength="3" required>
</p>
<p>
    <label for="age">Age:</label><br>
    <input type="number" id="age" name="age" min="1" max="110" required>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const registerForm = document.registerForm;
const submit = registerForm.submit;
submit.addEventListener("click", validate);

function validate(){
    if(!registerForm.username.checkValidity()){
        console.log("Username is not valid");
    }
    if(!registerForm.age.checkValidity()){
        console.log("Age is not valid");
    }
    if(!registerForm.checkValidity()){
        console.log("Form data is not valid");
    }
}
</script>
```

Для элементов вызов этого метода аналогичен проверке валидности с помощью свойства `validity.valid`:
```js
function validate(){
    if(!registerForm.username.validity.valid){
        console.log("Username is not valid");
    }
    if(!registerForm.age.validity.valid){
        console.log("Age is not valid");
    }
    if(!registerForm.checkValidity()){
        console.log("Form data is not valid");
    }
}
```

#### Настройка собственных сообщений валидации
Для настройки своих сообщений валидации в метод **`setCustomValidity()`** передается необходимое сообщение:
```html
<form id="registerForm" name="registerForm">
<p>
    <label for="username">Username:</label><br>
    <input id="username" name="username" maxlength="20" minlength="3" required>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const registerForm = document.registerForm;
const submit = registerForm.submit;
submit.addEventListener("click", validate);
 
function validate(){
    if(registerForm.username.validity.valueMissing){
        registerForm.username.setCustomValidity("Необходимо ввести имя пользователя");
    }
    if(registerForm.username.validity.tooLong){
        registerForm.username.setCustomValidity("Имя пользователя не должно превышать 20 символов");
    }
    if(registerForm.username.validity.tooShort){
        registerForm.username.setCustomValidity("Имя пользователя не должно быть меньше 3 символов");
    }
}
</script>
```

Здесь при отправке формы проверяем значение поля `username`. В зависимости от того, какое правило валидации не соблюдается, устанавливаем соответствующее сообщение об ошибке. И браузер также будет использовать эти сообщения:

![Установка ошибок валидации в JavaScript](../img/validation4.png)

#### Определение своих правил валидации
При валидации мы не ограничены встроенными правилами валидации, которые применяются к элементу формы с помощью атрибутов `required`, `minlength`, `maxlength`, `min`, `max`, либо в зависимости от типа поля ввода. При необходимости мы можем задавать свою логику валидации для кастомных сценарией. Например, возьмем простейший пример: имя пользователя у нас не должно быть равно "admin". Для этого определим следующую программу:
```html
<form id="registerForm" name="registerForm">
<p>
    <label for="username">Username:</label><br>
    <input id="username" name="username" maxlength="20" minlength="3" required>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const usernameField = document.registerForm.username;
const submit = registerForm.submit;
submit.addEventListener("click", validate);

function validate(){
    if(usernameField.value === "admin"){
        usernameField.setCustomValidity("Недопустимое имя пользователя");
    }
}
</script>
```

В функции `validate` проверяем значение поля `usernameField`. Если оно равно "admin", то устанавливаем сообщение об ошибке.[^10.7]

![Кастомная логика валидации в JavaScript](../img/validation5.png)

Поскольку мы установили сообщение об ошибке, то поле `username` уже не проходит валидацию, даже если оно соответствует атрибутам `required`, `maxlength` и `minlength`. Соотвественно далее мы можем получить это сообщение через свойство `validationMessage`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
    <style>
    input {width: 150px;}
    input:invalid {border-color: red; }
    input:valid { border-color: green;}
    #usernameErrors {padding:5px;background-color: #ffcccc; color:#b33939; display:none;}
    </style>
</head>
<body>
<form id="registerForm" name="registerForm">
<p>
    <label for="username">Username:</label><br>
    <input id="username" name="username" maxlength="20" minlength="3" required>
    <div id="usernameErrors"></div>
</p>
<button type="submit" id="submit" name="submit">Register</button>
</form>
<script>
const usernameErrors = document.getElementById("usernameErrors");
const usernameField = document.registerForm.username;
const submit = registerForm.submit;
submit.addEventListener("click", validate);

function validate(e){
    if(usernameField.value === "admin"){
        usernameField.setCustomValidity("Недопустимое имя пользователя");
    }
    // проверяем на валидацию
    if(!usernameField.validity.valid){
        usernameErrors.textContent = usernameField.validationMessage;
        usernameErrors.style.display = "block";
    }
    else{
        usernameErrors.textContent = "";
        usernameErrors.style.display = "none";
        e.preventDefault(); // предупреждаем отправку форму и перезагрузку страницы
    }
}
</script>
</body>
</html>
```

![Кастомная логика валидации HTML5 в JavaScript](../img/validation6.png)

### Selection и Range
В этой главе мы рассмотрим выделение как в документе, так и в полях формы, таких как `<input>`.

JavaScript позволяет получать существующее выделение, выделять и снимать выделение как целиком, так и по частям, убирать выделенную часть из документа, оборачивать её в тег и так далее.

Вы можете получить готовые решения в секции «Итого» в конце статьи, но узнаете гораздо больше, если прочитаете главу целиком. Используемые для выделения встроенные классы `Range` и `Selection` просты для понимания, и после их изучения вам уже не понадобятся «готовые рецепты», чтобы сделать всё, что захотите.[^selection-range]

#### Range
В основе выделения лежит [`Range`](https://dom.spec.whatwg.org/#ranges) – диапазон. Он представляет собой пару «граничных точек»: начало и конец диапазона.

Каждая точка представлена как родительский DOM-узел с относительным смещением от начала. Если этот узел – DOM-элемент, то смещение – это номер дочернего элемента, а для текстового узла смещение – позиция в тексте. Скоро будут примеры.

Давайте что-нибудь выделим.

Для начала мы создадим диапазон (конструктор не имеет параметров):
```js
let range = new Range();
```

Затем мы установим границы выделения, используя `range.setStart(node, offset)` и `range.setEnd(node, offset)`.

Например, рассмотрим этот фрагмент HTML-кода:
```js
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Взглянем на его DOM-структуру, обратите внимание на текстовые узлы, они важны для нас:

![Selection range](../img/selection-range.png)

Выделим `"Example: <i>italic</i>"`. Это первые два дочерних узла тега `<p>` (учитывая текстовые узлы):

![Range example](../svg/range-example-p-0-1.svg)

```js
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);

  // toString, вызванный у экземпляра Range, возвращает его содержимое в виде текста (без тегов)
  alert(range); // Example: italic

  // применим этот диапазон к выделению документа (объясняется далее)
  document.getSelection().addRange(range);
</script>
```

- `range.setStart(p, 0)` – устанавливает начало диапазона на нулевом дочернем элементе тега `<p>` (Это текстовый узел `"Example: "`).
- `range.setEnd(p, 2)` – расширяет диапазон до 2го (но не включая его) дочернего элемента тега `<p>` (это текстовый узел `" and "`, но так как конец не включён, последний включённый узел – это тег `<i>`).

Ниже представлен расширенный пример, в котором вы можете попробовать другие варианты:
```js
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);

    // применим выделение, объясняется далее
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

![Range example](../img/range-example.png)

К примеру, выделение с `1` до `4` возвращает следующий диапазон `<i>italic</i> and <b>bold</b>`.

![Range example](../svg/range-example-p-1-3.svg)

Не обязательно использовать один и тот же элемент в `setStart` и `setEnd`. Диапазон может охватывать множество не связанных между собой элементов. Важно лишь чтобы конец шёл после начала.

### Практическая работа. Динамическое создание элементов форм

#### Задание

Добавить пункт к выпадающему списку.

Имеется `<select>`:
```html
<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>
```

Используя JavaScript:

1. Вывести значение и текст выбранного пункта.
2. Добавить пункт: `<option value="classic">Классика</option>`.
3. Сделать его выбранным.

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

### Практическая работа. Создание редактируемых элементов

#### Задание
Выполнить ряд задач, представленных ниже.

1. **Редактируемый `div`**

      Создать `<div>`, который превращается в `<textarea>`, если на него кликнуть.

      - `<textarea>` позволяет редактировать HTML в элементе `<div>`.

      - Когда пользователь нажимает <kbd>Enter⏎</kbd> или переводит фокус, `<textarea>` превращается обратно в `<div>`, и его содержимое становится HTML-кодом в `<div>`.

      ![Div-textarea](../img/div-textarea_1.png)

      ![Div-textarea](../img/div-textarea_2.png)

      <details>
      <summary>Решение</summary>

      [Код решения](../src/13_forms/editable-div/index.html)

      </details>

2. **Редактируемая ячейка таблицы**

    Сделать ячейки таблицы редактируемыми по клику.

    - По клику – ячейка должна стать «редактируемой» (`textarea` появляется внутри), мы можем изменять HTML. Изменение размера ячейки должно быть отключено.
    - Кнопки OK и ОТМЕНА появляются ниже ячейки и, соответственно, завершают/отменяют редактирование.
    - Только одну ячейку можно редактировать за один раз. Пока `<td>` в «режиме редактирования», клики по другим ячейкам игнорируются.
    - Таблица может иметь множество ячеек. Используйте делегирование событий.

    Демо:

    ![Editable TD](../img/editable-td_1.png)

    ![Editable TD](../img/editable-td_2.png)

    <details>
    <summary>Решение</summary>

    1. По клику – заменить `innerHTML` ячейки на `<textarea>` с теми же размерами и без рамки. Можно использовать JavaScript или CSS, чтобы установить правильный размер.
    2. Присвоить `textarea.value` значение `td.innerHTML`.
    3. Установить фокус на текстовую область.
    4. Показать кнопки ОК/ОТМЕНА под ячейкой, обрабатывать клики по ним.

    [Код решения](../src/13_forms/editable-td/index.html)

    </details>

Ответ на задания предоставить в виде файлов исходного кода.

### Практическая работа. Создание депозитного калькулятора

#### Задание

Создать интерфейс, позволяющий ввести сумму банковского вклада и процент, а затем рассчитать, какая это будет сумма через заданный промежуток времени.

Демо-версия:

![Deposit calculator](../img/deposit-calculator.png)

Любое изменение введённых данных должно быть обработано немедленно.

Формула:
```js
// initial: начальная сумма денег
// interest: проценты, например, 0.05 означает 5% в год
// years: сколько лет ждать
let result = Math.round(initial * (1 + interest) ** years);
```

<details>
<summary>Решение</summary>

[Код решения](../src/13_forms/deposit-calculator.html)

</details>

Ответ на задание предоставить в виде файлов исходного кода.

### Практическая работа. Реализация альтернативных механизмов замены изображения пользователя

#### Задание
Реализовать добавление и замену изображения профиля пользователя на странице пользовательских установок с помощью перетаскивания пользовательского файла изображения.

- Использовать Drag & drop API для перетаскивания файла на зону приема с визуальной обратной связью.
- Реализовать альтернативный способ загрузки изображения (например, клик на области приема файла)
- Обеспечить предпросмотр изображения в реальном времени.
- Гарантировать валидацию типов и размера файлов для приема только изображений, не превышающих 5 МБ.
- Сохранение изображения осуществлять в `localStorage`.

Результат представить в виде файлов исходного кода.

### Глоссарий
CSRF (Cross-Site Request Forgery, «Межсайтовая подделка запроса»)
: атака, вынуждающая авторизованного пользователя выполнить нежелательные действия (перевод денег, смена пароля) на другом сайте без его ведома. Злоумышленник использует доверие сайта к браузеру жертвы, который автоматически отправляет cookies с запросом.

Проверка user gesture (жеста пользователя)
: механизм безопасности браузеров, который гарантирует, что доступ к чувствительным функциям (буфер обмена, уведомления, полноэкранный режим, автопроигрывание) возможен только из прямого действия пользователя.

Радиокнопки (*radio buttons*)
: группа кнопок, из которых мы можем выбрать только одну. Радиокнопки создаются элементом `<input type="radio">`.

Флажок (*checkbox*)
: поле, в которое можно поставить отметки и которое создается с помощью элемента `<input type="checkbox">`. Отличительную особенность флажка составляет свойство **`checked`**, которое в отмеченном состоянии принимает значение `true`.

### Источники информации
[^10.1]: [Формы и их элементы](https://metanit.com/web/javascript/10.1.php)
[^10.2]: [Кнопки](https://metanit.com/web/javascript/10.2.php)
[^10.3]: [Текстовые поля](https://metanit.com/web/javascript/10.3.php)
[^10.4]: [Флажки и радиокнопки](https://metanit.com/web/javascript/10.4.php)
[^10.5]: [Список select](https://metanit.com/web/javascript/10.5.php)
[^form-elements]: [Свойства и методы формы](https://learn.javascript.ru/form-elements)
[^10.6]: [Validation API. Валидация элементов формы](https://metanit.com/web/javascript/10.6.php)
[^10.7]: [Управление валидацией форм](https://metanit.com/web/javascript/10.7.php)
[^focus-blur]: [Фокусировка: focus/blur](https://learn.javascript.ru/focus-blur)
[^events-change-input]: [События: change, input, cut, copy, paste](https://learn.javascript.ru/events-change-input)
[^forms-submit]: [Отправка формы: событие и метод submit](https://learn.javascript.ru/forms-submit)
[^selection-range]: [Selection и Range](https://learn.javascript.ru/selection-range)
