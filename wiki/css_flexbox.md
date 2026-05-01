<link href="../styles.css" rel="stylesheet" />

# Flexbox

- [Что такое Flexbox. Flex Container](#что-такое-flexbox-flex-container)
  - [Основные понятия](#основные-понятия)
  - [Создание flex-контейнера](#создание-flex-контейнера)
- [Свойство display: flex](#свойство-display-flex)
- [Использование flexbox](#использование-flexbox)
- [Практика](#практика)
  - [Практическая работа. Разработка гибкого макета](#практическая-работа-разработка-гибкого-макета)
    - [Задание](#задание)
- [Глоссарий](#глоссарий)
- [Источники информации](#источники-информации)

## Что такое Flexbox. Flex Container
Долгое время веб-интерфейсы были статичными — сайты разрабатывались и просматривались только на экранах мониторов стационарных компьютеров. Однако с десяток лет назад, совсем недавно по историческим меркам, у нас появилось огромное разнообразие экранов — от мобильных телефонов до телевизоров, — на которых мы можем взаимодействовать с сайтами.

Идея флексбоксов появилась ещё в 2009 году, и этот стандарт до сих пор развивается и прорабатывается. Основная идея флексов — гибкое распределение места между элементами, гибкая расстановка, выравнивание, гибкое управление. Ключевое слово — гибкое, что и отражено в названии (*flex* — англ. гибко).[^flexbox-guide]

<dfn title="flexbox">Flexbox</dfn> — это общее название для модуля **Flexible Box Layout**, который имеется в CSS3. Данный модуль определяет особый режим компоновки/верстки пользовательского интерфейса, который называется **flex layout**. В этом плане Flexbox предоставляет иной подход к созданию пользовательского интерфейса, который отличается от табличной или блочной верстки. Развернутое описание стандарта по модулю можно посмотреть в [спецификации](https://drafts.csswg.org/css-flexbox/).

Благодаря Flexbox проще создавать сложные, комплексные интерфейсы, где мы с легкостью можем переопределять направление и выравнивание элементов, создавать адаптивные табличные представления. Кроме того, Flexbox довольно прост в использовании. Единственная проблема, которая может возникнуть при его применении, — это кроссбраузерность. Например, в Internet Explorer поддержка Flexbox и то частичная появилась только в последней версии — IE11. В то же время все современные браузеры, в том числе Microsoft Edge, Opera, Google Chrome, Safari, Firefox, имеют полную поддержку данного модуля.

Основными составляющими компоновки flexbox являются flex-контейнер (*flex container*) и flex-элементы (*flex items*). <dfn title="flex-контейнер">Flex container</dfn> представляет некоторый элемент, внутри которого размещены flex-элементы.[^12.1]

### Основные понятия
Прежде чем переходить к изучению верстки flexbox, стоит рассмотреть некоторые основные понятия.

Одно из ключевых понятий представляет **main axis** или центральная ось. Это условная ось во flex-контейнере, вдоль которой позиционируются flex-элементы.

![Main axis и cross axiss в flexbox и css 3](../img/flexbox21.png)

Элементы в контейнере могут располагаться по горизонтали в виде строки и по вертикали в виде столбца. В зависимости от типа расположения будет меняться и центральная ось. Если расположение в виде строки, то центральная ось направлена горизонтально слева направо. Если расположение в виде столбца, то центральная ось направлена вертикально сверху вниз.

Термины **main start** и **main end** описывают соответственно начало и конец центральной оси, а расстояние между между ними обозначается как **main size**.

Кроме основной оси существует также поперечная ось или **cross axis**. Она перпендикулярна основной. При расположении элементов в виде строки cross axis направлена сверху вниз, а при расположении в виде столбца она направлена слева направо. Начало поперечной оси обозначается как **cross start**, а ее конец — как **cross end**. Расстояние между ними описывается термином **cross size**.

То есть, если элементы располагаются в строку, то main size будет представлять ширину контейнера или элементов, а cross size — их высоту. Если же элементы располагаются в столбик, то, наоборот, main size представляет высоту контейнера и элементов, а cross size — их ширину.

### Создание flex-контейнера
Для создания flex-контейнера необходимо присвоить его стилевому свойству **`display`** одно из двух значений: **`flex`** или **`inline-flex`**.

Создадим простейшую веб-страницу, которая применяет flexbox:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Flexbox в CSS3</title>
        <style>
            .flex-container {
                display: flex;
            }
            .flex-item {
                text-align:center;
                font-size: 1.1em;
                padding: 1.5em;
                color: white;
            }
            .color1 {background-color: #675BA7;}
            .color2 {background-color: #9BC850;}
            .color3 {background-color: #A62E5C;}
        </style>
    </head>
    <body>
        <div class="flex-container">
            <div class="flex-item color1">Flex Item 1</div>
            <div class="flex-item color2">Flex Item 2</div>
            <div class="flex-item color3">Flex Item 3</div>
        </div>
    </body>
</html>
```

Для контейнера `flex-container` установлено свойство `display:flex`. В нем располагается три flex-элемента.

![Flex Container в CSS3](../img/flexbox1.png)

Если значение `flex` определяет контейнер как блочный элемент, то значение `inline-flex` определяет элемент как строчный (`inline`). Рассмотрим оба способа на примере:
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Flexbox в CSS3</title>
        <style>
            .flex-container {
                display: flex;
                border:2px solid #ccc;
            }
            .inline-flex-container {
                display: inline-flex;
                border:2px solid #ccc;
                margin-top:10px;
            }
            .flex-item {
                text-align:center;
                font-size: 1.1em;
                padding: 1.5em;
                color: white;
            }
            .color1 {background-color: #675BA7;}
            .color2 {background-color: #9BC850;}
            .color3 {background-color: #A62E5C;}
        </style>
    </head>
    <body>
        <div class="flex-container">
            <div class="flex-item color1">Flex Item 1</div>
            <div class="flex-item color2">Flex Item 2</div>
            <div class="flex-item color3">Flex Item 3</div>
        </div>

        <div class="inline-flex-container">
            <div class="flex-item color1">Flex Item 1</div>
            <div class="flex-item color2">Flex Item 2</div>
            <div class="flex-item color3">Flex Item 3</div>
        </div>
    </body>
</html>
```

![inline-flex и flexbox в CSS3](../img/flexbox2.png)

В частности, в первом случае flex-контейнер растягивается по ширине страницы, а во втором случае занимает именно столько места, сколько необходимо для flex-элементов.[^12.1]

## Свойство display: flex
Во flex-верстке у вас есть основной контейнер и вложенные в него элементы
Некоторые flex-свойства CSS используются лишь для родительского элемента.
Остальные — только в отдельных случаях.

![Flex container](../img/flex-container.png)

Можно представить flex-элемент как родительский контейнер с помощью свойства
`display: flex`. Внутри данного контейнера размещаются элементы. Каждый контейнер
имеет точки начала и конца `flex-start` и `flex-end`, что и показано на рисунке.

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title></title>
    <style>
        .isflex {
            display: flex;
        }
    </style>
</head>
<body>
    <div class="isflex">
        <p> Первый элемент </p>
        <p>Второй элемент </p>
        <p>Третий элемент</p>
        <p>Четверты элемент</p>
        <div>это div</div>
    </div>
</body>
</html>
```

## Использование flexbox

![Flexbox](../img/flex_01-1.png)
![Flexbox](../img/flex_01-2.png)
![Flexbox](../img/flex_01-3.png)

*Рассмотрим свойства для flex-контейнера*

![Flexbox](../img/flex_02-1.png)
![Flexbox](../img/flex_02-2.png)
![Flexbox](../img/flexbox_1.png)

![Flexbox](../img/flex_03-1-1.png)
![Flexbox](../img/flex_03-2.png)
![Flexbox](../img/flexbox_2.png)

![Flexbox](../img/flex_04-1.png)
![Flexbox](../img/flex_04-2.png)
![Flexbox](../img/flexbox_3.png)

![Flexbox](../img/flex_05-1.png)
![Flexbox](../img/flex_05-2.png)
![Flexbox](../img/flexbox_4.png)

![Flexbox](../img/flex_06-1.png)
![Flexbox](../img/flex_06-2.png)
![Flexbox](../img/flexbox_5.png)

![Flexbox](../img/flex_07-1.png)
![Flexbox](../img/flex_07-2.png)
![Flexbox](../img/flexbox_6.png)

*По умолчанию элементы выстраиваются по горизонтали*

![Flexbox](../img/flex_08-1.png)
![Flexbox](../img/flex_08-2.png)
![Flexbox](../img/flexbox_7.png)

![Flexbox](../img/flex_09-1.png)
![Flexbox](../img/flex_09-2.png)
![Flexbox](../img/flexbox_8.png)

![Flexbox](../img/flex_10-1.png)
![Flexbox](../img/flex_10-2.png)
![Flexbox](../img/flexbox_9.png)

![Flexbox](../img/flex_11-1.png)
![Flexbox](../img/flex_11-2.png)

*Добавили контент во второй блок. Теперь он стал выше других*

![Flexbox](../img/flex_11-1.png)
![Flexbox](../img/flexbox_10.png)

*Выравнивание по вспомогательной оси (вертикально)*

![Flexbox](../img/flex_12.png)
![Flexbox](../img/flexbox_11.png)

![Flexbox](../img/flex_13.png)
![Flexbox](../img/flexbox_12.png)

![Flexbox](../img/flex_14.png)
![Flexbox](../img/flexbox_13.png)

![Flexbox](../img/flexbox_14.png)
![Flexbox](../img/flex_15.png)

![Flexbox](../img/flex_16.png)
![Flexbox](../img/flexbox_15.png)

![Flexbox](../img/flex_16.png)
![Flexbox](../img/flex_17.png)

![Flexbox](../img/flex_17_2.png)
![Flexbox](../img/flexbox_16.png)

![Flexbox](../img/flex_17_3.png)
![Flexbox](../img/flexbox_16.png)

![Flexbox](../img/flex_05-1.png)
![Flexbox](../img/flex_18-1.png)

![Flexbox](../img/flex_18-2.png)
![Flexbox](../img/flexbox_17.png)

![Flexbox](../img/flex_18-3.png)
![Flexbox](../img/flexbox_17.png)

![Flexbox](../img/flex_11-1.png)
![Flexbox](../img/flex_19.png)

*Рассмотрим свойства для flex-элемента*

![Flexbox](../img/flex_20-1.png)
![Flexbox](../img/flex_20-2.png)

![Flexbox](../img/flex_21-1.png)
![Flexbox](../img/flex_21-2.png)

![Flexbox](../img/flex_22-1.png)
![Flexbox](../img/flex_22-2.png)

![Flexbox](../img/flex_23-1.png)
![Flexbox](../img/flex_23-2.png)

![Flexbox](../img/flex_24-1.png)
![Flexbox](../img/flex_24-2.png)

![Flexbox](../img/flex_25-1.png)
![Flexbox](../img/flex_25-2.png)

![Flexbox](../img/flex_26-1.png)
![Flexbox](../img/flex_26-2.png)

*Увеличиваем размер относительно базового размера*

![Flexbox](../img/flex_27-1.png)
![Flexbox](../img/flex_27-2.png)

![Flexbox](../img/flex_28-1.png)
![Flexbox](../img/flex_28-2.png)

*Показывает, можно ли становиться меньше*

![Flexbox](../img/flex_28-3.png)
![Flexbox](../img/flex_28-2.png)

![Flexbox](../img/flex_29-1.png)
![Flexbox](../img/flex_29-2.png)

![Flexbox](../img/flex_29-1.png)
![Flexbox](../img/flex_29-3.png)

![Flexbox](../img/flex_30-1.png)
![Flexbox](../img/flex_30-2.png)

![Flexbox](../img/flex_31-1.png)
![Flexbox](../img/flex_31-2.png)

![Flexbox](../img/flex_32-1.png)
![Flexbox](../img/flex_32-2.png)

![Flexbox](../img/flex_33-1.png)
![Flexbox](../img/flex_30-3.png)

![Flexbox](../img/flex_34-1.png)
![Flexbox](../img/flex_34-2.png)

![Flexbox](../img/flex_35-1.png)
![Flexbox](../img/flex_35-2.png)

![Flexbox](../img/flex_36-1.png)
![Flexbox](../img/flex_36-2.png)

![Flexbox](../img/flex_37-1.png)
![Flexbox](../img/flex_37-2.png)

![Flexbox](../img/flex_38-1.png)
![Flexbox](../img/flex_38-2.png)

![Flexbox](../img/flex_39-1.png)
![Flexbox](../img/flex_39-2.png)

![Flexbox](../img/flex_40-1.png)
![Flexbox](../img/flex_40-2.png)

## Практика

### Практическая работа. Разработка гибкого макета

#### Задание
Создать веб-страницу, оформленную в соответствии с прилагаемым образцом. Основные требования:

1. Задействовать семантические элементы HTML5.
2. Для компоновки использовать только гибкую модель расстановки (CSS flexbox).
3. Стили организовать в элементе `<style>` внутри документа.
4. В теге `<title>` указать свои фамилию и инициалы, а также номер группы.
5. В шапке указать номер группы.
6. Навигационная панель должна фиксироваться вверху при прокручивании страницы.
7. Ширина блоков внутри основного содержимого должна быть в диапазоне от 200 до 500 пикселей.
8. В карточках основной части указать время начала и окончания выполнения работы.
9. Базис основной секции равен 1000 пикселям, боковых — 300 пикселям. Боковые секции не должны сжиматься меньше своего базиса.
10. Компоновка должна быть адаптивной (автоматически подстраиваться под разную ширину экрана).
11. При переносе верхние меню в навигационной панели должны меняться местами.
12. Подвал должен всегда занимать нижнее положение, при недостаточной высоте страницы высота основной части должна увеличиваться автоматически, заполняя необходимое пространство.
13. Маркеры списка в подвале выполнить с помощью псевдоэлементов.
14. В подвале указать группу и компоненты полного имени исполнителя.

Примеры изменения внешнего вида в зависимости от разной ширины экрана приведены во вложении. Результат приложить в виде единого файла формата html (со стилями внутри).

![Layout 768](../img/layout_2-05-768.png)

![Layout 1440](../img/layout_2-05-1440.png)

![Layout 1920](../img/layout_2-05-1920.png)

[Исходный код](../src/css/05_flex_layout/index.html)

## Глоссарий
Flexbox
: общее название для модуля **Flexible Box Layout**, который имеется в CSS3. Данный модуль определяет особый режим компоновки/верстки пользовательского интерфейса, который называется **flex layout**. В этом плане Flexbox предоставляет иной подход к созданию пользовательского интерфейса, который отличается от табличной или блочной верстки.

Flex-контейнер (flex container)
: некоторый элемент, внутри которого размещены flex-элементы.

## Источники информации
[^12.1]: [Что такое Flexbox. Flex Container](https://metanit.com/web/html5/12.1.php)
[^flexbox-guide]: [Гайд по flexbox](https://doka.guide/css/flexbox-guide/)
