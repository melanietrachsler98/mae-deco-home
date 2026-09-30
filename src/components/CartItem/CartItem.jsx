const CartItem = ({ item, onRemove }) => {
  return (
    <div>
      <img src={item.image} alt={item.name} width="150" />

      <h2>{item.name}</h2>

      <p>Precio: ${item.price}</p>

      <p>Cantidad: {item.quantity}</p>

      <p>Subtotal: ${item.price * item.quantity}</p>

      <button onClick={() => onRemove(item.id)}>Quitar</button>
    </div>
  );
};

export default CartItem;
