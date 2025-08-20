// menu
const btnContador = document.querySelector("#btnContador")
const btnGaleria = document.querySelector("#btnGaleria")
const btnAdicionarImg = document.querySelector("#bntAdicionarImg")
const contador = document.querySelector("#contador")
const galeria = document.querySelector("#galeria")
const formImg = document.querySelector("#formImg")

btnContador.addEventListener('click', function(){
    contador.style.display = 'block'
    galeria.style.display = 'none'
    formImg.style.display = 'none'
})
btnGaleria.addEventListener('click', function(){
    contador.style.display = 'none'
    galeria.style.display = 'block'
    formImg.style.display = 'none'

})
btnAdicionarImg.addEventListener('click', function(){
    contador.style.display = 'none'
    galeria.style.display = 'none'
    formImg.style.display = 'block'

})
// menu//


//contador
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
//contador

//tema da tela
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
//tema da tela

// form e galeria
const grupoImagens = document.querySelector("#grupoImagens")
const btnSalvar = document.querySelector('#btnSalvar')
btnSalvar.addEventListener('click', salvar)


function salvar(){
    const nome = document.getElementById('nome')
    const img = document.getElementById('img')

    const imagem = {
        nome: nome.value,
        img: img.value
    }

    card(imagem)
}

function card(imagem){
    const div = document.createElement('div')
    div.className = "cardImg"

    const img = document.createElement('img')
    img.src = imagem.img
    img.alt = imagem.new 
    
    img.style.width = "100%";
    img.style.height= "100%";
    img.style.display= "block";
    img.style.objectFit = "cover";
        
    div.appendChild(img)
    

    grupoImagens.appendChild(div)
    
}