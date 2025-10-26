/* Создайте функцию, которая принимает имя пользователя и возвращает приветственное сообщение с этим именем (например, «Привет, Иван!»).
 *  В случае отсутствующего аргумента, nullish-значений или пустой строки выводить «Привет, гость!»
 */

function greetUser(name = "гость") {
    let out = name === '' ? null : name;
    return `Привет, ${out ?? "гость"}!`;
}

/* Test data
"Иван"      => "Привет, Иван!"
""          => "Привет, гость!"
undefined   => "Привет, гость!"
null        => "Привет, гость!"
123         => "Привет, 123!"
true        => "Привет, true!"
*/

/* Tests */
console.log(greetUser('Иван'));     // Привет, Иван!
console.log(greetUser(123));        // Привет, 123!
console.log(greetUser(true));       // Привет, true!
console.log(greetUser(false));      // Привет, false!
console.log(greetUser());           // Привет, гость!
console.log(greetUser(""));         // Привет, гость!
console.log(greetUser(undefined));  // Привет, гость!
console.log(greetUser(null));       // Привет, гость!
console.log(greetUser(0));     // Привет, Иван!
