import { Link } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Bienvenidos</h1>

      <p>
        Packs de cama y almohadones pensados para tu descanso. Explorá el
        catálogo y armá tu pedido online.
      </p>

      <Link to="/products">
        <button>Ver productos</button>
      </Link>
    </div>
  );
};

export default Home;
