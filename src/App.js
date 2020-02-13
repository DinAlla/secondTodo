import React from 'react';
import HeaderComponent from "./components/HeaderComponent";
import MainComponent from "./components/MainComponent";
import FooterComponent from "./components/FooterComponent";

// КОМПОНЕНТ СО ВСЕЙ СТРУКТУРОЙ СТРАНИЦ
function App() {
	return (
		<div className="App">
			{/* ЗАГОЛОВОК */}
			<HeaderComponent/>
			{/* ОСНОВНОЙ КОНТЕНТ */}
			<MainComponent />
			{/* ФУТЕР */}
			<FooterComponent />
		</div>
	);
}

export default App;
