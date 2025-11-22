// Базовый объект Vehicle
function Vehicle() {}

Vehicle.prototype.start = function() {
  console.log("Транспортное средство запущено");
};

Vehicle.prototype.stop = function() {
  console.log("Транспортное средство остановлено");
};

// Объект Car, наследующий от Vehicle
function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.honk = function() {
  console.log("Бип-бип!");
};

// Объект Bicycle, наследующий от Vehicle
function Bicycle() {}
Bicycle.prototype = Object.create(Vehicle.prototype);
Bicycle.prototype.constructor = Bicycle;

Bicycle.prototype.ringBell = function() {
  console.log("Дзинь-дзинь!");
};

// Расширение прототипа Car методом openTrunk
Car.prototype.openTrunk = function() {
  console.log("Багажник открыт");
};

// Проверка работы
const myCar = new Car();
const myBike = new Bicycle();

myCar.start();      // Транспортное средство запущено
myCar.honk();       // Бип-бип!
myCar.openTrunk();  // Багажник открыт
myCar.stop();       // Транспортное средство остановлено

myBike.start();     // Транспортное средство запущено
myBike.ringBell();  // Дзинь-дзинь!
myBike.stop();      // Транспортное средство остановлено
