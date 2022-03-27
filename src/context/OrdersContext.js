import React, { useContext, useReducer, useEffect } from "react";
import OrdersReducer from "../reducers/OrdersReducer";
import { backend_url } from "../utils/constants";
import axios from "axios";
const OrdersContext = React.createContext()
const initialState = {
    orders: [],
    loading:false
}
export default function OrdersProvider({ children }) {
    const [state, dispatch] = useReducer(OrdersReducer, initialState)
    const userId = localStorage.getItem('userId')

    async function fetchOrders() {
        dispatch({type:"ORDERS_BEGIN"})
        const response = await axios.get(backend_url + 'orders/' + userId)
        let temp = []
        response.data.orders.map(p => {
            temp = temp.concat(p.products)
            return p
        })
        dispatch({type:"ORDERS_SUCCESS",payload:temp})
    }
    useEffect(() => {
        fetchOrders()
    },[])
    const addOrders = (orders) => {
        console.log(orders)
        dispatch({type:"ADD_ORDERS",payload:orders})
    }
    return (
        <OrdersContext.Provider value={{...state, addOrders}}>
            {children}
        </OrdersContext.Provider>
    )
}

export function useOrdersContext() {
    return useContext(OrdersContext)
}