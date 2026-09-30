import { useContext } from "react";
import { Link } from "react-router";

import { CartContext } from "../../context/CartContext";
import CartItem from "../../components/CartItem/CartItem";

const Cart = () => {
  const { cart, removeItem, clear, getTotalPrice } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <h1>El carrito está vacío</h1>

        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Mi carrito</h1>

      {cart.map((producto) => (
        <CartItem key={producto.id} item={producto} onRemove={removeItem} />
      ))}

      <h2>Total: ${getTotalPrice()}</h2>

      <button onClick={clear}>Vaciar carrito</button>

      <Link to="/products">
        <button>Seguir comprando</button>
      </Link>

      <Link to="/checkout">
        <button>Finalizar compra</button>
      </Link>
    </div>
  );
};

export default Cart;
