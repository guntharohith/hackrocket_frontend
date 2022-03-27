export default function CartReducer(state, action) {
    const { type, payload } = action
    if (action.type === "CART_LOADING_BEGIN") {
        return { ...state, cart_loading: true, cart_error: false }
    }
    if (action.type === "CART_LOADING_SUCCESS") {
        return {
            ...state, cart_products: action.payload,
            numberOfItems: calculateTotalNumber(action.payload), total_amount: calculateTotal(action.payload), cart_loading: false, cart_error: false
        }
    }
    if (action.type === "CART_LOADING_ERROR") {
        return { ...state, cart_loading: false, cart_error: true }
    }
    if (type === "ADD_TO_CART") {
        const temp = [...state.cart_products, payload]
        return { ...state, cart_products: temp, no_of_items: state.no_of_items + 1 }
    }
    if (type === "REMOVE_FROM_CART") {
        const temp = state.cart_products.filter((product) => product._id !== payload)
        return { ...state, cart_products: temp }
    }
    if (type === "CLEAR_CART") {
        return {...state,cart_products:[]}
    }
    if (type === "UPDATE_CART") {
        const temp = state.cart_products.filter((product) => {
            if (product._id === payload.id) {
                return {...product,quantity:payload.quantity}
            }
            return product
        })
        return {...state,cart_products:temp}
    }
    return state
}

function calculateTotal(arr) {
    let res = 0
    arr.map((item) => {
        res += item.price * item.quantity
        return item
    })
    return res
}

function calculateTotalNumber(arr) {
    let res = 0
    arr.map((item) => {
        res += item.quantity
        return item
    })
    return res
}