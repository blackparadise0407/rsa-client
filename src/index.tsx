import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from './contexts/AuthContext';

import './index.css';
import ImageContextProvider from 'contexts/ImageContext';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ImageContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ImageContextProvider>
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
