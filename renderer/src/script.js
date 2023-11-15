class Calculadora {
    constructor(valorPrevioTextElement, valorActualTextElement) {
        this.valorPrevioTextElement = valorPrevioTextElement
        this.valorActualTextElement = valorActualTextElement
        this.igual = false
        this.limiteNumeros = 9
        this.borrarTodo()
    }

    borrarTodo() {
        this.valorActual = ''
        this.valorPrevio = ''
        this.operacion = undefined
    }

    borrar() {
        this.valorActual = this.valorActual.toString().slice(0, -1)
    }

    agregarNumero(numero) {
        if (this.igual) {
            this.valorActual = ''
            this.igual = false
        }
        if (this.valorActual.length >= this.limiteNumeros) return
        if (numero === '.' && this.valorActual.includes('.')) return
        this.valorActual = this.valorActual.toString() + numero.toString()
    }

    elejirOperacion(operacion) {
        if (this.valorActual === '') return
        if (this.valorPrevio !== '') { // ->  ! ==
            this.calcular()
        }
        this.operacion = operacion
        this.valorPrevio = this.valorActual
        this.valorActual = ''
    }

    calcularPorcentaje() {
        this.valorActual = (parseFloat(this.valorActual) / 100)
    }

    calcular() {
        let resultado
        const valor_1 = parseFloat(this.valorPrevio)
        const valor_2 = parseFloat(this.valorActual)
        if (isNaN(valor_1) || isNaN(valor_2)) return
        switch (this.operacion) {
            case '+':
                resultado = valor_1 + valor_2
                break
            case '-':
                resultado = valor_1 - valor_2
                break
            case 'x':
                resultado = valor_1 * valor_2
                break
            case '÷':
                resultado = valor_1 / valor_2
                break
            default:
                return
        }
        this.operacionCompleta = `${this.valorPrevio} ${this.operacion} ${this.valorActual} =`
        this.igual = true
        if (resultado.toString().length > this.limiteNumeros) {
            resultado = resultado.toExponential(1)
        }
        this.valorActual = resultado
        this.operacion = undefined
        this.valorPrevio = ''
    }

    obtenerNumero(numero) {
        const cadena = numero.toString()
        const enteros = parseFloat(cadena.split('.')[0])
        const decimales = cadena.split('.')[1]
        let mostrarEnteros
        if (isNaN(enteros)) {
            mostrarEnteros = ''
        } else {
            mostrarEnteros = enteros.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if (decimales != null) {
            return `${mostrarEnteros}.${decimales}`
        } else {
            return mostrarEnteros
        }
    }

    actualizarPantalla() {
        this.valorActualTextElement.innerText = this.obtenerNumero(this.valorActual)
        if (this.operacion != null) {
            this.valorPrevioTextElement.innerText = `${this.obtenerNumero(this.valorPrevio)} ${this.operacion}`
        } else if (this.igual) {
            this.valorPrevioTextElement.innerText = this.operacionCompleta
        } else {
            this.valorPrevioTextElement.innerText = ''
        }
    }
}

const numeroButtons = document.querySelectorAll('[data-numero]')
const operacionButtons = document.querySelectorAll('[data-operacion]')
const igualButton = document.querySelector('[data-igual]')
const porcentajeButton = document.querySelector('[data-porcentaje]')
const borrarButton = document.querySelector('[data-borrar]')
const borrarTodoButton = document.querySelector('[data-borrar-todo]')
const valorPrevioTextElement = document.querySelector('[data-valor-previo]')
const valorActualTextElement = document.querySelector('[data-valor-actual]')

const calculator = new Calculadora(valorPrevioTextElement, valorActualTextElement)

numeroButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.agregarNumero(button.innerText)
        calculator.actualizarPantalla()
    })
})

operacionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.elejirOperacion(button.innerText)
        calculator.actualizarPantalla()
    })
})

igualButton.addEventListener('click', _button => {
    calculator.calcular()
    calculator.actualizarPantalla()
})

borrarTodoButton.addEventListener('click', _button => {
    calculator.borrarTodo()
    calculator.actualizarPantalla()
})

borrarButton.addEventListener('click', _button => {
    calculator.borrar()
    calculator.actualizarPantalla()
})

porcentajeButton.addEventListener('click', _button => {
    calculator.calcularPorcentaje()
    calculator.actualizarPantalla()
})

// Tarea:
// 1. Arreglar bug que limite los numeros en pantalla
// 2. Funcionabilidad de boton de porcentaje Porcentaje
// 3. Si lo que se presiona despues igual es un numero entonces que borre el resultado anterior e inicie una nueva operacion
// 4. Muestre la operacion completa en el display superior despues de igual