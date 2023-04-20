// Объявление функции f1, которая выводит сообщение "f1" в консоль
function f1() {
    console.log("f1")
}

// Объявление функции f2, которая выводит сообщение "f2" в консоль
function f2() {
    console.log("f2")
}

// Объявление функции f3, которая выводит сообщение "f3" в консоль
function f3() {
    console.log("f3")
}

// Объявление функции main, которая вызывается при запуске программы
function main() {
    console.log("main")
    
// Выполнение функций f1 и f3 через 50 мс после вызова функции main с помощью метода setTimeout
    setTimeout(f1, 50);
    setTimeout(f3, 50);

// Создание нового промиса, который сразу же резолвится с сообщением "I am a Promise, right after f1 and f3! Really?"
// и выводит это сообщение в консоль в методе then
    new Promise((resolve, reject) =>
            resolve("I am a Promise, right after f1 and f3! Really?")
           ).then(resolve => console.log(resolve))

// Создание нового промиса, который сразу же резолвится с сообщением "I am a Promise after Promise!"
// и выводит это сообщение в консоль в методе then
    new Promise((resolve, reject) =>
            resolve("I am a Promise after Promise!")
           ).then(resolve => console.log(resolve))

// Выполнение функции f2, которая выводит сообщение "f2" в консоль
    f2();
}

main()