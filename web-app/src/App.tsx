import { Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing/Landing';
import ErrorNotFound from './pages/ErrorNotFound/ErrorNotFound';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from "./components/Footer/Footer";

import ModalContainer from './components/ModalContainer/ModalContainer';
import ErrorNotification from './components/ErrorNotification/ErrorNotification';

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import './App.css';

function App() {

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

export default App;
