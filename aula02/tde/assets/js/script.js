const btnContador = document.querySelector("#btnContador")
const btnGaleria = document.querySelector("#btnGaleria")
const contador = document.querySelector("#contador")
const galeria = document.querySelector("#galeria")

btnContador.addEventListener('click', function(){
    contador.style.display = 'block'
    galeria.style.display = 'none'
})
btnGaleria.addEventListener('click', function(){
    contador.style.display = 'none'
    galeria.style.display = 'block'
})

const input = document.querySelector('input')
const span = document.querySelector('span')
const incremento = document.getElementById('incremento')
const decremento = document.getElementById('decremento')

let resultado = 0
span.textContent = resultado

function incremetar(){
    if(input.value == ""){
        resultado += 1
        
    }
    resultado += Number(input.value)
    span.textContent = resultado

}

function decrementar(){
    if(input.value == ""){
        resultado -= 1
    }
    resultado -= Number(input.value)
    span.textContent = resultado
}

incremento.addEventListener('click', incremetar)
decremento.addEventListener('click', decrementar)

const btnEscuro = document.querySelector("#btnEscuro")
const btnClaro = document.querySelector("#btnClaro")
const body = document.querySelector("body")

function temaEscuro(){
    body.style.backgroundColor = "black";
    body.style.color = "white";
}
btnEscuro.addEventListener('click', temaEscuro);

function temaClaro(){
    body.style.backgroundColor = "white";
    body.style.color = "black";
}
btnClaro.addEventListener('click', temaClaro);
