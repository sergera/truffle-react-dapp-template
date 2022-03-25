import { Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing/Landing';
import NotFoundError from './pages/ErrorNotFound/ErrorNotFound';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import Footer from "./components/Footer/Footer";

import ModalContainer from './components/ModalContainer/ModalContainer';
import ErrorNotification from './components/ErrorNotification/ErrorNotification';

import './App.css';

function App() {

  return (
		<div className="app">
			<ModalContainer />
			<Header />
			<Nav />
			<ErrorNotification />
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/404" element={<NotFoundError />} />
				<Route path="*" element={<Navigate to={"/404"} />} />
			</Routes>
			<Footer />
		</div>
  );
};

export default App;
