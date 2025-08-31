import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
} from "react";
import { useFetcher } from "react-router";
import type { Cart } from "~/types";

type CartContextType = {
	cart: Cart | undefined;
	isLoading: boolean;
	invalidateCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const fetcher = useFetcher<{ cart: Cart }>({ key: "cart" });

	const loadCart = useCallback(() => {
		fetcher.load("/resources/cart");
	}, [fetcher.load]);

	useEffect(() => {
		// Load cart if not already loaded
		if (!fetcher.data) {
			loadCart();
		}
	}, [fetcher.data, loadCart]);

	const invalidateCart = useCallback(() => {
		fetcher.load("/resources/cart");
	}, [fetcher.load]);

	return (
		<CartContext.Provider
			value={{
				cart: fetcher.data?.cart,
				isLoading: fetcher.state === "loading",
				invalidateCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCartContext = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context)
		throw new Error("useCartContext must be used within a CartProvider");
	return context;
};
