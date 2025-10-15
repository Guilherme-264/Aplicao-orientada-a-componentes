import { useEffect, useState } from "react";

export default function useFetchCep(cep){
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError]= useState(null)

    useEffect (() =>{
        if (!cep) return

        const fetchCep = async() =>{
            setLoading(true)
            setError(null)
            try{
                const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                if(!res.ok) throw new Error("erro ao buscar o cep")
                const json = await res.json()
                setData(json)
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }
        }
        fetchCep()
    },[cep])
    return{data,loading,error}

}