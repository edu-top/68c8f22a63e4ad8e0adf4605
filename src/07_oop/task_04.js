// Прототип Employee
const employeeProto = {
  getDetails() {
    return `${this.name}, должность: ${this.position}`;
  },
  changePosition(newPosition) {
    this.position = newPosition;
  }
};

// Прототип Manager наследует от Employee
const managerProto = Object.create(employeeProto);
managerProto.assignTask = function(employee, task) {
  if (!employee.tasks) employee.tasks = [];
  employee.tasks.push(task);
  console.log(`${this.name} назначил задачу '${task}' сотруднику ${employee.name}`);
};

// Конструктор Employee
function Employee(name, position, salary) {
  this.name = name;
  this.position = position;
  this.salary = salary;
}
Employee.prototype = employeeProto;
Employee.prototype.constructor = Employee;

// Конструктор Manager наследует Employee
function Manager(name, position, salary, department) {
  Employee.call(this, name, position, salary);
  this.department = department;
}
Manager.prototype = Object.create(employeeProto);
Manager.prototype.constructor = Manager;
// Расширяем прототип Manager методами
Object.assign(Manager.prototype, managerProto);

// Создаем объекты
const emp1 = new Employee('Иван', 'Разработчик', 50000);
const emp2 = new Employee('Мария', 'Тестировщик', 45000);

const mgr = new Manager('Алексей', 'Руководитель отдела', 90000, 'ИТ');

// Использование методов
console.log(emp1.getDetails()); // Иван, должность: Разработчик
emp1.changePosition('Старший разработчик');
console.log(emp1.getDetails()); // Иван, должность: Старший разработчик

console.log(mgr.getDetails()); // Алексей, должность: Руководитель отдела
mgr.assignTask(emp1, 'Реализовать новую фичу');
mgr.assignTask(emp2, 'Провести нагрузочное тестирование');

console.log(emp1.tasks); // ['Реализовать новую фичу']
console.log(emp2.tasks); // ['Провести нагрузочное тестирование']
