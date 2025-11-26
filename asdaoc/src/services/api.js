const API_URL = 'http://localhost:3001'

export const api = {
  // Buscar todos os produtos
  getProducts: async () => {
    try {
      const response = await fetch(`${API_URL}/produtos`)
      if (!response.ok) throw new Error('Erro ao buscar produtos')
      return await response.json()
    } catch (error) {
      console.error('Erro na API:', error)
      throw error
    }
  },

  // Buscar produto por ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`)
      if (!response.ok) throw new Error('Erro ao buscar produto')
      return await response.json()
    } catch (error) {
      console.error('Erro na API:', error)
      throw error
    }
  },

  // Criar novo produto
  createProduct: async (product) => {
    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error('Erro ao criar produto')
      return await response.json()
    } catch (error) {
      console.error('Erro na API:', error)
      throw error
    }
  },

  // Atualizar produto
  updateProduct: async (id, product) => {
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
      if (!response.ok) throw new Error('Erro ao atualizar produto')
      return await response.json()
    } catch (error) {
      console.error('Erro na API:', error)
      throw error
    }
  },


}

