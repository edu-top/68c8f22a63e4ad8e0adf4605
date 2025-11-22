// 1. Прототип employeeProto с методами
const employeeProto = {
    getDetails() {
      return `${this.name} — ${this.position}`;
    },
    changePosition(newPosition) {
      this.position = newPosition;
    }
  };

  // 2. Создание сотрудников с Object.create
  const emp1 = Object.create(employeeProto);
  emp1.name = "Иван";
  emp1.position = "Разработчик";
  emp1.salary = 50000;

  const emp2 = Object.create(employeeProto);
  emp2.name = "Петр";
  emp2.position = "Тестировщик";
  emp2.salary = 40000;

  // 3. Функция для вывода деталей массива сотрудников
  function printEmployeeDetails(employees) {
    employees.forEach(e => console.log(e.getDetails()));
  }

  // Используем функцию для вывода
  printEmployeeDetails([emp1, emp2]);

  // 4. Проверка прототипных методов
  console.log(emp1.hasOwnProperty('getDetails')); // false
  console.log(emp1.hasOwnProperty('name')); // true

  // 5. managerProto наследует employeeProto, добавлен метод assignTask
  const managerProto = Object.create(employeeProto);
  managerProto.assignTask = function(employee, task) {
    console.log(`Менеджер ${this.name} назначил задачу '${task}' сотруднику ${employee.name}`);
  };

  // 6. Конструктор Employee
  function Employee(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
  Employee.prototype = employeeProto;
  Employee.prototype.constructor = Employee;

  // 7. Конструктор Manager наследует от Employee, с managerProto
  function Manager(name, position, salary, department) {
    Employee.call(this, name, position, salary);
    this.department = department;
  }
  Manager.prototype = managerProto;
  Manager.prototype.constructor = Manager;

  // 8. Создаем сотрудников и менеджера
  const e1 = new Employee("Алексей", "Разработчик", 60000);
  const e2 = new Employee("Мария", "Дизайнер", 55000);
  const m1 = new Manager("Ольга", "Менеджер проектов", 80000, "IT");

  // Демонстрация работы методов
  console.log(e1.getDetails());
  m1.assignTask(e1, "Разработать интерфейс");
  m1.assignTask(e2, "Создать макеты");

  e1.changePosition("Старший разработчик");
  console.log(e1.getDetails());

  // 9. Класс Worker
  class Worker {
    constructor(name, surname, rate, days) {
      this.name = name;
      this.surname = surname;
      this.rate = rate;
      this.days = days;
    }
  
    getSalary() {
      return this.rate * this.days;
    }

    getFullName() {
      return `${this.surname} ${this.name}`;
    }
  }
  
  // 10. Класс Boss наследует от Worker с новым свойством workers и переопределенным getSalary
  class Boss extends Worker {
    constructor(name, surname, rate, days, workers) {
      super(name, surname, rate, days);
      this.workers = workers;
    }

    getSalary() {
      return this.rate * this.days * this.workers;
    }
  }

  // 11. Создание и вывод
  const worker = new Worker("Иван", "Иванов", 10, 31);
  console.log(worker.name); // Иван
  console.log(worker.surname); // Иванов
  console.log(worker.getFullName()); // Иванов Иван
  console.log(worker.rate); // 10
  console.log(worker.days); // 31
  console.log(worker.getSalary()); // 310

  const boss = new Boss("Иван", "Иванов", 10, 31, 10);
  console.log(boss.name); // Иван
  console.log(boss.surname); // Иванов
  console.log(boss.getFullName()); // Иванов Иван
  console.log(boss.rate); // 10
  console.log(boss.days); // 31
  console.log(boss.workers); // 10
  console.log(boss.getSalary()); // 3100
