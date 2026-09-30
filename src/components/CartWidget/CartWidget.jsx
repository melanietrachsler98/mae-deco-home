import { useContext } from "react";
import { NavLink } from "react-router";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { CartContext } from "../../context/CartContext";

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext);

  return (
    <NavLink to="/cart" aria-label="Ir al carrito">
      <Badge badgeContent={getTotalQuantity()} color="primary">
        <ShoppingCartIcon />
      </Badge>
    </NavLink>
  );
};

export default CartWidget;
