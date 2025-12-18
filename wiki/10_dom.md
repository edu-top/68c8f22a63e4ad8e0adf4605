## Объектная модель документа

- [Объектная модель документа](#объектная-модель-документа)
  - [Введение в DOM](#введение-в-dom)
    - [Редкие типы узлов XML DOM](#редкие-типы-узлов-xml-dom)
    - [XSLT-стили](#xslt-стили)
  - [Свойства объекта document](#свойства-объекта-document)
  - [Поиск элементов на веб-странице](#поиск-элементов-на-веб-странице)
    - [Получение элементов по id](#получение-элементов-по-id)
    - [Поиск по определенному тегу](#поиск-по-определенному-тегу)
    - [Получение элементов по классу](#получение-элементов-по-классу)
    - [Поиск элементов по атрибуту name](#поиск-элементов-по-атрибуту-name)
    - [Поиск элементов по селектору CSS](#поиск-элементов-по-селектору-css)
    - [Поиск во вложенных элементах](#поиск-во-вложенных-элементах)
    - [Селекторы CSS](#селекторы-css)
    - [Дополнительные замечания](#дополнительные-замечания)
  - [Объект Node. Навигация по DOM](#объект-node-навигация-по-dom)
    - [Получение родительского элемента](#получение-родительского-элемента)
    - [Получение дочерних элементов](#получение-дочерних-элементов)
      - [Количество элементов](#количество-элементов)
    - [Получение элементов одного уровня](#получение-элементов-одного-уровня)
    - [nodeValue и получение текстового содержимого](#nodevalue-и-получение-текстового-содержимого)
  - [Элементы](#элементы)
    - [Свойства элементов](#свойства-элементов)
    - [Управление текстом элемента](#управление-текстом-элемента)
    - [Управление кодом HTML](#управление-кодом-html)
  - [Создание, добавление, замена и удаление элементов](#создание-добавление-замена-и-удаление-элементов)
    - [Создание элементов](#создание-элементов)
    - [Добавление элементов](#добавление-элементов)
      - [appendChild](#appendchild)
      - [insertBefore](#insertbefore)
    - [Копирование элемента](#копирование-элемента)
    - [Замена элемента](#замена-элемента)
    - [Удаление элемента](#удаление-элемента)
      - [Удаление всех элементов](#удаление-всех-элементов)
  - [Практическая работа. Реализация поведения "подсказка"](#практическая-работа-реализация-поведения-подсказка)
    - [Задание](#задание)
  - [Источники информации](#источники-информации)

### Введение в DOM
*[DOM]: Document Object Model
*[BOM]: Browser Object Model
*[DTD]: Document Type Definition
*[PI]: Processing Instruction
*[CDATA]: Character Data

Хотя веб-браузером и вообще вебом область действия JavaScript не ограничивается, однако по прежнему одной из ключевых задач JavaScript является взаимодействие с пользователем и манипуляция элементами веб-страницы в браузере. Для JavaScript веб-страница доступна в виде **объектной модели документа** (document object model) или сокращенно **DOM**. <dfn title="DOM">DOM</dfn> описывает структуру веб-станицы в виде древовидного представления и предоставляет разработчику способ получить доступ к отдельным элементам веб-страницы.

Важно не путать понятия **BOM** (Browser Object Model — объектная модель браузера) и **DOM** (объектная модель документа). Если BOM предоставляет доступ к браузеру и его свойствам в целом, то DOM предоставляет доступ к отдельной веб-странице или html-документу и его элементам.

Например, рассмотрим простейшую страницу:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>
    <h2>Page Header</h2>
    <div>
        <h3>Block Header</h3>
        <p>Text</p>
    </div>
</body>
</html>
```

Дерево DOM для этой страницы будет выглядеть следующим образом:

![DOM-tree in JavaScript](../img/domtree.png)

Таким образом, все компоненты упорядочены в DOM иерархическим образом, где каждый компонент представляет отдельный узел. То есть каждый элемент, например, элемент `div`, представляет собой узел. Но также и текст внутри элемента представляет отдельный узел.

Существует следующие виды узлов:

- **`Document`**: корневой узел html-документа, представляет весь документ в целом  (`nodeType = 9`).

- **`Element`**:  HTML-элемент (`<div>`, `<p>`), основной рабочий узел (`nodeType = 1`).

- **`Text`**: текст элемента, текстовое содержимое между тегами (`nodeType = 3`).

- **`Attr`**: атрибут html-элемента (`href="..."`), устаревший тип (`nodeType = 2`).

- **`DocumentType`**: DTD или тип схемы XML-документа (`<!DOCTYPE html>`) (`nodeType = 10`).

- **`DocumentFragment`**: место для временного хранения частей документа, временный контейнер для фрагментов DOM, не входит в дерево (`nodeType = 11`).

- **`EntityReference`**: ссылка на сущность XML-документа (XML-сущность) (`&copy;`) (`nodeType = 5`).

- **`ProcessingInstruction`**: инструкция обработки веб-страницы (`<?xml-stylesheet?>`) (`nodeType = 7`).

- **`Comment`**: элемент комментария, HTML/XML-комментарий (`<!-- -->`) (`nodeType = 8`).

- **`CDATASection`**: секция CDATA в документе XML, неразборный текст XML (`<![CDATA[...]]>`), как `Text` (`nodeType = 4`).

- **`Entity`**: необработанная сущность DTD, объявление сущности DTD (`<!ENTITY>`) (`nodeType = 6`).

- **`Notation`**: нотация, объявленная в DTD (нотация DTD) (`<!NOTATION>`) (`nodeType = 12`).

Несмотря на такое большое количество типов узлов, как правило, применяются первые 4 типа.[^8.1]

| Узел                  | nodeType | HTML5 | XML | Использование сегодня              |
| --------------------- | -------- | ----- | --- | ---------------------------------- |
| `Document`              | 9        | ✅     | ✅   | Основной                           |
| `Element`               | 1        | ✅     | ✅   | Основной                           |
| `Text`                  | 3        | ✅     | ✅   | Основной                           |
| `Attr`                  | 2        | ❌     | ❌   | Устарел (используйте `getAttribute`) |
| `DocumentType`          | 10       | ✅     | ✅   | Только DOCTYPE                     |
| `DocumentFragment`      | 11       | ✅     | ✅   | Часто (batch updates)              |
| `EntityReference`       | 5        | ❌     | ⚠️  | Редко (legacy XML)                 |
| `ProcessingInstruction` | 7        | ⚠️    | ✅   | XSLT стили                         |
| `Comment`               | 8        | ✅     | ✅   | Часто                              |
| `CDATASection`          | 4        | ❌     | ✅   | XML only                           |
| `Entity`                | 6        | ❌     | ⚠️  | Устарел                            |
| `Notation`              | 12       | ❌     | ⚠️  | Устарел                            |

**Вывод**: в веб-разработке активно используются только `Document`, `Element`, `Text`, `DocumentFragment`, `Comment`. Остальные — артефакты XML/DTD 1998 года.

#### Редкие типы узлов XML DOM
**DTD** (Document Type Definition) — это определение типа документа, первое средство валидации структуры XML.

DTD описывает правила построения XML-документа:

- Какие элементы допустимы и в какой последовательности

- Какие атрибуты разрешены у элементов

- Тип содержимого элементов (#PCDATA, другие элементы)

- Вложенность и обязательность

Синтаксис в XML
```xml
<!DOCTYPE root-element [
  <!ELEMENT note (to,from,heading,body)>  <!-- структура -->
  <!ELEMENT to (#PCDATA)>                 <!-- только текст -->
  <!ATTLIST note type CDATA #REQUIRED>    <!-- атрибуты -->
]>
<note type="important">
  <to>Иван</to>
  <from>Петр</from>
</note>
```

В браузере `document.doctype` возвращает объект `DocumentType`:
```js
console.log(document.doctype);
// #documentType html // для HTML5
console.log(document.doctype.name);    // "html"
console.log(document.doctype.publicId); // ""
```

В настоящее время считается устаревшим стандартом (1998), заменен XML Schema (XSD):

- Нет типов данных (только текст/элементы)

- Сложный синтаксис

- HTML5 использует упрощенный `<!DOCTYPE html>`

Таким образом, DTD — исторический артефакт для валидации простых XML. В веб-разработке остался только как `<!DOCTYPE>` для активации standards mode.

`EntityReference` — ссылка на сущность из DTD. Заменяется на значение сущности при парсинге.

```xml
<!DOCTYPE doc [
  <!ENTITY copy "©">
]>
<doc>&copy; текст</doc>  <!-- EntityReference: &copy; -->
```

В DOM: `nodeName = "copy"`, `nodeType = 5`.​

`ProcessingInstruction` — инструкция обработки (PI) для приложений (XML-стили, XSLT).

```xml
<?xml-stylesheet type="text/xsl" href="style.xsl"?>
```

В DOM: `nodeName = "xml-stylesheet"`, `nodeValue = 'type="text/xsl" href="style.xsl"'`, `nodeType = 7`.

`CDATASection` обозначает секцию CDATA — текст, не парсируемый как XML (для HTML в XML).

```xml
<![CDATA[<script>alert("ok")</script>]]>  <!-- Текст как есть -->
```

В DOM: `nodeType = 4`, обычный текстовый узел с особым флагом.

`Entity` — объявление сущности из DTD (необрабатанная).

```xml
<!ENTITY logo SYSTEM "logo.gif">
```

В DOM: `document.doctype.entities.getNamedItem("logo"), nodeType = 6`.

`Notation` — нотация DTD — описание внешних типов данных (старые изображения).

```xml
<!NOTATION GIF PUBLIC "image/gif">
```

В DOM: `document.doctype.notations.getNamedItem("GIF")`, `nodeType = 12`.

Все эти узлы — артефакты XML 1.0 (1998) для DTD. В веб-разработке практически не встречаются, остались только в legacy XML.

#### XSLT-стили
*[XML]: eXtensible Markup Language
*[XSL]: eXtensible Stylesheet Language
*[RSS]: Really Simple Syndication
*[XSLT]: XSL Transformations
*[RDF]: Resource Description Framework
*[OWL]: Web Ontology Language
*[FOAF]: Friend of a Friend
*[SPARQL]: SPARQL Protocol and RDF Query Language
*[JSON]: JavaScript Object Notation

<dfn title="XML">XML</dfn> — eXtensible Markup Language (расширяемый язык разметки). Структурированный формат данных с пользовательскими тегами (1998).
```xml
<user id="1">
  <name>Иван</name>
  <age>30</age>
</user>
```

<dfn title="XSL">XSL</dfn> — eXtensible Stylesheet Language (семейство). Включает:

- XSLT — преобразование XML в HTML/XML

- XPath — запросы к XML

- XSL-FO — форматирование (PDF)

```xml
<?xml-stylesheet type="text/xsl" href="style.xsl"?>
```

<dfn title="XSLT стили">XSLT стили</dfn> — это таблицы преобразований XML (XSL Transformations), которые определяют, как XML-документ преобразуется в другой формат (HTML, другой XML).

**Как работают**
1. XML-документ содержит данные

2. XSLT-стиль содержит правила преобразования (ё<xsl:template>ё)

3. XSLT-процессор (браузер, Saxon) применяет стиль к данным

```xml
<!-- data.xml -->
<users>
  <user id="1"><name>Иван</name></user>
</users>
```

```xml
<!-- style.xsl -->
<xsl:stylesheet version="1.0">
  <xsl:template match="/users">
    <ul>
      <xsl:for-each select="user">
        <li><xsl:value-of select="name"/></li>
      </xsl:for-each>
    </ul>
  </xsl:template>
</xsl:stylesheet>
```

Результат: `<ul><li>Иван</li></ul>`

*Подключение через `ProcessingInstruction`*:
```xml
<!-- В XML-документе -->
<?xml-stylesheet type="text/xsl" href="style.xsl"?>
<users>...</users>
```

Браузер автоматически применяет XSLT и показывает HTML.

| Задача      | Пример                  |
| ----------- | ----------------------- |
| XML → HTML | Данные → веб-страница  |
| XML → XML  | Конвертация форматов    |
| Отчеты      | XML-данные → PDF/Excel |
| RSS → HTML | Ленты новостей          |

Современный статус — устаревшая технология (1999):

- ✅ Server-side: Node.js (xslt4node), Java (Saxon)

- ❌ Client-side: Браузеры не поддерживают (кроме IE)

- ❌ SPA: React/Vue заменили полностью

**Вывод**: XSLT — мощный инструмент для серверных XML-преобразований, но в веб-фронтенде заменен JavaScript-фреймворками.

<dfn title="RSS">RSS</dfn> — RDF Site Summary / Really Simple Syndication. Формат лент новостей на базе XML.

```xml
<rss version="2.0">
  <channel>
    <item>
      <title>Новость</title>
      <link>https://example.com</link>
      <pubDate>2025-12-18</pubDate>
    </item>
  </channel>
</rss>
```

| Технология | Назначение     | Год  | Статус                     |
| ---------- | -------------- | ---- | -------------------------- |
| XML        | Данные/конфиги | 1998 | ✅ JSON заменил             |
| XSL/XSLT   | XML → HTML    | 1999 | ❌ Устарело (JS фреймворки) |
| RSS        | Ленты новостей | 1999 | ✅ Жив (подкасты, блоги)    |

**Вывод**: XML — универсальный формат данных, XSL — устаревшие стили/преобразования, RSS — живой стандарт новостных фидов.

<dfn title="RDF">RDF</dfn> (Resource Description Framework) — Среда описания ресурсов, модель данных для Семантической паутины (Semantic Web).

RDF представляет данные как граф триплетов:
```
субъект → предикат → объект
Иван    → возраст   → 30
```

Всё идентифицируется URI (уникальными ссылками).

*Пример*:
```
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<ivan> foaf:name "Иван Иванов" .
<ivan> foaf:age 30 .
<ivan> foaf:knows <maria> .
```

Графически:
```
[Иван] ──name───> "Иван Иванов"
       ──age───> 30
       ──knows──> [Мария]
```

*Форматы*:
| Синтаксис | Пример                                   | Использование      |
| --------- | ---------------------------------------- | ------------------ |
| Turtle    | `@prefix foaf: <...>`                    | Читаемый человеком |
| RDF/XML   | `<rdf:Description>`                      | Legacy             |
| JSON-LD   | `{"@id": "ivan"}`                        | Современный веб    |
| RDFa      | `<span property="foaf:name">Иван</span>` | В HTML             |

RSS 1.0 использует RDF для описания лент:
```xml
<rdf:RDF>
  <item rdf:about="http://example.com/post1">
    <title>Новость</title>
  </item>
</rdf:RDF>
```

*Назначение*
| Область               | Пример                                       |
| --------------------- | -------------------------------------------- |
| Семантическая паутина | Linked Data, DBpedia                         |
| Онтологии             | OWL (Web Ontology Language)                  |
| Метаданные            | FOAF (Friend of a Friend)                    |
| SPARQL-запросы        | SELECT ?person WHERE { ?person foaf:age 30 } |

Статус — живой стандарт W3C (1999–наст. время):

- ✅ JSON-LD — в Schema.org, Google Knowledge Graph

- ✅ SPARQL — запросы к RDF

- ❌ RDF/XML — устарел

**Вывод**: RDF — фундамент Семантической паутины, позволяет машинам понимать связи между данными. Сегодня популярен через JSON-LD в SEO и структурированных данных.

### Свойства объекта document
Для работы со структурой DOM в JavaScript предназначен объект `document`, который определен в глобальном объекте `window`. Для получения базовой информации о веб-странице объект `document` предоставляет ряд свойств:

- **`title`**: представляет заголовок документа (который указан в элементе `<title>`)

- **`lastModified`**: содержит дату последнего изменения документа

- **`URL`**: содержит адрес URL текущего документа

- **`domain`**: содержит домен, к которому принадлежит веб-страница документа

- **`documentElement`**: предоставляет доступ к корневому элементу `<html>`

- **`body`**: предоставляет доступ к элементу `<body>` на веб-странице

- **`head`**: предоставляет доступ к элементу `<head>` на веб-странице

- **`cookie`**: содержит коллекцию всех куки для текущего документа

- **`images`**: содержит коллекцию всех объектов изображений (элементов `img`)

- **`links`**: содержит коллекцию ссылок — элементов `<a>` и `<area>`, у которых определен атрибут `href`

- **`anchors`**: предоставляет доступ к коллекции элементов `<a>`, у которых определен атрибут name

- **`forms`**: содержит коллекцию всех форм на веб-странице

Эти свойства не предоставляют доступ ко всем элементам, однако позволяют получить наиболее часто используемые элементы на веб-странице. Например, получим корневой узел документа:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
<script>
console.log(document.documentElement);
</script>
</body>
</html>
```

В результате на консоль будет выведено содержимое текущей веб-страницы, как оно определено в коде выше.

Или выведем базовую информацию о документе:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
<script>
console.log(document.title);
console.log(document.lastModified);
console.log(document.domain);
console.log(document.URL);
</script>
</body>
</html>
```

Консольный вывод:
```
DevPM
12/07/2025 10:56:12

file:///Users/user/Documents/app/index.html
```

Получим все изображения на странице:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <img src="picure1.png" alt="Картинка 1" />
    <img src="picure2.png" alt="Картинка 2" />
    <img src="picure3.png" alt="Картинка 3" />
    <script>
        const images = document.images;
        // изменим первое изображение
        images[0].src="picture_4.jpg";
        images[0].alt="Новая картинка";
        // перебирем все изображения
        for(img of images){
            console.log(`Url: "${img.src}" Alt:"${img.alt}"`);
        }
    </script>
</body>
</html>
```

Подобно тому, как в коде html мы можем установить атрибуты у элемента `img`, так и в коде javascript мы можем через свойства `src` и `alt` получить и установить значения этих атрибутов. Причем в данном случае не важно, существуют или нет файлы изображений. Консольный вывод будет наподобие следующего:
```
Url: "app/picture_4.jpg" Alt:"Новая картинка"
Url: "app/picure2.png" Alt:"Картинка 2"
Url: "app/picure3.png" Alt:"Картинка 3"
```

Рассмотрим получение всех ссылок на странице:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <a href="article1.html">Статья 1</a>
    <a href="article2.html">Статья 2</a>
    <a href="article3.html">Статья 3</a>
    <script>
        const links = document.links;
        // перебираем все ссылки
        for(link of links){
            console.log(`Href: "${link.href}" Text: "${link.innerText}"`);
        }
    </script>
</body>
</html>
```

Опять же, так как у ссылки определен атрибут `href`, то при переборе ссылок мы можем получить его значение.[^8.3]

### Поиск элементов на веб-странице
Объект `document` предоставляет ряд методов для поиска и управления элементами на веб-странице:

- `getElementById(value)`: выбирает элемент, у которого атрибут `id` равен `value`. Если элемента с таким идентификатором нет, то возвращается `null`.

- `getElementsByTagName(value)`: выбирает все элементы, у которых тег равен `value`. Возвращает список элементов (список типа `NodeList`), который аналогичен массиву.

- `getElementsByClassName(value)`: выбирает все элементы, которые имеют класс `value`. Возвращает список `NodeList`.

- `getElementsByName(value)`: выбирает все элементы, которые называются `value`. Возвращает список `NodeList`.

- `querySelector(value)`: выбирает первый элемент, который соответствует css-селектору `value`.

- `querySelectorAll(value)`: выбирает все элементы, которые соответствуют css-селектору `value`. Возвращает список `NodeList`.

#### Получение элементов по id
Например, найдем элемент по id:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
        const headerElement = document.getElementById("header");
        console.log("Text: ", headerElement.innerText); // Text:  Home Page
    </script>
</body>
</html>
```

С помощью вызова `document.getElementById("header")` находим элемент, у которого `id="header"`. А с помощью свойства **`innerText`** можно получить текст найденного элемента.

Стоит отметить, что если элемент не найден, то метод возвращает **`null`**. Поэтому перед использованием элемента рекомендуется проверять его на `null`.

#### Поиск по определенному тегу
Поиск по определенному тегу:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1>Home Page</h1>
    <p>Первый абзац</p>
    <p>Второй абзац</p>
    <script>
        const paragraphs = document.getElementsByTagName("p");

        for (p of paragraphs) {
            console.log(p.innerText);   // выводим текст параграфа
        }
    </script>
</body>
</html>
```

С помощью вызова `document.getElementsByTagName("p")` находим все элементы параграфов. Этот вызов возвращает список типа `NodeList`, который во многом аналогичен массиву и который содержит найденные элементы. Чтобы получить отдельные элементы этого списка, можно пробежаться по этому списку в цикле.

Консольный вывод:
```
Первый абзац
Второй абзац
```

Если нам надо получить только первый элемент, то можно к первому элементу найденной коллекции объектов:
```js
const p = document.getElementsByTagName("p")[0];
console.log(p.innerText);
```

Если элементов с указанным тегом нет на странице, то возвращается пустой список. С помощью свойства **`length`** (как и в случае массивов) можно проверить количество найденных элементов:
```js
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length);
```

Конечно, для перебора списка можно использовать и другие виды циклов:
```js
const paragraphs = document.getElementsByTagName("p");
for (let i=0; i < paragraphs.length; i++) {
    console.log(paragraphs[i].innerText);
}
```

#### Получение элементов по классу
Получение элементов по классу:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1>Home Page</h1>
    <p class="text">Page Text</p>
    <p class="contacts">Email: supercorp@zmail.com</p>
    <p class="contacts">Phone: +1-234-567-8901</p>
    <script>
        const contacts = document.getElementsByClassName("contacts");

        for (contact of contacts) {
            console.log(contact.innerText);
        }
    </script>
</body>
</html>
```

В данном случае выбираем все элементы с классом "contacts". Консольный вывод:
```
Email: supercorp@zmail.com
Phone: +1-234-567-8901
```

#### Поиск элементов по атрибуту name
Метод **`getElementsByName()`** позволяет получить список из элементов по имени — атрибуту **`name`**. Данный метод применяется к элементам форм. Например:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <form>
        <p>Language:</p>
        <input type="radio" name="lang" value="Java">
        <label>Java</label>
        <br>
        <input type="radio" name="lang" value="JavaScript" checked>
        <label>JavaScript</label>
        <br>
        <input type="radio" name="lang" value="PHP">
        <label>PHP</label>
        <br>
    </form>
    <script>
    // выбираем все элементы с атрибутом name="lang"
    const langs = document.getElementsByName("lang");
    for (lang of langs) {
        console.log(lang.value);    // получаем значение атрибута value
    }
    </script>
</body>
</html>
```

В данном случае выбираем все элементы, у которых атрибут `name` равен "lang". В примере выше это радиокнопки. Затем на консоль выводим значение атрибута `value` каждого полученного элемента. Консольный вывод:
```
Java
JavaScript
PHP
```

Стоит отметить, что этот метод может работать несколько иначе в старых браузерах типа Internet Explorer или Opera. В частности, он выбирает элемент, если не только его атрибут `name` соответствует переданному значению, но и атрибут `id`.

#### Поиск элементов по селектору CSS
Выбор по селектору CSS:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div class="annotation">
        <p>Аннотация статьи</p>
    </div>
    <div class="text">
        <p>Первый абзац</p>
        <p>Второй абзац</p>
    </div>
    <script>
        const elem = document.querySelector(".annotation p");
        console.log(elem.innerText);    // Аннотация статьи
    </script>
</body>
</html>
```

Выражение `document.querySelector(".annotation p")` находит элемент, который соответствует селектору `.annotation p`. Если на странице несколько элементов, соответствующих селектору, то метод выберет первый из них.

Чтобы получить все элементы по селектору, можно подобным образом использовать метод `document.querySelectorAll`, который возвращает список `NodeList` из найденных элементов:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div class="annotation">
        <p>Аннотация статьи</p>
    </div>
    <div class="text">
        <p>Первый абзац</p>
        <p>Второй абзац</p>
    </div>
    <script>
        const elems = document.querySelectorAll(".text p");
        for (elem of elems) {
            console.log(elem.innerText);
        }
    </script>
</body>
</html>
```

Вывод браузера:
```
Первый абзац
Второй абзац
```

#### Поиск во вложенных элементах
Подобным образом мы можем искать элементы не только во всем документе, но и в отдельных элементах на веб-странице. Например:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p class="text">Page Text 1</p>
        <p class="text">Page Text 2</p>
    </div>
    <div id="footer">
        <p class="text">Footer Text</p>
    </div>
    <script>
    // получаем элемент с id="article"
    const article = document.getElementById("article");
    // в этом элементе получаем все элементы с class="text"
    const articleContent = article.getElementsByClassName("text");
    for(p of articleContent){
        console.log(p);
    }
    </script>
</body>
</html>
```

В данном случае мы сначала получаем элемент с `id="article"`, затем внутри этого элемента ищем все элементы с `class="text"`. В результате консоль выведет два элемента:
```
<p class="text">Page Text 1</p>
<p class="text">Page Text 2</p>
```

#### Селекторы CSS
Перечислим вкратце список базовых CSS-селекторов, которые можно применять для поиска элементов:

- `*`: выбирает все элементы

- `E`: выбирает все элементы типа `E`

- `[a]`: выбирает все элементы с атрибутом `a`

- `[a="b"]`: выбирает все элементы, в которых атрибут `a` имеет значение `b`

- `[a~="b"]`: выбирает все элементы, в которых атрибут `a` имеет список значений, и одно из этих значений равно `b`

- `[a^="b"]`: выбирает все элементы, в которых значение атрибута `a` начинается на `b`

- `[a$="b"]`: выбирает все элементы, в которых значение атрибута `a` завершается на `b`

- `[a*="b"]`: выбирает все элементы, в которых значение атрибута `a` содержит подстроку `b`

- `[a|="b"]`: выбирает все элементы, в которых значение атрибута `a` представляет ряд значений, разделенных дефисами, и первое из этих значений равно `b`

- `:root`: выбирает корневой элемент документа

- `:nth-child(n)`: выбирает `n`-ый вложенный элемент (отсчет идет с начала)

- `:nth-last-child(n)`: выбирает `n`-ый вложенный элемент (отсчет идет с конца)

- `:nth-of-type(n)`: выбирает `n`-ый сестринский элемент типа `type` (отсчет идет с начала)

- `:nth-last-of-type(n)`: выбирает `n`-ый сестринский элемент типа `type` (отсчет идет с конца)

- `:first-child`: выбирает первый вложенный элемент

- `:last-child`: выбирает последний вложенный элемент

- `:first-of-type`: выбирает первый сестринский элемент типа `type`

- `:last-of-type`: выбирает последний сестринский элемент типа `type`

- `:only-child`: выбирает все элементы, которые имеют только один вложенный элемент

- `:only-of-type`: выбирает все сестринские элементы типа `type`

- `:empty`: выбирает все элементы, которые не имеют вложенных элементов

- `:link`: выбирает все ссылки, которые еще не были нажаты

- `:visited`: выбирает все ссылки, которые уже были нажаты

- `:active`: выбирает все ссылки, которые в текущий момент активны (нажимаются)

- `:hover`: выбирает все ссылки, над которыми в текущий момент находится курсор

- `:focus`: выбирает все элементы, которые в текущий момент получили фокус

- `:target`: выбирает все элементы, к которым можно обратиться с помощью адресов url внутри страницы

- `:lang(en)`: выбирает все элементы, в которых атрибут `lang` имеет значение "en"

- `:enabled`: выбирает все элементы форм, которые доступны для взаимодействия

- `:disabled`: выбирает все элементы форм, которые НЕ доступны для взаимодействия

- `:checked`: выбирает все флажки (чекбоксы) и радиокнопки, которые отмечены

- `.class`: выбирает все элементы с классом `class`

- `#id`: выбирает все элементы с идентификтором `id`

- `:not(s)`: выбирает все элементы, которые не соответствуют селектору `s`

- `E F`: выбирает все элементы типа `F`, которые встречаются в элементах типа `E`

- `E > F`: выбирает все элементы типа `F`, которые являются вложенными в элементы типа `E`

- `E + F`: выбирает все элементы типа `F`, которые располагаются сразу после элементов типа `E`

- `E ~ F`: ввыбирает все элементы типа `F`, которые являются сестринскими по отношению к элементам типа `E`

#### Дополнительные замечания
Стоит отметить, что из всех этих способов выбор по id обычно самый быстрый. При всех прочих условиях лучше выбирать метод `getElementById()`.

Также для оптимизации работы с DOM для того, чтобы избежать повторной выборки одних и тех же элементов, при первой выборке их лучше сохранять в константы/переменные.

Ряд методов — `getElementsByTagName()`, `getElementsByClassName()`, `getElementsByName()`, `querySelectorAll()` — возвращает список элементов в виде объекта `NodeList`, который аналогичен массиву и который мы можем перебрать и получить каждый отдельный элемент из этого набора. Однако метод `querySelectorAll()` возвращает статический список `NodeList`, тогда как остальные методы возвращают нестатический список. В чем разница? При изменении элементов нестатического списка все модификации сразу же применяются к веб-странице. При изменении элементов из статического списка такие модификации могут примениться не сразу.[^8.2]

### Объект Node. Навигация по DOM
Каждый отдельный узел, будь то html-элемент, его атрибут или текст, в структуре DOM представлен объектом **`Node`**. Может возникнуть вопрос: как связаны элементы веб-страницы и узлы веб-страницы? И тут надо отметить, что любой элемент веб-страницы является узлом, но не любой узел является элементом (например, атрибуты и текст элементов также являются отдельными узлами).[^8.4]

Объект **`Node`** предоставляет ряд свойств, с помощью которых мы можем получить информацию о данном узле:

- **`childNodes`**: содержит коллекцию дочерних узлов

- **`children`**: содержит коллекцию дочерних узлов, которые являются элементами

- **`firstChild`**: возвращает первый дочерний узел текущего узла

- **`firstElementChild`**: возвращает первый дочерний узел, который является элементом

- **`lastChild`**: возвращает последний дочерний узел текущего узла

- **`lastElementChild`**: возвращает последний дочерний узел, который является элементом

- **`previousSibling`**: возвращает предыдущий узел, который находится на одном уровне с текущим

- **`nextSibling`**: возвращает следующий узел, который находится на одном уровне с текущим

- **`previousElementSibling`**: возвращает предыдущий узел, который является элементом и который находится на одном уровне с текущим

- **`nextElementSibling`**: возвращает следующий узел, который является элементом и который находится на одном уровне с текущим

- **`ownerDocument`**: возвращает корневой узел документа

- **`parentNode`**: возвращает родительский узел для текущего узла

- **`parentElement`**: возвращает родительский узел, который является элементом

- **`nodeName`**: возвращает имя узла

- **`nodeType`**: возвращает тип узла в виде числа

- **`nodeValue`**: возвращает текст текстового узла

Прежде всего мы можем использовать свойства **`nodeName`** и **`nodeType`**, чтобы узнать тип узла:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text</p>
    </div>
<script>
const article = document.getElementById("article");
console.log(article.nodeName);  // DIV
console.log(article.nodeType);  // 1
</script>
</body>
</html>
```

Здесь получаем информацию по элементу с `id="header"`. В частности, свойство `nodeName` возвратит имя тега элемента — **`div`**, а свойство `nodeType` — число 1. Каждому типу узлов соответствует определенное число:

| nodeType | Название константы          | Тип узла              | Описание                | nodeName           | nodeValue  |
| -------- | --------------------------- | --------------------- | ----------------------- | ------------------ | ---------- |
| 1        | `ELEMENT_NODE`                | Элемент               | HTML-элемент `<div>`, `<p>` | имя тега           | `null`       |
| 2        | `ATTRIBUTE_NODE`              | Атрибут               | `href="..."` (устарело)   | имя атрибута       | значение   |
| 3        | `TEXT_NODE`                   | Текст                 | Текст между тегами      | `#text`              | содержимое |
| 4        | `CDATA_SECTION_NODE`          | CDATASection          | `<![CDATA[...]]>`         | `#cdata-section`     | содержимое |
| 5        | `ENTITY_REFERENCE_NODE`       | `EntityReference`       | `&copy;`                  | имя сущности       | `null`       |
| 6        | `ENTITY_NODE`                 | `Entity`                | `<!ENTITY logo>`          | имя сущности       | `null`       |
| 7        | `PROCESSING_INSTRUCTION_NODE` | `ProcessingInstruction` | `<?xml-stylesheet?>`      | `target`             | содержимое |
| 8        | `COMMENT_NODE`                | `Comment`               | `<!-- комментарий -->`    | `#comment`           | текст      |
| 9        | `DOCUMENT_NODE`               | `Document`              | Корень документа        | `#document`          | `null`       |
| 10       | `DOCUMENT_TYPE_NODE`          | `DocumentType`          | `<!DOCTYPE html>`         | имя `DOCTYPE`        | `null`       |
| 11       | `DOCUMENT_FRAGMENT_NODE`      | `DocumentFragment`      | Временный контейнер     | `#document-fragment` | `null`       |
| 12       | `NOTATION_NODE`               | `Notation`              | `<!NOTATION GIF>`         | имя нотации        | `null`       |

RDF в контексте DOM не имеет специального `nodeType` — это формат данных (XML/RDFa/JSON-LD), парсится в обычные `Element`/`Text` узлы:
```xml
<!-- RDF/XML → ELEMENT_NODE (1) + TEXT_NODE (3) -->
<rdf:Description rdf:about="ivan">
  <foaf:name>Иван</foaf:name>  <!-- nodeType = 1, 3 -->
</rdf:Description>
```

Таким образом, `nodeType` определяет DOM-структуру, RDF — семантику данных внутри `Element`/`Text` узлов.

#### Получение родительского элемента
Для получения родительского элемента применяются свойства **`parentNode`** и **`parentElement`**. Например:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text</p>
    </div>
    <script>
    // выбираем все элемент c id="header"
    const header = document.getElementById("header");
    // получаем родительский элемента
    const headerParent = header?.parentElement;
    // можно так
    // const headerParent = header?.parentNode;
    console.log(headerParent);    // выводим родительский элемент на консоль
    </script>
</body>
</html>
```

Здесь выводим на консоль элемент, в который помещен элемент с `id="header"`.

Стоит отметить, что хотя оба метода в принципе возвращают один и тот же элемент, однако есть исключение — элемент `<html>`. Для него родительским узлом будет объект `document`, а вот родительского элемента у него не будет (будет значение `null`):
```js
const htmlEl = document.getElementsByTagName("html")[0];
const parentElem = htmlEl.parentElement;
const parentNode = htmlEl.parentNode;
console.log(parentElem);    // null
console.log(parentNode);    // объект document
```

#### Получение дочерних элементов
Метод **`hasChildNodes()`** возвращает `true`, если элемент содержит вложенные узлы:
```js
const article = document.querySelector("div");
if(article.hasChildNodes()){
    console.log("There are child nodes");
}
else{
    console.log("No child nodes");
}
```

Для получения дочерних элементов можно использовать свойство **`children`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM Vault</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text</p>
    </div>
<script>
// выбираем элемент c id="article"
const article = document.getElementById("article");

for(elem of article.children){
    console.log(elem);
}
</script>
</body>
</html>
```

Здесь получаем элемент с `id="article"` и в цикле проходим по всем его дочерним элементам. А это два элемента:
```html
<h1 id="header">Home Page</h1>
<p>Page Text</p>
```

Если же нам надо выбрать вообще все дочерние узлы (не только элементы, но и атрибуты и текст), то применяется метод **`childNodes`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text</p>
    </div>
<script>
// выбираем элемент c id="article"
const article = document.getElementById("article");

for(node of article.childNodes){
    let type = "";
    if(node.nodeType===1) type="элемент";
    else if(node.nodeType===2) type="атрибут";
    else if(node.nodeType===3) type="текст";

    console.log(node.nodeName, ": ", type);
}
</script>
</body>
</html>
```

Здесь мы выбираем тот же элемент, но теперь перебираем его узлы. Выбираем элемент `div` с классом `article` и пробегаемся по его дочерним узлам. И в цикле выводим имя узла и его тип с помощью свойств `nodeName` и `nodeType`.

И несмотря на то, что в блоке `div#article` только два элемента: заголовок `h1` и параграф, консоль отобразит нам пять узлов.

```
#text :  текст
H1 :  элемент
#text :  текст
P :  элемент
#text :  текст
```

Дело в том, что пробелы между узлами также считаются за отдельные текстовые узлы. Если бы пробелов не было:
```html
<div id="article"><h1 id="header">Home Page</h1><p>Page Text</p></div>
```

то при переборе мы бы обнаружили только два дочерних узла, как и ожидалось.

Кроме того, для получения первого и последнего узла/элемента применяются свойства **`firstChild`**/**`firstElementChild`** и **`lastChild`**/**`lastElementChild`** соответственно.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text</p>
    </div>
<script>
const article = document.getElementById("article");
console.log("First Child:", article.firstElementChild);
console.log("Last Child:", article.lastElementChild);
</script>
</body>
</html>
```

Консольный вывод:
```
First Child: <h1 id="header">Home Page</h1>​
Last Child: <p>Page Text</p>​
```

##### Количество элементов
Для получения количества дочерних элементов можно применять свойство **`childElementCount`**. Это значение будет эквивалентно значению `children.length`:
```js
const article = document.getElementById("article");
console.log(article.childElementCount); // 2
console.log(article.children.length); // 2
```

#### Получение элементов одного уровня
Свойства **`previousSibling`**/**`previousElementSibling`** и **`nextSibling`**/**`nextElementSibling`** позволяют получить предыдущий и следующий элементы, которые располагаются на одном уровне с текущим. Например:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p>Page Text 1</p>
        <p>Page Text 2</p>
        <p>Page Text 3</p>
    </div>
    <script>
    const article = document.getElementById("article");
    let tempNode = article.firstElementChild;
    while(tempNode != null){
        console.log(tempNode);
        tempNode = tempNode.nextElementSibling
    }
    </script>
</body>
</html>
```

Здесь опять же получаем элемент с `id="article"`. Затем получаем его первый элемент в переменную `tempNode` и в цикле, пока `tempNode` не будет равен `null`, выводим его значение на консоль и потом присваиваем этой переменной следующий элемент того же уровня (соседний элемент)
```js
tempNode = tempNode.nextElementSibling
```

Таким образом, мы перебирем все элементы одного уровня. Консольный вывод:
```
<h1 id="header">Home Page</h1>
<p>Page Text 1</p>
<p>Page Text 2</p>
<p>Page Text 3</p>
```

Также можно перебрать узлы в обратном порядке — сначала получаем последний узел, а затем обращаемся к предыдущему сестринскому узлу:
```js
const article = document.getElementById("article");
let tempNode = article.lastElementChild;
while(tempNode != null){
    console.log(tempNode);
    tempNode = tempNode.previousElementSibling;
}
```

#### nodeValue и получение текстового содержимого
Свойство **`nodeValue`** позволяет получить содержимое текстового узла, то есть его текст. Например:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <div id="article">
        <h1 id="header">Home Page</h1>
        <p id="text">Page Text</p>
    </div>
    <script>
    // получаем элемент с id="text"
    const pageText = document.getElementById("text");
    console.log(pageText.nodeValue);    // null
    for(textNode of pageText.childNodes){
        console.log(textNode.nodeValue);
    }
    </script>
</body>
</html>
```

В данном случае мы пытаемся получить текст элемента с `id="text"`. Сначала получаем данный элемент в константу `pageText`. Однако напрямую мы не можем у него вызвать у него свойство `nodeValue`. Если мы это сделаем, то получим **`null`**:
```js
console.log(pageText.nodeValue);    // null
```

Потому что полученный нами элемент не является текстовым узлом. Текстовый узел располагается внутри элемента `pageText`. И чтобы получить текст, нам надо обратиться к этому текстовому узлу через коллекцию `childNodes`:
```js
for(textNode of pageText.childNodes){
    console.log(textNode.nodeValue);
}
```

Хотя мы так можем получить текстовое содержимое элементов, но это не самый оптимальный способ, и далее мы рассмотрим другие способы.[^8.4]

### Элементы
Для работы с элементами на веб-странице мы можем использовать как функциональность типа `Node`, который представляет любой узел веб-страницы, так и функциональность типа **`HTMLElement`**, который собственно представляет элемент. То есть объекты `HTMLElement` — это фактически те же самые узлы — объекты `Node`, у которых тип узла (свойство `nodeType`) равно 1.

Каждый элемент веб-страницы соответствует определенному типу в JavaScript. Но все эти типы являются подтипами типа **`HTMLElement`**, который определяет базовую функциональность элементов. Вкратце перечислим актуальные типы элементов:

| Тег | Тип
-- | --
`<a>` | `HTMLAnchorElement`
`<abbr>` | `HTMLElement`
`<address>` | `HTMLElement`
`<area>` | `HTMLAreaElement`
`<audio>` | `HTMLAudioElement`
`<b>` | `HTMLElement`
`<base>` | `HTMLBaseElement`
`<bdo>` | `HTMLElement`
`<blockquote>` | `HTMLQuoteElement`
`<body>` | `HTMLBodyElement`
`<br>` | `HTMLBRElement`
`<button>` | `HTMLButtonElement`
`<caption>` | `HTMLTableCaptionElement`
`<canvas>` | `HTMLCanvasElement`
`<cite>` | `HTMLElement`
`<code>` | `HTMLElement`
`<col>`, `<colgroup`> | `HTMLTableColElement`
`<data>` | `HTMLDataElement`
`<datalist>` | `HTMLDataListElement`
`<dd>` | `HTMLElement`
`<del>` | `HTMLModElement`
`<dfn>` | `HTMLElement`
`<div>` | `HTMLDivElement`
`<dl>` | `HTMLDListElement`
`<dt>` | `HTMLElement`
`<em>` | `HTMLElement`
`<embed>` | `HTMLEmbedElement`
`<fieldset>` | `HTMLFieldSetElement`
`<form>` | `HTMLFormElement`
`<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` | `HTMLHeadingElement`
`<head>` | `HTMLHeadElement`
`<hr>` | `HTMLHRElement`
`<html>` | `HTMLHtmlElement`
`<i>` | `HTMLElement`
`<iframe>` | `HTMLIFrameElement`
`<img>` | `HTMLImageElement`
`<input>` | `HTMLInputElement`
`<ins>` | `HTMLModElement`
`<kbd>` | `HTMLElement`
`<keygen>` | `HTMLKeygenElement`
`<label>` | `HTMLLabelElement`
`<legend>` | `HTMLLegendElement`
`<li>` | `HTMLLIElement`
`<link>` | `HTMLLinkElement`
`<map>` | `HTMLMapElement`
`<media>` | `HTMLMediaElement`
`<meta>` | `HTMLMetaElement`
`<meter>` | `HTMLMeterElement`
`<noscript>` | `HTMLElement`
`<object>` | `HTMLObjectElement`
`<ol>` | `HTMLOListElement`
`<optgroup>` | `HTMLOptGroupElement`
`<option>` | `HTMLOptionElement`
`<output>` | `HTMLOutputElement`
`<p>` | `HTMLParagraphElement`
`<param>` | `HTMLParamElement`
`<pre>` | `HTMLPreElement`
`<progress>` | `HTMLProgressElement`
`<q>` | `HTMLQuoteElement`
`<s>` | `HTMLElement`
`<samp>` | `HTMLElement`
`<script>` | `HTMLScriptElement`
`<select>` | `HTMLSelectElement`
`<small>` | `HTMLElement`
`<source>` | `HTMLSourceElement`
`<span>` | `HTMLSpanElement`
`<strong>` | `HTMLElement`
`<style>` | `HTMLStyleElement`
`<sub>` | `HTMLElement`
`<sup>` | `HTMLElement`
`<table>` | `HTMLTableElement`
`<tbody>` | `HTMLTableSectionElement`
`<td>` | `HTMLTableCellElement`
`<textarea>` | `HTMLTextAreaElement`
`<tfoot>` | `HTMLTableSectionElement`
`<th>` | `HTMLTableHeaderCellElement`
`<thead>` | `HTMLTableSectionElement`
`<time>` | `HTMLTimeElement`
`<title>` | `HTMLTitleElement`
`<tr>` | `HTMLTableRowElement`
`<track>` | `HTMLTrackElement`
`<ul>` | `HTMLUListElement`
`<var>` | `HTMLElement` / `HTMLUnknownElement`
`<video>` | `HTMLVideoElement`

Мы можем получить конкретный тип элемента с помощью метода **`Object.getPrototypeOf()`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
    const header = document.getElementById("header");
    console.log(Object.getPrototypeOf(header)); // HTMLHeadingElement
    </script>
</body>
</html>
```

#### Свойства элементов
Тип `Element` предоставляет ряд свойств, которые хранят информацию об элементе:

- **`tagName`**: возвращает тег элемента

- **`textContent`**: представляет текстовое содержимое элемента

- **`innerText`**: представляет текстовое содержимое элемента (аналогично `textContent`)

- **`innerHTML`**: представляет html-код элемента

Одним из ключевых свойств объекта `Element` является свойство **`tagName`**, которое возвращает тег элемента:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
    const header = document.getElementById("header");
    console.log(header.tagName);  // H1
    </script>
</body>
</html>
```

#### Управление текстом элемента
Свойство **`textContent`** позволяет получить или изменить текстовое содержимое элемента:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
    const header = document.getElementById("header");
    // получаем текст элемента
    console.log(header.textContent);  // Home Page
    // изменяем текст элемента
    header.textContent = "Hello World";
    </script>
</body>
</html>
```

Аналогично можно использовать другое свойство для управление текстом — **`innerText`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
    const header = document.getElementById("header");
    // получаем текст элемента
    console.log(header.innerText);  // Home Page
    // изменяем текст элемента
    header.innerText = "Hello World2";
    </script>
</body>
</html>
```

Тем не менее между **`textContent`** и **`innerText`** есть некоторые различия:

- **`textContent`** получает содержимое всех элементов, включая `<script>` и `<style>`, тогда как **`innerText`** этого не делает

- **`innerText`** умеет считывать стили и не возвращает содержимое скрытых элементов, тогда как **`textContent`** этого не делает.

- **`innerText`** позволяет получить CSS, а **`textContent`** — нет.

#### Управление кодом HTML
Ни **`textContent`**, ни **`innerText`** не позволяют ни получить, ни изменить код html элемента. Например:
```js
header.innerText = "<span style='color:navy;'>Hello World</span>";
```

Это изменит только текст, но не html код. Для управления html применяется свойство **`innerHTML`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <h1 id="header">Home Page</h1>
    <script>
    const header = document.getElementById("header");
    // получаем html-код элемента
    console.log(header.innerHTML);  // Home Page
    // изменяем html-код элемента
    header.innerHTML = "<span style='color:navy;'>Hello World</span>";
    </script>
</body>
</html>
```

[^8.6]

### Создание, добавление, замена и удаление элементов
JavaScript предоставляет ряд методов для управления элементами на веб-страницы. В частности, мы можем создавать и добавлять новые элементы или заменять и удалять уже имеющиеся. Рассмотрим эти методы.[^8.5]

#### Создание элементов
Для создания элементов объект `document` имеет следующие методы:

- **`createElement(elementName)`**: создает элемент html, тег которого передается в качестве параметра. Возвращает созданный элемент

- **`createTextNode(text)`**: создает и возвращает текстовый узел. В качестве параметра передается текст узла.

Создадим элемент с помощью **`createElement`**:
```js
const header = document.createElement("h1");        // создаем заголовок <h1>
console.log(header);  // <h1></h1>
```

Таким образом, переменная `header` будет хранить ссылку на элемент `h1`.

Создадим текстовый узел с помощью **`createTextNode`**:
```js
const  headerText = document.createTextNode("Hello World"); // создаем текстовый узел
console.log( headerText);  // "Hello World"
```

#### Добавление элементов
Однако одного создания элементов недостаточно, их еще надо добавить на веб-страницу.

Для добавления элементов мы можем использовать один из методов объекта Node:

- **`appendChild(newNode)`**: добавляет новый узел `newNode` в конец коллекции дочерних узлов

- **`insertBefore(newNode, referenceNode)`**: добавляет новый узел `newNode` перед узлом `referenceNode`

##### appendChild
Используем метод **`appendChild()`**:
```js
const header = document.createElement("h1");        // создаем заголовок <h1>
const  headerText = document.createTextNode("Hello World"); // создаем текстовый узел
header.appendChild( headerText); // добавляем в элемент h1 текстовый узел
console.log(header);  // <h1>Hello World</h1>
```

И чтобы добавить созданный элемент на страницу, его надо добавить в уже имеющийся на странице элемент:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <script>
    constheader = document.createElement("h1");     // создаем заголовок <h1>
    const headerText = document.createTextNode("Hello World");  // создаем текстовый узел
    header.appendChild(headerText); // добавляем в элемент h1 текстовый узел
    document.body.appendChild(header);  // // добавляем элемент h1 на страницу в элемент body
    </script>
</body>
</html>
```

Сначала создаем обычный элемент заголовка `h2` и текстовый узел. Затем текстовый узел добавляем в элемент заголовка. Затем заголовок добавляем в элемент **`body`**:

![Добавление элемента на веб-страницу в JavaScript](../img/appendChild.png)

Стоит отметить, что нам необязательно для определения текста внутри элемента создавать дополнительный текстовый узел, так как мы можем воспользоваться свойством **`textContent`** и напрямую ему присвоить текст:
```js
const header = document.createElement("h1");        // создаем заголовок <h1>
header.textContent = "Hello World"; // определяем текст элемента
```

В этом случае текстовый узел будет создан неявно при установке текста.

##### insertBefore
Метод `appendChild()` добавляет элемент в конец контейнера. Чтобы более конкретизировать место для добавления, можно использовать другой метод — **`insertBefore()`**, который добавляет один элемент перед другим элементом. Например, у нас есть следующая страница:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <p>Text 1</p>
    <p>Text 2</p>
</body>
</html>
```

Допустим, нам надо добавить в элемент `body` перед первым параграфом заголовок. Мы можем сделать это так:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <p>Text 1</p>
    <p>Text 2</p>
    <script>
    const header = document.createElement("h1");        // создаем заголовок <h1>
    header.textContent = "Page Header"; // определяем текст элемента
    // получаем первый параграф
    const firstP = document.body.firstElementChild;
    // добавляем элемент h1 перед параграфом firstP
    document.body.insertBefore(header, firstP);
    </script>
</body>
</html>
```

![Добавление элемента на веб-страницу в JavaScript с помощью метода insertBefore](../img/appendChild2.png)

Если нам надо вставить новый узел на второе, третье или любое другое место, то нам надо найти узел, перед которым надо вставлять, с помощью комбинаций свойств `firstElementChild`/`lastElementChild` и `nextSibling`/`previousSibling`.

#### Копирование элемента
Иногда элементы бывают довольно сложными по составу, и гораздо проще их скопировать, чем с помощью отдельных вызовов создавать из содержимое. Для копирования уже имеющихся узлов у объекта `N`ode можно использовать метод **`cloneNode()`**:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1>Home Page</h1>
        <p>Text 1</p>
        <p>Text 2</p>
    </div>
    <script>
    const article = document.getElementById("article");
    // получаем последний параграф
    const lastP = article.lastElementChild;
    // клонируем элемент lastP
    const newLastP = lastP.cloneNode(true);
    // изменяем текст
    newLastP.textContent = "Publication Date: 28/10/2023";
    // добавляем в конец элемента article
    article.appendChild(newLastP);
    </script>
</body>
</html>
```

В метод `cloneNode()` в качестве параметра передается логическое значение: если передается `true`, то элемент будет копироваться со всеми дочерними узлами; если передается `false` — то копируется без дочерних узлов. То есть в данном случае мы копируем узел со всем его содержимым и потом добавляем в конец элемента c `id="article"`.

![Клонирование элементов веб-страницы в JavaScript](../img/cloneNode.png)

#### Замена элемента
Для замены элемента применяется метод **`replaceChild(newNode, oldNode)`** объекта `Node`. Этот метод в качестве первого параметра принимает новый элемент, который заменяет старый элемент oldNode, передаваемый в качестве второго параметра.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <p>Home Page</p>
        <p>Text 1</p>
        <p>Text 2</p>
    </div>
    <script>
    const article = document.getElementById("article");
    // находим узел, который будем заменять
    // пусть это будет первый элемент
    const oldNode = article.firstElementChild;
    // создаем новый элемент
    const newNode = document.createElement("h2");
    // определяем для него текст
    newNode.textContent = "Hello World";
    // заменяем старый узел новым
    article.replaceChild(newNode, oldNode);
    </script>
</body>
</html>
```

В данном случае заменяем первый элемент — первый параграф заголовком `h2`:

![Замена элемента веб-страницы в JavaScript](../img/replaceChild.png)

#### Удаление элемента
Для удаления элемента вызывается метод **`removeChild()`** объекта Node. Этот метод удаляет один из дочерних узлов:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>DevPM</title>
</head>
<body>
    <div id="article">
        <h1>Home Page</h1>
        <p>Text 1</p>
        <p>Text 2</p>
    </div>
    <script>
    const article = document.getElementById("article");
    // находим узел, который будем удалять - последний параграф
    const lastP = article.lastElementChild;
    // удаляем узел
    article.removeChild(lastP);
    </script>
</body>
</html>
```

В данном случае удаляется первый параграф из блока `div`

##### Удаление всех элементов
Иногда возникает необходимость удалить все элементы. Для этого перебираем все элементы контейнера и удаляем их:
```html
<div id="article">
    <h1>Home Page</h1>
    <p>Text 1</p>
    <p>Text 2</p>
</div>
<script>
const article = document.getElementById("article");
while(article.firstChild){
    article.removeChild(article.firstChild);
}
```

### Практическая работа. Реализация поведения "подсказка"

#### Задание
Напишите JS-код, реализующий поведение «подсказка».

При наведении мыши на элемент с атрибутом `data-tooltip`, над ним должна показываться подсказка и скрываться при переходе на другой элемент.

Пример HTML с подсказками:
```html
<button data-tooltip="эта подсказка длиннее, чем элемент">Короткая кнопка</button>
<button data-tooltip="HTML<br>подсказка">Ещё кнопка</button>
```

Иллюстрация результата:

![Tooltip](../img/tooltip_01.png)

Детали оформления:

1. Отступ от подсказки до элемента с `data-tooltip` должен быть 5px по высоте.
2. Подсказка должна быть, по возможности, посередине элемента.
3. Подсказка не должна вылезать за границы экрана, в том числе если страница частично прокручена, если нельзя показать сверху – показывать снизу элемента.
4. Текст подсказки брать из значения атрибута `data-tooltip`. Это может быть произвольный HTML.
5. В один момент может быть показана только одна подсказка.

Иллюстрация поведения:

![Tooltip](../img/tooltip_02.png)

![Tooltip](../img/tooltip_03.png)

![Tooltip](../img/tooltip_04.png)

![Tooltip](../img/tooltip_05.png)

Для решения понадобятся два события:

- `mouseover` срабатывает, когда указатель мыши заходит на элемент.
- `mouseout` срабатывает, когда указатель мыши уходит с элемента.

Применить делегирование событий: установить оба обработчика на элемент `document`, чтобы отслеживать «заход» и «уход» курсора на элементы с атрибутом `data-tooltip` и управлять подсказками с их же помощью.

Допустимо считать, что во всех элементах с атрибутом `data-tooltip` должен использоваться только текст, без вложенных тегов.

После реализации такого поведения люди, даже не знакомые с JavaScript должны иметь возможность добавлять подсказки к элементам.

### Источники информации
[^8.1]: [Введение в DOM](https://metanit.com/web/javascript/8.1.php)
[^8.3]: [Свойства объекта document](https://metanit.com/web/javascript/8.3.php)
[^8.2]: [Поиск элементов на веб-странице](https://metanit.com/web/javascript/8.2.php)
[^8.4]: [Объект Node. Навигация по DOM](https://metanit.com/web/javascript/8.4.php)
[^8.6]: [Элементы](https://metanit.com/web/javascript/8.6.php)
[^8.5]: [Создание, добавление, замена и удаление элементов](https://metanit.com/web/javascript/8.5.php)
