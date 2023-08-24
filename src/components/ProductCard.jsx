import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";

const ProductCard = ({ product, onAddToCart }) => {
  const maxLength = 20;
  const shortenedTitle =
    product.title.length > maxLength
      ? product.title.substring(0, maxLength) + "..."
      : product.title;

  return (
    <Card className="mb-3">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "250px",
          overflow: "hidden",
        }}
      >
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="img-fluid"
          style={{
            objectFit: "contain",
            maxHeight: "100%",
          }}
        />
      </div>
      <Card.Body style={{ backgroundColor: "#F5F5F5" }}>
        <Card.Title>
          {shortenedTitle}{" "}
          <Badge pill bg="secondary">
            {product.category}
          </Badge>
        </Card.Title>
        <Card.Text>Rp {product.price}</Card.Text>
        <Button className="btn-dark" onClick={() => onAddToCart(product)}>
          Add to Cart <BsCartPlus className="ml-2" />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
