const input = document.getElementById('resultado')

input.value = "0";
let temporizador = null;

function limpiarPantalla() {
    clearTimeout(temporizador);
    input.value = "0";
}

function quitarValor() {
    if (input.value.length === 1) {
        clearTimeout(temporizador);
        return input.value = "0"
    } else {
        clearTimeout(temporizador);
        return input.value = input.value.slice(0, -1);
    }
}

function ingresarOperadores(operadores) {
    if (input.value[0] === "0" && input.value.length === 1) {
        if ("+-×/%=".includes(operadores)) {
            alert("El formato usado no es válido!")
            return;
        } else {
            clearTimeout(temporizador);
            input.value += operadores
            return;
        }
    }
    const ultimoSimbolo = input.value.at(-1);
    if ("+-×/".includes(ultimoSimbolo) && "+-×/%".includes(operadores)) {
        return;
    }
    if (ultimoSimbolo === "%" && operadores === "%") {
        return;
    }
    if (operadores === ".") {
        clearTimeout(temporizador);
        ingresarPunto();
        return;
    }

    if (operadores === "=") {
        manejoDeErrores()
    } else {
        clearTimeout(temporizador);
        input.value += operadores
    }

}

function ingresarPunto() {
    const partes = input.value.split(/[\+\-\×\/]/);
    const numeroActual = partes[partes.length - 1];
    if (numeroActual.includes(".")) {
        return;
    }
    if(numeroActual === ""){
        input.value +="0"
    }
    input.value += ".";
}

function depuesDelPorcentaje() {
    const ultimoSimbolo = input.value.at(-1);
    if ("%".includes(ultimoSimbolo)) {
        return input.value += "×";
    }
}

function ingresarUnNumero(numeros) {
    if (input.value[0] === "0" && input.value.length === 1) {
        input.value = input.value.replace("0", numeros);
    } else {
        clearTimeout(temporizador);
        depuesDelPorcentaje()
        input.value += numeros
    }
}

function manejoDeErrores() {
    try {
        input.value = eval(input.value.replaceAll("%", "/100")
            .replace("×", "*"));

        if (input.value == Infinity) {
            throw new Error("División por cero");
        }

        clearTimeout(temporizador);

        temporizador = setTimeout(() => {
            input.value = "0";
        }, 2000);

    } catch (err) {
        input.value = "Error";
        temporizador = setTimeout(() => {
            input.value = "0";
        }, 2000);
    }
    return;
}