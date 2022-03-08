import App from './App';
import ReactDOM from 'react-dom';
import './Assets/scss/index.scss';
import Store from './Tools/Store';
import reportWebVitals from './reportWebVitals';

const app = (
	<Store>
		<App />
	</Store>
);

ReactDOM.render(app, document.querySelector('#root'));
reportWebVitals();
