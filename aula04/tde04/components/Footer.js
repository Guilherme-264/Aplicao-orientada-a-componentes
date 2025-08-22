import {produtos} from "../components/data.js"

export function Footer(){
    const footer = document.createElement('footer')

    const total = produtos.reduce((acc, prod) => acc + prod.preco, 0)
    footer.innerHTML = `Total R$${total}`
    return footer
}