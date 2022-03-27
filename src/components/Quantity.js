import React, {useState} from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
function Quantity({ stock, existQuantity,id }) {
    const {updateCart} = useCartContext()
    const [quantity, setQuantity] = useState(existQuantity)

    const increase = () => {
        if (quantity >= stock) {
            setQuantity(stock)
        }
        else {
            setQuantity(quantity + 1)
            updateCart(id,quantity+1)
        }
    }

    const decrease = () => {
        if (quantity < 2) {
            setQuantity(1)
        }
        else {
            setQuantity(quantity - 1)
            updateCart(id,quantity-1)
        }
    }
    return (
        <Wrapper>
            <h2 onClick={decrease}>-</h2>
            <h1>{quantity}</h1>
            <h2 onClick={increase}>+</h2>
        </Wrapper>
    )
}

export default Quantity

const Wrapper = styled.div`
    width:120px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    h1{
        margin:0;
    }
    h2{
        cursor:pointer;
    }
`