import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from "react-router-dom";

import Landing from './content/Landing/Landing';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import ModalOk from './components/ModalOk/ModalOk';

import './App.css';

function App() {

	const[showModal, setShowModal] = useState(true);

	useEffect(() => {
		
	}, [])

  return (
    <>
		<div className="app">
			<ModalWrapper showModal={showModal}>
				<ModalOk 
					content={"Please install metamask!"}
					setShow={setShowModal}
				/>
			</ModalWrapper>
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
