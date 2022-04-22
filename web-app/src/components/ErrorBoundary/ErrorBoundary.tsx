import React, { ErrorInfo } from 'react';

import { Error } from '../../pages/Error';

import { Log } from '../../logger';

import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {    
		// Update state so the next render will show the fallback UI. 
		return { hasError: true };  
	}

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {    
		// You can also log the error to an error reporting service    
		// logErrorToMyService(error, errorInfo);  
		Log.fatal({
			description: "React error boundary",
			msg: error.message
		})
	}

	render() {
		if (this.state.hasError) {     
			// You can render any custom fallback UI      
			return <Error />;    
		}
		return this.props.children;
  }
};
