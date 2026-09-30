import { useState } from "react";

const CheckoutForm = ({ onSubmit, loading }) => {
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });
  const [emailConfirm, setEmailConfirm] = useState("");

  const emailsDistintos = emailConfirm !== "" && emailConfirm !== datos.email;

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (datos.email !== emailConfirm) return;

    onSubmit(datos);
  };

  return (
    <form onSubmit={manejarEnvio}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre}
          onChange={manejarCambio}
          required
        />
      </div>

      <div>
        <label htmlFor="apellido">Apellido</label>
        <input
          id="apellido"
          name="apellido"
          type="text"
          value={datos.apellido}
          onChange={manejarCambio}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          value={datos.email}
          onChange={manejarCambio}
          required
        />
      </div>

      <div>
        <label htmlFor="emailConfirm">Confirmar correo electrónico</label>
        <input
          id="emailConfirm"
          name="emailConfirm"
          type="email"
          value={emailConfirm}
          onChange={(e) => setEmailConfirm(e.target.value)}
          required
        />
        {emailsDistintos && <p>Los correos no coinciden.</p>}
      </div>

      <div>
        <label htmlFor="telefono">Teléfono</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          value={datos.telefono}
          onChange={manejarCambio}
          required
        />
      </div>

      <button type="submit" disabled={loading || emailsDistintos}>
        {loading ? "Procesando..." : "Confirmar compra"}
      </button>
    </form>
  );
};

export default CheckoutForm;
