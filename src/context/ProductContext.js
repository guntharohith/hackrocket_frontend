import React, { useContext, useReducer, useEffect } from 'react'
import ProductReducer from '../reducers/ProductReducer'
import { products_url,single_product_url,backend_url } from '../utils/constants'
import axios from 'axios'
const ProductContext = React.createContext()
const initialValue = {
    products: [],
    loading: false,
    single_product:{}
}

export default function ProductProvider({ children }) {
    const [state, dispatch] = useReducer(ProductReducer, initialValue)

    useEffect(() => {
        dispatch({ type: "PRODUCTS_FETCH_BEGIN" })
        axios.get(backend_url + 'product').then((res) => {
            dispatch({type:"PRODUCTS_FETCHED",payload:res.data.products})
        })
    }, [])

    const fetchSingleProduct = (id) => {
        dispatch({ type: "PRODUCTS_FETCH_BEGIN" })
        axios.get(backend_url + 'product/' + id).then((res) => {
            dispatch({ type: "SINGLE_PRODUCT_FETCHED", payload: res.data.product })
        })
    }

    return (
        <ProductContext.Provider value={{ ...state, fetchSingleProduct }}>
            {children}
        </ProductContext.Provider>
    )
}

export function useProductContext() {
    return useContext(ProductContext)
}