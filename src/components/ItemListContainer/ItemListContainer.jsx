import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from "@mui/material/CircularProgress";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../firebase/config";
import ItemList from "../ItemList/ItemList";

import styles from "./ItemListContainer.module.css";

const ItemListContainer = () => {
  const { categoryId } = useParams();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      setLoading(true);
      setError(false);

      try {
        const productosRef = collection(db, "products");

        const consulta = categoryId
          ? query(productosRef, where("category", "==", categoryId))
          : productosRef;

        const respuesta = await getDocs(consulta);

        const productosFirestore = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirestore);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, [categoryId]);

  if (loading) {
    return (
      <div className={styles.productosPage}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productosPage}>
        <p>No pudimos cargar los productos. Intentá de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div className={styles.productosPage}>
      <h1>{categoryId ? `Categoría: ${categoryId}` : "Productos"}</h1>

      {productos.length === 0 ? (
        <p>No hay productos disponibles en esta sección.</p>
      ) : (
        <ItemList productos={productos} />
      )}
    </div>
  );
};

export default ItemListContainer;
