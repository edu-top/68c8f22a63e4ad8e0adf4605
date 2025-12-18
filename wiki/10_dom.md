## Объектная модель документа

- [Объектная модель документа](#объектная-модель-документа)
  - [Введение в DOM](#введение-в-dom)
    - [Редкие типы узлов XML DOM](#редкие-типы-узлов-xml-dom)
    - [XSLT-стили](#xslt-стили)
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
