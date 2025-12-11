## События

- [События](#события)
  - [Программный вызов событий](#программный-вызов-событий)
  - [Определение своих событий](#определение-своих-событий)
    - [CustomEvent](#customevent)
  - [Источники информации](#источники-информации)

### Программный вызов событий
События могут возникать не только в следствие действий пользователя на веб-странице. События также можно генерировать программно.

Чтобы программно вызвать событие, у элемента на веб-странице можно вызвать метод `dispatchEvent()`, в который передается экземпляр объекта `Event` (либо его производные типа `MouseEvent` или `KeybordEvent`).

```js
const event = new Event(имя_события, config);   //  определяем объект события
element.dispatchEvent(event);   //   вызываем событие для элемента element
```

Первый аргумент, передаваемый конструктору `Event`, представляет собой строку — тип события. Дополнительно в качестве второго параметра можно передать объект конфигурации. В частности, с помощью объекта конфигурации можно определить следующие свойства:

- `cancelable`: можно ли событие отменить (если `true`, то отменяемое событие, `false` — неотменяемое)

- `bubbles`: должно ли событие быть восходящим (если `true`, то восходящее)

Например, программно нажмем на ссылку:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <a id="link" href="https://metanit.com">Metanit.com</a>
    <script>
    const link = document.getElementById("link");   // получаем ссылку
    const event = new MouseEvent("click");
    link.dispatchEvent(event);
    </script>
</body>
</html>
```

Нажатие на ссылку представляет событие мыши "click", поэтому определяем объект события типа `MouseEvent`:
```js
const event = new MouseEvent("click");
```

Затем вызываем событие для элемента `link`:
```js
link.dispatchEvent(event);
```

В итоге произойдет переход по ссылке уже при загрузке страницы.

И как в общем случае, это событие также можно обработать:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <a id="link" href="https://metanit.com">Metanit.com</a>
    <script>
    const link = document.getElementById("link");

    link.addEventListener("click", (e)=>{
        console.log("Link has been clicked");
        e.preventDefault();     // предупреждаем переход
    });

    const event = new MouseEvent("click", {cancelable:true});
    link.dispatchEvent(event);
    </script>
</body>
</html>
```

Чтобы выполнение события можно было остановить, в конструктор `MouseEvent` в качестве второго параметра передаем конфигурационных объект с одним свойством: `cancelable:true` указывает, что можно остановить обработку события. Благодаря этому в обработчике события "click" можно вызвать метод `e.preventDefault()`.[^9.7]

### Определение своих событий
Возможность программной генерации событий открывает нам путь к созданию кастомных событий — мы можем определять и вызывать произвольные события.[^9.8]

Например, у нас есть функция-конструктор `Account`, которая принимает количество денег и создает условный денежный счет:
```js
function Account(money) {
    _money = money;
    this.pay=function(sum){
        if(_money >= sum){
            _money -= sum;
            console.log(_money);
        }
    }
}
```

В переменной `_money` хранится текущее количество денег на счете. С помощью функции pay условно тратим определенную сумму, если баланс позволяет. Но, допустим, нам надо как-то извещать систему, что произошло списание со счета. С одно стороны, мы могли бы это делать непосредственно в методе `pay` — вызывать в методе `console.log()` и выводить на консоль какой-то текст. Но на момент написания этого кода мы можем быть не уверены, какой именно текст надо выводить на консоль. А может быть потребуется и не на консоль, а в окне браузере. Или посылать извещение на определенный сетевой ресурс. А может наша функция-конструктор будет использоваться в Node.js, где может потребоваться какая-то другая обработка. Да и использовать нашу функцию-конструктор могут совсем другие разработчики, у которых может быть собственно понимание того, что надо делать при списании средств. В любом случае мы сталкиваемся с многовариантностью, но во всех этих ситуация главное, что нам надо сделать — уведомить систему, что произошло списание средств. И охватить все эти ситуации нам поможет определение собственных событий.

Для определения кастомных событий мы можем применять конструктор **`Event`**, в который передается название события. Так, рассмотрим следующую программу:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>METANIT.COM</title>
</head>
<body>
    <button id="btn">Pay</button>
    <script>
    const button = document.getElementById("btn");
    const myAcc = new Account(100); // условный денежный счет
    // устанавливаем обработчик события payment для всего документа
    document.addEventListener("payment", ()=>console.log("Payment succeeded!"));

    // по нажатию на кнопку выполняем метод pay
    button.addEventListener("click", ()=>myAcc.pay(50));
    // конструктор объекта счета
    function Account(money) {
        _money = money;
        this.pay=function(sum){
            if(_money >= sum){
                _money -= sum;
                console.log(_money);

                const event = new Event("payment"); // определяем объект события
                document.dispatchEvent(event);      // генерируем событие для всего документа
            }
        }
    }
    </script>
</body>
</html>
```

Основные моменты. В методе `pay` создаем объект `Event`, которое будет представлять событие "payment" (не важно, что такого события изначально не существует, мы сами его создаем). Затем генерируем это событие:
```js
const event = new Event("payment"); // определяем объект события
document.dispatchEvent(event);      // генерируем событие для всего документа
```

Стоит отметить, что событие генерируется для всего документа: **`document`**.`dispatchEvent(event)`, но это может быть любой конкретный элемент веб-страницы.

Чтобы обработать это событие, подписываемся на него:
```js
document.addEventListener("payment", ()=>console.log("Payment succeeded!"));
```

Опять же подписка на событие производится для всего документа. Обработчик события просто выводит строку на консоль.

По нажатию на кнопку вызываем метод pay объекта myAcc и тем самым генерируем событие "payment" (если на счете достаточно средств).

Для тестирования понажимаем на кнопку:

![Создание своих событий в JavaScript](../img/customevent1.png)

Также, как и в общем случае, мы можем получить объект подобное события в обработчике:
```js
// получаем через параметр e объект события
document.addEventListener("payment", (e)=>{
    console.log(e.type);                //  payment
    console.log("Payment succeeded!");
});
```

#### CustomEvent
Однако тип `Event` хотя и может использоваться, но не очень подходит для определения кастомных событий. Например, что, если мы хотим передать в обработчик события какую-то дополнительную информацию — сумму списания, текущий баланс или что-то еще? И для подобных случаев лучше использовать тип **`CustomEvent`**. Так, изменим код JavaScript следующим образом:
```js
const button = document.getElementById("btn");
document.addEventListener("payment", (e)=>{
    console.log("Payment succeeded!");
    console.log("Payment Sum:", e.detail.paymentSum);   // получаем данные события
    console.log("Current balance:", e.detail.balance);
});

const myAcc = new Account(100);
// по нажатию на кнопку выполняем метод pay
button.addEventListener("click", ()=>myAcc.pay(50));

function Account(money) {
    _money = money;
    this.pay=function(sum){
        if(_money >= sum){
            _money -= sum;
            // определяем объект события
            const event = new CustomEvent("payment", {
                detail:{                //  передаем в CustomEvent данные о событии
                    paymentSum: sum,
                    balance: _money
                }
            });
            document.dispatchEvent(event);      // генерируем событие для всего документа
        }
    }
}
```

В `CustomEvent` в качестве второго параметра передается конфигурационный объект, который имеет свойство **`detail`**. Это свойство в свою очередь представляет объект с произвольным набором свойств. В данном случае мы определяем в нем свойства `paymentSum` и `balance` и передаем этим свойствам интересующие нас значения:
```js
const event = new CustomEvent("payment", {
    detail:{
        paymentSum: sum,
        balance: _money
    }
});
```

Далее передаем объект `CustomEvent` (как и `Event`) в `dispatchEvent` и тем самым генерируем событие:
```js
document.dispatchEvent(event);
```

При обработке события мы можем получить переданные данные через свойство `detail`:
```js
document.addEventListener("payment", (e)=>{
    console.log("Payment succeeded!");
    console.log("Payment Sum:", e.detail.paymentSum);   // получаем данные события
    console.log("Current balance:", e.detail.balance);
});
```

Пример консольного вывода при первом нажатии кнопки:
```
Payment succeeded!
Payment Sum: 50
Current balance: 50
```

Подобным образом можно определять и другие события. Например, определим еще одно событие на случай, если средств недостаточно для совершения платежа:
```js
const button = document.getElementById("btn");
document.addEventListener("payment_success", (e)=>{
    console.log("Payment succeeded!");
    console.log("Payment Sum:", e.detail.paymentSum);
    console.log("Current balance:", e.detail.balance);
});
document.addEventListener("payment_fail", (e)=>{
    console.error("Payment failed");
    console.error("Current balance:", e.detail.balance, "Requested Sum: ", e.detail.paymentSum);
});
const myAcc = new Account(100);
button.addEventListener("click", ()=>myAcc.pay(50));

function Account(money) {
    _money = money;
    this.pay=function(sum){
        const data = {
            paymentSum: sum,
            balance: _money
        };
        if(_money >= sum){
            _money -= sum;

            const event = new CustomEvent("payment_success", {
                detail: data
            });
            document.dispatchEvent(event);
        }
        else{
            const event = new CustomEvent("payment_fail", {
                detail: data
            });
            document.dispatchEvent(event);
        }
    }
}
```

Теперь, если средст достаточно на счете генерируется событие "payment_success", а если недостаточно — то "payment_fail". И для каждого из этих событий определяем свой обработчик.

консольный вывод программы (при трех нажатиях на кнопку):
```
Payment succeeded!
Payment Sum: 50
Current balance: 100
Payment succeeded!
Payment Sum: 50
Current balance: 50
Payment failed
Current balance: 0 Requested Sum:  50
```

### Источники информации
[^9.7]: [Программный вызов событий](https://metanit.com/web/javascript/9.7.php)
[^9.8]: [Определение своих событий](https://metanit.com/web/javascript/9.8.php)
