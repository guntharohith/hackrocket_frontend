import React, {useState} from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/CartContext'
import { AiFillDelete } from 'react-icons/ai'
import BreadCrumb from '../components/BreadCrumb'
import { Link } from 'react-router-dom'
import Quantity from '../components/Quantity'
import Loading from '../components/Loading'
import Checkout from '../components/Checkout'
function Cart() {
    const { cart_products,  cart_loading, removeFromCart, clearCart } = useCartContext()
    let subtotal = 0
    cart_products.map(p => {
        subtotal += (p.price * p.quantity)
        return p
    })
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    if (cart_loading) {
        return <Loading/>
    }
    return (
        <Wrapper className='section'>
            <BreadCrumb title="Cart" />
            {
                cart_products && cart_products.length === 0 ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: '3rem' }}>
                        <h1 style={{ marginBottom: '2rem' }}>Your cart is empty</h1>
                        <Link to='/products'><button>Fill It</button></Link>
                    </div> :
                    <>
                        <div className='header'>
                            <h3>Product</h3>
                            <h3>Price</h3>
                            <h3>Quantity</h3>
                            <h3>Subtotal</h3>
                            <h3>Remove</h3>
                        </div>
                        <div style={{ marginTop: '2rem' }}>
                            {
                                cart_products && cart_products.map((product) => {
                                    const { _id, name, price, subTotal, quantity, stock, image,color } = product
                                    return (
                                        <div key={_id} className='row'>
                                            <div className='image'>
                                                <img src={image} alt={name}></img>
                                                <div>
                                                    <p>{name}</p>
                                                    <p className="color">Color: <span style={{ background: color }}></span></p>
                                                    {/* <p className='price-small' style={{ color: '#bb58fe', fontWeight: '700', fontSize: '1rem' }}>Rs.{price}</p> */}
                                                </div>
                                            </div>
                                            <p style={{ color: '#bb58fe', fontWeight: '700' }} className='price'>Rs.{price}</p>
                                            <div className='quantity'>
                                                <Quantity stock={stock} existQuantity={quantity} id={_id} />
                                            </div>
                                            <p style={{ color: '#bb58fe', fontWeight: '700' }} className='price'>Rs.{(price * quantity).toFixed(2)}</p>
                                            <p style={{cursor:"pointer"}}><AiFillDelete onClick={() => removeFromCart(_id)} /></p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <hr></hr>
                        <div className='clear-cart'>
                            <button onClick={() => setOpen(true)}>Checkout</button>
                            <button onClick={() => clearCart()}>Clear Cart</button>
                        </div>
                        <div className='billing-main'>
                            <div className='billing'>
                                <div>
                                    <h3>Subtotal:</h3>
                                    <p>Rs.{subtotal.toFixed(2)}</p>
                                </div>
                                <div>
                                    <h3>Shipping Fees:</h3>
                                    <p>Rs.100</p>
                                </div>
                                <hr></hr>
                                <div style={{ marginBottom: '0' }}>
                                    <h2>Total:</h2>
                                    <p>Rs.{(subtotal + 100).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                        {open && <Checkout onClose={onClose}/>}
                    </>
            }
        </Wrapper>
    )
}

export default Cart

const Wrapper = styled.div`
    min-height:65vh;
    .header{
        background-color:#f5f5f5;
        padding:1.2rem 0;
        display:grid;
        grid-template-columns:repeat(4,1fr);
        column-gap:2rem;
        text-align:center;
    }
    .row{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        align-items:center;
        column-gap:2rem;
        text-align:center;
        margin-bottom:2rem;
        .image{
            display:flex;
            align-items:center;
            img{
                height:75px;
                width:75px;
                border-radius:0.5rem;
                margin-right:1rem;
            }
            p{
                font-size:1rem;
                font-weight:700;
            }
            span{
                height:1rem;
                width:1rem;
                border-radius:1rem;
                margin-left:0.5rem;
            }
            .color{
                color:rgb(150, 102, 102);
                font-size:15px;
                letter-spacing:0.7px;
                margin:0;
                display:flex;
                align-items:center;
                justify-content:flex-start;
                margin-top:0.5rem;
            }
        }
        p{
            text-transform:capitalize;
            font-size:1.2rem;
        }
        .quantity{
            margin:0 auto;
        }
    }
    .clear-cart{
        display:flex;
        align-items:center;
        justify-content:space-between;
    }
    .billing-main{
        display:flex;
        justify-content:flex-end;
        margin-top:2rem;
        .billing{
            width:300px;
            box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
            padding:1rem;
            border-radius:0.5rem;
            div{
                display:grid;
                grid-template-columns:1fr 1fr;
                column-gap:1rem;
                align-items:center;
                margin-bottom:1rem;
                p{
                    color:#bb58fe;
                    font-weight:700;
                }
            }
        }
    }


    .price{
        display:none;
    }
    .price-small{
        display:block;
    }
    @media screen and (min-width:556px){
        .header{
            grid-template-columns:repeat(5,1fr);
        }

        .row{
            grid-template-columns:repeat(5,1fr);
        }

        .price{
            display:block;
        }
        .price-small{
            display:none;
        }
    }
`