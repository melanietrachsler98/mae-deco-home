import { Link } from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1>Página no encontrada</h1>

      <p>La dirección que buscás no existe o fue movida.</p>

      <Link to="/">
        <button>Volver al inicio</button>
      </Link>
    </div>
  );
};

export default NotFound;
