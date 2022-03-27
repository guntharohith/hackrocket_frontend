import React from 'react';
import ReactDOM from 'react-dom';
import "@fontsource/dm-sans";
import './index.css';
import App from './App';
import ProductProvider from './context/ProductContext'
import FilterProvider from './context/FilterContext';
import CartProvider from './context/CartContext';
import OrdersProvider from './context/OrdersContext'

ReactDOM.render(
  <ProductProvider>
    <FilterProvider>
      <CartProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </CartProvider>
    </FilterProvider>
  </ProductProvider>,
  document.getElementById('root')
);

