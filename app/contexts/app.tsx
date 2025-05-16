import { type ReactNode, createContext, useContext, useState } from "react";

type AppState = {
	isNavigationOpen: boolean;
	[key: string]: unknown;
};

type AppContextType = {
	state: AppState;
	updateState: (newState: Partial<AppState>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<AppState>({
		isNavigationOpen: false,
	});

	// Merge new state values into existing state
	const updateState = (newState: Partial<AppState>) => {
		setState((prevState) => ({
			...prevState,
			...newState,
		}));
	};

	return (
		<AppContext.Provider value={{ state, updateState }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = (): AppContextType => {
	const context = useContext(AppContext);
	if (!context)
		throw new Error("useAppContext must be used within an AppProvider");
	return context;
};
