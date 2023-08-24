import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ show, onClose, message, delay }) => {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 101 }}>
      <Toast show={show} onClose={onClose} delay={delay} autohide>
        <Toast.Header>
          <strong className="mr-auto">Checkout</strong>
        </Toast.Header>
        <Toast.Body style={{ color: "black" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
