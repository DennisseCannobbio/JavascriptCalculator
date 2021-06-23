class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      //Pasamos la funcion clear() para limpiar la calculadora
      this.clear()
    }
  
    //Limpiar calculadora
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
    }
  
    //Eliminar números que hemos agregado
    delete() {
        //Va eliminando el último número agregado
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  
    //Agregar números => le pasamos el número que estamos seleccionando
    appendNumber(number) {
        //Para que no se puedan agregar mas puntos 
        if (number === '.' && this.currentOperand.includes('.')) return
        //Para que los números se vayan juntando ejemplo: 1 + 1 = 11
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  
    //Para escoger que operación queremos realizar => le pasamos la operación que deseamos realizar
    chooseOperation(operation) {
        //Si el current operand es empty => entonces hace el código más abajo
        if (this.currentOperand === '') return
        //Si el previous operand es distinto de un empty string => Entonces ejecuta la funcion compute()
        if (this.previousOperand !== '') {
            this.compute()
        }
        // Para que la calculadora sepa que estamos haciendo una operación
        this.operation = operation
        // Reemplaza los valores desde el current al previous
        this.previousOperand = this.currentOperand
        // currentOperand en empty String 
        this.currentOperand = ''
    }
  
    //Para calcular los valores 
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // Si prev o current son NaN
        if (isNaN(prev) || isNaN(current)) return
        //Escribimos los casos para cada operación matemática
        switch (this.operation) {
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*':
                computation = prev * current
                break

            case '÷':
                computation = prev / current
                break

            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
  
    //Para las comas de los miles y millones
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
  
    //Updatea los valores en el output 
    updateDisplay() {
        //Para que muestre los valores en la pantalla
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        //Si la operación es distinta de null
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
  }
  
//Seleccionamos todos los botones
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
  
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
//Para cada uno de los botones queremos que haga algo
numberButtons.forEach(button => {
    //Cuando hagamos click en el botón agregará lo que está dentro de ese botón clickeado
    button.addEventListener('click', () => {
        //En esta sección llama a la función que declaramos en la class Calculator appendNumber()
        calculator.appendNumber(button.innerText)
        //Llamamos la función updateDisplay para updatear los valores en la pantallita de la calculadora
        calculator.updateDisplay()
    })
})
  
//Para que la operación funcione
operationButtons.forEach(button => {
     //Cuando hagamos click en el botón agregará lo que está dentro de ese botón clickeado
    button.addEventListener('click', () => {
        //En esta sección llama a la función que declaramos en la class Calculator chooseOperation()
        calculator.chooseOperation(button.innerText)
        //Llamamos la función updateDisplay para updatear los valores en la pantallita de la calculadora
        calculator.updateDisplay()
    })
})
  
//Para que realize "=" en la calculadora
equalsButton.addEventListener('click', button => {
    //Llamamos a la función compute()
    calculator.compute()
    //Updatea en la pantallita de la calculadora 
    calculator.updateDisplay()
})
  
//Para limpiar la calculadora 
allClearButton.addEventListener('click', button => {
    //Llamamos a la función clear()
    calculator.clear()
    //Updatea en la pantallita de la calculadora 
    calculator.updateDisplay()
})
  
//Para eliminar numeros que agregamos
deleteButton.addEventListener('click', button => {
    //Llamamos a la función delete()
    calculator.delete()
    //Updatea en la pantallita de la calculadora 
    calculator.updateDisplay()
})