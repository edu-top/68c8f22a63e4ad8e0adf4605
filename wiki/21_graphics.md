# Графика

## Canvas API

- [Canvas API](#canvas-api)
  - [Canvas и его контекст. Рисование прямоугольников](#canvas-и-его-контекст-рисование-прямоугольников)
    - [Контекст рендеринга](#контекст-рендеринга)
    - [Рисование прямоугольников](#рисование-прямоугольников)
  - [Настройка рисования](#настройка-рисования)
    - [Толщина линий](#толщина-линий)
    - [setLineDash](#setlinedash)
    - [Тип соединения линий](#тип-соединения-линий)
    - [Прозрачность](#прозрачность)
  - [Фоновые изображения](#фоновые-изображения)
  - [Создание градиента](#создание-градиента)
    - [Линейный градиент](#линейный-градиент)
    - [Радиальный градиент](#радиальный-градиент)
  - [Рисование текста](#рисование-текста)
    - [Свойство textAlign](#свойство-textalign)
    - [Свойство textBaseline](#свойство-textbaseline)
    - [Определение ширины текста](#определение-ширины-текста)
  - [Рисование фигур](#рисование-фигур)
    - [Методы moveTo() и lineTo()](#методы-moveto-и-lineto)
- [JavaScript анимации](#javascript-анимации)
- [JavaScript в CSS](#javascript-в-css)
- [Источники информации](#источники-информации)

### Canvas и его контекст. Рисование прямоугольников
Один из распространенных способов работы с графикой в языке JavaScript представляет **Canvas API**, который предполагает работу с элементом `<canvas>`. Этот элемент представляет собой как бы область рисования, к которой можно получить доступ в коде JavaScript и на которой можно нарисовать различные фигуры, поместить на нее изображения, даже манипулировать видео и прочее. В частности, немало игр на HTML5+JavaScript сделаны именно с помощью Canvas API.

Пример простейшего определения элемента `<canvas>` на веб-странице:
```html
<canvas id="canvas" width="500" height="300"></canvas>
```

Обычно для элемента `canvas` указывается идентификатор для упрощения его выборки в коде JavaScript. И также часто устанавливаюься атрибуты ширины и высоты (если опустить эти атрибуты, то по умолчанию canvas будет иметь ширину 300 пикселей и высоту 150 пикселей).[^21.1]

#### Контекст рендеринга
Для управления областью рисования canvas и ее содержимым надо получить **контекст рендеринга** с помощью метода **`getContext()`** элемента `canvas`:
```js
canvas.getContext(contextId, [config])
```

В качестве первого обязательного параметра этот метод получает идентификатор контекста, а в качестве второго необязательного параметра - объект конфигурациионных настроек.

Мы можем использовать следующие идентификаторы контекста:

- **`2d`**: контекст для рендеринга 2D-графики. При передаче этого идентификатора в метод `getContext()` данный метод возвращает объект типа `CanvasRenderingContext2D`.

- **`webgl`**: контекст для рендеринга 3D-графики с помощью технологии WebGL версия 1. При передаче этого идентификатора в метод `getContext()` данный метод возвращает объект типа `WebGLRenderingContext`.

- **`webgl2`**: контекст для рендеринга 3D-графики с помощью технологии WebGL версия 2. При передаче этого идентификатора в метод `getContext()` данный метод возвращает объект типа `WebGL2RenderingContext`.

Стоит отметить, что хотя все современные браузеры более менее поддерживают все три контекста (особенно первые два контекста), но, например, поддержка последнего контекста `webgl2` начала внедряться с 2017 года, а в Safari была внедрена самой последней — в 2021 году.

Например, получение контекста **`2d`** для рисования 2D-графики:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
```

Поскольку WebGL имеет много специфичных особенностей, то в дальнейшем работу с Canvas API будем рассматривать именно на примере 2D-контекста. Подробнее же про WebGL можно почитать в руководстве по [WebGL](https://metanit.com/web/webgl/)

Перед тем, как перейти непосредственно к рисованию, стоит понимать, как устроена система координат в `canvas`:

![система координат в canvas в html5 и javascript](../img/canvas1.png)

2D-контекст основан на двумерной системе координат. Началом этой системы координат является координата (0,0) в верхнем левом углу области рисования. Графические элементы (прямоугольники, круги и т.д.) рисуются в области рисования относительно этой исходной координаты.

#### Рисование прямоугольников
Для рисования прямоугольников объект `CanvasRenderingContext2D` доставляет ряд методов:

- `clearRect(x, y, w, h)`: очищает определенную прямоугольную область, верхний левый угол которой имеет координаты `x` и `y`, ширина равна `w`, а высота равна `h`

- `fillRect(x, y, w, h)`: заливает цветом прямоугольник, верхний левый угол которого имеет координаты `x` и `y`, ширина равна `w`, а высота равна `h`

- `strokeRect(x, y, w, h)`: рисует контур прямоугольника без заливки его каким-то определенным цветом

Например, нарисуем на веб-странице простейший прямоугольник с помощью `fillRect()`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Example</title>
</head>
<body>
    <canvas id="canvas" width="400" height="250"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.fillRect (10, 10, 100, 100);
    </script>
</body>
</html>
```

Здесь заполняем прямоугольную область шириной в 100 пикселей и высотой также в 100 пикселей, левый верхний угол которой расположен в точке (x=10, y=10).

![рисование прямоугольника в javascript с помощью метода fillRect](../img/canvas2.png)

По умолчанию для заливки применяется черный цвет. В следующей статье мы посмотрим, как можно установить цвет.

Метод `fillRect()` заполняет область без рисования границы, метод **`strokeRect`**, наоборот, рисует только границу. Например, изменим код javascript следующим образом:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.strokeRect (10, 10, 100, 100);
```

![рисование прямоугольника в javascript с помощью метода strokeRect](../img/canvas3.png)

Здесь рисуем прямоугольник с аналогичными координатами, шириной и высотой, только с одной границей и без заливки. Также по умолчанию для цвета контура применяется черный цвет.

В отличие от `strokeRect` и `fillRect` метод `clearRect` очищает определенную область, Фактически эта область приобретатет тот цвет, который у нее был бы, если бы к ней не применялись функции `strokeRect` и `fillRect`. Например:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillRect (10, 10, 100, 100);
context.clearRect(15, 15, 90, 90);
```

В данном случае сначала заливаем черным цветом прямоугольную область, затем внутри нее с помощью `clearRect` очищаем меньшую прямоугольную область:

![рисование прямоугольника в javascript с помощью метода clearRect](../img/canvas4.png)

Подобным образом мы можем создавать и более сложные композиции:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillRect (10, 10, 80, 80);            // Рисуем голову
context.clearRect (20, 20, 60, 20);           // Оцищаем место для глаз
context.fillRect (30, 25, 10, 10);            // Рисуем левый глаз
context.fillRect (60, 25, 10, 10);            // Рисуем правый глаз
context.clearRect (25, 60, 50, 10);           // Рисуем рот
```

![рисование прямоугольников в javascript на canvas](../img/canvas5.png)

### Настройка рисования
Контекст элемента `canvas` — объект `CanvasRenderingContext2D` предоставляет ряд свойств, с помощью которых можно настроить отрисовку на `canvas`.[^21.9] К подобным свойствам относятся следующие:

- **`strokeStyle`**: устанавливает цвет линий или цвет контура. По умолчанию установлен черный цвет

- **`fillStyle`**: устанавливает цвет заполнения фигур. По умолчанию установлен черный цвет

- **`lineWidth`**: устанавливает толщину линий. По умолчанию равно 1.0

- **`lineJoin`**: устанавливает стиль соединения линий

- **`globalAlpha`**: устанавливает прозрачность отрисовки на `canvas`

- **`setLineDash`**: создает линию из коротких черточек

В прошлой теме при отрисовке прямоугольников мы явным образом не устанавливали никаких цветов, поэтому для цвета линий и заливки прямоугольников использовался цвет по умолчанию — черный. Теперь используем другие цвета. Цвет может определяться в различных форматах:

- В виде названия цвета, например, `"red"` или `"green"`

- В виде шестнадцатеричного значения цвета, например, `"#00FFFF"`

- В виде значения в формате rgb, например, `"rgb(0, 0, 255)"`

- В виде значения в формате rgba, например, `"rgba(0, 0, 255, 0.5)"`

Например, устанавливим цвет контура или границы фигур с помощью свойства **`strokeStyle`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Example</title>
</head>
<body>
    <canvas id="canvas" width="400" height="250"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.strokeStyle = "#ff0000";     // устанавливаем цвет контура фигуры
        context.strokeRect (10, 10, 100, 100);
    </script>
</body>
</html>
```

В данном случае в качестве цвета контура устанавливается красный цвет или `"#ff0000"`:

![Настройка цвета рисования контура фигуры на canvas в JavaScript с помощью свойства strokeStyle](../img/canvas6.png)

Установим с помощью свойства `fillStyle` цвет заливки:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#ee5253";     // устанавливаем цвет заполнения фигуры
context.fillRect (10, 10, 100, 100);
```

![Настройка цвета заполнения фигуры на canvas в JavaScript с помощью свойства fillStyle](../img/canvas7.png)

Естественно мы можем комбинировать несколько методов:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillStyle = "#c7ecee";     // устанавливаем цвет заполнения фигуры
context.fillRect (10, 10, 100, 100);
context.strokeStyle = "#22a6b3";     // устанавливаем цвет контура фигуры
context.strokeRect (10, 10, 100, 100);

context.fillRect (120, 10, 100, 100);       // прямоугольник без границы
context.strokeRect (230, 10, 100, 100);     // прямоугольник без заполнения
```

![установка цвета для canvas в javascript](../img/canvas8.png)

#### Толщина линий
Свойство `lineWidth` позволяет установить толщину линии:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillStyle = "#c7ecee";     // устанавливаем цвет заполнения фигуры
context.fillRect (10, 10, 100, 100);
context.strokeStyle = "#22a6b3";     // устанавливаем цвет контура фигуры
context.lineWidth = 4.5;             // устанавливаем толщину линии
context.strokeRect (10, 10, 100, 100);
```

![установка ширины линии для canvas в javascript](../img/canvas9.png)

#### setLineDash
Метод `setLineDash()` в качестве параметра принимает массив чисел, которые устанавливают расстояния между линиями. Например:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.strokeStyle = "red";
context.setLineDash([15,5]);
context.strokeRect(10, 10, 100, 100);

context.strokeStyle = "blue";
context.setLineDash([2,5,6]);
context.strokeRect(130, 10, 100, 100);

context.strokeStyle = "green";
context.setLineDash([2]);
context.strokeRect(250, 10, 100, 100);
```

![установка расстояний между линиями на canvas с помощью свойства setLineDash в javascript](../img/canvas10.png)

#### Тип соединения линий
Свойство `lineJoin` отвечает за тип соединения линий в фигуре. Оно может принимать следующие значения:

- `miter`: прямые соединения, которые образуют прямые углы. Это значение по умолчанию

- `round`: закругленные соединения

- `bevel`: конические соединения

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.strokeStyle = "red";

context.lineWidth = 10;
context.lineJoin = "miter";
context.strokeRect(10, 10, 100, 100);
context.lineJoin = "bevel";
context.strokeRect(130, 10, 100, 100);
context.lineJoin = "round";
context.strokeRect(250, 10, 100, 100);
```

![Соединение линий на canvas и свойство lineJoin в JavaScript](../img/canvas11.png)

#### Прозрачность
Свойство `globalAlpha` задает прозрачность отрисовки. Оно может принимать в качестве значения число от 0 (полностью прозрачный) до 1.0 (не прозрачный):
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

context.fillStyle = "blue";
context.fillRect(50, 50, 100, 100);

context.globalAlpha = 0.5;
context.fillStyle = "red";
context.fillRect(100, 100, 100, 100);
```

Здесь на `canvas` выводятся два прямоугольника: синий и красный. Но до вывода красного прямоугольника установлена полупроразность отрисовки, поэтому сквозь красный прямоугольник мы сможем увидеть и синий:

![Установка прозрачности на canvas в JavaScript](../img/canvas12.png)

### Фоновые изображения
Вместо конкретного цвета для заливки фигур, например, прямоугольников, мы можем использовать изображения. Для этого у контекста элемент canvas имеется функция **`createPattern()`**, которая принимает два параметра: изображение, которое будет использоваться в качестве фона, и принцип повторения изображения. Последний параметр играет роль в том случае, если размер изображения у нас меньше, чем размер фигуры на `canvas`. Этот параметр может принимать следующие значения:

- `repeat`: изображение повторяется для заполнения всего пространства фигуры

- `repeat-x`: изображение повторяется только по горизонтали

- `repeat-y`: изображение повторяется только по вертикали

- `no-repeat`: изображение не повторяется

Нарисуем прямоугольник и выведем в нем изображение:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <canvas id="canvas" width="400" height="250"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const img = new Image();
        img.src = "forest.png";

        img.onload = function() {
            const pattern = context.createPattern(img, "repeat");
            context.fillStyle = pattern;
            context.fillRect(10, 10, 200, 200);
            context.strokeRect(10, 10, 200, 200);
        };
    </script>
</body>
</html>
```

Чтобы использовать изображение, нам надо создать элемент `Image` и установить источник изображения — локальный файл или ресурс в сети:
```js
const img = new Image();
img.src = "forest.png";
```

В данном случае предполагается, что в одной папке с файлом html у меня находится файл изображения *forest.png*. Однако загрузка изображения может занять некоторое время, особенно если файл изображения берется из сети интернет. Поэтому, чтобы быть уверенными, что изображение уже загрузилось, все действия по его использованию производятся в методе `img.onload`, который вызывается при завершении загрузки изображения:
```js
img.onload = function() {

    const pattern = context.createPattern(img, "repeat");
    context.fillStyle = pattern;
    context.fillRect(10, 10, 200, 200);
    context.strokeRect(10, 10, 200, 200);
};
```

Метод `createPattern()` возвращает объект, который устанавливается в качестве стиля заполнения фигуры: `context.fillStyle = pattern;`. Отрисовка прямоугольника остается той же.[^21.2]

![Изображение как фон в canvas в JavaScript](../img/canvas37.png)

### Создание градиента
Элемент `Canvas` позволяет использовать градиент в качестве фона. Для этого применяется объект **`CanvasGradient`**, который можно создать либо с помощью метода **`createLinearGradient()`** (линейный градиент), либо с помощью метода **`createRadialGradient()`** (радиальный градиент).[^21.3]

#### Линейный градиент
Линейный градиент создается помощью метода `createLinearGradient(x0, y0, x1, y1)`, где `x0` и `y0` - это начальные координаты градиента относительно верхнего левого угла `canvas`, а `x1` и `y1` — координаты конечной точки градиента. Например:
```js
const gradient = context.createLinearGradient(50, 30, 150, 150);
```

Также для создания градиента необходимо задать опорные точки, которые определяют цвет. Для этого у объекта `CanvasGradient` применяется метод **`addColorStop(offset, color)`**, где `offset` — это смещение точки градиента, а `color` — ее цвет. Например:
```js
gradient.addColorStop(0, "blue");
```

Смещение представляет значение в диапазоне от 0 до 1. Смещение 0 представляет начало градиента, а 1 — его конец. Цвет задается либо в виде строки, либо в виде шестнадцатеричного значения, либо в виде значения rgb/rgba.

Применим градиент:
```js
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Example</title>
</head>
<body>
    <canvas id="canvas" width="400" height="250"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        const gradient = context.createLinearGradient(50, 30, 150, 150);
        gradient.addColorStop(0, "blue");       // от синего цвета
        gradient.addColorStop(1, "white");      // к белому цвету
        context.fillStyle = gradient;           // в качестве цвета заполнения устанавливаем градиент
        context.fillRect(50, 30, 150, 150);
        context.strokeRect(50, 30, 150, 150);
    </script>
</body>
</html>
```

Здесь для создания градиента добавлены две опорные точки — для синего и белого цвета. В итоге мы получим переход от синего цвета в белый:

![Линейный градиент на canvas в JavaScript](../img/canvas33.png)

Стоит отметить, что опорных точек для создания градиента может быть несколько
```js
gradient.addColorStop(0, "blue");       // от белого цвета
gradient.addColorStop(0.5, "green");    // к зеленому цвету
gradient.addColorStop(1, "white");      // к синему цвету
```

В примере выше мы получаем диагональный линейный градиент. Управляя координатами, мы можем получить горизонтальный или вертикальный градиент.

Совпадение x-координат начальной и конечной точек создает вертикальный градиент:
```js
const gradient = context.createLinearGradient(50, 30, 50, 150);
```

![Горизонтальный линейный градиент на canvas в JavaScript](../img/canvas34.png)

А совпадение y-координат начальной и конечной точек создает горизонтальный градиент:
```js
const gradient = context.createLinearGradient(50, 30, 150, 30);
```

![Вертикальный линейный градиент на canvas в JavaScript](../img/canvas35.png)

#### Радиальный градиент
Радиальный градиент создается с помощью метода `createRadialGradient(x0, y0, r0, x1, y1, r1)`, который принимает следующие параметры:

- `x0` и `y0`: координаты центра первой окружности

- `r0`: радиус первой окружности

- `x1` и `y1`: координаты центра второй окружности

- `r1`: радиус второй окружности

Например:
```js
const gradient = context.createRadialGradient(120,100,100,120,100,30);
```

И также для радиального градиента нам надо задать опорные цветовые точки с помощью метода `addColorStop()`
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gradient = context.createRadialGradient(120,100,100,120,100,30);
gradient.addColorStop(0, "blue");
gradient.addColorStop(1, "white");
context.fillStyle = gradient;
context.fillRect(50, 30, 150, 150);
context.strokeRect(50, 30, 150, 150);
```

![Радиальный градиент на canvas в JavaScript](../img/canvas36.png)

### Рисование текста
Наряду с геометрическими фигурами и изображениями `canvas` позволяет выводить текст. Доля этого вначале надо установить у контекста `canvas` свойство **`font`**:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "22px Verdana";
```

Свойство `font` в качестве значения принимает определение шрифта. В данном случае это шрифт Verdana высотой 22 пикселя. В качестве шрифтов используются стандартные шрифты.[^21.4]

Для вывода текста применяются два метода:

- `fillText(text, x, y)`: принимает три параметра: выводимый текст (параметр `text`) и координаты точки, с которой выводится текст (параметры `x` и `y`).

- `strokeText(text, x, y)`: принимает аналогичные параметры.

Разница между двумя метода состоит в том, что `fillText()` использует цвет заполнения фигуры (из свойства `fillStyle`) и заполняет им символы текста. Метод `strokeText()` использует цвет контура фигуры (задается через свойство `strokeStyle`) и отрисосывает контур символов.

Например, выведем некоторый текст с помощью метода **`fillText()`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Example</title>
</head>
<body>
    <canvas id="canvas" width="400" height="250"></canvas>
    <script>
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        context.font = "30px Verdana";
        context.fillStyle = "navy";     // устанавливаем цвет текста
        context.fillText("Hello METANIT.COM", 20, 50);
    </script>
</body>
</html>
```

![Вывод текста на canvas с помощью метода fillText в JavaScript](../img/canvas29.png)

Метод `fillText(text, x, y)` принимает три параметра: выводимый текст и `x` и `y` координаты точки, с которой выводится текст.

Вывод аналогичного текста с помощью метода **`strokeText()`**:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "30px Verdana";
context.strokeStyle = "navy";     // устанавливаем цвет текста
context.strokeText("Hello METANIT.COM", 20, 50);
```

![Вывод текста на canvas с помощью метода strokeText в JavaScript](../img/canvas30.png)

#### Свойство textAlign
Свойство **`textAlign`** позволяет выровнить текст относительно одной из сторон. Это свойство может принимать следующие значения:

- `left`: текст начинается с указанной позиции

- `right`: текст завершается до указанной позиции

- `center`: текст располагается по центру относительно указанной позиции

- `start`: значение по умолчанию, текст начинается с указанной позиции

- `end`: текст завершается до указанной позиции

```js
var canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");
context.font = "22px Verdana";
context.textAlign = "right";
context.fillText("Right Text", 120, 30);
context.textAlign = "left";
context.fillText("Left Text", 120, 60);
context.textAlign = "center";
context.fillText("Center Text", 120, 90);
context.textAlign = "start";
context.fillText("Start Text", 120, 120);
context.textAlign = "end";
context.fillText("End Text", 120, 150);
```

![textAlign в canvas в JavaScript](../img/canvas31.png)

#### Свойство textBaseline
Свойство **`textBaseline`** задает выравнивание текста по базовой линии. Оно может принимать следующие значения:

- `top`

- `middle`

- `bottom`

- `alphabetic`

- `hanging`

- `ideographic`

```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "22px Verdana";
context.textBaseline="top";
context.fillText("Top",10,100);
context.textBaseline="bottom";
context.fillText("Bottom",45,100);
context.textBaseline="middle";
context.fillText("Middle",130,100);
context.textBaseline="alphabetic";
context.fillText("Alphabetic",205,100);
context.textBaseline="hanging";
context.fillText("Hanging",320,100);
```

![textBaseline в canvas в JavaScript](../img/canvas32.png)

#### Определение ширины текста
С помощью метода **`measureText()`** можно определить ширину текста на `canvas`:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.font = "18px Verdana";
const text = context.measureText("Hello JavaScript");
console.log(text.width);
```

### Рисование фигур
Кроме прямоугольников canvas позволяет рисовать и более сложные фигуры. Для оформления сложных фигур используется концепция геометрических путей, которые представляют набор линий, окружностей, прямоугольников и других более мелких деталей, необходимых для построения сложной фигуры.

Для создания нового пути надо вызвать метод **`beginPath()`**:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.beginPath();    //  начинаем рисование фигуры
```

После метода `beginPath()` вызываются методы, которые непосредственно создают различные участки пути.[^21.5]

#### Методы moveTo() и lineTo()
Для начала рисования пути нам надо зафиксировать начальную точку этого пути. Это можно сделать с помощью метода **`moveTo()`**, который имеет следующее определение:
```js
moveTo(x, y)
```

Метод перемещает нас на точку с координатами `x` и `y`.

Метод **`lineTo()`** рисует линию. Он имеет похожее определение:
```js
lineTo(x, y)
```

Метод рисует линию от текущей позиции до точки с координатами `x` и `y`.

Теперь нарисуем ряд линий:
```js
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
context.beginPath();
context.moveTo(20, 100);
context.lineTo(140, 10);
context.lineTo(260, 100);
```

Здесь мы устанавливаем начало пути в точку (20, 100), затем от нее рисуем линию до точки (140, 10) (линия вверх) и далее рисуем еще одну линию до точки (260, 100).

## JavaScript анимации

## JavaScript в CSS

## Источники информации
[^21.1]: [Canvas и его контекст. Рисование прямоугольников](https://metanit.com/web/javascript/21.1.php)
[^21.9]: [Настройка рисования](https://metanit.com/web/javascript/21.9.php)
[^21.2]: [Фоновые изображения](https://metanit.com/web/javascript/21.2.php)
[^21.3]: [Создание градиента](https://metanit.com/web/javascript/21.3.php)
[^21.4]: [Рисование текста](https://metanit.com/web/javascript/21.4.php)
[^21.5]: [Рисование фигур](https://metanit.com/web/javascript/21.5.php)
