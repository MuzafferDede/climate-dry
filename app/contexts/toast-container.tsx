// app/context/ToastContext.tsx

import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";

export enum ToastType {
	Success = "success",
	Info = "info",
	Error = "error",
}

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastContextValue {
	toasts: Toast[];
	removeToast: (id: number) => void;
	success: (message: string) => void;
	info: (message: string) => void;
	error: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const toastIdRef = useRef(0);

	const removeToast = useCallback((id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	const _showToast = useCallback(
		(message: string, type: ToastType = ToastType.Info) => {
			const id = toastIdRef.current++;
			const toast: Toast = { id, message, type };

			setToasts((prev) => [...prev, toast]);

			setTimeout(() => removeToast(id), 5000);
		},
		[removeToast],
	);

	// Convenience helpers:
	const success = useCallback(
		(message: string) => _showToast(message, ToastType.Success),
		[_showToast],
	);

	const info = useCallback(
		(message: string) => _showToast(message, ToastType.Info),
		[_showToast],
	);

	const error = useCallback(
		(message: string) => _showToast(message, ToastType.Error),
		[_showToast],
	);

	return (
		<ToastContext.Provider
			value={{ toasts, removeToast, success, info, error }}
		>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = (): ToastContextValue => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};
