document.addEventListener('DOMContentLoaded', () => {
    class Calculadora {
        constructor(valorActualElem, operacionPreviaElem) {
            this.valorActualElem = valorActualElem;
            this.operacionPreviaElem = operacionPreviaElem;
            this.operacionCompleta = false;
            this.limpiar();
        }

        limpiar() {
            this.valorActual = '0';
            this.operacionPrevia = '';
            this.operador = undefined;
            this.operacionCompleta = false;
            this.actualizarVisor();
        }

        borrar() {
            if (this.valorActual.length === 1 || this.valorActual === '0' || this.operacionCompleta) {
                this.valorActual = '0';
                this.operacionCompleta = false;
            } else {
                this.valorActual = this.valorActual.slice(0, -1);
            }
            this.actualizarVisor();
        }

        agregarNumero(numero) {
            if (this.operacionCompleta) {
                this.valorActual = '';
                this.operacionCompleta = false;
            }
            if (numero === '.' && this.valorActual.includes('.')) return;
            
            if (this.valorActual === '0' && numero !== '.') {
                this.valorActual = numero;
            } else {
                this.valorActual += numero;
            }
            this.actualizarVisor();
        }

        elegirOperador(operador) {
            if (this.valorActual === '' && this.operador !== undefined) {
                 this.operador = operador;
                 this.actualizarVisor();
                 return;
            }
            if (this.valorActual === '') return;
            if (this.operacionPrevia !== '') {
                this.calcular();
            }
            this.operador = operador;
            this.operacionPrevia = this.valorActual;
            this.valorActual = '';
            this.actualizarVisor();
        }

        calcular() {
            let resultado;
            const previo = parseFloat(this.operacionPrevia);
            const actual = parseFloat(this.valorActual);

            if (isNaN(previo) || isNaN(actual)) return;

            switch (this.operador) {
                case '+':
                    resultado = previo + actual;
                    break;
                case '-':
                    resultado = previo - actual;
                    break;
                case '×':
                    resultado = previo * actual;
                    break;
                case '÷':
                    if (actual === 0) {
                        this.valorActualElem.innerText = "Error";
                        setTimeout(() => this.limpiar(), 1500);
                        return;
                    }
                    resultado = previo / actual;
                    break;
                default:
                    return;
            }
            
            this.valorActual = resultado.toString();
            this.operador = undefined;
            this.operacionPrevia = '';
            this.operacionCompleta = true;
            this.actualizarVisor();
        }

        actualizarVisor() {
            this.valorActualElem.innerText = this.valorActual;
            if (this.operador != null) {
                this.operacionPreviaElem.innerText = `${this.operacionPrevia} ${this.operador}`;
            } else {
                this.operacionPreviaElem.innerText = '';
            }
        }
    }

    const numeroBotones = document.querySelectorAll('.numero');
    const operadorBotones = document.querySelectorAll('.operador');
    const igualBoton = document.querySelector('.igual');
    const borrarBoton = document.querySelector('.delete');
    const limpiarBoton = document.querySelector('.clear');
    const valorActualElem = document.getElementById('valor-actual');
    const operacionPreviaElem = document.getElementById('operacion-previa');

    const calculadora = new Calculadora(valorActualElem, operacionPreviaElem);

    numeroBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            calculadora.agregarNumero(boton.innerText);
        });
    });

    operadorBotones.forEach(boton => {
        boton.addEventListener('click', () => {
            calculadora.elegirOperador(boton.innerText);
        });
    });

    igualBoton.addEventListener('click', () => {
        calculadora.calcular();
    });

    limpiarBoton.addEventListener('click', () => {
        calculadora.limpiar();
    });

    borrarBoton.addEventListener('click', () => {
        calculadora.borrar();
    });

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key >= 0 && key <= 9) {
            calculadora.agregarNumero(key);
        } else if (key === '.') {
            calculadora.agregarNumero(key);
        } else if (key === '+' || key === '-') {
            calculadora.elegirOperador(key);
        } else if (key === '*') {
            calculadora.elegirOperador('×');
        } else if (key === '/') {
            e.preventDefault();
            calculadora.elegirOperador('÷');
        } else if (key === 'Enter' || key === '=') {
            calculadora.calcular();
        } else if (key === 'Backspace') {
            calculadora.borrar();
        } else if (key === 'Escape' || key === 'Delete') {
            calculadora.limpiar();
        }
    });
});
