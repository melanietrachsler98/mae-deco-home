import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import {
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { db } from "../../firebase/config";
import { CartContext } from "../../context/CartContext";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const obtenerSinStock = async (cart) => {
  const faltantes = [];

  for (const item of cart) {
    const respuesta = await getDoc(doc(db, "products", item.id));

    if (!respuesta.exists() || respuesta.data().stock < item.quantity) {
      faltantes.push(item.name);
    }
  }

  return faltantes;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clear, getTotalPrice } = useContext(CartContext);

  const [ordenId, setOrdenId] = useState("");
  const [verificando, setVerificando] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sinStock, setSinStock] = useState([]);

  useEffect(() => {
    const revisarStock = async () => {
      try {
        const faltantes = await obtenerSinStock(cart);
        setSinStock(faltantes);
      } catch (err) {
        console.error("Error al verificar el stock:", err);
        setError(true);
      } finally {
        setVerificando(false);
      }
    };

    revisarStock();
  }, [cart]);

  const crearOrden = async (datos) => {
    setLoading(true);
    setError(false);

    try {
      const faltantes = await obtenerSinStock(cart);

      if (faltantes.length > 0) {
        setSinStock(faltantes);
        return;
      }

      const orden = {
        comprador: datos,
        productos: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: getTotalPrice(),
        fecha: serverTimestamp(),
      };

      const batch = writeBatch(db);

      const ordenRef = doc(collection(db, "orders"));
      batch.set(ordenRef, orden);

      cart.forEach((item) => {
        batch.update(doc(db, "products", item.id), {
          stock: increment(-item.quantity),
        });
      });

      await batch.commit();

      setOrdenId(ordenRef.id);
      clear();
    } catch (err) {
      console.error("Error al crear la orden:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (ordenId) {
    return (
      <div>
        <h2>¡Compra realizada con éxito! 🎉</h2>

        <p>Tu número de orden es:</p>

        <strong>{ordenId}</strong>

        <button onClick={() => navigate("/products")}>
          Volver a productos
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div>
        <h1>No hay productos para comprar</h1>

        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
    );
  }

  if (verificando) {
    return <CircularProgress />;
  }

  if (sinStock.length > 0) {
    return (
      <div>
        <h1>Algunos productos se quedaron sin stock</h1>

        <ul>
          {sinStock.map((nombre) => (
            <li key={nombre}>{nombre}</li>
          ))}
        </ul>

        <p>Volvé al carrito para ajustar las cantidades o quitarlos.</p>

        <Link to="/cart">
          <button>Volver al carrito</button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Finalizar compra</h1>

      {error && (
        <p>No pudimos completar tu compra. Intentá de nuevo en unos minutos.</p>
      )}

      <CheckoutForm onSubmit={crearOrden} loading={loading} />
    </div>
  );
};

export default Checkout;
