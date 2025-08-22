import { produtos } from "./data.js";
import { Card } from "./card.js";

export function ListCard(){
    const div = document.createElement('div')
    div.className = "listCard"
    produtos.map(item =>{
        const card = Card(item)

        div.appendChild(card)
    })
    return div
}
