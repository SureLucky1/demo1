import React, { createContext, Suspense } from 'react';
import { Provider} from "react-redux";
import store from '../src/component/payment/Redux/store.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import "./i18n.js"
const ShowContext = createContext();
export default ShowContext;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <Provider store={store}>

  <React.StrictMode>
    <Suspense fallback={<div>loading...</div>}>
    <BrowserRouter >
    <App />
    </BrowserRouter>
    </Suspense>
  </React.StrictMode>
      </Provider>

);

reportWebVitals();
