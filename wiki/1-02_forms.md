<link href="../styles.css" rel="stylesheet" />

## Формы

- [Формы](#формы)
  - [Работа с формами](#работа-с-формами)
    - [Автодополнение](#автодополнение)
  - [Элементы форм](#элементы-форм)
    - [Атрибуты name и value](#атрибуты-name-и-value)
  - [Кнопки](#кнопки)
  - [Текстовые поля](#текстовые-поля)
      - [Направление текста](#направление-текста)
    - [Поле поиска](#поле-поиска)
    - [Поле ввода пароля](#поле-ввода-пароля)
  - [Метки и автофокус](#метки-и-автофокус)
  - [Элементы для ввода чисел](#элементы-для-ввода-чисел)
    - [Простое числовое поле](#простое-числовое-поле)
    - [Ползунок](#ползунок)
  - [Флажки и переключатели](#флажки-и-переключатели)
    - [Флажок](#флажок)
    - [Переключатели](#переключатели)
  - [Элементы для ввода цвета, url, email, телефона](#элементы-для-ввода-цвета-url-email-телефона)
    - [Установка цвета](#установка-цвета)
    - [Поля для ввода url, email, телефона](#поля-для-ввода-url-email-телефона)
  - [Элементы для ввода даты и времени](#элементы-для-ввода-даты-и-времени)
  - [Отправка файлов](#отправка-файлов)
  - [Список select](#список-select)
  - [Textarea](#textarea)
  - [Источники информации](#источники-информации)

### Работа с формами

Формы в html представляют один из способов для ввода и отправки данных. Все поля формы помещаются между тегами **`<form>`** и **`</form>`**. Например, создадим простейшую форму:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Формы в HTML5</title>
    </head>
    <body>
        <form method="post" action="http://localhost:8080/login.php">
            <input name="login"/>
            <input type="submit" value="Войти" />
        </form>
    </body>
</html>
```

![Формы в HTML5](../img/697641c463e4ad8e0adf49c1-2.1.png)

Для настройки форм у элемента `form` определены следующие атрибуты:

- `method`: устанавливает метод отправки данных на сервер. Допустимы два значения: `post` и `get`.

    Значение `post` позволяет передать данные на веб-сервер через специальные заголовки. А значение `get` позволяет передать данные через строку запроса.

- `action`: устанавливает адрес, на который передаются данные формы

- `enctype`: устанавливает тип передаваемых данных. Он свою очередь может принимать следующие значения:

  - `application/x-www-form-urlencoded`: кодировка отправляемых данных по умолчанию

  - `multipart/form-data`: эта кодировка применяется при отправке файлов

  - `text/plain`: эта кодировка применяется при отправке простой текстовой информации

В выше использованном примере:
```html
<form method="post" action="http://localhost:8080/login.php">
    <input name="login"/>
    <input type="submit" value="Войти" />
</form>
```

у формы установлен метод "post", то есть все значения формы отправляются в теле запроса, а адресом служит строка http://localhost:8080/login.php. Адрес здесь указан случайным образом.

Как правило, по указанному адресу работает веб-сервер, который, используя одну из технологий серверной стороны (PHP, NodeJS, ASP.NET и т.д.), может получать запросы и возвращать ответ. В данном же случае мы не будем акцентировать внимание на технологиях серверной стороны, сосредоточимся лишь на тех средствах HTML, которые позволяют отправлять данные на сервер.

#### Автодополнение
Часто веб-браузеры запоминают вводимые данные, и при вводе браузеры могут выдавать список подсказок из ранее введенных слов:

![Autocomplete в HTML5](../img/697641c463e4ad8e0adf49c1-2.2.png)

Это может быть не всегда удобно, и с помощью атрибута **`autocomplete`** можно отключить автодополнение:
```html
<form method="post" autocomplete="off" action="http://localhost:8080/login.php">
    <input name="login" />
    <input name="password" />
    <input type="submit" value="Войти" />
</form>
```

Если нам надо включить автодополнение только для каких-то определенных полей, то мы можем применить к ним атрибут `autocomplete="on"`:
```html
<form method="post" autocomplete="off" action="http://localhost:8080/login.php">
    <input name="login" />
    <input name="password" autocomplete="on" />
    <input type="submit" value="Войти" />
</form>
```

Теперь для всей формы, кроме второго поля, будет отключено автодополнение.[^3.1]


### Элементы форм
[697650e663e4ad8e0adf49c3](https://metanit.com/web/html5/3.2.php)

Формы состоят из определенного количества элементов ввода. Все элементы ввода помещаются между тегами `<form>` и `</form>`.

Наиболее распространенным элементом ввода является элемент **`input`**. Однако реальное действие этого элемента зависит от того, какое значение установлено у его атрибута **`type`**. А он может принимать следующие значения:

- **`text`**: обычное текстовое поле

- **`password`**: тоже текстовое поле, только вместо вводимых символов отображаются звездочки, поэтому в основном используется для ввода пароля

- **`radio`**: радиокнопка или переключатель. Из группы радиокнопок можно выбрать только одну

- **`checkbox`**: элемент флажок, который может находиться в отмеченном или неотмеченом состоянии

- **`hidden`**: скрытое поле

- **`submit`**: кнопка отправки формы

- **`color`**: поле для ввода цвета

- **`date`**: поле для ввода даты

- **`datetime`**: поле для ввода даты и времени с учетом часового пояса

- **`datetime-local`**: поле для ввода даты и времени без учета часового пояса

- **`email`**: поле для ввода адреса электронной почты

- **`month`**: поле для ввода года и месяца

- **`number`**: поле для ввода чисел

- **`range`**: ползунок для выбора числа из некоторого диапазона

- **`tel`**: поле для ввода телефона

- **`time`**: поле для ввода времени

- **`week`**: поле для ввода года и недели

- **`url`**: поле для ввода адреса `url`

- **`file`**: поле для выбора отправляемого файла

- **`image`**: создает кнопку в виде картинки

Кроме элемента `input` в различных модификациях есть еще небольшой набор элементов, которые также можно использовать на форме:

- **`button`**: создает кнопку

- **`select`**: выпадающий список

- **`label`**: создает метку, которая отображается рядом с полем ввода

- **`textarea`**: многострочное текстовое поле

#### Атрибуты name и value
У всех элементов ввода можно установить атрибуты `name` и `value`. Эти атрибуты имеют важное значение. По атрибуту `name` мы можем идентифицировать поле ввода, а атрибут `value` позволяет установить значение поля ввода. Например:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Формы в HTML5</title>
    </head>
    <body>
        <form method="get" action="index.html">
            <input type="text" name="login" value="Tom"/>
            <input type="password" name="password"/>
            <input type="submit" value="Войти" />
        </form>
    </body>
</html>
```

Здесь текстовое поле имеет значение "Tom" (как указано в атрибуте `value`), поэтому при загрузке веб-страницы в этом поле мы увидим данный текст.

![Ввод в форму в HTML5](./img/697650e663e4ad8e0adf49c3-2.3.png)

Поскольку методом отправки данных формы является метод "get", то данные будут отправляться через строку запроса. Так как нам в данном случае не важно, как данные будут приниматься, не важен сервер, который получает данные, поэтому в качестве адреса я установил ту же самую страницу — то есть файл *index.html*. И при отправке мы сможем увидеть введенные данные в строке запроса:

![Ввод в форму в HTML5](./img/697650e663e4ad8e0adf49c3-2.4.png)

В строке запроса нас интересует следующий кусочек:
```
login=Tom&password=qwerty
```

При отправке формы браузер соединяет все данные в набор пар "ключ-значение". В нашем случае две таких пары: `login=Tom` и `password=qwerty`. Ключом в этих парах выступает название поля ввода, которое определяется атрибутом `name`, а значением — собственно то значение, которое введено в поле ввода (или значение атрибута `value`).

Получив эти данные, сервер легко может узнать, какие значения в какие поля ввода были введены пользователем.

### Кнопки
[697f33b963e4ad8e0adf49cf](https://metanit.com/web/html5/3.3.php)

Кнопки представлены элементом **`button`**. Они обладают широкими возможностями по конфигурации. Так, в зависимости от значения атрибута `type` мы можем создать различные типы кнопок:

- `submit`: кнопка, используемая для отправки формы

- `reset`: кнопка сброса значений формы

- `button`: кнопка без какого-либо специального назначения

Если кнопка используется для отправки формы, то есть у нее установлен атрибут `type="submit"`, то мы можем задать у нее ряд дополнительных атрибутов:

- `form`: определяет форму, за которой закреплена кнопка отправки

- `formaction`: устанавливает адрес, на который отправляется форма. Если у элемента `form` задан атрибут `action`, то он переопределяется

- `formenctype`: устанавливает формат отправки данных. Если у элемента `form` установлен атрибут `enctype`, то он переопределяется

- `formmethod`: устанавливает метод отправки формы (`post` или `get`). Если у элемента `form` установлен атрибут `method`, то он переопределяется

Например, определим на форме кнопку отправки и кнопку сброса:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Формы в HTML5</title>
    </head>
    <body>
        <form>
            <p><input type="text" name="login"/></p>
            <p><input type="password" name="password"/></p>
            <p>
                <button type="submit" formmethod="get" formaction="index.html">Отправить</button>
                <button type="reset">Отмена</button>
            </p>
        </form>
    </body>
</html>
```

![Кнопки в HTML5](./img/697f33b963e4ad8e0adf49cf-2.5.png)

Кроме элемента `button` для создания кнопок можно использовать элемент `input`, у которого атрибут равен `submit` или `reset`. Например:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Формы в HTML5</title>
    </head>
    <body>
        <form>
            <p><input type="text" name="login"/></p>
            <p><input type="password" name="password"/></p>
            <p>
                <input type="submit" value="Отправить" />
                <input type="reset" value="Отмена" />
            </p>
        </form>
    </body>
</html>
```

И еще один элемент `input` с атрибутом `type="image"` позволяет использовать в качестве кнопки изображение:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Форма ввода в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <input type="text" name="search" />
                <input type="image" src="search.png" name="submit" />
            </p>
        </form>
    </body>
</html>
```

![Кнопка-изображение в HTML5](./img/697f33b963e4ad8e0adf49cf-2.22.png)

Кроме наличия изображения в остальном эта кнопка будет аналогична стандартной кнопке отправки `input type="submit"` или `button type="submit"`.

### Текстовые поля
[697f66ad63e4ad8e0adf49d1](https://metanit.com/web/html5/3.4.php)

Однострочное текстовое поле создается с помощью элемента **`input`**, когда его атрибут `type` имеет значение `text`:
```html
<input type="text" name="login" />
```

С помощью ряда дополнительных атрибутов можно настроить текстовое поле:

- **`dir`**: устанавливает направление текста

- **`list`**: устанавливает список подсказок для ввода в поле

- **`maxlength`**: максимально допустимое количество символов в текстовом поле

- **`pattern`**: определяет шаблон, которому должен соответствовать вводимый текст

- **`placeholder`**: устанавливает текст, который по умолчанию отображается в текстовом поле

- **`readonly`**: делает текстовом поле доступным только для чтения

- **`required`**: указывает, что текстовое поле обязательно должно иметь значение

- **`size`**: устанавливает ширину текстового поля в видимых символах

- **`value`**: устанавливает значение по умолчанию в текстовом поле

Применим некоторые атрибуты:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Текстовые поля в HTML5</title>
    </head>
    <body>
        <form>
            <p><input type="text" name="userName" placeholder="Введите имя" size="18" /></p>
            <p><input type="text" name="userPhone" placeholder="Введите номер телефона" size="18" maxlength="11" /></p>
            <p>
                <button type="submit">Отправить</button>
                <button type="reset">Отмена</button>
            </p>
        </form>
    </body>
</html>
```

![Текстовые поля в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.6.png)

В этом примере во втором текстовом поле сразу устанавливаются атрибуты `maxlength` и `size`. При этом `size` — то есть количество символов, которые помещаются в видимое пространство поля больше, чем допустимое количество символов. Однако все равно ввести символов больше, чем `maxlength`, мы не сможем.

В данном случае также важно различать атрибуты `value` и `placeholder`, хотя оба устанавливают видимый текст в поле. Однако `placeholder` устанавливает своего рода подсказку или приглашение к вводу, поэтому он обычно отмечается серым цветом. В то время как значение `value` представляет введенный в поле текст по умолчанию:
```html
<p><input type="text" name="userName" value="Том" /></p>
<p><input type="text" name="userPhone" placeholder="Номер телефона" /></p>
```

![Placeholder в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.7.png)

Атрибуты `readonly` и `disabled` делают текстовое поле недоступным, однако сопровождаются разным визуальным эффектом. В случае с `disabled` текстовое поле затеняется:
```html
<p><input type="text" name="userName" value="Том" readonly /></p>
<p><input type="text" name="userPhone" value="+12345678901" disabled /></p>
```

![Disabled и readonly в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.8.png)

Среди атрибутов текстового поля также следует отметить такой атрибут как **`list`**. Он содержит ссылку на элемент **`datalist`**, который определяет набор значений, появляющихся в виде подсказки при вводе в текстовое поле. Например:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Текстовые поля в HTML5</title>
    </head>
    <body>
        <form>
            <p><input list="phonesList" type="text" name="model" placeholder="Введите модель" /></p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
        <datalist id="phonesList">
            <option value="iPhone 6S" label="54000"/>
            <option value="Lumia 950">35000</option>
            <option value="Nexus 5X"/>
        </datalist>
    </body>
</html>
```

![Datalist в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.9.png)

Атрибут `list` текстового поля указывает на `id` элемента `datalist`. Сам элемент `datalist` с помощью вложенных элементов option определяет элементы списка. И при вводе в текстовое поле этот список отображается в виде подсказки.

##### Направление текста
Атрибут **`dir`** задает направление ввода текста. Он может принимать два значения: **`ltr`** (слева направо) и **`rtl`** (справа налево):
```js
<input type="text" name="username" dir="rtl" />
```

#### Поле поиска
Для создания полей поиска предназначен элемент `input` с атрибутом `type="search"`. Формально он представляет собой простое текстовое поле:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Поиск в HTML5</title>
    </head>
    <body>
    <form>
        <input type="search" name="term" />
        <input type="submit" value="Поиск" />
    </form>
    </body>
</html>
```

![Поиск в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.34.png)

#### Поле ввода пароля
Для ввода пароля используется элемент `input` с атрибутом `type="password"`. Его отличительной чертой является то, что вводимые символы маскируются точками:
```html
<form>
    <p><input type="text" name="login" /></p>
    <p><input type="password" name="password" /></p>
    <input type="submit" value="Авторизация" />
</form>
```

![Ввод пароля в HTML5](./img/697f66ad63e4ad8e0adf49d1-2.35.png)

### Метки и автофокус
[69878e3863e4ad8e0adf49d3](https://metanit.com/web/html5/3.5.php)

Вместе с полями ввода нередко используются метки, которые представлены элементом **`label`**. Метки создают аннотацию или заголовок к полю ввода, указывают, для чего это поле предназначено.

Для связи с полем ввода метка имеет атрибут **`for`**, который указывает на `id` поля ввода:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Label в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="login">Логин: </label>
                <input type="text" id="login" name="login" />
            </p>
            <p>
                <label for="password">Пароль: </label>
                <input type="password" id="password" name="password" />
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

Так, текстовое поле здесь имеет атрибут `id="login"`. Поэтому у связанной с ним метки устанавливается атрибут `for="login"`. Нажатие на эту метку позволяет перевести фокус на текстовое поле для ввода логина:

![Label in HTML5](./img/69878e3863e4ad8e0adf49d3-2.10.png)

Собственно на этом роль меток и заканчивается. Также мы можем установить автофокус по умолчанию на какое-либо поле ввода. Для этого применяется атрибут **`autofocus`**:
```html
<form>
    <p>
        <label for="login">Логин: </label>
        <input type="text" autofocus id="login" name="login" />
    </p>
    <p>
        <label for="password">Пароль: </label>
        <input type="password" id="password" name="password" />
    </p>
    <p>
        <button type="submit">Отправить</button>
    </p>
</form>
```

Здесь при запуске страницы фокус сразу же переходит на текстовое поле.

### Элементы для ввода чисел
[6987945663e4ad8e0adf49d5](https://metanit.com/web/html5/3.6.php)

#### Простое числовое поле
Для ввода чисел используется элемент `input` с атрибутом **`type="number"`**. Он создает числовое поле, которое мы можем настроить с помощью следующих атрибутов:

- `min`: минимально допустимое значение

- `max`: максимально допустимое значение

- `readonly`: доступно только для чтения

- `required`: указывает, что данное поле обязательно должно иметь значение

- `step`: значение, на которое будет увеличиваться число в поле

- `value`: значение по умолчанию

Используем числовое поле:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Числовое поле в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="age">Возраст: </label>
                <input type="number" step="1" min="1" max="100" value="10" id="age" name="age"/>
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

Здесь числовое поле по умолчанию имеет значение 10 (`value="10"`), минимально допустимое значение, которое мы можем ввести, — 1, а максимальное допустимое значение — 100. И атрибут `step="1"` устанавливает, что значение будет увеличиваться на единицу.

В зависимости от браузера визуализация этого поля может отличаться:

![Ввод чисел в HTML5](./img/6987945663e4ad8e0adf49d5-2.11.png)

Но как правило, у большинства современных браузеров, кроме IE 11 и Microsoft Edge, справа в поле ввода имеются стрелки для увеличения/уменьшения значения на величину, указанную в атрибуте step.

Как и в случае с текстовым полем мы можем здесь прикрепить список `datalist` с набором возможных значений:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Числовое поле в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="price">Цена: </label>
                <input type="number" list="priceList"
                    step="1000" min="3000" max="100000" value="10000" id="price" name="price"/>
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
        <datalist id="priceList">
            <option value="15000" />
            <option value="20000" />
            <option value="25000" />
        </datalist>
    </body>
</html>
```

![Ввод чисел из datalist в HTML5](./img/6987945663e4ad8e0adf49d5-2.12.png)

#### Ползунок
Ползунок представляет шкалу, на которой мы можем выбрать одно из значений. Для создания ползунка применяется элемент `input` с атрибутом **`type="range"`**. Во многом ползунок похож на простое поле для ввода чисел. Он также имеет атрибуты `min`, `max`, `step` и `value`:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Ползунок в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="price">Цена:</label>
                1<input type="range" step="1" min="0" max="100" value="10" id="price" name="price"/>100
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

![Ползунок в HTML5](./img/6987945663e4ad8e0adf49d5-2.13.png)

### Флажки и переключатели
[69879b8f63e4ad8e0adf49d7](https://metanit.com/web/html5/3.7.php)

#### Флажок
Флажок представляет элемент, который может находиться в двух состояниях: отмеченном и неотмеченном. Флажок создается с помощью элемента `input` с атрибутом **`type="checkbox"`**:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Чекбокс в HTML5</title>
    </head>
    <body>
        <h2>Изучаемые технологии</h2>
        <form>
            <p>
                <input type="checkbox" checked name="html5"/>HTML5
            </p>
            <p>
                <input type="checkbox" name="dotnet"/>.NET
            </p>
            <p>
                <input type="checkbox" name="java"/>Java
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

![Флажок/чекбокс в HTML5](./img/69879b8f63e4ad8e0adf49d7-2.14.png)

Атрибут **`checked`** позволяет установить флажок в отмеченное состояние.

#### Переключатели
Переключатели или радиокнопки похожи на флажки, они также могут находиться в отмеченном или неотмеченном состоянии. Только для переключателей можно создать одну группу, в которой одновременно можно выбрать только один переключатель. Например:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Радиокнопки в HTML5</title>
    </head>
    <body>
        <form>
            <h2>Укажите пол</h2>
            <p>
                <input type="radio" value="man" checked name="gender"/>мужской
            </p>
            <p>
                <input type="radio" value="woman" name="gender"/>женский
            </p>
            <h2>Выберите технологию</h2>
            <p>
                <input type="radio" value="html5" checked name="tech"/>HTML5
            </p>
            <p>
                <input type="radio" value="net" name="tech"/>.NET
            </p>
            <p>
                <input type="radio" value="java" name="tech"/>Java
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

Для создания радиокнопки надо указать атрибут `type="radio"`. И теперь другой атрибут name указывает не на имя элемента, а на имя группы, к которой принадлежит элемент-радиокнопка. В данном случае у нас две группы радиокнопок: `gender` и `tech`. Из каждой группы мы можем выбрать только один переключатель. Опять же чтобы отметить радиокнопку, у нее устанавливается атрибут `checked`:

![Радиокнопки в HTML5](./img/69879b8f63e4ad8e0adf49d7-2.15.png)

Важное значение играет атрибут `value`, который при отправке формы позволяет серверу определить, какой именно переключатель был отмечен:

![Radio button в HTML5](./img/69879b8f63e4ad8e0adf49d7-2.16.png)

### Элементы для ввода цвета, url, email, телефона
[6987a49263e4ad8e0adf49d9](https://metanit.com/web/html5/3.8.php)

#### Установка цвета
За установку цвета в HTML5 отвечает специальный элемент `input` с типом **`color`**:
```html
<label for="favcolor">Выберите цвет</label>
<input type="color" id="favcolor" name="favcolor" />
```

Элемент отображает выбранный цвет. А при нажатии на него появляется специальное диалоговое окно для установки цвета:

![Элемент установки цвета в HTML5](./img/6987a49263e4ad8e0adf49d9-2.36.png)

Значением этого элемента будет числовой шестнадцатеричный код выбранного цвета.

С помощью элемента `datalist` мы можем задать набор цветов, из который пользователь может выбрать нужный:
```html
<label for="favcolor">Выберите цвет</label>
<input type="color" list="colors" id="favcolor" name="favcolor" />
<datalist id="colors">
    <option value="#0000FF" label="blue">
    <option value="#008000" label="green">
    <option value="#ff0000" label="red">
</datalist>
```

![Выбор цвета в HTML5](./img/6987a49263e4ad8e0adf49d9-2.37.png)

Каждый элемент `option` в `datalist` должен в качестве значения принимать шестнадцатеричный код цвета, например, "#0000FF". После выбора цвета данный числовой код устанавливается в качестве значения в элементе `input`.

#### Поля для ввода url, email, телефона
Ряд полей `input` предназначены для ввода таких данных, как `url`, адреса электронной почты и телефонного номера. Они однотипны и во многом отличаются только тем, что для атрибута `type` принимают соответственно значения `email`, `tel` и `url`.

Для их настройки мы можем использовать те же атрибуты, что и для обычного текстового поля:

- **`maxlength`**: максимально допустимое количество символов в поле

- **`pattern`**: определяет шаблон, которому должен соответствовать вводимый текст

- **`placeholder`**: устанавливает текст, который по умолчанию отображается в поле

- **`readonly`**: делает текстовом поле доступным только для чтения

- **`required`**: указывает, что текстовое поле обязательно должно иметь значение

- **`size`**: устанавливает ширину поля в видимых символах

- **`value`**: устанавливает значение по умолчанию для поля

- **`list`**: устанавливает привязку к элементу `datalist` со списком возможных значений

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Форма ввода в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="email">Email: </label>
                <input type="email" placeholder="user@gmail.com" id="email" name="email"/>
            </p>
            <p>
                <label for="url">URL: </label>
                <input type="url" id="url" name="url"/>
            </p>
            <p>
                <label for="phone">Телефон: </label>
                <input type="tel" placeholder="(XXX)-XXX-XXXX" id="phone" name="phone"/>
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

![Ввод email, url, телефона в HTML5](./img/6987a49263e4ad8e0adf49d9-2.17.png)

Основное преимущество подобных полей ввода перед обычными текстовыми полями состоит в том, что поля ввода для email, url, телефона для проверки ввода используют соответствующий шаблон. Например, если мы введем в какое-либо поле некорректное значение и попробуем отправить форму, то браузер может отобразить нам сообщение о некорректном вводе, а форма не будет отправлена:

![Валидация email в HTML5](./img/6987a49263e4ad8e0adf49d9-2.18.png)

### Элементы для ввода даты и времени
[6987aabc63e4ad8e0adf49db](https://metanit.com/web/html5/3.9.php)

Для работы с датами и временем в HTML5 предназначено несколько типов элементов `input`:

- **`datetime-local`**: устанавливает дату и время

- **`date`**: устанавливает дату

- **`month`**: устанавливает текущий месяц и год

- **`time`**: устанавливает время

- **`week`**: устанавливает текущую неделю

Например, используем поле для установки даты:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Форма ввода в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="firstname">Имя: </label>
                <input type="text" id="firstname" name="firstname"/>
            </p>
            <p>
                <label for="date">Дата рождения: </label>
                <input type="date" id="date" name="date"/>
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

И при вводе в поле для даты будет открываться календарик:

![Установка даты в HTML5](./img/6987aabc63e4ad8e0adf49db-2.19.png)

Правда, здесь надо отметить, что действие этого элемента зависит от браузера. В данном случае используется Google Chrome. В последних версиях Opera элемент не будет сильно отличаться. А вот в Microsoft Edge элемент будет выглядеть так:

![Установка даты в Microsoft Edge](./img/6987aabc63e4ad8e0adf49db-2.20.png)

Применение остальных элементов:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Форма ввода в HTML5</title>
    </head>
    <body>
        <form>
            <p>
                <label for="week">Неделя: </label>
                <input type="week" name="week" id="week" />
            </p>
            <p>
                <label for="localdate">Дата и время: </label>
                <input type="datetime-local" id="localdate" name="date"/>
            </p>
            <p>
                <label for="month">Месяц: </label>
                <input type="month" id="month" name="month"/>
            </p>
            <p>
                <label for="time">Время: </label>
                <input type="time" id="time" name="time"/>
            </p>
            <p>
                <button type="submit">Отправить</button>
            </p>
        </form>
    </body>
</html>
```

![Дата и время в HTML5](./img/6987aabc63e4ad8e0adf49db-2.21.png)

При использовании этих элементов также надо учитывать, что Firefox поддерживает только элементы `date` и `time`, для остальных создаются обычные текстовые поля. А IE11 и вовсе не поддерживают эти элементы.

### Отправка файлов
[6988502463e4ad8e0adf49dd](https://metanit.com/web/html5/3.10.php)

За выбор файлов на форме отвечает элемент `input` с атрибутом **`type="file"`**:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Отправка файлов в HTML5</title>
    </head>
    <body>
        <form enctype="multipart/form-data" method="post" action="http://localhost:8080/postfile.php">
            <p>
                <input type="file" name="file" />
            </p>
            <p>
                <input type="submit" value="Отправить" />
            </p>
        </form>
    </body>
</html>
```

![Выбор файла в HTML5](./img/6988502463e4ad8e0adf49dd-2.23.png)

При нажатии на кнопку "Выберите файл" открывается диалоговое окно для выбора файла. А после выбора рядом с кнопкой отображается имя выбранного файла.

Важно отметить, что для отправки файла на сервер форма должна иметь атрибут `enctype="multipart/form-data"`.

С помощью ряда атрибутов мы можем дополнительно настроить элементы выбора файла:

- **`accept`**: устанавливает тип файл, которые допустимы для выбора

- **`multiple`**: позволяет выбирать множество файлов

- **`required`**: требует обязательной установки файла

Например, множественный выбор файлов:
```html
<form enctype="multipart/form-data" method="post" action="http://localhost:8080/postfile.php">
    <p>
        <input type="file" name="file" multiple />
    </p>
    <p>
        <input type="submit" value="Отправить" />
    </p>
</form>
```

При нажатии на кнопку также открывается диалоговое окно для выбора файлов, только теперь, зажав клавишу <kbd>CTRL</kbd> или <kbd>Shift</kbd>, мы можем выбрать несколько файлов, а после выбора рядом с кнопкой отобразится количество выбранных файлов:

![Множественный выбор файлов в HTML5](./img/6988502463e4ad8e0adf49dd-2.24.png)

### Список select
[698859ca63e4ad8e0adf49df](https://metanit.com/web/html5/3.11.php)

Элемент **`select`** создает список. В зависимости от настроек это может быть выпадающий список для выбора одного элемента, либо раскрытый список, в котором можно выбрать сразу несколько элементов.

Создадим выпадающий список:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Элемент select в HTML5</title>
    </head>
    <body>
        <form method="get">
            <p>
                <label for="phone">Выберите модель:</label>
                <select id="phone" name="phone">
                    <option value="iphone 6s">iPhone 6S</option>
                    <option value="lumia 950">Lumia 950</option>
                    <option value="nexus 5x">Nexus 5X</option>
                    <option value="galaxy s7">Galaxy S7</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Отправить" />
            </p>
        </form>
    </body>
</html>
```

![Выпадающий список в HTML5](./img/698859ca63e4ad8e0adf49df-2.25.png)

Внутрь элемента select помещаются элементы **`option`** — элементы списка. Каждый элемент `option` содержит атрибут `value`, который хранит значение элемента. При этом значение элемента `option` не обязательно должно совпадать с отображаемым им текстом. Например:
```html
<option value="apple">iPhone 6S</option>
```

С помощью атрибута `selected` мы можем установить выбранный по умолчанию элемент — это необязательно должен быть первый элемент в списке:
```html
<select id="phone" name="phone">
    <option value="iphone 6s">iPhone 6S</option>
    <option value="lumia 950">Lumia 950</option>
    <option value="nexus 5x" selected>Nexus 5X</option>
</select>
```

С помощью другого атрибута `disabled` можно запретить выбор определенного элемента. Как правило, элементы с этим атрибутом служат для создания заголовков:
```html
<select id="phone" name="phone">
    <option disabled selected>Выберите модель</option>
    <option value="iphone 6s">iPhone 6S</option>
    <option value="lumia 950">Lumia 950</option>
    <option value="nexus 5x" selected>Nexus 5X</option>
</select>
```

Для создания списка с множественным выбором к элементу `select` надо добавить атрибут **`multiple`**:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Элемент select в HTML5</title>
    </head>
    <body>
        <form method="get">
            <p>
                <label for="phone">Выберите модель:</label> <br/>

                <select multiple id="phone" name="phone">
                    <option value="iphone 6s">iPhone 6S</option>
                    <option value="lumia 950">Lumia 950</option>
                    <option value="nexus 5x">Nexus 5X</option>
                    <option value="galaxy s7">Galaxy S7</option>
                </select>
            </p>
            <p>
                <input type="submit" value="Отправить" />
            </p>
        </form>
    </body>
</html>
```

Зажав клавишу <kbd>Ctrl</kbd>, мы можем выбрать в таком списке несколько элементов:

![multiple select in HTML5](./img/698859ca63e4ad8e0adf49df-2.26.png)

Select также позволяет группировать элементы с помощью тега **`<optgroup>`**:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Элемент select в HTML5</title>
    </head>
    <body>
        <form method="get">
            <p>
                <label for="phone">Выберите модель:</label>

                <select id="phone" name="phone">
                    <optgroup label="Apple">
                        <option value="iphone 6s">iPhone 6S</option>
                        <option value="iphone 6s plus">iPhone 6S Plus</option>
                        <option value="iphone 5se">iPhone 5SE</option>
                    </optgroup>
                    <optgroup label="Microsoft">
                        <option value="lumia 950">Lumia 950</option>
                        <option value="lumia 950 xl">Lumia 950 XL</option>
                        <option value="lumia 650">Lumia 650</option>
                    </optgroup>
                </select>
            </p>
            <p>
                <input type="submit" value="Отправить" />
            </p>
        </form>
    </body>
</html>
```

![optgroup в HTML5](./img/698859ca63e4ad8e0adf49df-2.27.png)

Использование групп элементов применимо как к выпадающему списку, так и к списку со множественным выбором.

### Textarea
[69886c7763e4ad8e0adf49e1](https://metanit.com/web/html5/3.12.php)

Элемент `<input type="text" />` позволяет создавать простое однострочное текстовое поле. Однако возможностей этого элемента по вводу текста бывает недостаточно, и в этой ситуации мы можем использовать многострочное текстовое поле, представленное элементом **`textarea`**:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Textarea в HTML5</title>
    </head>
    <body>
        <form method="get">
            <p>
                <label for="comment">Ваш комментарий:</label><br/>
                <textarea name="comment" id="comment" placeholder="Не более 200 символов" maxlength="200"></textarea>
            </p>
            <p>
                <input type="submit" value="Добавить" />
            </p>
        </form>
    </body>
</html>
```

![Textarea в HTML5](./img/69886c7763e4ad8e0adf49e1-2.28.png)

С помощью дополнительных атрибутов **`cols`** и **`rows`** можно задать соответственно количество столбцов и строк:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Textarea в HTML5</title>
    </head>
    <body>
        <form method="get">
            <p>
                <label for="comment">Ваш комментарий:</label><br/>
                <textarea id="comment" name="comment" placeholder="Написать комментарий"
                    cols="30" rows="7"></textarea>
            </p>
            <p>
                <input type="submit" value="Добавить" />
            </p>
        </form>
    </body>
</html>
```

![Настройка textarea в HTML5](./img/69886c7763e4ad8e0adf49e1-2.29.png)

### Источники информации
[^3.1]: [Формы](https://metanit.com/web/html5/3.1.php)
