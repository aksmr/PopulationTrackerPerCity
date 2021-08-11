import './App.css';
import {Footer} from './Components/Footer';
import {SearchBar} from './Components/SearchBar';

function App() {
	
	return (
		<div className="App">
			<header>
				<div className="App-header">
					<h1>👨‍👩‍👦 Population number tracker</h1><hr />
					<h4>Welcome to our tracker!</h4>
				</div>
				<SearchBar />
			</header>
			<Footer />
		</div>
	);
}

export default App;
