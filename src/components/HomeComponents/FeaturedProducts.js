import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductContext } from '../../context/ProductContext'
import Product from '../Product'
import Loading from '../Loading'
function FeaturedProducts() {
    const { products, loading } = useProductContext()
    if (loading) {
        return <Loading/>
    }
    else {
        return (
            <Wrapper className='section-center'>
                <div className='header'>
                    <p>Featured Products</p>
                    <h1>Experience your furniture like never before. Buy furniture &amp; accessories online.</h1>
                    <Link to='/products'>
                        <button>View all</button>
                    </Link>
                </div>
                <div className='products'>
                    {
                        products.slice(0,6).map(product => {
                            const {  _id, name, images, price } = product
                            return <Product key={_id} id={_id} name={name} image={images[0]} price={price} />
                        })
                    }
                </div>
            </Wrapper>
        )
    }
}

export default FeaturedProducts

const Wrapper = styled.div`
    .header{
        display:flex;
        flex-direction:column;
        align-items:center;
        padding:0 2rem;
        p{
            text-align:center;
            font-weight:700;
            margin-bottom:0.5rem;
        }
        h1{
            margin-bottom:1rem;
            font-size:2.5rem;
            text-align:center;
            font-weight:1000;
        }
        button{
            margin-top:0.5rem;
        }
        margin-bottom:2rem;
    }
    .products{
        display:grid;
        grid-template-columns:repeat(1,1fr);
        gap:2rem;
    }
    
    @media screen and (min-width:992px){
        .products{
            grid-template-columns:repeat(3,1fr);
        }
    }

    @media screen and (min-width:776px) and (max-width:992px){
        .products{
            grid-template-columns:repeat(2,1fr);
        }
    }
`