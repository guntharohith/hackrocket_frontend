export default function OrdersReducer(state, action) {
    const { type, payload } = action
    if (type === "ORDERS_BEGIN") {
        return {...state,loading:true}
    }
    if (type === "ORDERS_SUCCESS") {
        return {...state,orders:payload,loading:false}
    }
    if (type === "ADD_ORDERS") {
        return {...state,orders:state.orders.concat(payload)}
    }
    return state
}