import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-48 object-cover"
        />
        {product.estoque === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Esgotado
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {product.nome}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          R$ {product.preco.toFixed(2).replace('.', ',')}
        </p>
        <Link
          to={`/produto/${product.id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

