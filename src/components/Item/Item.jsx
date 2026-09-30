import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router";

import styles from "./Item.module.css";

const Item = ({ producto }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/products/${producto.id}`} className={styles.link}>
        <CardMedia
          component="img"
          height="140"
          image={producto.image}
          alt={producto.name}
          className={styles.imagen}
        />
      </Link>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to={`/products/${producto.id}`} className={styles.link}>
            {producto.name}
          </Link>
        </Typography>

        <Typography variant="body2">${producto.price}</Typography>

        {producto.stock < 1 && (
          <Typography variant="body2" color="error">
            Sin stock
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button
          component={Link}
          to={`/products/${producto.id}`}
          variant="contained"
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default Item;
