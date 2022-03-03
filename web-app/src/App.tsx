import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Landing from './content/Landing/Landing';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import ModalContainer from './components/Modal/ModalContainer';

import './App.css';

function App() {

	useEffect(() => {
		
	}, [])

  return (
		<div className="app">
			<ModalContainer />
			<Header />
			<Nav />
			<Routes>
				<Route path="/" element={<Landing />} />
			</Routes>
		</div>
  );
}

export default App;
