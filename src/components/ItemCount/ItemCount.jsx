import { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const sumar = () => {
    if (count < stock) setCount(count + 1);
  };

  const restar = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div>
      <button onClick={restar} disabled={count <= 1}>
        -
      </button>

      <span>{count}</span>

      <button onClick={sumar} disabled={count >= stock}>
        +
      </button>

      <p>Stock disponible: {stock}</p>

      <button onClick={() => onAdd(count)} disabled={stock < 1}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
