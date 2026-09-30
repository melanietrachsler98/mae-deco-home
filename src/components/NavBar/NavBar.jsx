import { NavLink } from "react-router";

import CartWidget from "../CartWidget/CartWidget";

import styles from "./NavBar.module.css";

const categorias = [
  { id: "Packs de cama", nombre: "Packs de cama" },
  { id: "Almohadones", nombre: "Almohadones" },
];

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>

        <li>
          <NavLink to="/products">Products</NavLink>
        </li>

        {categorias.map((category) => (
          <li key={category.id}>
            <NavLink to={`/category/${category.id}`}>{category.nombre}</NavLink>
          </li>
        ))}

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>

        <li className={styles.cart}>
          <CartWidget />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
