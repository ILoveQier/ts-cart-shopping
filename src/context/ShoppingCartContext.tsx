import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { CartItemProps } from "../types/type";

type ShoppingCartProviderProps = {
  children: ReactNode;
};
type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
  isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const closeCart = () => setIsOpen(false);
  const openCart = () => setIsOpen(true);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  }

  const cartQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cartItems]);

  function increaseCartQuantity(id: number) {
    setCartItems((curItems) => {
      if (!curItems.find((item) => item.id === id)) {
        return [...curItems, { id, quantity: 1 }];
      }
      return curItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((curItems) => {
      if (curItems.find((item) => item.id === id)?.quantity === 1) {
        return curItems.filter((item) => item.id != id);
      }
      return curItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  }
  function removeFromCart(id: number) {
    setCartItems((curItems) => {
      return curItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
