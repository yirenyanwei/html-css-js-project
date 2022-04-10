var xhr = new XMLHttpRequest()
xhr.open('GET', '/dt')//走代理

xhr.send()
xhr.onload = function () {
    console.log(xhr.responseText)
}
