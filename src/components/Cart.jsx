import React from "react";
import { ListGroup } from "react-bootstrap";
import { BsTrash, BsPlusCircleFill, BsDashCircleFill } from "react-icons/bs";
import { convertToInt, convertToRupiah } from "../utils/converter";

const Cart = ({
  cartItems,
  onCheckout,
  onRemoveItem,
  onIncrementItem,
  onDecrementItem,
}) => {
  // Menghitung total harga
  const totalPrice = cartItems.reduce(
    (total, item) => total + convertToInt(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.length > 0 ? (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="d-flex justify-content-between align-items-center"
            >
              {item.name} - Rp {item.price}
              <div className="quantity">
                <BsDashCircleFill
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => onDecrementItem(item)}
                />
                <span
                  style={{
                    fontSize: "1rem",
                    margin: "0 0.5rem",
                    userSelect: "none",
                  }}
                >
                  {item.quantity}
                </span>
                <BsPlusCircleFill
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => onIncrementItem(item)}
                />
                <BsTrash
                  style={{
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    color: "red",
                    transition: "transform 0.2s ease-in-out",
                    marginLeft: "7px",
                  }}
                  onClick={() => onRemoveItem(item)}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Cart is empty, please add products to checkout.</p>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="total-price mt-2" style={{ userSelect: "none" }}>
            <h5>Total Price: {convertToRupiah(totalPrice)}</h5>
          </div>
          <div className="checkout">
            <button
              onClick={onCheckout}
              className="btn btn-dark btn-block my-2"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
