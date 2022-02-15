import React, { useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Landing from './content/Landing/Landing';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import './App.css';

import web3 from 'web3';

function App() {

	useEffect(() => {
		
	}, [])

  return (
    <>
		<div className="app">
			<Header />
			<Nav />
			<Routes>
				<Route path="/" element={<Landing />} />
			</Routes>
		</div>
    </>
  );
}

export default App;
