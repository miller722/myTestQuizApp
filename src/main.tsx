
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { saveState } from './store/browser-storage';

store.subscribe(
  () => {
    setTimeout(() => {
      saveState(store.getState());
    }, 800)
  }

);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
