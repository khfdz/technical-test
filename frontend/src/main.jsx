// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/Auth';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
        <ProductProvider>
        <Router>
            <App />
        </Router>
        </ProductProvider>
        </AuthProvider>
    </React.StrictMode>
);
