import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItemProps } from "../types/type";

import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";

export default function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (!item) {
    return null;
  }
  return (
    <Stack direction="horizontal" gap={3} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={(e) => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
