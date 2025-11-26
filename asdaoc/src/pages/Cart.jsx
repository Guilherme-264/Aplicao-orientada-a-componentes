import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const navigate = useNavigate()
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    buy,
  } = useCart()

  const [loadingBuy, setLoadingBuy] = useState(false)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Carrinho</h1>
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">
            Seu carrinho está vazio
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    )
  }
  const total = getTotalPrice()

  const handleBuy = async () => {
    if (!window.confirm('Deseja finalizar a compra?')) return

    setLoadingBuy(true)
    try {
      const result = await buy()
      if (result.success) {
        alert('Compra finalizada com sucesso!')
        navigate('/')
      } else {
        alert(result.message || 'Erro ao finalizar compra')
      }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
      alert('Erro ao finalizar compra. Tente novamente mais tarde.')
    } finally {
      setLoadingBuy(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Carrinho</h1>
      <div className="space-y-4 mb-8">
        {cart.map((item) => {
          const isMaxStock = item.quantidade >= item.estoque
          const totalItemPrice = item.preco * item.quantidade

          return (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center gap-4"
            >
              <img
                src={item.imagem}
                alt={item.nome}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.nome}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Quantidade atual:</strong> {item.quantidade}
                  </p>
                  <p>
                    <strong>Preço unitário:</strong> R${' '}
                    {item.preco.toFixed(2).replace('.', ',')}
                  </p>
                  <p>
                    <strong>Preço total:</strong> R${' '}
                    {totalItemPrice.toFixed(2).replace('.', ',')}
                  </p>
                  <p>
                    <strong>Estoque máximo permitido:</strong> {item.estoque}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantidade <= 1}
                    className={`w-8 h-8 rounded ${
                      item.quantidade <= 1
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">
                    {item.quantidade}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.id, item.estoque)}
                    disabled={isMaxStock}
                    className={`w-8 h-8 rounded ${
                      isMaxStock
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    +
                  </button>
                </div>
                {isMaxStock && (
                  <p className="text-xs text-yellow-600 font-semibold text-center">
                    Estoque máximo atingido
                  </p>
                )}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-800">
            Total Geral da Compra:
          </span>
          <span className="text-3xl font-bold text-blue-600">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
      </div>
      <div className="flex p-3 gap-4 justify-between">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Continuar Comprando
        </button>

        <button
          onClick={handleBuy}
          disabled={loadingBuy}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loadingBuy ? 'Processando...' : 'Finalizar Compra'}
        </button>
      </div>
    </div>
  )
}

export default Cart

