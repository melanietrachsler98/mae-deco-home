import { useContext, useState } from "react";
import { Link } from "react-router";

import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

import styles from "./ItemDetail.module.css";

const ItemDetail = ({ producto }) => {
  const { addItem } = useContext(CartContext);
  const [agregado, setAgregado] = useState(false);

  const agregarAlCarrito = (cantidad) => {
    addItem(
      {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        image: producto.image,
        stock: producto.stock,
      },
      cantidad,
    );

    setAgregado(true);
  };

  return (
    <div className={styles.detalle}>
      <img className={styles.imagen} src={producto.image} alt={producto.name} />

      <div className={styles.informacion}>
        <h1>{producto.name}</h1>
        <p>{producto.description}</p>
        <p>Precio: ${producto.price}</p>

        {producto.stock < 1 ? (
          <p>Producto sin stock</p>
        ) : agregado ? (
          <div>
            <Link to="/cart">
              <button>Ir al carrito</button>
            </Link>
            <Link to="/products">
              <button>Seguir comprando</button>
            </Link>
          </div>
        ) : (
          <ItemCount stock={producto.stock} onAdd={agregarAlCarrito} />
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
