import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../services/api'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    imagem: '',
    estoque: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(isEdit)

  const nomeRef = useRef(null)
  const descricaoRef = useRef(null)
  const precoRef = useRef(null)
  const imagemRef = useRef(null)
  const estoqueRef = useRef(null)

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          setLoadingProduct(true)
          const product = await api.getProductById(id)
          setFormData({
            nome: product.nome || '',
            descricao: product.descricao || '',
            preco: product.preco?.toString() || '',
            imagem: product.imagem || '',
            estoque: product.estoque?.toString() || '',
          })
        } catch (error) {
          console.error('Erro ao carregar produto:', error)
          navigate('/')
        } finally {
          setLoadingProduct(false)
        }
      }
      fetchProduct()
    }
  }, [id, isEdit, navigate])

  const validate = () => {
    const newErrors = {}

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória'
    }

    if (!formData.preco.trim()) {
      newErrors.preco = 'Preço é obrigatório'
    } else {
      const preco = parseFloat(formData.preco)
      if (isNaN(preco) || preco < 0) {
        newErrors.preco = 'Preço deve ser um número válido maior ou igual a 0'
      }
    }

    if (!formData.imagem.trim()) {
      newErrors.imagem = 'URL da imagem é obrigatória'
    }

    if (!formData.estoque.trim()) {
      newErrors.estoque = 'Estoque é obrigatório'
    } else {
      const estoque = parseInt(formData.estoque)
      if (isNaN(estoque) || estoque < 0) {
        newErrors.estoque =
          'Estoque deve ser um número válido maior ou igual a 0'
      }
    }

    setErrors(newErrors)

    // Focar no primeiro campo inválido
    if (newErrors.nome && nomeRef.current) {
      nomeRef.current.focus()
    } else if (newErrors.descricao && descricaoRef.current) {
      descricaoRef.current.focus()
    } else if (newErrors.preco && precoRef.current) {
      precoRef.current.focus()
    } else if (newErrors.imagem && imagemRef.current) {
      imagemRef.current.focus()
    } else if (newErrors.estoque && estoqueRef.current) {
      estoqueRef.current.focus()
    }

    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim(),
        preco: parseFloat(formData.preco),
        imagem: formData.imagem.trim(),
        estoque: parseInt(formData.estoque),
      }

      if (isEdit) {
        await api.updateProduct(id, productData)
      } else {
        await api.createProduct(productData)
      }

      navigate('/')
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      alert('Erro ao salvar produto. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Carregando produto...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {isEdit ? 'Editar Produto' : 'Cadastro de Produto'}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome *
          </label>
          <input
            ref={nomeRef}
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.nome
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.nome && (
            <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="descricao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Descrição *
          </label>
          <textarea
            ref={descricaoRef}
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.descricao
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.descricao && (
            <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Preço *
          </label>
          <input
            ref={precoRef}
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.preco
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.preco && (
            <p className="mt-1 text-sm text-red-600">{errors.preco}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="imagem"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            URL da Imagem *
          </label>
          <input
            ref={imagemRef}
            type="url"
            id="imagem"
            name="imagem"
            value={formData.imagem}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.imagem
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.imagem && (
            <p className="mt-1 text-sm text-red-600">{errors.imagem}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="estoque"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Estoque *
          </label>
          <input
            ref={estoqueRef}
            type="number"
            id="estoque"
            name="estoque"
            value={formData.estoque}
            onChange={handleChange}
            min="0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.estoque
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.estoque && (
            <p className="mt-1 text-sm text-red-600">{errors.estoque}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Salvando...'
              : isEdit
              ? 'Atualizar Produto'
              : 'Cadastrar Produto'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm

