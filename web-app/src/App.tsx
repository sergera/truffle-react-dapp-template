import { Routes, Route, Navigate } from "react-router-dom";

import { Landing } from './pages/Landing';
import { Components } from './pages/Components';
import { Notes } from './pages/Notes';
import { ErrorNotFound } from './pages/ErrorNotFound';

import { Header } from './components/Header';
import { Nav } from './components/Nav';
import { Footer } from "./components/Footer";

import { ConnectedModalContainer as ModalContainer } from './components/ModalContainer';
import { ConnectedNotificationContainer as NotificationContainer } from './components/NotificationContainer';
import { ConnectedToastContainer as ToastContainer } from './components/ToastContainer';

import { ErrorBoundary } from "./components/ErrorBoundary";

import './App.css';

export function App() {

  return (
		<div className="app">
			<ModalContainer />
			<NotificationContainer />
			<ToastContainer />
			<Header />
			<Nav />
			<ErrorBoundary> 
				<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/components" element={<Components />} />
						<Route path="/notes" element={<Notes />} />
						<Route path="/404" element={<ErrorNotFound />} />
						<Route path="*" element={<Navigate to={"/404"} />} />
				</Routes>
			</ErrorBoundary>
			<Footer />
		</div>
  );
};
