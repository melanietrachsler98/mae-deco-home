import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/config";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const { productId } = useParams();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await getDoc(doc(db, "products", productId));

        if (respuesta.exists()) {
          setProducto({
            id: respuesta.id,
            ...respuesta.data(),
          });
        }
      } catch (err) {
        console.error("Error al obtener el producto:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    obtenerProducto();
  }, [productId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>No pudimos cargar el producto. Intentá de nuevo más tarde.</p>;
  }

  if (!producto) {
    return (
      <div>
        <h1>Producto no encontrado</h1>

        <Link to="/products">
          <button>Ver productos</button>
        </Link>
      </div>
    );
  }

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;
