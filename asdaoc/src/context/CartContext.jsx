import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // Carregar carrinho do localStorage ao inicializar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      
      if (existingItem) {
        // Se já existe, aumenta a quantidade se não ultrapassar o estoque
        if (existingItem.quantidade < product.estoque) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        }
        return prevCart
      } else {
        // Se não existe, adiciona novo item
        return [...prevCart, { ...product, quantidade: 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId, maxStock) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantidade < maxStock
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      )
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantidade > 1
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
    )
  }

  const getCartItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId)
    return item ? item.quantidade : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.preco * item.quantidade, 0)
  }

  const clearCart = () => {
    setCart([])
  }

  const buy = async () => {
    if (cart.length === 0) {
      return { success: false, message: 'Carrinho vazio' }
    }

    // Verifica se existem quantidades maiores que o estoque atual
    const insufficientStockItem = cart.find(
      (item) => item.quantidade > Number(item.estoque)
    )

    if (insufficientStockItem) {
      return {
        success: false,
        message: `Quantidade solicitada maior que o estoque para ${insufficientStockItem.nome}`,
      }
    }

    try {
      // Atualiza cada produto no backend, diminuindo o estoque
      // Buscar os dados mais recentes do produto para validar estoque
      for (const item of cart) {
        const productFromServer = await api.getProductById(item.id)
        const currentStock = Number(productFromServer.estoque)
        const desiredQuantity = Number(item.quantidade)

        if (desiredQuantity > currentStock) {
          return {
            success: false,
            message: `Quantidade solicitada maior que o estoque atual para ${productFromServer.nome}`,
          }
        }

        const updatedProduct = {
          ...productFromServer,
          estoque: currentStock - desiredQuantity,
        }
        await api.updateProduct(item.id, updatedProduct)
      }

      // Se todos atualizados com sucesso, limpa o carrinho
      clearCart()
      return { success: true }
    } catch (error) {
      console.error('Erro ao finalizar compra:', error)
      return { success: false, message: 'Erro ao finalizar compra' }
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getCartItemQuantity,
        getTotalPrice,
        clearCart,
        buy,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

