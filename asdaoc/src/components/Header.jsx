import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { cart } = useCart()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantidade, 0)

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200">
            Mini E-commerce
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/cadastro"
              className="hover:text-blue-200 transition-colors"
            >
              Cadastro de Produto
            </Link>
            <Link
              to="/carrinho"
              className="relative hover:text-blue-200 transition-colors"
            >
              Carrinho
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

