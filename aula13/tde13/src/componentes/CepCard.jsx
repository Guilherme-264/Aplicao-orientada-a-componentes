import { useState } from "react"
import useFetchCep from "./useFetchCep"

export default function CepCard(){
    const [inputCep, setInputCep] = useState("")
    const [buscaCep, setBuscaCep] = useState("")

    const {data, loading, error} = useFetchCep(buscaCep)

    function procurarCEP(){
        setBuscaCep(inputCep)
    }
    return(
        <>
            <p>Insira seu CEP:</p>
            <input
                type="text"
                value={inputCep}
                onChange={(e) => setInputCep(e.target.value)} 
            />           

            <button onClick={procurarCEP}>Procurar</button>

      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      {data && !data.erro && (
        <div>
          <p><b>Rua:</b> {data.logradouro}</p>
          <p><b>Bairro:</b> {data.bairro}</p>
          <p><b>Cidade:</b> {data.localidade}</p>
          <p><b>Estado:</b> {data.uf}</p>
        </div>
      )}
        </>
    )
}