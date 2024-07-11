import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/Auth';
import { CategoriesProvider } from './context/CategoriesContext';
import { OrderProvider } from './context/OrderContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
                

        <CategoriesProvider>

        <ProductProvider>


        <OrderProvider>

        <Router>
            <App />
        </Router>

        </OrderProvider>
        </ProductProvider>
        
        </CategoriesProvider>
        

        </AuthProvider>
    </React.StrictMode>
);
