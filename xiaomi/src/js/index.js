for(var i = 0; i<10; i++) {
    console.log(i)
}
console.log('hello worl')
let num = 100;
console.log(num)
let res = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log(123)
        resolve('hahaha')
    }, 1)
})
res.then(function (params) {
    console.log(params)
})