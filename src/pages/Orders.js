import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BreadCrumb from '../components/BreadCrumb'
import { BsArrowRight } from 'react-icons/bs'
import axios from 'axios'
import { backend_url } from '../utils/constants'
import Loading from '../components/Loading'
import { useOrdersContext } from '../context/OrdersContext'
function Orders() {
    const { orders, loading } = useOrdersContext()
    const orderStatuses = ["Order accepted", "Shipped", "Out for delivery", "Delivered"]

    if (loading) {
        return <Loading/>
    }
    return (
        <Wrapper className='section'>
            <BreadCrumb title="Orders"></BreadCrumb>
            <div>
                {
                    orders.map((order) => {
                        const { name, image, price, quantity, subTotal, address, date, orderStatus } = order
                        return (
                            <div className='order-item' key={name}>
                                <img src={image} alt={name}></img>
                                <div>
                                    <h2 style={{ marginBottom: '0.5rem',textTransform:"capitalize" }}>{name}</h2>
                                    <p className="info">
                                        <span>Price:</span>
                                        <span className='price'>Rs.{price}</span>
                                    </p>
                                    <p className="info">
                                        <span>Quantity:</span>
                                        {quantity}
                                    </p>
                                    <p className="info">
                                        <span>Subtotal:</span>
                                        <span className='price'>Rs.{subTotal.toFixed(2)}</span>
                                    </p>
                                    <p className="info">
                                        <span>Address:</span>
                                        {address}
                                    </p>
                                    <div className='status'>
                                        <span className='label'>Order Status:</span>
                                        {
                                            orderStatuses.map((s,i) => {
                                                return (
                                                    <div className={i < orderStatus ? "active" : null}>
                                                        <span>{s}</span>
                                                        {i !== 3 && <BsArrowRight />}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <p>Ordered on {date}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Wrapper>
    )
}

export default Orders

const Wrapper = styled.div`
    min-height:65vh;
    h1{
        text-align:center;
        margin-top:4rem;
    }
    .order-item{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        padding:2rem;
        border-radius:0.5rem;
        display:grid;
        align-items:center;
        grid-template-columns:1fr;
        gap:1rem;
        margin-bottom:2rem;
        overflow:scroll;
        img{
            height:220px;
            width:220px;
            border-radius:1rem;
        }
    }
    .info{
        display:grid;
        grid-template-columns:100px 1fr;
        column-gap:1rem;
        color:rgb(37, 37, 53);
        margin-bottom:0.5rem;
        span{
            font-weight:700;
        }
    }
    .status{
        display:flex;
        margin-bottom:1rem;
        .label{
            font-weight:700;
            margin-right:1rem;
        }
        div{
            display:flex;
            align-items:center;
            span{
                margin-right:1rem;
            }
            svg{
                margin-right:1rem;
            }
        }
        .active{
            font-weight:700;
        }
    }
    @media screen and (min-width:772px){
        .order-item{
            grid-template-columns:250px 1fr;
        }
    }
`