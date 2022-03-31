import { Routes, Route, Navigate } from "react-router-dom";

import { Landing } from './pages/Landing';
import { ErrorNotFound } from './pages/ErrorNotFound';

import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Footer } from "./components/Footer";

import { ConnectedModalContainer as ModalContainer } from './components/ModalContainer';
import { ConnectedErrorNotification as ErrorNotification } from './components/ErrorNotification';

import { ErrorBoundary } from "./components/ErrorBoundary";

import './App.css';

export function App() {

  return (
		<div className="app">
			<ModalContainer />
			<Header />
			<Nav />
			<ErrorNotification />
			<ErrorBoundary> 
				<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/404" element={<ErrorNotFound />} />
						<Route path="*" element={<Navigate to={"/404"} />} />
				</Routes>
			</ErrorBoundary>
			<Footer />
		</div>
  );
};
