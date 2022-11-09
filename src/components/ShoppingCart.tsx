import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utils/formatCurrency";
import CartItem from "./CartItem";

import shopItems from "../data/items.json";
import { useEffect } from "react";

export function ShoppingCart() {
  const { isOpen, closeCart, cartItems,cartQuantity } = useShoppingCart();
  useEffect(()=>{
    if (cartQuantity == 0) {
      closeCart()
    }
  },[cartQuantity])
  return (
    <Offcanvas onHide={closeCart} show={isOpen} placement={"end"}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item}></CartItem>
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, item) => {
                const ct = shopItems.find((i) => (i.id === item.id));
                return total + (ct?.price ?? 0) * item.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
