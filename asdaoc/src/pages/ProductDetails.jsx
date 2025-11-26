import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../context/CartContext'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, getCartItemQuantity } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await api.getProductById(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Produto não encontrado')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product && product.estoque > 0) {
      addToCart(product)
    }
  }
  const handleEditProduct = () => {
    navigate(`/editar/${product.id}`)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Carregando produto...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error || 'Produto não encontrado'}
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Voltar para Home
        </button>
      </div>
    )
  }

  const cartQuantity = getCartItemQuantity(product.id)
  const isStockReached = cartQuantity >= product.estoque
  const isOutOfStock = product.estoque === 0
  const isButtonDisabled = isOutOfStock || isStockReached

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
      >
        ← Voltar
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.imagem}
              alt={product.nome}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {product.nome}
            </h1>
            <p className="text-gray-600 mb-6">{product.descricao}</p>
            <div className="mb-6">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                R$ {product.preco.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-gray-600">
                Estoque: {product.estoque} unidades
              </p>
            </div>
            {isStockReached && !isOutOfStock && (
              <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                Estoque máximo atingido
              </div>
            )}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full py-3 rounded font-semibold transition-colors ${
                isButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isOutOfStock
                ? 'Produto Esgotado'
                : isStockReached
                ? 'Estoque Máximo Atingido'
                : 'Adicionar ao Carrinho'}
            </button>
            <button
              onClick={handleEditProduct}

              className={`mt-4 w-full py-3 rounded font-semibold transition-color bg-gray-400 hover:bg-gray-500 text-white`}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

