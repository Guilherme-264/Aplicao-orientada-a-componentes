function button(){
    let nomes = ["Guilherme", "João", "Juliao"]
    let nomesString = ""
    for (let i = 0; i < nomes.length; i++){
        nomesString += "Nome: "+nomes[i]+"\n"
    }

    alert(
       nomesString
    )
}