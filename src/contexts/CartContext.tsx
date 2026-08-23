import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  item_id: string;
  item_name: string;
  price: number;
  image_url: string | null;
  vendor_id: string;
  vendor_name: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  addItem: (item: Omit<CartLine, "quantity">, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clear: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addItem: CartContextValue["addItem"] = (item, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.item_id === item.item_id);
      if (existing) {
        return prev.map((l) =>
          l.item_id === item.item_id
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const removeItem: CartContextValue["removeItem"] = (itemId) => {
    setLines((prev) => prev.filter((l) => l.item_id !== itemId));
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (
    itemId,
    quantity,
  ) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setLines((prev) =>
      prev.map((l) => (l.item_id === itemId ? { ...l, quantity } : l)),
    );
  };

  const clear = () => setLines([]);

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines],
  );
  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  return (
    <CartContext.Provider
      value={{
        lines,
        addItem,
        removeItem,
        updateQuantity,
        clear,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCartContext must be used within a CartProvider");
  return ctx;
}
