import { Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing/Landing';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import NotFoundError from './pages/NotFoundError/NotFoundError';
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
		</div>
  );
};

export default App;
