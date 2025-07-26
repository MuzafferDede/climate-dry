import type { Session } from "react-router";
import type { Cart, CartItem } from "~/types";
import { fetcher } from "../libs";

export async function getCart(session: Session) {
	const api = fetcher(session);
	return await api.get<Cart>("/carts");
}

export async function addToCart(session: Session, formData: FormData) {
	const id = formData.get("id");
	const quantity = formData.get("quantity") || 1;
	// Get all selected extras as an array of numbers
	const extras = formData
		.getAll("extras[]")
		.map((v) => Number(v))
		.filter(Boolean);

	const api = fetcher(session);

	const { response, error } = await api.post<CartItem>("/carts", {
		variant_id: id,
		quantity: Number(quantity),
		extras,
	});

	return { response, error };
}

export async function updateCartItem(session: Session, formData: FormData) {
	const id = formData.get("id");
	const quantity = formData.get("quantity");
	const shipping_method = formData.get("shipping_method");

	const api = fetcher(session);

	const { response, error } = await api.patch<CartItem>(`/carts/items/${id}`, {
		quantity: Number(quantity),
		shipping_method,
	});

	return { response, error };
}

export async function removeCartItem(session: Session, formData: FormData) {
	const id = formData.get("id");

	const api = fetcher(session);

	const { response, error } = await api.delete<Cart>(`/carts/items/${id}`);
	return { response, error };
}

export async function applyDiscount(session: Session, formData: FormData) {
	const code = formData.get("code");

	const api = fetcher(session);
	const { response, error } = await api.post<Cart>("/carts/discount", { code });
	return { response, error };
}

export async function removeDiscount(session: Session) {
	const api = fetcher(session);
	const { response, error } = await api.delete<Cart>("/carts/discount");
	return { response, error };
}
