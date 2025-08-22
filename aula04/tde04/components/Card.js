export function Card(produto){
        const div = document.createElement('div')
        const nome = document.createElement('p')
        const preco = document.createElement('p')

        nome.innerHTML = (`${produto.nome}: R$${produto.preco} `)
        div.appendChild(nome )
        div.className= "card"

        return div
        }

