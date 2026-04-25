console.log("main");

const output = document.getElementById("out");

function foo() {
    console.log("foo");
    console.log(output);
    output.innerHTML += " Hello, I'm foo!";
}
