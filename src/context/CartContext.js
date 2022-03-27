import React, { useContext, useEffect, useReducer } from "react";
import CartReducer from "../reducers/CartReducer";
import axios from "axios"
import { backend_url } from "../utils/constants";
const CartContext = React.createContext()

const initialState = {
    cart_products: [],
    no_of_items: 0,
    cart_loading: false,
    cart_error: false
}
export default function CartProvider({ children }) {
    const [state, dispatch] = useReducer(CartReducer, initialState)
    const userId = localStorage.getItem("userId")
    async function fetchCartItems() {
        dispatch({ type: "CART_LOADING_BEGIN" })
        try {
            const res = await axios.get(backend_url + "cart/" + userId)
            dispatch({ type: "CART_LOADING_SUCCESS", payload: res.data.cart })
        }
        catch (error) {
            dispatch({ type: "CART_LOADING_ERROR" })
        }
    }

    useEffect(() => {
        fetchCartItems()
    },[])

    const addToCart = (product) => {
        axios.post(backend_url + 'cart/' + userId, product).then(
            res => dispatch({ type: "ADD_TO_CART", payload: res.data.cartItem })
        )
    }

    const removeFromCart = (id) => {
        axios.delete(backend_url + 'cart/' + id)
        dispatch({ type: "REMOVE_FROM_CART", payload: id })
    }

    const clearCart = () => {
        axios.delete(backend_url + 'cart/clearCart/' + userId)
        dispatch({type:"CLEAR_CART"})
    }

    const updateCart = (id,quantity) => {
        axios.put(backend_url + 'cart/' + id, { quantity: quantity })
        console.log(quantity)
        dispatch({type:"UPDATE_CART",payload: {id,quantity}})
    }

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeFromCart, clearCart,updateCart }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext)
}