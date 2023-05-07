import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { LoginContextProvider } from './Context/LoginCnt'
import { LangContextProvider } from "./Context/LangCnt";
import { DataContextProvider } from "./Context/useUserData";
import { GeneralContextProvider } from "./Context/generalTables";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LangContextProvider>
    <LoginContextProvider>
    <DataContextProvider>
    <GeneralContextProvider>
      <App />
    </GeneralContextProvider>
    </DataContextProvider>
    </LoginContextProvider>
    </LangContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
