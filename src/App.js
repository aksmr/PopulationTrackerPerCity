import logo from './logo.svg';
import './App.css';
import {Footer} from './Components/Footer';
import {SearchBar} from './Components/SearchBar';
import {Informations} from './Components/Informations';

function App() {
	
	return (
		<div className="App">
			<header className="App-header">
				<h1>👨‍👩‍👦 Population number tracker</h1><hr />
				<h4>Welcome to our tracker!</h4>
				<SearchBar />
			</header>
			<Informations />
			<Footer />
		</div>
	);
}

export default App;
