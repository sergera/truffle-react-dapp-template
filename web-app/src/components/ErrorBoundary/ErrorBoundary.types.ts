export interface ErrorBoundaryProps {
	children: JSX.Element|JSX.Element[];
};

export interface ErrorBoundaryState {
	hasError: boolean;
};
