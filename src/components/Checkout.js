import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import axios from 'axios'
import styled from 'styled-components'
import { backend_url } from '../utils/constants'
import { useCartContext } from '../context/CartContext'
import { useOrdersContext } from '../context/OrdersContext'
import { Link } from 'react-router-dom'
import {IoMdSend} from 'react-icons/io'
import { useHistory } from 'react-router-dom'
function Checkout({ onClose }) {
    const history = useHistory()
    const { cart_products, clearCart } = useCartContext()
    const { addOrders } = useOrdersContext()
    const userId = localStorage.getItem("userId")
    const [addresses, setAddresses] = useState([])
    const [address, setAddress] = useState("")
    const [selectedAddress, setSelectedAddress] = useState(0)
    const [loading, setLoading] = useState(false)
    async function fetchAddress() {
        setLoading(true)
        const response = await axios.get(backend_url + 'user/getAddress/' + userId)
        setAddresses(response.data.addresses)
        setLoading(false)
    }
    useEffect(() => {
        fetchAddress()
    }, [])
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' }
    var today = new Date()

    function addToOrders() {
        const temp = cart_products.map((p) => {
            return {
                ...p,
                orderStatus: Math.floor(Math.random() * 4 + 1),
                date: today.toLocaleDateString("en-US", options),
                address: addresses[selectedAddress]
            }
        })
        axios.post(backend_url + 'orders/' + userId, { products: temp }).then(res => addOrders(res.data.order.products))
        clearCart()
    }
    function addAddress(e) {
        e.preventDefault()
        axios.put(backend_url + 'user/addAddress/' + userId, { address: address })
        setAddresses([...addresses, address])
        setAddress("")
    }

    function loadScript(src) {
        return new Promise((resolve => {
            const script = document.createElement('script')
            script.src = src
            document.body.appendChild(script)
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
        }))
    }
    async function displayRazorpay() {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDk failed to load.')
            return
        }



        const options = {
            "key": "rzp_test_7KrJrtVx3LzHjV",
            "amount": 5000,
            "currency": "INR",
            "name": "FurniStore",
            "image": "https://www.linkpicture.com/q/logo_payment.png",
            // "order_id": "jdjs",
            "handler": function (response) {
                addToOrders()
                history.push('/orders')
            },
            "theme": {
                "color": "#3399cc"
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }
    return (
        <Wrapper>
            <div className='modal'>
                <div className='head'>
                    <h2>Checkout</h2>
                    <ImCross onClick={() => onClose()} />
                </div>
                <hr></hr>
                <div className='addresses'>
                    <h2>Select an Address</h2>
                    {loading &&
                            <div className='loading'/>
                    }
                    {
                        !loading && addresses.map((address, index) => {
                            return (
                                <p key={index} className={selectedAddress === index ? "active" : null} onClick={() => setSelectedAddress(index)}>
                                    {address}
                                </p>
                            )
                        })
                    }
                    <form onSubmit={addAddress}>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Add address"></input>
                        <button type='submit'>Add </button>
                    </form>
                </div>
                {addresses[selectedAddress] &&
                        <button onClick={displayRazorpay} className="pay">Proceed to Pay <IoMdSend /></button>     
                }
            </div>
        </Wrapper>
    )
}

export default Checkout

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    .modal{
        position: fixed;
        background: white;
        width: 300px;
        height: auto;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 5px;
        text-align: center;
        padding: 2rem;
        .head{
            background:white;
            display:flex;
            align-items:center;
            justify-content:space-between;
        }
        .loading{
            height: 2rem;
            width: 2rem;
            margin-bottom:1rem;
        }
        .addresses{
            h2{
                margin-bottom:1rem;
            }
            p{
                box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
                padding:0.5rem;
                border-radius:0.5rem;
                margin-bottom:0.5rem;
                cursor:pointer;
            }
            form{
                display:flex;
                align-items:center;
                input{
                    padding:0.7rem;
                    margin-right:1rem;
                }
            }
            .active{
                background-color:grey;
                color:white;
            }
        }
        .pay{
            margin:0 auto;
            margin-top:1rem;
        }
    }
`