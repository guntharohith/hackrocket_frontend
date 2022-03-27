import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { useProductContext } from '../context/ProductContext'
import { useCartContext } from '../context/CartContext'
import styled from 'styled-components'
import ImageContainer from '../components/ImageContainer'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BreadCrumb from '../components/BreadCrumb'
import Quantity from '../components/Quantity'
import Stars from '../components/Stars'
import { FaCheck } from 'react-icons/fa'

function ProductDetail() {
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const { single_product, loading, fetchSingleProduct } = useProductContext()
    const { addToCart } = useCartContext()
    const [quantity, setQuantity] = useState(1)
    const [mainColor, setMainColor] = useState(0)

    useEffect(() => {
        fetchSingleProduct(id)
        //eslint-disable-next-line
    }, [id])
    const increase = () => {
        if (quantity >= single_product.stock) {
            setQuantity(single_product.stock)
        }
        else {
            setQuantity(quantity + 1)
        }
    }

    const decrease = () => {
        if (quantity < 2) {
            setQuantity(1)
        }
        else {
            setQuantity(quantity - 1)
        }
    }

    return (
        <Wrapper >
            <div className="section">
                <BreadCrumb title={single_product.name} product={single_product.name} />
                {
                    loading ? <Loading /> :
                        <div className="product-center">
                            <ImageContainer images={single_product.images} />
                            <div>
                                <h1 className="title">{single_product.name}</h1>
                                <Stars stars={single_product.rating}/>
                                <p className="price">Rs.{single_product.price}</p>
                                <p className="des">{single_product.description}</p>
                                <p className="info">
                                    <span>Available:</span>
                                    {single_product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </p>
                                <p className="info">
                                    <span>SKU:</span>
                                    {single_product._id}
                                </p>
                                <p className="info">
                                    <span>Brand:</span>
                                    {single_product.company}
                                </p>
                                <hr />
                                <div className="colors">
                                    <span>Colors:</span>
                                    <div>
                                        {
                                            single_product.colors && single_product.colors.map((col, i) => {
                                                return (
                                                    <button key={i} style={{ backgroundColor: col }}
                                                        onClick={() => setMainColor(i)}
                                                        className={`${i === mainColor ? 'color-btn active' : 'color-btn'}`} >
                                                        {i === mainColor ? <FaCheck /> : null}</button>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                {single_product.stock > 0 ?
                                    <>
                                        <div className='quantity'>
                                            <h2 onClick={decrease}>-</h2>
                                            <h1>{quantity}</h1>
                                            <h2 onClick={increase}>+</h2>
                                        </div>
                                        {
                                            token ?
                                                <Link to='/cart'>
                                                    <button style={{ marginTop: '1rem' }} onClick={() => addToCart({ ...single_product, quantity: quantity,color:single_product.colors[mainColor] })}>Add to Cart</button>
                                                </Link> :
                                                <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
                                                    <button disabled style={{ cursor: "not-allowed" }} >Add to Cart</button>
                                                    <h4 style={{ color: "red", marginLeft: "1rem" }}>LogIn to add to cart</h4>
                                                </div>
                                        }
                                    </>
                                    : null}
                            </div>
                        </div>
                }
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    .title,p{
        margin-bottom:1rem;
        text-transform: capitalize;
    }
    .product-center{
        display:grid;
        row-gap:3rem;
    }
    .info{
        display:grid;
        grid-template-columns:100px 1fr;
        column-gap:1rem;
        color:rgb(37, 37, 53);
    }
    .quantity{
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
    }

    .price{
        color:#bb58fe;
        font-weight:700;
    }
    .des{
        line-height:1.5rem;
    }
    span{
        font-weight:bolder;
    }
    .colors{
        display:grid;
        grid-template-columns:100px 1fr;
        align-items:center;
        column-gap:10px;
        margin:20px 0px;
        div{
            display:flex;
        }
    }
    .color-btn{
        height:1.5rem;
        width:1.5rem;
        border-radius:50%;
        padding:0.3rem;
        border:none;
        margin-right:10px;
        display:flex;
        justify-content:center;
        align-items:center;
        opacity:0.5;
        svg{
            color:white;
            font-size:1rem;
        }
    }
    .active{
        opacity:1;
    }
    @media (min-width:992px){
        .product-center{
            grid-template-columns:1fr 1fr;
            column-gap:3rem;
            align-items:start;
        }
        
    }
`
export default ProductDetail
