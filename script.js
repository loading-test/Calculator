let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let decimal = document.getElementById('decimal');
let clear = document.querySelectorAll('.clear');
let result = document.querySelector('.out');
let memoryCurrent = 0;
let memoryNew = false;
let memoryPadingOperation = '';

//цифры
for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i]
    number.onclick = () => {
        if (memoryNew) {
            result.value = number.value
            memoryNew = false
        } else {
            if (result.value == '0') {
                result.value = number.value
            } else {
                result.value += number.value
            }
        }
    }
}

//вычесление
for (let i = 0; i < operations.length; i++) {
    let oper = operations[i]
    oper.onclick = (e) => {
        let op = e.target.innerText
        if (memoryNew && memoryPadingOperation !== '=') {
            result.value = memoryCurrent
        } else {
            memoryNew = true
            if (memoryPadingOperation === '+') {
                memoryCurrent += parseFloat(result.value)
            } else if (memoryPadingOperation === '-') {
                memoryCurrent -= parseFloat(result.value)
            } else if (memoryPadingOperation === 'X') {
                memoryCurrent *= parseFloat(result.value)
            } else if (memoryPadingOperation === '/') {
                memoryCurrent /= parseFloat(result.value)
            } else {
                memoryCurrent = parseFloat(result.value)
            }
            result.value = memoryCurrent
            memoryPadingOperation = op
        }
    }
}

//кнопки 'C' 'CE'
for (let i = 0; i < clear.length; i++) {
    let remove = clear[i]
    remove.onclick = (e) => {
        let id = e.target.innerText
        if (id === 'CE') {
            result.value = result.value.substring(0, result.value.length - 1)
            memoryNew = true
        } else if (id === 'C') {
            result.value = '0'
            memoryNew = true
            memoryCurrent = 0
            memoryPadingOperation = ''
        }
    }
}

//десятичная
decimal.onclick = () => {
    if (memoryNew) {
        result.value = '0.'
        memoryNew = false
    } else {
        if (result.value.indexOf('.') === -1) {
            result.value += '.'
        }
    }
    result.value = result.value
}
