import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles"
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 350,
    backgroundColor: "#F5F5F5",
    margin: 10,
    textDecoration: "none",
    color: "black"
  },
  media: {
    height: 160,
  },
});

export default function ProductCard(props) {
  const classes = useStyles();
  const product = props.product;
  const price = String(product.price)
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/products/${product.id}`} className={"card-links"}>
          <CardMedia
            image={product.imageUrl}
            className={classes.media}
          />
          <CardContent className={classes.root}>
            <Typography variant="h6" component="h2">{product.name}</Typography>
            <Typography variant="body2">{`$${price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2)}`}</Typography>
          </CardContent>
      </CardActionArea>
    </Card>
  )
}
