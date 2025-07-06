import type { Cart, CartItem } from "~/types";
import { fetcher } from "./api.server";

export async function getCart(request: Request) {
	const api = await fetcher(request);
	return await api.get<Cart>("/cart");
}

export async function addToCart(request: Request) {
	const formData = await request.formData();
	const id = formData.get("id");
	const quantity = formData.get("quantity") || 1;
	// Get all selected extras as an array of numbers
	const extras = formData
		.getAll("extras[]")
		.map((v) => Number(v))
		.filter(Boolean);

	const api = await fetcher(request);

	return await api.post<CartItem>("/cart", {
		variant_id: id,
		quantity: Number(quantity),
		extras,
	});
}

export async function updateCartItem(request: Request, formData: FormData) {
	const id = formData.get("id");
	const quantity = formData.get("quantity");
	const shipping_method = formData.get("shipping_method");

	const api = await fetcher(request);
	return await api.patch<CartItem>(`/cart/items/${id}`, {
		quantity: Number(quantity),
		shipping_method,
	});
}

export async function removeCartItem(request: Request, formData: FormData) {
	const id = formData.get("id");

	const api = await fetcher(request);
	return await api.delete<Cart>(`/cart/items/${id}`);
}

export async function applyDiscount(request: Request, formData: FormData) {
	const code = formData.get("code");

	const api = await fetcher(request);
	return await api.post<Cart>("/cart/discount", { code });
}

export async function removeDiscount(request: Request) {
	const api = await fetcher(request);
	return await api.delete<Cart>("/cart/discount");
}
